import { Component, OnInit } from '@angular/core';
import { NgxScannerQrcodeService, ScannerQRCodeSelectedFiles } from 'ngx-scanner-qrcode';
import { MessageService } from 'primeng/api';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-llenar',
  templateUrl: './llenar.component.html',
  styleUrls: ['./llenar.component.css'],

})
export class LlenarComponent implements OnInit {

  API_URI = environment.API_URI;

  public inforCardDescription: string = `
  Llenar Asistencia' brinda la capacidad de registrar la asistencia a eventos en tiempo real. Utilizando códigos QR enviados a los usuarios, esta función agiliza el proceso de confirmación de asistencia, permitiendo un seguimiento preciso y una gestión eficiente de la participación en cada actividad.
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
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')!;
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

  confirmQr(api: string, action: any) {
    this.banderaBtnConfirmQr = true
    console.log(action)
    try {
      this.eventosService.get(api, this.token).subscribe(res => {
        if (res.data.message !== 'Ok') {
          return this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Algo salio mal' });
        }

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Confirmacion exitosa' });
      })
    } catch (error) {
      console.log('Error en consulta', error)
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error del servidor' });
    }
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