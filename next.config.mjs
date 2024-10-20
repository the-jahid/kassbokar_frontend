/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['i.ibb.co', 'assets.aceternity.com', 'images.unsplash.com', 'i.ibb.co.com'],
      },
      env: {
        BACKEND_SERVER: 'http://localhost:5000/api/v1/',
        OPENAI_API_KEY:'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',
        IMGBB_API_KEY:'9158a3664b02eb229c17e8612c874fab'
      }
};

export default nextConfig;

