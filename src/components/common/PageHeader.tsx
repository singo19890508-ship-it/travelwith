interface PageHeaderProps {
  title: string;
  description?: string;
  color?: "blue" | "teal" | "green";
}

const colorMap = {
  blue: "from-blue-700 to-blue-500",
  teal: "from-teal-700 to-teal-500",
  green: "from-green-700 to-green-500",
};

export default function PageHeader({ title, description, color = "blue" }: PageHeaderProps) {
  return (
    <div className={`bg-gradient-to-r ${colorMap[color]} text-white py-12 md:py-16`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">{title}</h1>
        {description && (
          <p className="text-white/80 text-lg leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}
