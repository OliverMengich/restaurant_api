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
    DATABASE: process.env.DATABASE,
    USERNAME: process.env.USER_NAME,
    PASSWORD: process.env.PASSWORD
}
export default config;