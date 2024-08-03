// this file handles all the chonkers data
import chonkers from '@/app/data/chonkers.json'

export type Chonker = {
  key: string;
  description: string;
  category: string;
  position: google.maps.LatLngLiteral;
};

export type CategoryData = {
  key: string;
  label: string;
  count: number;
};

//add keys to each Chonker object
for (let i = 0; i < chonkers.length; i++) {
  (chonkers[i] as Chonker).key = `chonker-${i}`;
}

/**
 * Simulates async loading of the dataset from an external source.
 * (data is inlined for simplicity in our build process)
 */
export async function loadChonkerDataset(): Promise<Chonker[]> {
  // simulate loading the trees from an external source
  return new Promise(resolve => {
    setTimeout(() => resolve(chonkers as Chonker[]), 500);
  });
}


/*get the category data from our dataset*/
export function getCategories(chonkers?: Chonker[]): CategoryData[] {
  if (!chonkers) return [];

  const countByCategory: { [c: string]: number } = {};
  //count each category
  for (const t of chonkers) {
    if (!countByCategory[t.category]) countByCategory[t.category] = 0;
    countByCategory[t.category]++;
  }

  return Object.entries(countByCategory).map(([key, value]) => {
    const label = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return {
      key: key,
      label,
      count: value
    };
  });
}


//export the chonkers data
export default chonkers as Chonker[];
