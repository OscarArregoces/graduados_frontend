import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import { PayloadCalculo, Presupuesto, TipoPresupuesto, TotalesPresupuesto } from '@models/main/eventos.interface';
import { ValidForm } from '@helpers/validForms';

@Component({
  selector: 'app-dialog-presupuesto',
  templateUrl: './dialog-presupuesto.component.html',
  styleUrls: ['./dialog-presupuesto.component.css']
})
export class DialogPresupuestoComponent implements OnInit {

  @Input() display: boolean = false;
  @Input() width: string = "80%";
  @Output() closeDisplay: EventEmitter<void> = new EventEmitter<void>();

  public tipoPresupuesto: TipoPresupuesto[] = [
    TipoPresupuesto.bienesEquipos,
    TipoPresupuesto.materialesSuministros,
    TipoPresupuesto.personal
  ];
  public inforCardDescription: string = `
  ¡Planifica con confianza y controla los gastos con nuestro módulo de Presupuesto de Actividades! Obtén una visión clara de los costos por actividad y gestiona el presupuesto de manera eficiente. ¡Haz que cada actividad sea memorable sin preocuparte por los números!
  `;
  public bienesEquipos: Presupuesto[] = [];
  public materialesSuministros: Presupuesto[] = [];
  public personal: Presupuesto[] = [];
  public totalesPresupuesto: TotalesPresupuesto[] = [
    {
      inversion_uniguajira: 0,
      especie_uniguajira: 0,
      inversion_cofinanciador: 0,
      especie_cofinanciador: 0,
      valor: 0,
    },
    {
      inversion_uniguajira: 0,
      especie_uniguajira: 0,
      inversion_cofinanciador: 0,
      especie_cofinanciador: 0,
      valor: 0,
    },
    {
      inversion_uniguajira: 0,
      especie_uniguajira: 0,
      inversion_cofinanciador: 0,
      especie_cofinanciador: 0,
      valor: 0,
    },
  ];

