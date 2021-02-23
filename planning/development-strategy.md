# Development Strategy

> `RESTFul API Web-App-courses`

Refactoring the project RESTFull API with NodeJS and Express in a functional web application.

---

## 0.Setup

_A User can see the initial repository and live demo_

- Start a repo
- Add collaborators
- Set up a project board
- Study (and modify) the backlog
- Start a development strategy.
- Create initial README file
- Create Group issue
- Turn on GitHub Pages

---

## 1. initial-application

**As a user when I visit a website I want to see what the website is about and what I can do with**

This part is create in a branch called `initial-app` and merged in the `master` when it was completed.

---
## 2. create courses

> Assigned to _Krystyna_

**As a user I want to be able to create course with a specific course name**

This part is create in a branch called `create-course` and merged in the `master` when it was completed.
### Task C: JS

- Added one route
- Added one handlers

  - Read the entire file
  - Validate the user input
  - push the user input if it is valid to the file content container
  - write the final changes to the database

- Created two functions for creating the form and fetching the data
- Alert to user if it is done with success or failure

## 3. Get All courses / Read

**As a site visitor, I want to see all courses list on the terminal or localhost so that I can examine the list.**

This user story has been developed through a branch called 'read'.

> Assign to _Krystyna & Liubov_

### Node.js

- import express framework
- import fs module
- write logic to show all list on the terminal or postman

## 4. Edit or update courses

> Assigned to _Krystyna_

**As a user I want to be able to edit the course name with a specific course id**

This part is create in a branch called `update-course` and merged in the `master` when it was completed.

### Task C: JS

- Added one route with put method
- Added one handlers

  - Read the entire file
  - Validate the user input
  - Change the course name with the new course name
  - push the changes if these are valid to the file content container
  - write the final changes to the database

- Created two functions for displaying the form and fetching the data

---
## 5. delete courses

> Assigned to _Brain_

**As a user I want to be able to delete a course with a specific course id**

This part is create in a branch called `delete-course` and merged in the `master` when it was completed.

### Task C: JS

- Added one route with delete method
- Added one handler

  - Read the entire file
  - Check if there is a course with the given ID
  - Delete the course with the given ID
  - push the changes if these are valid to the file container(virtual copy of courses.json or the variable 'parsedData')
  - write the final changes to the database(courses.json)

- Created two functions for displaying the form and fetching the data
- Alert to user if it is done with success or failure

---
## 6: Package.json

> Assigned to _Anysia_

- Brought some changes to the package.json file so that the repo can be deployed to Heroku

---

## 7. Connect to JSON and checking Mistakes

> Assigned to _Bermarte_

**As a website owner I want that my website is as user friendly and attractive as possible**

This part is create in a branch called `final-touch` and merged in the `master` when it was completed.

### Task C: JS

- Brought also another changes to the code layout
- Added more comments to document the code
- Fixed a bug

---

## 8 Deployed to Heroku

> Assigned to _Krystyna_

**As a group website We want that the website should be accessible to all people around the world**

- This part is create in a branch called `deployment` and merged in the `master` when it was completed.

---
