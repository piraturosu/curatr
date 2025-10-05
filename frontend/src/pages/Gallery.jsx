import { useParams, Link } from "react-router-dom";

export default function Gallery() {
  const { id } = useParams();

  const artworks = {
    1: {
      title: "Composition No. 4",
      artist: "Kandinsky",
      year: 1923,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio alias quasi maiores architecto laborum nihil sunt aut provident et reprehenderit neque nam, accusantium, dolores qui aliquid blanditiis? Soluta, maiores. Praesentium cumque voluptate corporis. A consequatur iste dolores sunt magni earum pariatur, aliquam, maiores fuga rem, perferendis mollitia qui optio error!",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
      link: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    },
    2: {
      title: "Portrait of a Scholar",
      artist: "Rembrandt",
      year: 1931,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio alias quasi maiores architecto laborum nihil sunt aut provident et reprehenderit neque nam, accusantium, dolores qui aliquid blanditiis? Soluta, maiores. Praesentium cumque voluptate corporis. A consequatur iste dolores sunt magni earum pariatur, aliquam, maiores fuga rem, perferendis mollitia qui optio error!",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/24/Rembrandt_-_A_Scholar_-_WGA19200.jpg",
      link: "https://upload.wikimedia.org/wikipedia/commons/2/24/Rembrandt_-_A_Scholar_-_WGA19200.jpg",
    },
  };

  const art = artworks[id];

  if (!art) {
    return (
      <p className="text-gray-600 dark:text-gray-300">Artwork not found.</p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <img
        src={art.image}
        alt={art.title}
        className="w-full rounded-xl shadow mb-6"
      />
      <h1 className="text-3xl font-bold text-primary dark:text-primary-dark mb-2">
        {art.title}
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
        {art.artist} ({art.year})
      </p>
      <p className="mb-4 text-gray-700 dark:text-gray-300">{art.description}</p>
      <a
        href={art.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 rounded bg-primary text-white hover:bg-logo dark:bg-primary-dark dark:hover:bg-logo-dark transition"
      >
        Learn More
      </a>
      <div className="mt-6">
        <Link
          to="/exhibition"
          className="text-logo hover:underline dark:text-logo-dark"
        >
          Back to Exhibition
        </Link>
      </div>
    </div>
  );
}
