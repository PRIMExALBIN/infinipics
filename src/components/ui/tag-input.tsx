"use client";

import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagInput({ tags, onChange, placeholder = "Add a tag..." }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      // Remove the last tag when backspace is pressed on empty input
      removeTag(tags.length - 1);
    }
  };

  const addTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !tags.includes(trimmedValue)) {
      onChange([...tags, trimmedValue]);
      setInputValue('');
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    onChange(newTags);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    // Add tag when input loses focus and has content
    if (inputValue.trim()) {
      addTag();
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  // Focus input when clicking on the container
  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className={`flex flex-wrap items-center gap-2 p-2 border rounded-lg bg-gray-800/50 border-gray-700 min-h-12 ${
        isInputFocused ? 'ring-2 ring-cyan-500 border-cyan-500' : ''
      }`}
      onClick={handleContainerClick}
    >
      {tags.map((tag, index) => (
        <div 
          key={index} 
          className="flex items-center gap-1 px-3 py-1 bg-gray-700 rounded-full text-sm"
        >
          <span>{tag}</span>
          <button 
            type="button" 
            onClick={(e) => {
              e.stopPropagation();
              removeTag(index);
            }}
            className="text-gray-400 hover:text-gray-200 focus:outline-none"
          >
            <X size={14} />
          </button>
        </div>
      ))}
      
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="flex-1 min-w-32 bg-transparent border-none outline-none text-gray-200 placeholder-gray-500"
      />
    </div>
  );
}