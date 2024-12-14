const app=require('./app');
const db=require('./config/db');
const userModel=require('./model/user_model');

const port = 3000;

app.get('/',(req,res)=>{
    res.send("Hello world");
})

app.listen(port, '0.0.0.0', () => {
  console.log(`App running on port ${port}`);
});
