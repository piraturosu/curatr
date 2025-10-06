module.exports = {
  usersData: [{ username: "testuser", password_hash: "hashed123" }],
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
