const express = require('express')
const axios = require('axios')
const app = express()

const PORT = 3005
const BASE_URL =
  'https://team-finance-backend-origdfl2wq-uc.a.run.app/api/app/overview/'

app.get('/scrapper/:id', async (req, res) => {
  const { data } = await axios.get(BASE_URL + req.params.id)
  if (data.data) {
    const {
      tokenName,
      liquidityLockedInPercent,
      tokenLockedInUsd,
      tokenCirculatingSupply,
      tokenLocked,
      tokenSymbol,
    } = data.data
    // console.log(data.data)
    res.json({
      tokenName,
      liquidityLockedInPercent,
      tokenLockedInUsd,
      [tokenSymbol + ' Locked']: tokenLocked / tokenCirculatingSupply,
    })
  } else {
    res.json({ msg: "Wasn't possible getting info from that token." })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
