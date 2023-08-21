[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/DhYPBlwE)
# Portfolio - Podcast Manager
The Podcast Manager is a web application that allows users to manage podcasts. Users can create new podcasts, view podcast details, edit existing podcasts, and delete podcasts. The backend is built using Node.js, Express.js, and a PostgreSQL database, while the frontend is developed with React and React Router.
 
- [Portfolio - Podcast Manager](#portfolio---podcast-manager)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Contributing](#contributing)
  - [Code of Conduct](#code-of-conduct)
  - [Changelog](#changelog)
  - [License](#license)

## Introduction
The Podcast Manager provides an intuitive way for users to manage their podcasts effectively. It showcases the development of a full-stack web application using modern technologies.

## Features
- Create new podcasts with titles and descriptions.
- View podcast details, including titles and descriptions.
- Edit existing podcasts to update their information.
- Delete podcasts that are no longer needed.
- User-friendly interface for seamless podcast management.

## Technologies Used
- Backend:
  - Node.js
  - Express.js
  - PostgreSQL database
- Frontend:
  - React
  - React Router
- Styling:
  - CSS for basic styling

## Getting Started

### Prerequisites
- Docker

### Installation
1. Clone the repository.
2. Navigate to the root directory and execute the following command to start the frontend, backend, and database using Docker Compose: `docker-compose up --build`


## Usage
1. Access the Podcast Manager by visiting http://localhost:3000 in your web browser.
2. Create new podcasts by entering titles and descriptions and clicking "Add Podcast".
3. Edit a podcast by clicking the "Edit Podcast" button on the podcast details page.
4. Delete a podcast by clicking the "Delete Podcast" button on the podcast details page.

## API Endpoints
The backend provides the following API endpoints:

- `GET /api/podcasts`: Get a list of all podcasts.
- `GET /api/podcasts/:id`: Get details of a specific podcast.
- `POST /api/podcasts`: Create a new podcast.
- `PUT /api/podcasts/:id`: Update a podcast.
- `DELETE /api/podcasts/:id`: Delete a podcast.

## Contributing
Contributions from the community are welcome! Please review our [Contribution Guidelines](CONTRIBUTING.md) before contributing to the Podcast Manager.

## Code of Conduct
Please adhere to our [Code of Conduct](CODE_OF_CONDUCT.md) while participating in our community.

## Changelog
See the [Changelog](CHANGELOG.md) for information about the latest releases.

## License
This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license

# Sources
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Knex.js](http://knexjs.org/)
- [Classroom GitHub](https://classroom.github.com/)