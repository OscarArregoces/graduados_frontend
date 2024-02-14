import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ClasificadosService } from 'src/app/core/services/dashboard/clasificados.service';
import { MainService } from 'src/app/core/services/main/main.service';
import { environment } from 'src/environments/environment';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements OnInit {


  // @Input() permissions!: string[];

  API_URI = environment.API_URI;
  private permissions: string[] = [];
  public token: any;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private mainService: MainService,
    private clasificadosService: ClasificadosService
  ) {
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    this.updateView();
  }

  @Input()
  set appRole(permissions: Array<string>) {
    this.permissions = permissions;
    // this.updateView();
  }


  private async updateView(): Promise<void> {
    this.viewContainer.clear();
    const hasPermission = await this.checkPermission();
    console.log(hasPermission)
    if (hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private async checkPermission(): Promise<boolean> {
    try {
      const body = {
        "permissions": this.permissions
      };
      const token = localStorage.getItem('token');
      const res = await lastValueFrom(this.clasificadosService.post(`${this.API_URI}/security/check/roles/permission/`, body, token));
      return res.data.valid;
    } catch (error) {
      console.log('Error Directiva', error);
      return false;
    }
  }
}

//   private updateView(): void {
//     this.viewContainer.clear();
//     if (this.checkPermission()) {
//       this.viewContainer.createEmbeddedView(this.templateRef);
//     }
//   }

//   private checkPermission(): boolean {
//     let hasPermission:boolean = true
//     let token = localStorage.getItem('token')
//     try {
//       let body = {
//         "permissions": this.permissions
//       }
//       this.clasificadosService.post(`${this.API_URI}/security/check/roles/permission/`, body, token).subscribe(res => {
//         hasPermission  = res.data.valid
//       })
//     } catch (error) {
//       console.log('Error Directiva', error)
//     }

//     return hasPermission
//   }

// }