import { IQuery } from "@nestjs/cqrs";

export class GetSingleDrinkQuery implements IQuery{
    constructor(public readonly id:string){}
   
}
