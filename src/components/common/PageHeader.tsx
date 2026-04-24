interface PageHeaderProps {
  title: string;
  description?: string;
  color?: "blue" | "teal" | "green";
}

const colorMap = {
  blue: "bg-satsuma-700",
  teal: "bg-teal-700",
  green: "bg-teal-700",
};

export default function PageHeader({
  title,
  description,
  color = "blue",
}: PageHeaderProps) {
  return (
    <div className={`${colorMap[color]} text-white py-12 md:py-16`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-white/80 text-lg leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}
