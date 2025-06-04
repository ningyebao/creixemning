import { Doughnut } from 'react-chartjs-2';
import type { ChartData, ChartOptions, TooltipItem } from 'chart.js'; // Importa TooltipItem

interface AgentPerformanceChartProps {
  data: ChartData<'doughnut'>;
}

// Paleta de colores para el gráfico de dona
const doughnutColors = [
  'rgba(255, 99, 132, 0.8)',  // Rojo
  'rgba(54, 162, 235, 0.8)',  // Azul
  'rgba(255, 206, 86, 0.8)',  // Amarillo
  'rgba(75, 192, 192, 0.8)',  // Verde-Azulado
  'rgba(153, 102, 255, 0.8)', // Morado
  'rgba(255, 159, 64, 0.8)',  // Naranja
  'rgba(199, 199, 199, 0.8)', // Gris
  'rgba(83, 102, 255, 0.8)',  // Azul Índigo
  'rgba(102, 255, 83, 0.8)',  // Verde Lima
  'rgba(255, 83, 102, 0.8)'   // Rosa
];


export function AgentPerformanceChart({ data: chartDataInput }: AgentPerformanceChartProps) {
  const data: ChartData<'doughnut'> = {
    labels: chartDataInput.labels,
    datasets: chartDataInput.datasets.map(dataset => ({
      ...dataset,
      backgroundColor: doughnutColors.slice(0, chartDataInput.labels?.length),
      borderColor: '#ffffff', // Borde blanco para separar segmentos
      borderWidth: 2,
      hoverOffset: 8, // Efecto al pasar el mouse
    })),
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const, // Leyenda a la derecha para más espacio
        labels: {
          usePointStyle: true,
          padding: 20, // Espacio para la leyenda
          boxWidth: 10,
        },
      },
      title: {
        display: true,
        text: 'Asignaciones por Agente',
        font: { size: 18, weight: 'bold' as 'bold' }, // Especificar tipo para 'weight'
        color: '#374151'
      },
      tooltip: {
        callbacks: {
          label: function(context: TooltipItem<'doughnut'>) { // Tipar 'context'
            const label = context.label || '';
            const value = context.parsed || 0;

            let total = 0;
            // Calcula el total sumando todos los valores del dataset actual
            if (context.chart.data.datasets[context.datasetIndex] && context.chart.data.datasets[context.datasetIndex].data) {
              const currentDatasetData = context.chart.data.datasets[context.datasetIndex].data as number[];
              total = currentDatasetData.reduce((acc, curr) => acc + (typeof curr === 'number' ? curr : 0), 0);
            }
            
            // Evitar división por cero si el total es 0 (aunque es poco probable si hay datos)
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) + '%' : '0%';
            return `${label}: ${value} (${percentage})`;
          }
        }
      }
    },
    cutout: '50%', // Hace que sea un gráfico de dona en lugar de pie
  };
  return <Doughnut options={options} data={data} />;
}