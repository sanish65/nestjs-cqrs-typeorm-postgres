import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateDrinksDto } from 'src/dto/update-drinks.dto';
// import { CreateDrinksDto } from 'src/dto/create-drinks.dto';
import { CreateDrinksDto } from '../dto/create-drinks.dto';

import { CreateDrinkCommand } from './commands/impl/create-drink.command';
import { DeleteDrinkCommand } from './commands/impl/delete-drink.command';
import { PatchDrinkCommand } from './commands/impl/path-drink.command';
import { UpdateDrinkCommand } from './commands/impl/update-drink.command';
import { DrinksService } from './drink.service';
import { GetDrinksQuery } from './queries/impl/get-drinks.query';
import { GetSingleDrinkQuery } from './queries/impl/get-singleDrink.query';

@Controller('drinks')
export class DrinkController {

    constructor(private readonly drinksService:DrinksService){}

    @Get('all')
    async getAll(){
        return this.drinksService.getAll();
    }

    @Get('drink/:id')
    async getDrinksById(@Param('id') id:string){
        return this.drinksService.getDrinksById(id);
    }

    @Post('add')
    @HttpCode(201)
    @UsePipes(new ValidationPipe({ transform:true }))
    async createDrinks(@Body() payload:CreateDrinksDto) {
        return this.drinksService.createDrinks(payload);
    }

    @Patch('update/:id')
    @HttpCode(201)
    @UsePipes(new ValidationPipe({ transform:true }))
    async updateDrinks(
        @Param('id') id:string , 
        @Body('drink') Idrinks : string,
        @Body('money') Imoney: number){
        return await this.drinksService.updateDrinks(id,Idrinks,Imoney);
    }

    @Patch('patch/:id')
    @HttpCode(200)
    @UsePipes(new ValidationPipe({ transform:true }))
    async patchDrinks(
        @Param('id') id:string , 
        @Body('fund') Ifund: number,
        @Body('income') Income: number,
        @Body('coke') Icoke: number,
        @Body('pepsi') Ipepsi: number,
        @Body('dew') Idew: number)
        {
        return await this.drinksService.patchDrinks(id,Ifund,Income,Icoke,Ipepsi,Idew);
    }

    @Delete('delete/:id')
    @HttpCode(200)
    deleteDrinks(
        @Param('id') id:string){
            return this.drinksService.deleteDrinks(id);
        }
}

