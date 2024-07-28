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
    <div className=" fixed  top-[138px] left-8 h-460 w-60 space-y-2 py-5 
    rounded-3xl bg-blue-900 flex flex-col justify-between items-center overflow-y-auto custom-scrollbar  ">
      {/* button for "All-chonkers" */}
      <button className={`${selectedButton === '' ? 'active' : ''}  w-12 h-12  bg-pink-900 
      flex flex-shrink-0 items-center justify-center p-2 rounded-3xl hover:rounded-xl `} onClick={handleCategoryChange}><img src="\mouse-trap-svgrepo-com.png" /></button>
      {categories.map(category => (
        <><button key={category.key} name={category.key} className={`${selectedButton === category.key ? 'active' : ''} 
        w-12 h-12 bg-blue-100 flex flex-shrink-0 items-center justify-center rounded-3xl hover:rounded-xl transition-all duration-75 linear`} onClick={handleCategoryChange}>
          <img src={` /${category.label}.png`} alt="chonker avt" width={23} height={23} /></button>
        </>))}
    </div>
  );
};
