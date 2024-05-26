/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_BASE_URL : process.env['API_BASE_URL'],
        ACCESS_TOKEN : process.env['ACCESS_TOKEN'],
        API_KEY : process.env['API_KEY'],
        GOOGLE_CLIENT_SECRET : process.env['GOOGLE_CLIENT_SECRET'],
        GOOGLE_CLIENT_ID : process.env['GOOGLE_CLIENT_ID'],
        GITHUB_CLIENT_SECRET : process.env['GITHUB_CLIENT_SECRET'],
        GITHUB_CLIENT_ID : process.env['GITHUB_CLIENT_ID'],
    }
};

export default nextConfig;
