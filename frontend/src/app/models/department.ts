

export class Department{
    isActive : boolean
    width : number
    height : number
    matrix : string[][]
    matrixCircles : {
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