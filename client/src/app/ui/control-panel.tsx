import {useCallback} from 'react';

import type { CategoryData } from '../lib/chonkers';

type ControlPanelProps = {
  categories: Array<CategoryData>;
  onCategoryChange: (value: string | null) => void;
};

export const ControlPanel = ({
  categories,
  onCategoryChange
}: ControlPanelProps) => {
  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onCategoryChange(e.target.value || null);
    },
    [onCategoryChange]
  );
  return (
    <div className="absolute top-20 right-20 w-72 border rounded bg-white p-3 shadow-md cursor-auto text-sm leading-tight box-border outline-none focus:outline-black mobile-bottom">
      <div className="flex items-center">
        <label className="mr-2">Filter Chonkers:</label>{' '}
        <select onChange={handleCategoryChange} className="flex-grow border rounded text-center">
          <option value={''}>All Chonkers</option>

          {categories.map(category => (
            <option key={category.key} value={category.key}>
              {category.label} ({category.count})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
