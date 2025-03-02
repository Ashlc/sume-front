import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseURL = 'https://sume.lccv.ufal.br/homologacao/api/selecao_5_2025';

  constructor(private http: HttpClient) {}

  get(endpoint: string) {
    return this.http.get(`${this.baseURL}/${endpoint}/`);
  }

  post(endpoint: string, data: any) {
    return this.http.post(`${this.baseURL}/${endpoint}/`, data);
  }

  put(endpoint: string, data: any) {
    return this.http.put(`${this.baseURL}/${endpoint}/`, data);
  }

  delete(endpoint: string) {
    return this.http.delete(`${this.baseURL}/${endpoint}/`);
  }
}
