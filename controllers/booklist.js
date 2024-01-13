const BookModel = require('../models/Book')
const AuthorModel = require('../models/author.model')

// Getting all books in descending order of likes

const getAllBook = async (req, res) => {
  try {
    const Books = await BookModel.find({}).sort({ likes: -1 })
    res.status(200).send({
      success: true,
      message: 'Book list',
      data: Books,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'error while getting author data',
      error,
    })
  }
}

// like book function
const likeBook = async (req, res) => {
  const bookId = req.params.id
  const userId = req.author.id

  try {
    const book = await BookModel.findById(bookId)

    if (!book) {
      return res.status(404).send({
        success: false,
        message: 'Book not found',
      })
    }
    if (book.likedBy.includes(userId)) {
      return res.status(400).send({
        success: false,
        message: 'You have already liked this book',
      })
    }

    book.likes += 1
    book.likedBy.push(userId)

    await book.save()

    res.status(200).send({
      success: true,
      message: 'Book liked successfully',
      data: book,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error while liking the book',
      error,
    })
  }
}

// dislike book function
const dislikeBook = async (req, res) => {
  const bookId = req.params.id

  try {
    const book = await BookModel.findById(bookId)

    if (!book) {
      return res.status(404).send({
        success: false,
        message: 'Book not found',
      })
    }

    book.Unlikes += 1

    await book.save()

    res.status(200).send({
      success: true,
      message: 'Book disliked successfully',
      data: book,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error while liking the book',
      error,
    })
  }
}

module.exports = { getAllBook, likeBook, dislikeBook }
