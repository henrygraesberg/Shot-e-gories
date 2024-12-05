import express from 'express'
import dotenv from 'dotenv'
import fs from 'fs'

import http from 'http'
import https from 'https'

const app = express()
dotenv.config()

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

app.get('/shotegories', (req, res) => {
  try {
    const categories = fs.readFileSync('./data/categories.json')

    const parsed = JSON.parse(categories)

    const category = parsed[Math.floor(Math.random() * parsed.length)]

    const letter = req.query.withLetter ? alphabet[Math.floor(Math.random() * alphabet.length)] : req.query.withLetter

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
  console.log(`Server is running on port ${httpPort}`)
})