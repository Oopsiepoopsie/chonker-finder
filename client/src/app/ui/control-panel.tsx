import { useCallback, useState } from 'react';
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
    <div className=" absolute top-[138px] left-8  h-460 w-62 space-y-2 py-5 rounded-3xl bg-blue-900 flex flex-col justify-between items-center overflow-y-auto custom-scrollbar  ">
      {/* button for "All-chonkers" */}
      <button className={"relative group w-12 h-12  bg-pink-900 flex flex-shrink-0 items-center justify-center p-2 rounded-3xl focus:border-4 focus:border-white hover:rounded-xl transition-all duration-75 "} onClick={handleCategoryChange}><img src="\mouse-trap-svgrepo-com.png" /></button>
      {categories.map(category => (
        <button key={category.key} name={category.key} className={`category-btn group`} onClick={handleCategoryChange}>
          <img src={` /${category.label}.png`} alt="chonker avt" width={23} height={23} />
          <span className={" category-number-feature "}>
            {category.count}
          </span></button>
      ))}
    </div>
  );
};
