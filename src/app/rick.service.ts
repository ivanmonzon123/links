import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RickCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  url: string;
  created: string;
}

@Injectable({ providedIn: 'root' })
export class RickService {
  private api = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getCharacter(id: number): Observable<RickCharacter> {
    return this.http.get<RickCharacter>(`${this.api}/character/${id}`);
  }

  getRandomCharacter(): Observable<RickCharacter> {
    // The API currently has ~826 characters; using 826 as an upper bound.
    const max = 826;
    const id = Math.floor(Math.random() * max) + 1;
    return this.getCharacter(id);
  }
}
