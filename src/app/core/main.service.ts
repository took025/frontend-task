import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable } from 'rxjs';
import { Categories, Domains } from './interface';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  url = 'http://localhost:3000/';
  cartNumber$ = new BehaviorSubject(0);

  constructor(private http: HttpClient) { }

  getDomainList(): Observable<Domains[]> {
    return this.http.get<Domains[]>(`${this.url}domainList`);
  }
  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${this.url}categories`);
  }
  searchByName(name: string): Observable<Domains[]> {
    return this.http.get<Domains[]>(`${this.url}domainList?domainName_like=${name}`).pipe(delay(600));
  }

  addToCart(data: Domains): Observable<Domains[]> {
    return this.http.post<Domains[]>(`${this.url}domainCartList`, data);
  }

  removeCart(id: number): Observable<Domains[]> {
    return this.http.delete<Domains[]>(`${this.url}domainCartList/${id}`);
  }

  getCartList(): Observable<Domains[]> {
    return this.http.get<Domains[]>(`${this.url}domainCartList`);
  }
}
