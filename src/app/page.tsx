
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

  // Calculamos el tamaño dinámico para que afecte al layout y no se sobrelapen
  const paddingX = 40 + noCount * 15;
  const paddingY = 20 + noCount * 8;
  const fontSize = 20 + noCount * 4;
  const isTooBig = noCount >= 12;

  const bearImage = PlaceHolderImages.find(img => img.id === "valentine-bear");

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 overflow-hidden bg-background">
      <HeartBackground />
      
      <div className="relative z-10 flex flex-col items-center justify-center gap-10 max-w-3xl w-full text-center animate-in fade-in zoom-in duration-500">
        <div className="relative w-64 h-64 md:w-80 md:h-80 animate-bounce duration-[3000ms]">
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
          <Heart className="absolute -top-4 -right-4 text-primary w-12 h-12 fill-current animate-pulse" />
          <Heart className="absolute -bottom-4 -left-4 text-primary w-8 h-8 fill-current animate-pulse delay-700" />
        </div>

        <h1 className="font-headline text-4xl md:text-7xl text-primary font-bold drop-shadow-sm px-4 leading-tight">
          ¿Quieres ser mi San Valentín?
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-4 w-full min-h-[120px]">
          <div className="flex items-center justify-center">
            <Button
              onClick={handleYesClick}
              style={{
                paddingLeft: isTooBig ? '0' : `${paddingX}px`,
                paddingRight: isTooBig ? '0' : `${paddingX}px`,
                paddingTop: isTooBig ? '0' : `${paddingY}px`,
                paddingBottom: isTooBig ? '0' : `${paddingY}px`,
                fontSize: isTooBig ? '3rem' : `${fontSize}px`,
              }}
              className={`bg-[#32CD32] hover:bg-[#2EB82E] text-white rounded-full shadow-xl transition-all duration-300 ease-out active:scale-95 ${
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
                className="px-8 py-6 text-xl rounded-full shadow-md transition-all duration-300 hover:scale-105 active:scale-95 z-10 whitespace-nowrap"
              >
                {NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)]}
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <footer className="absolute bottom-6 text-muted-foreground font-body italic opacity-70">
        Hecho con amor para ti ❤️
      </footer>
    </main>
  );
}
