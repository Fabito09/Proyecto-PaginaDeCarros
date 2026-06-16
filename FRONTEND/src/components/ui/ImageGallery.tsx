"use client";

import { useState } from "react";
import Image from "next/image";
import { Zap } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  brand: string;
  model: string;
  isFeatured: boolean;
}

export default function ImageGallery({ images, brand, model, isFeatured }: ImageGalleryProps) {
  const [selected, setSelected] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div
        className="relative h-80 lg:h-[480px] rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-4"
        style={{
          background: "linear-gradient(135deg, #16382c 0%, #2a6f56 50%, #112920 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        <span className="w-3 h-3 rounded-full bg-primary absolute bottom-10 left-10"
          style={{ boxShadow: "0 0 14px #00e5ff" }} />
        <span className="w-3 h-3 rounded-full bg-primary absolute bottom-10 right-10"
          style={{ boxShadow: "0 0 14px #00e5ff" }} />
        <Zap className="w-16 h-16 text-primary/20" />
        <span className="text-muted/40 text-xs tracking-widest uppercase font-mono">
          {brand} {model}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Imagen principal */}
      <div
        className="relative h-80 lg:h-[420px] rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #16382c 0%, #2a6f56 50%, #112920 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        <Image
          key={images[selected]}
          src={images[selected]}
          alt={`${brand} ${model}`}
          fill
          className="object-cover transition-opacity duration-300"
          priority
        />
        {isFeatured && (
          <span
            className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
            style={{
              background: "#00e5ff",
              color: "#070a0c",
              boxShadow: "0 0 16px rgba(0,229,255,0.5)",
            }}
          >
            Destacado
          </span>
        )}
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setSelected(i)}
              className="relative shrink-0 w-20 h-16 rounded-lg overflow-hidden transition-all"
              style={{
                border: i === selected
                  ? "2px solid #00e5ff"
                  : "2px solid rgba(255,255,255,0.08)",
                boxShadow: i === selected ? "0 0 10px rgba(0,229,255,0.4)" : "none",
                opacity: i === selected ? 1 : 0.6,
              }}
            >
              <Image src={src} alt={`Vista ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
