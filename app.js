import express from 'express';
import router from './src/routes/routes.js';
import sequelize from './src/database/db.js';
const app = express();
app.use(express.json())
app.use('/api',router);
app.get('/',(rq,res)=>{
    res.send('<h1>Hello, world!!</h1>');
});
sequelize.sync().then(()=>{
    app.listen(3001,()=>{
        console.log("Server Running");
    })
})