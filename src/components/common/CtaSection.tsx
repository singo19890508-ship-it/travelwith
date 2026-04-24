import { Link } from "@/i18n/navigation";

interface CtaSectionProps {
  title: string;
  description?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CtaSection({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CtaSectionProps) {
  return (
    <section className="py-16 bg-satsuma-700">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
          {title}
        </h2>
        {description && (
          <p className="text-satsuma-100/80 text-base md:text-lg mb-8 leading-relaxed">
            {description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-satsuma-700 font-bold text-base rounded-xl hover:bg-satsuma-50 transition-colors shadow-md"
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-base rounded-xl hover:bg-white/10 transition-colors"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
