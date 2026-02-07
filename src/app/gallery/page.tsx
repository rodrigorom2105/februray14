"use client"

import Link from "next/link"
import { ArrowLeft, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeartBackground } from "@/components/HeartBackground"
import { PhotoCarousel } from "@/components/PhotoCarousel"

export default function GalleryPage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center p-6">
      <HeartBackground />

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center gap-8 animate-in fade-in duration-700">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="font-headline text-4xl sm:text-6xl text-primary font-bold">
            Nuestros Momentos 💕
          </h1>
          <p className="font-body text-lg text-muted-foreground italic">
            Cada foto cuenta una historia especial
          </p>
        </div>

        {/* Carrusel */}
        <PhotoCarousel />

        {/* Botón de volver */}
        <Link href="/">
          <Button
            variant="link"
            className="text-primary text-lg gap-2 mt-4 hover:no-underline hover:scale-105 transition-transform">
            <ArrowLeft className="w-5 h-5" />
            Volver al inicio
          </Button>
        </Link>
      </div>

      <footer className="fixed bottom-4 text-muted-foreground font-body italic opacity-50 text-sm">
        Hecho con todo mi amor ❤️
      </footer>
    </main>
  )
}
