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
      src="/iris-logo-centered.png"
      alt="IRIS"
      width={2073}
      height={759}
      className={`block w-auto max-w-full object-contain ${className}`}
      priority={priority}
      unoptimized
    />
  );
}
