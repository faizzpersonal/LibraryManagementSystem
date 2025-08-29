import { Component, OnInit } from '@angular/core';
import { TransactionService, Transaction } from '../../../../services/transaction.service';  
import { FineService } from '../../../../services/fine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[] = [];
  allTransactions: Transaction[] = [];
  searchText: string = '';

  constructor(
    private transactionService: TransactionService, 
    private fineService: FineService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe((data: Transaction[]) => {
      this.allTransactions = data ?? [];
      this.transactions = data ?? [];

      this.transactions.forEach(t => {
        if (t.status === 'Returned') {
          this.fineService.getFines().subscribe(fines => {
            t['hasFine'] = fines.some(f => f.transaction?.id === t.id);
          });
        }
      });
    });
  }

  filterTransactions(status?: string): void {
    let filtered = this.allTransactions;

    if (status && status !== 'ALL') {
      filtered = filtered.filter(t => (t.status || '').toUpperCase().trim() === status);
    }

    if (this.searchText && this.searchText.trim() !== '') {
      const searchLower = this.searchText.toLowerCase();
      filtered = filtered.filter(t =>
        t.user.name.toLowerCase().includes(searchLower) ||
        t.user.phone.toLowerCase().includes(searchLower) ||
        t.book.title.toLowerCase().includes(searchLower) ||
        t.status.toLowerCase().includes(searchLower)
      );
    }

    this.transactions = filtered;
  }

  editTransaction(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/admin/transactions/edit', id]);
    }
  }

  deleteTransaction(id: number | undefined): void {
    if (id && confirm('Are you sure you want to delete this transaction?')) {
      this.transactionService.deleteTransaction(id).subscribe(() => {
        this.loadTransactions();
      });
    }
  }

  returnTransaction(id: number | undefined): void {
    if (id) {
      this.transactionService.returnTransaction(id).subscribe({
        next: () => {
          this.loadTransactions();
        },
        error: () => alert('Error while returning book')
      });
    }
  }

  viewFine(transactionId: number | undefined): void {
    if (transactionId) {
      this.router.navigate(['/admin/fines'], { queryParams: { transactionId } });
    }
  }
}
