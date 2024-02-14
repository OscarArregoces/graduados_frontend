import { Component, Input, OnInit } from '@angular/core';
import { SolicitudesI } from 'src/app/models/main/pqrs.interface';


@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})



export class TableViewComponent implements OnInit {

  

  public solicitudes: SolicitudesI[] = [];

  public selectedCustomers: any[] = [];

  public loading: boolean = false;  

  public activityValues: number[] = [0, 100];

  constructor() { }

  ngOnInit() {
    this.solicitudes = [
      {
        "id": 2,
        "titulo": "Test",
        "description": "There are many variations of passages of Lorem Ipsum available, but txxxxxxxxxxxx",
        "status_dic": "Activa",
        "status": {
          "name": "AC",
          "valor": "Activa"
        },
        "anexo": "/static/files/pqrs/file.pdf",
        "persona": "admin",
        "tipopqrs": {
          "id": 4,
          "tipo": "Sugerencia"
        }
      },
      {
        "id": 3,
        "titulo": "Prueba",
        "description": "PruebaPruebaPruebaPruebaPruebaPrueba",
        "status_dic": "En espera",
        "status": {
          "name": "EP",
          "valor": "En espera"
        },
        "anexo": "/static/files/pqrs/ENGLISH_DAILY.png",
        "persona": "admin",
        "tipopqrs": {
          "id": 1,
          "tipo": "Petición"
        }
      },
      {
        "id": 4,
        "titulo": "Prueba",
        "description": "Prueba",
        "status_dic": "Finalizada",
        "status": {
          "name": "FN",
          "valor": "Finalizada"
        },
        "anexo": "/static/files/pqrs/ENGLISH_DAILY_mjHEpaM.png",
        "persona": "admin",
        "tipopqrs": {
          "id": 4,
          "tipo": "Sugerencia"
        }
      },
      {
        "id": 5,
        "titulo": "Where does it come from?",
        "description": "Where does it come from?Where does it come from?Where does it come from?",
        "status_dic": "Activa",
        "status": {
          "name": "AC",
          "valor": "Activa"
        },
        "anexo": "/static/files/pqrs/Django_cmd.txt",
        "persona": "admin",
        "tipopqrs": {
          "id": 1,
          "tipo": "Petición"
        }
      },
      {
        "id": 6,
        "titulo": "Where does it come from?",
        "description": "Where does it come from?",
        "status_dic": "En espera",
        "status": {
          "name": "EP",
          "valor": "En espera"
        },
        "anexo": "/static/files/pqrs/Django_cmd_Qn9XCHi.txt",
        "persona": "admin",
        "tipopqrs": {
          "id": 4,
          "tipo": "Sugerencia"
        }
      },
      {
        "id": 2,
        "titulo": "Test",
        "description": "There are many variations of passages of Lorem Ipsum available, but txxxxxxxxxxxx",
        "status_dic": "Activa",
        "status": {
          "name": "AC",
          "valor": "Activa"
        },
        "anexo": "/static/files/pqrs/file.pdf",
        "persona": "admin",
        "tipopqrs": {
          "id": 4,
          "tipo": "Sugerencia"
        }
      },
      {
        "id": 3,
        "titulo": "Prueba",
        "description": "PruebaPruebaPruebaPruebaPruebaPrueba",
        "status_dic": "En espera",
        "status": {
          "name": "EP",
          "valor": "En espera"
        },
        "anexo": "/static/files/pqrs/ENGLISH_DAILY.png",
        "persona": "admin",
        "tipopqrs": {
          "id": 1,
          "tipo": "Petición"
        }
      },
      {
        "id": 4,
        "titulo": "Prueba",
        "description": "Prueba",
        "status_dic": "Finalizada",
        "status": {
          "name": "FN",
          "valor": "Finalizada"
        },
        "anexo": "/static/files/pqrs/ENGLISH_DAILY_mjHEpaM.png",
        "persona": "admin",
        "tipopqrs": {
          "id": 4,
          "tipo": "Sugerencia"
        }
      },
      {
        "id": 5,
        "titulo": "Where does it come from?",
        "description": "Where does it come from?Where does it come from?Where does it come from?",
        "status_dic": "Activa",
        "status": {
          "name": "AC",
          "valor": "Activa"
        },
        "anexo": "/static/files/pqrs/Django_cmd.txt",
        "persona": "admin",
        "tipopqrs": {
          "id": 1,
          "tipo": "Petición"
        }
      },
      {
        "id": 6,
        "titulo": "Where does it come from?",
        "description": "Where does it come from?",
        "status_dic": "En espera",
        "status": {
          "name": "EP",
          "valor": "En espera"
        },
        "anexo": "/static/files/pqrs/Django_cmd_Qn9XCHi.txt",
        "persona": "admin",
        "tipopqrs": {
          "id": 4,
          "tipo": "Sugerencia"
        }
      },
      {
        "id": 2,
        "titulo": "Test",
        "description": "There are many variations of passages of Lorem Ipsum available, but txxxxxxxxxxxx",
        "status_dic": "Activa",
        "status": {
          "name": "AC",
          "valor": "Activa"
        },
        "anexo": "/static/files/pqrs/file.pdf",
        "persona": "admin",
        "tipopqrs": {
          "id": 4,
          "tipo": "Sugerencia"
        }
      },
      {
        "id": 3,
        "titulo": "Prueba",
        "description": "PruebaPruebaPruebaPruebaPruebaPrueba",
        "status_dic": "En espera",
        "status": {
          "name": "EP",
          "valor": "En espera"
        },
        "anexo": "/static/files/pqrs/ENGLISH_DAILY.png",
        "persona": "admin",
        "tipopqrs": {
          "id": 1,
          "tipo": "Petición"
        }
      },
      {
        "id": 4,
        "titulo": "Prueba",
        "description": "Prueba",
        "status_dic": "Finalizada",
        "status": {
          "name": "FN",
          "valor": "Finalizada"
        },
        "anexo": "/static/files/pqrs/ENGLISH_DAILY_mjHEpaM.png",
        "persona": "admin",
        "tipopqrs": {
          "id": 4,
          "tipo": "Sugerencia"
        }
      },
      {
        "id": 5,
        "titulo": "Where does it come from?",
        "description": "Where does it come from?Where does it come from?Where does it come from?",
        "status_dic": "Activa",
        "status": {
          "name": "AC",
          "valor": "Activa"
        },
        "anexo": "/static/files/pqrs/Django_cmd.txt",
        "persona": "admin",
        "tipopqrs": {
          "id": 1,
          "tipo": "Petición"
        }
      },
      {
        "id": 6,
        "titulo": "Where does it come from?",
        "description": "Where does it come from?",
        "status_dic": "En espera",
        "status": {
          "name": "EP",
          "valor": "En espera"
        },
        "anexo": "/static/files/pqrs/Django_cmd_Qn9XCHi.txt",
        "persona": "admin",
        "tipopqrs": {
          "id": 4,
          "tipo": "Sugerencia"
        }
      }
    ]

  }

  getEventValue($event:any) :string {
    return $event.target.value;
  } 

}
