# Shotegories API
An API for getting a random category for a game of categories, and potentially a letter for a game of shotegories\
(Inpired by the drinking game that the [Godfrey Twins](https://www.youtube.com/@godfreytwins) like to play)

## Using the API
Once the repository has been cloned, run the commands
```bash
npm i

node index.js
```
to install dependencies and start the server. The API will run on ```localhost:3000/shotegories``` by default, but this can be changed by adding a ```.env``` file and setting ```HTTP_PORT``` to your desired port. Upon the server starting the port the server is running on will be printed to the console.

The response is an object matching the following TypeScript interface:
```ts
interface ShotegoriesResponse {
  category: string
}
```
if you do not have the query ```withLetter``` set to true, and
```ts
interface ShotegoriesResponse {
  category: string
  letter: string
}
```
if you do

Ergo, a response to a request sent to ```localhost:3000/shotegories``` could look like:
```json
{
  "category": "Alcohol brands"
}
```
and a response to a request sent to ```localhost:3000/shotegories?withLetter=true``` could look like:
```json
{
  "category": "Alcohol brands",
  "letter": "S"
}
```

## Developing
Follow the first steps of ["Using the API"](#using-the-api) to install dependencies and run the server.\
The server does not support hot reload, so every time you make a change and want to query the API, you need to press ctrl+c and run ```node index.js``` again.\
The exception to this rule is that any changes made to ```data/categories.json``` will be up-to-date when querying the API, since it reads from the file at the time the request is received.

The project was built with [Node.js](https://nodejs.org) and [Express.js](https://expressjs.com/), and uses Nodes "fs" module to read from the ```data/categories.json``` file.