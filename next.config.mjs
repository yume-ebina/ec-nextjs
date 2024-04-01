/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "/public/sample.png",
    domains: ["images.microcms-assets.io"],
  },
};

export default nextConfig;
