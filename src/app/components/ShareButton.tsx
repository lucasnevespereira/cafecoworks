"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Share2 } from "lucide-react";

type ShareButtonProps = {
  title?: string;
  text?: string;
  className?: string;
};

const ShareButton: React.FC<ShareButtonProps> = ({
  title: propTitle,
  text = "Check out this cafe!",
  className = "",
}) => {
  const [url, setUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("Share");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
      setTitle(propTitle || document.title);
    }
  }, [propTitle]);

  const handleShare = async () => {
    if (!url) {
      toast.error("URL not available for sharing.");
      return;
    }

    const shareData = { title, text, url };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success("Shared!");
      } catch (err) {
        console.error(err);
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to copy link.");
      }
    } else {
      toast.error("Sharing not supported.");
    }
  };

  return (
    <button
      className={`btn btn-coffee rounded-xl text-sm text-center flex items-center justify-center gap-2 ${className}`}
      onClick={handleShare}
      aria-label="Share this cafe"
      type="button"
      disabled={!url}
    >
      <Share2 size={14} />
      Share
    </button>
  );
};

export default ShareButton;
