import { useSyncExternalStore } from 'react';

/**
 * Saved activities.
 *
 * Stored in the browser rather than against an account, because there are no
 * accounts. That is a real limitation and it is stated in the UI: favourites
 * live on this device and do not follow someone to their phone. When this app
 * folds into the main LinkedLeaders application, this module is the single
 * place to swap localStorage for the signed-in user's record.
 *
 * Implemented as a module-level store read through useSyncExternalStore rather
 * than as component state, so every card, the grid filter and the detail drawer
 * stay in sync without threading props through three layers of component.
 */

const STORAGE_KEY = 'll-favourites-v1';

let ids: Set<number> = load();
const listeners = new Set<() => void>();

/** Cached so getSnapshot returns a stable reference; returning a fresh array
 *  every call makes useSyncExternalStore loop forever. */
let snapshot: number[] = [...ids];

function load(): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw) as number[]);
  } catch {
    // Corrupt or unavailable storage should never break the page.
  }
  return new Set();
}

function persist() {
  snapshot = [...ids];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Private mode or a full quota is not worth failing over.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function toggleFavourite(id: number) {
  if (ids.has(id)) ids.delete(id);
  else ids.add(id);
  persist();
}

export function clearFavourites() {
  ids = new Set();
  persist();
}

/** The saved activity ids. Re-renders any component using it when they change. */
export function useFavourites(): number[] {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => snapshot,
  );
}

export function useIsFavourite(id: number): boolean {
  const list = useFavourites();
  return list.includes(id);
}
