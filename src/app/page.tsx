
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
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
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

  const paddingX = 32 + noCount * 14; 
  const paddingY = 24 + noCount * 10;  
  const fontSize = 20 + noCount * 6;  
  const isTooBig = noCount >= 10;

  const currentImage = PlaceHolderImages[currentImageIndex];

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 bg-transparent overflow-hidden">
      <HeartBackground />
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl gap-8 text-center animate-in fade-in zoom-in duration-1000">
        
        {/* Contenedor de la imagen con tamaño fijo para evitar saltos */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          <div className="relative w-full h-full animate-bounce duration-[4000ms]">
            {currentImage && (
              <Image
                key={currentImage.id}
                src={currentImage.imageUrl}
                alt={currentImage.description}
                fill
                className="object-cover rounded-3xl shadow-2xl border-4 border-primary/30 transition-opacity duration-700"
                priority
              />
            )}
            <Heart className="absolute -top-4 -right-4 text-primary w-10 h-10 fill-current animate-pulse opacity-80" />
            <Heart className="absolute -bottom-2 -left-6 text-primary w-6 h-6 fill-current animate-pulse delay-500 opacity-60" />
          </div>
        </div>

        {/* Pregunta */}
        <div className="space-y-4">
          <h1 className="font-headline text-4xl sm:text-6xl text-primary font-bold leading-tight drop-shadow-sm">
            ¿Quieres ser mi San Valentín?
          </h1>
          <p className="font-body text-lg sm:text-xl text-muted-foreground italic max-w-md mx-auto">
            Cada momento a tu lado es un regalo que quiero conservar para siempre.
          </p>
        </div>

        {/* Contenedor de Botones - Flexbox centrado que respeta el crecimiento */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 min-h-[160px] w-full relative">
          <Button
            onClick={handleYesClick}
            style={{
              paddingLeft: isTooBig ? '0' : `${paddingX}px`,
              paddingRight: isTooBig ? '0' : `${paddingX}px`,
              paddingTop: isTooBig ? '0' : `${paddingY}px`,
              paddingBottom: isTooBig ? '0' : `${paddingY}px`,
              fontSize: isTooBig ? '4rem' : `${fontSize}px`,
            }}
            className={`bg-[#32CD32] hover:bg-[#2EB82E] text-white rounded-full shadow-2xl transition-all duration-300 ease-out active:scale-95 whitespace-nowrap leading-none font-bold shrink-0 ${
              isTooBig ? "fixed inset-0 w-full h-full rounded-none flex items-center justify-center m-0 z-[100]" : "z-50"
            }`}
          >
            ¡SÍ!
          </Button>

          {!isTooBig && (
            <Button
              variant="destructive"
              onClick={handleNoClick}
              className="px-8 py-6 text-xl rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap shrink-0 z-40 font-bold min-w-[140px]"
            >
              {NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)]}
            </Button>
          )}
        </div>
      </div>
      
      <footer className="fixed bottom-4 text-muted-foreground font-body italic opacity-50 text-sm">
        Hecho con todo mi amor ❤️
      </footer>
    </main>
  );
}
