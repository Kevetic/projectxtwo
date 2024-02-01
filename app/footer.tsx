"use client";
import { useSession } from "next-auth/react";
import React from "react";

function Footer() {
  const { data: session } = useSession();
  return (
    session && (
      <div className="absolute bottom-5 text-center w-full text-xs">
        Disclaimer: Please note that there is a cost associated with each
        question, and the application may be temporarily unavailable until my
        OpenAI wallet is replenished.
      </div>
    )
  );
}

export default Footer;
