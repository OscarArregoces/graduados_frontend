import { Component, Input, OnInit } from '@angular/core';
import { Variant } from 'src/app/models/ui/CustomInfoCard';

@Component({
  selector: 'app-custom-info-card',
  templateUrl: './custom-info-card.component.html',
  styleUrls: ['./custom-info-card.component.css']
})

export class CustomInfoCardComponent implements OnInit {
  @Input() description: string = '';
  @Input() aditionalText!: string;
  @Input() variant: Variant = Variant.Orange;

  constructor() { }

  ngOnInit(): void {
  }

}
