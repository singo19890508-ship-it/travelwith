interface StatsCardProps {
  title: string;
  value: number | string;
  description?: string;
  color?: "blue" | "green" | "yellow" | "purple";
}

const colorMap = {
  blue: "bg-blue-50 border-blue-200 text-blue-600",
  green: "bg-green-50 border-green-200 text-green-600",
  yellow: "bg-yellow-50 border-yellow-200 text-yellow-600",
  purple: "bg-purple-50 border-purple-200 text-purple-600",
};

export default function StatsCard({
  title,
  value,
  description,
  color = "blue",
}: StatsCardProps) {
  return (
    <div className={`rounded-xl border p-6 ${colorMap[color]}`}>
      <p className="text-sm font-medium opacity-75">{title}</p>
      <p className="text-4xl font-bold mt-1 mb-1">{value}</p>
      {description && <p className="text-xs opacity-60">{description}</p>}
    </div>
  );
}
