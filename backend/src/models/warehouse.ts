
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Warehouse = new Schema({
    idW: {
        username: String,
        idWare: String
    },
    name: {
        type: String
    }
})

export default mongoose.model('Warehouse', Warehouse, 'warehouses');