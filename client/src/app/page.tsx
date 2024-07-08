import Image from "next/image";
import { unstable_noStore as noStore } from 'next/cache';

export default async function Home() {
  //IMPORTANT!!! Prevent Caching!
  //By calling noStore(), the Home component ensures that the rendered output is not cached. 
  //This is useful for dynamic data that should be fetched on each request.
  noStore();
  try{
    const response = await fetch("http://127.0.0.1:8080/api/home")
    const data = await response.json()

    return (
      <div>
        <p>{data.message}</p>
        {data.imageUrl && (
          <Image src={data.imageUrl} alt="Fetched Image" width={500} height={300} />
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return <p>Error fetching data</p>;
  }

}





//React Client Component Way

// import React, { useState, useEffect } from 'react';

// export default function Home() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8080/api/home")
//       .then((response) => response.json())
//       .then((data) => {
//         setData(data);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   return <p>{data ? JSON.stringify(data) : 'Loading...'}</p>;
// }