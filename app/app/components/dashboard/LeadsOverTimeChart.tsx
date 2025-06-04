import { Line } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';

interface LeadsOverTimeChartProps {
  data: ChartData<'line'>;
}

export function LeadsOverTimeChart({ data: chartDataInput }: LeadsOverTimeChartProps) {
   const data: ChartData<'line'> = {
    labels: chartDataInput.labels,
    datasets: chartDataInput.datasets.map(dataset => ({
      ...dataset,
      fill: true,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.3, // Para curvas suaves
    })),
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Tendencia de Creación de Prospectos (Leads)',
        font: { size: 18, weight: 'bold' },
        color: '#374151'
      },
       tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0, color: '#4B5563' },
        grid: { color: '#E5E7EB' },
         title: {
            display: true,
            text: 'Cantidad de Leads',
            font: { size: 14 },
            color: '#374151'
        }
      },
      x: {
        ticks: { color: '#4B5563' },
        grid: { display: false },
      },
    },
  };
  return <Line options={options} data={data} />;
}