import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { AdminService } from '@core/services/dashboard/admin.service';
import { environment } from '@environments/environment';


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  display: boolean = false;
  blockSpecial: RegExp = /^[^<>*!@.,]+$/

  API_URI = environment.API_URI;

  public rolesId: any = { label: 'Seleccione un rol', value: null };

  public bandera: boolean = false;
  public displayTest: boolean = false;
  public token: any;
  public roles: any[] = [];
  public ids: any[] = [];
  public items: any[] = [];
  public filteredItems: any[] = [];

  public form = this.fb.group({
    path: ['', [Validators.required]],
    method: ['', [Validators.required]],
    id_padre: ['', [Validators.required]],
    icono: ['', [Validators.required]],
    link: ['', [Validators.required]],
    titulo: ['', [Validators.required]],
  });

  public formTest = this.fb.group({
    path: ['', [Validators.required]],
    id_padre: ['', [Validators.required]],
    link: ['', [Validators.required]],
    titulo: ['', [Validators.required]],
    icono: ['', [Validators.required]],
  });

  public recursos: any[] = [];
  public rolesRecuersos: any[] = [
    {
      rolesId: '',
      resources: []
    }
  ];

  public indexListResources: number = 1;

  public IdsAbuelo: number[] = []
  public IdsPadre: number[] = []
  public IdsNieto: number[] = []

  constructor(
    private fb: UntypedFormBuilder,
    private adminService: AdminService,
    private messageService: MessageService,) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    this.adminService.get(`${this.API_URI}/roles`, this.token).subscribe(r => {
      this.roles = r.data
      r.data.map((rol: any) => {
        this.items.push({ label: rol.name, value: rol.id });
        this.ids.push(rol.id)
      })
    })
  }


  submit() {
    this.addResource(this.form.value)
    this.form.reset();

    if (this.rolesRecuersos[0].resources.length) this.bandera = true;

    this.showDialog()
    console.log(this.rolesRecuersos[0])
  }
  onSubmitTest() {
    console.log(this.formTest.value);
  }

  showDialog() {
    this.display = !this.display;
  }

  guardarRecursoRol() {

    this.rolesRecuersos[0].rolesId = this.rolesId.value;

    console.log(this.ids)
    console.log(this.rolesRecuersos[0].rolesId)


    if (this.ids.includes(this.rolesRecuersos[0].rolesId)) {
      this.adminService.post(`${this.API_URI}/security/create/roles/resources/`, this.rolesRecuersos[0], this.token).subscribe(async r => {

        console.log(r)
        await this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Recursos guardados' });
        this.resetVariables()
      })
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El rol no existe' });

    }
  }



  addResource(resource: any) {

    let data = {
      id: 0,
      path: resource.path,
      method: resource.method,
      id_padre: resource.id_padre,
      icono: resource.icono,
      link: resource.link,
      titulo: resource.titulo,
      items: []
    }

    if (resource.id_padre == 0) {
      data.id = this.indexListResources;      //  CREAR ABUELO

      this.IdsAbuelo.push(data.id)
      this.rolesRecuersos[0].resources.push(data)
      this.recursos.push(data)

      this.indexListResources++;
    }


    if (resource.id_padre != 0 && this.IdsAbuelo.includes(resource.id_padre)) {

      data.id = this.indexListResources;   //  CREAR PADRE
      this.IdsPadre.push(data.id)

      this.rolesRecuersos[0].resources.map((recurso: any) => {
        if (recurso.id == resource.id_padre) {
          recurso.items.push(data)
          this.recursos.push(data)
          this.indexListResources++;
        }
      })


    }


    if (resource.id_padre != 0 && this.IdsPadre.includes(resource.id_padre)) {
      data.id = this.indexListResources;              //  CREAR NIETO
      this.IdsNieto.push(data.id)

      this.rolesRecuersos[0].resources.map((recursoAbuelo: any) => {
        if (recursoAbuelo.id == resource.id_padre - 1) {
          recursoAbuelo.items.map((recursoPadre: any) => {
            if (recursoPadre.id == resource.id_padre) {
              recursoPadre.items.push(data)
              this.recursos.push(data)
              this.indexListResources++;

            }
          })
        }
      })
    }

    if (resource.id_padre != 0 && !this.IdsPadre.includes(resource.id_padre) && !this.IdsAbuelo.includes(resource.id_padre)) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No existe esa id_padre' });
    }

    console.log("-----ROLES Y RECURSOS-----");
    console.log(this.rolesRecuersos)
  }

  resetVariables() {
    this.indexListResources = 1;
    this.IdsAbuelo = []
    this.IdsPadre = []
    this.IdsNieto = []

    this.rolesRecuersos = [
      {
        rolesId: '',
        resources: []
      }
    ];

    this.recursos = [];
  }

  filterItems(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      if (item.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }
    this.filteredItems = filtered;
  }
  changeDisplayTest() {
    this.displayTest = !this.displayTest;
  }

}





/*

dataRolesRecursos = [
  {
    rolesId: 1,
    resources: [
      {
        path: '',
        method: '',
        id_padre: '0',  INDEX PADRE   INSTITUCION
        icono: '',
        link: '',
        titulo: '',
        items: [
          {
            ath: '',
            method: '',
            icono: '',  INDEX HIJO   ASPECTOGENERAL
            link: '',
            titulo: '',
            item:[
              {
              ath: '',
              method: '',  
              icono: '',
              link: '',
              titulo: '',
          },
            ]
            ,
          },
          {
            ath: '',
            method: '',
            icono: '',
            link: '',
            titulo: '',
            item:[]
          },
          {
        path: '',
        method: '',
        id_padre: '0',  INDEX PADRE     ADMIN
        icono: '',
        link: '',
        titulo: '',
        items: [
          {
            ath: '',
            method: '',
            icono: '',  INDEX HIJO    ROLES Y RECURSOS
            link: '',
            titulo: '',
            item:[
              {
              ath: '',
              method: '',
              icono: '',  INDEX HIJO   CREAR
              link: '',
              titulo: '',
          },
            ]
            ,
          },
          {
            ath: '',
            method: '', 
            icono: '',    USUARIO ROLES
            link: '',
            titulo: '',
            item:[  
              {
              ath: '',
              method: '',
              icono: '',     CREAR
              link: '',
              titulo: '',
             {
              ath: '',
              method: '',
              icono: '',     EDITAR
              link: '',
              titulo: '',]
          },
          
    ]
  }
  
]






*/