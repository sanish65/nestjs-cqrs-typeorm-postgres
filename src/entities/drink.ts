import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'drink'})
export class Drink {
    @PrimaryGeneratedColumn('increment',{name:'id'})
    id:number;

    @Column({name:'fund'})
    fund:number;

    @Column({name:'income'})
    income:number;

    @Column({name:'coke'})
    coke:number;

    @Column({name:'pepsi'})
    pepsi:number;

    @Column({name:'dew'})
    dew:number;
}
