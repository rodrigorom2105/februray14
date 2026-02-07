
"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles, ArrowLeft } from "lucide-react";
import { HeartBackground } from "@/components/HeartBackground";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function ConfirmationPage() {
  const catsImage = PlaceHolderImages.find(img => img.id === "celebration-cats");

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-center">
      <HeartBackground />
      
      <div className="relative z-10 max-w-2xl flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-700">
        <div className="relative w-72 h-72 md:w-96 md:h-96">
          {catsImage && (
            <Image
              src={catsImage.imageUrl}
              alt={catsImage.description}
              fill
              className="object-cover rounded-full border-8 border-primary shadow-2xl"
              data-ai-hint={catsImage.imageHint}
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Sparkles className="w-full h-full text-yellow-400 opacity-50 animate-pulse" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="font-headline text-5xl md:text-7xl text-primary font-bold">
            ¡Sabía que dirías que sí! 💖
          </h1>
          <p className="font-body text-xl md:text-2xl text-muted-foreground italic px-4">
            Me haces la persona más feliz del mundo. ¡Prometo que será un San Valentín inolvidable!
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <div className="flex gap-2">
            <Heart className="text-primary fill-current w-8 h-8 animate-bounce" />
            <Heart className="text-primary fill-current w-8 h-8 animate-bounce delay-150" />
            <Heart className="text-primary fill-current w-8 h-8 animate-bounce delay-300" />
          </div>
          
          <Link href="/">
            <Button variant="link" className="text-primary gap-2 mt-4">
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
    </main>
  );
}
