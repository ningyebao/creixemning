// app/components/CNAESelect.tsx
import { useState, useEffect, useRef } from 'react';
import { useCNAEData, type CNAEOption } from '~/hooks/useCNAEData';

interface CNAESelectProps {
  onSelect: (cnae: CNAEOption) => void;
  value?: string;
  placeholder?: string;
  className?: string;
}

export default function CNAESelect({ 
  onSelect, 
  value = '', 
  placeholder = 'Buscar código CNAE...', 
  className = '' 
}: CNAESelectProps) {
  const { data, isLoading, error } = useCNAEData();
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<CNAEOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<CNAEOption | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cuando cambie el valor externo
  useEffect(() => {
    if (value && data.length > 0) {
      const option = data.find(opt => String(opt.codigo) === value || opt.code === value);
      if (option) {
        setSelectedOption(option);
        setInputValue(`${option.codigo} - ${option.descripcion}`);
      }
    } else if (!value) {
      setSelectedOption(null);
      setInputValue('');
    }
  }, [value, data]);

  // Filtrar opciones basado en el input
  useEffect(() => {
    // Si no hay input, mostrar todas las opciones (hasta un límite)
    if (!inputValue.trim()) {
      setFilteredOptions(data.slice(0, 100));
      return;
    }

    const lowerCaseInput = inputValue.toLowerCase();
    const filtered = data
      .filter(option => 
        String(option.codigo).toLowerCase().includes(lowerCaseInput) || 
        option.descripcion.toLowerCase().includes(lowerCaseInput) ||
        `${option.codigo} - ${option.descripcion}`.toLowerCase().includes(lowerCaseInput)
      )
      .slice(0, 100);

    setFilteredOptions(filtered);
  }, [inputValue, data]);

  // Manejar clics fuera del componente para cerrar el dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Inicializar las opciones filtradas cuando se abra el dropdown
  useEffect(() => {
    if (isOpen && data.length > 0 && filteredOptions.length === 0) {
      setFilteredOptions(data.slice(0, 100));
    }
  }, [isOpen, data, filteredOptions]);

  // Manejar la selección de una opción
  const handleSelectOption = (option: CNAEOption) => {
    setSelectedOption(option);
    setInputValue(`${option.codigo} - ${option.descripcion}`);
    setIsOpen(false);
    onSelect(option);
  };

  // Manejar eventos de teclado (navegación con teclado)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Si no hay opciones filtradas, no hacemos nada
    if (filteredOptions.length === 0) return;

    // Flecha abajo
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => 
        prev < filteredOptions.length - 1 ? prev + 1 : 0
      );
    }
    // Flecha arriba
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => 
        prev > 0 ? prev - 1 : filteredOptions.length - 1
      );
    }
    // Enter para seleccionar la opción resaltada
    else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelectOption(filteredOptions[highlightedIndex]);
    }
    // Escape para cerrar el dropdown
    else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Abrir dropdown al hacer clic en el input o el botón
  const handleInputClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Si no hay opciones filtradas, mostrar todas
      if (filteredOptions.length === 0) {
        setFilteredOptions(data.slice(0, 100));
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white pr-10"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={handleInputClick}
          onClick={handleInputClick}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <button
            type="button"
            className="p-1 text-gray-400 hover:text-gray-600"
            onClick={() => {
              setIsOpen(!isOpen);
              if (!isOpen && filteredOptions.length === 0) {
                setFilteredOptions(data.slice(0, 100));
              }
            }}
          >
            <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto"
        >
          {isLoading ? (
            <div className="px-4 py-2 text-sm text-blue-600">
              Cargando opciones CNAE...
            </div>
          ) : filteredOptions.length === 0 ? (
            <div className="px-4 py-2 text-sm text-gray-500">
              No se encontraron resultados
            </div>
          ) : (
            <ul className="py-1">
              {filteredOptions.map((option, index) => (
                <li
                  key={option.codigo}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 ${
                    highlightedIndex === index ? 'bg-blue-50 text-blue-700' : ''
                  }`}
                  onClick={() => handleSelectOption(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <span className="font-semibold">{option.codigo}</span>
                  <span className="px-1">-</span>
                  <span>{option.descripcion}</span>
                </li>
              ))}
              {data.length > 100 && filteredOptions.length === 100 && !inputValue.trim() && (
                <li className="px-4 py-2 text-xs text-center text-gray-500 italic border-t border-gray-100"> 
                  Mostrando 100 de {data.length} opciones. Escribe para filtrar más resultados.
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}