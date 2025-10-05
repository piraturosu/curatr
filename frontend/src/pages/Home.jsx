import { useState, useEffect, useRef } from "react";
import { getAllArtworks } from "../api";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Link } from "react-router-dom";

export default function Home() {
  const [artworks, setArtworks] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [tempExhibition, setTempExhibition] = useLocalStorage(
    "tempExhibition",
    [],
  );
  const tempSectionRef = useRef(null);

  const fetchData = async (term = "", pageNum = 1, append = false) => {
    setLoading(true);
    try {
      const results = await getAllArtworks(term, pageNum, 50);
      setArtworks((prev) => (append ? [...prev, ...results] : results));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(query);
  };

  const handleAddToExhibition = (art) => {
    if (!tempExhibition.some((item) => item.id === art.id)) {
      setTempExhibition([...tempExhibition, art]);
    }
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear your temporary exhibition?")) {
      setTempExhibition([]);
    }
  };

  const scrollToTempExhibition = () => {
    tempSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="space-y-6 text-gray-800 dark:text-gray-200">
      {/* Header / Quick Actions */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Discover Artworks</h1>
        <Button onClick={scrollToTempExhibition} className="text-sm">
          🖼 View Temporary Exhibition
        </Button>
      </div>

      {/* Search Section */}
      <section className="bg-secondary dark:bg-secondary-dark rounded-2xl shadow-sm p-4">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artworks, artists..."
            className="w-full rounded-lg p-3 border border-border dark:border-border-dark bg-background dark:bg-background-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </form>
      </section>

      {/* Discover Section */}
      <section>
        <h2 className="text-xl font-bold mb-4">Discover</h2>
        {loading ? (
          <p>Loading artworks...</p>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {artworks.map((art) => (
              <Card key={art.id} title={art.title}>
                <div className="flex gap-4">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-32 h-32 object-cover rounded-lg"
                    loading="lazy"
                    />
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <p className="font-semibold text-primary dark:text-primary-dark">
                        {art.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {art.artist} • {art.year}
                      </p>
                      <p className="text-xs mt-1 italic text-gray-500">
                        {art.source}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button onClick={() => handleAddToExhibition(art)}>
                        + Add
                      </Button>
                    <Link
                    to={`/artwork/${art.id}`}
                    className="px-3 py-1 rounded-lg border border-border dark:border-border-dark text-gray-700 dark:text-gray-200 hover:bg-secondary dark:hover:bg-secondary-dark transition"
                  >
                    👁 View
                  </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Temporary Exhibition Summary */}
      <section
        ref={tempSectionRef}
        className="bg-secondary dark:bg-secondary-dark rounded-2xl p-4 mt-8 scroll-mt-24"
      >
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-semibold">Temporary Exhibition</span>
          <div className="flex gap-4 items-center">
            {tempExhibition.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-sm text-gray-500 hover:text-red-500 transition"
              >
                Clear all
              </button>
            )}
            <Link
              to="/exhibition/temp"
              className="text-primary dark:text-primary-dark hover:underline text-sm"
            >
              View
            </Link>
          </div>
        </div>

        {tempExhibition.length === 0 ? (
          <p className="text-gray-500 italic">
            Add artworks to your temporary exhibition.
          </p>
        ) : (
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {tempExhibition.length} item{tempExhibition.length > 1 ? "s" : ""}
            </p>
            <div className="flex gap-2 overflow-x-auto">
              {tempExhibition.slice(0, 3).map((art) => (
                <img
                  key={art.id}
                  src={art.image}
                  alt={art.title}
                  className="w-20 h-20 rounded-lg object-cover shadow-sm"
                />
              ))}
              {tempExhibition.length > 3 && (
                <div className="w-20 h-20 flex items-center justify-center bg-background dark:bg-background-dark rounded-lg border border-border dark:border-border-dark text-sm text-gray-500">
                  +{tempExhibition.length - 3}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
