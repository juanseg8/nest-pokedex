import { Injectable } from '@nestjs/common';
import { PokeReponse } from './interfaces/poke-repponse.interface';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  /*async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const { data } = await this.axios.get<PokeReponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const insertPromisesArray: Promise<Pokemon>[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const nro = +segments[segments.length - 2];
      insertPromisesArray.push(this.pokemonModel.create({ nro, name }));
    });

    await Promise.all(insertPromisesArray);

    return 'Seed Executed';
  }*/

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeReponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemonToInsert: Pokemon[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const nro = +segments[segments.length - 2];
      pokemonToInsert.push({ nro, name } as Pokemon);
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed Executed';
  }
}
