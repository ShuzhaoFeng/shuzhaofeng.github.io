import type { Metadata } from "next";
import english from "@/locales/en/translation.json";

const title = english["layout.title"];
const description = english["layout.description"];
const image = {
  url: "/profile_picture.jpg",
  width: 1400,
  height: 1000,
  type: "image/jpeg",
  alt: "Portrait of Shuzhao Feng",
};

export const sharedMetadata: Metadata = {
  metadataBase: new URL("https://shuzhaofeng.github.io"),
  title,
  description,
  openGraph: {
    type: "website",
    siteName: "Shuzhao Feng",
    title,
    description,
    images: [image],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: [image],
  },
};

export function contentRouteMetadata(path: string): Metadata {
  return {
    alternates: { canonical: path },
    // Route metadata replaces this object, so carry forward every shared field.
    openGraph: { ...sharedMetadata.openGraph, url: path },
  };
}
