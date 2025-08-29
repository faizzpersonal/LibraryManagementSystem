import { Component, OnInit } from '@angular/core';
import { FineService, Fine } from '../../../../services/fine.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fine-list',
  templateUrl: './fine-list.component.html',
  styleUrls: ['./fine-list.component.css']
})
export class FineListComponent implements OnInit {

  fines: Fine[] = [];
  allFines: Fine[] = [];

  constructor(
    private fineService: FineService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadFines();
  }

  loadFines(): void {
    this.fineService.getFines().subscribe((data: Fine[]) => {
      this.allFines = data ?? [];
      this.fines = data ?? [];
      
      this.route.queryParams.subscribe(params => {
        const transactionId = params['transactionId'];
        if (transactionId) {
          this.fines = this.allFines.filter(f => f.transaction.id === +transactionId);
        }
      });
    });
  }

  filterFines(status: string): void {
    if (status === 'ALL') {
      this.fines = this.allFines;
    } else {
      this.fines = this.allFines.filter(f =>
        (f.status || '').toUpperCase().trim() === status
      );
    }
  }

  editFine(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/admin/fines/edit', id]);
    }
  }

  deleteFine(id: number | undefined): void {
    if (id && confirm('Are you sure you want to delete this fine?')) {
      this.fineService.deleteFine(id).subscribe(() => {
        this.loadFines();
      });
    }
  }
  markAsPaid(id: number | undefined): void {
  if (id) {
    const fineToUpdate = this.fines.find(f => f.id === id);
    if (fineToUpdate) {
      fineToUpdate.status = 'Paid';
      this.fineService.updateFine(fineToUpdate).subscribe({
        next: () => {
          alert('Fine marked as paid!');
          this.loadFines();
        },
        error: () => alert('Error while updating fine status')
      });
    }
  }
}



}
