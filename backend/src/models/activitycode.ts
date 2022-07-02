
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let ActivityCode = new Schema({
    code: {
        type: String
    },
    activity: {
        type: String
    }
})

export default mongoose.model('ActivityCode', ActivityCode, 'activitycodes')