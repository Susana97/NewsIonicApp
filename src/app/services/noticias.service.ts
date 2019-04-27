import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headLinesPage = 0;
  categoriaActual: string;
  categoriaPage = 0;

  constructor( private http: HttpClient ) { }

  private executeQuery<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, { headers });
  }

  getTopHeadlines() {
    this.headLinesPage ++;
    return this.executeQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headLinesPage}`);
  }

  getTopHeadlinesCategoria( categoria: string) {
    if(this.categoriaActual === categoria) {
      this.categoriaPage ++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    return this.executeQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
  }
}
