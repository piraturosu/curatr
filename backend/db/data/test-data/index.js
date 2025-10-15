module.exports = {
  usersData: [
    {
      username: "testuser",
      password_hash: `$2b$10$.PlU23KmZFjbJa2l0436OuMVJhsRD/RUfHf3RS.gkYy5Nve/Ruike`,
    },
  ],
  tempExhibitionsData: [
    {
      user_id: 1,
      artwork: {
        id: "pex-1001",
        title: "Sample Artwork",
        artist: "Test Artist",
        year: "2000",
        image:
          "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg",
      },
    },
  ],
  exhibitionsData: [
    {
      user_id: 1,
      title: "Test Exhibition",
      artworks: [
        {
          id: "cma-1",
          title: "Test Artwork",
          artist: "Test Artist",
          year: "2020",
          image: "https://example.com/test.jpg",
        },
      ],
    },
  ],
};
