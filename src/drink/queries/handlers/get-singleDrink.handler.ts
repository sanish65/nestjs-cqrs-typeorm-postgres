import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Drink } from "src/entities/drink";
import { Repository } from "typeorm";
import { GetSingleDrinkQuery } from "../impl/get-singleDrink.query";

@QueryHandler(GetSingleDrinkQuery)
export class GetSingleDrinkHandler implements IQueryHandler<GetSingleDrinkQuery>{

    constructor(@InjectRepository(Drink) private personRepo:Repository<Drink>){}

    
    async execute(query : GetSingleDrinkQuery) : Promise<Drink> {
        const { id } = query;
        return await this.personRepo.findOne(id);

    }
}
