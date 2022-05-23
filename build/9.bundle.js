(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{1448:function(t,e,i){"use strict";t.exports=function equal(t,e){if(t===e)return!0;if(t&&e&&"object"==typeof t&&"object"==typeof e){if(t.constructor!==e.constructor)return!1;var i,n,r;if(Array.isArray(t)){if((i=t.length)!=e.length)return!1;for(n=i;0!=n--;)if(!equal(t[n],e[n]))return!1;return!0}if(t.constructor===RegExp)return t.source===e.source&&t.flags===e.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===e.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===e.toString();if((i=(r=Object.keys(t)).length)!==Object.keys(e).length)return!1;for(n=i;0!=n--;)if(!Object.prototype.hasOwnProperty.call(e,r[n]))return!1;for(n=i;0!=n--;){var o=r[n];if(!equal(t[o],e[o]))return!1}return!0}return t!=t&&e!=e}},1573:function(t,e,i){"use strict";(function(t){i.d(e,"a",(function(){return Torus}));var n=i(8),r=i.n(n),o=i(1489),s=i(1431),a=i(287),c=i(70),d=i(232),l=i(1615),h=i(267),u=i.n(h),p=i(142),m=i.n(p),g=i(1448),w=i.n(g),f={disconnected:()=>"Torus: Lost connection to Torus.",permanentlyDisconnected:()=>"Torus: Disconnected from iframe. Page reload required.",unsupportedSync:t=>"Torus: The Torus Ethereum provider does not support synchronous methods like ".concat(t," without a callback parameter."),invalidDuplexStream:()=>"Must provide a Node.js-style duplex stream.",invalidOptions:t=>"Invalid options. Received: { maxEventListeners: ".concat(t,"}"),invalidRequestArgs:()=>"Expected a single, non-array, object argument.",invalidRequestMethod:()=>"'args.method' must be a non-empty string.",invalidRequestParams:()=>"'args.params' must be an object or array if provided.",invalidLoggerObject:()=>"'args.logger' must be an object if provided.",invalidLoggerMethod:t=>"'args.logger' must include required method '".concat(t,"'.")},y={connected:t=>'Torus: Connected to chain with ID "'.concat(t,'".')};const v={PRODUCTION:"production",DEVELOPMENT:"development",TESTING:"testing"},b={BOTTOM_LEFT:"bottom-left",TOP_LEFT:"top-left",BOTTOM_RIGHT:"bottom-right",TOP_RIGHT:"top-right"};var _={supportedVerifierList:["google","reddit","discord"],api:"https://api.tor.us",translations:{en:{embed:{continue:"Continue",actionRequired:"Authorization required",pendingAction:"Click continue to proceed with your request in a popup",cookiesRequired:"Cookies Required",enableCookies:"Please enable cookies in your browser preferences to access Torus",clickHere:"More Info"}},de:{embed:{continue:"Fortsetzen",actionRequired:"Autorisierung erforderlich",pendingAction:"Klicken Sie in einem Popup auf Weiter, um mit Ihrer Anfrage fortzufahren",cookiesRequired:"Cookies benötigt",enableCookies:"Bitte aktivieren Sie Cookies in Ihren Browsereinstellungen, um auf Torus zuzugreifen",clickHere:"Mehr Info"}},ja:{embed:{continue:"継続する",actionRequired:"認証が必要です",pendingAction:"続行をクリックして、ポップアップでリクエストを続行します",cookiesRequired:"必要なクッキー",enableCookies:"Torusにアクセスするには、ブラウザの設定でCookieを有効にしてください。",clickHere:"詳しくは"}},ko:{embed:{continue:"계속하다",actionRequired:"승인 필요",pendingAction:"팝업에서 요청을 진행하려면 계속을 클릭하십시오.",cookiesRequired:"쿠키 필요",enableCookies:"브라우저 환경 설정에서 쿠키를 활성화하여 Torus에 액세스하십시오.",clickHere:"더 많은 정보"}},zh:{embed:{continue:"继续",actionRequired:"需要授权",pendingAction:"单击继续以在弹出窗口中继续您的请求",cookiesRequired:"必填Cookie",enableCookies:"请在您的浏览器首选项中启用cookie以访问Torus。",clickHere:"更多信息"}}},prodTorusUrl:"",localStorageKey:"torus-".concat(window.location.hostname)},P=m.a.getLogger("solana-embed");const getWindowId=()=>Math.random().toString(36).slice(2),getTorusUrl=async t=>{let e,i;switch(t){case"testing":e="https://solana-testing.tor.us",i="debug";break;case"development":e="http://localhost:8080",i="debug";break;default:e="https://solana.tor.us",i="error"}return{torusUrl:e,logLevel:i}},I={height:660,width:375},O={height:740,width:1315},E={height:700,width:1200},S={height:600,width:400};function getPopupFeatures(t){let{width:e,height:i}=t;const n=void 0!==window.screenLeft?window.screenLeft:window.screenX,r=void 0!==window.screenTop?window.screenTop:window.screenY,o=window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:window.screen.width,s=window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:window.screen.height,a=Math.abs((o-e)/2/1+n),c=Math.abs((s-i)/2/1+r);return"titlebar=0,toolbar=0,status=0,location=0,menubar=0,height=".concat(i/1,",width=").concat(e/1,",top=").concat(c,",left=").concat(a)}class BaseProvider extends c.e{constructor(t,e){let{maxEventListeners:i=100,jsonRpcStreamName:n="provider"}=e;if(super(),r()(this,"isTorus",void 0),r()(this,"_rpcEngine",void 0),r()(this,"jsonRpcConnectionEvents",void 0),r()(this,"_state",void 0),!Object(l.duplex)(t))throw new Error(f.invalidDuplexStream());this.isTorus=!0,this.setMaxListeners(i),this._handleConnect=this._handleConnect.bind(this),this._handleDisconnect=this._handleDisconnect.bind(this),this._handleStreamDisconnect=this._handleStreamDisconnect.bind(this),this._rpcRequest=this._rpcRequest.bind(this),this._initializeState=this._initializeState.bind(this),this.request=this.request.bind(this),this.sendAsync=this.sendAsync.bind(this);const o=new c.c;u()(t,o,t,this._handleStreamDisconnect.bind(this,"Torus")),o.ignoreStream("phishing");const a=Object(c.i)();u()(a.stream,o.createStream(n),a.stream,this._handleStreamDisconnect.bind(this,"Torus RpcProvider"));const h=new c.b;h.push(Object(c.g)()),h.push(function createErrorMiddleware(){return(t,e,i)=>{"string"==typeof t.method&&t.method||(e.error=d.ethErrors.rpc.invalidRequest({message:"The request 'method' must be a non-empty string.",data:t})),i(t=>{const{error:i}=e;return i?(P.error("Torus - RPC Error: ".concat(i.message),i),t()):t()})}}()),h.push(Object(s.h)({origin:location.origin})),h.push(a.middleware),this._rpcEngine=h,this.jsonRpcConnectionEvents=a.events}async request(t){if(!t||"object"!=typeof t||Array.isArray(t))throw d.ethErrors.rpc.invalidRequest({message:f.invalidRequestArgs(),data:t});const{method:e,params:i}=t;if("string"!=typeof e||0===e.length)throw d.ethErrors.rpc.invalidRequest({message:f.invalidRequestMethod(),data:t});if(void 0!==i&&!Array.isArray(i)&&("object"!=typeof i||null===i))throw d.ethErrors.rpc.invalidRequest({message:f.invalidRequestParams(),data:t});return new Promise((t,n)=>{this._rpcRequest({method:e,params:i},Object(c.j)(t,n))})}send(t,e){this._rpcRequest(t,e)}sendAsync(t){return new Promise((e,i)=>{this._rpcRequest(t,Object(c.j)(e,i))})}_handleStreamDisconnect(t,e){!function logStreamDisconnectWarning(t,e,i){let n='Torus: Lost connection to "'.concat(t,'".');null!=e&&e.stack&&(n+="\n".concat(e.stack)),P.warn(n),i&&i.listenerCount("error")>0&&i.emit("error",n)}(t,e,this),this._handleDisconnect(!1,e?e.message:void 0)}}async function documentReady(){return new Promise(t=>{"loading"!==document.readyState?t():function(t,e,i){for(var n=arguments.length,r=new Array(n>3?n-3:0),o=3;o<n;o++)r[o-3]=arguments[o];const handlerWrapper=()=>{i(...r),t.removeEventListener(e,handlerWrapper)};t.addEventListener(e,handlerWrapper)}(document,"DOMContentLoaded",t)})}const htmlToElement=t=>{const e=window.document.createElement("template"),i=t.trim();return e.innerHTML=i,e.content.firstChild};class PopupHandler extends c.e{constructor(t){let{url:e,target:i,features:n}=t;super(),r()(this,"url",void 0),r()(this,"target",void 0),r()(this,"features",void 0),r()(this,"window",void 0),r()(this,"windowTimer",void 0),r()(this,"iClosedWindow",void 0),this.url=e,this.target=i||"_blank",this.features=n||getPopupFeatures(E),this.window=void 0,this.windowTimer=void 0,this.iClosedWindow=!1,this._setupTimer()}_setupTimer(){this.windowTimer=Number(setInterval(()=>{this.window&&this.window.closed&&(clearInterval(this.windowTimer),this.iClosedWindow||this.emit("close"),this.iClosedWindow=!1,this.window=void 0),void 0===this.window&&clearInterval(this.windowTimer)},500))}open(){var t;return this.window=window.open(this.url.href,this.target,this.features),null!==(t=this.window)&&void 0!==t&&t.focus&&this.window.focus(),Promise.resolve()}close(){this.iClosedWindow=!0,this.window&&this.window.close()}redirect(t){t?window.location.replace(this.url.href):window.location.href=this.url.href}}function ownKeys$2(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}class TorusCommunicationProvider extends BaseProvider{constructor(t,e){let{maxEventListeners:i=100,jsonRpcStreamName:n="provider"}=e;super(t,{maxEventListeners:i,jsonRpcStreamName:n}),r()(this,"embedTranslations",void 0),r()(this,"torusUrl",void 0),r()(this,"dappStorageKey",void 0),r()(this,"windowRefs",void 0),r()(this,"tryWindowHandle",void 0),r()(this,"torusAlertContainer",void 0),r()(this,"torusIframe",void 0),this._state=function _objectSpread$2(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?ownKeys$2(Object(i),!0).forEach((function(e){r()(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):ownKeys$2(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}({},TorusCommunicationProvider._defaultState),this.torusUrl="",this.dappStorageKey="";const o=_.translations[(()=>{let t=window.navigator.language||"en-US";const e=t.split("-");return t=Object.prototype.hasOwnProperty.call(_.translations,e[0])?e[0]:"en",t})()];this.embedTranslations=o.embed,this.windowRefs={},this.on("connect",()=>{this._state.isConnected=!0});this.jsonRpcConnectionEvents.on("notification",t=>{const{method:e,params:i}=t;if(e===s.c.IFRAME_STATUS){const{isFullScreen:t,rid:e}=i;this._displayIframe({isFull:t,rid:e})}else if(e===s.c.CREATE_WINDOW){const{windowId:t,url:e}=i;this._createPopupBlockAlert(t,e)}else if(e===s.c.CLOSE_WINDOW)this._handleCloseWindow(i);else if(e===s.c.USER_LOGGED_IN){const{currentLoginProvider:t}=i;this._state.isLoggedIn=!0,this._state.currentLoginProvider=t}else e===s.c.USER_LOGGED_OUT&&(this._state.isLoggedIn=!1,this._state.currentLoginProvider=null,this._displayIframe())})}get isLoggedIn(){return this._state.isLoggedIn}get isIFrameFullScreen(){return this._state.isIFrameFullScreen}isConnected(){return this._state.isConnected}async _initializeState(t){try{const{torusUrl:e,dappStorageKey:i,torusAlertContainer:n,torusIframe:r}=t;this.torusUrl=e,this.dappStorageKey=i,this.torusAlertContainer=n,this.torusIframe=r,this.torusIframe.addEventListener("load",()=>{this._state.isIFrameFullScreen||this._displayIframe()});const{currentLoginProvider:o,isLoggedIn:a}=await this.request({method:s.b.GET_PROVIDER_STATE,params:[]});this._handleConnect(o,a)}catch(t){P.error("Torus: Failed to get initial state. Please report this bug.",t)}finally{P.info("initialized communication state"),this._state.initialized=!0,this.emit("_initialized")}}_handleWindow(t){let{url:e,target:i,features:n}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const r=new URL(e||"".concat(this.torusUrl,"/redirect?windowId=").concat(t));this.dappStorageKey&&(r.hash?r.hash+="&dappStorageKey=".concat(this.dappStorageKey):r.hash="#dappStorageKey=".concat(this.dappStorageKey));const o=new PopupHandler({url:r,target:i,features:n});o.open(),o.window?(this.windowRefs[t]=o,this.request({method:s.b.OPENED_WINDOW,params:{windowId:t}}),o.once("close",()=>{delete this.windowRefs[t],this.request({method:s.b.CLOSED_WINDOW,params:{windowId:t}})})):this._createPopupBlockAlert(t,r.href)}_displayIframe(){let{isFull:t=!1,rid:e=""}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const i={};if(t)i.display="block",i.width="100%",i.height="100%",i.top="0px",i.right="0px",i.left="0px",i.bottom="0px";else switch(i.display=this._state.torusWidgetVisibility?"block":"none",i.height="70px",i.width="70px",this._state.buttonPosition){case b.TOP_LEFT:i.top="0px",i.left="0px",i.right="auto",i.bottom="auto";break;case b.TOP_RIGHT:i.top="0px",i.right="0px",i.left="auto",i.bottom="auto";break;case b.BOTTOM_RIGHT:i.bottom="0px",i.right="0px",i.top="auto",i.left="auto";break;case b.BOTTOM_LEFT:default:i.bottom="0px",i.left="0px",i.top="auto",i.right="auto"}Object.assign(this.torusIframe.style,i),this._state.isIFrameFullScreen=t,this.request({method:s.b.IFRAME_STATUS,params:{isIFrameFullScreen:t,rid:e}})}hideTorusButton(){this._state.torusWidgetVisibility=!1,this._displayIframe()}showTorusButton(){this._state.torusWidgetVisibility=!0,this._displayIframe()}_rpcRequest(t,e){const i=e,n=t;Array.isArray(n)||n.jsonrpc||(n.jsonrpc="2.0"),this.tryWindowHandle(n,i)}_handleConnect(t,e){this._state.isConnected||(this._state.isConnected=!0,this.emit("connect",{currentLoginProvider:t,isLoggedIn:e}),P.debug(y.connected(t)))}_handleDisconnect(t,e){if(this._state.isConnected||!this._state.isPermanentlyDisconnected&&!t){let i;this._state.isConnected=!1,t?(i=new d.EthereumRpcError(1013,e||f.disconnected()),P.debug(i)):(i=new d.EthereumRpcError(1011,e||f.permanentlyDisconnected()),P.error(i),this._state.currentLoginProvider=null,this._state.isLoggedIn=!1,this._state.torusWidgetVisibility=!1,this._state.isIFrameFullScreen=!1,this._state.isPermanentlyDisconnected=!0),this.emit("disconnect",i)}}_handleCloseWindow(t){const{windowId:e}=t;this.windowRefs[e]&&(this.windowRefs[e].close(),delete this.windowRefs[e])}async _createPopupBlockAlert(t,e){const i=this.getLogoUrl(),n=htmlToElement('<div id="torusAlert" class="torus-alert--v2">'+'<div id="torusAlert__logo"><img src="'.concat(i,'" /></div>')+"<div>"+'<h1 id="torusAlert__title">'.concat(this.embedTranslations.actionRequired,"</h1>")+'<p id="torusAlert__desc">'.concat(this.embedTranslations.pendingAction,"</p>")+"</div></div>"),r=htmlToElement('<div><a id="torusAlert__btn">'.concat(this.embedTranslations.continue,"</a></div>")),o=htmlToElement('<div id="torusAlert__btn-container"></div>');o.appendChild(r),n.appendChild(o);await documentReady(),(()=>{this.torusAlertContainer.appendChild(n)})(),(()=>{r.addEventListener("click",()=>{this._handleWindow(t,{url:e,target:"_blank",features:getPopupFeatures(S)}),n.remove(),0===this.torusAlertContainer.children.length&&(this.torusAlertContainer.style.display="none")})})(),this.torusAlertContainer.style.display="block"}getLogoUrl(){return"".concat(this.torusUrl,"/images/torus_icon-blue.svg")}}function ownKeys$1(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}r()(TorusCommunicationProvider,"_defaultState",{buttonPosition:"bottom-left",currentLoginProvider:null,isIFrameFullScreen:!1,hasEmittedConnection:!1,torusWidgetVisibility:!1,initialized:!1,isLoggedIn:!1,isPermanentlyDisconnected:!1,isConnected:!1});class TorusInPageProvider extends BaseProvider{constructor(t,e){let{maxEventListeners:i=100,jsonRpcStreamName:n="provider"}=e;super(t,{maxEventListeners:i,jsonRpcStreamName:n}),r()(this,"chainId",void 0),r()(this,"selectedAddress",void 0),r()(this,"tryWindowHandle",void 0),this._state=function _objectSpread$1(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?ownKeys$1(Object(i),!0).forEach((function(e){r()(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):ownKeys$1(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}({},TorusInPageProvider._defaultState),this.selectedAddress=null,this.chainId=null,this._handleAccountsChanged=this._handleAccountsChanged.bind(this),this._handleChainChanged=this._handleChainChanged.bind(this),this._handleUnlockStateChanged=this._handleUnlockStateChanged.bind(this),this.on("connect",()=>{this._state.isConnected=!0});this.jsonRpcConnectionEvents.on("notification",t=>{const{method:e,params:i}=t;e===s.e.ACCOUNTS_CHANGED?this._handleAccountsChanged(i):e===s.e.UNLOCK_STATE_CHANGED?this._handleUnlockStateChanged(i):e===s.e.CHAIN_CHANGED&&this._handleChainChanged(i)})}isConnected(){return this._state.isConnected}async _initializeState(){try{const{accounts:t,chainId:e,isUnlocked:i}=await this.request({method:s.d.GET_PROVIDER_STATE,params:[]});this.emit("connect",{chainId:e}),this._handleChainChanged({chainId:e}),this._handleUnlockStateChanged({accounts:t,isUnlocked:i}),this._handleAccountsChanged(t)}catch(t){P.error("Torus: Failed to get initial state. Please report this bug.",t)}finally{P.info("initialized provider state"),this._state.initialized=!0,this.emit("_initialized")}}_rpcRequest(t,e){let i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=e;const r=t;if(!Array.isArray(r))if(r.jsonrpc||(r.jsonrpc="2.0"),"solana_accounts"===r.method||"solana_requestAccounts"===r.method)n=(t,n)=>{this._handleAccountsChanged(n.result||[],"solana_accounts"===r.method,i),e(t,n)};else if("wallet_getProviderState"===r.method)return void this._rpcEngine.handle(t,n);this.tryWindowHandle(r,n)}_handleConnect(t){this._state.isConnected||(this._state.isConnected=!0,this.emit("connect",{chainId:t}),P.debug(y.connected(t)))}_handleDisconnect(t,e){if(this._state.isConnected||!this._state.isPermanentlyDisconnected&&!t){let i;this._state.isConnected=!1,t?(i=new d.EthereumRpcError(1013,e||f.disconnected()),P.debug(i)):(i=new d.EthereumRpcError(1011,e||f.permanentlyDisconnected()),P.error(i),this.chainId=null,this._state.accounts=null,this.selectedAddress=null,this._state.isUnlocked=!1,this._state.isPermanentlyDisconnected=!0),this.emit("disconnect",i)}}_handleAccountsChanged(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=t;Array.isArray(n)||(P.error("Torus: Received non-array accounts parameter. Please report this bug.",n),n=[]);for(const e of t)if("string"!=typeof e){P.error("Torus: Received non-string account. Please report this bug.",t),n=[];break}w()(this._state.accounts,n)||(e&&Array.isArray(this._state.accounts)&&this._state.accounts.length>0&&!i&&P.error('Torus: "solana_accounts" unexpectedly updated accounts. Please report this bug.',n),this._state.accounts=n,this.emit("accountsChanged",n)),this.selectedAddress!==n[0]&&(this.selectedAddress=n[0]||null)}_handleChainChanged(){let{chainId:t}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t?"loading"===t?this._handleDisconnect(!0):(this._handleConnect(t),t!==this.chainId&&(this.chainId=t,this._state.initialized&&this.emit("chainChanged",this.chainId))):P.error("Torus: Received invalid network parameters. Please report this bug.",{chainId:t})}_handleUnlockStateChanged(){let{accounts:t,isUnlocked:e}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};"boolean"==typeof e?e!==this._state.isUnlocked&&(this._state.isUnlocked=e,this._handleAccountsChanged(t||[])):P.error("Torus: Received invalid isUnlocked parameter. Please report this bug.",{isUnlocked:e})}}function imgExists(t){return new Promise((e,i)=>{try{const i=document.createElement("img");i.onload=()=>e(!0),i.onerror=()=>e(!1),i.src=t}catch(t){i(t)}})}r()(TorusInPageProvider,"_defaultState",{accounts:null,isConnected:!1,isUnlocked:!1,initialized:!1,isPermanentlyDisconnected:!1,hasEmittedConnection:!1});const getSiteName=t=>{const{document:e}=t,i=e.querySelector('head > meta[property="og:site_name"]');if(i)return i.content;const n=e.querySelector('head > meta[name="title"]');return n?n.content:e.title&&e.title.length>0?e.title:t.location.hostname};async function getSiteIcon(t){try{const{document:e}=t;let i=e.querySelector('head > link[rel="shortcut icon"]');return i&&await imgExists(i.href)?i.href:(i=Array.from(e.querySelectorAll('head > link[rel="icon"]')).find(t=>Boolean(t.href)),i&&await imgExists(i.href)?i.href:"")}catch(t){return""}}function ownKeys(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(i),!0).forEach((function(e){r()(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):ownKeys(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}const T=["send_transaction","sign_transaction","sign_all_transactions","sign_message","connect"],C=[s.b.SET_PROVIDER],A=function storageAvailable(t){let e;try{e=window[t];const i="__storage_test__";return e.setItem(i,i),e.removeItem(i),!0}catch(t){return t&&(22===t.code||1014===t.code||"QuotaExceededError"===t.name||"NS_ERROR_DOM_QUOTA_REACHED"===t.name)&&e&&0!==e.length}}("localStorage");!async function preLoadIframe(){try{if("undefined"==typeof document)return;const t=document.createElement("link"),{torusUrl:e}=await getTorusUrl("production");t.href="".concat(e,"/frame"),t.crossOrigin="anonymous",t.type="text/html",t.rel="prefetch",t.relList&&t.relList.supports&&t.relList.supports("prefetch")&&document.head.appendChild(t)}catch(t){P.warn(t)}}();class Torus{constructor(){let{modalZIndex:t=99999}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};r()(this,"isInitialized",void 0),r()(this,"torusAlert",void 0),r()(this,"modalZIndex",void 0),r()(this,"alertZIndex",void 0),r()(this,"requestedLoginProvider",void 0),r()(this,"provider",void 0),r()(this,"communicationProvider",void 0),r()(this,"dappStorageKey",void 0),r()(this,"torusAlertContainer",void 0),r()(this,"torusUrl",void 0),r()(this,"torusIframe",void 0),r()(this,"styleLink",void 0),this.torusUrl="",this.isInitialized=!1,this.requestedLoginProvider=null,this.modalZIndex=t,this.alertZIndex=t+1e3,this.dappStorageKey=""}get isLoggedIn(){return!!this.communicationProvider&&this.communicationProvider.isLoggedIn}async init(){let{buildEnv:t=v.PRODUCTION,enableLogging:e=!1,network:i,showTorusButton:n=!1,useLocalStorage:r=!1,buttonPosition:o=b.BOTTOM_LEFT,apiKey:s="torus-default",extraParams:c={}}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(this.isInitialized)throw new Error("Already initialized");Object(a.f)(s);const{torusUrl:d,logLevel:l}=await getTorusUrl(t);P.info(d,"url loaded"),this.torusUrl=d,P.setDefaultLevel(l),e?P.enableAll():P.disableAll();const h=this.handleDappStorageKey(r),u=new URL(d);u.pathname.endsWith("/")?u.pathname+="frame":u.pathname+="/frame";const p=new URLSearchParams;h&&p.append("dappStorageKey",h),p.append("origin",window.location.origin),u.hash=p.toString(),this.torusIframe=htmlToElement('<iframe\n        id="torusIframe"\n        class="torusIframe"\n        src="'.concat(u.href,'"\n        style="display: none; position: fixed; top: 0; right: 0; width: 100%;\n        height: 100%; border: none; border-radius: 0; z-index: ').concat(this.modalZIndex.toString(),'"\n      ></iframe>')),this.torusAlertContainer=htmlToElement('<div id="torusAlertContainer" style="display:none; z-index: '.concat(this.alertZIndex.toString(),'"></div>')),this.styleLink=htmlToElement('<link href="'.concat(d,'/css/widget.css" rel="stylesheet" type="text/css">'));await documentReady(),await(async()=>new Promise((t,e)=>{try{window.document.head.appendChild(this.styleLink),window.document.body.appendChild(this.torusIframe),window.document.body.appendChild(this.torusAlertContainer),this.torusIframe.addEventListener("load",async()=>{const e=await(async()=>({name:getSiteName(window),icon:await getSiteIcon(window)}))();this.torusIframe.contentWindow.postMessage({buttonPosition:o,apiKey:s,network:i,dappMetadata:e,extraParams:c},u.origin),await this._setupWeb3({torusUrl:d}),n?this.showTorusButton():this.hideTorusButton(),this.isInitialized=!0,window.torus=this,t()})}catch(t){e(t)}}))()}async login(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!this.isInitialized)throw new Error("Call init() first");try{this.requestedLoginProvider=t.loginProvider||null,this.requestedLoginProvider||this.communicationProvider._displayIframe({isFull:!0});const e=await new Promise((e,i)=>{this.provider._rpcRequest({method:"solana_requestAccounts",params:[this.requestedLoginProvider,t.login_hint]},Object(c.j)(e,i))});if(Array.isArray(e)&&e.length>0)return e;throw new Error("Login failed")}catch(t){throw P.error("login failed",t),t}finally{this.communicationProvider.isIFrameFullScreen&&this.communicationProvider._displayIframe()}}async loginWithPrivateKey(t){if(!this.isInitialized)throw new Error("Call init() first");const{privateKey:e,userInfo:i}=t,{success:n}=await this.communicationProvider.request({method:"login_with_private_key",params:{privateKey:e,userInfo:i}});if(!n)throw new Error("Login Failed")}async logout(){if(!this.communicationProvider.isLoggedIn)throw new Error("Not logged in");await this.communicationProvider.request({method:s.b.LOGOUT,params:[]}),this.requestedLoginProvider=null}async cleanUp(){this.communicationProvider.isLoggedIn&&await this.logout(),this.clearInit()}clearInit(){function isElement(t){return t instanceof Element||t instanceof Document}isElement(this.styleLink)&&window.document.body.contains(this.styleLink)&&(this.styleLink.remove(),this.styleLink=void 0),isElement(this.torusIframe)&&window.document.body.contains(this.torusIframe)&&(this.torusIframe.remove(),this.torusIframe=void 0),isElement(this.torusAlertContainer)&&window.document.body.contains(this.torusAlertContainer)&&(this.torusAlert=void 0,this.torusAlertContainer.remove(),this.torusAlertContainer=void 0),this.isInitialized=!1}hideTorusButton(){this.communicationProvider.hideTorusButton()}showTorusButton(){this.communicationProvider.showTorusButton()}async setProvider(t){await this.communicationProvider.request({method:s.b.SET_PROVIDER,params:_objectSpread({},t)})}async showWallet(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const i=await this.communicationProvider.request({method:s.b.WALLET_INSTANCE_ID,params:[]}),n=t?"/".concat(t):"",r=new URL("".concat(this.torusUrl,"/wallet").concat(n));r.searchParams.append("instanceId",i),Object.keys(e).forEach(t=>{r.searchParams.append(t,e[t])}),this.dappStorageKey&&(r.hash="#dappStorageKey=".concat(this.dappStorageKey)),new PopupHandler({url:r,features:getPopupFeatures(O)}).open()}async getUserInfo(){return await this.communicationProvider.request({method:s.b.USER_INFO,params:[]})}async initiateTopup(t,e){if(!this.isInitialized)throw new Error("Torus is not initialized");const i=getWindowId();return this.communicationProvider._handleWindow(i),await this.communicationProvider.request({method:s.b.TOPUP,params:{provider:t,params:e,windowId:i}})}async getAccounts(){return await this.provider.request({method:"getAccounts",params:[]})}async sendTransaction(t){return await this.provider.request({method:"send_transaction",params:{message:t.serialize({requireAllSignatures:!1}).toString("hex")}})}async signTransaction(e){const i=await this.provider.request({method:"sign_transaction",params:{message:e.serializeMessage().toString("hex"),messageOnly:!0}}),n=JSON.parse(i),r={publicKey:new o.c(n.publicKey),signature:t.from(n.signature,"hex")};return e.addSignature(r.publicKey,r.signature),e}async signAllTransactions(e){const i=e.map(t=>t.serializeMessage().toString("hex")),n=(await this.provider.request({method:"sign_all_transactions",params:{message:i,messageOnly:!0}})).map(e=>{const i=JSON.parse(e);return{publicKey:new o.c(i.publicKey),signature:t.from(i.signature,"hex")}});return e.forEach((t,e)=>(t.addSignature(n[e].publicKey,n[e].signature),t)),e}async signMessage(t){return await this.provider.request({method:"sign_message",params:{data:t}})}async getGaslessPublicKey(){return await this.provider.request({method:"get_gasless_public_key",params:[]})}handleDappStorageKey(t){let e="";if(A&&t){const t=window.localStorage.getItem(_.localStorageKey);if(t)e=t;else{const t="torus-app-".concat(getWindowId());window.localStorage.setItem(_.localStorageKey,t),e=t}}return this.dappStorageKey=e,e}async _setupWeb3(t){P.info("setupWeb3 running");const e=new c.a({name:"embed_torus",target:"iframe_torus",targetWindow:this.torusIframe.contentWindow}),i=new c.a({name:"embed_communication",target:"iframe_communication",targetWindow:this.torusIframe.contentWindow}),n=new TorusInPageProvider(e,{}),r=new TorusCommunicationProvider(i,{});n.tryWindowHandle=(t,e)=>{const i=t;if(!Array.isArray(i)&&T.includes(i.method)){if(!this.communicationProvider.isLoggedIn)throw new Error("User Not Logged In");const t=getWindowId();r._handleWindow(t,{target:"_blank",features:getPopupFeatures(S)}),i.windowId=t}n._rpcEngine.handle(i,e)},r.tryWindowHandle=(t,e)=>{const i=t;if(!Array.isArray(i)&&C.includes(i.method)){const t=getWindowId();r._handleWindow(t,{target:"_blank",features:getPopupFeatures(I)}),i.params.windowId=t}r._rpcEngine.handle(i,e)};const detectAccountRequestPrototypeModifier=t=>{const e=n[t],i=this;n[t]=function providerFunc(t,n){const{method:r,params:o=[]}=t;if("solana_requestAccounts"===r){if(!n)return i.login({loginProvider:o[0]});i.login({loginProvider:o[0]}).then(t=>n(null,t)).catch(t=>n(t))}return e.apply(this,[t,n])}};detectAccountRequestPrototypeModifier("request"),detectAccountRequestPrototypeModifier("sendAsync"),detectAccountRequestPrototypeModifier("send");const o=new Proxy(n,{deleteProperty:()=>!0}),s=new Proxy(r,{deleteProperty:()=>!0});this.provider=o,this.communicationProvider=s,await Promise.all([n._initializeState(),r._initializeState(_objectSpread(_objectSpread({},t),{},{dappStorageKey:this.dappStorageKey,torusAlertContainer:this.torusAlertContainer,torusIframe:this.torusIframe}))]),P.debug("Torus - injected provider")}}}).call(this,i(15).Buffer)},1615:function(t,e,i){"use strict";const isStream=t=>null!==t&&"object"==typeof t&&"function"==typeof t.pipe;isStream.writable=t=>isStream(t)&&!1!==t.writable&&"function"==typeof t._write&&"object"==typeof t._writableState,isStream.readable=t=>isStream(t)&&!1!==t.readable&&"function"==typeof t._read&&"object"==typeof t._readableState,isStream.duplex=t=>isStream.writable(t)&&isStream.readable(t),isStream.transform=t=>isStream.duplex(t)&&"function"==typeof t._transform,t.exports=isStream},1702:function(t,e,i){"use strict";i.r(e),i.d(e,"SolanaWalletAdapter",(function(){return SolanaWalletAdapter}));var n=i(8),r=i.n(n),o=i(1573),s=i(7),a=i(1465);function ownKeys(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(i),!0).forEach((function(e){r()(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):ownKeys(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}class SolanaWalletAdapter extends s.e{constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};super(),r()(this,"name",s.j.TORUS_SOLANA),r()(this,"adapterNamespace",s.c.SOLANA),r()(this,"currentChainNamespace",s.g.SOLANA),r()(this,"type",s.a.EXTERNAL),r()(this,"status",s.d.NOT_READY),r()(this,"torusInstance",null),r()(this,"torusWalletOptions",void 0),r()(this,"initParams",void 0),r()(this,"loginSettings",{}),r()(this,"solanaProvider",null),r()(this,"rehydrated",!1),this.torusWalletOptions=t.adapterSettings||{},this.initParams=t.initParams||{},this.loginSettings=t.loginSettings||{},this.chainConfig=t.chainConfig||null}get provider(){var t;return this.status===s.d.CONNECTED&&this.solanaProvider&&(null===(t=this.solanaProvider)||void 0===t?void 0:t.provider)||null}set provider(t){throw new Error("Not implemented")}async init(t){let e;if(super.checkInitializationRequirements(),this.chainConfig){const{chainId:t,blockExplorer:i,displayName:n,rpcTarget:r,ticker:o,tickerName:s}=this.chainConfig;e={chainId:t,rpcTarget:r,blockExplorerUrl:i,displayName:n,tickerName:s,ticker:o,logo:""}}else{this.chainConfig=Object(s.n)(s.g.SOLANA,"0x1");const{blockExplorer:t,displayName:i,ticker:n,tickerName:r,rpcTarget:o,chainId:a}=this.chainConfig;e={chainId:a,rpcTarget:o,blockExplorerUrl:t,displayName:i,ticker:n,tickerName:r,logo:""}}this.torusInstance=new o.a(this.torusWalletOptions),s.p.debug("initializing torus solana adapter init"),await this.torusInstance.init(_objectSpread(_objectSpread({showTorusButton:!1},this.initParams),{},{network:e})),this.solanaProvider=new a.TorusInjectedProvider({config:{chainConfig:this.chainConfig}}),this.status=s.d.READY,this.emit(s.b.READY,s.j.TORUS_SOLANA);try{s.p.debug("initializing torus solana adapter"),t.autoConnect&&(this.rehydrated=!0,await this.connect())}catch(t){s.p.error("Failed to connect with cached torus solana provider",t),this.emit(s.b.ERRORED,t)}}async connect(){if(super.checkConnectionRequirements(),!this.torusInstance)throw s.k.notReady("Torus wallet is not initialized");if(!this.solanaProvider)throw s.k.notReady("Torus wallet is not initialized");this.status=s.d.CONNECTING,this.emit(s.b.CONNECTING,{adapter:s.j.TORUS_SOLANA});try{await this.torusInstance.login(this.loginSettings);try{const t=this.torusInstance.provider;t.sendTransaction=this.torusInstance.sendTransaction.bind(this.torusInstance),t.signAllTransactions=this.torusInstance.signAllTransactions.bind(this.torusInstance),t.signMessage=this.torusInstance.signMessage.bind(this.torusInstance),t.signTransaction=this.torusInstance.signTransaction.bind(this.torusInstance),await this.solanaProvider.setupProvider(t)}catch(t){if(!(t instanceof s.m&&5010===t.code))throw t;{const{chainId:t,blockExplorer:e,displayName:i,rpcTarget:n,ticker:r,tickerName:o}=this.chainConfig,s={chainId:t,rpcTarget:n,blockExplorerUrl:e,displayName:i,tickerName:o,ticker:r,logo:""};await this.torusInstance.setProvider(s)}}return this.status=s.d.CONNECTED,this.torusInstance.showTorusButton(),this.emit(s.d.CONNECTED,{adapter:s.j.TORUS_SOLANA,reconnected:this.rehydrated}),this.provider}catch(t){throw this.status=s.d.READY,this.rehydrated=!1,this.emit(s.b.ERRORED,t),s.l.connectionError("Failed to login with torus solana wallet")}}async disconnect(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{cleanup:!1};if(this.status!==s.d.CONNECTED)throw s.l.notConnectedError("Not connected with wallet");if(!this.torusInstance)throw s.k.notReady("Torus wallet is not initialized");await this.torusInstance.logout(),t.cleanup?(this.status=s.d.NOT_READY,this.torusInstance=null,this.solanaProvider=null):this.status=s.d.READY,this.emit(s.b.DISCONNECTED)}async getUserInfo(){if(this.status!==s.d.CONNECTED)throw s.l.notConnectedError("Not connected with wallet");if(!this.torusInstance)throw s.k.notReady("Torus wallet is not initialized");return await this.torusInstance.getUserInfo()}setAdapterSettings(t){}}}}]);