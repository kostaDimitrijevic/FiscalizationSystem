
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Category = new Schema({
    company:{
        type: String
    },
    category: {
        type: String
    },
    subcategories: [{
        type: String
    }]
})

export default mongoose.model('Category', Category, 'categories');