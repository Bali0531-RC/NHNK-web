export const site = {
  name: "NHNK",
  fullName: "Nem Hivatalos Neptun Kliens",
  url: "https://nhnk.bali0531.hu",
  repo: "https://github.com/Bali0531-RC/NHNK",
  releases: "https://github.com/Bali0531-RC/NHNK/releases/latest",
  issues: "https://github.com/Bali0531-RC/NHNK/issues/new/choose",
  license: "https://github.com/Bali0531-RC/NHNK/blob/main/LICENSE",
  obtainium: "https://github.com/ImranR98/Obtainium",
  contactEmail: "nhnk@bali0531.hu",
  author: "Turi Balázs",
  authorHandle: "Bali0531",
  /** Set once the Play listing is live, then the store button turns into a real link. */
  playStoreUrl: "",
  /**
   * Google Play requires a personal developer account to hold `required` opted-in
   * testers for `days` consecutive days before production access opens. The countdown
   * only starts once the threshold is met, so `current` is the number to move.
   * Update `current` by hand as sign-ups convert to opted-in testers.
   */
  closedTest: {
    current: 8,
    required: 12,
    days: 14,
  },
  upstream: {
    neptun2: "https://github.com/domedav/Neptun-2",
    neptunMobile: "https://github.com/zoligamer/Neptun-Mobile-fork",
  },
  /** Kept in one place so legal pages and the About screen can quote the same date. */
  legalLastUpdated: "2026-08-01",
} as const;

export type DonationMethod = {
  id: string;
  name: string;
  handle: string;
  url: string;
  note: { hu: string; en: string };
};

/** Data-driven: add or remove an entry here and the donate page follows. */
export const donationMethods: DonationMethod[] = [
  {
    id: "paypal",
    name: "PayPal",
    handle: "paypal.me/neptunedonate",
    url: "https://paypal.me/neptunedonate",
    note: {
      hu: "Nemzetközi utalás, bankkártyával is működik PayPal-fiók nélkül.",
      en: "International transfer, works with a bank card even without a PayPal account.",
    },
  },
  {
    id: "revolut",
    name: "Revolut",
    handle: "revolut.me/bali0531",
    url: "https://revolut.me/bali0531",
    note: {
      hu: "A leggyorsabb út itthonról, jellemzően díjmentesen.",
      en: "The quickest option from Hungary, usually free of charge.",
    },
  },
  {
    id: "github",
    name: "GitHub Sponsors",
    handle: "github.com/sponsors/Bali0531-RC",
    url: "https://github.com/sponsors/Bali0531-RC",
    note: {
      hu: "Egyszeri vagy havi támogatás, közvetlenül a GitHubon keresztül.",
      en: "One-off or monthly support, handled directly through GitHub.",
    },
  },
];
