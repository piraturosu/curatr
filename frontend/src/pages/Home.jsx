import { useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";

export default function Home() {
  const [artworks] = useState([
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
    {
      id: 3,
      title: "Mona Lisa",
      artist: "Leonardo da Vinci",
      year: 1517,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
    },
  ]);

  return (
    <div className="space-y-6 text-gray-800 dark:text-gray-200">
      {/* Search + Filters */}
      <section className="bg-secondary dark:bg-secondary-dark rounded-2xl shadow-sm p-4">
        <input
          type="text"
          placeholder="Search artworks, artists..."
          className="w-full rounded-lg p-3 border border-border dark:border-border-dark bg-background dark:bg-background-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <div className="flex flex-wrap gap-2 mt-4">
          {["All sources", "Painting", "1900–1950", "Popular"].map((filter) => (
            <span
              key={filter}
              className="px-3 py-1 rounded-full bg-background dark:bg-background-dark border border-border dark:border-border-dark text-sm cursor-pointer hover:bg-primary hover:text-white transition"
            >
              {filter}
            </span>
          ))}
        </div>
      </section>

      {/* Discover Section */}
      <section>
        <h2 className="text-xl font-bold mb-4">Discover</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {artworks.map((art) => (
            <Card key={art.id} title={art.title}>
              <div className="flex gap-4">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <p className="font-semibold text-primary dark:text-primary-dark">
                      {art.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {art.artist} • {art.year}
                    </p>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button className="px-3 py-1 rounded-lg border border-border dark:border-border-dark text-gray-700 dark:text-gray-200 hover:bg-secondary dark:hover:bg-secondary-dark transition">
                      👁 View
                    </button>
                    <Button>+ Add</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Temporary Collection */}
      <section className="bg-secondary dark:bg-secondary-dark rounded-2xl p-4 mt-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-semibold">Temporary Collection</span>
          <span className="text-sm text-gray-500">3 items</span>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {artworks.slice(0, 3).map((art) => (
            <img
              key={art.id}
              src={art.image}
              alt={art.title}
              className="w-20 h-20 rounded-lg object-cover"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
