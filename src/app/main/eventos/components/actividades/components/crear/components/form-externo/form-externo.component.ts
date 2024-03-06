import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ValidForm } from 'src/app/helpers/validForms';
import { Responsable } from 'src/app/models/main/eventos.interface';

@Component({
  selector: 'app-form-externo',
  templateUrl: './form-externo.component.html',
  styleUrls: ['./form-externo.component.css']
})
export class FormExternoComponent implements OnInit {

  @Output() addResponsable: EventEmitter<Responsable> = new EventEmitter<Responsable>();

  public responsables: any[] = [];

  public roles: any[] = [
    { id: 1, name: 'Organizador' },
    { id: 2, name: 'Ponente' },
    { id: 3, name: 'Ponente Magistral' },
    { id: 4, name: 'Moderador' },
    { id: 5, name: 'Asistente' },
  ];
  public tipoVinculacion: any[] = [
    { id: 1, name: 'Docente catedrático' },
    { id: 2, name: 'Docente ocasional y/o planta' },
    { id: 3, name: 'Estudiante' },
    // { id: 4, name: 'Administrativo' },
    // { id: 5, name: 'Graduado' },
    // { id: 6, name: 'Directivo' },
    { id: 7, name: 'Invitado externo' },
  ];


  public formPonentes = this.fb.group({
    fullname: ['', [Validators.required, Validators.maxLength(200)]],
    document: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    phone: ['', [Validators.required, Validators.maxLength(100)]],
    vinculacion: ['', [Validators.required, Validators.maxLength(30)]],
    rol: ['', Validators.required],
    dedicacion: ['', [Validators.required, Validators.maxLength(5)]],
  })

  constructor(
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
  }

  onSubmitFormPonentes() {
    ValidForm(this.formPonentes);
    if (this.formPonentes.valid) {
      this.addResponsable.emit({
        fullname: this.formPonentes.value.fullname,
        document: this.formPonentes.value.document,
        email: this.formPonentes.value.email,
        phone: this.formPonentes.value.phone,
        vinculacion: this.formPonentes.value.vinculacion.name,
        rol: this.formPonentes.value.rol.name,
        dedicacion: this.formPonentes.value.dedicacion,
      })
    }
  }
}
