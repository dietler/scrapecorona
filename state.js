const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

const writeStream = fs.createWriteStream('covid_state_county.csv') //output file name

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
]

console.log(`State, County, Cases`)
//Write Headers
writeStream.write(`State, County, Cases\n`)

states.forEach(state => {
  //Make Request of URL
  request(
    `https://www.livescience.com/${state
      .toLowerCase()
      .replace(' ', '-')}-coronavirus-updates.html`,
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html)

        //Loop through each team selecting its row
        $('#article-body li').each((i, el) => {
          const countyCases = $(el)
            //.children('li')
            .eq(0) //select first instance
            .text()
            .replace(/\s\s+/g, '') //trim whitespace
            .split(':')

          const county = countyCases[0]
          const cases = parseInt(countyCases[1])

          if (Number.isInteger(cases)) {
            //Write to Console
            console.log(`${state}, ${county}, ${cases}`)
            //Write Headers
            writeStream.write(`${state}, ${county}, ${cases}\n`)
          }
        })
      }
    }
  )
})
