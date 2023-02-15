/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['images.unsplash.com'],
    },
    webpack: (config) => {
        config.experiments = { ...config.experiments, ...{ topLevelAwait: true } };
        return config;
    },
};

module.exports = nextConfig;
