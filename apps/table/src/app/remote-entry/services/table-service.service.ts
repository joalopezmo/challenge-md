import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Heroe } from '../interfaces/heroe.interface';

@Injectable({
  providedIn: 'root',
})
export class TableServiceService {
  private url = 'assets/heroes.json';

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(this.url);
  }

  getHeroeById(id: number): Observable<Heroe | undefined> {
    return this.http
      .get<Heroe[]>(this.url)
      .pipe(
        map((heroes: Heroe[]) => heroes.find((heroe: Heroe) => heroe.id === id))
      );
  }

  addHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(this.url, heroe);
  }

  updateHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(this.url, heroe);
  }

  deleteHeroe(id: number): Observable<Heroe> {
    return this.http.delete<Heroe>(`${this.url}/${id}`);
  }

  searchHeroe(term: string): Observable<Heroe[]> {
    return this.http
      .get<Heroe[]>(this.url)
      .pipe(
        map((heroes: Heroe[]) =>
          heroes.filter((heroe: Heroe) =>
            heroe.name.toLowerCase().includes(term.toLowerCase())
          )
        )
      );
  }

  sortHeroes(sort: string): Observable<Heroe[]> {
    return this.http
      .get<Heroe[]>(this.url)
      .pipe(
        map((heroes: Heroe[]) =>
          heroes.sort((a: Heroe, b: Heroe) => a.name.localeCompare(b.name))
        )
      );
  }

  filterHeroes(filter: string): Observable<Heroe[]> {
    return this.http
      .get<Heroe[]>(this.url)
      .pipe(
        map((heroes: Heroe[]) =>
          heroes.filter((heroe: Heroe) =>
            heroe.name.toLowerCase().includes(filter.toLowerCase())
          )
        )
      );
  }

  paginateHeroes(page: number, pageSize: number): Observable<Heroe[]> {
    return this.http
      .get<Heroe[]>(this.url)
      .pipe(
        map((heroes: Heroe[]) =>
          heroes.slice(page * pageSize, page * pageSize + pageSize)
        )
      );
  }
}
