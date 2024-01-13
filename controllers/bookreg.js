const BookModel=require('../models/Book');
const AuthorModel=require('../models/author.model');

const registerBook = async (req, res) => {
  try {
    const exisitingBook = await BookModel.findOne({ id: req.body.id });
    if (exisitingBook) {
      return res
        .status(200)
        .send({ message: "Book Already Exist", success: false });
    }
    // console.log(req.body);
    const newBook = await new BookModel(req.body);
    const AuthorId=req.body.author;
    // console.log(AuthorId);
    const AuthorName= await AuthorModel.findById(AuthorId)
  // console.log(AuthorName);
    newBook.AuthorName=AuthorName.name;


    await newBook.save();
    res.status(201).send({ message: "Book Sucessfully uploaded", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

module.exports={registerBook}