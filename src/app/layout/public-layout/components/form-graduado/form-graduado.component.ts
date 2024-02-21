import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-graduado',
  templateUrl: './form-graduado.component.html',
  styleUrls: ['./form-graduado.component.css']
})
export class FormGraduadoComponent implements OnInit {

  public form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    pliciy: ['', Validators.required],
  });
  public images:string [] = [
    'assets/images/campus.jpeg',
    'assets/images/campus.jpeg',
    'assets/images/campus.jpeg',
  ]

  public responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
  }

}
