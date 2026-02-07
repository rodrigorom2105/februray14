
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { HeartBackground } from "@/components/HeartBackground";
import { PlaceHolderImages } from "@/lib/placeholder-images";

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
];

export default function ValentineAskPage() {
  const [noCount, setNoCount] = useState(0);
  const router = useRouter();

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
  };

  const handleYesClick = () => {
    router.push("/confirm");
  };

  const paddingX = 32 + noCount * 12;
  const paddingY = 16 + noCount * 8;
  const fontSize = 18 + noCount * 4;
  const isTooBig = noCount >= 10;

  const bearImage = PlaceHolderImages.find(img => img.id === "valentine-bear");

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 bg-background overflow-hidden">
      <HeartBackground />
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl gap-8 text-center animate-in fade-in zoom-in duration-700">
        
        {/* Contenedor de la imagen */}
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
          <div className="relative w-full h-full animate-bounce duration-[3000ms]">
            {bearImage && (
              <Image
                src={bearImage.imageUrl}
                alt={bearImage.description}
                fill
                className="object-contain rounded-3xl shadow-2xl border-4 border-primary/20"
                data-ai-hint={bearImage.imageHint}
                priority
              />
            )}
            <Heart className="absolute -top-6 -right-6 text-primary w-12 h-12 fill-current animate-pulse opacity-80" />
            <Heart className="absolute -bottom-4 -left-8 text-primary w-8 h-8 fill-current animate-pulse delay-700 opacity-60" />
          </div>
        </div>

        {/* Pregunta */}
        <h1 className="font-headline text-4xl sm:text-6xl text-primary font-bold leading-tight drop-shadow-sm">
          ¿Quieres ser mi San Valentín?
        </h1>

        {/* Botones - Layout mejorado para evitar solapamiento */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full min-h-[200px]">
          <Button
            onClick={handleYesClick}
            style={{
              paddingLeft: isTooBig ? '0' : `${paddingX}px`,
              paddingRight: isTooBig ? '0' : `${paddingX}px`,
              paddingTop: isTooBig ? '0' : `${paddingY}px`,
              paddingBottom: isTooBig ? '0' : `${paddingY}px`,
              fontSize: isTooBig ? '4rem' : `${fontSize}px`,
            }}
            className={`bg-[#32CD32] hover:bg-[#2EB82E] text-white rounded-full shadow-2xl transition-all duration-300 ease-out active:scale-95 whitespace-nowrap leading-none z-50 ${
              isTooBig ? "fixed inset-0 w-full h-full rounded-none flex items-center justify-center m-0" : ""
            }`}
          >
            Sí
          </Button>

          {!isTooBig && (
            <Button
              variant="destructive"
              onClick={handleNoClick}
              className="px-8 py-6 text-xl rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
            >
              {NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)]}
            </Button>
          )}
        </div>
      </div>
      
      <footer className="fixed bottom-6 text-muted-foreground font-body italic opacity-50 text-sm">
        Hecho con amor para ti ❤️
      </footer>
    </main>
  );
}
