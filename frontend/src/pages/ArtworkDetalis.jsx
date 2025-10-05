import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArtworkById } from "../api/museumApi";
import { Button } from "../components/Button";

export default function ArtworkDetails() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const data = await getArtworkById(id);
        setArtwork(data);
      } catch (err) {
        console.error("Error fetching artwork:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArtwork();
  }, [id]);

  if (loading) return <p className="p-6">Loading artwork...</p>;
  if (!artwork) return <p className="p-6 text-red-500">Artwork not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 text-gray-800 dark:text-gray-200">
      {/* Back Button */}
      <Link to="/" className="text-primary hover:underline">
        ← Back to Discover
      </Link>

      {/* Artwork Header */}
      <h1 className="text-3xl font-bold">{artwork.title}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        {artwork.artist} • {artwork.year}
      </p>
      <p className="text-sm italic text-gray-500">{artwork.source}</p>

      {/* Image */}
      <div className="flex justify-center">
        <img
          src={artwork.image}
          alt={artwork.title}
          className="max-h-[70vh] rounded-2xl shadow-lg object-contain"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <p className="leading-relaxed">{artwork.description}</p>

        {artwork.culture && (
          <p>
            <span className="font-semibold">Culture: </span>
            {artwork.culture}
          </p>
        )}

        {artwork.technique && (
          <p>
            <span className="font-semibold">Technique: </span>
            {artwork.technique}
          </p>
        )}

        {artwork.credit && (
          <p>
            <span className="font-semibold">Credit: </span>
            {artwork.credit}
          </p>
        )}

        {artwork.link && (
          <a
            href={artwork.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary dark:text-primary-dark hover:underline block mt-2"
          >
            View on {artwork.source} →
          </a>
        )}
      </div>

      <div className="flex justify-end">
        <Button onClick={() => window.history.back()}>Close</Button>
      </div>
    </div>
  );
}
