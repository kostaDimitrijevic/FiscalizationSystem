import { ActivityCode } from "./activitycode"

export class Company{
    firstname: string
    lastname: string
    username: string
    password: string
    phoneNumber: string
    email: string
    companyName: string
    country: string
    city: string
    zipCode: string
    street: string
    PIB: string
    registrationNumber: number
    status: boolean
    infoAddedStatus: Boolean
    activityCode: ActivityCode[] = []
    addedActivityCode: string[]
    isPDV = true
    banks : {
        bankName : String,
        bankAccount : String
    }[] = []
    numberOfWarehouses : number
    warehouseNames : {
        name : String
    }[] = []
    numberOfRegisters : number
    cashRegisters : {
        country: String,
        city: String,
        street: String
        type: String
    }[] = []
    orderers: {
        username: String
        PIB: String
        numOfDays: Number
        percentOfRebate: Number
    }
}