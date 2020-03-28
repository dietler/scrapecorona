const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

const writeStream = fs.createWriteStream('covid_state_county.csv') //output file name

console.log(`State, County, Cases`)
//Write Headers
writeStream.write(`State, County, Cases\n`)

//Make Request of URL
request(
  'https://www.livescience.com/georgia-coronavirus-updates.html',
  (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html)

      const state = 'georgia'

      //Loop through each team selecting its row
      $('#article-body li').each((i, el) => {
        const county = $(el)
          //.children('li')
          .eq(0) //select first instance
          .text()
          .replace(/\s\s+/g, '') //trim whitespace

        //Write to Console
        console.log(`${state}, ${county}`)
        //Write Headers
        writeStream.write(`${state}, ${county}\n`)
      })
    }
  }
)
