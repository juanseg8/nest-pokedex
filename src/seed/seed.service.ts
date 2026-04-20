import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { Axios } from 'axios';
import { PokeReponse } from './interfaces/poke-repponse.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data } = await this.axios.get<PokeReponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    data.results.forEach(({name, url}) => {

      const segments = url.split('/');
      const nro = +segments[segments.length - 2];
      console.log({nro, name});
    });

    return data.results;
  }
}
