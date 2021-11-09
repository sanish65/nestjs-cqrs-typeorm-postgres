import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Drink } from "src/entities/drink";
import { Repository } from "typeorm";
import { GetDrinksQuery } from "../impl/get-drinks.query";

@QueryHandler(GetDrinksQuery)
export class GetDrinksHandler implements IQueryHandler<GetDrinksQuery>{

    constructor(@InjectRepository(Drink) private drinkRepo:Repository<Drink>){}

    
    async execute(query : GetDrinksQuery) : Promise<Drink[]> {
        return await this.drinkRepo.find();

    }
}
