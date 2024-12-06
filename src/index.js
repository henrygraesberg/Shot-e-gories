import express from 'express'
import dotenv from 'dotenv'
import fs from 'node:fs'

const app = express()
dotenv.config()

const __dirname = import.meta.dirname

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/index_html.css', (req, res) => {
  res.sendFile(__dirname + '/css/index_html.css')
})

app.get('/index_html.js', (req, res) => {
  res.sendFile(__dirname + '/js/index_html.js')
})

app.get('/api', (req, res) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  try {
    const categories = fs.readFileSync(__dirname + '/data/categories.json')

    const parsed = JSON.parse(categories)

    const category = parsed[Math.floor(Math.random() * parsed.length)]

    const letter = req.query.withLetter == "true" ? alphabet[Math.floor(Math.random() * alphabet.length)] : null

    if (letter) {
      res.send({
        category: category,
        letter: letter
      })
    } else {
      res.send({
        category: category
      })
    }
  } catch (err) {
    res.status(500)
    res.send({
      message: "There was an error reading the categories file.",
      errorStack: err
    })
  }
})

const httpPort = process.env.HTTP_PORT || 3000

app.listen(httpPort, () => {
  console.log(`Server is running on port: http://localhost:${httpPort}`)
  console.log(`API endpoint at:           http://localhost:${httpPort}/api`)
})
