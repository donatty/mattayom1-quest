import { Profile, createEmptyProgress } from "@/types/profile";

const STORAGE_KEY = "mattayom1quest.profiles.v1";
const ACTIVE_KEY = "mattayom1quest.activeProfileId";

type StorageShape = {
  profiles: Profile[];
};

function isBrowser() {
  return typeof window !== "undefined";
}

function readAll(): StorageShape {
  if (!isBrowser()) return { profiles: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { profiles: [] };
    return JSON.parse(raw) as StorageShape;
  } catch {
    return { profiles: [] };
  }
}

function writeAll(data: StorageShape) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getProfiles(): Profile[] {
  return readAll().profiles;
}

export function getActiveProfileId(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(ACTIVE_KEY);
}

export function setActiveProfileId(id: string) {
  if (!isBrowser()) return;
  window.localStorage.setItem(ACTIVE_KEY, id);
}

export function getActiveProfile(): Profile | null {
  const id = getActiveProfileId();
  if (!id) return null;
  return getProfiles().find((p) => p.id === id) ?? null;
}

export function createProfile(name: string, avatar: string): Profile {
  const data = readAll();
  const profile: Profile = {
    id: crypto.randomUUID(),
    name,
    avatar,
    createdAt: new Date().toISOString(),
    progress: createEmptyProgress(),
  };
  data.profiles.push(profile);
  writeAll(data);
  setActiveProfileId(profile.id);
  return profile;
}

export function updateProfile(updated: Profile) {
  const data = readAll();
  data.profiles = data.profiles.map((p) => (p.id === updated.id ? updated : p));
  writeAll(data);
}

export function deleteProfile(id: string) {
  const data = readAll();
  data.profiles = data.profiles.filter((p) => p.id !== id);
  writeAll(data);
}

export function exportProfileData(): string {
  return JSON.stringify(readAll(), null, 2);
}

export function importProfileData(json: string) {
  const parsed = JSON.parse(json) as StorageShape;
  writeAll(parsed);
}
