import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Heroe } from '../interfaces/heroe.interface';

@Injectable({
  providedIn: 'root',
})
export class TableServiceService {
  private url = 'assets/heroes.json';
  heroesObservable = new BehaviorSubject<Heroe[]>([]);
  heroe!: Heroe;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Heroe[]> {
    if (this.heroesObservable.value.length > 0)
      return this.heroesObservable.asObservable();
    // Si ya hay datos, retornamos el Observable actualizado
    else {
      return this.http.get<Heroe[]>(this.url).pipe(
        map((heroes: Heroe[]) => {
          this.heroesObservable.next(heroes);
          return this.heroesObservable.value;
        })
      );
    }
  }

  // Método para agregar un héroe
  addHeroe(heroe: Heroe): Observable<Heroe[]> {
    const heroes = this.heroesObservable.value;
    const newId = heroes.length + 1;
    heroe.id = newId;
    const updatedHeroes = heroes.concat(heroe); // Concatenar el nuevo héroe al array existente
    this.heroesObservable.next(updatedHeroes); // Emitir el array actualizado
    return this.heroesObservable.asObservable(); // Retornamos el Observable actualizado
  }

  updateHeroe(heroe: Heroe): Observable<Heroe[]> {
    const heroes = this.heroesObservable.value;
    const index = heroes.findIndex((h) => h.id === heroe.id);
    if (index !== -1) {
      // Actualizamos el héroe en el array
      heroes[index] = heroe;
      // Emitimos el nuevo array de héroes
      this.heroesObservable.next(heroes);
    }
    return this.heroesObservable.asObservable();
  }

  deleteHeroe(id: number): Observable<Heroe[]> {
    const heroes = this.heroesObservable.value;
    const index = heroes.findIndex((h) => h.id === id);
    if (index !== -1) {
      heroes.splice(index, 1);
      this.heroesObservable.next(heroes);
    }
    return this.heroesObservable.asObservable();
  }
}
