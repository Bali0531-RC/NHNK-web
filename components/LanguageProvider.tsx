"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { dict, type Lang } from "@/lib/i18n";

const STORAGE_KEY = "nhnk-lang";

/* A tiny external store, so the language can be read during render without
   calling setState from an effect (and without a hydration mismatch). */

const listeners = new Set<() => void>();
let cache: Lang | null = null;

function readLang(): Lang {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "hu" || stored === "en") return stored;
  return navigator.language.toLowerCase().startsWith("hu") ? "hu" : "en";
}

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      cache = null;
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Lang {
  cache ??= readLang();
  return cache;
}

/** Hungarian is the primary language, so it is what gets prerendered. */
function getServerSnapshot(): Lang {
  return "hu";
}

function writeLang(next: Lang) {
  cache = next;
  window.localStorage.setItem(STORAGE_KEY, next);
  emit();
}

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (typeof dict)[Lang];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang: writeLang, t: dict[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}

/** Renders **bold** segments without resorting to raw HTML. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-ink">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}
