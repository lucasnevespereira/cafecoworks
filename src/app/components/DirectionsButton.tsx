"use client";

import Link from "next/link";

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
    return null; // no valid destination
  }

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-primary rounded-2xl px-6 py-3 text-center"
    >
      <span className="text-lg mr-2">📍</span>
      Get Directions
    </Link>
  );
}
