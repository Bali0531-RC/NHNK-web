import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/zart-teszt/", "/adatvedelem/", "/felhasznalasi-feltetelek/", "/tamogatas/"];
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: site.legalLastUpdated,
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
