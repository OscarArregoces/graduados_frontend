"use strict";(self.webpackChunkAppTuristica=self.webpackChunkAppTuristica||[]).push([[135],{3135:(Be,Z,C)=>{C.r(Z),C.d(Z,{AsistenciaModule:()=>ke});var J=C(6895),X=C(1933),s=C(8274);let ue=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=s.Xpm({type:t,selectors:[["app-ver"]],decls:2,vars:0,template:function(e,n){1&e&&(s.TgZ(0,"p"),s._uU(1,"ver works!"),s.qZA())}}),t})();var pe=C(2340);function U(t,i,e,n){return new(e||(e=Promise))(function(r,a){function l(h){try{c(n.next(h))}catch(y){a(y)}}function u(h){try{c(n.throw(h))}catch(y){a(y)}}function c(h){h.done?r(h.value):function o(r){return r instanceof e?r:new e(function(a){a(r)})}(h.value).then(l,u)}c((n=n.apply(t,i||[])).next())})}var me=C(7579);class A extends me.x{constructor(){super(...arguments),this._value=null,this._hasValue=!1,this._isComplete=!1}_checkFinalizedStatuses(i){const{hasError:e,_hasValue:n,_value:o,thrownError:r,isStopped:a,_isComplete:l}=this;e?i.error(r):(a||l)&&(n&&i.next(o),i.complete())}next(i){this.isStopped||(this._value=i,this._hasValue=!0)}complete(){const{_hasValue:i,_value:e,_isComplete:n}=this;n||(this._isComplete=!0,i&&super.next(e),super.complete())}}var ee=C(1135);const ve=["video"],ge=["canvas"],Se=["resultsPanel"],te="assets/wasm/index.js",ne={audio:!1,video:!0},E={src:"",fps:30,vibrate:300,decode:"utf-8",isBeep:!0,constraints:ne,canvasStyles:{font:"15px serif",lineWidth:1,strokeStyle:"green",fillStyle:"#55f02880"}},f=(t,i,e=null)=>{e?t.error(e):t.next(i),t.complete()},q=(t=!1)=>{if(!1===t)return;const i=new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU"+Array(300).join("101"));i.oncanplaythrough=()=>{const e=i.play();e&&e.catch(n=>{})}},_=(t,i)=>{const e=i.split(".");for(let n=0;n<e.length;n++){let o=e[n];if(!t||!t.hasOwnProperty(o))return!1;t=t[o]}return!0},ie=(t,i,e,n)=>{let o,r,a=i.width,l=i.height,u=a/l,c=parseInt(getComputedStyle(i).width),h=parseInt(getComputedStyle(i).height),y=c/h;e.innerHTML="",u>y?(o=c/a,r=c/u/l):(r=h/l,o=h*u/a);for(let v=0;v<t.length;v++){const S=t[v];let p=document.createElement("canvas"),R=p.getContext("2d",{willReadFrequently:!0}),Q={},w=[],I=[],F=0,D=0;if(_(n,"font")&&n.font){let g=n.font.replace(/[^0-9]/g,"");/[0-9]/g.test(g)&&(F=parseFloat(g),D=(o||1)*F,Number.isNaN(D)&&(D=F))}const P=S.points;for(let g=0;g<P.length;g++){const j=_(P,`${g}.x`)?P[g].x:0,G=_(P,`${g}.y`)?P[g].y:0;Q[`x${g+1}`]=j,Q[`y${g+1}`]=G,w.push(j),I.push(G)}let Y=Math.max(...w),O=Math.min(...w),V=Math.max(...I),x=Math.min(...I);p.setAttribute("class","qrcode-polygon"),u>y?(p.style.top=x*r+.5*(h-c/u)+"px",p.style.left=O*o+"px",p.width=(Y-O)*o,p.height=(V-x)*o):(p.style.top=x*r+"px",p.style.left=O*o+.5*(c-h*u)+"px",p.width=(Y-O)*r,p.height=(V-x)*r);for(const g in n)R[g]=n[g];const W=[];for(let g=0;g<w.length;g++)W.push((Q[`x${g+1}`]-O)*r),W.push((Q[`y${g+1}`]-x)*o);const M=W.slice(0);for(R.beginPath(),R.moveTo(M.shift(),M.shift());M.length;)R.lineTo(M.shift(),M.shift());if(R.closePath(),R.fill(),R.stroke(),F){const g=document.createElement("div");g.setAttribute("class","qrcode-tooltip-temp"),g.innerText=S.value;const j=`<?xml version="1.0" encoding="utf-8"?><svg version="1.1" class="qrcode-tooltip-clipboard" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${D}" height="${D}" x="0px" y="0px" viewBox="0 0 115.77 122.88" xml:space="preserve"><g><path d="M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z"></path></g></svg> `,G=(new DOMParser).parseFromString(j,"application/xml"),he=g.ownerDocument.importNode(G.documentElement,!0);g.appendChild(he),he.addEventListener("click",()=>window.navigator.clipboard.writeText(S.value));const N=document.createElement("div");N.setAttribute("class","qrcode-tooltip"),N.appendChild(g),r=h/l,o=h*u/a,N.style.fontSize=o*F+"px",N.style.top=x*r+"px",N.style.left=O*o+.5*(c-h*u)+"px",N.style.width=(Y-O)*r+"px",N.style.height=(V-x)*r+"px";const L=document.createElement("span");L.innerText=S.value,L.style.fontSize=o*F+"px",L.style.top=x*r+-20*r+"px",L.style.left=O*o+.5*(c-h*u)+"px",e&&(e.appendChild(N),e.appendChild(L))}e&&e.appendChild(p)}},oe=(t,i)=>new Promise((e,n)=>t.toBlob(o=>e(o),i)),re=(t=[],i,e=new A)=>(Promise.all(Object.assign([],t).map(n=>((t,i)=>{let e=_(i,"decode")?i.decode:E.decode,n=_(i,"canvasStyles")?i.canvasStyles:E.canvasStyles,o=_(i,"isBeep")?i.isBeep:E.isBeep;return new Promise((r,a)=>{const l=new FileReader;l.onload=()=>{const u={name:t.name,file:t,url:URL.createObjectURL(t)},c=new Image;c.setAttribute("crossOrigin","anonymous"),c.onload=()=>U(void 0,void 0,void 0,function*(){const h=document.createElement("canvas");h.width=c.naturalWidth||c.width,h.height=c.naturalHeight||c.height;const y=h.getContext("2d");y.drawImage(c,0,0,h.width,h.height);const v=y.getImageData(0,0,h.width,h.height),S=yield zbarWasm.scanImageData(v);if(S&&S.length){S.forEach(w=>w.value=w.decode(e&&e.toLocaleLowerCase())),((t,i,e)=>{let n=i.getContext("2d",{willReadFrequently:!0});for(let o=0;o<t.length;o++){const r=t[o];let a={},l=[],u=[];const c=r.points;for(let p=0;p<c.length;p++){const R=_(c,`${p}.x`)?c[p].x:0,Q=_(c,`${p}.y`)?c[p].y:0;a[`x${p+1}`]=R,a[`y${p+1}`]=Q,l.push(R),u.push(Q)}let h=Math.min(...l),y=Math.min(...u);for(const p in e)n[p]=e[p];n.font=_(e,"font")?e.font:"15px serif",be(n,r.value,h,y-5);const v=[];for(let p=0;p<l.length;p++)v.push(a[`x${p+1}`]),v.push(a[`y${p+1}`]);const S=v.slice(0);for(n.beginPath(),n.moveTo(S.shift(),S.shift());S.length;)n.lineTo(S.shift(),S.shift());n.closePath(),n.fill(),n.stroke()}})(S,h,n);const p=yield oe(h),R=URL.createObjectURL(p);r(Object.assign({},u,{data:S,url:R,canvas:h,file:(w=p,I=u.name,new File([w],I,{lastModified:(new Date).getTime(),type:w.type}))})),q(o)}else r(Object.assign({},u,{data:S,canvas:h}));var w,I}),c.src=u.url},l.onerror=u=>a(u),l.readAsDataURL(t)})})(n,i))).then(n=>{f(e,n)}).catch(n=>f(e,null,n)),e),be=(t,i,e,n)=>{let o=1.2*t.measureText("M").width,r=i.split("\n");for(var a=0;a<r.length;++a)t.fillText(r[a],e,n),t.strokeText(r[a],e,n),n+=o},se=t=>{Object.assign([],t.childNodes).forEach(i=>t.removeChild(i))},ae=t=>{t&&we()&&window&&window.navigator&&window.navigator.vibrate(t)},we=()=>{const t=navigator.userAgent||navigator.vendor||window.opera;return!(!/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t)&&!/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(t.substr(0,4))||/^((?!chrome|android).)*safari/i.test(t))};class b{loadFiles(i=[]){const e=new A;return Promise.all(Object.assign([],i).map(n=>this.readAsDataURL(n))).then(n=>f(e,n)).catch(n=>f(e,null,n)),e}loadFilesToScan(i=[],e){return re(i,e)}readAsDataURL(i){return new Promise((e,n)=>{const o=new FileReader;o.onload=()=>{const r={name:i.name,file:i,url:URL.createObjectURL(i)};e(r)},o.onerror=r=>n(r),o.readAsDataURL(i)})}}b.\u0275fac=function(i){return new(i||b)},b.\u0275prov=s.Yz7({token:b,factory:b.\u0275fac,providedIn:"root"}),b.ngInjectableDef=(0,s.Ez6)({factory:function(){return new b},token:b,providedIn:"root"});let Qe=(()=>{class t{constructor(e){this.renderer=e,this.event=new s.vpe,this.src=E.src,this.fps=E.fps,this.vibrate=E.vibrate,this.decode=E.decode,this.isBeep=E.isBeep,this.config=E,this.constraints=E.constraints,this.canvasStyles=E.canvasStyles,this.isStart=!1,this.isPause=!1,this.isLoading=!1,this.isTorch=!1,this.data=new ee.X([]),this.devices=new ee.X([]),this.deviceIndexActive=0,this.dataForResize=[],this.ready=new A,this.STATUS={startON:()=>this.isStart=!0,pauseON:()=>this.isPause=!0,loadingON:()=>this.isLoading=!0,startOFF:()=>this.isStart=!1,pauseOFF:()=>this.isPause=!1,loadingOFF:()=>this.isLoading=!1,torchOFF:()=>this.isTorch=!1}}ngOnInit(){this.overrideConfig(),((t,i)=>{const e=document.querySelectorAll('script[src="https://cdn.jsdelivr.net/npm/ngx-scanner-qrcode@1.4.1/wasm/index.js"]'),n=document.querySelectorAll('script[src="https://cdn.jsdelivr.net/npm/ngx-scanner-qrcode@latest/wasm/index.js"]');if(e.length||n.length)setTimeout(()=>f(t,!0),200);else{const o=document.querySelectorAll(`script[src="${te}"]`);if(1===o.length)setTimeout(()=>f(t,!0),200);else{o.forEach(a=>a.remove());const r=i.createElement("script");i.setAttribute(r,"type","text/javascript"),i.setAttribute(r,"src",te),i.appendChild(document.body,r),r.onload=()=>setTimeout(()=>f(t,!0),200),r.onerror=()=>setTimeout(()=>f(t,!1,!0),200)}}return t})(this.ready,this.renderer).subscribe(()=>{this.src&&this.loadImage(this.src),this.resize()})}start(e){const n=new A;return this.isStart?f(n,!1):this.safariWebRTC(n,e),n}stop(){this.STATUS.pauseOFF(),this.STATUS.startOFF(),this.STATUS.torchOFF(),this.STATUS.loadingOFF();const e=new A;try{se(this.resultsPanel.nativeElement),clearInterval(this.rAF_ID),this.video.nativeElement.srcObject.getTracks().forEach(n=>{n.stop(),f(e,!0)})}catch(n){f(e,!1,n)}return e}play(){const e=new A;return this.isPause?(this.video.nativeElement.play(),this.STATUS.pauseOFF(),this.requestAnimationFrame(),f(e,!0)):f(e,!1),e}pause(){const e=new A;return this.isStart?(clearInterval(this.rAF_ID),this.video.nativeElement.pause(),this.STATUS.pauseON(),f(e,!0)):f(e,!1),e}playDevice(e,n=new A){const o=!this.isStart||this.getConstraints().deviceId!=e;switch(!0){case"null"===e||"undefined"===e||!e:stop(),this.stop(),f(n,!1);break;case e&&o:stop(),this.stop(),this.STATUS.loadingON(),this.deviceIndexActive=this.devices.value.findIndex(a=>a.deviceId===e);const r=Object.assign({},this.constraints,{audio:!1,video:Object.assign({deviceId:e},this.constraints.video)});navigator.mediaDevices.getUserMedia(r).then(a=>{this.video.nativeElement.srcObject=a,this.video.nativeElement.onloadedmetadata=()=>{this.video.nativeElement.play(),this.requestAnimationFrame(),f(n,!0),this.STATUS.startON(),this.STATUS.loadingOFF()}}).catch(a=>{this.eventEmit(!1),f(n,!1,a),this.STATUS.startOFF(),this.STATUS.loadingOFF()});break;default:f(n,!1),this.STATUS.loadingOFF()}return n}loadImage(e){const n=new A;this.STATUS.startOFF(),this.STATUS.loadingON();const o=new Image;return o.setAttribute("crossOrigin","anonymous"),o.onload=()=>{this.drawImage(o,r=>{f(n,r),this.STATUS.startOFF(),this.STATUS.loadingOFF()})},o.src=e,n}torcher(){const e=this.applyConstraints({advanced:[{torch:this.isTorch}]});return e.subscribe(()=>!1,()=>this.isTorch=!this.isTorch),e}applyConstraints(e){const n=new A,r=this.video.nativeElement.srcObject.getVideoTracks()[0];return new window.ImageCapture(r).getPhotoCapabilities().then(()=>U(this,void 0,void 0,function*(){yield r.applyConstraints(e),f(n,!0)})).catch(l=>{switch(l&&l.name){case"NotFoundError":case"DevicesNotFoundError":f(n,!1,"Required track is missing");break;case"NotReadableError":case"TrackStartError":f(n,!1,"Webcam or mic are already in use");break;case"OverconstrainedError":case"ConstraintNotSatisfiedError":f(n,!1,"Constraints can not be satisfied by avb. devices");break;case"NotAllowedError":case"PermissionDeniedError":f(n,!1,"Permission denied in browser");break;case"TypeError":f(n,!1,"Empty constraints object");break;default:f(n,!1,l)}}),n}getConstraints(){const e=this.video.nativeElement.srcObject,n=e&&e.getVideoTracks()[0];return n&&n.getConstraints()}download(e=`ngx-scanner-qrcode-${Date.now()}.png`){const n=new A;return(()=>{U(this,void 0,void 0,function*(){const a=((t,i)=>new File([t],i,{lastModified:(new Date).getTime(),type:t.type}))(yield oe(this.canvas.nativeElement),e);re([a],this.config,n).subscribe(l=>{l.forEach(u=>{const c=document.createElement("a");c.href=u.url,c.download=u.name,c.click(),c.remove()})})})})(),n}resize(){window.addEventListener("resize",()=>{this.dataForResize&&this.dataForResize.length&&ie(this.dataForResize,this.canvas.nativeElement,this.resultsPanel.nativeElement,this.canvasStyles)})}overrideConfig(){_(this.config,"src")&&(this.src=this.config.src),_(this.config,"fps")&&(this.fps=this.config.fps),_(this.config,"vibrate")&&(this.vibrate=this.config.vibrate),_(this.config,"decode")&&(this.decode=this.config.decode),_(this.config,"isBeep")&&(this.isBeep=this.config.isBeep),_(this.config,"constraints")&&(this.constraints=((t,i,e)=>{if(i&&Object.keys(i[t]).length){for(const n in e){const o=JSON.parse(JSON.stringify(Object.assign({},i[t],{[n]:e[n]})));i[t]=i[t].hasOwnProperty(n)?i[t]:o}return i[t]}return e})("constraints",this.config,ne)),_(this.config,"canvasStyles")&&(this.canvasStyles=this.config.canvasStyles)}safariWebRTC(e,n){this.STATUS.startOFF(),this.STATUS.loadingON(),navigator.mediaDevices.getUserMedia(this.constraints).then(o=>{o.getTracks().forEach(r=>r.stop()),this.loadAllDevices(e,n)}).catch(o=>{f(e,!1,o),this.STATUS.startOFF(),this.STATUS.loadingOFF()})}loadAllDevices(e,n){navigator.mediaDevices.enumerateDevices().then(o=>{let r=o.filter(a=>"videoinput"==a.kind);this.devices.next(r),r.length>0?(f(e,r),n?n(r):this.playDevice(r[0].deviceId)):(f(e,!1,"No camera detected."),this.STATUS.startOFF(),this.STATUS.loadingOFF())}).catch(o=>{f(e,!1,o),this.STATUS.startOFF(),this.STATUS.loadingOFF()})}drawImage(e,n=(()=>{})){return U(this,void 0,void 0,function*(){const o=this.canvas.nativeElement,r=o.getContext("2d",{willReadFrequently:!0});e instanceof HTMLImageElement&&(o.width=e.naturalWidth,o.height=e.naturalHeight,e.style.visibility="",this.video.nativeElement.style.visibility="hidden",this.video.nativeElement.style.height=o.offsetHeight+"px"),e instanceof HTMLVideoElement&&(o.width=e.videoWidth,o.height=e.videoHeight,e.style.visibility="",this.canvas.nativeElement.style.visibility="hidden"),r.clearRect(0,0,o.width,o.height),r.drawImage(e,0,0,o.width,o.height);const a=r.getImageData(0,0,o.width,o.height);if(zbarWasm){const l=yield zbarWasm.scanImageData(a);if(l&&l.length){l.forEach(c=>c.value=c.decode(this.decode&&this.decode.toLocaleLowerCase())),ie(l,Object.freeze(this.canvas.nativeElement),this.resultsPanel.nativeElement,this.canvasStyles);const u=()=>{this.eventEmit(l),this.dataForResize=l};e instanceof HTMLImageElement&&(n(!0),u(),ae(this.vibrate),q(this.isBeep)),e instanceof HTMLVideoElement&&(u(),ae(this.vibrate),q(this.isBeep))}else n(!1),se(this.resultsPanel.nativeElement),this.dataForResize=l}else console.error("ngx-scanner-qrcode wasm is not found!"),n(!1)})}eventEmit(e=!1){!1!==e&&this.data.next(e||{data:null}),!1!==e&&this.event.emit(e||{data:null})}requestAnimationFrame(){this.rAF_ID=setInterval(()=>{this.video.nativeElement.readyState===this.video.nativeElement.HAVE_ENOUGH_DATA&&this.drawImage(this.video.nativeElement)},this.fps)}get isReady(){return this.ready}ngOnDestroy(){this.pause()}}return t.\u0275fac=function(e){return new(e||t)(s.Y36(s.Qsj))},t.\u0275cmp=s.Xpm({type:t,selectors:[["ngx-scanner-qrcode"]],viewQuery:function(e,n){if(1&e&&(s.Gf(ve,5),s.Gf(ge,5),s.Gf(Se,5)),2&e){let o;s.iGM(o=s.CRH())&&(n.video=o.first),s.iGM(o=s.CRH())&&(n.canvas=o.first),s.iGM(o=s.CRH())&&(n.resultsPanel=o.first)}},hostAttrs:[1,"ngx-scanner-qrcode"],inputs:{src:"src",fps:"fps",vibrate:"vibrate",decode:"decode",isBeep:"isBeep",config:"config",constraints:"constraints",canvasStyles:"canvasStyles"},outputs:{event:"event"},exportAs:["scanner"],decls:6,vars:0,consts:[[1,"origin-overlay"],["resultsPanel",""],[1,"origin-canvas"],["canvas",""],["playsinline","",1,"origin-video"],["video",""]],template:function(e,n){1&e&&s._UZ(0,"div",0,1)(2,"canvas",2,3)(4,"video",4,5)},styles:[".ngx-scanner-qrcode{display:block;position:relative}.origin-overlay{width:100%;position:absolute}.origin-overlay span{z-index:2;color:red;text-align:left;position:absolute}.origin-overlay .qrcode-polygon{z-index:1;position:absolute}.origin-canvas{width:100%;position:absolute}.origin-video{width:100%;background-color:#262626}.qrcode-tooltip{z-index:3;position:absolute}.qrcode-tooltip:hover .qrcode-tooltip-temp{display:block;position:absolute}.qrcode-tooltip-temp{bottom:0;left:50%;padding:5px;color:#fff;text-align:left;display:none;max-width:450px;border-radius:5px;width:-moz-max-content;width:max-content;word-wrap:break-word;transform:translate(-50%);transform-style:preserve-3d;background-color:#000000d0;box-shadow:1px 1px 20px #000000e0}.qrcode-tooltip-temp .qrcode-tooltip-clipboard{cursor:pointer;margin-left:5px;fill:#fff}.qrcode-tooltip-temp .qrcode-tooltip-clipboard:active{fill:#afafaf}"],encapsulation:2}),t})();const d={ScannerQRCode_NONE:0,ScannerQRCode_PARTIAL:1,ScannerQRCode_EAN2:2,ScannerQRCode_EAN5:5,ScannerQRCode_EAN8:8,ScannerQRCode_UPCE:9,ScannerQRCode_ISBN10:10,ScannerQRCode_UPCA:12,ScannerQRCode_EAN13:13,ScannerQRCode_ISBN13:14,ScannerQRCode_COMPOSITE:15,ScannerQRCode_I25:25,ScannerQRCode_DATABAR:34,ScannerQRCode_DATABAR_EXP:35,ScannerQRCode_CODABAR:38,ScannerQRCode_CODE39:39,ScannerQRCode_PDF417:57,ScannerQRCode_QRCODE:64,ScannerQRCode_SQCODE:80,ScannerQRCode_CODE93:93,ScannerQRCode_CODE128:128,ScannerQRCode_SYMBOL:255,ScannerQRCode_ADDON2:512,ScannerQRCode_ADDON5:1280,ScannerQRCode_ADDON:1792};d[d.ScannerQRCode_NONE]="ScannerQRCode_NONE",d[d.ScannerQRCode_PARTIAL]="ScannerQRCode_PARTIAL",d[d.ScannerQRCode_EAN2]="ScannerQRCode_EAN2",d[d.ScannerQRCode_EAN5]="ScannerQRCode_EAN5",d[d.ScannerQRCode_EAN8]="ScannerQRCode_EAN8",d[d.ScannerQRCode_UPCE]="ScannerQRCode_UPCE",d[d.ScannerQRCode_ISBN10]="ScannerQRCode_ISBN10",d[d.ScannerQRCode_UPCA]="ScannerQRCode_UPCA",d[d.ScannerQRCode_EAN13]="ScannerQRCode_EAN13",d[d.ScannerQRCode_ISBN13]="ScannerQRCode_ISBN13",d[d.ScannerQRCode_COMPOSITE]="ScannerQRCode_COMPOSITE",d[d.ScannerQRCode_I25]="ScannerQRCode_I25",d[d.ScannerQRCode_DATABAR]="ScannerQRCode_DATABAR",d[d.ScannerQRCode_DATABAR_EXP]="ScannerQRCode_DATABAR_EXP",d[d.ScannerQRCode_CODABAR]="ScannerQRCode_CODABAR",d[d.ScannerQRCode_CODE39]="ScannerQRCode_CODE39",d[d.ScannerQRCode_PDF417]="ScannerQRCode_PDF417",d[d.ScannerQRCode_QRCODE]="ScannerQRCode_QRCODE",d[d.ScannerQRCode_SQCODE]="ScannerQRCode_SQCODE",d[d.ScannerQRCode_CODE93]="ScannerQRCode_CODE93",d[d.ScannerQRCode_CODE128]="ScannerQRCode_CODE128",d[d.ScannerQRCode_SYMBOL]="ScannerQRCode_SYMBOL",d[d.ScannerQRCode_ADDON2]="ScannerQRCode_ADDON2",d[d.ScannerQRCode_ADDON5]="ScannerQRCode_ADDON5",d[d.ScannerQRCode_ADDON]="ScannerQRCode_ADDON";const m={ScannerQRCode_CFG_ENABLE:0,ScannerQRCode_CFG_ADD_CHECK:1,ScannerQRCode_CFG_EMIT_CHECK:2,ScannerQRCode_CFG_ASCII:3,ScannerQRCode_CFG_BINARY:4,ScannerQRCode_CFG_NUM:5,ScannerQRCode_CFG_MIN_LEN:32,ScannerQRCode_CFG_MAX_LEN:33,ScannerQRCode_CFG_UNCERTAINTY:64,ScannerQRCode_CFG_POSITION:128,ScannerQRCode_CFG_TEST_INVERTED:129,ScannerQRCode_CFG_X_DENSITY:256,ScannerQRCode_CFG_Y_DENSITY:257};m[m.ScannerQRCode_CFG_ENABLE]="ScannerQRCode_CFG_ENABLE",m[m.ScannerQRCode_CFG_ADD_CHECK]="ScannerQRCode_CFG_ADD_CHECK",m[m.ScannerQRCode_CFG_EMIT_CHECK]="ScannerQRCode_CFG_EMIT_CHECK",m[m.ScannerQRCode_CFG_ASCII]="ScannerQRCode_CFG_ASCII",m[m.ScannerQRCode_CFG_BINARY]="ScannerQRCode_CFG_BINARY",m[m.ScannerQRCode_CFG_NUM]="ScannerQRCode_CFG_NUM",m[m.ScannerQRCode_CFG_MIN_LEN]="ScannerQRCode_CFG_MIN_LEN",m[m.ScannerQRCode_CFG_MAX_LEN]="ScannerQRCode_CFG_MAX_LEN",m[m.ScannerQRCode_CFG_UNCERTAINTY]="ScannerQRCode_CFG_UNCERTAINTY",m[m.ScannerQRCode_CFG_POSITION]="ScannerQRCode_CFG_POSITION",m[m.ScannerQRCode_CFG_TEST_INVERTED]="ScannerQRCode_CFG_TEST_INVERTED",m[m.ScannerQRCode_CFG_X_DENSITY]="ScannerQRCode_CFG_X_DENSITY",m[m.ScannerQRCode_CFG_Y_DENSITY]="ScannerQRCode_CFG_Y_DENSITY";const T={ScannerQRCode_ORIENT_UNKNOWN:-1,ScannerQRCode_ORIENT_UP:0,ScannerQRCode_ORIENT_RIGHT:1,ScannerQRCode_ORIENT_DOWN:2,ScannerQRCode_ORIENT_LEFT:3};T[T.ScannerQRCode_ORIENT_UNKNOWN]="ScannerQRCode_ORIENT_UNKNOWN",T[T.ScannerQRCode_ORIENT_UP]="ScannerQRCode_ORIENT_UP",T[T.ScannerQRCode_ORIENT_RIGHT]="ScannerQRCode_ORIENT_RIGHT",T[T.ScannerQRCode_ORIENT_DOWN]="ScannerQRCode_ORIENT_DOWN",T[T.ScannerQRCode_ORIENT_LEFT]="ScannerQRCode_ORIENT_LEFT";let xe=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=s.oAB({type:t}),t.\u0275inj=s.cJS({providers:[b]}),t})();var Ne=C(1009),Fe=C(805),Ie=C(9219),De=C(6474),le=C(5593),de=C(2453);function Pe(t,i){1&t&&(s.TgZ(0,"p",12),s._uU(1,"\u231b Cargando..."),s.qZA())}const B=function(){return{width:"50px",height:"50px"}},Me=[{path:"ver-asistencias",component:ue},{path:"llenar-asistencias",component:(()=>{class t{constructor(e,n,o){this.qrcode=e,this.eventosService=n,this.messageService=o,this.API_URI=pe.N.API_URI,this.inforCardDescription="\n  Llenar Asistencia' brinda la capacidad de registrar la asistencia a eventos en tiempo real. Utilizando c\xf3digos QR enviados a los usuarios, esta funci\xf3n agiliza el proceso de confirmaci\xf3n de asistencia, permitiendo un seguimiento preciso y una gesti\xf3n eficiente de la participaci\xf3n en cada actividad.\n  ",this.token="",this.currentQr="",this.banderaBtnConfirmQr=!0,this.selectedFiles=[],this.config={isAuto:!0,text:{font:"25px serif"},frame:{lineWidth:8},medias:{audio:!1,video:{facingMode:"environment",width:{ideal:1280},height:{ideal:720}}}}}ngOnInit(){this.token=localStorage.getItem("token")}onError(e){alert(e)}handle(e,n){e[n]().subscribe(console.log,console.error)}onSelects(e){this.qrcode.loadFiles(e).subscribe(n=>{this.selectedFiles=n.filter(o=>o.url),console.log(n)})}confirmQr(e,n){this.banderaBtnConfirmQr=!0,console.log(n);try{this.eventosService.get(e,this.token).subscribe(o=>{if("Ok"!==o.data.message)return this.messageService.add({severity:"warn",summary:"Warn",detail:"Algo salio mal"});this.messageService.add({severity:"success",summary:"Success",detail:"Confirmacion exitosa"})})}catch(o){console.log("Error en consulta",o),this.messageService.add({severity:"error",summary:"Error",detail:"Error del servidor"})}}verifyConfirm(e){return e.length<=0||(this.currentQr!==e[0].value&&(this.banderaBtnConfirmQr=!1),this.currentQr=e[0].value),this.banderaBtnConfirmQr}}return t.\u0275fac=function(e){return new(e||t)(s.Y36(b),s.Y36(Ne.S),s.Y36(Fe.ez))},t.\u0275cmp=s.Xpm({type:t,selectors:[["app-llenar"]],decls:15,vars:25,consts:[["titulo","Confirmaci\xf3n de Asistencia"],["card-body","",1,"grid","flex","justify-content-center"],[3,"description"],[1,"col-12","md:col-12","lg:col-12","flex","justify-content-center"],[3,"config","error"],["action","scanner"],["class","text-center",4,"ngIf"],["pButton","","type","button","label","Confirmar asistencia",3,"disabled","click"],["pButton","","pRipple","","type","button","icon","pi pi-power-off",1,"m-3",3,"disabled","click"],["pButton","","pRipple","","type","button","icon","pi pi-pause",1,"m-3","p-button-warning",3,"disabled","click"],["pButton","","pRipple","","type","button","icon","pi pi-play",1,"m-3","p-button-secondary",3,"disabled","click"],["pButton","","pRipple","","type","button","icon","pi pi-image",1,"m-3","p-button-help",3,"disabled","click"],[1,"text-center"]],template:function(e,n){if(1&e){const o=s.EpF();s.TgZ(0,"app-card",0)(1,"div",1),s._UZ(2,"app-custom-info-card",2),s.TgZ(3,"div",3)(4,"ngx-scanner-qrcode",4,5),s.NdJ("error",function(a){return n.onError(a)}),s.qZA()(),s.YNc(6,Pe,2,0,"p",6),s.TgZ(7,"div",3)(8,"button",7),s.NdJ("click",function(){s.CHM(o);const a=s.MAs(5);return s.KtG(n.confirmQr(a.data.value[0].value,a))}),s.qZA()(),s.TgZ(9,"div",3)(10,"button",8),s.NdJ("click",function(){s.CHM(o);const a=s.MAs(5);return s.KtG(n.handle(a,a.isStart?"stop":"start"))}),s.qZA(),s.TgZ(11,"button",9),s.NdJ("click",function(){s.CHM(o);const a=s.MAs(5);return s.KtG(n.handle(a,"pause"))}),s.qZA(),s.TgZ(12,"button",10),s.NdJ("click",function(){s.CHM(o);const a=s.MAs(5);return s.KtG(n.handle(a,"play"))}),s.qZA(),s.TgZ(13,"button",11),s.NdJ("click",function(){s.CHM(o);const a=s.MAs(5);return s.KtG(a.download("ngx-scanner-qrcode"))}),s.qZA()()()(),s._UZ(14,"p-toast")}if(2&e){const o=s.MAs(5);s.xp6(2),s.Q6J("description",n.inforCardDescription),s.xp6(2),s.Q6J("config",n.config),s.xp6(2),s.Q6J("ngIf",o.isLoading),s.xp6(2),s.Q6J("disabled",n.verifyConfirm(o.data.value)),s.xp6(2),s.Akn(s.DdM(21,B)),s.Tol(o.isStart?"p-button-danger":"p-button-success"),s.Q6J("disabled",o.isLoading),s.xp6(1),s.Akn(s.DdM(22,B)),s.Q6J("disabled",o.isLoading)("disabled",!o.isStart),s.xp6(1),s.Akn(s.DdM(23,B)),s.Q6J("disabled",o.isLoading)("disabled",!o.isStart),s.xp6(1),s.Akn(s.DdM(24,B)),s.Q6J("disabled",o.isLoading)("disabled",!o.isStart)}},dependencies:[J.O5,Ie.A,De.t,Qe,le.Hq,de.FN],styles:["@media only screen and (min-width: 320px){ngx-scanner-qrcode[_ngcontent-%COMP%]{width:100%}}@media only screen and (min-width: 768px){ngx-scanner-qrcode[_ngcontent-%COMP%]{width:100%}}@media only screen and (min-width: 1280px){ngx-scanner-qrcode[_ngcontent-%COMP%]{max-width:800px}}"]}),t})()}];let Le=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=s.oAB({type:t}),t.\u0275inj=s.cJS({imports:[X.Bz.forChild(Me),X.Bz]}),t})();var Ue=C(4466);let ke=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=s.oAB({type:t}),t.\u0275inj=s.cJS({imports:[J.ez,Le,Ue.m,xe,le.hJ,de.EV]}),t})()}}]);