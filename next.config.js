module.exports = {
  reactStrictMode: true,
  env: {
    URL_BACKEND: "https://jsonplaceholder.typicode.com/",
  },
  async rewrites() {
    return [
      {
        source: "/profile", //source = path sesudah diubah
        destination: "/main/profile", // destination = path sebelum diubah
      },
    ];
  },
};