  public pruebas: { name: string, apellido: string, edad: string }[] = [
    {
      name: "OSCAR",
      apellido: "Arregoces",
      edad: "20",

    },
  ]
  public form = this.fb.group({
    tipo_presupuesto: ['', Validators.required],
    item: ['', Validators.required],
    cantidad: ['', Validators.required],
    valor_unitario: ['', Validators.required],
    nombre: [''],
  });

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    ValidForm(this.form);
    if (this.form.valid) {
      const {
        tipo_presupuesto,
        item,
        cantidad,
        valor_unitario,
        nombre, } = this.form.value;

      let payloadCalculo = {
        item,
        cantidad,
        valor_unitario,
        nombre,
      }
      if (tipo_presupuesto === TipoPresupuesto.bienesEquipos) { this.calcularBienesEquipos(payloadCalculo) }
      if (tipo_presupuesto === TipoPresupuesto.materialesSuministros) { this.calcularMaterialesSuministros(payloadCalculo) }
      if (tipo_presupuesto === TipoPresupuesto.personal) { this.calcularPersonal(payloadCalculo) }
      this.form.reset();
    }
  }
  onChangeTipoPresupuesto(event: any) {
    this.form.controls['nombre'].setValue('');
  }

  calcularBienesEquipos(payloadCalculo: PayloadCalculo) {
    const { item, cantidad, valor_unitario, nombre, } = payloadCalculo;
    let body = {
      item,
      cantidad,
      valor_unitario,
      inversion_uniguajira: 0,
      especie_uniguajira: cantidad * valor_unitario,
      inversion_cofinanciador: 0,
      especie_cofinanciador: 0,
      nombre: "",
      valor: cantidad * valor_unitario
    }
    this.bienesEquipos.push(body)
    this.calcularTotales(0);
  }
  calcularMaterialesSuministros(payloadCalculo: PayloadCalculo) {
    const { item, cantidad, valor_unitario, nombre, } = payloadCalculo;
    let body = {
      item,
      cantidad,
      valor_unitario,
      inversion_uniguajira: 0,
      especie_uniguajira: 0,
      inversion_cofinanciador: cantidad * valor_unitario,
      especie_cofinanciador: 0,
      nombre: nombre ? nombre : "",
      valor: cantidad * valor_unitario
    }
    this.materialesSuministros.push(body)
    this.calcularTotales(1);
  }
  calcularPersonal(payloadCalculo: PayloadCalculo) {
    const { item, cantidad, valor_unitario, nombre, } = payloadCalculo;
    let body = {
      item,
      cantidad,
      valor_unitario,
      inversion_uniguajira: 0,
      especie_uniguajira: 0,
      inversion_cofinanciador: cantidad * valor_unitario,
      especie_cofinanciador: 0,
      nombre: nombre ? nombre : "",
      valor: cantidad * valor_unitario
    }
    this.personal.push(body)
    this.calcularTotales(2);
  }

  calcularTotales(posicion: number) {
    const presupuesto = this.getPresupuestoSegunPosicion(posicion);
    const total = this.totalesPresupuesto[posicion];

    total.inversion_uniguajira = this.sumarColumnas(presupuesto, 'inversion_uniguajira');
    total.especie_uniguajira = this.sumarColumnas(presupuesto, 'especie_uniguajira');
    total.inversion_cofinanciador = this.sumarColumnas(presupuesto, 'inversion_cofinanciador');
    total.especie_cofinanciador = this.sumarColumnas(presupuesto, 'especie_cofinanciador');
    total.valor = this.sumarColumnas(presupuesto, 'valor');

    this.totalesPresupuesto[posicion] = {
      inversion_uniguajira: total.inversion_uniguajira,
      especie_uniguajira: total.especie_uniguajira,
      inversion_cofinanciador: total.inversion_cofinanciador,
      especie_cofinanciador: total.especie_cofinanciador,
      valor: total.valor,
    }
  }

  getPresupuestoSegunPosicion(posicion: number): Presupuesto[] {
    switch (posicion) {
      case 0:
        return this.bienesEquipos;
      case 1:
        return this.materialesSuministros;
      case 2:
        return this.personal;
      default:
        return [];
    }
  }

  sumarColumnas(datos: Presupuesto[], columna: keyof Presupuesto): number {
    return datos.reduce((total: number, dato: Presupuesto) => total + parseFloat(dato[columna].toString()), 0);
  }


  handleCloseDialog() {
    this.closeDisplay.emit();
    this.bienesEquipos = [];
    this.materialesSuministros = [];
    this.personal = [];
    this.totalesPresupuesto = [
      {
        inversion_uniguajira: 0,
        especie_uniguajira: 0,
        inversion_cofinanciador: 0,
        especie_cofinanciador: 0,
        valor: 0,
      },
      {
        inversion_uniguajira: 0,
        especie_uniguajira: 0,
        inversion_cofinanciador: 0,
        especie_cofinanciador: 0,
        valor: 0,
      },
      {
        inversion_uniguajira: 0,
        especie_uniguajira: 0,
        inversion_cofinanciador: 0,
        especie_cofinanciador: 0,
        valor: 0,
      },
    ];
  }

  handleDelete(indice: number, tipo_presupuesto: string) {

    if (tipo_presupuesto === "bienesEquipos") {
      this.bienesEquipos.splice(indice, 1);
      this.calcularTotales(0);
    }
    if (tipo_presupuesto === "materialesSuministros") {
      this.materialesSuministros.splice(indice, 1);
      this.calcularTotales(1);
    }
    if (tipo_presupuesto === "personal") {
      this.personal.splice(indice, 1);
      this.calcularTotales(2);
    }
  }

  onChangeBienesEquipos(indice: number) {
    const toUpdate = this.bienesEquipos[indice]
    toUpdate.especie_uniguajira = toUpdate.cantidad * toUpdate.valor_unitario;
    toUpdate.valor = toUpdate.cantidad * toUpdate.valor_unitario;
    this.bienesEquipos[indice] = toUpdate;
    this.calcularTotales(0);
  }
  onChangeMaterialesSuministros(indice: number) {
    const toUpdate = this.materialesSuministros[indice]
    toUpdate.inversion_cofinanciador = toUpdate.cantidad * toUpdate.valor_unitario;
    toUpdate.valor = toUpdate.cantidad * toUpdate.valor_unitario;
    this.materialesSuministros[indice] = toUpdate;
    this.calcularTotales(1);
  }
  onChangePersonal(indice: number) {
    const toUpdate = this.personal[indice]
    toUpdate.inversion_cofinanciador = toUpdate.cantidad * toUpdate.valor_unitario;
    toUpdate.valor = toUpdate.cantidad * toUpdate.valor_unitario;
    this.personal[indice] = toUpdate;
    this.calcularTotales(2);
  }

  handleCLickTest() {
    console.log({
      bienesEquipos: this.bienesEquipos,
      materialesSuministros: this.materialesSuministros,
      personal: this.personal,
    });

  }
}
