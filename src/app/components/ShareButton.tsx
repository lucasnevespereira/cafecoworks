"use client";

import React from "react";
import toast from "react-hot-toast";

type ShareButtonProps = {
  url?: string;
  title?: string;
  text?: string;
  className?: string;
};

const ShareButton: React.FC<ShareButtonProps> = ({
  url = typeof window !== "undefined" ? window.location.href : "",
  title = typeof document !== "undefined" ? document.title : "Share",
  text = "Check out this cafe!",
  className = "",
}) => {
  const handleShare = async () => {
    const shareData = { title, text, url };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success("Shared!");
      } catch (err) {
        // User cancelled or error
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      } catch (err) {
        toast.error("Failed to copy link.");
      }
    } else {
      toast.error("Sharing not supported.");
    }
  };

  return (
    <button
      className={`btn btn-coffee rounded-2xl px-6 py-3 text-center ${className}`}
      onClick={handleShare}
      aria-label="Share this cafe"
      type="button"
    >
      <span className="text-lg mr-2">🔗</span>
      Share
    </button>
  );
};

export default ShareButton;
