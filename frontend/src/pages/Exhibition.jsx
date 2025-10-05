import { useState } from "react";

export default function Exhibition() {
  const [artworks, setArtworks] = useState([
    {
      id: 1,
      title: "Composition No. 4",
      artist: "Kandinsky",
      year: 1923,
      image:
        "https://krollermuller.nl/media/cache/collection_item_detail_small/media/collectionitempage/tmsImage/compositie-1917-no.-4-uitgaan-van-de-fabriek-bart-van-der-leck-47736-copyright-kroller-muller-museum.jpg?1a90d9fba093",
    },
    {
      id: 2,
      title: "Portrait of a Scholar",
      artist: "Rembrandt",
      year: "c.1500",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/24/Rembrandt_-_A_Scholar_-_WGA19200.jpg",
    },
  ]);

  const removeArtwork = (id) => {
    setArtworks(artworks.filter((a) => a.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary dark:text-primary-dark mb-6">
        Your Exhibition
      </h1>

      {artworks.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          No artworks yet. Go to the gallery and add some!
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((art) => (
            <div
              key={art.id}
              className="bg-secondary dark:bg-secondary-dark border border-border dark:border-border-dark rounded-xl shadow p-4"
            >
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h2 className="text-xl font-semibold text-primary dark:text-primary-dark">
                {art.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                {art.artist} ({art.year})
              </p>
              <button
                onClick={() => removeArtwork(art.id)}
                className="mt-3 px-3 py-1 rounded bg-destructive text-white hover:bg-red-600 dark:bg-destructive-dark"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
