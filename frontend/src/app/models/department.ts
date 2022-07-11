

export class Department{
    isActive : boolean
    departmentName : string
    width : number
    height : number
    matrix : {
        tableName : string
        mark : string
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
}