(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{1418:function(i,n){},1692:function(i,n,e){"use strict";e.r(n),e.d(n,"OpenloginAdapter",(function(){return OpenloginAdapter})),e.d(n,"getOpenloginDefaultOptions",(function(){return getOpenloginDefaultOptions}));var t=e(190),o=e(7),r=e(8),a=e.n(r),s=e(1452),c=e(128),p=e.n(c);const getOpenloginDefaultOptions=(i,n)=>({adapterSettings:{network:t.b.MAINNET,clientId:"",uxMode:t.c.POPUP},chainConfig:i?Object(o.n)(i,n):null,loginSettings:{relogin:!0}});function ownKeys(i,n){var e=Object.keys(i);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(i);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(i,n).enumerable}))),e.push.apply(e,t)}return e}function _objectSpread(i){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?ownKeys(Object(e),!0).forEach((function(n){a()(i,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(e)):ownKeys(Object(e)).forEach((function(n){Object.defineProperty(i,n,Object.getOwnPropertyDescriptor(e,n))}))}return i}class OpenloginAdapter extends o.e{constructor(i){var n,e,r;super(),a()(this,"name",o.j.OPENLOGIN),a()(this,"adapterNamespace",o.c.MULTICHAIN),a()(this,"type",o.a.IN_APP),a()(this,"openloginInstance",null),a()(this,"status",o.d.NOT_READY),a()(this,"currentChainNamespace",o.g.EIP155),a()(this,"openloginOptions",void 0),a()(this,"loginSettings",{}),a()(this,"privKeyProvider",null),o.p.debug("const openlogin adapter",i);const s=getOpenloginDefaultOptions(null===(n=i.chainConfig)||void 0===n?void 0:n.chainNamespace,null===(e=i.chainConfig)||void 0===e?void 0:e.chainId);if(this.openloginOptions=_objectSpread(_objectSpread({clientId:"",network:t.b.MAINNET},s.adapterSettings),i.adapterSettings||{}),this.loginSettings=_objectSpread(_objectSpread({},s.loginSettings),i.loginSettings),null!==(r=i.chainConfig)&&void 0!==r&&r.chainNamespace){var c;this.currentChainNamespace=null===(c=i.chainConfig)||void 0===c?void 0:c.chainNamespace;const n=s.chainConfig?s.chainConfig:{};if(this.chainConfig=_objectSpread(_objectSpread({},n),null==i?void 0:i.chainConfig),o.p.debug("const openlogin chainConfig",this.chainConfig),!this.chainConfig.rpcTarget)throw o.k.invalidParams("rpcTarget is required in chainConfig")}}get chainConfigProxy(){return this.chainConfig?_objectSpread({},this.chainConfig):null}get provider(){var i;return(null===(i=this.privKeyProvider)||void 0===i?void 0:i.provider)||null}set provider(i){throw new Error("Not implemented")}async init(i){var n;if(super.checkInitializationRequirements(),null===(n=this.openloginOptions)||void 0===n||!n.clientId)throw o.k.invalidParams("clientId is required before openlogin's initialization");if(!this.chainConfig&&this.currentChainNamespace!==o.g.OTHER)throw o.k.invalidParams("chainConfig is required before initialization");let e=!1;if(this.openloginOptions.uxMode===t.c.REDIRECT){const i=Object(t.e)();Object.keys(i).length>0&&i._pid&&(e=!0)}this.openloginOptions=_objectSpread(_objectSpread({},this.openloginOptions),{},{replaceUrlOnRedirect:e}),this.openloginInstance=new t.d(this.openloginOptions),o.p.debug("initializing openlogin adapter init"),await this.openloginInstance.init(),this.status=o.d.READY,this.emit(o.b.READY,o.j.OPENLOGIN);try{o.p.debug("initializing openlogin adapter"),this.openloginInstance.privKey&&(i.autoConnect||e)&&await this.connect()}catch(i){o.p.error("Failed to connect with cached openlogin provider",i),this.emit("ERRORED",i)}}async connect(i){super.checkConnectionRequirements(),this.status=o.d.CONNECTING,this.emit(o.b.CONNECTING,_objectSpread(_objectSpread({},i),{},{adapter:o.j.OPENLOGIN}));try{return await this.connectWithProvider(i),this.provider}catch(i){if(o.p.error("Failed to connect with openlogin provider",i),this.status=o.d.READY,this.emit(o.b.ERRORED,i),null!=i&&i.message.includes("user closed popup"))throw o.l.popupClosed();throw o.l.connectionError("Failed to login with openlogin")}}async disconnect(){let i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{cleanup:!1};if(this.status!==o.d.CONNECTED)throw o.l.notConnectedError("Not connected with wallet");if(!this.openloginInstance)throw o.k.notReady("openloginInstance is not ready");await this.openloginInstance.logout(),i.cleanup?(this.status=o.d.NOT_READY,this.openloginInstance=null,this.privKeyProvider=null):this.status=o.d.READY,this.emit(o.b.DISCONNECTED)}async getUserInfo(){if(this.status!==o.d.CONNECTED)throw o.l.notConnectedError("Not connected with wallet");if(!this.openloginInstance)throw o.k.notReady("openloginInstance is not ready");return await this.openloginInstance.getUserInfo()}setAdapterSettings(i){if(this.status===o.d.READY)return;const n=getOpenloginDefaultOptions();this.openloginOptions=_objectSpread(_objectSpread(_objectSpread({},n.adapterSettings),this.openloginOptions||{}),i)}setChainConfig(i){super.setChainConfig(i),this.currentChainNamespace=i.chainNamespace}async connectWithProvider(i){if(!this.chainConfig)throw o.k.invalidParams("chainConfig is required before initialization");if(!this.openloginInstance)throw o.k.notReady("openloginInstance is not ready");if(this.currentChainNamespace===o.g.SOLANA){const{SolanaPrivateKeyProvider:i}=await Promise.all([e.e(1),e.e(2),e.e(11)]).then(e.bind(null,1451));this.privKeyProvider=new i({config:{chainConfig:this.chainConfig}})}else if(this.currentChainNamespace===o.g.EIP155){const{EthereumPrivateKeyProvider:i}=await Promise.all([e.e(3),e.e(10)]).then(e.bind(null,1483));this.privKeyProvider=new i({config:{chainConfig:this.chainConfig}})}else{if(this.currentChainNamespace!==o.g.OTHER)throw new Error("Invalid chainNamespace: ".concat(this.currentChainNamespace," found while connecting to wallet"));this.privKeyProvider=new s.b}var n;!this.openloginInstance.privKey&&i&&await this.openloginInstance.login(p()(this.loginSettings,{loginProvider:i.loginProvider},{extraLoginOptions:_objectSpread(_objectSpread({},i.extraLoginOptions||{}),{},{login_hint:i.login_hint||(null===(n=i.extraLoginOptions)||void 0===n?void 0:n.login_hint)})}));let t=this.openloginInstance.privKey;if(t){if(this.currentChainNamespace===o.g.SOLANA){const{getED25519Key:i}=await Promise.all([e.e(1),e.e(12)]).then(e.bind(null,1685));t=i(t).sk.toString("hex")}await this.privKeyProvider.setupProvider(t),this.status=o.d.CONNECTED,this.emit(o.b.CONNECTED,{adapter:o.j.OPENLOGIN,reconnected:!i})}}}}}]);