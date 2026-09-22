"use client";

import Image from "next/image";
import { useState } from "react";
import { ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

export function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div
        className="group relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-3xl bg-ink-100 ring-1 ring-inset ring-ink-100"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
      >
        <Image
          src={images[active]}
          alt={title}
          fill
          priority
          sizes="(min-width: 1024px) 44vw, 92vw"
          className={cn(
            "object-cover transition-transform duration-500 ease-out",
            zoomed && "scale-125"
          )}
        />
        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-600 shadow-soft-sm">
          <ZoomIn size={16} />
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar">
        {images.map((img, i) => (
          <button
            key={img + i}
            onClick={() => setActive(i)}
            className={cn(
              "relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-2 transition-all",
              active === i ? "ring-brand-600" : "ring-transparent hover:ring-ink-200"
            )}
          >
            <Image src={img} alt={`${title} thumbnail ${i + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
