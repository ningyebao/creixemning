import { Bar } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';

interface AssignmentsStatusChartProps {
  data: ChartData<'bar'>;
}

const statusColors = {
  "Pendiente": 'rgba(54, 162, 235, 0.7)', // Azul
  "En progreso": 'rgba(255, 206, 86, 0.7)', // Amarillo
  "Completada": 'rgba(75, 192, 192, 0.7)', // Verde
  "Cancelada": 'rgba(255, 99, 132, 0.7)', // Rojo
  "Default": 'rgba(153, 102, 255, 0.7)', // Morado para otros
};

export function AssignmentsStatusChart({ data: chartDataInput }: AssignmentsStatusChartProps) {
  const data: ChartData<'bar'> = {
    labels: chartDataInput.labels,
    datasets: chartDataInput.datasets.map(dataset => ({
      ...dataset,
      backgroundColor: chartDataInput.labels?.map(label => statusColors[label as keyof typeof statusColors] || statusColors.Default),
      borderColor: chartDataInput.labels?.map(label => (statusColors[label as keyof typeof statusColors] || statusColors.Default).replace('0.7', '1')),
      borderWidth: 1,
      hoverBackgroundColor: chartDataInput.labels?.map(label => (statusColors[label as keyof typeof statusColors] || statusColors.Default).replace('0.7', '0.9')),
      borderRadius: 4,
    })),
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 8, // Ancho de la caja de color
        }
      },
      title: {
        display: true,
        text: 'Distribución de Estados de Asignaciones',
        font: { size: 18, weight: 'bold' },
        color: '#374151' // text-gray-700
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: { size: 14, weight: 'bold'},
        bodyFont: { size: 12 },
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0, // Para asegurar números enteros en el eje Y
          color: '#4B5563', // text-gray-600
        },
        grid: {
          color: '#E5E7EB', // text-gray-200
        },
        title: {
            display: true,
            text: 'Cantidad de Asignaciones',
            font: { size: 14 },
            color: '#374151'
        }
      },
      x: {
        ticks: {
          color: '#4B5563',
        },
        grid: {
          display: false, // Ocultar rejilla vertical para un look más limpio
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  };

  return <Bar options={options} data={data} />;
}