
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Artical = new Schema({
    company: {
        type: String
    },
    category: {
        name : String,
        isSub : String
    },
    articalCode : {
        type: String
    },
    articalName : {
        type: String
    },
    unit: {
        type: String
    },
    taxRate : {
        type: Number
    },
    type: {
        type: String
    },
    manufacturer: {
        type: String
    },
    country: {
        type: String
    },
    foreinName: {
        type: String
    },
    barcode: {
        type: String
    },
    customsTariff: {
        type: Number
    },
    ecoTax: {
        type: Boolean
    },
    exciseTax: {
        type: Boolean
    },
    minSupplies: {
        type: Number
    },
    maxSupplies: {
        type: Number
    },
    description: {
        type: String
    },
    decleration: {
        type: String
    },
    pricesAndState: [{
        warehouseRegisterName: String,
        purchasePrice: Number,
        sellingPrice: Number,
        currentStockStatus: Number,
        minAmount: Number,
        maxAmount: Number
    }]
})

export default mongoose.model('Artical', Artical, 'articals');