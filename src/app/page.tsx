
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

  const yesScale = 1 + noCount * 0.45;
  const noMessage = NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)];
  const isTooBig = noCount >= 12;

  const bearImage = PlaceHolderImages.find(img => img.id === "valentine-bear");

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden">
      <HeartBackground />
      
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl w-full text-center">
        <div className="relative w-64 h-64 md:w-80 md:h-80 animate-bounce duration-[2000ms]">
          {bearImage && (
            <Image
              src={bearImage.imageUrl}
              alt={bearImage.description}
              fill
              className="object-contain rounded-3xl"
              data-ai-hint={bearImage.imageHint}
              priority
            />
          )}
          <Heart className="absolute -top-4 -right-4 text-primary w-12 h-12 fill-current animate-pulse" />
          <Heart className="absolute -bottom-4 -left-4 text-primary w-8 h-8 fill-current animate-pulse delay-700" />
        </div>

        <h1 className="font-headline text-4xl md:text-6xl text-primary font-bold drop-shadow-sm px-4 leading-tight">
          ¿Quieres ser mi San Valentín?
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 w-full min-h-[100px]">
          <div className="transition-all duration-300 ease-out" style={{ transform: `scale(${yesScale})` }}>
            <Button
              onClick={handleYesClick}
              className={`bg-[#32CD32] hover:bg-[#2EB82E] text-white px-10 py-6 text-xl rounded-full shadow-lg transition-all active:scale-95 ${
                isTooBig ? "fixed inset-0 z-[100] w-full h-full rounded-none flex items-center justify-center text-4xl" : ""
              }`}
            >
              Sí
            </Button>
          </div>

          {!isTooBig && (
            <Button
              variant="destructive"
              onClick={handleNoClick}
              className="px-8 py-6 text-xl rounded-full shadow-md transition-all active:scale-95 z-10"
            >
              {noMessage}
            </Button>
          )}
        </div>
      </div>
      
      <footer className="absolute bottom-4 text-muted-foreground font-body italic">
        Hecho con amor para ti ❤️
      </footer>
    </main>
  );
}
