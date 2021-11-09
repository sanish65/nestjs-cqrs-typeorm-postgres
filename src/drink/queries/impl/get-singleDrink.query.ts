import { IQuery } from "@nestjs/cqrs";

export class GetSingleDrinkQuery implements IQuery{
    constructor(public readonly id:string){
        console.log("This is also hit");
    }
   
}
