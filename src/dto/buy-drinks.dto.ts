import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsIn,
    IsNumber,
  } from 'class-validator';
  
  export class BuyDrinksDto {
    @IsString()
    readonly id: string;

    @IsNumber()
    readonly amount: number;

    @IsString()
    readonly drink: string;
  }
  