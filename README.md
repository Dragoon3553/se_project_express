# WTWR (What to Wear?): Back End

This is the Back-End Focus of the WTWR application. It focuses primarily on using MongoDB, Express.js, and Mongoose. It implements a server, Error codes and Status codes for a few different instances, including: a successful GET, a successful POST, a 404 Error, a 400 Error, and a 500 Error.

## Description

This app uses models for the properties of the clothing items and users. There is a validator in the models for the imageUrl, avatar, and email properties. There is authorization middleware up that will generate a jsonwebtoken for allowing users access to their profile, deleting their cards, and adding new cards. The controllers allow for a new user to be created, for a user to log in, creating new items, deleting items, and for liking and disliking cards.

## Tech Stack

- Authentication
- Authorization
- Express.js
- MongoDB
- Mongoose
- Routing
- Validation

## Links

- [Project Domain](https://www.wtwrexpress.datacenter.ar/)
- [Frontend GitHub repo](https://github.com/Dragoon3553/se_project_react)
- [Project Pitch](https://www.loom.com/share/1547c43c2adf4a1eacaafbfd3a3acc4e)
