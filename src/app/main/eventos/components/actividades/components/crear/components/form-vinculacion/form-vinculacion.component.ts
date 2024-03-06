import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { ValidForm } from 'src/app/helpers/validForms';
import { Funcionario, Persona, Rol } from 'src/app/models/main/Inicio.interface';
import { Responsable } from 'src/app/models/main/eventos.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-vinculacion',
  templateUrl: './form-vinculacion.component.html',
  styleUrls: ['./form-vinculacion.component.css']
})
export class FormVinculacionComponent implements OnInit {
  @Input() vinculacionSelected: string | null = null;
  @Output() addResponsable: EventEmitter<Responsable> = new EventEmitter<Responsable>;

  public persona: Persona[] | null = null;
  public API_URI = environment.API_URI;
  public onSearch: boolean = false;
  public loading: boolean = false;
  public token: string = "";
  public formSearch = this.fb.group({
    documento: ['', [Validators.required, Validators.min(5), Validators.maxLength(100)]],
  });
  public formVinculacion = this.fb.group({
    dedicacion: ['', [Validators.required]],
    rol: ['', [Validators.required]],
  });
  public roles: Rol[] = [
    { id: 1, name: 'Organizador' },
    { id: 2, name: 'Ponente' },
    { id: 3, name: 'Ponente Magistral' },
    { id: 4, name: 'Moderador' },
    { id: 5, name: 'Asistente' },
  ]
  constructor(
    private fb: UntypedFormBuilder,
    private eventosService: EventosService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')!;
  }

  onSubmitSearch() {
    ValidForm(this.formSearch)
    if (this.formSearch.valid) {
      this.onSearch = true;
      this.loading = true;
      const { documento } = this.formSearch.value;

      let complementsApi = this.vinculacionSelected === "Graduado" ? "graduados" : "funcionarios";
      this.eventosService.get(`${this.API_URI}/users/${complementsApi}/${documento}`, this.token)
        .pipe(
          catchError(error => {
            setTimeout(() => {
              this.onSearch = false;
              this.loading = false;
              if (error?.error?.errors?.detail) {
              } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema' });
              }
            },1200)
            throw error;
          })
        )
        .subscribe(res => {
          setTimeout(() => {
            this.persona = res.data;
            this.loading = false;
          }, 1200);
        })
    }
  }

  onSubmitVinculacion() {
    ValidForm(this.formVinculacion);
    
    const { dedicacion, rol } = this.formVinculacion.value;
    let vinculacion = this.vinculacionSelected === "Graduado" ? "Graduado" : "Administrativo";
    if (this.formVinculacion.valid && this.persona) {
      this.addResponsable.emit({
        id: this.persona[0].id,
        fullname: this.persona[0].fullname,
        phone: this.persona[0].phone ? this.persona[0].phone : "",
        email: this.persona[0].email,
        document: this.persona[0].identification,
        vinculacion: vinculacion,
        rol: rol.name,
        dedicacion,
      });
    };
  }

}
