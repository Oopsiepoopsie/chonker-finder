import { useCallback, useState, useEffect } from 'react';
import type { CategoryData } from '../lib/chonkers';

type ControlPanelProps = {
  categories: Array<CategoryData>;
  onCategoryChange: (label: string | null) => void;
};

export const ControlPanel = ({
  categories,
  onCategoryChange
}: ControlPanelProps) => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);


  const handleCategoryChange = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onCategoryChange(e.currentTarget.name || null);
      setSelectedButton(e.currentTarget.name);
    },
    [onCategoryChange]
  );

  return (
    <div className=" absolute top-[138px] left-8 h-72 w-16 space-y-2 py-5 rounded-3xl bg-green-1000 flex flex-col justify-between items-center custom-scrollbar overflow-x-hidden overflow-y-scroll">
      {/* button for "All-chonkers" */}
      <button className="relative w-12 h-12 bg-violet-100 flex flex-shrink-0 items-center justify-center p-2 rounded-3xl focus:bg-transparent hover:rounded-xl transition-all duration-75" onClick={handleCategoryChange}>
        <img src="\mouse-trap-svgrepo-com.png" alt="mouse-trap" />
      </button>

      {categories.map(category => (

        <button name={category.key} key={category.key} className={"group category-btn "} onClick={handleCategoryChange} >
          <img src={`/${category.key}.png`} alt="chonker avt" width={23} height={23} draggable={false} />
          <span className={"category-number-feature"}
          >{category.count}
          </span>
        </button>
      ))}
    </div>
  );
};
