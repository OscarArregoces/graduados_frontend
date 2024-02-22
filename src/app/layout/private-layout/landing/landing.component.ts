import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class LandingComponent implements OnInit {
  public image3: string = 'assets/demo1.png'
  public prueba: string = 'assets/construccion.jpg'
  public bandera: boolean = false
  public nombre: string = '';

  constructor() { }

  ngOnInit(): void { }

}
