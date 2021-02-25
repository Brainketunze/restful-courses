/*

Create course js function

*/

/*

Read course js function

*/

/*

Update course js function

*/


// DELETE - Deleting data




// delete by ID

app.delete('/data/courses.json/:id', (req, res) => {
    // read the file system and look up the course by ID
    // if doesn't exist - return 404
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        return console.error(err);
      }
  
      let myCourses = JSON.parse(data);
      const removeCourse = myCourses.find((c) => c.id === parseInt(req.params.id));
  
      if (!removeCourse) return res.status(404).send('The course with the given ID was not found');
  
      // delete
      console.log('this will be deleted ', removeCourse);
      const index = myCourses.indexOf(removeCourse);
      myCourses.splice(index, 1);
      res.send(removeCourse);
  
      // re-writing the JSON file after deleting one of the courses
      const write = JSON.stringify(myCourses, null, 4);
      console.log('write json file again');
      fs.writeFile(filePath, write, 'utf-8', (err, data) => {
        if (err) {
          return res.status(500).send(err.message);
        }
        console.log('Course was successfully deleted');
      });
    });
  });

/*

JSON file

*/