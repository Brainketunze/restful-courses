// FRAMEWORK

const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());


// READ courses.json file
const coursesPatch = __dirname + '/courses.json';

app.get('/', (req, res) => {
    res.send('Hello from Group1');
    }); 


// READ courses.json file
const coursesPatch = __dirname + '/courses.json';

// GET a single course by id from courses.json
app.get('/courses.json/:id', (req, res) => {
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

// GET all courses 
app.get('/courses.json',  (req, res) => {
    fs.readFile(coursesPatch, 'utf-8', (err, courses) => {
      if (err) {
        console.error(err);
      }
      JSON.parse(courses);
      res.send(courses);
    });
  });

//UPDATE or EDIT
app.put('courses.json/:id', (req, res) => {
  fs.readFile(coursesPatch, 'utf-8', (err, courses) => {
    if (err) {
      return console.error(err);
    }

  const course = allCourses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found');//404 (object not found)

  //validate
  //If invalid, return 400 - Bad request
  const { error } = validateCourse(req.body); // result.error
  if (error) return res.status(400).send(error.details[0].message);
  

  //Update course
  course.name = req.body.name;
  res.send(course); //Return the update course
  });
});

function validateCourse(course) {
  const schema = {
      name:Joi.string().min(3).required() 
  };
  return Joi.validate(course, schema);
}

//PORT
const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Listening on port ${port}...`));
