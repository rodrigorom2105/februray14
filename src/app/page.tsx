"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { HeartBackground } from "@/components/HeartBackground"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const NO_MESSAGES = [
  "No",
  "¿Estás segura?",
  "¡Piénsalo bien!",
  "¿De verdad?",
  "Me romperás el corazón...",
  "¡Por favor!",
  "¡Di que sí!",
  "¡Voy a llorar!",
  "¡Última oportunidad!",
  "¡Ya no hay vuelta atrás!",
]

export default function ValentineAskPage() {
  const [noCount, setNoCount] = useState(0)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1)
  }

  const handleYesClick = () => {
    router.push("/confirm")
  }

  // Ambos inician con px-8 (32px), py-6 (24px) y texto xl (20px)
  const paddingX = 32 + noCount * 15
  const paddingY = 24 + noCount * 10
  const fontSize = 20 + noCount * 6
  const isTooBig = noCount >= 10

  const currentImage = PlaceHolderImages.find((img) => img.id === "foto_3")

  if (!mounted) return null

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center bg-transparent overflow-hidden p-6">
      <HeartBackground />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-2xl animate-in fade-in zoom-in duration-700">
        {/* Imagen con tamaño fijo para estabilidad */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80">
          <div className="relative w-full h-full">
            {currentImage && (
              <Image
                key={currentImage.id}
                src={currentImage.imageUrl}
                alt={currentImage.description}
                sizes="256px"
                fill
                className="object-cover rounded-3xl shadow-2xl border-4 border-primary/20 transition-opacity duration-500"
                priority
              />
            )}
            <Heart className="absolute -top-4 -right-4 text-primary w-10 h-10 fill-current animate-pulse opacity-80" />
          </div>
        </div>

        {/* Texto */}
        <div className="space-y-4">
          <h1 className="font-headline text-5xl sm:text-7xl text-primary font-bold leading-tight drop-shadow-sm">
            ¿Quieres ser mi San Valentín?
          </h1>
          <p className="font-body text-xl text-muted-foreground italic max-w-md mx-auto">
            Cada momento a tu lado es un regalo que quiero conservar para
            siempre.
          </p>
        </div>

        {/* Botones */}
        <div className="flex flex-wrap items-center justify-center gap-6 min-h-[180px] w-full">
          <Button
            onClick={handleYesClick}
            style={{
              paddingLeft: isTooBig ? "0" : `${paddingX}px`,
              paddingRight: isTooBig ? "0" : `${paddingX}px`,
              paddingTop: isTooBig ? "0" : `${paddingY}px`,
              paddingBottom: isTooBig ? "0" : `${paddingY}px`,
              fontSize: isTooBig ? "4rem" : `${fontSize}px`,
            }}
            className={`bg-[#32CD32] hover:bg-[#2EB82E] text-white rounded-full shadow-2xl transition-all duration-300 ease-out active:scale-95 whitespace-nowrap leading-none font-bold min-w-[140px] ${
              isTooBig
                ? "fixed inset-0 w-full h-full rounded-none flex items-center justify-center m-0 z-[100]"
                : "relative z-50"
            }`}>
            ¡SÍ!
          </Button>

          {!isTooBig && (
            <Button
              variant="destructive"
              onClick={handleNoClick}
              className="px-8 py-6 text-xl rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap font-bold min-w-[140px] z-40">
              {NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)]}
            </Button>
          )}
        </div>
      </div>

      <footer className="fixed bottom-4 text-muted-foreground font-body italic opacity-50 text-sm">
        Hecho con todo mi amor ❤️
      </footer>
    </main>
  )
}
