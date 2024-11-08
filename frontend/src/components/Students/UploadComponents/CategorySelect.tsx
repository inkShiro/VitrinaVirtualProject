// src/components/CategorySelect.tsx
import React from 'react';

interface CategorySelectProps {
  selectedCategories: string[];
  onChange: (selectedOptions: string[]) => void;
}

const categories = ["Desarrollo de Software", "Investigación", "Arte Digital"];

const CategorySelect = ({ selectedCategories, onChange }: CategorySelectProps) => {
  return (
    <div>
      <label className="block text-sm font-medium">Categorías</label>
      <select
        value={selectedCategories}
        onChange={(e) =>
          onChange(Array.from(e.target.selectedOptions, option => option.value))
        }
        multiple
        className="mt-1 block w-full p-2 border rounded-md"
        required
      >
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;
