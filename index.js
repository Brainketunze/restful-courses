console.log('Starting the app');
const express = require('express');
//our application
const app = express();
//end-point and callback function (Route handler)
app.get('/', (req, res) =>{
    res.send('Hello World');
});

//pass a callback function
app.listen(3000, () => console.log('listening on port 3000...'));