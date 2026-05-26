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
    <section className="py-16 bg-blue-600">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
          {title}
        </h2>
        {description && (
          <p className="text-blue-100 text-base md:text-lg mb-8 leading-relaxed">
            {description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-bold text-base rounded-xl hover:bg-blue-50 transition-colors shadow-md"
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-blue-500 text-white font-bold text-base rounded-xl hover:bg-blue-400 transition-colors border border-white/30"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
