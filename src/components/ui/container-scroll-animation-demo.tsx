"use client";

import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Video1 from "../../assets/space.mp4";

export default function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden w-full">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white">
              Journey Through the <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Cosmic Dimensions
              </span>
            </h1>
          </>
        }
      >
        <video
          src={Video1}
          autoPlay
          loop
          muted
          playsInline
          className="mx-auto rounded-2xl object-cover h-full object-left-top max-w-full"
        />
      </ContainerScroll>
    </div>
  );
}