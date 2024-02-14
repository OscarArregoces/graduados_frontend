"use strict";(self.webpackChunkAppTuristica=self.webpackChunkAppTuristica||[]).push([[600],{600:(qe,A,l)=>{l.r(A),l.d(A,{PreguntasModule:()=>Ie});var m=l(6895),x=l(1933),p=l(433),_=l(2340),e=l(8274),f=l(517),u=l(805),b=l(1740),h=l(5593),v=l(2453),Z=l(2210);let J=(()=>{class o{constructor(t,n,i){this.fb=t,this.preguntasService=n,this.messageService=i,this.API_URI=_.N.API_URI,this.momentos=[],this.form=this.fb.group({pregunta_nombre:["",p.kI.required],momento:["",p.kI.required]})}ngOnInit(){this.token=localStorage.getItem("token"),this.traerMomentos()}onSubmit(){let t={pregunta_nombre:this.form.value.pregunta_nombre,momento:this.form.value.momento.id};try{this.preguntasService.post(`${this.API_URI}/poll/questions/create/`,t,this.token).subscribe(n=>(this.form.reset(),this.messageService.add({severity:"success",summary:"Success",detail:"Pregunta creada correctamente"})))}catch(n){return console.log(n),this.messageService.add({severity:"error",summary:"Error",detail:"Error"})}}traerMomentos(){try{this.preguntasService.get(`${this.API_URI}/poll/momentos/`,this.token).subscribe(t=>{this.momentos=t.data})}catch(t){console.log(t)}}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(p.QS),e.Y36(f.e),e.Y36(u.ez))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-crear"]],decls:7,vars:4,consts:[[1,"main","m-auto","p-5",3,"formGroup","ngSubmit"],[1,"m-3","text-center"],["type","text","pInputText","","placeholder","Pregunta","formControlName","pregunta_nombre"],["placeholder","Selecciona un momento","optionLabel","tipo","formControlName","momento",3,"options","showClear"],["pButton","","pRipple","","type","submit","label","Crear pregunta",1,"p-button-success",3,"disabled"]],template:function(t,n){1&t&&(e.TgZ(0,"form",0),e.NdJ("ngSubmit",function(){return n.onSubmit()}),e.TgZ(1,"h1",1),e._uU(2,"Crear preguntas"),e.qZA(),e._UZ(3,"input",2)(4,"p-dropdown",3)(5,"button",4),e.qZA(),e._UZ(6,"p-toast")),2&t&&(e.Q6J("formGroup",n.form),e.xp6(4),e.Q6J("options",n.momentos)("showClear",!1),e.xp6(1),e.Q6J("disabled",!n.form.valid))},dependencies:[p._Y,p.Fj,p.JJ,p.JL,p.sg,p.u,b.o,h.Hq,v.FN,Z.Lt],styles:["form[_ngcontent-%COMP%]{width:600px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:20px;border:1px solid rgb(131,129,129);border-radius:10px}form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], button[_ngcontent-%COMP%]{margin:10px;width:80%}"]}),o})();var d=l(8396),T=l(1493);function D(o,r){1&o&&(e.TgZ(0,"tr")(1,"th",10),e._uU(2,"Indice"),e.qZA(),e.TgZ(3,"th",11),e._uU(4,"ID "),e._UZ(5,"p-sortIcon",12),e.qZA(),e.TgZ(6,"th",13),e._uU(7,"Pregunta "),e._UZ(8,"p-sortIcon",14),e.qZA(),e.TgZ(9,"th",15),e._uU(10,"Momento "),e._UZ(11,"p-sortIcon",16),e.qZA(),e.TgZ(12,"th",10),e._uU(13,"Editar"),e.qZA()())}function E(o,r){if(1&o){const t=e.EpF();e.TgZ(0,"tr")(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e._uU(8),e.qZA(),e.TgZ(9,"td")(10,"button",17),e.NdJ("click",function(){const s=e.CHM(t).$implicit,a=e.oxw();return e.KtG(a.showEditar(s.id))}),e.qZA()()()}if(2&o){const t=r.$implicit,n=r.rowIndex;e.xp6(2),e.Oqu(n),e.xp6(2),e.Oqu(t.id),e.xp6(2),e.Oqu(t.pregunta_nombre),e.xp6(2),e.Oqu(t.momento)}}const N=function(){return{"min-width":"60rem"}},F=function(){return{width:"40vw",height:"40vh"}};let G=(()=>{class o{constructor(t,n,i){this.preguntaService=t,this.fb=n,this.messageService=i,this.API_URI=_.N.API_URI,this.preguntas=[],this.momentos=[],this.idPregunta="",this.display=!1,this.form=this.fb.group({pregunta_nombre:["",p.kI.required],momento:["",p.kI.required]})}ngOnInit(){this.token=localStorage.getItem("token"),this.traerPreguntas(),this.traerMomentos()}traerPreguntas(){this.preguntas=[];try{this.preguntaService.get(`${this.API_URI}/poll/questions/`,this.token).subscribe(t=>{this.preguntas=t.data})}catch(t){console.log(t)}}traerMomentos(){this.momentos=[];try{this.preguntaService.get(`${this.API_URI}/poll/momentos/`,this.token).subscribe(t=>{this.momentos=t.data})}catch(t){console.log(t)}}submit(){let t={pregunta_nombre:this.form.value.pregunta_nombre,momento:this.form.value.momento.id};try{this.preguntaService.put(`${this.API_URI}/poll/questions/update/${this.idPregunta}/`,t,this.token).subscribe(n=>(this.form.reset(),this.traerPreguntas(),this.traerMomentos(),this.showEditar(this.idPregunta),this.messageService.add({severity:"success",summary:"Success",detail:"Pregunta editada correctamente"})))}catch(n){return this.messageService.add({severity:"error",summary:"Error",detail:`Error : ${n}`})}}showEditar(t){this.idPregunta=t,this.display=!this.display}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(f.e),e.Y36(p.QS),e.Y36(u.ez))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-editar"]],decls:13,vars:17,consts:[[1,"main"],[3,"value","tableStyle"],["pTemplate","header"],["pTemplate","body"],["header","Editar momento","maximizeIcon","pi pi-window-maximize","minimizeIcon","pi pi-window-minimize",3,"visible","modal","maximizable","draggable","resizable","dismissableMask","showHeader","visibleChange"],[1,"grid","dialog-form-crear","col-12","md:col-12","lg:col-12"],[3,"formGroup","submit"],["type","text","pInputText","","placeholder","Pregunta","formControlName","pregunta_nombre",1,"my-3"],["placeholder","Selecciona un momento","formControlName","momento","optionLabel","tipo",1,"my-3",3,"options","editable"],["pButton","","pRipple","","type","submit","label","Editar",1,"p-button-warning",3,"disabled"],[2,"width","20%"],["pSortableColumn","id",2,"width","20%"],["field","id"],["pSortableColumn","pregunta_nombre",2,"width","20%"],["field","pregunta_nombre"],["pSortableColumn","momento",2,"width","20%"],["field","momento"],["pButton","","pRipple","","type","button","icon","pi pi-pencil",1,"p-button-rounded","p-button-warning","mx-3",3,"click"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0)(1,"h1"),e._uU(2,"Editar preguntas"),e.qZA(),e.TgZ(3,"p-table",1),e.YNc(4,D,14,0,"ng-template",2),e.YNc(5,E,11,4,"ng-template",3),e.qZA()(),e.TgZ(6,"p-dialog",4),e.NdJ("visibleChange",function(s){return n.display=s}),e.TgZ(7,"div",5)(8,"form",6),e.NdJ("submit",function(){return n.submit()}),e._UZ(9,"input",7)(10,"p-dropdown",8)(11,"button",9),e.qZA()()(),e._UZ(12,"p-toast")),2&t&&(e.xp6(3),e.Q6J("value",n.preguntas)("tableStyle",e.DdM(15,N)),e.xp6(3),e.Akn(e.DdM(16,F)),e.Q6J("visible",n.display)("modal",!0)("maximizable",!0)("draggable",!1)("resizable",!1)("dismissableMask",!0)("showHeader",!1),e.xp6(2),e.Q6J("formGroup",n.form),e.xp6(2),e.Q6J("options",n.momentos)("editable",!0),e.xp6(1),e.Q6J("disabled",!n.form.valid))},dependencies:[p._Y,p.Fj,p.JJ,p.JL,p.sg,p.u,b.o,h.Hq,v.FN,u.jx,d.iA,d.lQ,d.fz,T.V,Z.Lt],styles:[".main[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-direction:column}form[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:center;align-items:center;flex-direction:column;padding:20px}form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], button[_ngcontent-%COMP%]{width:80%}"]}),o})();var y=l(369);function O(o,r){1&o&&(e.TgZ(0,"tr")(1,"th",4),e._uU(2,"Indice"),e.qZA(),e.TgZ(3,"th",5),e._uU(4,"ID "),e._UZ(5,"p-sortIcon",6),e.qZA(),e.TgZ(6,"th",7),e._uU(7,"Pregunta "),e._UZ(8,"p-sortIcon",8),e.qZA(),e.TgZ(9,"th",9),e._uU(10,"Momento "),e._UZ(11,"p-sortIcon",10),e.qZA(),e.TgZ(12,"th",11),e._uU(13,"Eliminar"),e.qZA()())}function Q(o,r){if(1&o){const t=e.EpF();e.TgZ(0,"tr")(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e._uU(8),e.qZA(),e.TgZ(9,"td"),e._UZ(10,"p-confirmPopup"),e.TgZ(11,"button",12),e.NdJ("click",function(i){const a=e.CHM(t).$implicit,g=e.oxw();return e.KtG(g.confirm(i,a.id))}),e.qZA()()()}if(2&o){const t=r.$implicit,n=r.rowIndex;e.xp6(2),e.Oqu(n),e.xp6(2),e.Oqu(t.id),e.xp6(2),e.Oqu(t.pregunta_nombre),e.xp6(2),e.Oqu(t.momento)}}const R=function(){return{"min-width":"60rem"}};let Y=(()=>{class o{constructor(t,n,i){this.preguntasService=t,this.messageService=n,this.confirmationService=i,this.API_URI=_.N.API_URI,this.preguntas=[]}ngOnInit(){this.token=localStorage.getItem("token"),this.traerPreguntas()}traerPreguntas(){this.preguntas=[];try{this.preguntasService.get(`${this.API_URI}/poll/questions/`,this.token).subscribe(t=>this.preguntas=t.data)}catch(t){console.log(t)}}confirm(t,n){this.confirmationService.confirm({target:t.target,message:"\xbfSeguro que desea eliminar la pregunta?",icon:"pi pi-exclamation-triangle",accept:()=>{try{this.preguntasService.delete(`${this.API_URI}/poll/questions/delete/${n}/`,this.token).subscribe(i=>(this.preguntas=i.data,this.traerPreguntas(),this.messageService.add({severity:"success",summary:"Success",detail:"Pregunta eliminada correctamente !!!"})))}catch(i){console.log(i)}},reject:()=>{}})}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(f.e),e.Y36(u.ez),e.Y36(u.YP))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-eliminar"]],decls:8,vars:3,consts:[[1,"main"],[3,"value","tableStyle"],["pTemplate","header"],["pTemplate","body"],[2,"width","10%"],["pSortableColumn","id",2,"width","10%"],["field","id"],["pSortableColumn","pregunta_nombre",2,"width","20%"],["field","pregunta_nombre"],["pSortableColumn","momento",2,"width","20%"],["field","momento"],[2,"width","20%"],["pButton","","pRipple","","type","button","icon","pi pi-times",1,"p-button-rounded","p-button-danger","mx-3",3,"click"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0)(1,"h1"),e._uU(2,"Eliminar preguntas"),e.qZA(),e.TgZ(3,"p-table",1),e.YNc(4,O,14,0,"ng-template",2),e.YNc(5,Q,12,4,"ng-template",3),e.qZA()(),e._UZ(6,"p-toast")(7,"p-confirmPopup")),2&t&&(e.xp6(3),e.Q6J("value",n.preguntas)("tableStyle",e.DdM(2,R)))},dependencies:[h.Hq,v.FN,u.jx,d.iA,d.lQ,d.fz,y.P],styles:[".main[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-direction:column}"]}),o})();function V(o,r){1&o&&(e.TgZ(0,"tr")(1,"th",4),e._uU(2,"Indice"),e.qZA(),e.TgZ(3,"th",5),e._uU(4,"ID "),e._UZ(5,"p-sortIcon",6),e.qZA(),e.TgZ(6,"th",7),e._uU(7,"Pregunta "),e._UZ(8,"p-sortIcon",8),e.qZA(),e.TgZ(9,"th",9),e._uU(10,"Momento "),e._UZ(11,"p-sortIcon",10),e.qZA()())}function $(o,r){if(1&o&&(e.TgZ(0,"tr")(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e._uU(8),e.qZA()()),2&o){const t=r.$implicit,n=r.rowIndex;e.xp6(2),e.Oqu(n),e.xp6(2),e.Oqu(t.id),e.xp6(2),e.Oqu(t.pregunta_nombre),e.xp6(2),e.Oqu(t.momento)}}const B=function(){return{"min-width":"60rem"}};let z=(()=>{class o{constructor(t){this.preguntaService=t,this.API_URI=_.N.API_URI,this.preguntas=[]}ngOnInit(){this.token=localStorage.getItem("token"),this.traerPreguntas()}traerPreguntas(){try{this.preguntaService.get(`${this.API_URI}/poll/questions/`,this.token).subscribe(t=>{this.preguntas=t.data})}catch(t){console.log(t)}}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(f.e))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-ver"]],decls:6,vars:3,consts:[[1,"main"],[3,"value","tableStyle"],["pTemplate","header"],["pTemplate","body"],[2,"width","20%"],["pSortableColumn","id",2,"width","20%"],["field","id"],["pSortableColumn","pregunta_nombre",2,"width","20%"],["field","pregunta_nombre"],["pSortableColumn","momento",2,"width","20%"],["field","momento"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0)(1,"h1"),e._uU(2,"Ver preguntas"),e.qZA(),e.TgZ(3,"p-table",1),e.YNc(4,V,12,0,"ng-template",2),e.YNc(5,$,9,4,"ng-template",3),e.qZA()()),2&t&&(e.xp6(3),e.Q6J("value",n.preguntas)("tableStyle",e.DdM(2,B)))},dependencies:[u.jx,d.iA,d.lQ,d.fz],styles:[".main[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-direction:column}"]}),o})();var H=l(9050),j=l(1967),M=l(4247),w=l(613),I=l(1989),q=l(3054);const L=function(o,r,t){return{"p-inputswitch p-component":!0,"p-inputswitch-checked":o,"p-disabled":r,"p-focus":t}},K={provide:p.JU,useExisting:(0,e.Gpc)(()=>S),multi:!0};let S=(()=>{class o{constructor(t){this.cd=t,this.trueValue=!0,this.falseValue=!1,this.onChange=new e.vpe,this.modelValue=!1,this.focused=!1,this.onModelChange=()=>{},this.onModelTouched=()=>{}}onClick(t,n){!this.disabled&&!this.readonly&&(t.preventDefault(),this.toggle(t),n.focus())}onInputChange(t){this.readonly||this.updateModel(t,t.target.checked)}toggle(t){this.updateModel(t,!this.checked())}updateModel(t,n){this.modelValue=n?this.trueValue:this.falseValue,this.onModelChange(this.modelValue),this.onChange.emit({originalEvent:t,checked:this.modelValue})}onFocus(t){this.focused=!0}onBlur(t){this.focused=!1,this.onModelTouched()}writeValue(t){this.modelValue=t,this.cd.markForCheck()}registerOnChange(t){this.onModelChange=t}registerOnTouched(t){this.onModelTouched=t}setDisabledState(t){this.disabled=t,this.cd.markForCheck()}checked(){return this.modelValue===this.trueValue}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(e.sBO))},o.\u0275cmp=e.Xpm({type:o,selectors:[["p-inputSwitch"]],hostAttrs:[1,"p-element"],inputs:{style:"style",styleClass:"styleClass",tabindex:"tabindex",inputId:"inputId",name:"name",disabled:"disabled",readonly:"readonly",trueValue:"trueValue",falseValue:"falseValue",ariaLabelledBy:"ariaLabelledBy"},outputs:{onChange:"onChange"},features:[e._Bn([K])],decls:5,vars:15,consts:[[3,"ngClass","ngStyle","click"],[1,"p-hidden-accessible"],["type","checkbox","role","switch",3,"checked","disabled","change","focus","blur"],["cb",""],[1,"p-inputswitch-slider"]],template:function(t,n){if(1&t){const i=e.EpF();e.TgZ(0,"div",0),e.NdJ("click",function(a){e.CHM(i);const g=e.MAs(3);return e.KtG(n.onClick(a,g))}),e.TgZ(1,"div",1)(2,"input",2,3),e.NdJ("change",function(a){return n.onInputChange(a)})("focus",function(a){return n.onFocus(a)})("blur",function(a){return n.onBlur(a)}),e.qZA()(),e._UZ(4,"span",4),e.qZA()}2&t&&(e.Tol(n.styleClass),e.Q6J("ngClass",e.kEZ(11,L,n.checked(),n.disabled,n.focused))("ngStyle",n.style),e.xp6(2),e.Q6J("checked",n.checked())("disabled",n.disabled),e.uIk("id",n.inputId)("name",n.name)("tabindex",n.tabindex)("aria-checked",n.checked())("aria-labelledby",n.ariaLabelledBy))},dependencies:[m.mk,m.PC],styles:['.p-inputswitch{position:relative;display:inline-block;-webkit-user-select:none;user-select:none}.p-inputswitch-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0}.p-inputswitch-slider:before{position:absolute;content:"";top:50%}\n'],encapsulation:2,changeDetection:0}),o})(),X=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[m.ez]]}),o})();var W=l(9219),ee=l(6474);const te=function(){return{display:"flex","justify-content":"space-between"}},ne=function(){return{"font-size":"20px"}},c=function(){return{width:"100%"}};function oe(o,r){if(1&o){const t=e.EpF();e.TgZ(0,"div",42)(1,"div",16)(2,"div",43),e._uU(3," Lista de preguntas "),e.qZA(),e.TgZ(4,"div",44)(5,"span",45),e._UZ(6,"i",46),e.TgZ(7,"input",47),e.NdJ("input",function(i){e.CHM(t);const s=e.oxw(),a=e.MAs(10);return e.KtG(a.filterGlobal(s.getEventValue(i),"contains"))}),e.qZA()()()()()}2&o&&(e.xp6(1),e.Akn(e.DdM(8,te)),e.xp6(1),e.Akn(e.DdM(9,ne)),e.xp6(3),e.Akn(e.DdM(10,c)),e.xp6(2),e.Akn(e.DdM(11,c)))}function ie(o,r){1&o&&(e.TgZ(0,"tr")(1,"th",48),e._UZ(2,"p-tableHeaderCheckbox"),e.qZA(),e.TgZ(3,"th",49)(4,"p"),e._uU(5,"Indice"),e.qZA()(),e.TgZ(6,"th",50)(7,"div",51),e._uU(8," Pregunta "),e._UZ(9,"p-sortIcon",52)(10,"p-columnFilter",53),e.qZA()(),e.TgZ(11,"th",54)(12,"div",51),e._uU(13," Tipo "),e._UZ(14,"p-sortIcon",55)(15,"p-columnFilter",56),e.qZA()(),e.TgZ(16,"th",57),e._uU(17," Editar "),e.qZA(),e.TgZ(18,"th",57),e._uU(19," Eliminar "),e.qZA()())}function re(o,r){if(1&o){const t=e.EpF();e.TgZ(0,"tr",58)(1,"td"),e._UZ(2,"p-tableCheckbox",59),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td")(6,"span",60),e._uU(7,"Tipo"),e.qZA(),e._uU(8),e.qZA(),e.TgZ(9,"td")(10,"span",60),e._uU(11,"Tipo"),e.qZA(),e._uU(12),e.qZA(),e.TgZ(13,"td",61)(14,"button",62),e.NdJ("click",function(){const s=e.CHM(t).$implicit,a=e.oxw();return e.KtG(a.changeDisplayFormEdit(s))}),e.qZA()(),e.TgZ(15,"td",61),e._UZ(16,"p-confirmPopup"),e.TgZ(17,"button",63),e.NdJ("click",function(i){const a=e.CHM(t).$implicit,g=e.oxw();return e.KtG(g.confirm(i,a.id))}),e.qZA()()()}if(2&o){const t=r.$implicit,n=r.rowIndex;e.xp6(2),e.Q6J("value",t),e.xp6(2),e.hij(" ",n+1," "),e.xp6(4),e.hij(" ",t.pregunta_nombre," "),e.xp6(4),e.hij(" ",t.tipo_pregunta," ")}}function se(o,r){1&o&&(e.TgZ(0,"tr")(1,"td",64),e._uU(2,"No hay datos que mostrar"),e.qZA()())}function ae(o,r){1&o&&(e.TgZ(0,"div"),e._UZ(1,"input",65),e.qZA()),2&o&&(e.xp6(1),e.Akn(e.DdM(3,c)),e.Q6J("disabled",!0))}function le(o,r){1&o&&(e.TgZ(0,"div"),e._UZ(1,"textarea",66),e.qZA()),2&o&&(e.xp6(1),e.Akn(e.DdM(3,c)),e.Q6J("disabled",!0))}function pe(o,r){if(1&o){const t=e.EpF();e.TgZ(0,"p-button",74),e.NdJ("onClick",function(){e.CHM(t);const i=e.oxw(3);return e.KtG(i.addOptionCheck())}),e.qZA()}}function de(o,r){if(1&o){const t=e.EpF();e.TgZ(0,"div",16)(1,"div",68)(2,"div",69),e._UZ(3,"p-checkbox",70),e.TgZ(4,"input",71),e.NdJ("ngModelChange",function(i){const a=e.CHM(t).$implicit;return e.KtG(a.answer=i)}),e.qZA()()(),e.TgZ(5,"div",72),e.YNc(6,pe,1,0,"p-button",73),e.qZA()()}if(2&o){const t=r.$implicit,n=r.index;e.xp6(3),e.Q6J("value",t.answer),e.xp6(1),e.Akn(e.DdM(6,c)),e.MGl("placeholder","Respuesta ",t.id+1,""),e.Q6J("ngModel",t.answer),e.xp6(2),e.Q6J("ngIf",0===n)}}function ce(o,r){if(1&o&&(e.TgZ(0,"div"),e.YNc(1,de,7,7,"div",67),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.Q6J("ngForOf",t.form.options)}}function ue(o,r){if(1&o){const t=e.EpF();e.TgZ(0,"p-button",74),e.NdJ("onClick",function(){e.CHM(t);const i=e.oxw(3);return e.KtG(i.addOptionRadio())}),e.qZA()}}function me(o,r){if(1&o){const t=e.EpF();e.TgZ(0,"div",16)(1,"div",68)(2,"div",69)(3,"p-radioButton",75),e.NdJ("ngModelChange",function(i){const a=e.CHM(t).$implicit;return e.KtG(a.value=i)}),e.qZA(),e.TgZ(4,"input",71),e.NdJ("ngModelChange",function(i){const a=e.CHM(t).$implicit;return e.KtG(a.answer=i)}),e.qZA()()(),e.TgZ(5,"div",72),e.YNc(6,ue,1,0,"p-button",73),e.qZA()()}if(2&o){const t=r.$implicit,n=r.index;e.xp6(3),e.Q6J("value",t.answer)("ngModel",t.value),e.xp6(1),e.Akn(e.DdM(7,c)),e.MGl("placeholder","Respuesta ",t.id+1,""),e.Q6J("ngModel",t.answer),e.xp6(2),e.Q6J("ngIf",0===n)}}function ge(o,r){if(1&o&&(e.TgZ(0,"div"),e.YNc(1,me,7,8,"div",67),e.qZA()),2&o){const t=e.oxw();e.xp6(1),e.Q6J("ngForOf",t.form.options)}}function he(o,r){1&o&&(e.TgZ(0,"p",76),e._uU(1,"Selecciona un tipo de pregunta."),e.qZA())}function _e(o,r){if(1&o){const t=e.EpF();e.TgZ(0,"div",80)(1,"p-radioButton",81),e.NdJ("ngModelChange",function(i){e.CHM(t);const s=e.oxw(3);return e.KtG(s.form.dependID=i)}),e.qZA(),e.TgZ(2,"label"),e._uU(3),e.qZA()()}if(2&o){const t=r.$implicit,n=e.oxw(3);e.xp6(1),e.Q6J("value",t.id)("ngModel",n.form.dependID),e.xp6(2),e.Oqu(t.respuesta)}}function fe(o,r){if(1&o&&(e.TgZ(0,"div"),e.YNc(1,_e,4,3,"div",79),e.qZA()),2&o){const t=e.oxw(2);e.xp6(1),e.Q6J("ngForOf",t.form.depend.answer_set)}}function ve(o,r){if(1&o){const t=e.EpF();e.TgZ(0,"div",3)(1,"p-dropdown",77),e.NdJ("ngModelChange",function(i){e.CHM(t);const s=e.oxw();return e.KtG(s.form.depend=i)}),e.qZA(),e.YNc(2,fe,2,1,"div",78),e.qZA()}if(2&o){const t=e.oxw();e.xp6(1),e.Akn(e.DdM(5,c)),e.Q6J("options",t.preguntasVerificated)("ngModel",t.form.depend),e.xp6(1),e.Q6J("ngIf",t.form.depend)}}const Ce=function(){return[10,25,50]},be=function(){return["pregunta_nombre","tipo_pregunta"]},Ze=function(o){return{width:o,height:"70vh","text-aling":"center"}},Te=function(){return{"max-height":"150px","max-width":"150px"}},ye=function(){return{color:"#f16357"}},C=function(){return{"font-weight":"bold"}},U=function(){return{width:"100%"}},Ae=function(o){return{width:o,"min-height":"70vh"}},xe=[{path:"ver",component:z},{path:"crear",component:J},{path:"eliminar",component:Y},{path:"editar",component:G},{path:"gestionar",component:(()=>{class o{constructor(t,n,i,s,a){this.encuestasService=t,this.messageService=n,this.confirmationService=i,this.fb=s,this.pantallaService=a,this.typeQuestion=[{id:1,title:"Unica respuesta",value:"unica respuesta"},{id:2,title:"Multiple respuesta",value:"multiple"},{id:3,title:"Respuesta corta",value:"respuesta corta"},{id:4,title:"Respuesta larga",value:"respuesta larga"}],this.count=1,this.countDepend=1,this.optionSelected="",this.optionSelectedDepend="",this.displayDialog=!1,this.depend=!1,this.form={question:"",depend:null,type:null,options:[{id:0,value:"",answer:""}],momento:null,dependID:null},this.formEdit={pregunta_nombre:"",tipo_pregunta:null,momento:null},this.searchValue="",this.API_URI=_.N.API_URI,this.itemsBulkDelete=[],this.preguntas=[],this.preguntasVerificated=[],this.momentos=[],this.loading=!1,this.activityValues=[0,100],this.width="",this.idEdit="",this.displayFormCreate=!1,this.displayFormEdit=!1,this.inforCardDescription="\n  Nuestro m\xf3dulo de Preguntas en el sistema de Encuestas proporciona una interfaz intuitiva para la creaci\xf3n, edici\xf3n y gesti\xf3n de las preguntas que los egresados y graduados responder\xe1n. Desde preguntas personalizadas hasta opciones m\xfaltiples, este m\xf3dulo permite dise\xf1ar cuestionarios espec\xedficos que capturan de manera precisa las experiencias y opiniones de los usuarios. Facilita la recopilaci\xf3n de datos significativos para evaluar aspectos clave del proceso educativo y el desarrollo personal de los graduados.\n  ",this.inforCardDescriptionFormCreate="\n  Simplifica la creaci\xf3n de preguntas para tus encuestas. Define preguntas clave con rapidez, elige el tipo adecuado y personaliza opciones seg\xfan necesites. Esta funci\xf3n centralizada asegura una gesti\xf3n \xe1gil y eficiente del contenido dentro del m\xf3dulo de encuestas. Facilita la adaptaci\xf3n a las necesidades cambiantes y garantiza una experiencia de usuario enfocada en tus encuestas.\n  ",this.variantColor=H.$.Blue}ngOnInit(){this.token=localStorage.getItem("token"),this.traerMomentos(),this.traerPreguntas();const[t]=this.pantallaService.calcularEspacioPantalla();this.subscription$=t.subscribe(n=>this.width=n)}ngOnDestroy(){this.subscription$.unsubscribe()}traerMomentos(){this.momentos=[];try{this.encuestasService.get(`${this.API_URI}/poll/momentos/`,this.token).subscribe(t=>{this.momentos=t.data})}catch(t){console.log("Error en consulta",t)}}traerPreguntas(){this.preguntas=[],this.preguntasVerificated=[];try{this.encuestasService.get(`${this.API_URI}/poll/questions/`,this.token).subscribe(t=>{this.preguntas=t.data,t.data.map(n=>{"unica respuesta"===n.tipo_pregunta&&this.preguntasVerificated.push(n)})})}catch(t){console.log("Error en consulta",t)}}onSubmit(){const{question:t,type:i,options:s,momento:a,dependID:g}=this.form;let k={question:t,depend:g,type:i.id,options:s,momento:a.id};console.log(k);try{this.encuestasService.post(`${this.API_URI}/poll/questions/create/`,k,this.token).subscribe(P=>(this.formReset(),this.traerPreguntas(),this.changeDisplayFormCreate(),this.messageService.add({severity:"success",summary:"Success",detail:"Creado correctamente"})))}catch(P){console.log("Error en consulta",P)}}formReset(){this.form={question:"",depend:null,type:null,options:[{id:0,value:"",answer:""}],momento:null,dependID:null},this.optionSelected=""}handleEdit(){const{pregunta_nombre:t,momento:i}=this.formEdit;let s={pregunta_nombre:t,momento:i.id};try{this.encuestasService.put(`${this.API_URI}/poll/questions/update/${this.idEdit}/`,s,this.token).subscribe(a=>(this.traerPreguntas(),this.changeDisplayFormEdit(),this.messageService.add({severity:"success",summary:"Success",detail:"Editado correctamente"})))}catch(a){console.log("Error en consulta",a)}}deleteAll(){const t=this.itemsBulkDelete.map(i=>i.id);if(0===t.length)return this.messageService.add({severity:"error",summary:"Notififaci\xf3n",detail:"Debes seleccionar al menos un registro"});let n={ids:t};try{this.encuestasService.delete(`${this.API_URI}/poll/questions/delete/`,this.token,n).subscribe(i=>(this.traerPreguntas(),this.itemsBulkDelete=[],this.messageService.add({severity:"success",summary:"Success",detail:"Eliminado correctamente !!!"})))}catch(i){console.log(i)}}changeDisplayFormCreate(){this.displayFormCreate=!this.displayFormCreate}handleCloseFormCreate(){this.displayFormCreate=!1,this.formReset()}changeDisplayFormEdit(t={}){this.idEdit=t.id,this.formEdit=t,console.log(t),this.displayFormEdit=!this.displayFormEdit}getEventValue(t){return t.target.value}confirm(t,n){console.log(n),this.confirmationService.confirm({target:t.target,message:"\xbfSeguro que desea eliminar esta pregunta?",icon:"pi pi-exclamation-triangle",accept:()=>{try{this.encuestasService.delete(`${this.API_URI}/poll/questions/delete/${n}/`,this.token).subscribe(i=>(this.traerPreguntas(),this.messageService.add({severity:"success",summary:"Success",detail:"Eliminado correctamente !!!"})))}catch(i){console.log(i)}},reject:()=>{}})}enviar(){console.log(this.form)}addOptionCheck(){this.form.options.push({id:this.count,value:"",answer:""}),this.count++}addOptionRadio(){this.form.options.push({id:this.count,value:"",answer:""}),this.count++}removeOption(t){let n=this.form.options.filter(i=>i.id!==t);this.form.options=n,0==this.form.options.length&&(this.count=0,this.countDepend=0)}addQuestionDepend(){this.countDepend++}setDependShow(t){}onChangeType(t){this.form={question:"",depend:null,type:t.value,options:[{id:0,value:"",answer:""}],momento:null,dependID:null},this.count=1,this.optionSelected=t.value.value,console.log(t.value.value)}onChangeDependsType(t){this.optionSelectedDepend=t.value}addOptionCheckDepends(t,n){this.countDepend++}addOptionRadioDepends(){}setDepend(){this.displayDialog=!this.displayDialog}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(f.e),e.Y36(u.ez),e.Y36(u.YP),e.Y36(p.QS),e.Y36(j.c))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-gestionar"]],decls:99,vars:85,consts:[["titulo","Gestionar preguntas"],["card-body","",1,"grid"],[3,"description"],[1,"col-12"],["pButton","","pRipple","","type","submit","icon","pi pi-plus","label","Crear Nuevo",1,"p-button-success","mr-2",3,"click"],["pButton","","pRipple","","type","submit","label"," Eliminar seleccionados","icon","pi pi-trash",1,"p-button-danger","mr-2",3,"click"],[1,"col-12","md:col-12","lg:col-12"],[1,"flex","flex-column","gap-2"],["dataKey","id","styleClass","p-datatable-customers","responsiveLayout","scroll","currentPageReportTemplate","Mostrando {first} a {last} de {totalRecords} elementos","responsiveLayout","scroll",3,"value","selection","rowHover","rows","showCurrentPageReport","rowsPerPageOptions","loading","paginator","filterDelay","globalFilterFields","selectionChange"],["dt",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["pTemplate","emptymessage"],[3,"visible","showHeader","modal","dismissableMask","visibleChange"],["alt","Card","src","assets/images/header.png"],[1,"grid"],[1,"col-12","md:col-4","lg:col-4","flex","justify-content-center","align-items-center"],["alt","Card","src","assets/images/logo.png"],[1,"col-12","md:col-8","lg:col-8","text-center"],[1,"col-8"],[1,"mb-2"],[1,"p-inputgroup","my-1"],[1,"p-inputgroup-addon"],[1,"pi","pi-bookmark-fill",2,"color","#f16357"],["type","text","placeholder","Escriba el nombre de la pregunta","pInputText","","name","question",3,"ngModel","ngModelChange"],[1,"col-4"],["placeholder","Selecciona una opcion","optionLabel","tipo",3,"options","ngModel","ngModelChange"],[1,"col-12","flex","justify-content-center"],["pButton","","pRipple","","label","Guardar",1,"p-button-success",3,"click"],["header","Creando Pregunta",3,"visible","showHeader","modal","dismissableMask","visibleChange","onHide"],[3,"description","variant"],[1,"grid","p-5","shadow-3",2,"background-color","#f5f5f58e"],[1,"customText"],[1,"col-12","md:col-4","lg:col-4"],["placeholder","Seleccione una opcion","optionLabel","title","name","type",3,"options","ngModel","onChange","ngModelChange"],[1,"col-8",3,"ngSwitch"],[4,"ngSwitchCase"],["class","text-center m-2",4,"ngSwitchDefault"],[1,"col-12","flex","justify-content-start"],[1,"mx-2",3,"ngModel","ngModelChange"],["class","col-12",4,"ngIf"],[1,"table-header"],[1,"col-12","md:col-6","lg:col-6"],[1,"col-12","md:col-6","lg:col-3"],[1,"p-input-icon-left"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Busqueda global",3,"input"],[2,"width","3rem"],[2,"width","5rem"],["pSortableColumn","pregunta_nombre"],[1,"flex","justify-content-between","align-items-center"],["field","pregunta_nombre"],["type","text","field","pregunta_nombre","display","menu",1,"ml-auto"],["pSortableColumn","momento.tipo"],["field","momento.tipo"],["type","text","field","momento.tipo","display","menu",1,"ml-auto"],[2,"width","8rem","text-align","center"],[1,"p-selectable-row"],[3,"value"],[1,"p-column-title"],[2,"text-align","center"],["pButton","","type","button","icon","pi pi-pencil",1,"p-button-warning",3,"click"],["pButton","","type","button","icon","pi pi-trash",1,"p-button-danger",3,"click"],["colspan","8"],["type","text","placeholder","Respuesta","pInputText","","name","answer",3,"disabled"],["rows","5","cols","100","placeholder","Respuesta","pInputTextarea","","name","answer",3,"disabled"],["class","grid",4,"ngFor","ngForOf"],[1,"col-10"],[1,"mb-2","flex","align-items-center","gap-1"],["name","option",3,"value"],["type","text","pInputText","","name","question",1,"mx-2",3,"placeholder","ngModel","ngModelChange"],[1,"col-2"],["icon","pi pi-plus",3,"onClick",4,"ngIf"],["icon","pi pi-plus",3,"onClick"],["name","optionradio",3,"value","ngModel","ngModelChange"],[1,"text-center","m-2"],["placeholder","Seleccione la pregunta","optionLabel","pregunta_nombre",3,"options","ngModel","ngModelChange"],[4,"ngIf"],["class","mt-2",4,"ngFor","ngForOf"],[1,"mt-2"],["name","optionradio",1,"mx-2",3,"value","ngModel","ngModelChange"]],template:function(t,n){1&t&&(e.TgZ(0,"app-card",0)(1,"div",1),e._UZ(2,"app-custom-info-card",2),e.TgZ(3,"div",3)(4,"button",4),e.NdJ("click",function(){return n.changeDisplayFormCreate()}),e.qZA(),e.TgZ(5,"button",5),e.NdJ("click",function(){return n.deleteAll()}),e.qZA()(),e.TgZ(6,"div",6)(7,"div",7)(8,"p-card")(9,"p-table",8,9),e.NdJ("selectionChange",function(s){return n.itemsBulkDelete=s}),e.YNc(11,oe,8,12,"ng-template",10),e.YNc(12,ie,20,0,"ng-template",11),e.YNc(13,re,18,4,"ng-template",12),e.YNc(14,se,3,0,"ng-template",13),e.qZA()()()()()(),e.TgZ(15,"p-dialog",14),e.NdJ("visibleChange",function(s){return n.displayFormEdit=s}),e._UZ(16,"img",15),e.TgZ(17,"div",16)(18,"div",17),e._UZ(19,"img",18),e.qZA(),e.TgZ(20,"div",19)(21,"h1"),e._uU(22," Crear preguntas"),e.qZA()()(),e.TgZ(23,"div",16)(24,"div",20)(25,"div",7)(26,"label",21),e._uU(27,"Pregunta "),e.qZA(),e.TgZ(28,"div",22)(29,"span",23),e._UZ(30,"i",24),e.qZA(),e.TgZ(31,"input",25),e.NdJ("ngModelChange",function(s){return n.formEdit.pregunta_nombre=s}),e.qZA()()()(),e.TgZ(32,"div",26)(33,"div",7)(34,"label",21),e._uU(35,"Momento "),e.qZA(),e.TgZ(36,"div",22)(37,"span",23),e._UZ(38,"i",24),e.qZA(),e.TgZ(39,"p-dropdown",27),e.NdJ("ngModelChange",function(s){return n.formEdit.momento=s}),e.qZA()()()(),e.TgZ(40,"div",28)(41,"button",29),e.NdJ("click",function(){return n.handleEdit()}),e.qZA()()()(),e.TgZ(42,"p-dialog",30),e.NdJ("visibleChange",function(s){return n.displayFormCreate=s})("onHide",function(){return n.handleCloseFormCreate()}),e._UZ(43,"app-custom-info-card",31),e.TgZ(44,"div",16)(45,"div",3)(46,"div",32)(47,"div",3)(48,"span",33),e._uU(49,"Administrar pregunta"),e.qZA()(),e.TgZ(50,"div",34)(51,"div",7)(52,"label",21),e._uU(53,"Pregunta "),e.qZA(),e.TgZ(54,"div",22)(55,"span",23),e._UZ(56,"i",24),e.qZA(),e.TgZ(57,"input",25),e.NdJ("ngModelChange",function(s){return n.form.question=s}),e.qZA()()()(),e.TgZ(58,"div",34)(59,"div",7)(60,"label",21),e._uU(61,"Tipo de pregunta "),e.qZA(),e.TgZ(62,"div",22)(63,"span",23),e._UZ(64,"i",24),e.qZA(),e.TgZ(65,"p-dropdown",35),e.NdJ("onChange",function(s){return n.onChangeType(s)})("ngModelChange",function(s){return n.form.type=s}),e.qZA()()()(),e.TgZ(66,"div",34)(67,"div",7)(68,"label",21),e._uU(69,"Momento "),e.qZA(),e.TgZ(70,"div",22)(71,"span",23),e._UZ(72,"i",24),e.qZA(),e.TgZ(73,"p-dropdown",27),e.NdJ("ngModelChange",function(s){return n.form.momento=s}),e.qZA()()()()()(),e.TgZ(74,"div",3)(75,"div",32)(76,"div",3)(77,"span",33),e._uU(78,"Opcionas Avanzadas"),e.qZA()(),e.TgZ(79,"div",3)(80,"container-element",36),e.YNc(81,ae,2,4,"div",37),e.YNc(82,le,2,4,"div",37),e.YNc(83,ce,2,1,"div",37),e.YNc(84,ge,2,1,"div",37),e.YNc(85,he,2,0,"p",38),e.qZA()()()(),e.TgZ(86,"div",3)(87,"div",32)(88,"div",3)(89,"span",33),e._uU(90,"Dependencias"),e.qZA()(),e.TgZ(91,"div",39)(92,"p-inputSwitch",40),e.NdJ("ngModelChange",function(s){return n.depend_confirm=s}),e.qZA(),e.TgZ(93,"label"),e._uU(94,"\xbfEsta pregunta depende de otra pregunta?"),e.qZA()(),e.YNc(95,ve,3,6,"div",41),e.qZA()(),e.TgZ(96,"div",28)(97,"button",29),e.NdJ("click",function(){return n.onSubmit()}),e.qZA()()()(),e._UZ(98,"p-toast")),2&t&&(e.xp6(2),e.Q6J("description",n.inforCardDescription),e.xp6(7),e.Q6J("value",n.preguntas)("selection",n.itemsBulkDelete)("rowHover",!0)("rows",10)("showCurrentPageReport",!0)("rowsPerPageOptions",e.DdM(66,Ce))("loading",n.loading)("paginator",!0)("filterDelay",0)("globalFilterFields",e.DdM(67,be)),e.xp6(6),e.Akn(e.VKq(68,Ze,n.width)),e.Q6J("visible",n.displayFormEdit)("showHeader",!1)("modal",!0)("dismissableMask",!0),e.xp6(1),e.Akn(e.DdM(70,c)),e.xp6(3),e.Akn(e.DdM(71,Te)),e.xp6(2),e.Akn(e.DdM(72,ye)),e.xp6(5),e.Akn(e.DdM(73,C)),e.xp6(5),e.Akn(e.DdM(74,c)),e.Q6J("ngModel",n.formEdit.pregunta_nombre),e.xp6(3),e.Akn(e.DdM(75,C)),e.xp6(5),e.Akn(e.DdM(76,U)),e.Q6J("options",n.momentos)("ngModel",n.formEdit.momento),e.xp6(3),e.Akn(e.VKq(77,Ae,n.width)),e.Q6J("visible",n.displayFormCreate)("showHeader",!0)("modal",!0)("dismissableMask",!1),e.xp6(1),e.Q6J("description",n.inforCardDescriptionFormCreate)("variant",n.variantColor),e.xp6(9),e.Akn(e.DdM(79,C)),e.xp6(5),e.Akn(e.DdM(80,c)),e.Q6J("ngModel",n.form.question),e.xp6(3),e.Akn(e.DdM(81,C)),e.xp6(5),e.Akn(e.DdM(82,c)),e.Q6J("options",n.typeQuestion)("ngModel",n.form.type),e.xp6(3),e.Akn(e.DdM(83,C)),e.xp6(5),e.Akn(e.DdM(84,U)),e.Q6J("options",n.momentos)("ngModel",n.form.momento),e.xp6(7),e.Q6J("ngSwitch",n.optionSelected),e.xp6(1),e.Q6J("ngSwitchCase","respuesta corta"),e.xp6(1),e.Q6J("ngSwitchCase","respuesta larga"),e.xp6(1),e.Q6J("ngSwitchCase","multiple"),e.xp6(1),e.Q6J("ngSwitchCase","unica respuesta"),e.xp6(8),e.Q6J("ngModel",n.depend_confirm),e.xp6(3),e.Q6J("ngIf",n.depend_confirm))},dependencies:[m.sg,m.O5,m.RF,m.n9,m.ED,p.Fj,p.JJ,p.On,b.o,h.Hq,h.zx,v.FN,u.jx,d.iA,d.lQ,d.fz,d.UA,d.Mo,d.xl,T.V,Z.Lt,y.P,M.Z,w.EU,I.XZ,q.g,S,W.A,ee.t],styles:["[_nghost-%COMP%]     .p-datatable-header{background-color:#f16357;border:1px solid #f16357}.customText[_ngcontent-%COMP%]{line-height:1.625;font-weight:400;font-size:1.5rem;font-family:Roboto,sans-serif;color:#616161}"]}),o})()}];let Me=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[x.Bz.forChild(xe),x.Bz]}),o})();var we=l(4466);let Ie=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[m.ez,Me,p.u5,p.UX,b.j,h.hJ,v.EV,d.U$,T.S,Z.kW,y.n,M.d,w.cc,I.nD,q.A,X,we.m]}),o})()}}]);