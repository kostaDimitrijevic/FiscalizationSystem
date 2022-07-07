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
    companyLogoPath:{
        type: String
    },
    status: {
        type: Boolean
    },
    infoAddedStatus: {
        type: Boolean
    },
    category: {
        type: String
    },
    activityCodes: [{
        type: String
    }],
    isPDV: {
        type: Boolean
    },
    banks: [{
        bankName:{
            type: String
        },
        bankAccount:{
            type: String
        }
    }],
    numberOfWarehouses: {
        type: Number
    },
    warehouses: [{
        name:{
            type: String
        }
    }],
    numberOfRegisters: {
        type: Number
    },
    cashRegisters: [{
        registerName: {
            type: String
        },
        country: {
            type: String
        },
        city: {
            type: String
        },
        street: {
            type: String
        },
        type: {
            type: String
        }
    }],
    orderers: [{
        username: {
            type: String
        },
        PIB: {
            type: String
        },
        numOfDays: {
            type: Number
        },
        percentOfRebate: {
            type: Number
        }
    }]

})

export default mongoose.model('Company', Company, 'companies');