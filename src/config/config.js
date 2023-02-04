import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
    debug: true,
    path: path.resolve('src','env',`${process.env.NODE_ENV}.env`)
})
const config = {
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 3000,
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:Oliver8677@localhost:5432/development_db',
    SECRET: process.env.SECRET
}
export default config;