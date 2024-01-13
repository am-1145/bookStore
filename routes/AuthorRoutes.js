const express=require('express')
const { loginController, registerController, authController} = require('../controllers/auth')
const {getAllAuthorController, getIndividual}=require('../controllers/authorlist')
const authMiddleware = require('../middlewares/authMiddleware')
const { registerBook } = require('../controllers/bookreg')
const { getAllBook, likeBook, dislikeBook } = require('../controllers/booklist')

// router object
const router=express.Router()

// routes
// LOGIN POST
router.post('/login',loginController)

// Register POST
router.post('/register',registerController)

// book regisrer
router.post('/register-book',registerBook)

// GET Method to get authors details based on id
router.get('/authors/:id',getIndividual);


//  POST METHOD || get my own data
router.post('/me',authMiddleware,authController)

// //GET METHOD || Authors
router.get("/getAllauthors", getAllAuthorController);

// GET METHOD || BOOKS
router.get("/getAllbooks", getAllBook);

//put method || like book
router.put("/books/like/:id", authMiddleware,likeBook);
// put method || dislike book
router.put("/books/unlike/:id", dislikeBook);

module.exports=router