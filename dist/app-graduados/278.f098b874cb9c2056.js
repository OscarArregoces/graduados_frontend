"use strict";(self.webpackChunkAppTuristica=self.webpackChunkAppTuristica||[]).push([[278],{8278:(ot,T,s)=>{s.r(T),s.d(T,{ProgramaModule:()=>nt});var I=s(6895),U=s(1933),o=s(433),d=s(2340),t=s(8274),u=s(1009),m=s(805),_=s(1740),g=s(5593),h=s(2453),v=s(2210);let k=(()=>{class i{constructor(e,r,a){this.fb=e,this.eventosService=r,this.messageService=a,this.API_URI=d.N.API_URI,this.form=this.fb.group({name:["",o.kI.required],faculta:["",o.kI.required]}),this.facultades=[]}ngOnInit(){this.token=localStorage.getItem("token"),this.traerFacultades()}onSubmit(){this.eventosService.post(`${this.API_URI}/university/programa/create/`,{name:this.form.value.name,faculta:this.form.value.faculta.id},this.token).subscribe(r=>(this.form.reset(),this.messageService.add({severity:"success",summary:"Success",detail:"Facultad creada correctamente"}),this.traerFacultades()))}traerFacultades(){this.eventosService.get(`${this.API_URI}/university/faculta/`,this.token).subscribe(e=>{this.facultades=[],this.facultades=e.data})}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(o.QS),t.Y36(u.S),t.Y36(m.ez))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-crear"]],decls:7,vars:2,consts:[[1,"main","m-auto","p-5",3,"formGroup","ngSubmit"],[1,"m-3","text-center"],["type","text","pInputText","","placeholder","Nombre","formControlName","name"],["formControlName","faculta","optionLabel","name","placeholder","Seleccionar una opcion",3,"options"],["pButton","","pRipple","","type","submit","label","Crear",1,"p-button-success"]],template:function(e,r){1&e&&(t.TgZ(0,"form",0),t.NdJ("ngSubmit",function(){return r.onSubmit()}),t.TgZ(1,"h1",1),t._uU(2,"Crear programa"),t.qZA(),t._UZ(3,"input",2)(4,"p-dropdown",3)(5,"button",4),t.qZA(),t._UZ(6,"p-toast")),2&e&&(t.Q6J("formGroup",r.form),t.xp6(4),t.Q6J("options",r.facultades))},dependencies:[o._Y,o.Fj,o.JJ,o.JL,o.sg,o.u,_.o,g.Hq,h.FN,v.Lt],styles:[".main[_ngcontent-%COMP%]{width:500px;border:1px solid rgba(145,145,145,.836);border-radius:10px;display:flex;flex-direction:column;justify-content:center;align-items:center}.main[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], button[_ngcontent-%COMP%]{width:80%;margin:10px}"]}),i})();var c=s(8396);function q(i,n){1&i&&(t.TgZ(0,"tr")(1,"th"),t._uU(2,"Id"),t.qZA(),t.TgZ(3,"th"),t._uU(4,"Nombre"),t.qZA(),t.TgZ(5,"th"),t._uU(6,"Facultad"),t.qZA()())}function E(i,n){if(1&i&&(t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA()()),2&i){const e=n.$implicit;t.xp6(2),t.Oqu(e.id),t.xp6(2),t.Oqu(e.name),t.xp6(2),t.Oqu(e.faculty)}}const P=function(){return{"min-width":"10rem"}};let F=(()=>{class i{constructor(e){this.eventosService=e,this.API_URI=d.N.API_URI,this.programas=[]}ngOnInit(){this.token=localStorage.getItem("token"),this.traerProgramas()}traerProgramas(){this.eventosService.get(`${this.API_URI}/university/programa/`,this.token).subscribe(e=>{this.programas=e.data})}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(u.S))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-ver"]],decls:6,vars:3,consts:[[1,"main"],[3,"value","tableStyle"],["pTemplate","header"],["pTemplate","body"]],template:function(e,r){1&e&&(t.TgZ(0,"div",0)(1,"h1"),t._uU(2,"Todos los programas"),t.qZA(),t.TgZ(3,"p-table",1),t.YNc(4,q,7,0,"ng-template",2),t.YNc(5,E,7,3,"ng-template",3),t.qZA()()),2&e&&(t.xp6(3),t.Q6J("value",r.programas)("tableStyle",t.DdM(2,P)))},dependencies:[m.jx,c.iA],styles:[".main[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-direction:column}"]}),i})();var Z=s(1493);function M(i,n){1&i&&(t.TgZ(0,"tr")(1,"th"),t._uU(2,"Id"),t.qZA(),t.TgZ(3,"th"),t._uU(4,"Nombre"),t.qZA(),t.TgZ(5,"th"),t._uU(6,"Facultad"),t.qZA(),t.TgZ(7,"th"),t._uU(8,"Editar"),t.qZA()())}function N(i,n){if(1&i){const e=t.EpF();t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td")(8,"button",10),t.NdJ("click",function(){const l=t.CHM(e).$implicit,p=t.oxw();return t.KtG(p.changeDisplay(l.id))}),t.qZA()()()}if(2&i){const e=n.$implicit;t.xp6(2),t.Oqu(e.id),t.xp6(2),t.Oqu(e.name),t.xp6(2),t.Oqu(e.faculty)}}const J=function(){return{"min-width":"10rem"}},w=function(){return{width:"40vw",height:"40vh"}};let D=(()=>{class i{constructor(e,r,a){this.messageService=e,this.eventosService=r,this.fb=a,this.API_URI=d.N.API_URI,this.facultades=[],this.display=!1,this.id="",this.form=this.fb.group({name:["",o.kI.required],faculta:["",o.kI.required]})}ngOnInit(){this.token=localStorage.getItem("token"),this.traerFacultades()}submit(){try{this.eventosService.put(`${this.API_URI}/university/programa/update/${this.id}/`,this.form.value,this.token).subscribe(e=>(this.form.reset(),this.traerFacultades(),this.changeDisplay(this.id),this.messageService.add({severity:"success",summary:"Success",detail:"Editado correctamente"})))}catch(e){return this.traerFacultades(),this.messageService.add({severity:"success",summary:"Success",detail:`${e.errors.error}`})}}traerFacultades(){this.facultades=[],this.eventosService.get(`${this.API_URI}/university/programa/`,this.token).subscribe(e=>{console.log(e),this.facultades=e.data})}changeDisplay(e=""){this.id=e,this.display=!this.display}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(m.ez),t.Y36(u.S),t.Y36(o.QS))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-editar"]],decls:13,vars:13,consts:[[1,"main"],[3,"value","tableStyle"],["pTemplate","header"],["pTemplate","body"],["header","Editar sede",3,"visible","modal","draggable","resizable","visibleChange"],[1,"grid","dialog-form-crear","col-12","md:col-12","lg:col-12"],[3,"formGroup","submit"],["type","text","pInputText","","placeholder","Nombre","formControlName","name",1,"my-3"],["formControlName","faculta","optionLabel","name","placeholder","Selecciona una opcion",3,"options"],["pButton","","pRipple","","type","submit","label","Editar",1,"p-button-warning",3,"disabled"],["pButton","","pRipple","","type","button","icon","pi pi-pencil",1,"p-button-rounded","p-button-warning","mx-3",3,"click"]],template:function(e,r){1&e&&(t.TgZ(0,"div",0)(1,"h1"),t._uU(2,"Editar programas"),t.qZA(),t.TgZ(3,"p-table",1),t.YNc(4,M,9,0,"ng-template",2),t.YNc(5,N,9,3,"ng-template",3),t.qZA()(),t.TgZ(6,"p-dialog",4),t.NdJ("visibleChange",function(l){return r.display=l}),t.TgZ(7,"div",5)(8,"form",6),t.NdJ("submit",function(){return r.submit()}),t._UZ(9,"input",7)(10,"p-dropdown",8)(11,"button",9),t.qZA()()(),t._UZ(12,"p-toast")),2&e&&(t.xp6(3),t.Q6J("value",r.facultades)("tableStyle",t.DdM(11,J)),t.xp6(3),t.Akn(t.DdM(12,w)),t.Q6J("visible",r.display)("modal",!0)("draggable",!1)("resizable",!1),t.xp6(2),t.Q6J("formGroup",r.form),t.xp6(2),t.Q6J("options",r.facultades),t.xp6(1),t.Q6J("disabled",!r.form.valid))},dependencies:[o._Y,o.Fj,o.JJ,o.JL,o.sg,o.u,_.o,g.Hq,h.FN,m.jx,c.iA,Z.V,v.Lt],styles:[".main[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-direction:column}form[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:center;align-items:center;flex-direction:column;padding:20px}form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], button[_ngcontent-%COMP%]{width:80%}"]}),i})();var C=s(369);function R(i,n){1&i&&(t.TgZ(0,"tr")(1,"th",4),t._uU(2,"Indice"),t.qZA(),t.TgZ(3,"th",5),t._uU(4,"Nombre "),t._UZ(5,"p-sortIcon",6),t.qZA(),t.TgZ(6,"th",5),t._uU(7,"Facultad "),t._UZ(8,"p-sortIcon",6),t.qZA(),t.TgZ(9,"th",4),t._uU(10,"Eliminar"),t.qZA()())}function G(i,n){if(1&i){const e=t.EpF();t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._UZ(8,"p-confirmPopup"),t.TgZ(9,"button",7),t.NdJ("click",function(a){const p=t.CHM(e).$implicit,A=t.oxw();return t.KtG(A.confirm(a,p.id))}),t.qZA()()()}if(2&i){const e=n.$implicit,r=n.rowIndex;t.xp6(2),t.Oqu(r),t.xp6(2),t.Oqu(e.name),t.xp6(2),t.Oqu(e.faculty)}}const Y=function(){return{"min-width":"60rem"}};let O=(()=>{class i{constructor(e,r,a){this.confirmationService=e,this.eventosService=r,this.messageService=a,this.API_URI=d.N.API_URI,this.programas=[]}ngOnInit(){this.token=localStorage.getItem("token"),this.traerProgramas()}confirm(e,r){this.confirmationService.confirm({target:e.target,message:"\xbfSeguro que desea eliminar este programa?",icon:"pi pi-exclamation-triangle",accept:()=>{try{this.eventosService.delete(`${this.API_URI}/university/programa/delete/${r}/`,this.token).subscribe(a=>(this.traerProgramas(),this.messageService.add({severity:"success",summary:"Success",detail:"Eliminado correctamente !!!"})))}catch(a){console.log(a)}},reject:()=>{}})}traerProgramas(){this.programas=[];try{this.eventosService.get(`${this.API_URI}/university/programa/`,this.token).subscribe(e=>this.programas=e.data)}catch(e){console.log(e)}}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(m.YP),t.Y36(u.S),t.Y36(m.ez))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-eliminar"]],decls:7,vars:3,consts:[[1,"main"],[3,"value","tableStyle"],["pTemplate","header"],["pTemplate","body"],[2,"width","10%"],["pSortableColumn","name",2,"width","10%"],["field","name"],["pButton","","pRipple","","type","button","icon","pi pi-times",1,"p-button-rounded","p-button-danger","mx-3",3,"click"]],template:function(e,r){1&e&&(t.TgZ(0,"div",0)(1,"h1"),t._uU(2,"Eliminar programas"),t.qZA(),t.TgZ(3,"p-table",1),t.YNc(4,R,11,0,"ng-template",2),t.YNc(5,G,10,3,"ng-template",3),t.qZA()(),t._UZ(6,"p-toast")),2&e&&(t.xp6(3),t.Q6J("value",r.programas)("tableStyle",t.DdM(2,Y)))},dependencies:[g.Hq,h.FN,m.jx,c.iA,c.lQ,c.fz,C.P],styles:[".main[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-direction:column}"]}),i})();var $=s(1967),x=s(4247),j=s(9219),Q=s(6209),V=s(6474);const B=function(){return{display:"flex","justify-content":"space-between"}},H=function(){return{"font-size":"20px"}},f=function(){return{width:"100%"}};function L(i,n){if(1&i){const e=t.EpF();t.TgZ(0,"div",31)(1,"div",17)(2,"div",18),t._uU(3," Lista de Programas "),t.qZA(),t.TgZ(4,"div",32)(5,"span",33),t._UZ(6,"i",34),t.TgZ(7,"input",35),t.NdJ("input",function(a){t.CHM(e);const l=t.oxw(),p=t.MAs(10);return t.KtG(p.filterGlobal(l.getEventValue(a),"contains"))}),t.qZA()()()()()}2&i&&(t.xp6(1),t.Akn(t.DdM(8,B)),t.xp6(1),t.Akn(t.DdM(9,H)),t.xp6(3),t.Akn(t.DdM(10,f)),t.xp6(2),t.Akn(t.DdM(11,f)))}function z(i,n){1&i&&(t.TgZ(0,"tr")(1,"th",36),t._UZ(2,"p-tableHeaderCheckbox"),t.qZA(),t.TgZ(3,"th",37)(4,"p"),t._uU(5,"Indice"),t.qZA()(),t.TgZ(6,"th",38)(7,"div",39),t._uU(8," Nombre "),t._UZ(9,"p-sortIcon",40)(10,"p-columnFilter",41),t.qZA()(),t.TgZ(11,"th",42)(12,"div",39),t._uU(13," Facultad "),t._UZ(14,"p-sortIcon",43)(15,"p-columnFilter",44),t.qZA()(),t.TgZ(16,"th",45),t._uU(17," Editar "),t.qZA(),t.TgZ(18,"th",45),t._uU(19," Eliminar "),t.qZA()())}function K(i,n){if(1&i){const e=t.EpF();t.TgZ(0,"tr",46)(1,"td"),t._UZ(2,"p-tableCheckbox",47),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td")(6,"span",48),t._uU(7,"programa"),t.qZA(),t._uU(8),t.qZA(),t.TgZ(9,"td")(10,"span",48),t._uU(11,"programa"),t.qZA(),t._uU(12),t.qZA(),t.TgZ(13,"td",49)(14,"button",50),t.NdJ("click",function(){const l=t.CHM(e).$implicit,p=t.oxw();return t.KtG(p.changeDisplayFormEdit(l))}),t.qZA()(),t.TgZ(15,"td",49),t._UZ(16,"p-confirmPopup"),t.TgZ(17,"button",51),t.NdJ("click",function(a){const p=t.CHM(e).$implicit,A=t.oxw();return t.KtG(A.confirm(a,p.id))}),t.qZA()()()}if(2&i){const e=n.$implicit,r=n.rowIndex;t.xp6(2),t.Q6J("value",e),t.xp6(2),t.hij(" ",r+1," "),t.xp6(4),t.hij(" ",e.name," "),t.xp6(4),t.hij(" ",e.faculty.name," ")}}function X(i,n){1&i&&(t.TgZ(0,"tr")(1,"td",52),t._uU(2,"No hay datos que mostrar"),t.qZA()())}const W=function(){return[10,25,50]},tt=function(){return["pregunta_nombre","momento"]},S=function(i){return{width:i,"text-aling":"center"}},b=function(){return{"font-weight":"bold"}},y=function(){return{width:"40%"}},et=function(){return{width:"100%"}},rt=[{path:"crear",component:k},{path:"ver",component:F},{path:"editar",component:D},{path:"eliminar",component:O},{path:"gestionar",component:(()=>{class i{constructor(e,r,a,l,p){this.eventosService=e,this.messageService=r,this.confirmationService=a,this.fb=l,this.pantallaService=p,this.width="",this.searchValue="",this.API_URI=d.N.API_URI,this.facultades=[],this.programas=[],this.programasVerificated=[],this.itemsBulkDelete=[],this.inforCardDescription="\n  El m\xf3dulo 'Gestionar Programas' brinda una interfaz completa para administrar los programas acad\xe9micos asociados a las actividades. Permite a los administrativos asignar eventos espec\xedficos a programas de pregrado o postgrado, mejorando la relevancia y orientaci\xf3n de las actividades.\n  ",this.loading=!1,this.activityValues=[0,100],this.idEdit="",this.displayFormCreate=!1,this.displayFormEdit=!1,this.formCreate=this.fb.group({name:["",o.kI.required],faculty:["",o.kI.required]}),this.formEdit=this.fb.group({name:["",o.kI.required],faculty:["",o.kI.required]})}ngOnInit(){this.token=localStorage.getItem("token"),this.traerProgramas(),this.traerFacultades();const[e]=this.pantallaService.calcularEspacioPantalla();this.subscription$=e.subscribe(r=>this.width=r)}ngOnDestroy(){this.subscription$.unsubscribe()}traerFacultades(){this.facultades=[];try{this.eventosService.get(`${this.API_URI}/university/faculta/`,this.token).subscribe(e=>{e.data.map(r=>this.facultades.push({id:r.id,name:r.name}))})}catch(e){console.log("Error en consulta",e)}}traerProgramas(){this.programas=[];try{this.eventosService.get(`${this.API_URI}/university/programa/`,this.token).subscribe(e=>{this.programas=e.data,e.data.map(r=>this.programasVerificated.push(r.name.toLowerCase().replace(/\s+/g,"")))})}catch(e){console.log("Error en consulta",e)}}onSubmit(){if(this.programasVerificated.includes(this.formCreate.value.name.toLowerCase().replace(/\s+/g,"")))return this.messageService.add({severity:"error",summary:"Error",detail:"Este programa ya existe"});let e={name:this.formCreate.value.name,faculta:this.formCreate.value.faculty.id};try{this.eventosService.post(`${this.API_URI}/university/programa/create/`,e,this.token).subscribe(r=>(this.formCreate.reset(),this.traerProgramas(),this.changeDisplayFormCreate(),this.messageService.add({severity:"success",summary:"Success",detail:"Creado correctamente"})))}catch(r){console.log("Error en consulta",r)}}handleEdit(){if(this.programasVerificated.includes(this.formEdit.value.name.toLowerCase().replace(/\s+/g,"")))return this.messageService.add({severity:"error",summary:"Error",detail:"Este programa ya existe"});let e={name:this.formEdit.value.name,faculta:this.formEdit.value.faculty.id};try{this.eventosService.put(`${this.API_URI}/university/programa/update/${this.idEdit}/`,e,this.token).subscribe(r=>(this.formEdit.reset(),this.traerProgramas(),this.changeDisplayFormEdit(),this.messageService.add({severity:"success",summary:"Success",detail:"Editado correctamente"})))}catch(r){console.log("Error en consulta",r)}}deleteAll(){const e=this.itemsBulkDelete.map(a=>a.id);if(0===e.length)return this.messageService.add({severity:"error",summary:"Notififaci\xf3n",detail:"Debes seleccionar al menos un registro"});let r={ids:e};try{this.eventosService.delete(`${this.API_URI}/university/programa/delete/`,this.token,r).subscribe(a=>(this.traerProgramas(),this.messageService.add({severity:"success",summary:"Success",detail:"Eliminado correctamente !!!"})))}catch(a){console.log(a)}}changeDisplayFormCreate(){this.displayFormCreate=!this.displayFormCreate}changeDisplayFormEdit(e={}){this.idEdit=e.id,this.formEdit.patchValue(e),console.log(e),this.displayFormEdit=!this.displayFormEdit}getEventValue(e){return e.target.value}confirm(e,r){console.log(r),this.confirmationService.confirm({target:e.target,message:"\xbfSeguro que desea eliminar este programa?",icon:"pi pi-exclamation-triangle",accept:()=>{try{this.eventosService.delete(`${this.API_URI}/university/programa/delete/${r}/`,this.token).subscribe(a=>(this.traerProgramas(),this.messageService.add({severity:"success",summary:"Success",detail:"Eliminado correctamente !!!"})))}catch(a){console.log(a)}},reject:()=>{}})}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(u.S),t.Y36(m.ez),t.Y36(m.YP),t.Y36(o.QS),t.Y36($.c))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-gestionar"]],decls:62,vars:71,consts:[["titulo","Gestionar Programas"],["card-body","",1,"grid"],[3,"description"],[1,"col-12"],["pButton","","pRipple","","type","submit","icon","pi pi-plus","label","Crear Nuevo",1,"p-button-success","mr-2",3,"click"],["pButton","","pRipple","","type","submit","label"," Eliminar seleccionados","icon","pi pi-trash",1,"p-button-danger","mr-2",3,"click"],[1,"col-12","md:col-12","lg:col-12"],[1,"flex","flex-column","gap-2"],["dataKey","id","styleClass","p-datatable-customers","responsiveLayout","scroll","currentPageReportTemplate","Mostrando {first} a {last} de {totalRecords} elementos","responsiveLayout","scroll",3,"value","selection","rowHover","rows","showCurrentPageReport","rowsPerPageOptions","loading","paginator","filterDelay","globalFilterFields","selectionChange"],["dt",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["pTemplate","emptymessage"],[3,"visible","showHeader","modal","dismissableMask","visibleChange"],["titulo","Crear programa"],[3,"formGroup"],[1,"grid"],[1,"col-12","md:col-6","lg:col-6"],[1,"mb-2"],[1,"p-inputgroup","my-1"],[1,"p-inputgroup-addon"],[1,"pi","pi-bookmark-fill",2,"color","#f16357"],["type","text","placeholder","Escribe aqui..","formControlName","name","pInputText",""],["formControlName","faculty","placeholder","Selecciona una opcion","optionLabel","name",3,"options"],[1,"col-12","md:col-12","lg:col-12","flex","justify-content-center","my-3"],["pButton","","pRipple","","type","button","label","Guardar",1,"p-button-success","m-3",3,"disabled","click"],["pButton","","pRipple","","type","button","label","Volver",1,"p-button-raised","p-button-secondary","m-3",3,"click"],["titulo","Editar programa"],[1,"col-12","md:col-12","lg:col-12","flex","justify-content-center"],["pButton","","pRipple","","type","button","label","Editar",1,"p-button-warning","m-3",3,"disabled","click"],[1,"table-header"],[1,"col-12","md:col-6","lg:col-3"],[1,"p-input-icon-left"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Busqueda global",3,"input"],[2,"width","3rem"],[2,"width","5rem"],["pSortableColumn","name"],[1,"flex","justify-content-between","align-items-center"],["field","name"],["type","text","field","name","display","menu",1,"ml-auto"],["pSortableColumn","faculty.name"],["field","faculty.name"],["type","text","field","faculty.name","display","menu",1,"ml-auto"],[2,"width","8rem","text-align","center"],[1,"p-selectable-row"],[3,"value"],[1,"p-column-title"],[2,"text-align","center"],["pButton","","type","button","icon","pi pi-pencil",1,"p-button-warning",3,"click"],["pButton","","type","button","icon","pi pi-trash",1,"p-button-danger",3,"click"],["colspan","8"]],template:function(e,r){1&e&&(t.TgZ(0,"app-card",0)(1,"div",1),t._UZ(2,"app-custom-info-card",2),t.TgZ(3,"div",3)(4,"button",4),t.NdJ("click",function(){return r.changeDisplayFormCreate()}),t.qZA(),t.TgZ(5,"button",5),t.NdJ("click",function(){return r.deleteAll()}),t.qZA()(),t.TgZ(6,"div",6)(7,"div",7)(8,"p-card")(9,"p-table",8,9),t.NdJ("selectionChange",function(l){return r.itemsBulkDelete=l}),t.YNc(11,L,8,12,"ng-template",10),t.YNc(12,z,20,0,"ng-template",11),t.YNc(13,K,18,4,"ng-template",12),t.YNc(14,X,3,0,"ng-template",13),t.qZA()()()()()(),t.TgZ(15,"p-dialog",14),t.NdJ("visibleChange",function(l){return r.displayFormCreate=l}),t.TgZ(16,"app-card-dialog",15)(17,"form",16)(18,"div",17)(19,"div",18)(20,"div",7)(21,"label",19),t._uU(22,"Nombre "),t.qZA(),t.TgZ(23,"div",20)(24,"span",21),t._UZ(25,"i",22),t.qZA(),t._UZ(26,"input",23),t.qZA()()(),t.TgZ(27,"div",18)(28,"div",7)(29,"label",19),t._uU(30,"Facultad "),t.qZA(),t.TgZ(31,"div",20)(32,"span",21),t._UZ(33,"i",22),t.qZA(),t._UZ(34,"p-dropdown",24),t.qZA()()(),t.TgZ(35,"div",25)(36,"button",26),t.NdJ("click",function(){return r.onSubmit()}),t.qZA(),t.TgZ(37,"button",27),t.NdJ("click",function(){return r.changeDisplayFormCreate()}),t.qZA()()()()()(),t.TgZ(38,"p-dialog",14),t.NdJ("visibleChange",function(l){return r.displayFormEdit=l}),t.TgZ(39,"app-card-dialog",28)(40,"form",16)(41,"div",17)(42,"div",18)(43,"div",7)(44,"label",19),t._uU(45,"Nombre "),t.qZA(),t.TgZ(46,"div",20)(47,"span",21),t._UZ(48,"i",22),t.qZA(),t._UZ(49,"input",23),t.qZA()()(),t.TgZ(50,"div",18)(51,"div",7)(52,"label",19),t._uU(53,"Facultad "),t.qZA(),t.TgZ(54,"div",20)(55,"span",21),t._UZ(56,"i",22),t.qZA(),t._UZ(57,"p-dropdown",24),t.qZA()()(),t.TgZ(58,"div",29)(59,"button",30),t.NdJ("click",function(){return r.handleEdit()}),t.qZA(),t.TgZ(60,"button",27),t.NdJ("click",function(){return r.changeDisplayFormEdit()}),t.qZA()()()()()(),t._UZ(61,"p-toast")),2&e&&(t.xp6(2),t.Q6J("description",r.inforCardDescription),t.xp6(7),t.Q6J("value",r.programas)("selection",r.itemsBulkDelete)("rowHover",!0)("rows",10)("showCurrentPageReport",!0)("rowsPerPageOptions",t.DdM(53,W))("loading",r.loading)("paginator",!0)("filterDelay",0)("globalFilterFields",t.DdM(54,tt)),t.xp6(6),t.Akn(t.VKq(55,S,r.width)),t.Q6J("visible",r.displayFormCreate)("showHeader",!1)("modal",!0)("dismissableMask",!0),t.xp6(2),t.Q6J("formGroup",r.formCreate),t.xp6(4),t.Akn(t.DdM(57,b)),t.xp6(5),t.Akn(t.DdM(58,f)),t.xp6(3),t.Akn(t.DdM(59,b)),t.xp6(5),t.Akn(t.DdM(60,f)),t.Q6J("options",r.facultades),t.xp6(2),t.Akn(t.DdM(61,y)),t.Q6J("disabled",!r.formCreate.valid),t.xp6(1),t.Akn(t.DdM(62,y)),t.xp6(1),t.Akn(t.VKq(63,S,r.width)),t.Q6J("visible",r.displayFormEdit)("showHeader",!1)("modal",!0)("dismissableMask",!0),t.xp6(2),t.Q6J("formGroup",r.formEdit),t.xp6(4),t.Akn(t.DdM(65,b)),t.xp6(5),t.Akn(t.DdM(66,et)),t.xp6(3),t.Akn(t.DdM(67,b)),t.xp6(5),t.Akn(t.DdM(68,f)),t.Q6J("options",r.facultades),t.xp6(2),t.Akn(t.DdM(69,y)),t.Q6J("disabled",!r.formEdit.valid),t.xp6(1),t.Akn(t.DdM(70,y)))},dependencies:[o._Y,o.Fj,o.JJ,o.JL,o.sg,o.u,_.o,g.Hq,h.FN,m.jx,c.iA,c.lQ,c.fz,c.UA,c.Mo,c.xl,Z.V,C.P,v.Lt,x.Z,j.A,Q.i,V.t],styles:["[_nghost-%COMP%]     .p-datatable-header{background-color:#f16357;border:1px solid #f16357}"]}),i})()}];let it=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[U.Bz.forChild(rt),U.Bz]}),i})();var at=s(4466);let nt=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[I.ez,it,o.u5,o.UX,_.j,g.hJ,h.EV,c.U$,Z.S,C.n,v.kW,x.d,at.m]}),i})()}}]);