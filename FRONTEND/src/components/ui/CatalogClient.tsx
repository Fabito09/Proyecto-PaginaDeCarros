"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, Zap } from "lucide-react";
import CarCard from "@/components/ui/CarCard";
import { Car } from "@/types";

interface CatalogClientProps {
  cars: Car[];
}

export default function CatalogClient({ cars }: CatalogClientProps) {
  const [query, setQuery] = useState("");
  const [onlyFeatured, setOnlyFeatured] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return cars.filter((car) => {
      const matchesQuery =
        !q ||
        car.brand.toLowerCase().includes(q) ||
        car.model.toLowerCase().includes(q) ||
        car.name.toLowerCase().includes(q) ||
        String(car.year).includes(q);
      const matchesFeatured = !onlyFeatured || car.is_featured;
      return matchesQuery && matchesFeatured;
    });
  }, [cars, query, onlyFeatured]);

  return (
    <>
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/50" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por marca, modelo o año..."
            className="input pl-11 pr-10"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted/50 hover:text-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          onClick={() => setOnlyFeatured((v) => !v)}
          className={`btn-secondary gap-2 transition-all ${onlyFeatured ? "border-primary text-primary" : ""}`}
          style={onlyFeatured ? { borderColor: "#00e5ff", color: "#00e5ff" } : {}}
        >
          <SlidersHorizontal className="w-4 h-4" />
          {onlyFeatured ? "Solo destacados" : "Filtros"}
        </button>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 card max-w-md mx-auto">
          <Zap className="w-12 h-12 text-primary/30 mx-auto mb-4" />
          <p className="text-foreground font-medium mb-2">
            Sin resultados para &quot;{query}&quot;
          </p>
          <p className="text-muted text-sm mb-4">
            Intenta con otra marca o modelo.
          </p>
          <button
            onClick={() => { setQuery(""); setOnlyFeatured(false); }}
            className="btn-secondary text-sm"
          >
            Limpiar búsqueda
          </button>
        </div>
      ) : (
        <>
          {(query || onlyFeatured) && (
            <p className="text-muted text-sm mb-6">
              {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
              {query && <span> para <span className="text-primary">&quot;{query}&quot;</span></span>}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
