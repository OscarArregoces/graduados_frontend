import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxScannerQrcodeService, ScannerQRCodeSelectedFiles } from 'ngx-scanner-qrcode';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-busqueda-qr',
  templateUrl: './busqueda-qr.component.html',
  styleUrls: ['./busqueda-qr.component.css']
})
export class BusquedaQrComponent implements OnInit {

  @Output() resetOptionSelected: EventEmitter<void> = new EventEmitter<void>();

  public inforCardDescription: string = `
  Utiliza esta opción para confirmar rápidamente tu asistencia escaneando el código QR proporcionado en el evento. Solo necesitas apuntar y escanear para registrar tu presencia.
  `;

  public token: string = '';
  public currentQr: string = '';
  public banderaBtnConfirmQr: boolean = true;
  public selectedFiles: ScannerQRCodeSelectedFiles[] = [];
  public config: Object = {
    isAuto: true,
    text: { font: '25px serif' },
    frame: { lineWidth: 8 },
    medias: {
      audio: false,
      video: {
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    }
  };
  constructor(
    private qrcode: NgxScannerQrcodeService,
    private eventosService: EventosService,
  ) { }

  ngOnInit(): void {
  }

  public onError(e: any): void {
    alert(e);
  }

  public handle(action: any, fn: string): void {
    action[fn]().subscribe(console.log, console.error);
  }

  public onSelects(files: any) {
    this.qrcode.loadFiles(files).subscribe(res => {
      this.selectedFiles = res.filter(f => f.url);
      console.log(res);
    });
  }

  confirmQr() {
    this.banderaBtnConfirmQr = true
    Swal.fire({
      icon: "success",
      title: "¡Asistencia Exitosa!",
      html: `
      <p style='font-weight: bold;'>IV MUESTRA GASTRONOMICA E IMPORTANCIA DE LAS COMIDAS TRADICIONALES-ANCESTRALES WAYUU,  AFRO Y ARABE PARA EL FOMENTO DEL TURISMO EN EL DEPARTAMENTO DE LA GUAJIRA</p>
      <p>Oscar Ivan Arregoces Riveira</p>
      <p style='font-weight: bold;'>¡Ahora estás registrado en el evento!</p>
      `,
      showConfirmButton: false,
      timer: 2500,
      allowOutsideClick: false,
      timerProgressBar: true,
    });
  }

  verifyConfirm(data: any): boolean {

    if (data.length <= 0) {
      return this.banderaBtnConfirmQr;
    }

    if (this.currentQr !== data[0].value) {
      this.banderaBtnConfirmQr = false;
    }

    this.currentQr = data[0].value;
    return this.banderaBtnConfirmQr;
  }

}
