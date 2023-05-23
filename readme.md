# Social Network API
  ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

  ## Description
  This application is a back-end environement for a social media site. The purpose of this application was to utilize newly learned MongoDB and Mongoose techniques. The application is not a fully functioning standalone app. It is an API that can be tested through Insomnia or any similar applications. This API is set up for viewing, creating, updating and deleting users. Friends can be added or removed from users. Thoughts, or posts, can be created, updated, and deleted. Reactions to the posts can be created and deleted. Overall, this is an API that offers many back-end functions of a simple social media site.

  Technologies used: MongoDB, Mongoose, Express.js, Node.js

  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Credits](#credits)



  ## Installation
  To install dependencies, use the command `npm i`.
  
  ## Usage
  To start this application, run the command `npm start`. To test the API, use Insomnia or a similar application. The routes are as follows:

**User Routes**<br>
`GET /api/users`: Get all users.<br>
`GET /api/users/:userId`: Get a single user by id.<br>
`POST /api/users`: Create a new user. Requires a JSON body with username and email.<br>
`PUT /api/users/:userId`: Update a user by id. Requires a JSON body with at least one of the following: username or email.<br>
`DELETE /api/users/:userId`: Delete a user by id.<br>
`POST /api/users/:userId/friends/:friendId`: Add a friend to a user's friend list.<br>
`DELETE /api/users/:userId/friends/:friendId`: Remove a friend from a user's friend list.<br><br>
**Thought Routes**<br>
`GET /api/thoughts`: Get all thoughts.<br>
`GET /api/thoughts/:thoughtId`: Get a single thought by id.<br>
`POST /api/thoughts`: Create a new thought. Requires a JSON body with thoughtText and userId.<br>
`PUT /api/thoughts/:thoughtId`: Update a thought by id. Requires a JSON body with thoughtText.<br>
`DELETE /api/thoughts/:thoughtId`: Delete a thought by id.<br>
`POST /api/thoughts/:thoughtId/reactions`: Add a reaction to a thought. Requires a JSON body with reactionBody and username.<br>
`DELETE /api/thoughts/:thoughtId/reactions/:reactionId`: Remove a reaction from a thought.<br>

![Screenshot of Insomnia route](./assets/screenshot.JPG)

Walkthough Video: https://drive.google.com/file/d/1XMXaBsQFI5BqZKEvbS493oTGe6wf74Ah/view

## License

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) license.

## Credits

https://www.mongodb.com/docs/<br>
https://mongoosejs.com/docs/<br>
https://expressjs.com/<br>
https://nodejs.org/en/<br>
https://www.npmjs.com/package/express<br>
https://www.npmjs.com/package/mongoose<br>
https://www.npmjs.com/package/moment<br>
