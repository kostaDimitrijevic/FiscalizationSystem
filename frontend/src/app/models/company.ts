import { ActivityCode } from "./activitycode"
import { Department } from "./department"

export class Company{
    firstname: string
    lastname: string
    username: string
    password: string
    phoneNumber: string
    category: string
    email: string
    companyName: string
    country: string
    city: string
    zipCode: string
    street: string
    PIB: string
    registrationNumber: number
    companyLogoPath: String
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
    warehouses : {
        name : String
    }[] = []
    numberOfRegisters : number
    cashRegisters : {
        registerName: String,
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
    }[]
    departments: {
        isActive : boolean
        departmentName : string
        width : number
        height : number
        matrix : {
            tableName : string
            mark : string
            width : number
            height : number
        }[][]
        matrixCircles : {
            tableName : string
            mark : string
            width : number
            height : number
        }[][]
        tables : {
            name : string
            width : number
            height : number
            row : number
            column : number
            shape : string
        }[]
    }[] = []
}