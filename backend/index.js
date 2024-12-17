import app from './app.js';
import db from './config/db.js';
import userModel from './model/user_model.js';

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(port, '0.0.0.0', () => { 
    console.log(`App running on port ${port}`);
});
