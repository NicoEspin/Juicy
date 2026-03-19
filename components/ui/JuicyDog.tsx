import Image from "next/image";
import type { StaticImageData } from "next/image";

interface JuicyDogProps {
  alt: string;
  className?: string;
  priority?: boolean;
  src: StaticImageData;
}

export function JuicyDog({
  alt,
  className,
  priority = false,
  src,
}: JuicyDogProps) {
  return (
    <Image
      alt={alt}
      className={className}
      priority={priority}
      sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 28vw"
      src={src}
    />
  );
}
