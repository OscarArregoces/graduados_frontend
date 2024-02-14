import { Component, OnDestroy, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ClasificadosService } from 'src/app/core/services/dashboard/clasificados.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { environment } from 'src/environments/environment';


export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.css']
})
export class CompanyViewComponent implements OnInit, OnDestroy {

  API_URI = environment.API_URI;
  API_URL_MEDIA = environment.API_URL_MEDIA;
  
  responsiveOptions: any;
  subscription$!: Subscription;
  width!: string;
  token!: string;

  public categorias: any[] = [];
  public subCategorias: any[] = [];
  public emprendimientos: any[] = [];
  public itemsMenu: any[] = [];
  public emprendimientosDestacados: any[] = [];
  public emprendimientoView: any;
  public displayDetail: boolean = false;

  constructor(
    private pantallaService: PantallaService,
    private clasificadosService: ClasificadosService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')!;
    this.traerSubCategorias();
    this.traerEmprendimientos();
    this.traerEmprendimientosDestacados();

    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);

    this.responsiveOptions = [
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

  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  traerEmprendimientos() {
    try {
      this.clasificadosService.get(`${this.API_URI}/advertisements/`, this.token).subscribe(res => this.emprendimientos = res.data)
    } catch (error) {
      console.log(error)
    }
  }

  traerEmprendimientosDestacados() {
    try {
      this.clasificadosService.get(`${this.API_URI}/advertisements/valorados/`, this.token).subscribe(res => this.emprendimientosDestacados = res.data)
    } catch (error) {
      console.log(error)
    }
  }

  handleBtnRecomendar(idEmprendimiento: string) {
    let body = {
      "emprendimiento": idEmprendimiento
    }

    try {
      this.clasificadosService.post(`${this.API_URI}/advertisements/recomendar/`, body, this.token).subscribe(res => {
        this.traerEmprendimientos();
        this.traerEmprendimientosDestacados();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: '¡Has recomendado este emprendimiento!' });
      })
    } catch (error) {
      console.log(error)
    }
  }

  onChangeMenuBar(idSubCategoria:string) { 
    try {
      this.clasificadosService.get(`${this.API_URI}/advertisements/?subCategoryId=${idSubCategoria}`, this.token).subscribe(res => {
        this.emprendimientos = res.data
        console.log(res)
      })
    } catch (error) {
      console.log(error)
    }
  }

  changeDisplayDetail(emprendimiento: any) {
    this.emprendimientoView = emprendimiento;
    this.displayDetail = !this.displayDetail;
  }

  traerSubCategorias() {
    try {
      this.clasificadosService.get(`${this.API_URI}/advertisements/sub/category/`, this.token).subscribe(res => {
        this.subCategorias = res.data
        this.createMenu();      
      })
    } catch (error) {
      console.log(error)
    }
  }
  createMenu() {
    this.subCategorias.forEach((subCategoria) => {
      let exists: boolean = this.itemsMenu.some((elemento) => elemento.label === subCategoria.categoriaId.name);
      if (!exists) this.itemsMenu.push(
        {
          label: subCategoria.categoriaId.name,
          items: []
        }
      );

      this.itemsMenu.forEach((elemento) => {
        if (elemento.label === subCategoria.categoriaId.name) {
          elemento.items.push({
            label: subCategoria.name,
            command: (event:any) => this.onChangeMenuBar(subCategoria.id)
          });          
        }
      })
    })
  }

}
