import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  get(path: string, params: HttpParams = new HttpParams()): Observable<any>{
    return this.http.get(`${environment.API_URI}${path}`, {
      params
  });
  }
}
