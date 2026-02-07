
"use client";

import { useState, useEffect } from "react";
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  // Cambiar imagen cada 3 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % PlaceHolderImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

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

  const currentImage = PlaceHolderImages[currentImageIndex];

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 bg-transparent overflow-hidden">
      <HeartBackground />
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl gap-10 text-center animate-in fade-in zoom-in duration-1000">
        
        {/* Contenedor de la imagen con transición suave */}
        <div className="relative w-56 h-56 sm:w-72 sm:h-72 flex items-center justify-center">
          <div className="relative w-full h-full animate-bounce duration-[3000ms]">
            {currentImage && (
              <Image
                key={currentImage.id}
                src={currentImage.imageUrl}
                alt={currentImage.description}
                fill
                className="object-cover rounded-3xl shadow-2xl border-4 border-primary/20 transition-opacity duration-500"
                data-ai-hint={currentImage.imageHint}
                priority
              />
            )}
            <Heart className="absolute -top-6 -right-6 text-primary w-12 h-12 fill-current animate-pulse opacity-80" />
            <Heart className="absolute -bottom-4 -left-8 text-primary w-8 h-8 fill-current animate-pulse delay-700 opacity-60" />
          </div>
        </div>

        {/* Pregunta */}
        <div className="space-y-4">
          <h1 className="font-headline text-4xl sm:text-6xl text-primary font-bold leading-tight drop-shadow-md">
            ¿Quieres ser mi San Valentín?
          </h1>
          <p className="font-body text-lg text-muted-foreground italic">
            Eres la persona más especial que he conocido... ✨
          </p>
        </div>

        {/* Botones - Sistema de Flexbox para evitar solapamiento */}
        <div className="flex flex-wrap items-center justify-center gap-8 w-full min-h-[150px] relative">
          <Button
            onClick={handleYesClick}
            style={{
              paddingLeft: isTooBig ? '0' : `${paddingX}px`,
              paddingRight: isTooBig ? '0' : `${paddingX}px`,
              paddingTop: isTooBig ? '0' : `${paddingY}px`,
              paddingBottom: isTooBig ? '0' : `${paddingY}px`,
              fontSize: isTooBig ? '3.5rem' : `${fontSize}px`,
            }}
            className={`bg-[#32CD32] hover:bg-[#2EB82E] text-white rounded-full shadow-2xl transition-all duration-300 ease-out active:scale-95 whitespace-nowrap leading-none font-bold ${
              isTooBig ? "fixed inset-0 w-full h-full rounded-none flex items-center justify-center m-0 z-[100]" : "z-50"
            }`}
          >
            ¡SÍ!
          </Button>

          {!isTooBig && (
            <Button
              variant="destructive"
              onClick={handleNoClick}
              className="px-8 py-6 text-xl rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap shrink-0 z-40"
            >
              {NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)]}
            </Button>
          )}
        </div>
      </div>
      
      <footer className="fixed bottom-6 text-muted-foreground font-body italic opacity-60 text-sm">
        Para mi persona favorita ❤️
      </footer>
    </main>
  );
}
