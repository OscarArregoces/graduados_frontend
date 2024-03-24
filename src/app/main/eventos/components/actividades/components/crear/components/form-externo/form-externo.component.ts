import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { ValidForm } from '@helpers/validForms';
import { Responsable, RolPonente, Vinculacion } from '@models/main/eventos.interface';

@Component({
  selector: 'app-form-externo',
  templateUrl: './form-externo.component.html',
  styleUrls: ['./form-externo.component.css']
})
export class FormExternoComponent implements OnInit {

  @Output() addResponsable: EventEmitter<Responsable> = new EventEmitter<Responsable>();

  public responsables: any[] = [];

  public roles: RolPonente[] = [
    RolPonente.Organizador,
    RolPonente.Ponente,
    RolPonente.PonenteMagistral,
    RolPonente.Moderador,
    RolPonente.Asistente,
  ];
  public tipoVinculacion: Vinculacion[] = [
    Vinculacion.DocenteCatedratico,
    Vinculacion.DocenteOcasional,
    Vinculacion.Estudiante,
    Vinculacion.InvitadoExterno,
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
        vinculacion: this.formPonentes.value.vinculacion,
        rol: this.formPonentes.value.rol,
        dedicacion: this.formPonentes.value.dedicacion,
      })
    }
  }
}
