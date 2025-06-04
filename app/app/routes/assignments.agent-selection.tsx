// app/routes/assignments.agent-selection.tsx
import { useState } from 'react';
import type { Agent, Campanya } from '~/lib/types';

interface AgentSelectionProps {
  agents: Agent[];
  campanyas: Campanya[];
  selectedAgents: Agent[];
  onSelectAgents: (agents: Agent[]) => void;
  selectedCampanya: number | null;
  onSelectCampanya: (campanyaId: number | null) => void;
  assignmentType: 'roundRobin' | 'all';
  onChangeAssignmentType: (type: 'roundRobin' | 'all') => void;
  prioritat: number;
  onChangePrioritat: (prioritat: number) => void;
  potencial: number;
  onChangePotencial: (potencial: number) => void;
  observaciones: string;
  onChangeObservaciones: (observaciones: string) => void;
}

export default function AgentSelection({
  agents,
  campanyas,
  selectedAgents,
  onSelectAgents,
  selectedCampanya,
  onSelectCampanya,
  assignmentType,
  onChangeAssignmentType,
  prioritat,
  onChangePrioritat,
  potencial,
  onChangePotencial,
  observaciones,
  onChangeObservaciones
}: AgentSelectionProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Función para manejar la selección/deselección de un agente
  const toggleAgentSelection = (agent: Agent) => {
    const isSelected = selectedAgents.some(
      selectedAgent => selectedAgent.id_agent === agent.id_agent
    );
    
    if (isSelected) {
      onSelectAgents(selectedAgents.filter(
        selectedAgent => selectedAgent.id_agent !== agent.id_agent
      ));
    } else {
      onSelectAgents([...selectedAgents, agent]);
    }
  };

  // Filtrar agentes por término de búsqueda
  const filteredAgents = agents.filter(agent => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      agent.nom_agent.toLowerCase().includes(searchTermLower) ||
      agent.cognom1_agent.toLowerCase().includes(searchTermLower) ||
      (agent.cognom2_agent && agent.cognom2_agent.toLowerCase().includes(searchTermLower)) ||
      (agent.telefon_agent && agent.telefon_agent.toLowerCase().includes(searchTermLower)) ||
      (agent.NIF_agent && agent.NIF_agent.toLowerCase().includes(searchTermLower))
    );
  });

  return (
    <div className="space-y-6">
      {/* Selección de campaña */}
      <div>
        <label htmlFor="campanya" className="block text-sm font-medium text-gray-700 mb-1">
          Seleccionar campaña <span className="text-red-500">*</span>
        </label>
        <select
          id="campanya"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={selectedCampanya || ''}
          onChange={(e) => onSelectCampanya(e.target.value ? Number(e.target.value) : null)}
          required
        >
          <option value="">Seleccionar campaña</option>
          {campanyas.map((campanya) => (
            <option key={campanya.id_campanya} value={campanya.id_campanya}>
              {campanya.campanya_nom}
            </option>
          ))}
        </select>
      </div>

      {/* Selección de tipo de asignación */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de asignación
        </label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="roundRobin"
              name="assignmentType"
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={assignmentType === 'roundRobin'}
              onChange={() => onChangeAssignmentType('roundRobin')}
            />
            <label htmlFor="roundRobin" className="ml-2 block text-sm text-gray-700">
              Distribución equitativa (un lead por agente)
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="all"
              name="assignmentType"
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={assignmentType === 'all'}
              onChange={() => onChangeAssignmentType('all')}
            />
            <label htmlFor="all" className="ml-2 block text-sm text-gray-700">
              Asignar todos los leads a todos los agentes
            </label>
          </div>
        </div>
      </div>

      {/* Valoración de prioridad y potencial */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="prioritat" className="block text-sm font-medium text-gray-700 mb-1">
            Prioridad
          </label>
          <select
            id="prioritat"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={prioritat}
            onChange={(e) => onChangePrioritat(Number(e.target.value))}
          >
            <option value="1">Baja</option>
            <option value="2">Media</option>
            <option value="3">Alta</option>
          </select>
        </div>
        <div>
          <label htmlFor="potencial" className="block text-sm font-medium text-gray-700 mb-1">
            Potencial
          </label>
          <select
            id="potencial"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={potencial}
            onChange={(e) => onChangePotencial(Number(e.target.value))}
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
        <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700 mb-1">
          Observaciones
        </label>
        <textarea
          id="observaciones"
          rows={3}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={observaciones}
          onChange={(e) => onChangeObservaciones(e.target.value)}
          placeholder="Añade notas o instrucciones para los agentes..."
        />
      </div>

      {/* Selección de agentes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Seleccionar agentes <span className="text-red-500">*</span>
        </label>
        
        {/* Buscador de agentes */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Buscar agentes..."
            className="w-full p-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Lista de agentes */}
        <div className="border border-gray-300 rounded-md overflow-hidden max-h-60 overflow-y-auto">
          {filteredAgents.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No se encontraron agentes
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredAgents.map((agent) => {
                const isSelected = selectedAgents.some(
                  selectedAgent => selectedAgent.id_agent === agent.id_agent
                );
                
                return (
                  <li
                    key={agent.id_agent}
                    className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                      isSelected ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => toggleAgentSelection(agent)}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={isSelected}
                        onChange={() => {}}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {agent.nom_agent} {agent.cognom1_agent} {agent.cognom2_agent || ''}
                        </p>
                        {agent.telefon_agent && (
                          <p className="text-xs text-gray-500">
                            Tel: {agent.telefon_agent}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Información de selección */}
        <div className="mt-2 text-sm text-gray-500">
          {selectedAgents.length === 0 ? (
            <p>No hay agentes seleccionados</p>
          ) : (
            <p>
              {selectedAgents.length} agente{selectedAgents.length !== 1 ? 's' : ''} seleccionado{selectedAgents.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}