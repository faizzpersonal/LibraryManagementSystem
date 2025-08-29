import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from './transaction.service';

export interface Fine {
  id?: number;
  transaction: Transaction;
  amount: number;
  status: string; 
}

@Injectable({
  providedIn: 'root'
})
export class FineService {
  private apiUrl = 'http://localhost:8080/api/fines';

  constructor(private http: HttpClient) {}

  getFines(): Observable<Fine[]> {
    return this.http.get<Fine[]>(this.apiUrl);
  }

  addFine(fine: Fine): Observable<Fine> {
    return this.http.post<Fine>(this.apiUrl, fine);
  }

  updateFine(fine: Fine): Observable<Fine> {
    return this.http.put<Fine>(`${this.apiUrl}/${fine.id}`, fine);
  }

  deleteFine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
