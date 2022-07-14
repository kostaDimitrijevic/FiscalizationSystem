// export class Buyer{
//     username: String
//     password: String
//     firstname: String
//     lastname: String
//     phoneNumber: String
//     IDNumber: String
// }


import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Buyer = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    IDNumber: {
        type: String
    },
    bills : [{
        company: {
            type: String
        },
        object: {
            type: String
        },
        price: {
            type: Number
        },
        paymentMethod: {
            type: String
        }
    }]
})

export default mongoose.model('Buyer', Buyer, 'buyers')