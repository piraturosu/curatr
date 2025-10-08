module.exports = {
  usersData: [
    {
      username: "testuser",
      password_hash: `$2b$10$.PlU23KmZFjbJa2l0436OuMVJhsRD/RUfHf3RS.gkYy5Nve/Ruike`,
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
