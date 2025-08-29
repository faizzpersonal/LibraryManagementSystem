import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FineService, Fine } from '../../../../services/fine.service';
import { TransactionService, Transaction } from '../../../../services/transaction.service';

@Component({
  selector: 'app-fine-edit',
  templateUrl: './fine-edit.component.html'
})
export class FineEditComponent implements OnInit {
  transactions: Transaction[] = [];
  fine: Fine = {
    transaction: {id:0, user:{id:0, name:'', email:'', phone:'', role:''}, book:{id:0, title:'', author:'', isbn:'', category:'', subCategory:'', year:2024, noOfCopies:1}, borrowDate:'', dueDate:'', returnDate:'', status:''},
    amount: 0,
    status: 'Unpaid'
  };

  constructor(
    private route: ActivatedRoute,
    private fineService: FineService,
    private transactionService: TransactionService,
    private router: Router
  ) {}

  selectedTransactionId!: number;

ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    
    this.transactionService.getTransactions().subscribe((data: Transaction[]) => {
      this.transactions = data;
      if(this.fine.transaction) this.selectedTransactionId = this.fine.transaction.id!;
    });

    this.fineService.getFines().subscribe((data: Fine[]) => {
      const found = data.find(f => f.id === id);
      if(found) this.fine = found;
    });
}

updateFine(): void {
    this.fine.transaction = this.transactions.find(tx => tx.id === this.selectedTransactionId)!;

    this.fineService.updateFine(this.fine).subscribe(() => {
      this.router.navigate(['/admin/fines']);
    });
}
}
