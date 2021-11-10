import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import * as request from 'supertest';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('DrinkModule', () => {
    beforeEach(async () => {
      const uncleared = await request(app.getHttpServer())
      .get('/drinks/all');
      await Promise.all(
        uncleared.body.map(async (drink) => {
          return request(app.getHttpServer()).delete(`/drinks/delete/${drink.id}`);
        }),
      );
    });

    it('Post drink, get all, get by id, delete', async () => {
      const newDrink = {
          fund : 1000000,
          income: 100000,
          coke: 1000000,
          pepsi: 1000000,
          dew: 100000
      };
      const data =  await request(app.getHttpServer())
        .post('/drinks/add')
        .send(newDrink)
        .expect(201);

      expect(data.body).toEqual({
        id: data.body.id,
        ...newDrink,
      });

      const getDrinks = await request(app.getHttpServer()).get('/drinks/all').expect(200);
      expect(getDrinks.body).toEqual(expect.any(Array));
      expect(getDrinks.body.length).toBe(1);
      expect(getDrinks.body[0]).toEqual({
        id: getDrinks.body[0].id,
        ...newDrink,
      });

      const secDrink = await request(app.getHttpServer())
        .get(`/drinks/drink/${data.body.id}`)
        .expect(200);
      expect(secDrink.body).toEqual(data.body);
      return request(app.getHttpServer())
        .delete(`/drinks/delete/${data.body.id}`)
        .expect(200)
        .expect({ deleted: true });
    });


    it('post drink, get drink by id, update, get by id, delete', async () => {
      const thirdDrinks = {
          fund : 20000,
          income: 0,
          coke: 200,
          pepsi: 200,
          dew: 200
      };
      const secondData = await request(app.getHttpServer())
        .post('/drinks/add')
        .send(thirdDrinks)
        .expect(201);

      expect(secondData.body).toEqual({
        id: secondData.body.id,
        ...thirdDrinks,
      });

      const returnDrinks = await request(app.getHttpServer())
        .get(`/drinks/drink/${secondData.body.id}`)
        .expect(200);

      expect(returnDrinks.body).toEqual({
        id: secondData.body.id,
        ...thirdDrinks,
       });


      const updateDrinks = await request(app.getHttpServer())
        .patch(`/drinks/patch/${secondData.body.id}`)
        .send({
          fund: 100000,
          income: 0,
          coke: 200,
          pepsi:300,
          dew:400,
        })
        .expect(200);
      expect(secondData.body).toEqual({ 
        id: secondData.body.id,
        ...secondData.body,  
       });

      const updateDrinks2 = await request(app.getHttpServer())
        .get(`/drinks/drink/${secondData.body.id}`)
        .expect(200);
      expect(updateDrinks2.body.affected).toEqual(secondData.body.affected);
      return request(app.getHttpServer())
        .delete(`/drinks/delete/${updateDrinks2.body.id}`)
        .expect(200)
        .expect({ deleted: true });
    });
  });
});
