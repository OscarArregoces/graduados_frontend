import { Component, OnInit } from '@angular/core';
import { SpinerService } from 'src/app/core/services/spiner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {

  isLoading$ = this.spinerService.isLoading$;
  
  constructor(private readonly spinerService: SpinerService) { }
}
