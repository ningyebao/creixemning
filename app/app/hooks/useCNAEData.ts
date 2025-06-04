// app/hooks/useCNAEData.ts
import { useState, useEffect } from 'react';
import cnaeData from '~/data/cnae.json';

// Interfaz para la estructura CNAE
export interface CNAEOption {
  codigo: string | number;
  descripcion: string;
  code?: string; // Para mantener compatibilidad con el código original
  description?: string; // Para mantener compatibilidad con el código original
}

export function useCNAEData() {
  const [data, setData] = useState<CNAEOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      // Verificar que los datos tienen la estructura esperada
      if (!cnaeData || !Array.isArray(cnaeData)) {
        throw new Error('El formato de los datos CNAE no es válido');
      }
      
      // Adaptamos el formato para asegurar compatibilidad
      const formattedData = cnaeData.map(item => ({
        ...item,
        // Aseguramos tener tanto los campos originales como los que usa el componente
        code: String(item.codigo),
        description: item.descripcion
      }));
      
      setData(formattedData);
      console.log('Datos CNAE cargados:', formattedData.length);
      
    } catch (err) {
      console.error('Error al cargar datos CNAE:', err);
      setError(err instanceof Error ? err : new Error('Error desconocido'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error };
}