"use client"

import Link from "next/link"
import { Heart, ArrowLeft, Images } from "lucide-react"
import { HeartBackground } from "@/components/HeartBackground"
import { Button } from "@/components/ui/button"

export default function ConfirmationPage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-center">
      <HeartBackground />

      <div className="relative z-10 max-w-3xl flex flex-col items-center gap-10 animate-in fade-in zoom-in duration-700">
        <div className="space-y-6">
          <h1 className="font-headline text-5xl md:text-8xl text-primary font-bold">
            ¡Sabía que dirías que sí! 💖
          </h1>
          <p className="font-body text-2xl md:text-3xl text-muted-foreground italic px-4 max-w-xl mx-auto">
            Me haces la persona más feliz del mundo. ¡Prometo que será un San
            Valentín inolvidable!
          </p>
        </div>

        <div className="flex flex-col gap-6 items-center">
          <div className="flex gap-4">
            <Heart className="text-primary fill-current w-10 h-10 animate-bounce" />
            <Heart className="text-primary fill-current w-10 h-10 animate-bounce delay-150" />
            <Heart className="text-primary fill-current w-10 h-10 animate-bounce delay-300" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/">
              <Button
                variant="link"
                className="text-primary text-lg gap-2 hover:no-underline hover:scale-105 transition-transform">
                <ArrowLeft className="w-5 h-5" />
                Volver al inicio
              </Button>
            </Link>

            <Link href="/gallery">
              <Button
                variant="link"
                className="text-primary text-lg gap-2 hover:no-underline hover:scale-105 transition-transform">
                <Images className="w-5 h-5" />
                Ver nuestras fotos
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
    </main>
  )
}
