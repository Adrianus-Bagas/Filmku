/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_BASE_URL : process.env['API_BASE_URL'],
        ACCESS_TOKEN : process.env['ACCESS_TOKEN'],
        API_KEY : process.env['API_KEY'],
        MOVIE_BASE_URL : process.env['MOVIE_BASE_URL'],
    }
};

export default nextConfig;
