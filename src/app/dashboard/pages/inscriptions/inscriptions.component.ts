import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from './store/inscriptions.actions';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styles: [
  ]
})
export class InscriptionsComponent implements OnInit {

  constructor(private store: Store) {}

  displayedColumns = ['id', 'name', 'actions']

  ngOnInit(): void {
    this.store.dispatch(InscriptionsActions.loadInscriptions())
  }
}
