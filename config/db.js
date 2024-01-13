const mongoose=require('mongoose');
const colors=require('colors');
const { faker } = require('@faker-js/faker');
const BookModel=require("../models/Book")
const AuthorModel=require("../models/author.model")


// connecting and generating author and book data using faker js
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white);
        await BookModel.deleteMany();
        await AuthorModel.deleteMany();
        const fakeAuthor=Array.from({length:10},()=>({
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            phone_no: faker.phone.number(),
        }))
        const insertedAuthors = await AuthorModel.insertMany(fakeAuthor);
        const fakebooks=Array.from({length:10},()=>({
        id: faker.string.uuid(),
        title: `${faker.lorem.word()} ${faker.lorem.word()} ${faker.lorem.word()}`,       
  
        authorId: faker.helpers.arrayElement(insertedAuthors.map(author => author.id)),
        author: faker.helpers.arrayElement(insertedAuthors.map(author => author._id)),    }))
    await BookModel.insertMany(fakebooks);
    // await mongoose.disconnect();
} catch (error) {
        console.log(`Mongdb Server Issue ${error}`.bgRed.white);
    }
}
module.exports=connectDB;