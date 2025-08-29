import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FineService, Fine } from '../../../../services/fine.service';
import { TransactionService, Transaction } from '../../../../services/transaction.service';

@Component({
  selector: 'app-fine-add',
  templateUrl: './fine-add.component.html'
})
export class FineAddComponent implements OnInit {
  transactions: Transaction[] = [];
  
  newFine: Fine = {
    transaction: {id:0, user:{id:0, name:'', email:'', phone:'', role:''}, book:{id:0, title:'', author:'', isbn:'', category:'', subCategory:'', year:2024, noOfCopies:1}, borrowDate:'', dueDate:'', returnDate:'', status:''},
    amount: 0,
    status: 'Unpaid'
  };

  constructor(
    private fineService: FineService,
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe((data: Transaction[]) => {
      this.transactions = data.filter(tx => !tx.returnDate || tx.status === 'Overdue');
    });
  }

  addFine(): void {
    this.fineService.addFine(this.newFine).subscribe(() => {
      this.router.navigate(['/admin/fines']);
    });
  }
}
