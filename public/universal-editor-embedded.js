(()=>{var e,t,n,r,o,a,i,l;(t=e||(e={})).Call="call",t.Reply="reply",t.Syn="syn",t.SynAck="synAck",t.Ack="ack",(r=n||(n={})).Fulfilled="fulfilled",r.Rejected="rejected",(a=o||(o={})).ConnectionDestroyed="ConnectionDestroyed",a.ConnectionTimeout="ConnectionTimeout",a.NoIframeSrc="NoIframeSrc",(i||(i={})).DataCloneError="DataCloneError",(l||(l={})).Message="message";const s=({name:e,message:t,stack:n})=>({name:e,message:t,stack:n});var c=(t,r,o)=>{const{localName:a,local:c,remote:d,originForSending:u,originForReceiving:p}=t;let m=!1;const f=t=>{if(t.source!==d||t.data.penpal!==e.Call)return;if("*"!==p&&t.origin!==p)return void o(`${a} received message from origin ${t.origin} which did not match expected origin ${p}`);const l=t.data,{methodName:c,args:f,id:y}=l;o(`${a}: Received ${c}() call`);const g=t=>r=>{if(o(`${a}: Sending ${c}() reply`),m)return void o(`${a}: Unable to send ${c}() reply due to destroyed connection`);const l={penpal:e.Reply,id:y,resolution:t,returnValue:r};t===n.Rejected&&r instanceof Error&&(l.returnValue=s(r),l.returnValueIsError=!0);try{d.postMessage(l,u)}catch(t){if(t.name===i.DataCloneError){const r={penpal:e.Reply,id:y,resolution:n.Rejected,returnValue:s(t),returnValueIsError:!0};d.postMessage(r,u)}throw t}};new Promise((e=>e(r[c].apply(r,f)))).then(g(n.Fulfilled),g(n.Rejected))};return c.addEventListener(l.Message,f),()=>{m=!0,c.removeEventListener(l.Message,f)}};let d=0;const u=e=>e?e.split("."):[],p=(e,t,n)=>{const r=u(t);return r.reduce(((e,t,o)=>(void 0===e[t]&&(e[t]={}),o===r.length-1&&(e[t]=n),e[t])),e),e},m=(e,t)=>{const n={};return Object.keys(e).forEach((r=>{const o=e[r],a=((e,t)=>{const n=u(t||"");return n.push(e),(e=>e.join("."))(n)})(r,t);"object"==typeof o&&Object.assign(n,m(o,a)),"function"==typeof o&&(n[a]=o)})),n},f=e=>{const t={};for(const n in e)p(t,n,e[n]);return t};var y,g=(t,r,a,i,s)=>{const{localName:c,local:u,remote:p,originForSending:m,originForReceiving:y}=r;let g=!1;s(`${c}: Connecting call sender`);const h=t=>(...r)=>{let a;s(`${c}: Sending ${t}() call`);try{p.closed&&(a=!0)}catch(e){a=!0}if(a&&i(),g){const e=new Error(`Unable to send ${t}() call due to destroyed connection`);throw e.code=o.ConnectionDestroyed,e}return new Promise(((o,a)=>{const i=++d,f=r=>{if(r.source!==p||r.data.penpal!==e.Reply||r.data.id!==i)return;if("*"!==y&&r.origin!==y)return void s(`${c} received message from origin ${r.origin} which did not match expected origin ${y}`);const d=r.data;s(`${c}: Received ${t}() reply`),u.removeEventListener(l.Message,f);let m=d.returnValue;d.returnValueIsError&&(m=(e=>{const t=new Error;return Object.keys(e).forEach((n=>t[n]=e[n])),t})(m)),(d.resolution===n.Fulfilled?o:a)(m)};u.addEventListener(l.Message,f);const g={penpal:e.Call,id:i,methodName:t,args:r};p.postMessage(g,m)}))},v=a.reduce(((e,t)=>(e[t]=h(t),e)),{});return Object.assign(t,f(v)),()=>{g=!0}},h=(e,t)=>{let n;return void 0!==e&&(n=window.setTimeout((()=>{const n=new Error(`Connection timed out after ${e}ms`);n.code=o.ConnectionTimeout,t(n)}),e)),()=>{clearTimeout(n)}},v=(t,n,r,o)=>{const{destroy:a,onDestroy:i}=r;return r=>{if(!(t instanceof RegExp?t.test(r.origin):"*"===t||t===r.origin))return void o(`Child: Handshake - Received SYN-ACK from origin ${r.origin} which did not match expected origin ${t}`);o("Child: Handshake - Received SYN-ACK, responding with ACK");const l="null"===r.origin?"*":r.origin,s={penpal:e.Ack,methodNames:Object.keys(n)};window.parent.postMessage(s,l);const d={localName:"Child",local:window,remote:window.parent,originForSending:l,originForReceiving:r.origin},u=c(d,n,o);i(u);const p={},m=g(p,d,r.data.methodNames,a,o);return i(m),p}},E=(t={})=>{const{parentOrigin:n="*",methods:r={},timeout:o,debug:a=!1}=t,i=(e=>(...t)=>{e&&console.log("[Penpal]",...t)})(a),s=((e,t)=>{const n=[];let r=!1;return{destroy(o){r||(r=!0,t(`${e}: Destroying connection`),n.forEach((e=>{e(o)})))},onDestroy(e){r?e():n.push(e)}}})("Child",i),{destroy:c,onDestroy:d}=s,u=m(r),p=v(n,u,s,i);return{promise:new Promise(((t,r)=>{const a=h(o,c),s=n=>{if((()=>{try{clearTimeout()}catch(e){return!1}return!0})()&&n.source===parent&&n.data&&n.data.penpal===e.SynAck){const e=p(n);e&&(window.removeEventListener(l.Message,s),a(),t(e))}};window.addEventListener(l.Message,s),(()=>{i("Child: Handshake - Sending SYN");const t={penpal:e.Syn},r=n instanceof RegExp?"*":n;window.parent.postMessage(t,r)})(),d((e=>{window.removeEventListener(l.Message,s),e&&r(e)}))})),destroy(){c()}}},b={};function w(e,t,n){var r,o,a,i,l;function s(){var c=Date.now()-i;c<t&&c>=0?r=setTimeout(s,t-c):(r=null,n||(l=e.apply(a,o),a=o=null))}null==t&&(t=100);var c=function(){a=this,o=arguments,i=Date.now();var c=n&&!r;return r||(r=setTimeout(s,t)),c&&(l=e.apply(a,o),a=o=null),l};return c.clear=function(){r&&(clearTimeout(r),r=null)},c.flush=function(){r&&(l=e.apply(a,o),a=o=null,clearTimeout(r),r=null)},c}w.debounce=w,y=w;for(var T=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,R=function(e){return"string"==typeof e&&T.test(e)},$=[],C=0;C<256;++C)$.push((C+256).toString(16).substr(1));function S(e,t,n,r){switch(e){case 0:return t&n^~t&r;case 1:case 3:return t^n^r;case 2:return t&n^t&r^n&r}}function A(e,t){return e<<t|e>>>32-t}var P,L,O=function(e,t,n){function r(e,t,n,r){if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e));for(var t=[],n=0;n<e.length;++n)t.push(e.charCodeAt(n));return t}(e)),"string"==typeof t&&(t=function(e){if(!R(e))throw TypeError("Invalid UUID");var t,n=new Uint8Array(16);return n[0]=(t=parseInt(e.slice(0,8),16))>>>24,n[1]=t>>>16&255,n[2]=t>>>8&255,n[3]=255&t,n[4]=(t=parseInt(e.slice(9,13),16))>>>8,n[5]=255&t,n[6]=(t=parseInt(e.slice(14,18),16))>>>8,n[7]=255&t,n[8]=(t=parseInt(e.slice(19,23),16))>>>8,n[9]=255&t,n[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,n[11]=t/4294967296&255,n[12]=t>>>24&255,n[13]=t>>>16&255,n[14]=t>>>8&255,n[15]=255&t,n}(t)),16!==t.length)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");var o=new Uint8Array(16+e.length);if(o.set(t),o.set(e,t.length),(o=function(e){var t=[1518500249,1859775393,2400959708,3395469782],n=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof e){var r=unescape(encodeURIComponent(e));e=[];for(var o=0;o<r.length;++o)e.push(r.charCodeAt(o))}else Array.isArray(e)||(e=Array.prototype.slice.call(e));e.push(128);for(var a=e.length/4+2,i=Math.ceil(a/16),l=new Array(i),s=0;s<i;++s){for(var c=new Uint32Array(16),d=0;d<16;++d)c[d]=e[64*s+4*d]<<24|e[64*s+4*d+1]<<16|e[64*s+4*d+2]<<8|e[64*s+4*d+3];l[s]=c}l[i-1][14]=8*(e.length-1)/Math.pow(2,32),l[i-1][14]=Math.floor(l[i-1][14]),l[i-1][15]=8*(e.length-1)&4294967295;for(var u=0;u<i;++u){for(var p=new Uint32Array(80),m=0;m<16;++m)p[m]=l[u][m];for(var f=16;f<80;++f)p[f]=A(p[f-3]^p[f-8]^p[f-14]^p[f-16],1);for(var y=n[0],g=n[1],h=n[2],v=n[3],E=n[4],b=0;b<80;++b){var w=Math.floor(b/20),T=A(y,5)+S(w,g,h,v)+E+t[w]+p[b]>>>0;E=v,v=h,h=A(g,30)>>>0,g=y,y=T}n[0]=n[0]+y>>>0,n[1]=n[1]+g>>>0,n[2]=n[2]+h>>>0,n[3]=n[3]+v>>>0,n[4]=n[4]+E>>>0}return[n[0]>>24&255,n[0]>>16&255,n[0]>>8&255,255&n[0],n[1]>>24&255,n[1]>>16&255,n[1]>>8&255,255&n[1],n[2]>>24&255,n[2]>>16&255,n[2]>>8&255,255&n[2],n[3]>>24&255,n[3]>>16&255,n[3]>>8&255,255&n[3],n[4]>>24&255,n[4]>>16&255,n[4]>>8&255,255&n[4]]}(o))[6]=15&o[6]|80,o[8]=63&o[8]|128,n){r=r||0;for(var a=0;a<16;++a)n[r+a]=o[a];return n}return function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=($[e[t+0]]+$[e[t+1]]+$[e[t+2]]+$[e[t+3]]+"-"+$[e[t+4]]+$[e[t+5]]+"-"+$[e[t+6]]+$[e[t+7]]+"-"+$[e[t+8]]+$[e[t+9]]+"-"+$[e[t+10]]+$[e[t+11]]+$[e[t+12]]+$[e[t+13]]+$[e[t+14]]+$[e[t+15]]).toLowerCase();if(!R(n))throw TypeError("Stringified UUID is invalid");return n}(o)}try{r.name="v5"}catch(e){}return r.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",r.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",r}();(L=P||(P={})).ID="itemID",L.TYPE="itemType",L.SCOPE="itemScope",L.PROP="itemProp";const I={UUID:"id",ID:P.ID.toLowerCase(),TYPE:P.TYPE.toLowerCase(),SCOPE:P.SCOPE.toLowerCase(),PROP:P.PROP.toLowerCase(),PARENTID:"parentid",EDITOR_BEHAVIOR:"data-editor-behavior"},M="universal-editor-message-bus.herokuapp.com",_="/gql",D="urn:auecon:",U={USER_INPUT_RELAY_MESSAGE:"REMOTE_APP_USER_INPUT",DEMO_APP_HOST:"ue-remote-app.adobe.net/?authorHost=https://author-p15902-e145656-cmstg.adobeaemcloud.com&publishHost=https://publish-p15902-e145656-cmstg.adobeaemcloud.com",GRAPHQL_HOST:M,GRAPHQL_PORT_PUBLIC:443,GRAPHQL_PORT_LOCAL:4e3,GRAPHQL_PATH:_,GRAPHQL_URL:`${M}:443${_}`,EDITABLE_SELECTOR:`[${I.TYPE}]`,CANVAS_PATH:"/canvas",PARENT_SELECTOR:`[${I.SCOPE}][${I.ID}]`,URN_PREFIX:D,META_SELECTOR:`meta[name^='${D}']`,DEMO_APP_HOST_PROD:"ue-remote-app.adobe.net",FRAGMENT_TYPE:"reference",UNIFIED_SHELL_STAGE:"https://experience-stage.adobe.com",UNIFIED_SHELL_PROD:"https://experience.adobe.com",HEADLESS_CF_EDITOR_URL:"#/aem/cf/editor/editor",CONTAINER_SELECTOR:`[${I.TYPE}=container]`,COMPONENT_ITEM_TYPE:"component"};var N=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;const k=[];for(let e=0;e<256;++e)k.push((e+256).toString(16).slice(1));var x=function(e){if(!function(e){return"string"==typeof e&&N.test(e)}(e))throw TypeError("Invalid UUID");let t;const n=new Uint8Array(16);return n[0]=(t=parseInt(e.slice(0,8),16))>>>24,n[1]=t>>>16&255,n[2]=t>>>8&255,n[3]=255&t,n[4]=(t=parseInt(e.slice(9,13),16))>>>8,n[5]=255&t,n[6]=(t=parseInt(e.slice(14,18),16))>>>8,n[7]=255&t,n[8]=(t=parseInt(e.slice(19,23),16))>>>8,n[9]=255&t,n[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,n[11]=t/4294967296&255,n[12]=t>>>24&255,n[13]=t>>>16&255,n[14]=t>>>8&255,n[15]=255&t,n};function H(e,t,n,r){switch(e){case 0:return t&n^~t&r;case 1:case 3:return t^n^r;case 2:return t&n^t&r^n&r}}function F(e,t){return e<<t|e>>>32-t}function B(e,t){return Object.keys(t).forEach((function(n){"default"===n||"__esModule"===n||e.hasOwnProperty(n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})),e}function V(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}!function(e,t,n){function r(e,t,n,r){var o;if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e));const t=[];for(let n=0;n<e.length;++n)t.push(e.charCodeAt(n));return t}(e)),"string"==typeof t&&(t=x(t)),16!==(null===(o=t)||void 0===o?void 0:o.length))throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let a=new Uint8Array(16+e.length);if(a.set(t),a.set(e,t.length),a=function(e){const t=[1518500249,1859775393,2400959708,3395469782],n=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof e){const t=unescape(encodeURIComponent(e));e=[];for(let n=0;n<t.length;++n)e.push(t.charCodeAt(n))}else Array.isArray(e)||(e=Array.prototype.slice.call(e));e.push(128);const r=e.length/4+2,o=Math.ceil(r/16),a=new Array(o);for(let t=0;t<o;++t){const n=new Uint32Array(16);for(let r=0;r<16;++r)n[r]=e[64*t+4*r]<<24|e[64*t+4*r+1]<<16|e[64*t+4*r+2]<<8|e[64*t+4*r+3];a[t]=n}a[o-1][14]=8*(e.length-1)/Math.pow(2,32),a[o-1][14]=Math.floor(a[o-1][14]),a[o-1][15]=8*(e.length-1)&4294967295;for(let e=0;e<o;++e){const r=new Uint32Array(80);for(let t=0;t<16;++t)r[t]=a[e][t];for(let e=16;e<80;++e)r[e]=F(r[e-3]^r[e-8]^r[e-14]^r[e-16],1);let o=n[0],i=n[1],l=n[2],s=n[3],c=n[4];for(let e=0;e<80;++e){const n=Math.floor(e/20),a=F(o,5)+H(n,i,l,s)+c+t[n]+r[e]>>>0;c=s,s=l,l=F(i,30)>>>0,i=o,o=a}n[0]=n[0]+o>>>0,n[1]=n[1]+i>>>0,n[2]=n[2]+l>>>0,n[3]=n[3]+s>>>0,n[4]=n[4]+c>>>0}return[n[0]>>24&255,n[0]>>16&255,n[0]>>8&255,255&n[0],n[1]>>24&255,n[1]>>16&255,n[1]>>8&255,255&n[1],n[2]>>24&255,n[2]>>16&255,n[2]>>8&255,255&n[2],n[3]>>24&255,n[3]>>16&255,n[3]>>8&255,255&n[3],n[4]>>24&255,n[4]>>16&255,n[4]>>8&255,255&n[4]]}(a),a[6]=15&a[6]|80,a[8]=63&a[8]|128,n){r=r||0;for(let e=0;e<16;++e)n[r+e]=a[e];return n}return function(e,t=0){return(k[e[t+0]]+k[e[t+1]]+k[e[t+2]]+k[e[t+3]]+"-"+k[e[t+4]]+k[e[t+5]]+"-"+k[e[t+6]]+k[e[t+7]]+"-"+k[e[t+8]]+k[e[t+9]]+"-"+k[e[t+10]]+k[e[t+11]]+k[e[t+12]]+k[e[t+13]]+k[e[t+14]]+k[e[t+15]]).toLowerCase()}(a)}try{r.name="v5"}catch(e){}r.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",r.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8"}();var Y={};V(Y,"routines",(()=>Z));const j={element:window.document},K=150,G=e=>{const t=e.closest(U.PARENT_SELECTOR);return(null==t?void 0:t.getAttribute(I.ID))||""},q=e=>{const t=e.getAttribute(I.TYPE)||"",n=e.getAttribute(I.ID)||void 0,r=e.getAttribute(I.PROP)||void 0,o=t===U.COMPONENT_ITEM_TYPE||e.getAttribute(I.EDITOR_BEHAVIOR)===U.COMPONENT_ITEM_TYPE,a=!n&&r?G(e):"",i=o&&n?(e=>{const t=e.closest(U.CONTAINER_SELECTOR),n=null==t?void 0:t.getAttribute(I.ID);if(n)return O(`${n}`,O.URL);const r=null==t?void 0:t.getAttribute(I.PROP),o=t&&G(t);return r&&o?O(`${o}_${r}`,O.URL):""})(e):"",l=O(`${n||a}${r?`_${r}`:""}`,O.URL),s=t||"Component";return{rect:e.getBoundingClientRect(),offsetTop:e.offsetTop,itemtype:t,label:s,id:l,itemid:n,itemprop:r,containerid:i,parentid:a}},z={viewport:{width:0,height:0},frame:{width:0,height:0},scroll:{x:0,y:0}},Q=({editor:e})=>{null==e||e.updateFrameDetails({details:z})},W=({target:e})=>{const t=e.documentElement;z.scroll.x=t.scrollLeft,z.scroll.y=t.scrollTop},X=({target:e})=>{const t=Math.max(e.document.documentElement.clientWidth||0,e.innerWidth||0),n=Math.max(e.document.documentElement.clientHeight||0,e.innerHeight||0),{width:r,height:o}=e.document.documentElement.getBoundingClientRect();z.viewport={width:t,height:n},z.frame={width:Math.ceil(r),height:Math.ceil(o)}},Z={discoverFonts:({editor:e})=>{const t=[];[...document.styleSheets].forEach((e=>{try{const{cssRules:n}=e;[...n].find((e=>e instanceof CSSFontFaceRule))&&e.href&&t.push(e.href)}catch(n){e.href&&t.push(e.href)}})),e.addCustomFonts(t)},observeEditables:({editor:e})=>{const t=j.element,n=(0,y.debounce)((()=>{const n=(e=>{const{scrollLeft:t,scrollTop:n}=e.documentElement,r=e.querySelectorAll(U.EDITABLE_SELECTOR)||[],o={editables:[],offset:{x:t,y:n},selected:{}};return r.forEach((e=>{const t=q(e);o.editables.push(t)})),o})(t);e.repaintEditables({editables:n})}),K);n(),window.removeEventListener("resize",n),window.addEventListener("resize",n),(({element:e,callback:t})=>{const n=new MutationObserver(t);n.observe(e,{attributes:!0,characterData:!0,childList:!0,subtree:!0,attributeOldValue:!0,characterDataOldValue:!0}),n.disconnect})({element:t,callback:n})},observeFrame:({editor:e})=>{const t=window;t.document.addEventListener("scroll",(({target:t})=>{W({target:t}),Q({editor:e})})),t.addEventListener("resize",(0,y.debounce)((({target:t})=>{X({target:t}),Q({editor:e})}),K)),t.addEventListener("orientationchange",(0,y.debounce)((({target:n})=>{W({target:t.document}),X({target:n}),Q({editor:e})}),K));const n=(0,y.debounce)((()=>{X({target:t}),Q({editor:e})}),K);new ResizeObserver(n).observe(t.document.body),requestAnimationFrame((()=>{W({target:t.document}),X({target:t}),Q({editor:e})}))},relayNavigation:({editor:e})=>{document.addEventListener("click",(t=>(({event:e,editor:t})=>{const n=e.target.closest("A");n&&(e.preventDefault(),t.navigateTo({href:n.href}))})({event:t,editor:e})),{capture:!0})},relayUserInputs:()=>{window.addEventListener("keydown",(({type:e,key:t,altKey:n,metaKey:r,shiftKey:o,ctrlKey:a})=>{const i={type:e,key:t,altKey:n,metaKey:r,shiftKey:o,ctrlKey:a};parent.postMessage({type:U.USER_INPUT_RELAY_MESSAGE,value:i},"*")}))}};var J={},ee={};let te;V(ee,"handleMouseMove",(()=>ne)),V(ee,"handleClick",(()=>re)),V(ee,"handleKeyUp",(()=>oe));const ne=e=>{const t=Ee(e,te);if(t){const e=t.shift();if(e){(null==e?void 0:e.itemid)||(null==e?void 0:e.parentid)?(he(e,"overlay"),"reference"!==e.itemtype&&"container"!==e.itemtype||he(e,"parent")):he(null,"overlay");const n=null==t?void 0:t.find((e=>"reference"===e.itemtype||"container"===e.itemtype));n&&((null==n?void 0:n.itemid)||(null==n?void 0:n.parentid))?he(n,"parent"):he(null,"parent")}else he(null,"overlay"),he(null,"parent")}},re=(e,t)=>{const n=Ee(e,te);if(n){const e=n[0];(null==e?void 0:e.itemid)||(null==e?void 0:e.parentid)?(he(e,"selected"),te=e,t.handleEditableClick(e)):(he(null,"selected"),te=null,t.handleEditableClick(null))}},oe=(e,t)=>{console.log("e.key",e.key)};var ae={};V(ae,"SELECTORS",(()=>ie)),V(ae,"setupUEOverlay",(()=>le));const ie={overlay:"#universal-editor-overlay-hover",parent:"#universal-editor-overlay-parent",selected:"#universal-editor-overlay-selected",overlayStyle:"#universal-editor-overlay-hover-style",parentStyle:"#universal-editor-overlay-parent-style",selectedStyle:"#universal-editor-overlay-selected-style"},le=({editor:e})=>{const t=document.createElement("div"),n=document.createElement("div"),r=document.createElement("div"),o=document.createElement("style"),a=document.createElement("style"),i=document.createElement("style");t.id=ie.overlay.replace("#",""),n.id=ie.parent.replace("#",""),r.id=ie.selected.replace("#",""),o.id=ie.overlayStyle.replace("#",""),a.id=ie.parentStyle.replace("#",""),i.id=ie.selectedStyle.replace("#",""),o.innerHTML=ge.overlay,a.innerHTML=ge.parent,i.innerHTML=ge.selected,document.body.appendChild(t),document.body.appendChild(n),document.body.appendChild(r),document.head.appendChild(o),document.head.appendChild(a),document.head.appendChild(i),window.addEventListener("mousemove",(e=>(0,y.debounce)(ne(e),K))),window.addEventListener("click",(t=>re(t,e))),window.addEventListener("keyup",(t=>oe(t,e)))};var se,ce,de={};V(de,"overlayStyles",(()=>me)),V(de,"overlayParentStyles",(()=>fe)),V(de,"overlaySelectedStyles",(()=>ye)),V(de,"STYLES",(()=>ge)),V(de,"updateOverlay",(()=>he)),(ce=se||(se={}))[ce.hover=9999999]="hover",ce[ce.parent=999999]="parent",ce[ce.selected=9999]="selected";const ue=(e,t="--aem-overlay-color",n)=>`\n  content: "";\n  position: absolute;\n  z-index: ${n};\n  border: ${e}px solid var(${t});\n  top: -100%;\n  left: -100%;\n`,pe=(e,t="--aem-overlay-color")=>`\n  position: absolute;\n  height: 2rem;\n  line-height: 2rem;\n  padding: 0 0.5rem;\n  background: var(${t});\n  font-family: Adobe Clean, sans-serif;\n  color: #fff;\n  top: -100%;\n  left: -100%;\n  z-index: ${e};\n`,me=`\n:root {\n  --aem-overlay-color: rgba(56, 146, 243, 1);\n  --aem-overlay-parent-color: rgba(56, 146, 243, 0.2);\n  --aem-overlay-selected-color: rgba(2, 101, 220, 1);\n  --aem-overlay-image-color: rgba(89, 167, 246, 0.16);\n}\n\n${ie.overlay}:before {\n  ${ue(1,"--aem-overlay-color",se.hover)}\n}\n\n${ie.overlay}:after {\n  ${pe(se.hover)}\n}`,fe=`\n${ie.parent}:before {\n  ${ue(5,"--aem-overlay-parent-color",se.parent)}\n  margin: -5px;\n}\n\n${ie.parent}:after {\n  ${pe(se.parent)}\n}`,ye=`\n${ie.selected}:before {\n  ${ue(1,"--aem-overlay-selected-color",se.selected)}\n}\n\n${ie.selected}:after {\n  ${pe(se.selected,"--aem-overlay-selected-color")}\n}`,ge={overlay:me,parent:fe,selected:ye},he=(e,t="overlay")=>{let n=ge[t];const r=document.querySelector(ie[`${t}Style`]),o=window.innerHeight,a=window.innerWidth,i=ie[t];if(e){const t=e.rect;let r=t.width,l=t.height,s="- 2rem",c="4px 4px 0 0";l>o&&(l=o-3,s="+ 0px",c="0 0 4px 0"),r>a&&(r=a-3),n+=`${i}:before {\n      top: ${t.top+window.pageYOffset}px;\n      left: ${t.left+window.pageXOffset}px;\n      height: ${l}px;\n      width: ${r}px;\n      background-color: ${"image"===e.itemtype?"var(--aem-overlay-image-color)":"transparent"};\n    }`,n+=`${i}:after {\n      content: "${e.label||e.itemtype}";\n      top: calc(${t.top+window.pageYOffset}px ${s});\n      left: ${t.left+window.pageXOffset}px;\n      border-radius: ${c};\n    }`}r&&(r.innerHTML=n)};var ve={};V(ve,"getEditablesFromPoint",(()=>Ee));const Ee=(e,t)=>{var n,r;const{x:o,y:a,ctrlKey:i,metaKey:l}=e;let s;s=i||l?U.EDITABLE_SELECTOR:(null==t?void 0:t.selector)?`${t.selector} ${U.EDITABLE_SELECTOR},${t.selector} ${U.PARENT_SELECTOR}`:`${U.PARENT_SELECTOR}, ${U.EDITABLE_SELECTOR}:not(${U.PARENT_SELECTOR} ${U.EDITABLE_SELECTOR})`;const c=null===(r=null===(n=document.elementsFromPoint(o,a))||void 0===n?void 0:n.filter((e=>e.matches(s))))||void 0===r?void 0:r.sort(((e,t)=>{const n=e.getBoundingClientRect(),r=t.getBoundingClientRect();return n.width*n.height-r.width*r.height}));return void 0===c?null:c.map((e=>{const t=e,n=q(t);return{...n,...Se(t),selector:n.itemid?`[${I.ID}="${n.itemid}"]`:`[${I.ID}="${n.parentid}"] [${I.TYPE}="${n.itemtype}"]`}}))};B(J,ee),B(J,ae),B(J,de),B(J,ve),B(b,Y),B(b,J);var be=function(e){var t,n=new Set,r=function(e,r){var o="function"==typeof e?e(t):e;if(!Object.is(o,t)){var a=t;t=(null!=r?r:"object"!=typeof o)?o:Object.assign({},t,o),n.forEach((function(e){return e(t,a)}))}},o=function(){return t},a={setState:r,getState:o,subscribe:function(e){return n.add(e),function(){return n.delete(e)}},destroy:function(){return n.clear()}};return t=e(r,o,a),a};const we=({set:e},{mode:t})=>{e((e=>({...e,mode:t,isInEditor:"in-editor"===t})))},Te=function(e){return e&&e.__esModule?e.default:e}((function(e){return e?be(e):be}))(((e,t)=>({mode:"regular",isInEditor:!1,setMode:we.bind(null,{get:t,set:e})}))),Re={isInEditor:()=>Te.getState().isInEditor},$e="rgba(0, 0, 0, 0)",Ce=e=>{const t=window.getComputedStyle(e).backgroundColor,n=e.parentElement;return t===$e&&n?Ce(n):t},Se=e=>{const t=window.getComputedStyle(e),n=Ce(e),r=n!==$e?`${t.getPropertyValue("font-size")} ${t.getPropertyValue("font-family")}`:"";return{content:e.innerText,htmlContent:e.innerHTML,style:{font:t.getPropertyValue("font")||r,visibility:e.style.visibility,color:t.getPropertyValue("color"),textAlign:t.getPropertyValue("text-align"),textTransform:t.getPropertyValue("text-transform"),border:t.getPropertyValue("border"),padding:t.getPropertyValue("padding"),backgroundColor:n,width:t.getPropertyValue("width"),height:t.getPropertyValue("height")}}},Ae=e=>e.split("/").pop()||"",Pe=e=>{const[t="",n=""]=e.split("/");return`${n.toUpperCase()} ${t}`},Le=e=>{const{naturalWidth:t,naturalHeight:n}=e;return t&&n&&`${t} x ${n}`||""},Oe=e=>{const t=Math.floor(Math.log(e)/Math.log(1024));return`${parseFloat((e/Math.pow(1024,t)).toFixed(0))} ${["B","KB","MB","GB","TB","PB","EB","ZB","YB"][t]}`},Ie=new RegExp(`^${U.URN_PREFIX}`),Me={enableEditing:()=>{Te.getState().setMode({mode:"in-editor"})},getEditableElement:e=>{const t=document.querySelector(e);if(t&&t instanceof HTMLElement)return Se(t)},updateField:async({selector:e,value:t})=>{const n=document.querySelector(e);return n&&(n.innerHTML=t),!0},removeField:({selector:e})=>{const t=document.querySelector(e);t&&t.remove()},getUrnMappings:()=>{const e=document.querySelectorAll(U.META_SELECTOR);return Array.from(e).reduce(((e,{name:t,content:n})=>({...e,[t.replace(Ie,"")]:n})),{})},getMediaProperties:async e=>{const t=document.querySelector(e),n=null==t?void 0:t.getAttribute("src");if(!n||!t)return;const r=await(async e=>{try{return await fetch(e).then((e=>e.blob()))}catch{return}})(n),{type:o,size:a}=r||{};return{name:Ae(n),mimeType:o?Pe(o):"",resolution:Le(t),size:a?Oe(a):"",src:n,alt:t.getAttribute("alt")||""}}};(async()=>{var e;const t=E({methods:Me}),n=await t.promise;window.universalEditor=Re,null===(e=document.body.parentElement)||void 0===e||e.classList.add("universal-editor"),b.routines.discoverFonts({editor:n}),(0,b.setupUEOverlay)({editor:n}),b.routines.observeEditables({editor:n}),b.routines.observeFrame({editor:n}),b.routines.relayNavigation({editor:n}),b.routines.relayUserInputs()})()})();