import express from 'express';
import config from './src/config/config.js';
import router from './src/routes/routes.js';
import sequelize from './src/database/db.js';
import morgan from 'morgan'
const app = express();
if (config.NODE_ENV=== 'development') {
    app.use(morgan('dev'))
}
console.log(config.NODE_ENV);
app.use(express.json())
app.use('/api',router);
app.get('/',(rq,res)=>{
    res.send('<h1>Hello, world!!</h1>')
});
sequelize.sync({force: true}).then(()=>{
    app.listen(config.PORT,config.HOST,()=>{
        console.log(`Server Running http://${config.HOST}:${config.PORT} in ${config.NODE_ENV} mode`);
    })
}).catch(err=>{console.log(err)})
export default app;