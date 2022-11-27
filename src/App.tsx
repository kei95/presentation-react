import { useEffect, useState } from "react";

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

/**
 * function to retrieve my following users in github
 */
async function fetchFollowers(): Promise<Photo[] | undefined> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos`);
    const isResponseSuccessful = res.status < 300 && res.status > 199;

    if (isResponseSuccessful) {
      const jsonRes = await res.json();
      return jsonRes;
    }
  } catch (error) {
    console.error("error!", error);
  }

  // case of failure/error
  return undefined;
}

export function App() {
  const [photos, setPhotos] = useState<Photo[] | undefined>(undefined);

  useEffect(() => {
    async function getFollowers() {
      const res = await fetchFollowers();
      setPhotos(res);
    }

    getFollowers();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Welcome to Create React App!</h1>
      {photos ? (
        <ul>
          {photos.map((photo, idx) => (
            <a href={photo.url} key={`follower_${photo.thumbnailUrl}_${idx}`}>
              <li className="card">
                <p>{photo.title}</p>
                {photo.url}
              </li>
            </a>
          ))}
        </ul>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
