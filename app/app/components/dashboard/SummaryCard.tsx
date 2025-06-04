import type { ElementType } from 'react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: ElementType;
  iconColor?: string;
  bgColor?: string; // Para el fondo del icono
  textColor?: string; // Para el texto del valor
}

export function SummaryCard({
  title,
  value,
  icon: Icon,
  iconColor = "text-white",
  bgColor = "bg-blue-500",
  textColor = "text-gray-800",
}: SummaryCardProps) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-lg flex items-center space-x-4 hover:shadow-xl transition-shadow duration-300">
      <div className={`p-3 rounded-full ${bgColor} ${iconColor}`}>
        <Icon className="h-7 w-7" />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className={`text-2xl font-semibold ${textColor}`}>{value}</p>
      </div>
    </div>
  );
}