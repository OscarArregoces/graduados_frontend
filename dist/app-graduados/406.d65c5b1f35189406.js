"use strict";(self.webpackChunkAppTuristica=self.webpackChunkAppTuristica||[]).push([[406],{2925:(k,m,r)=>{r.d(m,{O:()=>f});var n=r(8274);const p=function(){return{height:"80vh"}};let f=(()=>{class o{constructor(){}ngOnInit(){}}return o.\u0275fac=function(u){return new(u||o)},o.\u0275cmp=n.Xpm({type:o,selectors:[["app-spinner"]],decls:2,vars:3,consts:[[1,"flex","align-items-center","justify-content-center","flex-column"],[1,"loader"]],template:function(u,g){1&u&&(n.TgZ(0,"div",0),n._UZ(1,"span",1),n.qZA()),2&u&&n.Akn(n.DdM(2,p))},styles:['.loader[_ngcontent-%COMP%]{width:20px;height:20px;box-shadow:0 30px,0 -30px;border-radius:4px;background:currentColor;display:block;margin:-70px auto 0;position:relative;color:#fff;transform:translateY(30px);box-sizing:border-box;animation:animloader 2s ease infinite}.loader[_ngcontent-%COMP%]:after, .loader[_ngcontent-%COMP%]:before{content:"";box-sizing:border-box;width:20px;height:20px;box-shadow:0 30px,0 -30px;border-radius:4px;background:currentColor;color:#fff;position:absolute;left:30px;top:0;animation:animloader 2s .2s ease infinite}.loader[_ngcontent-%COMP%]:before{animation-delay:.4s;left:60px}@keyframes animloader{0%{top:0;color:#f55e03}50%{top:30px;color:#e27c1b}to{top:0;color:#f0d928}}']}),o})()},3520:(k,m,r)=>{r.d(m,{vy:()=>C,zz:()=>_});var n=r(8274),p=r(6895),f=r(9592),o=r(1740),c=r(433);const u=["input"],g={provide:c.JU,useExisting:(0,n.Gpc)(()=>C),multi:!0};let C=(()=>{class a{constructor(t,e){this.el=t,this.cd=e,this.type="text",this.slotChar="_",this.autoClear=!0,this.characterPattern="[A-Za-z]",this.onComplete=new n.vpe,this.onFocus=new n.vpe,this.onBlur=new n.vpe,this.onInput=new n.vpe,this.onKeydown=new n.vpe,this.onModelChange=()=>{},this.onModelTouched=()=>{}}ngOnInit(){let t=f.p.getUserAgent();this.androidChrome=/chrome/i.test(t)&&/android/i.test(t),this.initMask()}get mask(){return this._mask}set mask(t){this._mask=t,this.initMask(),this.writeValue(""),this.onModelChange(this.value)}initMask(){this.tests=[],this.partialPosition=this.mask.length,this.len=this.mask.length,this.firstNonMaskPos=null,this.defs={9:"[0-9]",a:this.characterPattern,"*":`${this.characterPattern}|[0-9]`};let t=this.mask.split("");for(let e=0;e<t.length;e++){let i=t[e];"?"==i?(this.len--,this.partialPosition=e):this.defs[i]?(this.tests.push(new RegExp(this.defs[i])),null===this.firstNonMaskPos&&(this.firstNonMaskPos=this.tests.length-1),e<this.partialPosition&&(this.lastRequiredNonMaskPos=this.tests.length-1)):this.tests.push(null)}this.buffer=[];for(let e=0;e<t.length;e++){let i=t[e];"?"!=i&&this.buffer.push(this.defs[i]?this.getPlaceholder(e):i)}this.defaultBuffer=this.buffer.join("")}writeValue(t){this.value=t,this.inputViewChild&&this.inputViewChild.nativeElement&&(this.inputViewChild.nativeElement.value=null==this.value||null==this.value?"":this.value,this.checkVal(),this.focusText=this.inputViewChild.nativeElement.value,this.updateFilledState())}registerOnChange(t){this.onModelChange=t}registerOnTouched(t){this.onModelTouched=t}setDisabledState(t){this.disabled=t,this.cd.markForCheck()}caret(t,e){let i,s,l;if(this.inputViewChild.nativeElement.offsetParent&&this.inputViewChild.nativeElement===this.inputViewChild.nativeElement.ownerDocument.activeElement){if("number"!=typeof t)return this.inputViewChild.nativeElement.setSelectionRange?(s=this.inputViewChild.nativeElement.selectionStart,l=this.inputViewChild.nativeElement.selectionEnd):document.selection&&document.selection.createRange&&(i=document.selection.createRange(),s=0-i.duplicate().moveStart("character",-1e5),l=s+i.text.length),{begin:s,end:l};s=t,l="number"==typeof e?e:s,this.inputViewChild.nativeElement.setSelectionRange?this.inputViewChild.nativeElement.setSelectionRange(s,l):this.inputViewChild.nativeElement.createTextRange&&(i=this.inputViewChild.nativeElement.createTextRange(),i.collapse(!0),i.moveEnd("character",l),i.moveStart("character",s),i.select())}}isCompleted(){for(let e=this.firstNonMaskPos;e<=this.lastRequiredNonMaskPos;e++)if(this.tests[e]&&this.buffer[e]===this.getPlaceholder(e))return!1;return!0}getPlaceholder(t){return this.slotChar.charAt(t<this.slotChar.length?t:0)}seekNext(t){for(;++t<this.len&&!this.tests[t];);return t}seekPrev(t){for(;--t>=0&&!this.tests[t];);return t}shiftL(t,e){let i,s;if(!(t<0)){for(i=t,s=this.seekNext(e);i<this.len;i++)if(this.tests[i]){if(!(s<this.len&&this.tests[i].test(this.buffer[s])))break;this.buffer[i]=this.buffer[s],this.buffer[s]=this.getPlaceholder(s),s=this.seekNext(s)}this.writeBuffer(),this.caret(Math.max(this.firstNonMaskPos,t))}}shiftR(t){let e,i,s,l;for(e=t,i=this.getPlaceholder(t);e<this.len;e++)if(this.tests[e]){if(s=this.seekNext(e),l=this.buffer[e],this.buffer[e]=i,!(s<this.len&&this.tests[s].test(l)))break;i=l}}handleAndroidInput(t){var e=this.inputViewChild.nativeElement.value,i=this.caret();if(this.oldVal&&this.oldVal.length&&this.oldVal.length>e.length){for(this.checkVal(!0);i.begin>0&&!this.tests[i.begin-1];)i.begin--;if(0===i.begin)for(;i.begin<this.firstNonMaskPos&&!this.tests[i.begin];)i.begin++;setTimeout(()=>{this.caret(i.begin,i.begin),this.updateModel(t),this.isCompleted()&&this.onComplete.emit()},0)}else{for(this.checkVal(!0);i.begin<this.len&&!this.tests[i.begin];)i.begin++;setTimeout(()=>{this.caret(i.begin,i.begin),this.updateModel(t),this.isCompleted()&&this.onComplete.emit()},0)}}onInputBlur(t){if(this.focused=!1,this.onModelTouched(),this.checkVal(),this.updateFilledState(),this.onBlur.emit(t),this.inputViewChild.nativeElement.value!=this.focusText||this.inputViewChild.nativeElement.value!=this.value){this.updateModel(t);let e=document.createEvent("HTMLEvents");e.initEvent("change",!0,!1),this.inputViewChild.nativeElement.dispatchEvent(e)}}onInputKeydown(t){if(this.readonly)return;let i,s,l,e=t.which||t.keyCode,h=/iphone/i.test(f.p.getUserAgent());this.oldVal=this.inputViewChild.nativeElement.value,this.onKeydown.emit(t),8===e||46===e||h&&127===e?(i=this.caret(),s=i.begin,l=i.end,l-s==0&&(s=46!==e?this.seekPrev(s):l=this.seekNext(s-1),l=46===e?this.seekNext(l):l),this.clearBuffer(s,l),this.shiftL(s,l-1),this.updateModel(t),this.onInput.emit(t),t.preventDefault()):13===e?(this.onInputBlur(t),this.updateModel(t)):27===e&&(this.inputViewChild.nativeElement.value=this.focusText,this.caret(0,this.checkVal()),this.updateModel(t),t.preventDefault())}onKeyPress(t){if(!this.readonly){var s,l,h,v,e=t.which||t.keyCode,i=this.caret();t.ctrlKey||t.altKey||t.metaKey||e<32||e>34&&e<41||(e&&13!==e&&(i.end-i.begin!=0&&(this.clearBuffer(i.begin,i.end),this.shiftL(i.begin,i.end-1)),(s=this.seekNext(i.begin-1))<this.len&&(l=String.fromCharCode(e),this.tests[s].test(l)&&(this.shiftR(s),this.buffer[s]=l,this.writeBuffer(),h=this.seekNext(s),/android/i.test(f.p.getUserAgent())?setTimeout(()=>{this.caret(h)},0):this.caret(h),i.begin<=this.lastRequiredNonMaskPos&&(v=this.isCompleted()),this.onInput.emit(t))),t.preventDefault()),this.updateModel(t),this.updateFilledState(),v&&this.onComplete.emit())}}clearBuffer(t,e){let i;for(i=t;i<e&&i<this.len;i++)this.tests[i]&&(this.buffer[i]=this.getPlaceholder(i))}writeBuffer(){this.inputViewChild.nativeElement.value=this.buffer.join("")}checkVal(t){let s,l,h,e=this.inputViewChild.nativeElement.value,i=-1;for(s=0,h=0;s<this.len;s++)if(this.tests[s]){for(this.buffer[s]=this.getPlaceholder(s);h++<e.length;)if(l=e.charAt(h-1),this.tests[s].test(l)){this.buffer[s]=l,i=s;break}if(h>e.length){this.clearBuffer(s+1,this.len);break}}else this.buffer[s]===e.charAt(h)&&h++,s<this.partialPosition&&(i=s);return t?this.writeBuffer():i+1<this.partialPosition?this.autoClear||this.buffer.join("")===this.defaultBuffer?(this.inputViewChild.nativeElement.value&&(this.inputViewChild.nativeElement.value=""),this.clearBuffer(0,this.len)):this.writeBuffer():(this.writeBuffer(),this.inputViewChild.nativeElement.value=this.inputViewChild.nativeElement.value.substring(0,i+1)),this.partialPosition?s:this.firstNonMaskPos}onInputFocus(t){if(this.readonly)return;let e;this.focused=!0,clearTimeout(this.caretTimeoutId),this.focusText=this.inputViewChild.nativeElement.value,e=this.checkVal(),this.caretTimeoutId=setTimeout(()=>{this.inputViewChild.nativeElement===this.inputViewChild.nativeElement.ownerDocument.activeElement&&(this.writeBuffer(),e==this.mask.replace("?","").length?this.caret(0,e):this.caret(e))},10),this.onFocus.emit(t)}onInputChange(t){this.androidChrome?this.handleAndroidInput(t):this.handleInputChange(t),this.onInput.emit(t)}handleInputChange(t){this.readonly||setTimeout(()=>{var e=this.checkVal(!0);this.caret(e),this.updateModel(t),this.isCompleted()&&this.onComplete.emit()},0)}getUnmaskedValue(){let t=[];for(let e=0;e<this.buffer.length;e++){let i=this.buffer[e];this.tests[e]&&i!=this.getPlaceholder(e)&&t.push(i)}return t.join("")}updateModel(t){const e=this.unmask?this.getUnmaskedValue():t.target.value;(null!==e||void 0!==e)&&(this.value=e,this.onModelChange(this.value))}updateFilledState(){this.filled=this.inputViewChild.nativeElement&&""!=this.inputViewChild.nativeElement.value}focus(){this.inputViewChild.nativeElement.focus()}}return a.\u0275fac=function(t){return new(t||a)(n.Y36(n.SBq),n.Y36(n.sBO))},a.\u0275cmp=n.Xpm({type:a,selectors:[["p-inputMask"]],viewQuery:function(t,e){if(1&t&&n.Gf(u,7),2&t){let i;n.iGM(i=n.CRH())&&(e.inputViewChild=i.first)}},hostAttrs:[1,"p-element"],hostVars:4,hostBindings:function(t,e){2&t&&n.ekj("p-inputwrapper-filled",e.filled)("p-inputwrapper-focus",e.focused)},inputs:{type:"type",slotChar:"slotChar",autoClear:"autoClear",style:"style",inputId:"inputId",styleClass:"styleClass",placeholder:"placeholder",size:"size",maxlength:"maxlength",tabindex:"tabindex",title:"title",ariaLabel:"ariaLabel",ariaRequired:"ariaRequired",disabled:"disabled",readonly:"readonly",unmask:"unmask",name:"name",required:"required",characterPattern:"characterPattern",autoFocus:"autoFocus",autocomplete:"autocomplete",mask:"mask"},outputs:{onComplete:"onComplete",onFocus:"onFocus",onBlur:"onBlur",onInput:"onInput",onKeydown:"onKeydown"},features:[n._Bn([g])],decls:2,vars:17,consts:[["pInputText","",1,"p-inputmask",3,"ngStyle","ngClass","disabled","readonly","focus","blur","keydown","keypress","input","paste"],["input",""]],template:function(t,e){1&t&&(n.TgZ(0,"input",0,1),n.NdJ("focus",function(s){return e.onInputFocus(s)})("blur",function(s){return e.onInputBlur(s)})("keydown",function(s){return e.onInputKeydown(s)})("keypress",function(s){return e.onKeyPress(s)})("input",function(s){return e.onInputChange(s)})("paste",function(s){return e.handleInputChange(s)}),n.qZA()),2&t&&(n.Q6J("ngStyle",e.style)("ngClass",e.styleClass)("disabled",e.disabled)("readonly",e.readonly),n.uIk("id",e.inputId)("type",e.type)("name",e.name)("placeholder",e.placeholder)("title",e.title)("size",e.size)("autocomplete",e.autocomplete)("maxlength",e.maxlength)("tabindex",e.tabindex)("aria-label",e.ariaLabel)("aria-required",e.ariaRequired)("required",e.required)("autofocus",e.autoFocus))},dependencies:[o.o,p.PC,p.mk],encapsulation:2,changeDetection:0}),a})(),_=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=n.oAB({type:a}),a.\u0275inj=n.cJS({imports:[[p.ez,o.j]]}),a})()}}]);