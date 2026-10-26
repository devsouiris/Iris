import Image from "next/image";

export function BrandLogo({
  className,
  priority = false,
}: {
  className: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/iris-logo.png"
      alt="IRIS"
      width={1200}
      height={380}
      className={`block w-auto max-w-full object-contain ${className}`}
      priority={priority}
      unoptimized
    />
  );
}
