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
  
//CREATE a new course

app.post('/courses.json', (req, res) => {
   
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    fs.readFile(coursesPatch, 'utf-8', (err, courses) => {
      if (err) {
        console.error(err);
      }
     
      console.log(typeof courses);
      const parsedCourses = JSON.parse(courses);
  
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
app.get('/courses.json',  (req, res) => {
    fs.readFile(coursesPatch, 'utf-8', (err, courses) => {
      if (err) {
        console.error(err);
      }
      JSON.parse(courses);
      res.send(courses);
    });
  });


//PORT
const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Listening on port ${port}...`));
