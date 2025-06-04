// app/hooks/useGeografiaData.ts
import { useState, useEffect } from 'react';
import geografiaJSON from '~/data/catalunya.json';

// Tipos para el JSON de geografía
export interface Comarca {
  comarca: string;
  municipios: string[];
}

export interface Provincia {
  provincia: string;
  comarcas: Comarca[];
}

export interface GeografiaData {
  provincias: Provincia[];
}

export function useGeografiaData() {
  const [data, setData] = useState<GeografiaData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      if (!geografiaJSON || !Array.isArray(geografiaJSON.provincias)) {
        throw new Error('El formato de los datos geográficos no es válido');
      }
      
      console.log('Datos geográficos cargados:', {
        provincias: geografiaJSON.provincias.length,
        primeraProvinciaComarcas: geografiaJSON.provincias[0]?.comarcas?.length || 0
      });
      
      setData(geografiaJSON as GeografiaData);
    } catch (err) {
      console.error('Error al cargar datos geográficos:', err);
      setError(err instanceof Error ? err : new Error('Error desconocido'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error };
}