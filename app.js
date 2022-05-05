const express = require('express')
const app = express()

const scrapper = require('./scrapper')

const MAIN_URL = 'https://www.team.finance/view-coin/'
const PORT = 3004

app.get('/scrapper/:id', async (req, res) => {
  const { id } = req.params
  const result = await scrapper(`${MAIN_URL}${id}`)
  console.log('Done')
  res.json(result)
})

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`)
})
