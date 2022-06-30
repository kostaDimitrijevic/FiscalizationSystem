import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Company = new Schema({
    firstname: {
        type: String
    },
    lastname:  {
        type: String
    },
    username:  {
        type: String
    },
    password:  {
        type: String
    },
    phoneNumber:  {
        type: String
    },
    email:  {
        type: String
    },
    companyName:  {
        type: String
    },
    country:  {
        type: String
    },
    city: {
        type: String
    },
    zipCode: {
        type: String
    },
    street:  {
        type: String
    },
    PIB:  {
        type: String
    },
    registrationNumber:  {
        type: Number
    },
})

export default mongoose.model('Company', Company, 'companies');