"use client";
// hooks/useIsClient.js
// false during SSR and hydration, true afterwards — without a setState-in-effect.
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function useIsClient() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
