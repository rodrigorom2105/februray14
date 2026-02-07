"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export function PhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goToNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % PlaceHolderImages.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToPrevious = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex(
      (prev) =>
        (prev - 1 + PlaceHolderImages.length) % PlaceHolderImages.length,
    )
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isAnimating])

  const currentImage = PlaceHolderImages[currentIndex]

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="relative">
        {/* Imagen principal */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl bg-muted">
          <div
            key={currentIndex}
            className="absolute inset-0 animate-in fade-in zoom-in-95 duration-500">
            <Image
              src={currentImage.imageUrl}
              alt={currentImage.description}
              fill
              className="object-cover"
              style={{
                objectPosition: currentImage.objectPosition || "center",
              }}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>

          {/* Botones de navegación */}
          <Button
            onClick={goToPrevious}
            disabled={isAnimating}
            variant="secondary"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/95 disabled:opacity-50 transition-all">
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            onClick={goToNext}
            disabled={isAnimating}
            variant="secondary"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/95 disabled:opacity-50 transition-all">
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Contador */}
          <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
            {currentIndex + 1} / {PlaceHolderImages.length}
          </div>
        </div>

        {/* Descripción */}
        <div className="mt-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-2xl font-body text-foreground italic">
            {currentImage.description}
          </p>
        </div>

        {/* Indicadores de puntos */}
        <div className="flex justify-center gap-2 mt-8">
          {PlaceHolderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Ir a foto ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
