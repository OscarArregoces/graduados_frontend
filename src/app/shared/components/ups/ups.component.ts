import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ups',
  templateUrl: './ups.component.html',
  styleUrls: ['./ups.component.css']
})
export class UpsComponent implements OnInit {

  @Input() nameModule!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
