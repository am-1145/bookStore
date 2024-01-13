const AuthorModel = require('../models/author.model')
const BookModel = require('../models/Book')

const getAllAuthorController = async (req, res) => {
  try {
    const authors = await AuthorModel.aggregate(
      [
        {
          $lookup: {
            from: 'books',
            localField: '_id',
            foreignField: 'author',
            as: 'books',
          },
        },
        { $addFields: { bookCount: { $size: '$books' } } },
        {
          $project: {
            id: 1,
            name: 1,
            email: 1,
            phone_no: 1,
            books: 1,
            bookCount: { $size: '$books' },
          },
        },
      ],
      '-password'
    )
    res.status(200).send({
      success: true,
      message: 'Author Data list',
      data: authors,
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

// getting data of individual author based on id

const getIndividual = async (req, res) => {
  try {
    const author = await AuthorModel.findById(req.params.id)
    if (!author) {
      return res.status(404).json({ message: 'Author not found' })
    }

    const books = await BookModel.find({ author: author._id })

    res.json({
      author_id: author._id,
      author_name: author.name,
      books: books,
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getAllAuthorController, getIndividual }
