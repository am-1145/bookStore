const mongoose=require('mongoose')


const bookSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true,
    },
    title:{
        type:String,
        required:true,
        
    },
    AuthorName:{
        type:String,
        // required:true,
        
    },
    likes:{
        type:Number,
        default:0
    },
      likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  }],
    Unlikes:{
        type:Number,
        default:0
    },
      UnlikedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  }],
    authorId:{
        type:String,
    },
    author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
},{timestamps:true})

const Book=mongoose.model('Book',bookSchema)

module.exports=Book