
// FRAMEWORKS

const express = require('express');
const app = express();


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Group1');
    }); 

// READ courses.json file
const COURSES_PATH = __dirname + '/courses.json';



    //PORT
const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Listening on port ${port}...`));

