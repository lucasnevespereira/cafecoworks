"use client";

import Link from "next/link";
import { Navigation } from "lucide-react";

type Props = {
  latitude?: number;
  longitude?: number;
  address?: string;
};

export default function DirectionsButton({
  latitude,
  longitude,
  address,
}: Props) {
  let url = "";

  if (latitude && longitude) {
    url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  } else if (address) {
    url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  } else {
    return null;
  }

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-primary rounded-xl text-sm text-center flex items-center justify-center gap-2"
    >
      <Navigation size={14} />
      Directions
    </Link>
  );
}
