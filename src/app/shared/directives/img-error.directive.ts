import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appImgError]'
})
export class ImgErrorDirective {

  @Input() urlCustom!:string;

  constructor( private elementRef: ElementRef) { }
  

  @HostListener('error')
  cargarImagen(){
    const img = this.elementRef.nativeElement
    img.src = this.urlCustom || 'assets/images/notFound/imgNotFound.png'
  }
}
