
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

  // Ajustamos los valores para un crecimiento equilibrado
  const paddingX = 32 + noCount * 10;
  const paddingY = 16 + noCount * 6;
  const fontSize = 18 + noCount * 4;
  const isTooBig = noCount >= 10;

  const bearImage = PlaceHolderImages.find(img => img.id === "valentine-bear");

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 bg-background overflow-hidden">
      <HeartBackground />
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl gap-6 sm:gap-10 text-center animate-in fade-in zoom-in duration-500">
        
        {/* Contenedor de la imagen con corazones decorativos */}
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 animate-bounce duration-[3000ms] flex items-center justify-center">
          {bearImage && (
            <Image
              src={bearImage.imageUrl}
              alt={bearImage.description}
              fill
              className="object-contain rounded-3xl shadow-lg"
              data-ai-hint={bearImage.imageHint}
              priority
            />
          )}
          {/* Los corazones son absolutos y no empujan el contenido */}
          <Heart className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 text-primary w-10 h-10 sm:w-14 sm:h-14 fill-current animate-pulse" />
          <Heart className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 text-primary w-6 h-6 sm:w-10 sm:h-10 fill-current animate-pulse delay-700" />
        </div>

        {/* Título centrado */}
        <h1 className="font-headline text-3xl sm:text-5xl md:text-7xl text-primary font-bold leading-tight px-2 drop-shadow-sm max-w-2xl">
          ¿Quieres ser mi San Valentín?
        </h1>

        {/* Contenedor de botones: flex-wrap evita que se encimen y mantiene el centro */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 w-full min-h-[140px] px-4">
          <div className="flex items-center justify-center">
            <Button
              onClick={handleYesClick}
              style={{
                paddingLeft: isTooBig ? '0' : `${paddingX}px`,
                paddingRight: isTooBig ? '0' : `${paddingX}px`,
                paddingTop: isTooBig ? '0' : `${paddingY}px`,
                paddingBottom: isTooBig ? '0' : `${paddingY}px`,
                fontSize: isTooBig ? '4rem' : `${fontSize}px`,
              }}
              className={`bg-[#32CD32] hover:bg-[#2EB82E] text-white rounded-full shadow-2xl transition-all duration-300 ease-out active:scale-95 whitespace-nowrap leading-none ${
                isTooBig ? "fixed inset-0 z-[100] w-full h-full rounded-none flex items-center justify-center m-0" : ""
              }`}
            >
              Sí
            </Button>
          </div>

          {!isTooBig && (
            <div className="flex items-center justify-center">
              <Button
                variant="destructive"
                onClick={handleNoClick}
                className="px-6 py-4 sm:px-10 sm:py-6 text-lg sm:text-xl rounded-full shadow-md transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                {NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)]}
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <footer className="fixed bottom-6 text-muted-foreground font-body italic opacity-60 text-sm">
        Hecho con amor para ti ❤️
      </footer>
    </main>
  );
}
