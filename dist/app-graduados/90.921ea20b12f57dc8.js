"use strict";(self.webpackChunkAppTuristica=self.webpackChunkAppTuristica||[]).push([[90],{1009:(T,v,o)=>{o.d(v,{S:()=>f});var h=o(529),c=o(8274);let f=(()=>{class e{constructor(m){this.http=m}get(m,p){let g={headers:new h.WM({"Content-Type":"application/json",Authorization:`Bearer ${p}`})};return this.http.get(m,g)}post(m,p,g){let a={headers:new h.WM({"Content-Type":"application/json",Authorization:`Bearer ${g}`})};return this.http.post(m,p,a)}put(m,p,g){let a={headers:new h.WM({"Content-Type":"application/json",Authorization:`Bearer ${g}`})};return this.http.put(m,p,a)}delete(m,p,g){let a={headers:new h.WM({"Content-Type":"application/json",Authorization:`Bearer ${p}`}),body:g};return this.http.delete(m,a)}}return e.\u0275fac=function(m){return new(m||e)(c.LFG(h.eN))},e.\u0275prov=c.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},8794:(T,v,o)=>{o.d(v,{z:()=>m});var h=o(529),c=o(262),f=o(2843),e=o(2340),_=o(8274);let m=(()=>{class p{constructor(a){this.http=a,this.API_URI=e.N.API_URI}getAreas(){const a=this.createHeaders();return this.http.get(`${this.API_URI}/eventos/areas`,{headers:a}).pipe((0,c.K)(this.handleHttpError))}getSubareas(){const a=this.createHeaders();return this.http.get(`${this.API_URI}/eventos/sub/areas/`,{headers:a}).pipe((0,c.K)(this.handleHttpError))}getTipoActividades(){const a=this.createHeaders();return this.http.get(`${this.API_URI}/eventos/tipos/`,{headers:a}).pipe((0,c.K)(this.handleHttpError))}getActividades(){const a=this.createHeaders();return this.http.get(`${this.API_URI}/eventos/`,{headers:a}).pipe((0,c.K)(this.handleHttpError))}getSedes(){const a=this.createHeaders();return this.http.get(`${this.API_URI}/university/sede/`,{headers:a}).pipe((0,c.K)(this.handleHttpError))}getFacultades(){const a=this.createHeaders();return this.http.get(`${this.API_URI}/university/faculta/`,{headers:a}).pipe((0,c.K)(this.handleHttpError))}getProgramas(){const a=this.createHeaders();return this.http.get(`${this.API_URI}/university/programa/`,{headers:a}).pipe((0,c.K)(this.handleHttpError))}getGeneros(){const a=this.createHeaders();return this.http.get(`${this.API_URI}/genders`,{headers:a}).pipe((0,c.K)(this.handleHttpError))}getCondiciones(){const a=this.createHeaders();return this.http.get(`${this.API_URI}/condiciones`,{headers:a}).pipe((0,c.K)(this.handleHttpError))}getTiposDocumento(){const a=this.createHeaders();return this.http.get(`${this.API_URI}/documents`,{headers:a}).pipe((0,c.K)(this.handleHttpError))}getSolicitudes(){const a=this.createHeaders();return this.http.get(`${this.API_URI}/pqrs`,{headers:a}).pipe((0,c.K)(this.handleHttpError))}getTipoSolicitudes(){const a=this.createHeaders();return this.http.get(`${this.API_URI}/pqrs/tipo/`,{headers:a}).pipe((0,c.K)(this.handleHttpError))}getPreguntas(){const a=this.createHeaders();return this.http.get(`${this.API_URI}/poll/questions/`,{headers:a}).pipe((0,c.K)(this.handleHttpError))}getMomentos(){const a=this.createHeaders();return this.http.get(`${this.API_URI}/poll/momentos/`,{headers:a}).pipe((0,c.K)(this.handleHttpError))}getCapacitaciones(){const a=this.createHeaders();return this.http.get(`${this.API_URI}/advertisements/capacitaciones/`,{headers:a}).pipe((0,c.K)(this.handleHttpError))}getCategorias(){const a=this.createHeaders();return this.http.get(`${this.API_URI}/advertisements/category/`,{headers:a}).pipe((0,c.K)(this.handleHttpError))}getSubCategorias(){const a=this.createHeaders();return this.http.get(`${this.API_URI}/advertisements/sub/category/`,{headers:a}).pipe((0,c.K)(this.handleHttpError))}getEmprendimientos(){const a=this.createHeaders();return this.http.get(`${this.API_URI}/advertisements/`,{headers:a}).pipe((0,c.K)(this.handleHttpError))}getRoles(){const a=this.createHeaders();return this.http.get(`${this.API_URI}/roles/`,{headers:a}).pipe((0,c.K)(this.handleHttpError))}getPaises(){const a=this.createHeaders();return this.http.get(`${this.API_URI}/nationality/pais/`,{headers:a}).pipe((0,c.K)(this.handleHttpError))}getDepartamentos(){const a=this.createHeaders();return this.http.get(`${this.API_URI}/nationality/departamento`,{headers:a}).pipe((0,c.K)(this.handleHttpError))}getCiudades(){const a=this.createHeaders();return this.http.get(`${this.API_URI}/nationality/ciudad`,{headers:a}).pipe((0,c.K)(this.handleHttpError))}getServicios(){const a=this.createHeaders();return this.http.get(`${this.API_URI}/eventos/servicios/`,{headers:a}).pipe((0,c.K)(this.handleHttpError))}getDependencias(){const a=this.createHeaders();return this.http.get(`${this.API_URI}/gestor/`,{headers:a}).pipe((0,c.K)(this.handleHttpError))}createHeaders(){const a=localStorage.getItem("token");return a?new h.WM({Authorization:`Bearer ${a}`}):(console.warn("No se encontr\xf3 un token en el localStorage."),new h.WM)}handleHttpError(a){return(0,f._)(()=>a)}}return p.\u0275fac=function(a){return new(a||p)(_.LFG(h.eN))},p.\u0275prov=_.Yz7({token:p,factory:p.\u0275fac,providedIn:"root"}),p})()},1090:(T,v,o)=>{o.r(v),o.d(v,{AreasModule:()=>se});var h=o(6895),c=o(2496),f=o(2340),e=o(8274),_=o(1009),m=o(805),p=o(8396);function g(r,n){1&r&&(e.TgZ(0,"tr")(1,"th"),e._uU(2,"Id"),e.qZA(),e.TgZ(3,"th"),e._uU(4,"Nombre"),e.qZA()())}function a(r,n){if(1&r&&(e.TgZ(0,"tr")(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA()()),2&r){const t=n.$implicit;e.xp6(2),e.Oqu(t.id),e.xp6(2),e.Oqu(t.name)}}const x=function(){return{"min-width":"10rem"}};let H=(()=>{class r{constructor(t){this.eventosService=t,this.API_URI=f.N.API_URI,this.areas=[]}ngOnInit(){this.token=localStorage.getItem("token"),this.traerSedes()}traerSedes(){this.eventosService.get(`${this.API_URI}/university/sede/`,this.token).subscribe(t=>{this.areas=t.data})}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(_.S))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-ver"]],decls:6,vars:3,consts:[[1,"main"],[3,"value","tableStyle"],["pTemplate","header"],["pTemplate","body"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0)(1,"h1"),e._uU(2,"Todos las areas"),e.qZA(),e.TgZ(3,"p-table",1),e.YNc(4,g,5,0,"ng-template",2),e.YNc(5,a,5,2,"ng-template",3),e.qZA()()),2&t&&(e.xp6(3),e.Q6J("value",i.areas)("tableStyle",e.DdM(2,x)))},dependencies:[m.jx,p.iA],styles:[".main[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-direction:column}"]}),r})();var l=o(433),y=o(1740),b=o(5593),A=o(2453);let R=(()=>{class r{constructor(t,i,s){this.fb=t,this.eventosService=i,this.messageService=s,this.API_URI=f.N.API_URI,this.form=this.fb.group({name:["",l.kI.required]}),this.areas=[]}ngOnInit(){this.token=localStorage.getItem("token"),this.traerAreas()}onSubmit(){if(this.areas.includes(this.form.value.name.trim().toLowerCase()))return this.messageService.add({severity:"error",summary:"Error",detail:"Esta area ya existe"});this.eventosService.post(`${this.API_URI}/eventos/areas/create/`,this.form.value,this.token).subscribe(t=>(this.form.reset(),this.messageService.add({severity:"success",summary:"Success",detail:"Area creado correctamente"}),this.traerAreas()))}traerAreas(){this.eventosService.get(`${this.API_URI}/eventos/areas/`,this.token).subscribe(t=>{this.areas=[],t.data.map(i=>this.areas.push(i.name.trim().toLowerCase()))})}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(l.QS),e.Y36(_.S),e.Y36(m.ez))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-crear"]],decls:6,vars:1,consts:[[1,"main","m-auto","p-5",3,"formGroup","ngSubmit"],[1,"m-3","text-center"],["type","text","pInputText","","placeholder","Nombre","formControlName","name"],["pButton","","pRipple","","type","submit","label","Crear area",1,"p-button-success"]],template:function(t,i){1&t&&(e.TgZ(0,"form",0),e.NdJ("ngSubmit",function(){return i.onSubmit()}),e.TgZ(1,"h1",1),e._uU(2,"Crear area"),e.qZA(),e._UZ(3,"input",2)(4,"button",3),e.qZA(),e._UZ(5,"p-toast")),2&t&&e.Q6J("formGroup",i.form)},dependencies:[l._Y,l.Fj,l.JJ,l.JL,l.sg,l.u,y.o,b.Hq,A.FN],styles:[".main[_ngcontent-%COMP%]{width:500px;border:1px solid rgba(145,145,145,.836);border-radius:10px;display:flex;flex-direction:column;justify-content:center;align-items:center}.main[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], button[_ngcontent-%COMP%]{width:80%;margin:10px}"]}),r})();var I=o(1493);function M(r,n){1&r&&(e.TgZ(0,"tr")(1,"th"),e._uU(2,"Id"),e.qZA(),e.TgZ(3,"th"),e._uU(4,"Nombre"),e.qZA(),e.TgZ(5,"th"),e._uU(6,"Editar"),e.qZA()())}function D(r,n){if(1&r){const t=e.EpF();e.TgZ(0,"tr")(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td")(6,"button",9),e.NdJ("click",function(){const d=e.CHM(t).$implicit,u=e.oxw();return e.KtG(u.changeDisplay(d.id))}),e.qZA()()()}if(2&r){const t=n.$implicit;e.xp6(2),e.Oqu(t.id),e.xp6(2),e.Oqu(t.name)}}const k=function(){return{"min-width":"10rem"}},F=function(){return{width:"40vw",height:"40vh"}};let w=(()=>{class r{constructor(t,i,s){this.messageService=t,this.eventosService=i,this.fb=s,this.API_URI=f.N.API_URI,this.areas=[],this.areasVerificated=[],this.display=!1,this.id="",this.form=this.fb.group({name:["",l.kI.required]})}ngOnInit(){this.token=localStorage.getItem("token"),this.traerAreas()}submit(){if(this.areasVerificated.includes(this.form.value.name.trim().toLowerCase()))return this.messageService.add({severity:"error",summary:"Error",detail:"Esta area ya existe"});try{this.eventosService.put(`${this.API_URI}/eventos/areas/update/${this.id}/`,this.form.value,this.token).subscribe(t=>(this.form.reset(),this.traerAreas(),this.changeDisplay(this.id),this.messageService.add({severity:"success",summary:"Success",detail:"Editado correctamente"})))}catch(t){return this.traerAreas(),this.messageService.add({severity:"success",summary:"Success",detail:`${t.errors.error}`})}}traerAreas(){this.areas=[],this.eventosService.get(`${this.API_URI}/eventos/areas/`,this.token).subscribe(t=>{t.data.map(i=>this.areasVerificated.push(i.name.trim().toLowerCase())),this.areas=t.data})}changeDisplay(t=""){this.id=t,this.display=!this.display}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(m.ez),e.Y36(_.S),e.Y36(l.QS))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-editar"]],decls:12,vars:12,consts:[[1,"main"],[3,"value","tableStyle"],["pTemplate","header"],["pTemplate","body"],["header","Editar momento",3,"visible","modal","draggable","resizable","visibleChange"],[1,"grid","dialog-form-crear","col-12","md:col-12","lg:col-12"],[3,"formGroup","submit"],["type","text","pInputText","","placeholder","Nombre","formControlName","name",1,"my-3"],["pButton","","pRipple","","type","submit","label","Editar",1,"p-button-warning",3,"disabled"],["pButton","","pRipple","","type","button","icon","pi pi-pencil",1,"p-button-rounded","p-button-warning","mx-3",3,"click"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0)(1,"h1"),e._uU(2,"Editar areas"),e.qZA(),e.TgZ(3,"p-table",1),e.YNc(4,M,7,0,"ng-template",2),e.YNc(5,D,7,2,"ng-template",3),e.qZA()(),e.TgZ(6,"p-dialog",4),e.NdJ("visibleChange",function(d){return i.display=d}),e.TgZ(7,"div",5)(8,"form",6),e.NdJ("submit",function(){return i.submit()}),e._UZ(9,"input",7)(10,"button",8),e.qZA()()(),e._UZ(11,"p-toast")),2&t&&(e.xp6(3),e.Q6J("value",i.areas)("tableStyle",e.DdM(10,k)),e.xp6(3),e.Akn(e.DdM(11,F)),e.Q6J("visible",i.display)("modal",!0)("draggable",!1)("resizable",!1),e.xp6(2),e.Q6J("formGroup",i.form),e.xp6(2),e.Q6J("disabled",!i.form.valid))},dependencies:[l._Y,l.Fj,l.JJ,l.JL,l.sg,l.u,y.o,b.Hq,A.FN,m.jx,p.iA,I.V],styles:[".main[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-direction:column}form[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:center;align-items:center;flex-direction:column;padding:20px}form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], button[_ngcontent-%COMP%]{width:80%}"]}),r})();var Z=o(369);function $(r,n){1&r&&(e.TgZ(0,"tr")(1,"th",4),e._uU(2,"Indice"),e.qZA(),e.TgZ(3,"th",5),e._uU(4,"ID "),e._UZ(5,"p-sortIcon",6),e.qZA(),e.TgZ(6,"th",7),e._uU(7,"Nombre "),e._UZ(8,"p-sortIcon",8),e.qZA(),e.TgZ(9,"th",4),e._uU(10,"Eliminar"),e.qZA()())}function N(r,n){if(1&r){const t=e.EpF();e.TgZ(0,"tr")(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e._UZ(8,"p-confirmPopup"),e.TgZ(9,"button",9),e.NdJ("click",function(s){const u=e.CHM(t).$implicit,C=e.oxw();return e.KtG(C.confirm(s,u.id))}),e.qZA()()()}if(2&r){const t=n.$implicit,i=n.rowIndex;e.xp6(2),e.Oqu(i),e.xp6(2),e.Oqu(t.id),e.xp6(2),e.Oqu(t.name)}}const q=function(){return{"min-width":"60rem"}};let J=(()=>{class r{constructor(t,i,s){this.confirmationService=t,this.eventosService=i,this.messageService=s,this.API_URI=f.N.API_URI,this.areas=[]}ngOnInit(){this.token=localStorage.getItem("token"),this.traerAreas()}confirm(t,i){this.confirmationService.confirm({target:t.target,message:"\xbfSeguro que desea eliminar esta area?",icon:"pi pi-exclamation-triangle",accept:()=>{try{this.eventosService.delete(`${this.API_URI}/eventos/areas/delete/${i}/`,this.token).subscribe(s=>(this.traerAreas(),this.messageService.add({severity:"success",summary:"Success",detail:"Eliminado correctamente !!!"})))}catch(s){console.log(s)}},reject:()=>{}})}traerAreas(){this.areas=[];try{this.eventosService.get(`${this.API_URI}/eventos/areas/`,this.token).subscribe(t=>this.areas=t.data)}catch(t){console.log(t)}}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(m.YP),e.Y36(_.S),e.Y36(m.ez))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-eliminar"]],decls:7,vars:3,consts:[[1,"main"],[3,"value","tableStyle"],["pTemplate","header"],["pTemplate","body"],[2,"width","10%"],["pSortableColumn","id",2,"width","10%"],["field","id"],["pSortableColumn","name",2,"width","10%"],["field","name"],["pButton","","pRipple","","type","button","icon","pi pi-times",1,"p-button-rounded","p-button-danger","mx-3",3,"click"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0)(1,"h1"),e._uU(2,"Eliminar areas"),e.qZA(),e.TgZ(3,"p-table",1),e.YNc(4,$,11,0,"ng-template",2),e.YNc(5,N,10,3,"ng-template",3),e.qZA()(),e._UZ(6,"p-toast")),2&t&&(e.xp6(3),e.Q6J("value",i.areas)("tableStyle",e.DdM(2,q)))},dependencies:[b.Hq,A.FN,m.jx,p.iA,p.lQ,p.fz,Z.P],styles:[".main[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-direction:column}"]}),r})();var O=o(1967),G=o(8794),U=o(4247),K=o(9219),Y=o(6474);const B=function(){return{display:"flex","justify-content":"space-between"}},j=function(){return{"font-size":"20px"}},E=function(){return{width:"100%"}};function z(r,n){if(1&r){const t=e.EpF();e.TgZ(0,"div",27)(1,"div",16)(2,"div",28),e._uU(3," Lista de Areas "),e.qZA(),e.TgZ(4,"div",29)(5,"span",30),e._UZ(6,"i",31),e.TgZ(7,"input",32),e.NdJ("input",function(s){e.CHM(t);const d=e.oxw(),u=e.MAs(10);return e.KtG(u.filterGlobal(d.getEventValue(s),"contains"))}),e.qZA()()()()()}2&r&&(e.xp6(1),e.Akn(e.DdM(8,B)),e.xp6(1),e.Akn(e.DdM(9,j)),e.xp6(3),e.Akn(e.DdM(10,E)),e.xp6(2),e.Akn(e.DdM(11,E)))}function V(r,n){1&r&&(e.TgZ(0,"tr")(1,"th",33),e._UZ(2,"p-tableHeaderCheckbox"),e.qZA(),e.TgZ(3,"th",34)(4,"p"),e._uU(5,"Indice"),e.qZA()(),e.TgZ(6,"th",35)(7,"div",36),e._uU(8," Nombre "),e._UZ(9,"p-sortIcon",37)(10,"p-columnFilter",38),e.qZA()(),e.TgZ(11,"th",39),e._uU(12," Editar "),e.qZA(),e.TgZ(13,"th",39),e._uU(14," Eliminar "),e.qZA()())}function L(r,n){if(1&r){const t=e.EpF();e.TgZ(0,"tr",40)(1,"td"),e._UZ(2,"p-tableCheckbox",41),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td")(6,"span",42),e._uU(7,"Tipo"),e.qZA(),e._uU(8),e.qZA(),e.TgZ(9,"td",43)(10,"button",44),e.NdJ("click",function(){const d=e.CHM(t).$implicit,u=e.oxw();return e.KtG(u.changeDisplayFormEdit(d))}),e.qZA()(),e.TgZ(11,"td",43),e._UZ(12,"p-confirmPopup"),e.TgZ(13,"button",45),e.NdJ("click",function(s){const u=e.CHM(t).$implicit,C=e.oxw();return e.KtG(C.confirm(s,u.id))}),e.qZA()()()}if(2&r){const t=n.$implicit,i=n.rowIndex;e.xp6(2),e.Q6J("value",t),e.xp6(2),e.hij(" ",i+1," "),e.xp6(4),e.hij(" ",t.name," ")}}function Q(r,n){1&r&&(e.TgZ(0,"tr")(1,"td",46),e._uU(2,"No hay datos que mostrar"),e.qZA()())}const W=function(){return[10,25,50]},X=function(){return["pregunta_nombre","momento"]},S=function(r){return{width:r,"text-aling":"center"}},P=function(){return{"font-weight":"bold"}},ee=function(){return{width:"100%"}},te=[{path:"ver",component:H},{path:"crear",component:R},{path:"editar",component:w},{path:"eliminar",component:J},{path:"gestionar",component:(()=>{class r{constructor(t,i,s,d,u,C){this.eventosService=t,this.messageService=i,this.confirmationService=s,this.fb=d,this.pantallaService=u,this.dataFetchingService=C,this.API_URI=f.N.API_URI,this.searchValue="",this.width="",this.areas=[],this.areasVerificated=[],this.loading=!1,this.activityValues=[0,100],this.itemsBulkDelete=[],this.inforCardDescription="\n  El m\xf3dulo 'Gestionar Areas' centraliza las funciones de creaci\xf3n, visualizaci\xf3n, edici\xf3n y eliminaci\xf3n de las \xe1reas tem\xe1ticas asociadas a las actividades. Proporciona una interfaz completa para administrar y personalizar la clasificaci\xf3n de eventos.\n  ",this.inforCardDescriptionAreasCreate="\n  Sienta las bases para eventos excepcionales al crear \xe1reas con esta funci\xf3n vital. Define espacios tem\xe1ticos clave que enriquecer\xe1n la diversidad de tus actividades. Con la capacidad de crear \xe1reas de manera eficiente, garantizas una planificaci\xf3n estructurada y una experiencia de evento m\xe1s completa.\n  ",this.inforCardDescriptionAreasEdit="\n  Asegura la adaptabilidad de tus eventos al editar \xe1reas existentes. Mant\xe9n la relevancia ajustando \xe1reas tem\xe1ticas para reflejar las din\xe1micas cambiantes de tus actividades. Con esta funci\xf3n esencial, optimizas la organizaci\xf3n de eventos para satisfacer las expectativas en constante evoluci\xf3n de tu audiencia.",this.idEdit="",this.displayFormCreate=!1,this.displayFormEdit=!1,this.formCreate=this.fb.group({name:["",l.kI.required]}),this.formEdit=this.fb.group({name:["",l.kI.required]})}ngOnInit(){this.token=localStorage.getItem("token");const[t]=this.pantallaService.calcularEspacioPantalla();this.subscription$=t.subscribe(i=>this.width=i),this.dataFetchingService.getAreas().subscribe(i=>{this.areas=i.data,i.data.map(s=>this.areasVerificated.push(s.name.toLowerCase().replace(/\s+/g,"")))})}ngOnDestroy(){this.subscription$.unsubscribe()}onSubmit(){if(this.areasVerificated.includes(this.formCreate.value.name.toLowerCase().replace(/\s+/g,"")))return this.messageService.add({severity:"error",summary:"Error",detail:"Esta area ya existe"});try{this.eventosService.post(`${this.API_URI}/eventos/areas/create/`,this.formCreate.value,this.token).subscribe(t=>(this.formCreate.reset(),this.dataFetchingService.getAreas().subscribe(i=>{this.areas=i.data,i.data.map(s=>this.areasVerificated.push(s.name.toLowerCase().replace(/\s+/g,"")))}),this.changeDisplayFormCreate(),this.messageService.add({severity:"success",summary:"Success",detail:"Creado correctamente"})))}catch(t){console.log("Error en consulta",t)}}handleEdit(){let t={name:this.formEdit.value.name};if(this.areasVerificated.includes(this.formEdit.value.name.toLowerCase().replace(/\s+/g,"")))return this.messageService.add({severity:"error",summary:"Error",detail:"Esta area ya existe"});try{this.eventosService.put(`${this.API_URI}/eventos/areas/update/${this.idEdit}/`,t,this.token).subscribe(i=>(this.dataFetchingService.getAreas().subscribe(s=>{this.areas=s.data,s.data.map(d=>this.areasVerificated.push(d.name.toLowerCase().replace(/\s+/g,"")))}),this.formEdit.reset(),this.changeDisplayFormEdit(),this.messageService.add({severity:"success",summary:"Success",detail:"Editado correctamente"})))}catch(i){console.log("Error en consulta",i)}}deleteAll(){const t=this.itemsBulkDelete.map(s=>s.id);if(0===t.length)return this.messageService.add({severity:"error",summary:"Notififaci\xf3n",detail:"Debes seleccionar al menos un registro"});let i={ids:t};try{this.eventosService.delete(`${this.API_URI}/eventos/areas/delete/`,this.token,i).subscribe(s=>(this.dataFetchingService.getAreas().subscribe(d=>{this.areas=d.data,d.data.map(u=>this.areasVerificated.push(u.name.toLowerCase().replace(/\s+/g,"")))}),this.messageService.add({severity:"success",summary:"Success",detail:"Eliminado correctamente !!!"})))}catch(s){console.log(s)}}changeDisplayFormCreate(){this.displayFormCreate=!this.displayFormCreate}closeDisplayFormCreate(){this.displayFormCreate=!1,this.formCreate.reset()}changeDisplayFormEdit(t={}){this.idEdit=t.id,console.log(t),this.formEdit.patchValue(t),this.displayFormEdit=!this.displayFormEdit}closeDisplayFormEdit(t={}){this.displayFormEdit=!1,this.formEdit.reset()}getEventValue(t){return t.target.value}confirm(t,i){console.log(i),this.confirmationService.confirm({target:t.target,message:"\xbfSeguro que desea eliminar esta area?",icon:"pi pi-exclamation-triangle",accept:()=>{try{this.eventosService.delete(`${this.API_URI}/eventos/areas/delete/${i}/`,this.token).subscribe(s=>(this.dataFetchingService.getAreas().subscribe(d=>{this.areas=d.data,d.data.map(u=>this.areasVerificated.push(u.name.toLowerCase().replace(/\s+/g,"")))}),this.messageService.add({severity:"success",summary:"Success",detail:"Eliminado correctamente !!!"})))}catch(s){console.log(s)}},reject:()=>{}})}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(_.S),e.Y36(m.ez),e.Y36(m.YP),e.Y36(l.QS),e.Y36(O.c),e.Y36(G.z))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-gestionar"]],decls:46,vars:47,consts:[["titulo","Gestionar Areas"],["card-body","",1,"grid"],[3,"description"],[1,"col-12"],["pButton","","pRipple","","type","submit","icon","pi pi-plus","label","Crear Nuevo",1,"p-button-success","mr-2",3,"click"],["pButton","","pRipple","","type","submit","label"," Eliminar seleccionados","icon","pi pi-trash",1,"p-button-danger","mr-2",3,"click"],[1,"col-12","md:col-12","lg:col-12"],[1,"flex","flex-column","gap-2"],["dataKey","id","styleClass","p-datatable-customers","responsiveLayout","scroll","currentPageReportTemplate","Mostrando {first} a {last} de {totalRecords} elementos","responsiveLayout","scroll",3,"value","selection","rowHover","rows","showCurrentPageReport","rowsPerPageOptions","loading","paginator","filterDelay","globalFilterFields","selectionChange"],["dt",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["pTemplate","emptymessage"],["header","Creando Area",3,"visible","showHeader","modal","dismissableMask","visibleChange","onHide"],[3,"formGroup"],[1,"grid"],[1,"mb-2"],[1,"p-inputgroup","my-1"],[1,"p-inputgroup-addon"],[1,"pi","pi-bookmark-fill",2,"color","#f16357"],["type","text","placeholder","Escribe aqui..","formControlName","name","pInputText",""],[1,"col-12","flex","justify-content-center","align-items-center"],["pButton","","pRipple","","type","submit","label","Guardar","icon","pi pi-save",1,"p-button-success","mx-5",3,"disabled","click"],["pButton","","pRipple","","type","button","label","Cancelar",1,"p-button-outlined","p-button-danger","mx-5",3,"click"],["header","Actualizando area",3,"visible","showHeader","modal","dismissableMask","visibleChange","onHide"],["pButton","","pRipple","","type","submit","label","Actualizar","icon","pi pi-save",1,"p-button-warning","mx-5",3,"disabled","click"],[1,"table-header"],[1,"col-12","md:col-6","lg:col-6"],[1,"col-12","md:col-6","lg:col-3"],[1,"p-input-icon-left"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Busqueda global",3,"input"],[2,"width","3rem"],[2,"width","5rem"],["pSortableColumn","tipo"],[1,"flex","justify-content-between","align-items-center"],["field","name"],["type","text","field","name","display","menu",1,"ml-auto"],[2,"width","8rem","text-align","center"],[1,"p-selectable-row"],[3,"value"],[1,"p-column-title"],[2,"text-align","center"],["pButton","","type","button","icon","pi pi-pencil",1,"p-button-warning",3,"click"],["pButton","","type","button","icon","pi pi-trash",1,"p-button-danger",3,"click"],["colspan","8"]],template:function(t,i){1&t&&(e.TgZ(0,"app-card",0)(1,"div",1),e._UZ(2,"app-custom-info-card",2),e.TgZ(3,"div",3)(4,"button",4),e.NdJ("click",function(){return i.changeDisplayFormCreate()}),e.qZA(),e.TgZ(5,"button",5),e.NdJ("click",function(){return i.deleteAll()}),e.qZA()(),e.TgZ(6,"div",6)(7,"div",7)(8,"p-card")(9,"p-table",8,9),e.NdJ("selectionChange",function(d){return i.itemsBulkDelete=d}),e.YNc(11,z,8,12,"ng-template",10),e.YNc(12,V,15,0,"ng-template",11),e.YNc(13,L,14,3,"ng-template",12),e.YNc(14,Q,3,0,"ng-template",13),e.qZA()()()()()(),e.TgZ(15,"p-dialog",14),e.NdJ("visibleChange",function(d){return i.displayFormCreate=d})("onHide",function(){return i.closeDisplayFormCreate()}),e._UZ(16,"app-custom-info-card",2),e.TgZ(17,"form",15)(18,"div",16)(19,"div",6)(20,"div",7)(21,"label",17),e._uU(22,"Nombre "),e.qZA(),e.TgZ(23,"div",18)(24,"span",19),e._UZ(25,"i",20),e.qZA(),e._UZ(26,"input",21),e.qZA()()(),e.TgZ(27,"div",22)(28,"button",23),e.NdJ("click",function(){return i.onSubmit()}),e.qZA(),e.TgZ(29,"button",24),e.NdJ("click",function(){return i.closeDisplayFormCreate()}),e.qZA()()()()(),e.TgZ(30,"p-dialog",25),e.NdJ("visibleChange",function(d){return i.displayFormEdit=d})("onHide",function(){return i.closeDisplayFormEdit()}),e._UZ(31,"app-custom-info-card",2),e.TgZ(32,"form",15)(33,"div",16)(34,"div",6)(35,"div",7)(36,"label",17),e._uU(37,"Nombre "),e.qZA(),e.TgZ(38,"div",18)(39,"span",19),e._UZ(40,"i",20),e.qZA(),e._UZ(41,"input",21),e.qZA()()(),e.TgZ(42,"div",22)(43,"button",26),e.NdJ("click",function(){return i.handleEdit()}),e.qZA(),e.TgZ(44,"button",24),e.NdJ("click",function(){return i.closeDisplayFormEdit()}),e.qZA()()()()(),e._UZ(45,"p-toast")),2&t&&(e.xp6(2),e.Q6J("description",i.inforCardDescription),e.xp6(7),e.Q6J("value",i.areas)("selection",i.itemsBulkDelete)("rowHover",!0)("rows",10)("showCurrentPageReport",!0)("rowsPerPageOptions",e.DdM(37,W))("loading",i.loading)("paginator",!0)("filterDelay",0)("globalFilterFields",e.DdM(38,X)),e.xp6(6),e.Akn(e.VKq(39,S,i.width)),e.Q6J("visible",i.displayFormCreate)("showHeader",!0)("modal",!0)("dismissableMask",!1),e.xp6(1),e.Q6J("description",i.inforCardDescriptionAreasCreate),e.xp6(1),e.Q6J("formGroup",i.formCreate),e.xp6(4),e.Akn(e.DdM(41,P)),e.xp6(5),e.Akn(e.DdM(42,E)),e.xp6(2),e.Q6J("disabled",!i.formCreate.valid),e.xp6(2),e.Akn(e.VKq(43,S,i.width)),e.Q6J("visible",i.displayFormEdit)("showHeader",!0)("modal",!0)("dismissableMask",!1),e.xp6(1),e.Q6J("description",i.inforCardDescriptionAreasEdit),e.xp6(1),e.Q6J("formGroup",i.formEdit),e.xp6(4),e.Akn(e.DdM(45,P)),e.xp6(5),e.Akn(e.DdM(46,ee)),e.xp6(2),e.Q6J("disabled",!i.formEdit.valid))},dependencies:[l._Y,l.Fj,l.JJ,l.JL,l.sg,l.u,y.o,b.Hq,A.FN,m.jx,p.iA,p.lQ,p.fz,p.UA,p.Mo,p.xl,I.V,Z.P,U.Z,K.A,Y.t],styles:["[_nghost-%COMP%]     .p-datatable-header{background-color:#f16357;border:1px solid #f16357}"]}),r})()}];let ie=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[c.Bz.forChild(te),c.Bz]}),r})();var re=o(2210),ae=o(4466);let se=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[h.ez,ie,l.u5,l.UX,y.j,b.hJ,A.EV,p.U$,I.S,Z.n,re.kW,U.d,ae.m]}),r})()}}]);