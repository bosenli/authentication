const db = require('../db')
const Item = require('../models/item')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

//npm i @faker-js/faker
const { faker }= require('@faker-js/faker')

const main = async () => {
  const items = [...Array(100)].map(item => (  //array of 100
      {
          title: faker.lorem.word(),
          link: faker.lorem.sentence()
      }
  ))

  await Item.insertMany(items)
  console.log("Created items!")
}
const run = async () => {
  await main()
  db.close()
}

run()