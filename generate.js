import mongoose from "mongoose"
import {config} from "dotenv"
import {faker} from "@faker-js/faker"
import { Brand, Category, Product } from "./models/index.js"

config()

await mongoose.connect(process.env.MONGO_ADDR)
console.log('MongoDb Connected')

console.log('Generating categories')
    for (let i =1; i<=5; i++){
    await Category.create({
        name:faker.commerce.department(),
    })
    }
console.log('Generated categories')

console.log('Generating brands')
for (let i=1; i<=5; i++){
    await Brand.create({
        name:faker.company.name(),
    })
}
console.log('Generated brands')

console.log('Generating products')
const categories= await Category.find()
const brands= await Brand.find()
for (let i=1; i<=5; i++){
    await Product.create({
        name:faker.commerce.product(),
        summary:faker.commerce.productDescription(),
        description:faker.lorem.paragraphs(4, '<br/>\n'),
        price:faker.commerce.price(500,500000),
        discounted_price:null,
        images:['img1681365402241.png'],
        categoryId:categories[Math.floor(Math.random() * categories.length)]._id,
        brandId:categories[Math.floor(Math.random() * brands.length)]._id,
    })
}
console.log('Generated products')




