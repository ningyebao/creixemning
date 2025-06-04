// app/routes/assignments.auto-filter.tsx
import { useState } from 'react';
import type { Agent, Campanya, LeadFilters } from '~/lib/types';

interface AutoFilterProps {
  selectedFilters: LeadFilters;
  agents: Agent[];
  campanyas: Campanya[];
}

export default function AutoFilter({ 
  selectedFilters, 
  agents, 
  campanyas 
}: AutoFilterProps) {
  // Estados para la configuración de automatización
  const [isActive, setIsActive] = useState(false);
  const [selectedAgentIds, setSelectedAgentIds] = useState<number[]>([]);
  const [selectedCampanyaIds, setSelectedCampanyaIds] = useState<number[]>([]);
  const [distribucion, setDistribucion] = useState<'equitativo' | 'todos'>('equitativo');
  const [prioritat, setPrioritat] = useState(2);
  const [potencial, setPotencial] = useState(3);
  const [observaciones, setObservaciones] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [dayOfWeek, setDayOfWeek] = useState(1); // Lunes
  const [dayOfMonth, setDayOfMonth] = useState(1);
  const [time, setTime] = useState('09:00');

  // Manejar la selección/deselección de un agente
  const toggleAgentSelection = (agentId: number) => {
    if (selectedAgentIds.includes(agentId)) {
      setSelectedAgentIds(selectedAgentIds.filter(id => id !== agentId));
    } else {
      setSelectedAgentIds([...selectedAgentIds, agentId]);
    }
  };

  // Manejar la selección/deselección de una campaña
  const toggleCampanyaSelection = (campanyaId: number) => {
    if (selectedCampanyaIds.includes(campanyaId)) {
      setSelectedCampanyaIds(selectedCampanyaIds.filter(id => id !== campanyaId));
    } else {
      setSelectedCampanyaIds([...selectedCampanyaIds, campanyaId]);
    }
  };

  // Guardar la configuración de automatización
  const saveAutoFilterConfig = () => {
    // Crear objeto de configuración
    const config = {
      isActive,
      agentIds: selectedAgentIds,
      campanyaIds: selectedCampanyaIds,
      distribucion,
      prioritat,
      potencial,
      observaciones,
      schedule: {
        frequency,
        ...(frequency === 'weekly' && { dayOfWeek }),
        ...(frequency === 'monthly' && { dayOfMonth }),
        time,
        lastRun: null,
        nextRun: null
      },
      filters: selectedFilters
    };

    // Aquí se guardaría la configuración en el backend
    console.log('Configuración de automatización guardada:', config);
    
    // Mostrar mensaje de éxito
    alert('Configuración de automatización guardada correctamente');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Automatización de asignaciones</h3>
      <p className="text-sm text-gray-500">
        Configura la asignación automática de leads que coincidan con estos filtros
      </p>

      {/* Estado de activación */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          Activar automatización
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {/* Selección de agentes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Agentes para asignación automática
        </label>
        <div className="border border-gray-300 rounded-md overflow-hidden max-h-40 overflow-y-auto">
          {agents.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No hay agentes disponibles
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {agents.map((agent) => (
                <li
                  key={agent.id_agent}
                  className={`px-4 py-2 hover:bg-gray-50 cursor-pointer ${
                    selectedAgentIds.includes(agent.id_agent) ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => toggleAgentSelection(agent.id_agent)}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedAgentIds.includes(agent.id_agent)}
                      onChange={() => {}}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {agent.nom_agent} {agent.cognom1_agent} {agent.cognom2_agent || ''}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Selección de campañas */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Campañas para asignación automática
        </label>
        <div className="border border-gray-300 rounded-md overflow-hidden max-h-40 overflow-y-auto">
          {campanyas.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No hay campañas disponibles
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {campanyas.map((campanya) => (
                <li
                  key={campanya.id_campanya}
                  className={`px-4 py-2 hover:bg-gray-50 cursor-pointer ${
                    selectedCampanyaIds.includes(campanya.id_campanya) ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => toggleCampanyaSelection(campanya.id_campanya)}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedCampanyaIds.includes(campanya.id_campanya)}
                      onChange={() => {}}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {campanya.campanya_nom}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Configuración de distribución */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de distribución
        </label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="equitativo"
              name="distribucion"
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={distribucion === 'equitativo'}
              onChange={() => setDistribucion('equitativo')}
            />
            <label htmlFor="equitativo" className="ml-2 block text-sm text-gray-700">
              Distribución equitativa (round-robin)
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="todos"
              name="distribucion"
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={distribucion === 'todos'}
              onChange={() => setDistribucion('todos')}
            />
            <label htmlFor="todos" className="ml-2 block text-sm text-gray-700">
              Asignar a todos los agentes
            </label>
          </div>
        </div>
      </div>

      {/* Configuración de prioridad y potencial */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="prioritat-auto" className="block text-sm font-medium text-gray-700 mb-1">
            Prioridad
          </label>
          <select
            id="prioritat-auto"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={prioritat}
            onChange={(e) => setPrioritat(Number(e.target.value))}
          >
            <option value="1">Baja</option>
            <option value="2">Media</option>
            <option value="3">Alta</option>
          </select>
        </div>
        <div>
          <label htmlFor="potencial-auto" className="block text-sm font-medium text-gray-700 mb-1">
            Potencial
          </label>
          <select
            id="potencial-auto"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={potencial}
            onChange={(e) => setPotencial(Number(e.target.value))}
          >
            <option value="1">Bajo</option>
            <option value="2">Medio-bajo</option>
            <option value="3">Medio</option>
            <option value="4">Medio-alto</option>
            <option value="5">Alto</option>
          </select>
        </div>
      </div>

      {/* Observaciones */}
      <div>
        <label htmlFor="observaciones-auto" className="block text-sm font-medium text-gray-700 mb-1">
          Observaciones
        </label>
        <textarea
          id="observaciones-auto"
          rows={2}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          placeholder="Añade notas o instrucciones para los agentes..."
        />
      </div>

      {/* Programación */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2">Programación</h4>
        
        <div className="space-y-3">
          {/* Frecuencia */}
          <div>
            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
              Frecuencia
            </label>
            <select
              id="frequency"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly' | 'monthly')}
            >
              <option value="daily">Diaria</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensual</option>
            </select>
          </div>

          {/* Día de la semana (solo si es semanal) */}
          {frequency === 'weekly' && (
            <div>
              <label htmlFor="dayOfWeek" className="block text-sm font-medium text-gray-700 mb-1">
                Día de la semana
              </label>
              <select
                id="dayOfWeek"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={dayOfWeek}
                onChange={(e) => setDayOfWeek(Number(e.target.value))}
              >
                <option value="1">Lunes</option>
                <option value="2">Martes</option>
                <option value="3">Miércoles</option>
                <option value="4">Jueves</option>
                <option value="5">Viernes</option>
                <option value="6">Sábado</option>
                <option value="0">Domingo</option>
              </select>
            </div>
          )}

          {/* Día del mes (solo si es mensual) */}
          {frequency === 'monthly' && (
            <div>
              <label htmlFor="dayOfMonth" className="block text-sm font-medium text-gray-700 mb-1">
                Día del mes
              </label>
              <select
                id="dayOfMonth"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={dayOfMonth}
                onChange={(e) => setDayOfMonth(Number(e.target.value))}
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Hora */}
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              Hora
            </label>
            <input
              type="time"
              id="time"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filtros seleccionados */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2">Filtros seleccionados</h4>
        
        {Object.keys(selectedFilters).length === 0 ? (
          <p className="text-sm text-gray-500">No hay filtros seleccionados</p>
        ) : (
          <div className="bg-gray-50 p-3 rounded-md">
            <ul className="text-sm text-gray-600 space-y-1">
              {Object.entries(selectedFilters).map(([key, value]) => (
                <li key={key} className="flex items-center">
                  <span className="font-medium">{key.replace(/_/g, ' ')}:</span>
                  <span className="ml-2">{String(value)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Botón para guardar la configuración */}
      <div>
        <button
          type="button"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={saveAutoFilterConfig}
          disabled={selectedAgentIds.length === 0 || selectedCampanyaIds.length === 0}
        >
          Guardar configuración de automatización
        </button>
      </div>
    </div>
  );
}