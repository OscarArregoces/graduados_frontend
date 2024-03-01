import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.css']
})
export class CustomPaginatorComponent implements OnInit {
  @Input() nextDisabled!: string | null;
  @Input() previousDisabled!: string | null;
  @Output() nextClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() previousClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { }

  onNextClick(): void {
    this.nextClick.emit();
  }

  onPreviousClick(): void {
    this.previousClick.emit();
  }

}
