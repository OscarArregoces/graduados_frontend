"use strict";(self.webpackChunkAppTuristica=self.webpackChunkAppTuristica||[]).push([[118],{1118:(F,g,r)=>{r.d(g,{XH:()=>K});var t=r(8274),p=r(6895),_=r(805),a=r(982),c=r(9592),u=r(7340),b=r(433),v=r(1795);function C(n,s){1&n&&t.GkF(0)}const S=function(n){return{$implicit:n}};function y(n,s){if(1&n&&(t.ynx(0),t.YNc(1,C,1,0,"ng-container",8),t.BQk()),2&n){const e=t.oxw().$implicit,i=t.oxw();t.xp6(1),t.Q6J("ngTemplateOutlet",i.optionTemplate)("ngTemplateOutletContext",t.VKq(2,S,e))}}function O(n,s){if(1&n&&(t.TgZ(0,"span",9),t._uU(1),t.qZA()),2&n){const e=t.oxw().$implicit,i=t.oxw();t.xp6(1),t.Oqu(i.getOptionLabelToRender(e))}}function T(n,s){1&n&&t._UZ(0,"span",10)}function E(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"p-cascadeSelectSub",11),t.NdJ("onSelect",function(o){t.CHM(e);const l=t.oxw(2);return t.KtG(l.onOptionSelect(o))})("onOptionGroupSelect",function(){t.CHM(e);const o=t.oxw(2);return t.KtG(o.onOptionGroupSelect())}),t.qZA()}if(2&n){const e=t.oxw().$implicit,i=t.oxw();t.Q6J("selectionPath",i.selectionPath)("options",i.getOptionGroupChildren(e))("optionLabel",i.optionLabel)("optionValue",i.optionValue)("level",i.level+1)("optionGroupLabel",i.optionGroupLabel)("optionGroupChildren",i.optionGroupChildren)("parentActive",i.isOptionActive(e))("dirty",i.dirty)("optionTemplate",i.optionTemplate)}}function w(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"li",2)(1,"div",3),t.NdJ("click",function(o){const d=t.CHM(e).$implicit,h=t.oxw();return t.KtG(h.onOptionClick(o,d))})("keydown",function(o){const l=t.CHM(e),d=l.$implicit,h=l.index,f=t.oxw();return t.KtG(f.onKeyDown(o,d,h))}),t.YNc(2,y,2,4,"ng-container",4),t.YNc(3,O,2,1,"ng-template",null,5,t.W1O),t.YNc(5,T,1,0,"span",6),t.qZA(),t.YNc(6,E,1,10,"p-cascadeSelectSub",7),t.qZA()}if(2&n){const e=s.$implicit,i=t.MAs(4),o=t.oxw();t.Q6J("ngClass",o.getItemClass(e)),t.xp6(2),t.Q6J("ngIf",o.optionTemplate)("ngIfElse",i),t.xp6(3),t.Q6J("ngIf",o.isOptionGroup(e)),t.xp6(1),t.Q6J("ngIf",o.isOptionGroup(e)&&o.isOptionActive(e))}}const L=function(n){return{"p-cascadeselect-panel-root":n}},G=["focusInput"],x=["container"];function k(n,s){1&n&&t.GkF(0)}const A=function(n,s){return{$implicit:n,placeholder:s}};function D(n,s){if(1&n&&(t.ynx(0),t.YNc(1,k,1,0,"ng-container",11),t.BQk()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngTemplateOutlet",e.valueTemplate)("ngTemplateOutletContext",t.WLB(2,A,e.value,e.placeholder))}}function P(n,s){if(1&n&&t._uU(0),2&n){const e=t.oxw();t.hij(" ",e.label()," ")}}const M=function(n,s){return{showTransitionParams:n,hideTransitionParams:s}},I=function(n){return{value:"visible",params:n}};function V(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"div",12),t.NdJ("click",function(o){t.CHM(e);const l=t.oxw();return t.KtG(l.onOverlayClick(o))})("@overlayAnimation.start",function(o){t.CHM(e);const l=t.oxw();return t.KtG(l.onOverlayAnimationStart(o))})("@overlayAnimation.done",function(o){t.CHM(e);const l=t.oxw();return t.KtG(l.onOverlayAnimationDone(o))}),t.TgZ(1,"div",13)(2,"p-cascadeSelectSub",14),t.NdJ("onSelect",function(o){t.CHM(e);const l=t.oxw();return t.KtG(l.onOptionSelect(o))})("onGroupSelect",function(o){t.CHM(e);const l=t.oxw();return t.KtG(l.onOptionGroupSelect(o))}),t.qZA()()()}if(2&n){const e=t.oxw();t.Q6J("@overlayAnimation",t.VKq(14,I,t.WLB(11,M,e.showTransitionOptions,e.hideTransitionOptions))),t.xp6(2),t.Q6J("options",e.options)("selectionPath",e.selectionPath)("optionLabel",e.optionLabel)("optionValue",e.optionValue)("level",0)("optionTemplate",e.optionTemplate)("optionGroupLabel",e.optionGroupLabel)("optionGroupChildren",e.optionGroupChildren)("dirty",e.dirty)("root",!0)}}const B={provide:b.JU,useExisting:(0,t.Gpc)(()=>m),multi:!0};let H=(()=>{class n{constructor(e,i){this.el=i,this.level=0,this.onSelect=new t.vpe,this.onGroupSelect=new t.vpe,this.activeOption=null,this.cascadeSelect=e}get parentActive(){return this._parentActive}set parentActive(e){e||(this.activeOption=null),this._parentActive=e}ngOnInit(){if(this.selectionPath&&this.options&&!this.dirty)for(let e of this.options)if(this.selectionPath.includes(e)){this.activeOption=e;break}this.root||this.position()}onOptionClick(e,i){this.isOptionGroup(i)?(this.activeOption=this.activeOption===i?null:i,this.onGroupSelect.emit({originalEvent:e,value:i})):this.onSelect.emit({originalEvent:e,value:this.getOptionValue(i)})}onOptionSelect(e){this.onSelect.emit(e)}onOptionGroupSelect(e){this.onGroupSelect.emit(e)}getOptionLabel(e){return this.optionLabel?a.gb.resolveFieldData(e,this.optionLabel):e}getOptionValue(e){return this.optionValue?a.gb.resolveFieldData(e,this.optionValue):e}getOptionGroupLabel(e){return this.optionGroupLabel?a.gb.resolveFieldData(e,this.optionGroupLabel):null}getOptionGroupChildren(e){return a.gb.resolveFieldData(e,this.optionGroupChildren[this.level])}isOptionGroup(e){return Object.prototype.hasOwnProperty.call(e,this.optionGroupChildren[this.level])}getOptionLabelToRender(e){return this.isOptionGroup(e)?this.getOptionGroupLabel(e):this.getOptionLabel(e)}getItemClass(e){return{"p-cascadeselect-item":!0,"p-cascadeselect-item-group":this.isOptionGroup(e),"p-cascadeselect-item-active p-highlight":this.isOptionActive(e)}}isOptionActive(e){return this.activeOption===e}onKeyDown(e,i,o){let l=e.currentTarget.parentElement;switch(e.key){case"Down":case"ArrowDown":var d=this.el.nativeElement.children[0].children[o+1];d&&d.children[0].focus(),e.preventDefault();break;case"Up":case"ArrowUp":var h=this.el.nativeElement.children[0].children[o-1];h&&h.children[0].focus(),e.preventDefault();break;case"Right":case"ArrowRight":this.isOptionGroup(i)&&(this.isOptionActive(i)?l.children[1].children[0].children[0].children[0].focus():this.activeOption=i),e.preventDefault();break;case"Left":case"ArrowLeft":this.activeOption=null;var f=l.parentElement.parentElement.parentElement;f&&f.children[0].focus(),e.preventDefault();break;case"Enter":this.onOptionClick(e,i),e.preventDefault();break;case"Tab":case"Escape":this.cascadeSelect.hide(),e.preventDefault()}}position(){const e=this.el.nativeElement.parentElement,i=c.p.getOffset(e),o=c.p.getViewport(),l=this.el.nativeElement.children[0].offsetParent?this.el.nativeElement.children[0].offsetWidth:c.p.getHiddenElementOuterWidth(this.el.nativeElement.children[0]),d=c.p.getOuterWidth(e.children[0]);parseInt(i.left,10)+d+l>o.width-c.p.calculateScrollbarWidth()&&(this.el.nativeElement.children[0].style.left="-200%")}}return n.\u0275fac=function(e){return new(e||n)(t.Y36((0,t.Gpc)(()=>m)),t.Y36(t.SBq))},n.\u0275cmp=t.Xpm({type:n,selectors:[["p-cascadeSelectSub"]],inputs:{selectionPath:"selectionPath",options:"options",optionGroupChildren:"optionGroupChildren",optionTemplate:"optionTemplate",level:"level",optionLabel:"optionLabel",optionValue:"optionValue",optionGroupLabel:"optionGroupLabel",dirty:"dirty",root:"root",parentActive:"parentActive"},outputs:{onSelect:"onSelect",onGroupSelect:"onGroupSelect"},decls:2,vars:4,consts:[["role","listbox","aria-orientation","horizontal",1,"p-cascadeselect-panel","p-cascadeselect-items",3,"ngClass"],["ngFor","",3,"ngForOf"],["role","none",3,"ngClass"],["tabindex","0","pRipple","",1,"p-cascadeselect-item-content",3,"click","keydown"],[4,"ngIf","ngIfElse"],["defaultOptionTemplate",""],["class","p-cascadeselect-group-icon pi pi-angle-right",4,"ngIf"],["class","p-cascadeselect-sublist",3,"selectionPath","options","optionLabel","optionValue","level","optionGroupLabel","optionGroupChildren","parentActive","dirty","optionTemplate","onSelect","onOptionGroupSelect",4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[1,"p-cascadeselect-item-text"],[1,"p-cascadeselect-group-icon","pi","pi-angle-right"],[1,"p-cascadeselect-sublist",3,"selectionPath","options","optionLabel","optionValue","level","optionGroupLabel","optionGroupChildren","parentActive","dirty","optionTemplate","onSelect","onOptionGroupSelect"]],template:function(e,i){1&e&&(t.TgZ(0,"ul",0),t.YNc(1,w,7,5,"ng-template",1),t.qZA()),2&e&&(t.Q6J("ngClass",t.VKq(2,L,i.root)),t.xp6(1),t.Q6J("ngForOf",i.options))},dependencies:[n,p.mk,p.sg,v.H,p.O5,p.tP],encapsulation:2,changeDetection:0}),n})(),m=(()=>{class n{constructor(e,i,o,l){this.el=e,this.cd=i,this.config=o,this.overlayService=l,this.showTransitionOptions=".12s cubic-bezier(0, 0, 0.2, 1)",this.hideTransitionOptions=".1s linear",this.onChange=new t.vpe,this.onGroupChange=new t.vpe,this.onShow=new t.vpe,this.onHide=new t.vpe,this.onBeforeShow=new t.vpe,this.onBeforeHide=new t.vpe,this.selectionPath=null,this.focused=!1,this.filled=!1,this.overlayVisible=!1,this.dirty=!1,this.onModelChange=()=>{},this.onModelTouched=()=>{}}ngOnInit(){this.updateSelectionPath()}ngAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"value":this.valueTemplate=e.template;break;case"option":this.optionTemplate=e.template}})}onOptionSelect(e){this.value=e.value,this.updateSelectionPath(),this.onModelChange(this.value),this.onChange.emit(e),this.hide(),this.focusInputEl.nativeElement.focus()}onOptionGroupSelect(e){this.dirty=!0,this.onGroupChange.emit(e)}getOptionLabel(e){return this.optionLabel?a.gb.resolveFieldData(e,this.optionLabel):e}getOptionValue(e){return this.optionValue?a.gb.resolveFieldData(e,this.optionValue):e}getOptionGroupChildren(e,i){return a.gb.resolveFieldData(e,this.optionGroupChildren[i])}isOptionGroup(e,i){return Object.prototype.hasOwnProperty.call(e,this.optionGroupChildren[i])}updateSelectionPath(){let e;if(null!=this.value&&this.options)for(let i of this.options)if(e=this.findModelOptionInGroup(i,0),e)break;this.selectionPath=e,this.updateFilledState()}updateFilledState(){this.filled=!(null==this.selectionPath||0==this.selectionPath.length)}findModelOptionInGroup(e,i){if(this.isOptionGroup(e,i)){let o;for(let l of this.getOptionGroupChildren(e,i))if(o=this.findModelOptionInGroup(l,i+1),o)return o.unshift(e),o}else if(a.gb.equals(this.value,this.getOptionValue(e),this.dataKey))return[e];return null}show(){this.onBeforeShow.emit(),this.overlayVisible=!0}hide(){this.onBeforeHide.emit(),this.overlayVisible=!1,this.cd.markForCheck()}onClick(e){this.disabled||(!this.overlayEl||!this.overlayEl||!this.overlayEl.contains(e.target))&&(this.overlayVisible?this.hide():this.show(),this.focusInputEl.nativeElement.focus())}onFocus(){this.focused=!0}onBlur(){this.focused=!1}onOverlayClick(e){this.overlayService.add({originalEvent:e,target:this.el.nativeElement})}onOverlayAnimationStart(e){"visible"===e.toState&&(this.overlayEl=e.element,this.onOverlayEnter())}onOverlayAnimationDone(e){"void"===e.toState&&this.onOverlayLeave()}onOverlayEnter(){a.P9.set("overlay",this.overlayEl,this.config.zIndex.overlay),this.appendContainer(),this.alignOverlay(),this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.onShow.emit()}onOverlayLeave(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.onHide.emit(),a.P9.clear(this.overlayEl),this.overlayEl=null,this.dirty=!1}writeValue(e){this.value=e,this.updateSelectionPath(),this.cd.markForCheck()}registerOnChange(e){this.onModelChange=e}registerOnTouched(e){this.onModelTouched=e}setDisabledState(e){this.disabled=e,this.cd.markForCheck()}alignOverlay(){this.appendTo?(c.p.absolutePosition(this.overlayEl,this.containerEl.nativeElement),this.overlayEl.style.minWidth=c.p.getOuterWidth(this.containerEl.nativeElement)+"px"):c.p.relativePosition(this.overlayEl,this.containerEl.nativeElement)}bindOutsideClickListener(){this.outsideClickListener||(this.outsideClickListener=e=>{this.overlayVisible&&this.overlayEl&&!this.containerEl.nativeElement.contains(e.target)&&!this.overlayEl.contains(e.target)&&this.hide()},document.addEventListener("click",this.outsideClickListener))}unbindOutsideClickListener(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)}bindScrollListener(){this.scrollHandler||(this.scrollHandler=new c.V(this.containerEl.nativeElement,()=>{this.overlayVisible&&this.hide()})),this.scrollHandler.bindScrollListener()}unbindScrollListener(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()}bindResizeListener(){this.resizeListener||(this.resizeListener=()=>{this.overlayVisible&&this.hide()},window.addEventListener("resize",this.resizeListener))}unbindResizeListener(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)}appendContainer(){this.appendTo&&("body"===this.appendTo?document.body.appendChild(this.overlayEl):document.getElementById(this.appendTo).appendChild(this.overlayEl))}restoreAppend(){this.overlayEl&&this.appendTo&&("body"===this.appendTo?document.body.removeChild(this.overlayEl):document.getElementById(this.appendTo).removeChild(this.overlayEl))}label(){return this.selectionPath?this.getOptionLabel(this.selectionPath[this.selectionPath.length-1]):this.placeholder||"p-emptylabel"}onKeyDown(e){switch(e.code){case"Down":case"ArrowDown":this.overlayVisible?c.p.findSingle(this.overlayEl,".p-cascadeselect-item").children[0].focus():e.altKey&&this.options&&this.options.length&&this.show(),e.preventDefault();break;case"Space":case"Enter":this.overlayVisible?this.hide():this.show(),e.preventDefault();break;case"Tab":case"Escape":this.overlayVisible&&(this.hide(),e.preventDefault())}}containerClass(){return{"p-cascadeselect p-component p-inputwrapper":!0,"p-disabled":this.disabled,"p-focus":this.focused}}labelClass(){return{"p-cascadeselect-label":!0,"p-placeholder":this.label()===this.placeholder,"p-cascadeselect-label-empty":!this.value&&("p-emptylabel"===this.label()||0===this.label().length)}}ngOnDestroy(){this.restoreAppend(),this.unbindOutsideClickListener(),this.unbindResizeListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.overlayEl=null}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(t.SBq),t.Y36(t.sBO),t.Y36(_.b4),t.Y36(_.F0))},n.\u0275cmp=t.Xpm({type:n,selectors:[["p-cascadeSelect"]],contentQueries:function(e,i,o){if(1&e&&t.Suo(o,_.jx,4),2&e){let l;t.iGM(l=t.CRH())&&(i.templates=l)}},viewQuery:function(e,i){if(1&e&&(t.Gf(G,5),t.Gf(x,5)),2&e){let o;t.iGM(o=t.CRH())&&(i.focusInputEl=o.first),t.iGM(o=t.CRH())&&(i.containerEl=o.first)}},hostAttrs:[1,"p-element","p-inputwrapper"],hostVars:4,hostBindings:function(e,i){2&e&&t.ekj("p-inputwrapper-filled",i.filled)("p-inputwrapper-focus",i.focused||i.overlayVisible)},inputs:{styleClass:"styleClass",style:"style",options:"options",optionLabel:"optionLabel",optionValue:"optionValue",optionGroupLabel:"optionGroupLabel",optionGroupChildren:"optionGroupChildren",placeholder:"placeholder",value:"value",dataKey:"dataKey",inputId:"inputId",tabindex:"tabindex",ariaLabelledBy:"ariaLabelledBy",appendTo:"appendTo",disabled:"disabled",rounded:"rounded",showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions"},outputs:{onChange:"onChange",onGroupChange:"onGroupChange",onShow:"onShow",onHide:"onHide",onBeforeShow:"onBeforeShow",onBeforeHide:"onBeforeHide"},features:[t._Bn([B])],decls:12,vars:14,consts:[[3,"ngClass","ngStyle","click"],["container",""],[1,"p-hidden-accessible"],["type","text","readonly","","aria-haspopup","listbox",3,"disabled","focus","blur","keydown"],["focusInput",""],[3,"ngClass"],[4,"ngIf","ngIfElse"],["defaultValueTemplate",""],["role","button","aria-haspopup","listbox",1,"p-cascadeselect-trigger"],[1,"p-cascadeselect-trigger-icon","pi","pi-chevron-down"],["class","p-cascadeselect-panel p-component",3,"click",4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[1,"p-cascadeselect-panel","p-component",3,"click"],[1,"p-cascadeselect-items-wrapper"],[1,"p-cascadeselect-items",3,"options","selectionPath","optionLabel","optionValue","level","optionTemplate","optionGroupLabel","optionGroupChildren","dirty","root","onSelect","onGroupSelect"]],template:function(e,i){if(1&e&&(t.TgZ(0,"div",0,1),t.NdJ("click",function(l){return i.onClick(l)}),t.TgZ(2,"div",2)(3,"input",3,4),t.NdJ("focus",function(){return i.onFocus()})("blur",function(){return i.onBlur()})("keydown",function(l){return i.onKeyDown(l)}),t.qZA()(),t.TgZ(5,"span",5),t.YNc(6,D,2,5,"ng-container",6),t.YNc(7,P,1,1,"ng-template",null,7,t.W1O),t.qZA(),t.TgZ(9,"div",8),t._UZ(10,"span",9),t.qZA(),t.YNc(11,V,3,16,"div",10),t.qZA()),2&e){const o=t.MAs(8);t.Tol(i.styleClass),t.Q6J("ngClass",i.containerClass())("ngStyle",i.style),t.xp6(3),t.Q6J("disabled",i.disabled),t.uIk("id",i.inputId)("tabindex",i.tabindex)("aria-expanded",i.overlayVisible)("aria-labelledby",i.ariaLabelledBy),t.xp6(2),t.Q6J("ngClass",i.labelClass()),t.xp6(1),t.Q6J("ngIf",i.valueTemplate)("ngIfElse",o),t.xp6(3),t.uIk("aria-expanded",i.overlayVisible),t.xp6(2),t.Q6J("ngIf",i.overlayVisible)}},dependencies:[H,p.mk,p.PC,p.O5,p.tP],styles:[".p-cascadeselect{display:inline-flex;cursor:pointer;position:relative;-webkit-user-select:none;user-select:none}.p-cascadeselect-trigger{display:flex;align-items:center;justify-content:center;flex-shrink:0}.p-cascadeselect-label{display:block;white-space:nowrap;overflow:hidden;flex:1 1 auto;width:1%;text-overflow:ellipsis;cursor:pointer}.p-cascadeselect-label-empty{overflow:hidden;visibility:hidden}.p-cascadeselect .p-cascadeselect-panel{min-width:100%}.p-cascadeselect-panel{position:absolute;top:0;left:0}.p-cascadeselect-item{cursor:pointer;font-weight:normal;white-space:nowrap}.p-cascadeselect-item-content{display:flex;align-items:center;overflow:hidden;position:relative}.p-cascadeselect-group-icon{margin-left:auto}.p-cascadeselect-items{margin:0;padding:0;list-style-type:none}.p-fluid .p-cascadeselect{display:flex}.p-fluid .p-cascadeselect .p-cascadeselect-label{width:1%}.p-cascadeselect-sublist{position:absolute;min-width:100%;z-index:1;display:none}.p-cascadeselect-item-active{overflow:visible!important}.p-cascadeselect-item-active>.p-cascadeselect-sublist{display:block;left:100%;top:0}\n"],encapsulation:2,data:{animation:[(0,u.X$)("overlayAnimation",[(0,u.eR)(":enter",[(0,u.oB)({opacity:0,transform:"scaleY(0.8)"}),(0,u.jt)("{{showTransitionParams}}")]),(0,u.eR)(":leave",[(0,u.jt)("{{hideTransitionParams}}",(0,u.oB)({opacity:0}))])])]},changeDetection:0}),n})(),K=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[p.ez,_.m8,v.T],_.m8]}),n})()}}]);