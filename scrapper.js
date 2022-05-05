const puppeteer = require('puppeteer')

const scrapper = async (url) => {
  console.log('Getting info')
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    })
    const page = await browser.newPage()

    await page.setDefaultNavigationTimeout(0)

    await page.goto(url)
    await page.waitForSelector('.ant-card.ant-card-bordered')

    const elements = await page.evaluate(() => {
      const name = document.querySelector('.token-info-container h1').innerText

      const liquidity =
        document
          .querySelector(
            '.ant-card.ant-card-bordered .ant-card-body > div > .coin-content-card > p'
          )
          .innerText.split('%')[0] + '%'

      const name_locked = document.querySelector(
        '.ant-card.ant-card-bordered .ant-card-body > div + div > .coin-content-card > .left-content > div > p.coin-text'
      ).innerText

      const currency_locked = document
        .querySelector(
          '.ant-card.ant-card-bordered .ant-card-body > div + div > .coin-content-card > p'
        )
        .innerText.split('(')[1]
        .replace(')', '')

      const lockup_value = document.querySelector(
        '.ant-card.ant-card-bordered .ant-card-head .ant-card-head-wrapper .ant-card-head-title > div > div > div + div .heading-card'
      ).innerText

      const data = {
        name: name || 'Not defined',
        'Liquidity Locked': liquidity,
        [name_locked]: currency_locked,
        'Lockup Value': lockup_value,
      }

      // console.log(data)
      return data
    })

    // console.log('Data:')
    // console.log(elements)
    // await page.screenshot({ path: 'example.png' })

    await browser.close()
    return elements
  } catch (error) {
    console.log('Something went wrong')
    console.log(error)
  }
}

module.exports = scrapper
