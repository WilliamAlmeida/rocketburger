module.exports = {
  images: {
    domains: ['ibox.delivery'],
  },
  async rewrites() {
    return [
      {
        source: "/api/produtos",
        destination: "https://ibox.delivery/api/v1/empresa/produtos",
      },
      {
        source: "/api/categorias",
        destination: "https://ibox.delivery/api/v1/empresa/categorias",
      }
    ];
  },
}
