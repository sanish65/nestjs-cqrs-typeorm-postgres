import { Test, TestingModule } from '@nestjs/testing';
import { BuyDrinksDto } from 'src/dto/buy-drinks.dto';
import { CreateDrinksDto } from 'src/dto/create-drinks.dto';
import { UpdateDrinksDto } from 'src/dto/update-drinks.dto';
import { DrinkController } from './drink.controller';
import { DrinksService } from './drink.service';

describe('Drinks Controller', () => {
  let controller: DrinkController;
  let service: DrinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrinkController],
      providers: [
        {
          provide: DrinksService,
          useValue: {

            getAll: jest.fn().mockResolvedValue([
              { id:1,fund:1000,income:2000,coke:1,pepsi:2,dew:3},
              { id:2,fund:2000,income:2000,coke:2,pepsi:2,dew:2},
              { id:3,fund:3000,income:3000,coke:3,pepsi:3,dew:3},
              { id:4,fund:4000,income:4000,coke:4,pepsi:4,dew:4}
            ]),

            getDrinksById: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                fund:1000,
                income:2000,
                coke:1,
                pepsi:2,
                dew:3,
                id,
              }),
            ),

            createDrinks: jest.fn().mockImplementation((drink: CreateDrinksDto) =>
                Promise.resolve({ id: '1', ...drink }),
              ),

            updateDrinks: jest.fn().mockImplementation((id:string,buy:BuyDrinksDto) =>
            Promise.resolve({ 
              id :1,
             }),
            ),

            patchDrinks: jest.fn().mockImplementation((id:string,drink:UpdateDrinksDto) =>
                Promise.resolve({ 
                  id : 1,
                  ...drink
                 }),
              ),

            deleteDrinks: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<DrinkController>(DrinkController);
    service = module.get<DrinksService>(DrinksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('fetchAll', () => {
    it('should get an array of drinks', async () => {
      await expect(controller.getAll()).resolves.toEqual([
        { 
          id:1,fund:1000,income:2000,coke:1,pepsi:2,dew:3
        },
        { 
          id:2,fund:2000,income:2000,coke:2,pepsi:2,dew:2
        },
        { 
          id:3,fund:3000,income:3000,coke:3,pepsi:3,dew:3
        },
        { 
          id:4,fund:4000,income:4000,coke:4,pepsi:4,dew:4
        }
      ]);
    });
  });

  describe('new Drinks add', () => {
    it('should add a new drink', async () => {
      const newDrinkDTO: CreateDrinksDto = {
        fund: 5000,
        income:500,
        coke:7,
        pepsi:7,
        dew:7
      };
      const returnData = await controller.createDrinks(newDrinkDTO);
      expect(returnData).toEqual({
        id:returnData.id,
        fund: 5000,
        income:500,
        coke:7,
        pepsi:7,
        dew:7
      });
    });
  });

  describe('getDrinksByID', () => {
    it('should get a single drink', async () => {
      await expect(controller.getDrinksById('1')).resolves.toEqual({
        fund:1000,
        income:2000,
        coke:1,
        pepsi:2,
        dew:3,
        id:'1'
      });
    });
  });

  describe('update the drinks', () => {
    it('should update a new drink', async () => {
      const newUpdate = {
        fund: 5000,
        income:500,
        coke:7,
        pepsi:7,
        dew:7
      };
      const returnData = await controller.patchDrinks('1',newUpdate.fund,newUpdate.income,newUpdate.coke,newUpdate.pepsi,newUpdate.dew);
      expect(returnData).toEqual({
        id:'1',
        ...returnData
      });
    });
  });

  describe('buy drinks individually', () => {
    it('should get an array of drinks after buying it', async () => {
      const buyDrinks = {
        amount:50,
        drink:"coke",
      };
      const returnData = await controller.updateDrinks('1',buyDrinks.drink,buyDrinks.amount);
      expect(returnData).toEqual({
        id:'1',
        ...returnData
      });
    });
  });

  describe('delete Drinks by ID', () => {
    it('should return that it deleted a drink', async () => {
      await expect(controller.deleteDrinks('1')).resolves.toEqual(
        {
          deleted: true,
        },
      );
    });

    it('using spies to delete a drink', async () => {
      const deleteSpy = jest
        .spyOn(service, 'deleteDrinks')
        .mockResolvedValueOnce({ deleted: false });
      await expect(
        controller.deleteDrinks('3'),
      ).resolves.toEqual({ deleted: false });
      expect(deleteSpy).toBeCalledWith('3');
    });

  });
});
