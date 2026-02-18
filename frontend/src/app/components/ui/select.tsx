import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  name?: string; // Keep for compatibility if needed, though not used in custom implementation
}

export function Select({ 
  label, 
  value, 
  onChange, 
  options, 
  className = '', 
  placeholder = 'Select option',
  disabled = false
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`w-full ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-sm text-gray-700 mb-1.5 font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`
            w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-left
            flex items-center justify-between
            transition-all duration-200
            ${disabled ? 'bg-gray-50 cursor-not-allowed text-gray-500' : 'cursor-pointer hover:border-gray-400'}
            ${isOpen ? 'ring-2 ring-blue-500 border-transparent' : 'focus:outline-none focus:ring-2 focus:ring-gray-200'}
          `}
          disabled={disabled}
        >
          <span className={`block truncate ${!selectedOption ? 'text-gray-500' : 'text-gray-900'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown 
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto animate-in fade-in zoom-in-95 duration-100 origin-top">
            <ul className="py-1">
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`
                    px-3 py-2 text-sm cursor-pointer flex items-center justify-between
                    transition-colors
                    ${option.value === value ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}
                  `}
                >
                  <span className="truncate">{option.label}</span>
                  {option.value === value && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </li>
              ))}
              {options.length === 0 && (
                <li className="px-3 py-2 text-sm text-gray-500 text-center">
                  No options available
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
