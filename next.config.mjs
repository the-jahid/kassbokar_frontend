/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['i.ibb.co', 'assets.aceternity.com', 'images.unsplash.com', 'i.ibb.co.com'],
      },
      env: {
        BACKEND_SERVER: 'https://kassbokar-serverside.onrender.com/api/v1/',
        OPENAI_API_KEY: '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',
        IMGBB_API_KEY:'9158a3664b02eb229c17e8612c874fab'
      }
};

export default nextConfig;

