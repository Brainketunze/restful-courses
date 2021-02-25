// FRAMEWORK

const express = require('express');
const app = express();
const fs = require('fs');
const Joi = require("joi");
const { send } = require('process');

app.use(express.json());


// READ courses.json file
const coursesPatch = `${__dirname}/courses.json`;

app.get('/', (req, res) => {
  res.send('Hello from Group1');
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

    const course = {
      id: parsedCourses.length + 1,
      name: req.body.name,
    };
    parsedCourses.push(course);

    const stringifiedCourses = JSON.stringify(parsedCourses, null, 1);

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
    JSON.parse(courses);
    res.send(courses);
  });
});


//UPDATE or EDIT
app.put('/api/courses/:id/', (req, res) => {
  
  fs.readFile(coursesPatch, 'utf-8', (err, courses) => {
    if (err) return console.error(err);

    const allCourses = JSON.parse(courses);

    const course = allCourses.find((c) => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');

    /* check these:
    res.send(course['name']);
    res.send(req.body.name);
    res.send(allCourses);
    res.send(req.params.id);
    */

    //an element of the array is the id - 1
    const num = req.params.id -1;
    allCourses[num]['name'] = req.body.name;

    const data = JSON.stringify(allCourses, '  ', 1);

    fs.writeFileSync(coursesPatch, data, (err) => {
      if (err) {
        res.status(500).send(err.message);
      }

    });

    res.send(course);
    });


});





//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));