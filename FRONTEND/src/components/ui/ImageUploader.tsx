"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Upload, X, Loader2 } from "lucide-react";

const BUCKET = "car-images";

interface ImageUploaderProps {
  initialImages?: string[];
  onChange: (urls: string[]) => void;
}

export default function ImageUploader({ initialImages = [], onChange }: ImageUploaderProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError("");

    const supabase = createClient();
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      if (file.size > 5 * 1024 * 1024) {
        setError(`${file.name} supera los 5MB.`);
        continue;
      }

      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        setError(`Error al subir ${file.name}: ${uploadError.message}`);
        continue;
      }

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      newUrls.push(data.publicUrl);
    }

    const updated = [...images, ...newUrls];
    setImages(updated);
    onChange(updated);
    setUploading(false);
  }

  function removeImage(url: string) {
    const updated = images.filter((img) => img !== url);
    setImages(updated);
    onChange(updated);
  }

  return (
    <div className="space-y-3">
      {/* Zona de upload */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
        className="cursor-pointer rounded-xl flex flex-col items-center justify-center gap-3 py-10 transition-colors"
        style={{
          border: "2px dashed rgba(0,229,255,0.25)",
          background: "rgba(0,229,255,0.03)",
        }}
      >
        {uploading ? (
          <>
            <Loader2 className="w-7 h-7 text-primary animate-spin" />
            <p className="text-muted text-sm">Subiendo imágenes...</p>
          </>
        ) : (
          <>
            <Upload className="w-7 h-7 text-primary/50" />
            <p className="text-muted text-sm">
              Arrastra imágenes aquí o{" "}
              <span className="text-primary">haz clic para seleccionar</span>
            </p>
            <p className="text-muted/40 text-xs">JPG, PNG, WEBP — máx. 5 MB por imagen</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Miniaturas */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {images.map((url, i) => (
            <div
              key={url}
              className="relative w-20 h-20 rounded-lg overflow-hidden group"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Image src={url} alt={`Imagen ${i + 1}`} fill className="object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "rgba(0,0,0,0.65)" }}
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}
