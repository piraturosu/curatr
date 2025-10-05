import { useLocalStorage } from "../hooks/useLocalStorage";
import { useState } from "react";
import { Button } from "../components/Button";
import { v4 as uuidv4 } from "uuid";

export default function ExhibitionTemp() {
  const [tempExhibition, setTempExhibition] = useLocalStorage(
    "tempExhibition",
    [],
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleRemove = (id) => {
    setTempExhibition(tempExhibition.filter((item) => item.id !== id));
  };

  const handleSave = () => {
    if (!title.trim() || !description.trim()) {
      setError("Please provide both a title and a description before saving.");
      return;
    }

    setError("");

    const newExhibition = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      items: tempExhibition,
      dateCreated: new Date().toISOString(),
    };

    // Save to permanent exhibitions list (localStorage for now)
    const saved = JSON.parse(localStorage.getItem("savedExhibitions")) || [];
    localStorage.setItem(
      "savedExhibitions",
      JSON.stringify([...saved, newExhibition]),
    );

    // Clear temp exhibition
    setTempExhibition([]);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 text-gray-800 dark:text-gray-200">
      <h2 className="text-2xl font-bold mb-4">Temporary Exhibition</h2>

      {tempExhibition.length === 0 ? (
        <p>No artworks added yet. Go back and add some!</p>
      ) : (
        <>
          <div className="space-y-2 mb-6">
            <input
              type="text"
              placeholder="Exhibition title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-border dark:border-border-dark rounded-lg bg-background dark:bg-background-dark"
            />
            <textarea
              placeholder="Add a short description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-border dark:border-border-dark rounded-lg bg-background dark:bg-background-dark h-24"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {tempExhibition.map((art) => (
              <div
                key={art.id}
                className="flex gap-3 items-center bg-secondary dark:bg-secondary-dark p-3 rounded-lg"
              >
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="font-semibold">{art.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {art.artist}
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(art.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <Button
              onClick={handleSave}
              disabled={!title.trim() || !description.trim()}
              className={`${
                !title.trim() || !description.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
            Save Exhibition
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
