import React, { useState } from "react";

export interface CNAEOption {
  code: string;
  description: string;
}

interface CNAESelectProps {
  options: CNAEOption[];
  onSelect: (selected: CNAEOption) => void;
}

const CNAESelect: React.FC<CNAESelectProps> = ({ options, onSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<CNAEOption[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 1) {
      const filtered = options.filter(option =>
        option.code.toLowerCase().includes(value.toLowerCase()) ||
        option.description.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
      setShowOptions(true);
    } else {
      setFilteredOptions([]);
      setShowOptions(false);
    }
  };

  const handleOptionClick = (option: CNAEOption) => {
    setInputValue(`${option.code} - ${option.description}`);
    setShowOptions(false);
    onSelect(option);
  };

  return (
    <div className="relative">
      <input 
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="w-full border rounded p-2"
        placeholder="Busca CNAE..."
      />
      {showOptions && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded shadow max-h-60 overflow-y-auto">
          {filteredOptions.map(option => (
            <li 
              key={option.code}
              onClick={() => handleOptionClick(option)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.code} - {option.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CNAESelect;
