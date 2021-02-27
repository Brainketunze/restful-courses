// FRAMEWORK

const express = require('express');
const app = express();
const fs = require('fs');
const Joi = require("joi");


app.use(express.json());


// READ courses.json file
const coursesPatch = `./courses.json`;

app.get('/', (req, res) => {
  res.send(`<body style="background: coral">
  <div style="text-align:center; margin-top:10%; ">
  <h3 style="color:gold">Group-1</h3>
  <h1>Welcome to  RESTFUL API courses </h1>
  <h2><a href="./api/courses" style ="color : blue">Access all the courses</h2></a>
  <h2><a href="./api/courses/1" style ="color : blue">Access a specific course with id</h2></a>
  <h2><a href="./util" style ="color : blue">Utility</h2></a>
  <h2><a href="https://www.postman.com/" style ="color : blue">Use Postman to: </a><span style ="color : red"> <br> GET <br>POST <br> PUT <br>DELETE</span></h3>
</div></body> `);
});

// GET a single course by id from courses.json
app.get('/api/courses/:id', (req, res) => {
  fs.readFile(coursesPatch, 'utf-8', (err, courses) => {
    if (err) {
      return console.error(err);
    }

    const allCourses = JSON.parse(courses);

    const course = allCourses.find((c) => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');

    res.send(course);
  });
});


//CREATE a new course

app.post('/api/courses/', (req, res) => {

  const {
    error
  } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  fs.readFile(coursesPatch, 'utf-8', (err, courses) => {
    if (err) {
      console.error(err);
    }

    console.log(typeof courses);
    let parsedCourses = JSON.parse(courses);

    const num = parsedCourses[parsedCourses.length - 1]['id']+1;

    const course = {
      id: num,
      name: req.body.name,
    };
    parsedCourses.push(course);

    const stringifiedCourses = JSON.stringify(parsedCourses, null, 3);

    fs.writeFile(coursesPatch, stringifiedCourses, 'utf-8', (err) => {
      if (err) {
        res.status(500).send(err.message);
      }
    });
    res.send(parsedCourses);
  });
});

// VALIDATE course function

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}


// GET all courses 
app.get('/api/courses/', (req, res) => {
  fs.readFile(coursesPatch, 'utf-8', (err, courses) => {
    if (err) {
      console.error(err);
    }
    const results = JSON.parse(courses);

    res.send(results);
  });
});


//UPDATE or EDIT
app.put('/api/courses/:id/', (req, res) => {

  fs.readFile(coursesPatch, 'utf-8', (err, courses) => {
    if (err) return console.error(err);

    const allCourses = JSON.parse(courses);
    const course = allCourses.find((c) => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');

    course['name'] = req.body.name;

    const data = JSON.stringify(allCourses, null, 3);

    fs.writeFileSync(coursesPatch, data, (err) => {
      if (err) {
        res.status(500).send(err.message);
      }
    });
    res.send(data);
  });

});

// DELETE by ID
app.delete("/api/courses/:id", (req, res) => {
  fs.readFile(coursesPatch, "utf-8", (err, courses) => {
    if (err) {
      console.log(err);
    }

    const allCourses = JSON.parse(courses);

    const course = allCourses.find((c) => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');

    const courseIndex = allCourses.indexOf(course);
    allCourses.splice(courseIndex, 1);
    res.send(course);

    const stringifyCourses = JSON.stringify(allCourses, null, 1);

    // write the new changes to course.json
    fs.writeFile(coursesPatch, stringifyCourses, (err) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      console.log(" The course has been deleted ");
    });
  });
});

//Utility
app.get('/util', (req, res) => {
  const path = require('path');
  res.sendFile(path.join(__dirname + '/util.html'));
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));