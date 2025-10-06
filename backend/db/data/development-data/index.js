module.exports = {
  usersData: [
    {
      username: "george",
      password_hash: "$2b$10$Fak3HashedPassword12345",
    },
    {
      username: "holly",
      password_hash: "$2b$10$AnotherFakeHash67890",
    },
  ],

  exhibitionsData: [
    {
      user_id: 1,
      title: "Impressionist Highlights",
      artworks: [
        {
          id: "cma-15372",
          title: "Woman with a Hat",
          artist: "Henri Matisse",
          year: "1905",
          image:
            "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg",
          source: "Cleveland Museum of Art",
        },
        {
          id: "cma-14200",
          title: "Water Lilies",
          artist: "Claude Monet",
          year: "1919",
          image:
            "https://images.pexels.com/photos/1981468/pexels-photo-1981468.jpeg",
          source: "Cleveland Museum of Art",
        },
      ],
    },
    {
      user_id: 2,
      title: "Modern Abstracts",
      artworks: [
        {
          id: "cma-20033",
          title: "Composition VIII",
          artist: "Wassily Kandinsky",
          year: "1923",
          image:
            "https://images.pexels.com/photos/2471235/pexels-photo-2471235.jpeg",
          source: "Cleveland Museum of Art",
        },
      ],
    },
  ],
};
