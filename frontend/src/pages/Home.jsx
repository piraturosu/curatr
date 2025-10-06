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

  const fetchData = async (term = "", pageNum = 1) => {
    setLoading(true);
    try {
      const results = await getAllArtworks(term, pageNum, 50);
      setArtworks(results);
    } catch (err) {
      console.error(err);
      setArtworks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const searchTerm = query.trim();
    if (!searchTerm) return;

    await fetchData(query);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          View Temporary Exhibition
        </Button>
      </div>

      {/* Search Section */}
      <section className="bg-secondary dark:bg-secondary-dark rounded-2xl shadow-sm p-4 space-y-3">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artworks, artists..."
            className="flex-1 rounded-lg p-3 border border-border dark:border-border-dark bg-background dark:bg-background-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition"
          >
            Search
          </button>
        </form>

        <p className="text-xs text-gray-500">
          Press <span className="font-semibold">Enter</span> or click{" "}
          <span className="font-semibold">Search</span> to find artworks.
        </p>

        {/* Suggested Search Terms */}
        <div className="pt-2 border-t border-border dark:border-border-dark space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Try these searches:
          </h3>

          {/* Suggested Categories */}
          <div className="flex flex-wrap gap-2 text-sm">
            {[
              // Artists
              { label: "Monet", value: "monet", group: "Artist" },
              { label: "Picasso", value: "picasso", group: "Artist" },
              { label: "Van Gogh", value: "vangogh", group: "Artist" },

              // Subjects
              { label: "Portrait", value: "portrait", group: "Subject" },
              { label: "Landscape", value: "landscape", group: "Subject" },
              { label: "Flower", value: "flower", group: "Subject" },

              // Countries (adjective form)
              { label: "Italian", value: "italian", group: "Country" },
              { label: "French", value: "french", group: "Country" },
              { label: "Chinese", value: "chinese", group: "Country" },

              // Period / Style
              { label: "Renaissance", value: "renaissance", group: "Style" },
              { label: "Baroque", value: "baroque", group: "Style" },
              { label: "Modern", value: "modern", group: "Style" },

              // Material / Type
              { label: "Oil", value: "oil", group: "Material" },
              { label: "Sculpture", value: "sculpture", group: "Material" },
              { label: "Bronze", value: "bronze", group: "Material" },
            ].map((term) => (
              <button
                key={term.value}
                onClick={() => {
                  setQuery(term.value);
                  fetchData(term.value);
                }}
                className="px-3 py-1 rounded-full border border-border dark:border-border-dark bg-background dark:bg-background-dark hover:bg-primary hover:text-white transition"
              >
                {term.label}
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-500">
            Tip: Use <span className="font-semibold">adjective forms</span> like
            “italian”, “french”, or “chinese” instead of “Italy” or “France” for
            better results.
          </p>
        </div>
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
