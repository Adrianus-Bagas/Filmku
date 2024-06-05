/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_BASE_URL : process.env['API_BASE_URL'],
        ACCESS_TOKEN : process.env['ACCESS_TOKEN'],
        API_KEY : process.env['API_KEY'],
        MOVIE_BASE_URL : process.env['MOVIE_BASE_URL'],
        GOOGLE_CLIENT_SECRET : process.env['GOOGLE_CLIENT_SECRET'],
        GOOGLE_CLIENT_ID : process.env['GOOGLE_CLIENT_ID'],
        GOOGLE_STATE : process.env['GOOGLE_STATE'],
        REDIRECT_URI : process.env['REDIRECT_URI'],
        RESPONSE_TYPE : process.env['RESPONSE_TYPE'],
        SCOPE : process.env['SCOPE'],
        AUTH_GOOGLE_URL : process.env['AUTH_GOOGLE_URL'],
        TOKEN_GOOGLE_URL : process.env['TOKEN_GOOGLE_URL'],
        USER_INFO_GOOGLE_URL : process.env['USER_INFO_GOOGLE_URL'],
    }
};

export default nextConfig;
