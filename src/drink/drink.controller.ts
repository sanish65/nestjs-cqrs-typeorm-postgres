import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateDrinkCommand } from './commands/impl/create-drink.command';
import { DeleteDrinkCommand } from './commands/impl/delete-drink.command';
import { UpdateDrinkCommand } from './commands/impl/update-drink.command';
import { GetDrinksQuery } from './queries/impl/get-drinks.query';
import { GetSingleDrinkQuery } from './queries/impl/get-singleDrink.query';

@Controller('drinks')
export class DrinkController {

    constructor(private queryBus:QueryBus , private commandBus:CommandBus){}

    @Get('all')
    async getAll(){
        return await this.queryBus.execute(new GetDrinksQuery());
    }

    @Get(':id')
    async getSingle(@Param('id') id:string){
        return await this.queryBus.execute(new GetSingleDrinkQuery(id));
    }

    @Post('add')
    @HttpCode(201)
    @UsePipes(new ValidationPipe({ transform:true }))
    async save(@Body() payload:CreateDrinkCommand) {
        await this.commandBus.execute(payload);
    }

    @Patch(':id')
    @HttpCode(201)
    @UsePipes(new ValidationPipe({ transform:true }))
    async UpdateDrinks(
        @Param('id') id:string , 
        @Body('drink') Idrinks : string,
        @Body('money') Imoney: number){
       
        return this.commandBus.execute(new UpdateDrinkCommand(id, Idrinks , Imoney ))

    }

    @Delete(':id')
    removeDrinksById(
        @Param('id') id:string){
            console.log("Delete controller");
            return this.commandBus.execute(new DeleteDrinkCommand(id));
        }
}
