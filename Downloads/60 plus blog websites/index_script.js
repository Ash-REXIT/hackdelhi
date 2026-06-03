var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(e&&(t=e(e=0)),t),s=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),c=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},l=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},u=(n,r,a)=>(a=n==null?{}:e(i(n)),l(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n)),d=e=>a.call(e,`module.exports`)?e[`module.exports`]:l(t({},`__esModule`,{value:!0}),e);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var f=s((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},ee=Object.prototype.hasOwnProperty;function te(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function T(e,t){return te(e.type,t,e.props)}function ne(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function re(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ie=/\/+/g;function ae(e,t){return typeof e==`object`&&e&&e.key!=null?re(``+e.key):t.toString(36)}function oe(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function se(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,se(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+ae(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(ie,`$&/`)+`/`),se(o,r,i,``,function(e){return e})):o!=null&&(ne(o)&&(o=T(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ie,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+ae(a,u),c+=se(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+ae(a,u++),c+=se(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return se(oe(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function ce(e,t,n){if(e==null)return e;var r=[],i=0;return se(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function le(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var E=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},D={map:ce,forEach:function(e,t,n){ce(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ce(e,function(){t++}),t},toArray:function(e){return ce(e,function(e){return e})||[]},only:function(e){if(!ne(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=D,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!ee.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return te(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)ee.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return te(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=ne,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:le}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,E)}catch(e){E(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.5`})),p=s(((e,t)=>{t.exports=f()})),m=s((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m)if(n(c)!==null)m=!0,S||(S=!0,ne());else{var t=n(l);t!==null&&ae(x,t.startTime-e)}}var S=!1,C=-1,w=5,ee=-1;function te(){return g?!0:!(e.unstable_now()-ee<w)}function T(){if(g=!1,S){var t=e.unstable_now();ee=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&te());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&ae(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?ne():S=!1}}}var ne;if(typeof y==`function`)ne=function(){y(T)};else if(typeof MessageChannel<`u`){var re=new MessageChannel,ie=re.port2;re.port1.onmessage=T,ne=function(){ie.postMessage(null)}}else ne=function(){_(T,0)};function ae(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,ae(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,ne()))),r},e.unstable_shouldYield=te,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),h=s(((e,t)=>{t.exports=m()})),g=s((e=>{var t=p();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`)if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`)if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.5`})),_=s(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=g()})),v=s((e=>{var t=h(),n=p(),r=_();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function u(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function d(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=d(e),t!==null)return t;e=e.sibling}return null}var f=Object.assign,m=Symbol.for(`react.element`),g=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),S=Symbol.for(`react.consumer`),C=Symbol.for(`react.context`),w=Symbol.for(`react.forward_ref`),ee=Symbol.for(`react.suspense`),te=Symbol.for(`react.suspense_list`),T=Symbol.for(`react.memo`),ne=Symbol.for(`react.lazy`),re=Symbol.for(`react.activity`),ie=Symbol.for(`react.memo_cache_sentinel`),ae=Symbol.iterator;function oe(e){return typeof e!=`object`||!e?null:(e=ae&&e[ae]||e[`@@iterator`],typeof e==`function`?e:null)}var se=Symbol.for(`react.client.reference`);function ce(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===se?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case ee:return`Suspense`;case te:return`SuspenseList`;case re:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case C:return e.displayName||`Context`;case S:return(e._context.displayName||`Context`)+`.Consumer`;case w:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case T:return t=e.displayName||null,t===null?ce(e.type)||`Memo`:t;case ne:t=e._payload,e=e._init;try{return ce(e(t))}catch{}}return null}var le=Array.isArray,E=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,D=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ue={pending:!1,data:null,method:null,action:null},de=[],fe=-1;function pe(e){return{current:e}}function me(e){0>fe||(e.current=de[fe],de[fe]=null,fe--)}function O(e,t){fe++,de[fe]=e.current,e.current=t}var he=pe(null),ge=pe(null),_e=pe(null),ve=pe(null);function ye(e,t){switch(O(_e,t),O(ge,e),O(he,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Kd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Kd(t),e=qd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}me(he),O(he,e)}function be(){me(he),me(ge),me(_e)}function xe(e){e.memoizedState!==null&&O(ve,e);var t=he.current,n=qd(t,e.type);t!==n&&(O(ge,e),O(he,n))}function Se(e){ge.current===e&&(me(he),me(ge)),ve.current===e&&(me(ve),tp._currentValue=ue)}var Ce,we;function Te(e){if(Ce===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Ce=t&&t[1]||``,we=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Ce+e+we}var Ee=!1;function De(e,t){if(!e||Ee)return``;Ee=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,`props`,{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,`name`,{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Ee=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Te(n):``}function Oe(e,t){switch(e.tag){case 26:case 27:case 5:return Te(e.type);case 16:return Te(`Lazy`);case 13:return e.child!==t&&t!==null?Te(`Suspense Fallback`):Te(`Suspense`);case 19:return Te(`SuspenseList`);case 0:case 15:return De(e.type,!1);case 11:return De(e.type.render,!1);case 1:return De(e.type,!0);case 31:return Te(`Activity`);default:return``}}function ke(e){try{var t=``,n=null;do t+=Oe(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Ae=Object.prototype.hasOwnProperty,je=t.unstable_scheduleCallback,Me=t.unstable_cancelCallback,Ne=t.unstable_shouldYield,Pe=t.unstable_requestPaint,Fe=t.unstable_now,Ie=t.unstable_getCurrentPriorityLevel,Le=t.unstable_ImmediatePriority,Re=t.unstable_UserBlockingPriority,ze=t.unstable_NormalPriority,Be=t.unstable_LowPriority,Ve=t.unstable_IdlePriority,He=t.log,Ue=t.unstable_setDisableYieldValue,We=null,Ge=null;function Ke(e){if(typeof He==`function`&&Ue(e),Ge&&typeof Ge.setStrictMode==`function`)try{Ge.setStrictMode(We,e)}catch{}}var qe=Math.clz32?Math.clz32:Xe,Je=Math.log,Ye=Math.LN2;function Xe(e){return e>>>=0,e===0?32:31-(Je(e)/Ye|0)|0}var Ze=256,Qe=262144,$e=4194304;function et(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function tt(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=et(n))):i=et(o):i=et(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=et(n))):i=et(o)):i=et(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function nt(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function rt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function it(){var e=$e;return $e<<=1,!($e&62914560)&&($e=4194304),e}function at(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ot(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function st(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-qe(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&ct(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function ct(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-qe(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function lt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-qe(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function ut(e,t){var n=t&-t;return n=n&42?1:dt(n),(n&(e.suspendedLanes|t))===0?n:0}function dt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ft(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function pt(){var e=D.p;return e===0?(e=window.event,e===void 0?32:_p(e.type)):e}function mt(e,t){var n=D.p;try{return D.p=e,t()}finally{D.p=n}}var ht=Math.random().toString(36).slice(2),gt=`__reactFiber$`+ht,_t=`__reactProps$`+ht,vt=`__reactContainer$`+ht,yt=`__reactEvents$`+ht,bt=`__reactListeners$`+ht,xt=`__reactHandles$`+ht,St=`__reactResources$`+ht,Ct=`__reactMarker$`+ht;function wt(e){delete e[gt],delete e[_t],delete e[yt],delete e[bt],delete e[xt]}function Tt(e){var t=e[gt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[vt]||n[gt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=gf(e);e!==null;){if(n=e[gt])return n;e=gf(e)}return t}e=n,n=e.parentNode}return null}function Et(e){if(e=e[gt]||e[vt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Dt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Ot(e){var t=e[St];return t||=e[St]={hoistableStyles:new Map,hoistableScripts:new Map},t}function kt(e){e[Ct]=!0}var At=new Set,jt={};function Mt(e,t){Nt(e,t),Nt(e+`Capture`,t)}function Nt(e,t){for(jt[e]=t,e=0;e<t.length;e++)At.add(t[e])}var Pt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Ft={},It={};function Lt(e){return Ae.call(It,e)?!0:Ae.call(Ft,e)?!1:Pt.test(e)?It[e]=!0:(Ft[e]=!0,!1)}function Rt(e,t,n){if(Lt(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}function zt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function Bt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function Vt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Ht(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Ut(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Wt(e){if(!e._valueTracker){var t=Ht(e)?`checked`:`value`;e._valueTracker=Ut(e,t,``+e[t])}}function Gt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Ht(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function Kt(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var qt=/[\n"\\]/g;function Jt(e){return e.replace(qt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Yt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Vt(t)):e.value!==``+Vt(t)&&(e.value=``+Vt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Zt(e,o,Vt(n)):Zt(e,o,Vt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Vt(s):e.removeAttribute(`name`)}function Xt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Wt(e);return}n=n==null?``:``+Vt(n),t=t==null?n:``+Vt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Wt(e)}function Zt(e,t,n){t===`number`&&Kt(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Qt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Vt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function $t(e,t,n){if(t!=null&&(t=``+Vt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Vt(n)}function en(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(le(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Vt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Wt(e)}function tn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var nn=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function rn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||nn.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function an(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&rn(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&rn(e,o,t[o])}function on(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var sn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),cn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ln(e){return cn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function un(){}var dn=null;function fn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var pn=null,mn=null;function hn(e){var t=Et(e);if(t&&(e=t.stateNode)){var n=e[_t]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Yt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Jt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[_t]||null;if(!a)throw Error(i(90));Yt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Gt(r)}break a;case`textarea`:$t(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Qt(e,!!n.multiple,t,!1)}}}var gn=!1;function _n(e,t,n){if(gn)return e(t,n);gn=!0;try{return e(t)}finally{if(gn=!1,(pn!==null||mn!==null)&&(Tu(),pn&&(t=pn,e=mn,mn=pn=null,hn(t),e)))for(t=0;t<e.length;t++)hn(e[t])}}function vn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[_t]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var yn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),bn=!1;if(yn)try{var xn={};Object.defineProperty(xn,`passive`,{get:function(){bn=!0}}),window.addEventListener(`test`,xn,xn),window.removeEventListener(`test`,xn,xn)}catch{bn=!1}var Sn=null,Cn=null,wn=null;function Tn(){if(wn)return wn;var e,t=Cn,n=t.length,r,i=`value`in Sn?Sn.value:Sn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return wn=i.slice(e,1<r?1-r:void 0)}function En(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Dn(){return!0}function On(){return!1}function kn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?Dn:On,this.isPropagationStopped=On,this}return f(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=Dn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=Dn)},persist:function(){},isPersistent:Dn}),t}var An={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},jn=kn(An),Mn=f({},An,{view:0,detail:0}),Nn=kn(Mn),Pn,Fn,k,In=f({},Mn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:qn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==k&&(k&&e.type===`mousemove`?(Pn=e.screenX-k.screenX,Fn=e.screenY-k.screenY):Fn=Pn=0,k=e),Pn)},movementY:function(e){return`movementY`in e?e.movementY:Fn}}),Ln=kn(In),Rn=kn(f({},In,{dataTransfer:0})),zn=kn(f({},Mn,{relatedTarget:0})),Bn=kn(f({},An,{animationName:0,elapsedTime:0,pseudoElement:0})),Vn=kn(f({},An,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Hn=kn(f({},An,{data:0})),Un={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Wn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Gn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Kn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Gn[e])?!!t[e]:!1}function qn(){return Kn}var Jn=kn(f({},Mn,{key:function(e){if(e.key){var t=Un[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=En(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Wn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:qn,charCode:function(e){return e.type===`keypress`?En(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?En(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Yn=kn(f({},In,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Xn=kn(f({},Mn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:qn})),Zn=kn(f({},An,{propertyName:0,elapsedTime:0,pseudoElement:0})),Qn=kn(f({},In,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),$n=kn(f({},An,{newState:0,oldState:0})),er=[9,13,27,32],tr=yn&&`CompositionEvent`in window,nr=null;yn&&`documentMode`in document&&(nr=document.documentMode);var rr=yn&&`TextEvent`in window&&!nr,ir=yn&&(!tr||nr&&8<nr&&11>=nr),ar=` `,or=!1;function sr(e,t){switch(e){case`keyup`:return er.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function cr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var lr=!1;function ur(e,t){switch(e){case`compositionend`:return cr(t);case`keypress`:return t.which===32?(or=!0,ar):null;case`textInput`:return e=t.data,e===ar&&or?null:e;default:return null}}function dr(e,t){if(lr)return e===`compositionend`||!tr&&sr(e,t)?(e=Tn(),wn=Cn=Sn=null,lr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return ir&&t.locale!==`ko`?null:t.data;default:return null}}var A={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function fr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!A[e.type]:t===`textarea`}function pr(e,t,n,r){pn?mn?mn.push(r):mn=[r]:pn=r,t=jd(t,`onChange`),0<t.length&&(n=new jn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var mr=null,hr=null;function gr(e){wd(e,0)}function _r(e){if(Gt(Dt(e)))return e}function vr(e,t){if(e===`change`)return t}var yr=!1;if(yn){var br;if(yn){var xr=`oninput`in document;if(!xr){var Sr=document.createElement(`div`);Sr.setAttribute(`oninput`,`return;`),xr=typeof Sr.oninput==`function`}br=xr}else br=!1;yr=br&&(!document.documentMode||9<document.documentMode)}function Cr(){mr&&(mr.detachEvent(`onpropertychange`,wr),hr=mr=null)}function wr(e){if(e.propertyName===`value`&&_r(hr)){var t=[];pr(t,hr,e,fn(e)),_n(gr,t)}}function Tr(e,t,n){e===`focusin`?(Cr(),mr=t,hr=n,mr.attachEvent(`onpropertychange`,wr)):e===`focusout`&&Cr()}function Er(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return _r(hr)}function Dr(e,t){if(e===`click`)return _r(t)}function Or(e,t){if(e===`input`||e===`change`)return _r(t)}function kr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Ar=typeof Object.is==`function`?Object.is:kr;function jr(e,t){if(Ar(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Ae.call(t,i)||!Ar(e[i],t[i]))return!1}return!0}function Mr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Nr(e,t){var n=Mr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Mr(n)}}function Pr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Pr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Fr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Kt(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Kt(e.document)}return t}function j(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Ir=yn&&`documentMode`in document&&11>=document.documentMode,Lr=null,Rr=null,zr=null,Br=!1;function Vr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Br||Lr==null||Lr!==Kt(r)||(r=Lr,`selectionStart`in r&&j(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),zr&&jr(zr,r)||(zr=r,r=jd(Rr,`onSelect`),0<r.length&&(t=new jn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Lr)))}function Hr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Ur={animationend:Hr(`Animation`,`AnimationEnd`),animationiteration:Hr(`Animation`,`AnimationIteration`),animationstart:Hr(`Animation`,`AnimationStart`),transitionrun:Hr(`Transition`,`TransitionRun`),transitionstart:Hr(`Transition`,`TransitionStart`),transitioncancel:Hr(`Transition`,`TransitionCancel`),transitionend:Hr(`Transition`,`TransitionEnd`)},Wr={},Gr={};yn&&(Gr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Ur.animationend.animation,delete Ur.animationiteration.animation,delete Ur.animationstart.animation),`TransitionEvent`in window||delete Ur.transitionend.transition);function Kr(e){if(Wr[e])return Wr[e];if(!Ur[e])return e;var t=Ur[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Gr)return Wr[e]=t[n];return e}var qr=Kr(`animationend`),Jr=Kr(`animationiteration`),Yr=Kr(`animationstart`),Xr=Kr(`transitionrun`),Zr=Kr(`transitionstart`),Qr=Kr(`transitioncancel`),$r=Kr(`transitionend`),ei=new Map,M=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);M.push(`scrollEnd`);function ti(e,t){ei.set(e,t),Mt(t,[e])}var ni=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},ri=[],ii=0,ai=0;function oi(){for(var e=ii,t=ai=ii=0;t<e;){var n=ri[t];ri[t++]=null;var r=ri[t];ri[t++]=null;var i=ri[t];ri[t++]=null;var a=ri[t];if(ri[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&ui(n,i,a)}}function si(e,t,n,r){ri[ii++]=e,ri[ii++]=t,ri[ii++]=n,ri[ii++]=r,ai|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function ci(e,t,n,r){return si(e,t,n,r),di(e)}function li(e,t){return si(e,null,null,t),di(e)}function ui(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-qe(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function di(e){if(50<G)throw G=0,_u=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var fi={};function pi(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function mi(e,t,n,r){return new pi(e,t,n,r)}function hi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function gi(e,t){var n=e.alternate;return n===null?(n=mi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function _i(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function vi(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)hi(e)&&(s=1);else if(typeof e==`string`)s=Kf(e,n,he.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case re:return e=mi(31,n,t,a),e.elementType=re,e.lanes=o,e;case y:return yi(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=mi(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case ee:return e=mi(13,n,t,a),e.elementType=ee,e.lanes=o,e;case te:return e=mi(19,n,t,a),e.elementType=te,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case C:s=10;break a;case S:s=9;break a;case w:s=11;break a;case T:s=14;break a;case ne:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=mi(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function yi(e,t,n,r){return e=mi(7,e,r,t),e.lanes=n,e}function bi(e,t,n){return e=mi(6,e,null,t),e.lanes=n,e}function xi(e){var t=mi(18,null,null,0);return t.stateNode=e,t}function Si(e,t,n){return t=mi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Ci=new WeakMap;function wi(e,t){if(typeof e==`object`&&e){var n=Ci.get(e);return n===void 0?(t={value:e,source:t,stack:ke(t)},Ci.set(e,t),t):n}return{value:e,source:t,stack:ke(t)}}var Ti=[],Ei=0,Di=null,Oi=0,ki=[],Ai=0,ji=null,Mi=1,Ni=``;function Pi(e,t){Ti[Ei++]=Oi,Ti[Ei++]=Di,Di=e,Oi=t}function Fi(e,t,n){ki[Ai++]=Mi,ki[Ai++]=Ni,ki[Ai++]=ji,ji=e;var r=Mi;e=Ni;var i=32-qe(r)-1;r&=~(1<<i),n+=1;var a=32-qe(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Mi=1<<32-qe(t)+i|n<<i|r,Ni=a+e}else Mi=1<<a|n<<i|r,Ni=e}function Ii(e){e.return!==null&&(Pi(e,1),Fi(e,1,0))}function Li(e){for(;e===Di;)Di=Ti[--Ei],Ti[Ei]=null,Oi=Ti[--Ei],Ti[Ei]=null;for(;e===ji;)ji=ki[--Ai],ki[Ai]=null,Ni=ki[--Ai],ki[Ai]=null,Mi=ki[--Ai],ki[Ai]=null}function Ri(e,t){ki[Ai++]=Mi,ki[Ai++]=Ni,ki[Ai++]=ji,Mi=t.id,Ni=t.overflow,ji=e}var zi=null,N=null,P=!1,Bi=null,Vi=!1,Hi=Error(i(519));function Ui(e){throw Yi(wi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Hi}function Wi(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[gt]=e,t[_t]=r,n){case`dialog`:q(`cancel`,t),q(`close`,t);break;case`iframe`:case`object`:case`embed`:q(`load`,t);break;case`video`:case`audio`:for(n=0;n<Sd.length;n++)q(Sd[n],t);break;case`source`:q(`error`,t);break;case`img`:case`image`:case`link`:q(`error`,t),q(`load`,t);break;case`details`:q(`toggle`,t);break;case`input`:q(`invalid`,t),Xt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:q(`invalid`,t);break;case`textarea`:q(`invalid`,t),en(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Ld(t.textContent,n)?(r.popover!=null&&(q(`beforetoggle`,t),q(`toggle`,t)),r.onScroll!=null&&q(`scroll`,t),r.onScrollEnd!=null&&q(`scrollend`,t),r.onClick!=null&&(t.onclick=un),t=!0):t=!1,t||Ui(e,!0)}function Gi(e){for(zi=e.return;zi;)switch(zi.tag){case 5:case 31:case 13:Vi=!1;return;case 27:case 3:Vi=!0;return;default:zi=zi.return}}function Ki(e){if(e!==zi)return!1;if(!P)return Gi(e),P=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!==`form`&&n!==`button`)||Jd(e.type,e.memoizedProps)),n=!n),n&&N&&Ui(e),Gi(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));N=hf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));N=hf(e)}else t===27?(t=N,nf(e.type)?(e=mf,mf=null,N=e):N=t):N=zi?pf(e.stateNode.nextSibling):null;return!0}function qi(){N=zi=null,P=!1}function Ji(){var e=Bi;return e!==null&&(ru===null?ru=e:ru.push.apply(ru,e),Bi=null),e}function Yi(e){Bi===null?Bi=[e]:Bi.push(e)}var Xi=pe(null),Zi=null,Qi=null;function $i(e,t,n){O(Xi,t._currentValue),t._currentValue=n}function ea(e){e._currentValue=Xi.current,me(Xi)}function ta(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function na(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),ta(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),ta(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function ra(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Ar(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===ve.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[tp]:e.push(tp))}a=a.return}e!==null&&na(t,e,n,r),t.flags|=262144}function ia(e){for(e=e.firstContext;e!==null;){if(!Ar(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function aa(e){Zi=e,Qi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function oa(e){return ca(Zi,e)}function sa(e,t){return Zi===null&&aa(e),ca(e,t)}function ca(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Qi===null){if(e===null)throw Error(i(308));Qi=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Qi=Qi.next=t;return n}var la=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},ua=t.unstable_scheduleCallback,da=t.unstable_NormalPriority,fa={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function pa(){return{controller:new la,data:new Map,refCount:0}}function ma(e){e.refCount--,e.refCount===0&&ua(da,function(){e.controller.abort()})}var ha=null,ga=0,_a=0,va=null;function ya(e,t){if(ha===null){var n=ha=[];ga=0,_a=gd(),va={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return ga++,t.then(ba,ba),t}function ba(){if(--ga===0&&ha!==null){va!==null&&(va.status=`fulfilled`);var e=ha;ha=null,_a=0,va=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function xa(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Sa=E.S;E.S=function(e,t){ou=Fe(),typeof t==`object`&&t&&typeof t.then==`function`&&ya(e,t),Sa!==null&&Sa(e,t)};var Ca=pe(null);function wa(){var e=Ca.current;return e===null?V.pooledCache:e}function Ta(e,t){t===null?O(Ca,Ca.current):O(Ca,t.pool)}function Ea(){var e=wa();return e===null?null:{parent:fa._currentValue,pool:e}}var Da=Error(i(460)),Oa=Error(i(474)),ka=Error(i(542)),Aa={then:function(){}};function ja(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Ma(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(un,un),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ia(e),e;default:if(typeof t.status==`string`)t.then(un,un);else{if(e=V,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ia(e),e}throw Pa=t,Da}}function Na(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Pa=e,Da):e}}var Pa=null;function Fa(){if(Pa===null)throw Error(i(459));var e=Pa;return Pa=null,e}function Ia(e){if(e===Da||e===ka)throw Error(i(483))}var La=null,Ra=0;function za(e){var t=Ra;return Ra+=1,La===null&&(La=[]),Ma(La,e,t)}function Ba(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Va(e,t){throw t.$$typeof===m?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Ha(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=gi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=bi(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===ne&&Na(i)===t.type)?(t=a(t,n.props),Ba(t,n),t.return=e,t):(t=vi(n.type,n.key,n.props,null,e.mode,r),Ba(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Si(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=yi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=bi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case g:return n=vi(t.type,t.key,t.props,null,e.mode,n),Ba(n,t),n.return=e,n;case v:return t=Si(t,e.mode,n),t.return=e,t;case ne:return t=Na(t),f(e,t,n)}if(le(t)||oe(t))return t=yi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,za(t),n);if(t.$$typeof===C)return f(e,sa(e,t),n);Va(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case g:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case ne:return n=Na(n),p(e,t,n,r)}if(le(n)||oe(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,za(n),r);if(n.$$typeof===C)return p(e,t,sa(e,n),r);Va(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case g:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case ne:return r=Na(r),m(e,t,n,r,i)}if(le(r)||oe(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,za(r),i);if(r.$$typeof===C)return m(e,t,n,sa(t,r),i);Va(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),P&&Pi(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return P&&Pi(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),P&&Pi(i,h),l}function _(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),P&&Pi(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return P&&Pi(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),P&&Pi(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case g:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===ne&&Na(l)===r.type){n(e,r.sibling),c=a(r,o.props),Ba(c,o),c.return=e,e=c;break a}n(e,r);break}else t(e,r);r=r.sibling}o.type===y?(c=yi(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=vi(o.type,o.key,o.props,null,e.mode,c),Ba(c,o),c.return=e,e=c)}return s(e);case v:a:{for(l=o.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}else{n(e,r);break}else t(e,r);r=r.sibling}c=Si(o,e.mode,c),c.return=e,e=c}return s(e);case ne:return o=Na(o),b(e,r,o,c)}if(le(o))return h(e,r,o,c);if(oe(o)){if(l=oe(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),_(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,za(o),c);if(o.$$typeof===C)return b(e,r,sa(e,o),c);Va(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=bi(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{Ra=0;var i=b(e,t,n,r);return La=null,i}catch(t){if(t===Da||t===ka)throw t;var a=mi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Ua=Ha(!0),Wa=Ha(!1),Ga=!1;function Ka(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function qa(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ja(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ya(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,B&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=di(e),ui(e,null,n),t}return si(e,r,t,n),di(e)}function Xa(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,lt(e,n)}}function Za(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Qa=!1;function $a(){if(Qa){var e=va;if(e!==null)throw e}}function eo(e,t,n,r){Qa=!1;var i=e.updateQueue;Ga=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var p=s.lane&-536870913,m=p!==s.lane;if(m?(U&p)===p:(r&p)===p){p!==0&&p===_a&&(Qa=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var h=e,g=s;p=t;var _=n;switch(g.tag){case 1:if(h=g.payload,typeof h==`function`){d=h.call(_,d,p);break a}d=h;break a;case 3:h.flags=h.flags&-65537|128;case 0:if(h=g.payload,p=typeof h==`function`?h.call(_,d,p):h,p==null)break a;d=f({},d,p);break a;case 2:Ga=!0}}p=s.callback,p!==null&&(e.flags|=64,m&&(e.flags|=8192),m=i.callbacks,m===null?i.callbacks=[p]:m.push(p))}else m={lane:p,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=m,c=d):u=u.next=m,o|=p;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;m=s,s=m.next,m.next=null,i.lastBaseUpdate=m,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Zl|=o,e.lanes=o,e.memoizedState=d}}function to(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function no(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)to(n[e],t)}var ro=pe(null),io=pe(0);function ao(e,t){e=Yl,O(io,e),O(ro,t),Yl=e|t.baseLanes}function oo(){O(io,Yl),O(ro,ro.current)}function so(){Yl=io.current,me(ro),me(io)}var co=pe(null),lo=null;function uo(e){var t=e.alternate;O(go,go.current&1),O(co,e),lo===null&&(t===null||ro.current!==null||t.memoizedState!==null)&&(lo=e)}function fo(e){O(go,go.current),O(co,e),lo===null&&(lo=e)}function po(e){e.tag===22?(O(go,go.current),O(co,e),lo===null&&(lo=e)):mo(e)}function mo(){O(go,go.current),O(co,co.current)}function ho(e){me(co),lo===e&&(lo=null),me(go)}var go=pe(0);function _o(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||uf(n)||df(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var vo=0,F=null,I=null,yo=null,bo=!1,xo=!1,So=!1,Co=0,wo=0,To=null,Eo=0;function Do(){throw Error(i(321))}function Oo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ar(e[n],t[n]))return!1;return!0}function ko(e,t,n,r,i,a){return vo=a,F=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,E.H=e===null||e.memoizedState===null?Gs:Ks,So=!1,a=n(r,i),So=!1,xo&&(a=jo(t,n,r,i)),Ao(e),a}function Ao(e){E.H=Ws;var t=I!==null&&I.next!==null;if(vo=0,yo=I=F=null,bo=!1,wo=0,To=null,t)throw Error(i(300));e===null||lc||(e=e.dependencies,e!==null&&ia(e)&&(lc=!0))}function jo(e,t,n,r){F=e;var a=0;do{if(xo&&(To=null),wo=0,xo=!1,25<=a)throw Error(i(301));if(a+=1,yo=I=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}E.H=qs,o=t(n,r)}while(xo);return o}function Mo(){var e=E.H,t=e.useState()[0];return t=typeof t.then==`function`?Ro(t):t,e=e.useState()[0],(I===null?null:I.memoizedState)!==e&&(F.flags|=1024),t}function No(){var e=Co!==0;return Co=0,e}function Po(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Fo(e){if(bo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}bo=!1}vo=0,yo=I=F=null,xo=!1,wo=Co=0,To=null}function Io(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return yo===null?F.memoizedState=yo=e:yo=yo.next=e,yo}function L(){if(I===null){var e=F.alternate;e=e===null?null:e.memoizedState}else e=I.next;var t=yo===null?F.memoizedState:yo.next;if(t!==null)yo=t,I=e;else{if(e===null)throw F.alternate===null?Error(i(467)):Error(i(310));I=e,e={memoizedState:I.memoizedState,baseState:I.baseState,baseQueue:I.baseQueue,queue:I.queue,next:null},yo===null?F.memoizedState=yo=e:yo=yo.next=e}return yo}function Lo(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Ro(e){var t=wo;return wo+=1,To===null&&(To=[]),e=Ma(To,e,t),t=F,(yo===null?t.memoizedState:yo.next)===null&&(t=t.alternate,E.H=t===null||t.memoizedState===null?Gs:Ks),e}function zo(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Ro(e);if(e.$$typeof===C)return oa(e)}throw Error(i(438,String(e)))}function Bo(e){var t=null,n=F.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=F.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Lo(),F.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ie;return t.index++,n}function Vo(e,t){return typeof t==`function`?t(e):t}function Ho(e){return Uo(L(),I,e)}function Uo(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(vo&f)===f:(U&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===_a&&(d=!0);else if((vo&p)===p){u=u.next,p===_a&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,F.lanes|=p,Zl|=p;f=u.action,So&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,F.lanes|=f,Zl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Ar(o,e.memoizedState)&&(lc=!0,d&&(n=va,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Wo(e){var t=L(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Ar(o,t.memoizedState)||(lc=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Go(e,t,n){var r=F,a=L(),o=P;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Ar((I||a).memoizedState,n);if(s&&(a.memoizedState=n,lc=!0),a=a.queue,gs(Jo.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||yo!==null&&yo.memoizedState.tag&1){if(r.flags|=2048,ds(9,{destroy:void 0},qo.bind(null,r,a,n,t),null),V===null)throw Error(i(349));o||vo&127||Ko(r,t,n)}return n}function Ko(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=F.updateQueue,t===null?(t=Lo(),F.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function qo(e,t,n,r){t.value=n,t.getSnapshot=r,Yo(t)&&Xo(e)}function Jo(e,t,n){return n(function(){Yo(t)&&Xo(e)})}function Yo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ar(e,n)}catch{return!0}}function Xo(e){var t=li(e,2);t!==null&&bu(t,e,2)}function Zo(e){var t=Io();if(typeof e==`function`){var n=e;if(e=n(),So){Ke(!0);try{n()}finally{Ke(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Vo,lastRenderedState:e},t}function Qo(e,t,n,r){return e.baseState=n,Uo(e,I,typeof r==`function`?r:Vo)}function $o(e,t,n,r,a){if(Vs(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};E.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,es(t,o)):(o.next=n.next,t.pending=n.next=o)}}function es(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=E.T,o={};E.T=o;try{var s=n(i,r),c=E.S;c!==null&&c(o,s),ts(e,t,s)}catch(n){rs(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),E.T=a}}else try{a=n(i,r),ts(e,t,a)}catch(n){rs(e,t,n)}}function ts(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){ns(e,t,n)},function(n){return rs(e,t,n)}):ns(e,t,n)}function ns(e,t,n){t.status=`fulfilled`,t.value=n,is(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,es(e,n)))}function rs(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,is(t),t=t.next;while(t!==r)}e.action=null}function is(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function as(e,t){return t}function os(e,t){if(P){var n=V.formState;if(n!==null){a:{var r=F;if(P){if(N){b:{for(var i=N,a=Vi;i.nodeType!==8;){if(!a){i=null;break b}if(i=pf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){N=pf(i.nextSibling),r=i.data===`F!`;break a}}Ui(r)}r=!1}r&&(t=n[0])}}return n=Io(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:as,lastRenderedState:t},n.queue=r,n=Rs.bind(null,F,r),r.dispatch=n,r=Zo(!1),a=Bs.bind(null,F,!1,r.queue),r=Io(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=$o.bind(null,F,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function ss(e){return cs(L(),I,e)}function cs(e,t,n){if(t=Uo(e,t,as)[0],e=Ho(Vo)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Ro(t)}catch(e){throw e===Da?ka:e}else r=t;t=L();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(F.flags|=2048,ds(9,{destroy:void 0},ls.bind(null,i,n),null)),[r,a,e]}function ls(e,t){e.action=t}function us(e){var t=L(),n=I;if(n!==null)return cs(t,n,e);L(),t=t.memoizedState,n=L();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function ds(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=F.updateQueue,t===null&&(t=Lo(),F.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function fs(){return L().memoizedState}function ps(e,t,n,r){var i=Io();F.flags|=e,i.memoizedState=ds(1|t,{destroy:void 0},n,r===void 0?null:r)}function ms(e,t,n,r){var i=L();r=r===void 0?null:r;var a=i.memoizedState.inst;I!==null&&r!==null&&Oo(r,I.memoizedState.deps)?i.memoizedState=ds(t,a,n,r):(F.flags|=e,i.memoizedState=ds(1|t,a,n,r))}function hs(e,t){ps(8390656,8,e,t)}function gs(e,t){ms(2048,8,e,t)}function _s(e){F.flags|=4;var t=F.updateQueue;if(t===null)t=Lo(),F.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function vs(e){var t=L().memoizedState;return _s({ref:t,nextImpl:e}),function(){if(B&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function ys(e,t){return ms(4,2,e,t)}function bs(e,t){return ms(4,4,e,t)}function xs(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Ss(e,t,n){n=n==null?null:n.concat([e]),ms(4,4,xs.bind(null,t,e),n)}function Cs(){}function ws(e,t){var n=L();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Oo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ts(e,t){var n=L();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Oo(t,r[1]))return r[0];if(r=e(),So){Ke(!0);try{e()}finally{Ke(!1)}}return n.memoizedState=[r,t],r}function Es(e,t,n){return n===void 0||vo&1073741824&&!(U&261930)?e.memoizedState=t:(e.memoizedState=n,e=yu(),F.lanes|=e,Zl|=e,n)}function Ds(e,t,n,r){return Ar(n,t)?n:ro.current===null?!(vo&42)||vo&1073741824&&!(U&261930)?(lc=!0,e.memoizedState=n):(e=yu(),F.lanes|=e,Zl|=e,t):(e=Es(e,n,r),Ar(e,t)||(lc=!0),e)}function Os(e,t,n,r,i){var a=D.p;D.p=a!==0&&8>a?a:8;var o=E.T,s={};E.T=s,Bs(e,!1,t,n);try{var c=i(),l=E.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?zs(e,t,xa(c,r),vu(e)):zs(e,t,r,vu(e))}catch(n){zs(e,t,{then:function(){},status:`rejected`,reason:n},vu())}finally{D.p=a,o!==null&&s.types!==null&&(o.types=s.types),E.T=o}}function ks(){}function As(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=js(e).queue;Os(e,a,t,ue,n===null?ks:function(){return Ms(e),n(r)})}function js(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ue,baseState:ue,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Vo,lastRenderedState:ue},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Vo,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Ms(e){var t=js(e);t.next===null&&(t=e.alternate.memoizedState),zs(e,t.next.queue,{},vu())}function Ns(){return oa(tp)}function Ps(){return L().memoizedState}function Fs(){return L().memoizedState}function Is(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=vu();e=Ja(n);var r=Ya(t,e,n);r!==null&&(bu(r,t,n),Xa(r,t,n)),t={cache:pa()},e.payload=t;return}t=t.return}}function Ls(e,t,n){var r=vu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Vs(e)?Hs(t,n):(n=ci(e,t,n,r),n!==null&&(bu(n,e,r),Us(n,t,r)))}function Rs(e,t,n){zs(e,t,n,vu())}function zs(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Vs(e))Hs(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Ar(s,o))return si(e,t,i,0),V===null&&oi(),!1}catch{}if(n=ci(e,t,i,r),n!==null)return bu(n,e,r),Us(n,t,r),!0}return!1}function Bs(e,t,n,r){if(r={lane:2,revertLane:gd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Vs(e)){if(t)throw Error(i(479))}else t=ci(e,n,r,2),t!==null&&bu(t,e,2)}function Vs(e){var t=e.alternate;return e===F||t!==null&&t===F}function Hs(e,t){xo=bo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Us(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,lt(e,n)}}var Ws={readContext:oa,use:zo,useCallback:Do,useContext:Do,useEffect:Do,useImperativeHandle:Do,useLayoutEffect:Do,useInsertionEffect:Do,useMemo:Do,useReducer:Do,useRef:Do,useState:Do,useDebugValue:Do,useDeferredValue:Do,useTransition:Do,useSyncExternalStore:Do,useId:Do,useHostTransitionStatus:Do,useFormState:Do,useActionState:Do,useOptimistic:Do,useMemoCache:Do,useCacheRefresh:Do};Ws.useEffectEvent=Do;var Gs={readContext:oa,use:zo,useCallback:function(e,t){return Io().memoizedState=[e,t===void 0?null:t],e},useContext:oa,useEffect:hs,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),ps(4194308,4,xs.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ps(4194308,4,e,t)},useInsertionEffect:function(e,t){ps(4,2,e,t)},useMemo:function(e,t){var n=Io();t=t===void 0?null:t;var r=e();if(So){Ke(!0);try{e()}finally{Ke(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=Io();if(n!==void 0){var i=n(t);if(So){Ke(!0);try{n(t)}finally{Ke(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Ls.bind(null,F,e),[r.memoizedState,e]},useRef:function(e){var t=Io();return e={current:e},t.memoizedState=e},useState:function(e){e=Zo(e);var t=e.queue,n=Rs.bind(null,F,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Cs,useDeferredValue:function(e,t){return Es(Io(),e,t)},useTransition:function(){var e=Zo(!1);return e=Os.bind(null,F,e.queue,!0,!1),Io().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=F,a=Io();if(P){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),V===null)throw Error(i(349));U&127||Ko(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,hs(Jo.bind(null,r,o,e),[e]),r.flags|=2048,ds(9,{destroy:void 0},qo.bind(null,r,o,n,t),null),n},useId:function(){var e=Io(),t=V.identifierPrefix;if(P){var n=Ni,r=Mi;n=(r&~(1<<32-qe(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=Co++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=Eo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:Ns,useFormState:os,useActionState:os,useOptimistic:function(e){var t=Io();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Bs.bind(null,F,!0,n),n.dispatch=t,[e,t]},useMemoCache:Bo,useCacheRefresh:function(){return Io().memoizedState=Is.bind(null,F)},useEffectEvent:function(e){var t=Io(),n={impl:e};return t.memoizedState=n,function(){if(B&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},Ks={readContext:oa,use:zo,useCallback:ws,useContext:oa,useEffect:gs,useImperativeHandle:Ss,useInsertionEffect:ys,useLayoutEffect:bs,useMemo:Ts,useReducer:Ho,useRef:fs,useState:function(){return Ho(Vo)},useDebugValue:Cs,useDeferredValue:function(e,t){return Ds(L(),I.memoizedState,e,t)},useTransition:function(){var e=Ho(Vo)[0],t=L().memoizedState;return[typeof e==`boolean`?e:Ro(e),t]},useSyncExternalStore:Go,useId:Ps,useHostTransitionStatus:Ns,useFormState:ss,useActionState:ss,useOptimistic:function(e,t){return Qo(L(),I,e,t)},useMemoCache:Bo,useCacheRefresh:Fs};Ks.useEffectEvent=vs;var qs={readContext:oa,use:zo,useCallback:ws,useContext:oa,useEffect:gs,useImperativeHandle:Ss,useInsertionEffect:ys,useLayoutEffect:bs,useMemo:Ts,useReducer:Wo,useRef:fs,useState:function(){return Wo(Vo)},useDebugValue:Cs,useDeferredValue:function(e,t){var n=L();return I===null?Es(n,e,t):Ds(n,I.memoizedState,e,t)},useTransition:function(){var e=Wo(Vo)[0],t=L().memoizedState;return[typeof e==`boolean`?e:Ro(e),t]},useSyncExternalStore:Go,useId:Ps,useHostTransitionStatus:Ns,useFormState:us,useActionState:us,useOptimistic:function(e,t){var n=L();return I===null?(n.baseState=e,[e,n.queue.dispatch]):Qo(n,I,e,t)},useMemoCache:Bo,useCacheRefresh:Fs};qs.useEffectEvent=vs;function Js(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:f({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Ys={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=vu(),i=Ja(r);i.payload=t,n!=null&&(i.callback=n),t=Ya(e,i,r),t!==null&&(bu(t,e,r),Xa(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=vu(),i=Ja(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Ya(e,i,r),t!==null&&(bu(t,e,r),Xa(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=vu(),r=Ja(n);r.tag=2,t!=null&&(r.callback=t),t=Ya(e,r,n),t!==null&&(bu(t,e,n),Xa(t,e,n))}};function Xs(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!jr(n,r)||!jr(i,a):!0}function Zs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Ys.enqueueReplaceState(t,t.state,null)}function Qs(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=f({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function $s(e){ni(e)}function ec(e){console.error(e)}function tc(e){ni(e)}function nc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function rc(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function ic(e,t,n){return n=Ja(n),n.tag=3,n.payload={element:null},n.callback=function(){nc(e,t)},n}function ac(e){return e=Ja(e),e.tag=3,e}function oc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){rc(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){rc(t,n,r),typeof i!=`function`&&(lu===null?lu=new Set([this]):lu.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function sc(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&ra(t,n,a,!0),n=co.current,n!==null){switch(n.tag){case 31:case 13:return lo===null?Mu():n.alternate===null&&Xl===0&&(Xl=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Aa?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Xu(e,r,a)),!1;case 22:return n.flags|=65536,r===Aa?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Xu(e,r,a)),!1}throw Error(i(435,n.tag))}return Xu(e,r,a),Mu(),!1}if(P)return t=co.current,t===null?(r!==Hi&&(t=Error(i(423),{cause:r}),Yi(wi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=wi(r,n),a=ic(e.stateNode,r,a),Za(e,a),Xl!==4&&(Xl=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==Hi&&(e=Error(i(422),{cause:r}),Yi(wi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=wi(o,n),nu===null?nu=[o]:nu.push(o),Xl!==4&&(Xl=2),t===null)return!0;r=wi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=ic(n.stateNode,r,e),Za(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(lu===null||!lu.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=ac(a),oc(a,e,n,r),Za(n,a),!1}n=n.return}while(n!==null);return!1}var cc=Error(i(461)),lc=!1;function uc(e,t,n,r){t.child=e===null?Wa(t,null,n,r):Ua(t,e.child,n,r)}function dc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return aa(t),r=ko(e,t,n,o,a,i),s=No(),e!==null&&!lc?(Po(e,t,i),Fc(e,t,i)):(P&&s&&Ii(t),t.flags|=1,uc(e,t,r,i),t.child)}function fc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!hi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,pc(e,t,a,r,i)):(e=vi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Ic(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?jr:n,n(o,r)&&e.ref===t.ref)return Fc(e,t,i)}return t.flags|=1,e=gi(a,r),e.ref=t.ref,e.return=t,t.child=e}function pc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(jr(a,r)&&e.ref===t.ref)if(lc=!1,t.pendingProps=r=a,Ic(e,i))e.flags&131072&&(lc=!0);else return t.lanes=e.lanes,Fc(e,t,i)}return xc(e,t,n,r,i)}function mc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return gc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ta(t,a===null?null:a.cachePool),a===null?oo():ao(t,a),po(t);else return r=t.lanes=536870912,gc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Ta(t,null),oo(),mo(t)):(Ta(t,a.cachePool),ao(t,a),mo(t),t.memoizedState=null);return uc(e,t,i,n),t.child}function hc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function gc(e,t,n,r,i){var a=wa();return a=a===null?null:{parent:fa._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Ta(t,null),oo(),po(t),e!==null&&ra(e,t,r,!0),t.childLanes=i,null}function _c(e,t){return t=Ac({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function vc(e,t,n){return Ua(t,e.child,null,n),e=_c(t,t.pendingProps),e.flags|=2,ho(t),t.memoizedState=null,e}function yc(e,t,n){var r=t.pendingProps,a=(t.flags&128)!=0;if(t.flags&=-129,e===null){if(P){if(r.mode===`hidden`)return e=_c(t,r),t.lanes=536870912,hc(null,e);if(fo(t),(e=N)?(e=lf(e,Vi),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ji===null?null:{id:Mi,overflow:Ni},retryLane:536870912,hydrationErrors:null},n=xi(e),n.return=t,t.child=n,zi=t,N=null)):e=null,e===null)throw Ui(t);return t.lanes=536870912,null}return _c(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(fo(t),a)if(t.flags&256)t.flags&=-257,t=vc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558));else if(lc||ra(e,t,n,!1),a=(n&e.childLanes)!==0,lc||a){if(r=V,r!==null&&(s=ut(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,li(e,s),bu(r,e,s),cc;Mu(),t=vc(e,t,n)}else e=o.treeContext,N=pf(s.nextSibling),zi=t,P=!0,Bi=null,Vi=!1,e!==null&&Ri(t,e),t=_c(t,r),t.flags|=4096;return t}return e=gi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function bc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function xc(e,t,n,r,i){return aa(t),n=ko(e,t,n,r,void 0,i),r=No(),e!==null&&!lc?(Po(e,t,i),Fc(e,t,i)):(P&&r&&Ii(t),t.flags|=1,uc(e,t,n,i),t.child)}function Sc(e,t,n,r,i,a){return aa(t),t.updateQueue=null,n=jo(t,r,n,i),Ao(e),r=No(),e!==null&&!lc?(Po(e,t,a),Fc(e,t,a)):(P&&r&&Ii(t),t.flags|=1,uc(e,t,n,a),t.child)}function Cc(e,t,n,r,i){if(aa(t),t.stateNode===null){var a=fi,o=n.contextType;typeof o==`object`&&o&&(a=oa(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Ys,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Ka(t),o=n.contextType,a.context=typeof o==`object`&&o?oa(o):fi,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Js(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Ys.enqueueReplaceState(a,a.state,null),eo(t,r,a,i),$a(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Qs(n,s);a.props=c;var l=a.context,u=n.contextType;o=fi,typeof u==`object`&&u&&(o=oa(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Zs(t,a,r,o),Ga=!1;var f=t.memoizedState;a.state=f,eo(t,r,a,i),$a(),l=t.memoizedState,s||f!==l||Ga?(typeof d==`function`&&(Js(t,n,d,r),l=t.memoizedState),(c=Ga||Xs(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,qa(e,t),o=t.memoizedProps,u=Qs(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=fi,typeof l==`object`&&l&&(c=oa(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Zs(t,a,r,c),Ga=!1,f=t.memoizedState,a.state=f,eo(t,r,a,i),$a();var p=t.memoizedState;o!==d||f!==p||Ga||e!==null&&e.dependencies!==null&&ia(e.dependencies)?(typeof s==`function`&&(Js(t,n,s,r),p=t.memoizedState),(u=Ga||Xs(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&ia(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,bc(e,t),r=(t.flags&128)!=0,a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Ua(t,e.child,null,i),t.child=Ua(t,null,n,i)):uc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=Fc(e,t,i),e}function wc(e,t,n,r){return qi(),t.flags|=256,uc(e,t,n,r),t.child}var Tc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Ec(e){return{baseLanes:e,cachePool:Ea()}}function Dc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=eu),e}function Oc(e,t,n){var r=t.pendingProps,a=!1,o=(t.flags&128)!=0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(go.current&2)!=0),s&&(a=!0,t.flags&=-129),s=(t.flags&32)!=0,t.flags&=-33,e===null){if(P){if(a?uo(t):mo(t),(e=N)?(e=lf(e,Vi),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ji===null?null:{id:Mi,overflow:Ni},retryLane:536870912,hydrationErrors:null},n=xi(e),n.return=t,t.child=n,zi=t,N=null)):e=null,e===null)throw Ui(t);return df(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(mo(t),a=t.mode,c=Ac({mode:`hidden`,children:c},a),r=yi(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=Ec(n),r.childLanes=Dc(e,s,n),t.memoizedState=Tc,hc(null,r)):(uo(t),kc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(uo(t),t.flags&=-257,t=jc(e,t,n)):t.memoizedState===null?(mo(t),c=r.fallback,a=t.mode,r=Ac({mode:`visible`,children:r.children},a),c=yi(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Ua(t,e.child,null,n),r=t.child,r.memoizedState=Ec(n),r.childLanes=Dc(e,s,n),t.memoizedState=Tc,t=hc(null,r)):(mo(t),t.child=e.child,t.flags|=128,t=null);else if(uo(t),df(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Yi({value:r,source:null,stack:null}),t=jc(e,t,n)}else if(lc||ra(e,t,n,!1),s=(n&e.childLanes)!==0,lc||s){if(s=V,s!==null&&(r=ut(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,li(e,r),bu(s,e,r),cc;uf(c)||Mu(),t=jc(e,t,n)}else uf(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,N=pf(c.nextSibling),zi=t,P=!0,Bi=null,Vi=!1,e!==null&&Ri(t,e),t=kc(t,r.children),t.flags|=4096);return t}return a?(mo(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=gi(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=yi(c,a,n,null),c.flags|=2):c=gi(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,hc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=Ec(n):(a=c.cachePool,a===null?a=Ea():(l=fa._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=Dc(e,s,n),t.memoizedState=Tc,hc(e.child,r)):(uo(t),n=e.child,e=n.sibling,n=gi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function kc(e,t){return t=Ac({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Ac(e,t){return e=mi(22,e,null,t),e.lanes=0,e}function jc(e,t,n){return Ua(t,e.child,null,n),e=kc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Mc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ta(e.return,t,n)}function Nc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Pc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=go.current,s=(o&2)!=0;if(s?(o=o&1|2,t.flags|=128):o&=1,O(go,o),uc(e,t,r,n),r=P?Oi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Mc(e,n,t);else if(e.tag===19)Mc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&_o(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Nc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&_o(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Nc(t,!0,n,null,a,r);break;case`together`:Nc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Fc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Zl|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(ra(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=gi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=gi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Ic(e,t){return(e.lanes&t)===0?(e=e.dependencies,!!(e!==null&&ia(e))):!0}function Lc(e,t,n){switch(t.tag){case 3:ye(t,t.stateNode.containerInfo),$i(t,fa,e.memoizedState.cache),qi();break;case 27:case 5:xe(t);break;case 4:ye(t,t.stateNode.containerInfo);break;case 10:$i(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,fo(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(uo(t),e=Fc(e,t,n),e===null?null:e.sibling):Oc(e,t,n):(uo(t),t.flags|=128,null);uo(t);break;case 19:var i=(e.flags&128)!=0;if(r=(n&t.childLanes)!==0,r||=(ra(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Pc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),O(go,go.current),r)break;return null;case 22:return t.lanes=0,mc(e,t,n,t.pendingProps);case 24:$i(t,fa,e.memoizedState.cache)}return Fc(e,t,n)}function Rc(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)lc=!0;else{if(!Ic(e,n)&&!(t.flags&128))return lc=!1,Lc(e,t,n);lc=!!(e.flags&131072)}else lc=!1,P&&t.flags&1048576&&Fi(t,Oi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Na(t.elementType),t.type=e,typeof e==`function`)hi(e)?(r=Qs(e,r),t.tag=1,t=Cc(null,t,e,r,n)):(t.tag=0,t=xc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===w){t.tag=11,t=dc(null,t,e,r,n);break a}else if(a===T){t.tag=14,t=fc(null,t,e,r,n);break a}}throw t=ce(e)||e,Error(i(306,t,``))}}return t;case 0:return xc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Qs(r,t.pendingProps),Cc(e,t,r,a,n);case 3:a:{if(ye(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,qa(e,t),eo(t,r,null,n);var s=t.memoizedState;if(r=s.cache,$i(t,fa,r),r!==o.cache&&na(t,[fa],n,!0),$a(),r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=wc(e,t,r,n);break a}else if(r!==a){a=wi(Error(i(424)),t),Yi(a),t=wc(e,t,r,n);break a}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(N=pf(e.firstChild),zi=t,P=!0,Bi=null,Vi=!0,n=Wa(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(qi(),r===a){t=Fc(e,t,n);break a}uc(e,t,r,n)}t=t.child}return t;case 26:return bc(e,t),e===null?(n=Nf(t.type,null,t.pendingProps,null))?t.memoizedState=n:P||(n=t.type,e=t.pendingProps,r=Gd(_e.current).createElement(n),r[gt]=t,r[_t]=e,zd(r,n,e),kt(r),t.stateNode=r):t.memoizedState=Nf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return xe(t),e===null&&P&&(r=t.stateNode=_f(t.type,t.pendingProps,_e.current),zi=t,Vi=!0,a=N,nf(t.type)?(mf=a,N=pf(r.firstChild)):N=a),uc(e,t,t.pendingProps.children,n),bc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&P&&((a=r=N)&&(r=sf(r,t.type,t.pendingProps,Vi),r===null?a=!1:(t.stateNode=r,zi=t,N=pf(r.firstChild),Vi=!1,a=!0)),a||Ui(t)),xe(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Jd(a,o)?r=null:s!==null&&Jd(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=ko(e,t,Mo,null,null,n),tp._currentValue=a),bc(e,t),uc(e,t,r,n),t.child;case 6:return e===null&&P&&((e=n=N)&&(n=cf(n,t.pendingProps,Vi),n===null?e=!1:(t.stateNode=n,zi=t,N=null,e=!0)),e||Ui(t)),null;case 13:return Oc(e,t,n);case 4:return ye(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Ua(t,null,r,n):uc(e,t,r,n),t.child;case 11:return dc(e,t,t.type,t.pendingProps,n);case 7:return uc(e,t,t.pendingProps,n),t.child;case 8:return uc(e,t,t.pendingProps.children,n),t.child;case 12:return uc(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,$i(t,t.type,r.value),uc(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,aa(t),a=oa(a),r=r(a),t.flags|=1,uc(e,t,r,n),t.child;case 14:return fc(e,t,t.type,t.pendingProps,n);case 15:return pc(e,t,t.type,t.pendingProps,n);case 19:return Pc(e,t,n);case 31:return yc(e,t,n);case 22:return mc(e,t,n,t.pendingProps);case 24:return aa(t),r=oa(fa),e===null?(a=wa(),a===null&&(a=V,o=pa(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},Ka(t),$i(t,fa,a)):((e.lanes&n)!==0&&(qa(e,t),eo(t,null,null,n),$a()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,$i(t,fa,r),r!==a.cache&&na(t,[fa],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),$i(t,fa,r))),uc(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function zc(e){e.flags|=4}function Bc(e,t,n,r,i){if((t=(e.mode&32)!=0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(ku())e.flags|=8192;else throw Pa=Aa,Oa}else e.flags&=-16777217}function Vc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!qf(t))if(ku())e.flags|=8192;else throw Pa=Aa,Oa}function Hc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:it(),e.lanes|=t,tu|=t)}function Uc(e,t){if(!P)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function R(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Wc(e,t,n){var r=t.pendingProps;switch(Li(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return R(t),null;case 1:return R(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),ea(fa),be(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Ki(t)?zc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ji())),R(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(zc(t),o===null?(R(t),Bc(t,a,null,r,n)):(R(t),Vc(t,o))):o?o===e.memoizedState?(R(t),t.flags&=-16777217):(zc(t),R(t),Vc(t,o)):(e=e.memoizedProps,e!==r&&zc(t),R(t),Bc(t,a,e,r,n)),null;case 27:if(Se(t),n=_e.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&zc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return R(t),null}e=he.current,Ki(t)?Wi(t,e):(e=_f(a,r,n),t.stateNode=e,zc(t))}return R(t),null;case 5:if(Se(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&zc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return R(t),null}if(o=he.current,Ki(t))Wi(t,o);else{var s=Gd(_e.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[gt]=t,o[_t]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(zd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&zc(t)}}return R(t),Bc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&zc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=_e.current,Ki(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=zi,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[gt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Ld(e.nodeValue,n)),e||Ui(t,!0)}else e=Gd(e).createTextNode(r),e[gt]=t,t.stateNode=e}return R(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Ki(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[gt]=t}else qi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;R(t),e=!1}else n=Ji(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(ho(t),t):(ho(t),null);if(t.flags&128)throw Error(i(558))}return R(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Ki(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[gt]=t}else qi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;R(t),a=!1}else a=Ji(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(ho(t),t):(ho(t),null)}return ho(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Hc(t,t.updateQueue),R(t),null);case 4:return be(),e===null&&Dd(t.stateNode.containerInfo),R(t),null;case 10:return ea(t.type),R(t),null;case 19:if(me(go),r=t.memoizedState,r===null)return R(t),null;if(a=(t.flags&128)!=0,o=r.rendering,o===null)if(a)Uc(r,!1);else{if(Xl!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=_o(e),o!==null){for(t.flags|=128,Uc(r,!1),e=o.updateQueue,t.updateQueue=e,Hc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)_i(n,e),n=n.sibling;return O(go,go.current&1|2),P&&Pi(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Fe()>su&&(t.flags|=128,a=!0,Uc(r,!1),t.lanes=4194304)}else{if(!a)if(e=_o(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,Hc(t,e),Uc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!P)return R(t),null}else 2*Fe()-r.renderingStartTime>su&&n!==536870912&&(t.flags|=128,a=!0,Uc(r,!1),t.lanes=4194304);r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(R(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Fe(),e.sibling=null,n=go.current,O(go,a?n&1|2:n&1),P&&Pi(t,r.treeForkCount),e);case 22:case 23:return ho(t),so(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(R(t),t.subtreeFlags&6&&(t.flags|=8192)):R(t),n=t.updateQueue,n!==null&&Hc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&me(Ca),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),ea(fa),R(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Gc(e,t){switch(Li(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ea(fa),be(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Se(t),null;case 31:if(t.memoizedState!==null){if(ho(t),t.alternate===null)throw Error(i(340));qi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(ho(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));qi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return me(go),null;case 4:return be(),null;case 10:return ea(t.type),null;case 22:case 23:return ho(t),so(),e!==null&&me(Ca),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ea(fa),null;case 25:return null;default:return null}}function Kc(e,t){switch(Li(t),t.tag){case 3:ea(fa),be();break;case 26:case 27:case 5:Se(t);break;case 4:be();break;case 31:t.memoizedState!==null&&ho(t);break;case 13:ho(t);break;case 19:me(go);break;case 10:ea(t.type);break;case 22:case 23:ho(t),so(),e!==null&&me(Ca);break;case 24:ea(fa)}}function qc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){K(t,t.return,e)}}function Jc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){K(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){K(t,t.return,e)}}function Yc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{no(t,n)}catch(t){K(e,e.return,t)}}}function Xc(e,t,n){n.props=Qs(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){K(e,t,n)}}function Zc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){K(e,t,n)}}function Qc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r==`function`)try{r()}catch(n){K(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){K(e,t,n)}else n.current=null}function $c(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){K(e,e.return,t)}}function el(e,t,n){try{var r=e.stateNode;Bd(r,e.type,n,t),r[_t]=t}catch(t){K(e,e.return,t)}}function tl(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&nf(e.type)||e.tag===4}function nl(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||tl(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&nf(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function rl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=un));else if(r!==4&&(r===27&&nf(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(rl(e,t,n),e=e.sibling;e!==null;)rl(e,t,n),e=e.sibling}function il(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&nf(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(il(e,t,n),e=e.sibling;e!==null;)il(e,t,n),e=e.sibling}function al(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);zd(t,r,n),t[gt]=e,t[_t]=n}catch(t){K(e,e.return,t)}}var ol=!1,sl=!1,cl=!1,ll=typeof WeakSet==`function`?WeakSet:Set,ul=null;function dl(e,t){if(e=e.containerInfo,Ud=up,e=Fr(e),j(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(Wd={focusedElem:e,selectionRange:n},up=!1,ul=t;ul!==null;)if(t=ul,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,ul=e;else for(;ul!==null;){switch(t=ul,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Qs(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){K(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)of(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:of(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,ul=e;break}ul=t.return}}function fl(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:El(e,n),r&4&&qc(5,n);break;case 1:if(El(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){K(n,n.return,e)}else{var i=Qs(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){K(n,n.return,e)}}r&64&&Yc(n),r&512&&Zc(n,n.return);break;case 3:if(El(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{no(e,t)}catch(e){K(n,n.return,e)}}break;case 27:t===null&&r&4&&al(n);case 26:case 5:El(e,n),t===null&&r&4&&$c(n),r&512&&Zc(n,n.return);break;case 12:El(e,n);break;case 31:El(e,n),r&4&&_l(e,n);break;case 13:El(e,n),r&4&&vl(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=$u.bind(null,n),ff(e,n))));break;case 22:if(r=n.memoizedState!==null||ol,!r){t=t!==null&&t.memoizedState!==null||sl,i=ol;var a=sl;ol=r,(sl=t)&&!a?Ol(e,n,(n.subtreeFlags&8772)!=0):El(e,n),ol=i,sl=a}break;case 30:break;default:El(e,n)}}function pl(e){var t=e.alternate;t!==null&&(e.alternate=null,pl(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&wt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var z=null,ml=!1;function hl(e,t,n){for(n=n.child;n!==null;)gl(e,t,n),n=n.sibling}function gl(e,t,n){if(Ge&&typeof Ge.onCommitFiberUnmount==`function`)try{Ge.onCommitFiberUnmount(We,n)}catch{}switch(n.tag){case 26:sl||Qc(n,t),hl(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:sl||Qc(n,t);var r=z,i=ml;nf(n.type)&&(z=n.stateNode,ml=!1),hl(e,t,n),Y(n.stateNode),z=r,ml=i;break;case 5:sl||Qc(n,t);case 6:if(r=z,i=ml,z=null,hl(e,t,n),z=r,ml=i,z!==null)if(ml)try{(z.nodeType===9?z.body:z.nodeName===`HTML`?z.ownerDocument.body:z).removeChild(n.stateNode)}catch(e){K(n,t,e)}else try{z.removeChild(n.stateNode)}catch(e){K(n,t,e)}break;case 18:z!==null&&(ml?(e=z,rf(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Ip(e)):rf(z,n.stateNode));break;case 4:r=z,i=ml,z=n.stateNode.containerInfo,ml=!0,hl(e,t,n),z=r,ml=i;break;case 0:case 11:case 14:case 15:Jc(2,n,t),sl||Jc(4,n,t),hl(e,t,n);break;case 1:sl||(Qc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Xc(n,t,r)),hl(e,t,n);break;case 21:hl(e,t,n);break;case 22:sl=(r=sl)||n.memoizedState!==null,hl(e,t,n),sl=r;break;default:hl(e,t,n)}}function _l(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Ip(e)}catch(e){K(t,t.return,e)}}}function vl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Ip(e)}catch(e){K(t,t.return,e)}}function yl(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new ll),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new ll),t;default:throw Error(i(435,e.tag))}}function bl(e,t){var n=yl(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=ed.bind(null,e,t);t.then(r,r)}})}function xl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(nf(c.type)){z=c.stateNode,ml=!1;break a}break;case 5:z=c.stateNode,ml=!1;break a;case 3:case 4:z=c.stateNode.containerInfo,ml=!0;break a}c=c.return}if(z===null)throw Error(i(160));gl(o,s,a),z=null,ml=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Cl(t,e),t=t.sibling}var Sl=null;function Cl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:xl(t,e),wl(e),r&4&&(Jc(3,e,e.return),qc(3,e),Jc(5,e,e.return));break;case 1:xl(t,e),wl(e),r&512&&(sl||n===null||Qc(n,n.return)),r&64&&ol&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=Sl;if(xl(t,e),wl(e),r&512&&(sl||n===null||Qc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[Ct]||o[gt]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),zd(o,r,n),o[gt]=e,kt(o),r=o;break a;case`link`:var s=Wf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),zd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Wf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),zd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[gt]=e,kt(o),r=o}e.stateNode=r}else Gf(a,e.type,e.stateNode);else e.stateNode=zf(a,r,e.memoizedProps);else o===r?r===null&&e.stateNode!==null&&el(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Gf(a,e.type,e.stateNode):zf(a,r,e.memoizedProps))}break;case 27:xl(t,e),wl(e),r&512&&(sl||n===null||Qc(n,n.return)),n!==null&&r&4&&el(e,e.memoizedProps,n.memoizedProps);break;case 5:if(xl(t,e),wl(e),r&512&&(sl||n===null||Qc(n,n.return)),e.flags&32){a=e.stateNode;try{tn(a,``)}catch(t){K(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,el(e,a,n===null?a:n.memoizedProps)),r&1024&&(cl=!0);break;case 6:if(xl(t,e),wl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){K(e,e.return,t)}}break;case 3:if(Uf=null,a=Sl,Sl=bf(t.containerInfo),xl(t,e),Sl=a,wl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Ip(t.containerInfo)}catch(t){K(e,e.return,t)}cl&&(cl=!1,Tl(e));break;case 4:r=Sl,Sl=bf(e.stateNode.containerInfo),xl(t,e),wl(e),Sl=r;break;case 12:xl(t,e),wl(e);break;case 31:xl(t,e),wl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,bl(e,r)));break;case 13:xl(t,e),wl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(au=Fe()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,bl(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=ol,d=sl;if(ol=u||a,sl=d||l,xl(t,e),sl=d,ol=u,wl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||ol||sl||Dl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){K(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){K(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?af(m,!0):af(l.stateNode,!1)}catch(e){K(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,bl(e,n))));break;case 19:xl(t,e),wl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,bl(e,r)));break;case 30:break;case 21:break;default:xl(t,e),wl(e)}}function wl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(tl(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;il(e,nl(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(tn(o,``),n.flags&=-33),il(e,nl(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;rl(e,nl(e),s);break;default:throw Error(i(161))}}catch(t){K(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Tl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Tl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function El(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)fl(e,t.alternate,t),t=t.sibling}function Dl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Jc(4,t,t.return),Dl(t);break;case 1:Qc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Xc(t,t.return,n),Dl(t);break;case 27:Y(t.stateNode);case 26:case 5:Qc(t,t.return),Dl(t);break;case 22:t.memoizedState===null&&Dl(t);break;case 30:Dl(t);break;default:Dl(t)}e=e.sibling}}function Ol(e,t,n){for(n&&=(t.subtreeFlags&8772)!=0,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:Ol(i,a,n),qc(4,a);break;case 1:if(Ol(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){K(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)to(c[i],s)}catch(e){K(r,r.return,e)}}n&&o&64&&Yc(a),Zc(a,a.return);break;case 27:al(a);case 26:case 5:Ol(i,a,n),n&&r===null&&o&4&&$c(a),Zc(a,a.return);break;case 12:Ol(i,a,n);break;case 31:Ol(i,a,n),n&&o&4&&_l(i,a);break;case 13:Ol(i,a,n),n&&o&4&&vl(i,a);break;case 22:a.memoizedState===null&&Ol(i,a,n),Zc(a,a.return);break;case 30:break;default:Ol(i,a,n)}t=t.sibling}}function kl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ma(n))}function Al(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ma(e))}function jl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Ml(e,t,n,r),t=t.sibling}function Ml(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:jl(e,t,n,r),i&2048&&qc(9,t);break;case 1:jl(e,t,n,r);break;case 3:jl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ma(e)));break;case 12:if(i&2048){jl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){K(t,t.return,e)}}else jl(e,t,n,r);break;case 31:jl(e,t,n,r);break;case 13:jl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?jl(e,t,n,r):(a._visibility|=2,Nl(e,t,n,r,(t.subtreeFlags&10256)!=0||!1)):a._visibility&2?jl(e,t,n,r):Pl(e,t),i&2048&&kl(o,t);break;case 24:jl(e,t,n,r),i&2048&&Al(t.alternate,t);break;default:jl(e,t,n,r)}}function Nl(e,t,n,r,i){for(i&&=(t.subtreeFlags&10256)!=0||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Nl(a,o,s,c,i),qc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Nl(a,o,s,c,i)):u._visibility&2?Nl(a,o,s,c,i):Pl(a,o),i&&l&2048&&kl(o.alternate,o);break;case 24:Nl(a,o,s,c,i),i&&l&2048&&Al(o.alternate,o);break;default:Nl(a,o,s,c,i)}t=t.sibling}}function Pl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Pl(n,r),i&2048&&kl(r.alternate,r);break;case 24:Pl(n,r),i&2048&&Al(r.alternate,r);break;default:Pl(n,r)}t=t.sibling}}var Fl=8192;function Il(e,t,n){if(e.subtreeFlags&Fl)for(e=e.child;e!==null;)Ll(e,t,n),e=e.sibling}function Ll(e,t,n){switch(e.tag){case 26:Il(e,t,n),e.flags&Fl&&e.memoizedState!==null&&Jf(n,Sl,e.memoizedState,e.memoizedProps);break;case 5:Il(e,t,n);break;case 3:case 4:var r=Sl;Sl=bf(e.stateNode.containerInfo),Il(e,t,n),Sl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Fl,Fl=16777216,Il(e,t,n),Fl=r):Il(e,t,n));break;default:Il(e,t,n)}}function Rl(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function zl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];ul=r,Hl(r,e)}Rl(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Bl(e),e=e.sibling}function Bl(e){switch(e.tag){case 0:case 11:case 15:zl(e),e.flags&2048&&Jc(9,e,e.return);break;case 3:zl(e);break;case 12:zl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Vl(e)):zl(e);break;default:zl(e)}}function Vl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];ul=r,Hl(r,e)}Rl(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Jc(8,t,t.return),Vl(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Vl(t));break;default:Vl(t)}e=e.sibling}}function Hl(e,t){for(;ul!==null;){var n=ul;switch(n.tag){case 0:case 11:case 15:Jc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ma(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,ul=r;else a:for(n=e;ul!==null;){r=ul;var i=r.sibling,a=r.return;if(pl(r),r===n){ul=null;break a}if(i!==null){i.return=a,ul=i;break a}ul=a}}}var Ul={getCacheForType:function(e){var t=oa(fa),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return oa(fa).controller.signal}},Wl=typeof WeakMap==`function`?WeakMap:Map,B=0,V=null,H=null,U=0,W=0,Gl=null,Kl=!1,ql=!1,Jl=!1,Yl=0,Xl=0,Zl=0,Ql=0,$l=0,eu=0,tu=0,nu=null,ru=null,iu=!1,au=0,ou=0,su=1/0,cu=null,lu=null,uu=0,du=null,fu=null,pu=0,mu=0,hu=null,gu=null,G=0,_u=null;function vu(){return B&2&&U!==0?U&-U:E.T===null?pt():gd()}function yu(){if(eu===0)if(!(U&536870912)||P){var e=Qe;Qe<<=1,!(Qe&3932160)&&(Qe=262144),eu=e}else eu=536870912;return e=co.current,e!==null&&(e.flags|=32),eu}function bu(e,t,n){(e===V&&(W===2||W===9)||e.cancelPendingCommit!==null)&&(Du(e,0),wu(e,U,eu,!1)),ot(e,n),(!(B&2)||e!==V)&&(e===V&&(!(B&2)&&(Ql|=n),Xl===4&&wu(e,U,eu,!1)),cd(e))}function xu(e,t,n){if(B&6)throw Error(i(327));var r=!n&&(t&127)==0&&(t&e.expiredLanes)===0||nt(e,t),a=r?Fu(e,t):Nu(e,t,!0),o=r;do{if(a===0){ql&&!r&&wu(e,t,0,!1);break}else{if(n=e.current.alternate,o&&!Cu(n)){a=Nu(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=nu;var l=c.current.memoizedState.isDehydrated;if(l&&(Du(c,s).flags|=256),s=Nu(c,s,!1),s!==2){if(Jl&&!l){c.errorRecoveryDisabledLanes|=o,Ql|=o,a=4;break a}o=ru,ru=a,o!==null&&(ru===null?ru=o:ru.push.apply(ru,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Du(e,0),wu(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:wu(r,t,eu,!Kl);break a;case 2:ru=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=au+300-Fe(),10<a)){if(wu(r,t,eu,!Kl),tt(r,0,!0)!==0)break a;pu=t,r.timeoutHandle=Zd(Su.bind(null,r,n,ru,cu,iu,t,eu,Ql,tu,Kl,o,`Throttled`,-0,0),a);break a}Su(r,n,ru,cu,iu,t,eu,Ql,tu,Kl,o,null,-0,0)}}break}while(1);cd(e)}function Su(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:un},Ll(t,a,d);var m=(a&62914560)===a?au-Fe():(a&4194048)===a?ou-Fe():0;if(m=Xf(d,m),m!==null){pu=a,e.cancelPendingCommit=m(Hu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),wu(e,a,o,!l);return}}Hu(e,t,a,n,r,i,o,s,c)}function Cu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Ar(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function wu(e,t,n,r){t&=~$l,t&=~Ql,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-qe(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&ct(e,n,t)}function Tu(){return B&6?!0:(ld(0,!1),!1)}function Eu(){if(H!==null){if(W===0)var e=H.return;else e=H,Qi=Zi=null,Fo(e),La=null,Ra=0,e=H;for(;e!==null;)Kc(e.alternate,e),e=e.return;H=null}}function Du(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,Qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),pu=0,Eu(),V=e,H=n=gi(e.current,null),U=t,W=0,Gl=null,Kl=!1,ql=nt(e,t),Jl=!1,tu=eu=$l=Ql=Zl=Xl=0,ru=nu=null,iu=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-qe(r),a=1<<i;t|=e[i],r&=~a}return Yl=t,oi(),n}function Ou(e,t){F=null,E.H=Ws,t===Da||t===ka?(t=Fa(),W=3):t===Oa?(t=Fa(),W=4):W=t===cc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Gl=t,H===null&&(Xl=1,nc(e,wi(t,e.current)))}function ku(){var e=co.current;return e===null?!0:(U&4194048)===U?lo===null:(U&62914560)===U||U&536870912?e===lo:!1}function Au(){var e=E.H;return E.H=Ws,e===null?Ws:e}function ju(){var e=E.A;return E.A=Ul,e}function Mu(){Xl=4,Kl||(U&4194048)!==U&&co.current!==null||(ql=!0),!(Zl&134217727)&&!(Ql&134217727)||V===null||wu(V,U,eu,!1)}function Nu(e,t,n){var r=B;B|=2;var i=Au(),a=ju();(V!==e||U!==t)&&(cu=null,Du(e,t)),t=!1;var o=Xl;a:do try{if(W!==0&&H!==null){var s=H,c=Gl;switch(W){case 8:Eu(),o=6;break a;case 3:case 2:case 9:case 6:co.current===null&&(t=!0);var l=W;if(W=0,Gl=null,zu(e,s,c,l),n&&ql){o=0;break a}break;default:l=W,W=0,Gl=null,zu(e,s,c,l)}}Pu(),o=Xl;break}catch(t){Ou(e,t)}while(1);return t&&e.shellSuspendCounter++,Qi=Zi=null,B=r,E.H=i,E.A=a,H===null&&(V=null,U=0,oi()),o}function Pu(){for(;H!==null;)Lu(H)}function Fu(e,t){var n=B;B|=2;var r=Au(),a=ju();V!==e||U!==t?(cu=null,su=Fe()+500,Du(e,t)):ql=nt(e,t);a:do try{if(W!==0&&H!==null){t=H;var o=Gl;b:switch(W){case 1:W=0,Gl=null,zu(e,t,o,1);break;case 2:case 9:if(ja(o)){W=0,Gl=null,Ru(t);break}t=function(){W!==2&&W!==9||V!==e||(W=7),cd(e)},o.then(t,t);break a;case 3:W=7;break a;case 4:W=5;break a;case 7:ja(o)?(W=0,Gl=null,Ru(t)):(W=0,Gl=null,zu(e,t,o,7));break;case 5:var s=null;switch(H.tag){case 26:s=H.memoizedState;case 5:case 27:var c=H;if(s?qf(s):c.stateNode.complete){W=0,Gl=null;var l=c.sibling;if(l!==null)H=l;else{var u=c.return;u===null?H=null:(H=u,Bu(u))}break b}}W=0,Gl=null,zu(e,t,o,5);break;case 6:W=0,Gl=null,zu(e,t,o,6);break;case 8:Eu(),Xl=6;break a;default:throw Error(i(462))}}Iu();break}catch(t){Ou(e,t)}while(1);return Qi=Zi=null,E.H=r,E.A=a,B=n,H===null?(V=null,U=0,oi(),Xl):0}function Iu(){for(;H!==null&&!Ne();)Lu(H)}function Lu(e){var t=Rc(e.alternate,e,Yl);e.memoizedProps=e.pendingProps,t===null?Bu(e):H=t}function Ru(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Sc(n,t,t.pendingProps,t.type,void 0,U);break;case 11:t=Sc(n,t,t.pendingProps,t.type.render,t.ref,U);break;case 5:Fo(t);default:Kc(n,t),t=H=_i(t,Yl),t=Rc(n,t,Yl)}e.memoizedProps=e.pendingProps,t===null?Bu(e):H=t}function zu(e,t,n,r){Qi=Zi=null,Fo(t),La=null,Ra=0;var i=t.return;try{if(sc(e,i,t,n,U)){Xl=1,nc(e,wi(n,e.current)),H=null;return}}catch(t){if(i!==null)throw H=i,t;Xl=1,nc(e,wi(n,e.current)),H=null;return}t.flags&32768?(P||r===1?e=!0:ql||U&536870912?e=!1:(Kl=e=!0,(r===2||r===9||r===3||r===6)&&(r=co.current,r!==null&&r.tag===13&&(r.flags|=16384))),Vu(t,e)):Bu(t)}function Bu(e){var t=e;do{if(t.flags&32768){Vu(t,Kl);return}e=t.return;var n=Wc(t.alternate,t,Yl);if(n!==null){H=n;return}if(t=t.sibling,t!==null){H=t;return}H=t=e}while(t!==null);Xl===0&&(Xl=5)}function Vu(e,t){do{var n=Gc(e.alternate,e);if(n!==null){n.flags&=32767,H=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){H=e;return}H=e=n}while(e!==null);Xl=6,H=null}function Hu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do qu();while(uu!==0);if(B&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=ai,st(e,n,o,s,c,l),e===V&&(H=V=null,U=0),fu=t,du=e,pu=n,mu=o,hu=a,gu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,td(ze,function(){return Ju(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!=0,t.subtreeFlags&13878||r){r=E.T,E.T=null,a=D.p,D.p=2,s=B,B|=4;try{dl(e,t,n)}finally{B=s,D.p=a,E.T=r}}uu=1,Uu(),Wu(),Gu()}}function Uu(){if(uu===1){uu=0;var e=du,t=fu,n=(t.flags&13878)!=0;if(t.subtreeFlags&13878||n){n=E.T,E.T=null;var r=D.p;D.p=2;var i=B;B|=4;try{Cl(t,e);var a=Wd,o=Fr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&Pr(s.ownerDocument.documentElement,s)){if(c!==null&&j(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Nr(s,h),v=Nr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}up=!!Ud,Wd=Ud=null}finally{B=i,D.p=r,E.T=n}}e.current=t,uu=2}}function Wu(){if(uu===2){uu=0;var e=du,t=fu,n=(t.flags&8772)!=0;if(t.subtreeFlags&8772||n){n=E.T,E.T=null;var r=D.p;D.p=2;var i=B;B|=4;try{fl(e,t.alternate,t)}finally{B=i,D.p=r,E.T=n}}uu=3}}function Gu(){if(uu===4||uu===3){uu=0,Pe();var e=du,t=fu,n=pu,r=gu;t.subtreeFlags&10256||t.flags&10256?uu=5:(uu=0,fu=du=null,Ku(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(lu=null),ft(n),t=t.stateNode,Ge&&typeof Ge.onCommitFiberRoot==`function`)try{Ge.onCommitFiberRoot(We,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=E.T,i=D.p,D.p=2,E.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{E.T=t,D.p=i}}pu&3&&qu(),cd(e),i=e.pendingLanes,n&261930&&i&42?e===_u?G++:(G=0,_u=e):G=0,ld(0,!1)}}function Ku(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ma(t)))}function qu(){return Uu(),Wu(),Gu(),Ju()}function Ju(){if(uu!==5)return!1;var e=du,t=mu;mu=0;var n=ft(pu),r=E.T,a=D.p;try{D.p=32>n?32:n,E.T=null,n=hu,hu=null;var o=du,s=pu;if(uu=0,fu=du=null,pu=0,B&6)throw Error(i(331));var c=B;if(B|=4,Bl(o.current),Ml(o,o.current,s,n),B=c,ld(0,!1),Ge&&typeof Ge.onPostCommitFiberRoot==`function`)try{Ge.onPostCommitFiberRoot(We,o)}catch{}return!0}finally{D.p=a,E.T=r,Ku(e,t)}}function Yu(e,t,n){t=wi(n,t),t=ic(e.stateNode,t,2),e=Ya(e,t,2),e!==null&&(ot(e,2),cd(e))}function K(e,t,n){if(e.tag===3)Yu(e,e,n);else for(;t!==null;){if(t.tag===3){Yu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(lu===null||!lu.has(r))){e=wi(n,e),n=ac(2),r=Ya(t,n,2),r!==null&&(oc(n,r,t,e),ot(r,2),cd(r));break}}t=t.return}}function Xu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Wl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Jl=!0,i.add(n),e=Zu.bind(null,e,t,n),t.then(e,e))}function Zu(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,V===e&&(U&n)===n&&(Xl===4||Xl===3&&(U&62914560)===U&&300>Fe()-au?!(B&2)&&Du(e,0):$l|=n,tu===U&&(tu=0)),cd(e)}function Qu(e,t){t===0&&(t=it()),e=li(e,t),e!==null&&(ot(e,t),cd(e))}function $u(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Qu(e,n)}function ed(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),Qu(e,n)}function td(e,t){return je(e,t)}var nd=null,rd=null,id=!1,ad=!1,od=!1,sd=0;function cd(e){e!==rd&&e.next===null&&(rd===null?nd=rd=e:rd=rd.next=e),ad=!0,id||(id=!0,hd())}function ld(e,t){if(!od&&ad){od=!0;do for(var n=!1,r=nd;r!==null;){if(!t)if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-qe(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,md(r,a))}else a=U,a=tt(r,r===V?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||nt(r,a)||(n=!0,md(r,a));r=r.next}while(n);od=!1}}function ud(){dd()}function dd(){ad=id=!1;var e=0;sd!==0&&Xd()&&(e=sd);for(var t=Fe(),n=null,r=nd;r!==null;){var i=r.next,a=fd(r,t);a===0?(r.next=null,n===null?nd=i:n.next=i,i===null&&(rd=n)):(n=r,(e!==0||a&3)&&(ad=!0)),r=i}uu!==0&&uu!==5||ld(e,!1),sd!==0&&(sd=0)}function fd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-qe(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=rt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=V,n=U,n=tt(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(W===2||W===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Me(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||nt(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Me(r),ft(n)){case 2:case 8:n=Re;break;case 32:n=ze;break;case 268435456:n=Ve;break;default:n=ze}return r=pd.bind(null,e),n=je(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Me(r),e.callbackPriority=2,e.callbackNode=null,2}function pd(e,t){if(uu!==0&&uu!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(qu()&&e.callbackNode!==n)return null;var r=U;return r=tt(e,e===V?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(xu(e,r,t),fd(e,Fe()),e.callbackNode!=null&&e.callbackNode===n?pd.bind(null,e):null)}function md(e,t){if(qu())return null;xu(e,t,!0)}function hd(){ef(function(){B&6?je(Le,ud):dd()})}function gd(){if(sd===0){var e=_a;e===0&&(e=Ze,Ze<<=1,!(Ze&261888)&&(Ze=256)),sd=e}return sd}function _d(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:ln(``+e)}function vd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function yd(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=_d((i[_t]||null).action),o=r.submitter;o&&(t=(t=o[_t]||null)?_d(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new jn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(sd!==0){var e=o?vd(i,o):new FormData(i);As(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?vd(i,o):new FormData(i),As(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var bd=0;bd<M.length;bd++){var xd=M[bd];ti(xd.toLowerCase(),`on`+(xd[0].toUpperCase()+xd.slice(1)))}ti(qr,`onAnimationEnd`),ti(Jr,`onAnimationIteration`),ti(Yr,`onAnimationStart`),ti(`dblclick`,`onDoubleClick`),ti(`focusin`,`onFocus`),ti(`focusout`,`onBlur`),ti(Xr,`onTransitionRun`),ti(Zr,`onTransitionStart`),ti(Qr,`onTransitionCancel`),ti($r,`onTransitionEnd`),Nt(`onMouseEnter`,[`mouseout`,`mouseover`]),Nt(`onMouseLeave`,[`mouseout`,`mouseover`]),Nt(`onPointerEnter`,[`pointerout`,`pointerover`]),Nt(`onPointerLeave`,[`pointerout`,`pointerover`]),Mt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Mt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Mt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Mt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Mt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Mt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var Sd=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),Cd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(Sd));function wd(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ni(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ni(e)}i.currentTarget=null,a=c}}}}function q(e,t){var n=t[yt];n===void 0&&(n=t[yt]=new Set);var r=e+`__bubble`;n.has(r)||(Od(t,e,2,!1),n.add(r))}function Td(e,t,n){var r=0;t&&(r|=4),Od(n,e,r,t)}var Ed=`_reactListening`+Math.random().toString(36).slice(2);function Dd(e){if(!e[Ed]){e[Ed]=!0,At.forEach(function(t){t!==`selectionchange`&&(Cd.has(t)||Td(t,!1,e),Td(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ed]||(t[Ed]=!0,Td(`selectionchange`,!1,t))}}function Od(e,t,n,r){switch(_p(t)){case 2:var i=dp;break;case 8:i=fp;break;default:i=pp}n=i.bind(null,t,n,e),i=void 0,!bn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function kd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=Tt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}_n(function(){var r=a,i=fn(n),s=[];a:{var c=ei.get(e);if(c!==void 0){var l=jn,u=e;switch(e){case`keypress`:if(En(n)===0)break a;case`keydown`:case`keyup`:l=Jn;break;case`focusin`:u=`focus`,l=zn;break;case`focusout`:u=`blur`,l=zn;break;case`beforeblur`:case`afterblur`:l=zn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Ln;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Rn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=Xn;break;case qr:case Jr:case Yr:l=Bn;break;case $r:l=Zn;break;case`scroll`:case`scrollend`:l=Nn;break;case`wheel`:l=Qn;break;case`copy`:case`cut`:case`paste`:l=Vn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=Yn;break;case`toggle`:case`beforetoggle`:l=$n}var d=(t&4)!=0,f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=vn(m,p),g!=null&&d.push(Ad(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==dn&&(u=n.relatedTarget||n.fromElement)&&(Tt(u)||u[vt]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?Tt(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=Ln,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Yn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:Dt(l),h=u==null?c:Dt(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,Tt(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Md,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Nd(s,c,l,d,!1),u!==null&&f!==null&&Nd(s,f,u,d,!0)}}a:{if(c=r?Dt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=vr;else if(fr(c))if(yr)v=Or;else{v=Er;var y=Tr}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&on(r.elementType)&&(v=vr):v=Dr;if(v&&=v(e,r)){pr(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&Zt(c,`number`,c.value)}switch(y=r?Dt(r):window,e){case`focusin`:(fr(y)||y.contentEditable===`true`)&&(Lr=y,Rr=r,zr=null);break;case`focusout`:zr=Rr=Lr=null;break;case`mousedown`:Br=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Br=!1,Vr(s,n,i);break;case`selectionchange`:if(Ir)break;case`keydown`:case`keyup`:Vr(s,n,i)}var b;if(tr)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else lr?sr(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(ir&&n.locale!==`ko`&&(lr||x!==`onCompositionStart`?x===`onCompositionEnd`&&lr&&(b=Tn()):(Sn=i,Cn=`value`in Sn?Sn.value:Sn.textContent,lr=!0)),y=jd(r,x),0<y.length&&(x=new Hn(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=cr(n),b!==null&&(x.data=b)))),(b=rr?ur(e,n):dr(e,n))&&(x=jd(r,`onBeforeInput`),0<x.length&&(y=new Hn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),yd(s,e,r,n,i)}wd(s,t)})}function Ad(e,t,n){return{instance:e,listener:t,currentTarget:n}}function jd(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=vn(e,n),i!=null&&r.unshift(Ad(e,i,a)),i=vn(e,t),i!=null&&r.push(Ad(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Md(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Nd(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=vn(n,a),l!=null&&o.unshift(Ad(n,l,c))):i||(l=vn(n,a),l!=null&&o.push(Ad(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Pd=/\r\n?/g,Fd=/\u0000|\uFFFD/g;function Id(e){return(typeof e==`string`?e:``+e).replace(Pd,`
`).replace(Fd,``)}function Ld(e,t){return t=Id(t),Id(e)===t}function J(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||tn(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&tn(e,``+r);break;case`className`:zt(e,`class`,r);break;case`tabIndex`:zt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:zt(e,n,r);break;case`style`:an(e,r,o);break;case`data`:if(t!==`object`){zt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=ln(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}else typeof o==`function`&&(n===`formAction`?(t!==`input`&&J(e,t,`name`,a.name,a,null),J(e,t,`formEncType`,a.formEncType,a,null),J(e,t,`formMethod`,a.formMethod,a,null),J(e,t,`formTarget`,a.formTarget,a,null)):(J(e,t,`encType`,a.encType,a,null),J(e,t,`method`,a.method,a,null),J(e,t,`target`,a.target,a,null)));if(r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=ln(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=un);break;case`onScroll`:r!=null&&q(`scroll`,e);break;case`onScrollEnd`:r!=null&&q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=ln(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:q(`beforetoggle`,e),q(`toggle`,e),Rt(e,`popover`,r);break;case`xlinkActuate`:Bt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Bt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Bt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Bt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Bt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Bt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Bt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Bt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Bt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Rt(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=sn.get(n)||n,Rt(e,n,r))}}function Rd(e,t,n,r,a,o){switch(n){case`style`:an(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?tn(e,r):(typeof r==`number`||typeof r==`bigint`)&&tn(e,``+r);break;case`onScroll`:r!=null&&q(`scroll`,e);break;case`onScrollEnd`:r!=null&&q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=un);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!jt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[_t]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Rt(e,n,r)}}}function zd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:q(`error`,e),q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:J(e,t,o,s,n,null)}}a&&J(e,t,`srcSet`,n.srcSet,n,null),r&&J(e,t,`src`,n.src,n,null);return;case`input`:q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:J(e,t,r,d,n,null)}}Xt(e,o,c,l,u,s,a,!1);return;case`select`:for(a in q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:J(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Qt(e,!!r,n,!0):Qt(e,!!r,t,!1);return;case`textarea`:for(s in q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:J(e,t,s,c,n,null)}en(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:J(e,t,l,r,n,null)}return;case`dialog`:q(`beforetoggle`,e),q(`toggle`,e),q(`cancel`,e),q(`close`,e);break;case`iframe`:case`object`:q(`load`,e);break;case`video`:case`audio`:for(r=0;r<Sd.length;r++)q(Sd[r],e);break;case`image`:q(`error`,e),q(`load`,e);break;case`details`:q(`toggle`,e);break;case`embed`:case`source`:case`link`:q(`error`,e),q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:J(e,t,u,r,n,null)}return;default:if(on(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Rd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&J(e,t,c,r,n,null))}function Bd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||J(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&J(e,t,p,m,r,f)}}Yt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||J(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&J(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Qt(e,!!n,n?[]:``,!1):Qt(e,!!n,t,!0)):Qt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:J(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&J(e,t,s,a,r,o)}$t(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:J(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:J(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&J(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:J(e,t,u,p,r,m)}return;default:if(on(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Rd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Rd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&J(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||J(e,t,f,p,r,m)}function Vd(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Hd(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Vd(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Vd(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Ud=null,Wd=null;function Gd(e){return e.nodeType===9?e:e.ownerDocument}function Kd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function qd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Jd(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Yd=null;function Xd(){var e=window.event;return e&&e.type===`popstate`?e===Yd?!1:(Yd=e,!0):(Yd=null,!1)}var Zd=typeof setTimeout==`function`?setTimeout:void 0,Qd=typeof clearTimeout==`function`?clearTimeout:void 0,$d=typeof Promise==`function`?Promise:void 0,ef=typeof queueMicrotask==`function`?queueMicrotask:$d===void 0?Zd:function(e){return $d.resolve(null).then(e).catch(tf)};function tf(e){setTimeout(function(){throw e})}function nf(e){return e===`head`}function rf(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Ip(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)Y(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,Y(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[Ct]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&Y(e.ownerDocument.body);n=i}while(n);Ip(t)}function af(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8)if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++;n=r}while(n)}function of(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:of(n),wt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function sf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r)if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e;else if(!e[Ct])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=pf(e.nextSibling),e===null)break}return null}function cf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=pf(e.nextSibling),e===null))return null;return e}function lf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=pf(e.nextSibling),e===null))return null;return e}function uf(e){return e.data===`$?`||e.data===`$~`}function df(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function ff(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function pf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var mf=null;function hf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return pf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function gf(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function _f(e,t,n){switch(t=Gd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function Y(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);wt(e)}var vf=new Map,yf=new Set;function bf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var xf=D.d;D.d={f:Sf,r:Cf,D:Ef,C:Df,L:Of,m:kf,X:jf,S:Af,M:Mf};function Sf(){var e=xf.f(),t=Tu();return e||t}function Cf(e){var t=Et(e);t!==null&&t.tag===5&&t.type===`form`?Ms(t):xf.r(e)}var wf=typeof document>`u`?null:document;function Tf(e,t,n){var r=wf;if(r&&typeof t==`string`&&t){var i=Jt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),yf.has(i)||(yf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),zd(t,`link`,e),kt(t),r.head.appendChild(t)))}}function Ef(e){xf.D(e),Tf(`dns-prefetch`,e,null)}function Df(e,t){xf.C(e,t),Tf(`preconnect`,e,t)}function Of(e,t,n){xf.L(e,t,n);var r=wf;if(r&&e&&t){var i=`link[rel="preload"][as="`+Jt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Jt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Jt(n.imageSizes)+`"]`)):i+=`[href="`+Jt(e)+`"]`;var a=i;switch(t){case`style`:a=Pf(e);break;case`script`:a=Lf(e)}vf.has(a)||(e=f({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),vf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(X(a))||t===`script`&&r.querySelector(Rf(a))||(t=r.createElement(`link`),zd(t,`link`,e),kt(t),r.head.appendChild(t)))}}function kf(e,t){xf.m(e,t);var n=wf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Jt(r)+`"][href="`+Jt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Lf(e)}if(!vf.has(a)&&(e=f({rel:`modulepreload`,href:e},t),vf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Rf(a)))return}r=n.createElement(`link`),zd(r,`link`,e),kt(r),n.head.appendChild(r)}}}function Af(e,t,n){xf.S(e,t,n);var r=wf;if(r&&e){var i=Ot(r).hoistableStyles,a=Pf(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(X(a)))s.loading=5;else{e=f({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=vf.get(a))&&Vf(e,n);var c=o=r.createElement(`link`);kt(c),zd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Bf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function jf(e,t){xf.X(e,t);var n=wf;if(n&&e){var r=Ot(n).hoistableScripts,i=Lf(e),a=r.get(i);a||(a=n.querySelector(Rf(i)),a||(e=f({src:e,async:!0},t),(t=vf.get(i))&&Hf(e,t),a=n.createElement(`script`),kt(a),zd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Mf(e,t){xf.M(e,t);var n=wf;if(n&&e){var r=Ot(n).hoistableScripts,i=Lf(e),a=r.get(i);a||(a=n.querySelector(Rf(i)),a||(e=f({src:e,async:!0,type:`module`},t),(t=vf.get(i))&&Hf(e,t),a=n.createElement(`script`),kt(a),zd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Nf(e,t,n,r){var a=(a=_e.current)?bf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Pf(n.href),n=Ot(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Pf(n.href);var o=Ot(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(X(e)))&&!o._p&&(s.instance=o,s.state.loading=5),vf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},vf.set(e,n),o||If(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Lf(n),n=Ot(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Pf(e){return`href="`+Jt(e)+`"`}function X(e){return`link[rel="stylesheet"][`+e+`]`}function Ff(e){return f({},e,{"data-precedence":e.precedence,precedence:null})}function If(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),zd(t,`link`,n),kt(t),e.head.appendChild(t))}function Lf(e){return`[src="`+Jt(e)+`"]`}function Rf(e){return`script[async]`+e}function zf(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Jt(n.href)+`"]`);if(r)return t.instance=r,kt(r),r;var a=f({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),kt(r),zd(r,`style`,a),Bf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Pf(n.href);var o=e.querySelector(X(a));if(o)return t.state.loading|=4,t.instance=o,kt(o),o;r=Ff(n),(a=vf.get(a))&&Vf(r,a),o=(e.ownerDocument||e).createElement(`link`),kt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),zd(o,`link`,r),t.state.loading|=4,Bf(o,n.precedence,e),t.instance=o;case`script`:return o=Lf(n.src),(a=e.querySelector(Rf(o)))?(t.instance=a,kt(a),a):(r=n,(a=vf.get(o))&&(r=f({},n),Hf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),kt(a),zd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Bf(r,n.precedence,e));return t.instance}function Bf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Vf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function Hf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Uf=null;function Wf(e,t,n){if(Uf===null){var r=new Map,i=Uf=new Map;i.set(n,r)}else i=Uf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[Ct]||a[gt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Gf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Kf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function qf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Jf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Pf(r.href),a=t.querySelector(X(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Zf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,kt(a);return}a=t.ownerDocument||t,r=Ff(r),(i=vf.get(i))&&Vf(r,i),a=a.createElement(`link`),kt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),zd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Zf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Yf=0;function Xf(e,t){return e.stylesheets&&e.count===0&&$f(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&$f(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Yf===0&&(Yf=62500*Hd());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&$f(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Yf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Zf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)$f(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Qf=null;function $f(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Qf=new Map,t.forEach(ep,e),Qf=null,Zf.call(e))}function ep(e,t){if(!(t.state.loading&4)){var n=Qf.get(e);if(n)var r=n.get(null);else{n=new Map,Qf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Zf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var tp={$$typeof:C,Provider:null,Consumer:null,_currentValue:ue,_currentValue2:ue,_threadCount:0};function np(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=at(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=at(0),this.hiddenUpdates=at(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function rp(e,t,n,r,i,a,o,s,c,l,u,d){return e=new np(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=mi(3,null,null,t),e.current=a,a.stateNode=e,t=pa(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Ka(a),e}function ip(e){return e?(e=fi,e):fi}function ap(e,t,n,r,i,a){i=ip(i),r.context===null?r.context=i:r.pendingContext=i,r=Ja(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Ya(e,r,t),n!==null&&(bu(n,e,t),Xa(n,e,t))}function op(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function sp(e,t){op(e,t),(e=e.alternate)&&op(e,t)}function cp(e){if(e.tag===13||e.tag===31){var t=li(e,67108864);t!==null&&bu(t,e,67108864),sp(e,67108864)}}function lp(e){if(e.tag===13||e.tag===31){var t=vu();t=dt(t);var n=li(e,t);n!==null&&bu(n,e,t),sp(e,t)}}var up=!0;function dp(e,t,n,r){var i=E.T;E.T=null;var a=D.p;try{D.p=2,pp(e,t,n,r)}finally{D.p=a,E.T=i}}function fp(e,t,n,r){var i=E.T;E.T=null;var a=D.p;try{D.p=8,pp(e,t,n,r)}finally{D.p=a,E.T=i}}function pp(e,t,n,r){if(up){var i=mp(r);if(i===null)kd(e,t,r,hp,n),Ep(e,r);else if(Op(i,e,t,n,r))r.stopPropagation();else if(Ep(e,r),t&4&&-1<Tp.indexOf(e)){for(;i!==null;){var a=Et(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=et(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-qe(o);s.entanglements[1]|=c,o&=~c}cd(a),!(B&6)&&(su=Fe()+500,ld(0,!1))}}break;case 31:case 13:s=li(a,2),s!==null&&bu(s,a,2),Tu(),sp(a,2)}if(a=mp(r),a===null&&kd(e,t,r,hp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else kd(e,t,r,null,n)}}function mp(e){return e=fn(e),gp(e)}var hp=null;function gp(e){if(hp=null,e=Tt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return hp=e,null}function _p(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Ie()){case Le:return 2;case Re:return 8;case ze:case Be:return 32;case Ve:return 268435456;default:return 32}default:return 32}}var vp=!1,yp=null,bp=null,xp=null,Sp=new Map,Cp=new Map,wp=[],Tp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Ep(e,t){switch(e){case`focusin`:case`focusout`:yp=null;break;case`dragenter`:case`dragleave`:bp=null;break;case`mouseover`:case`mouseout`:xp=null;break;case`pointerover`:case`pointerout`:Sp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:Cp.delete(t.pointerId)}}function Dp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Et(t),t!==null&&cp(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Op(e,t,n,r,i){switch(t){case`focusin`:return yp=Dp(yp,e,t,n,r,i),!0;case`dragenter`:return bp=Dp(bp,e,t,n,r,i),!0;case`mouseover`:return xp=Dp(xp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return Sp.set(a,Dp(Sp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,Cp.set(a,Dp(Cp.get(a)||null,e,t,n,r,i)),!0}return!1}function kp(e){var t=Tt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,mt(e.priority,function(){lp(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,mt(e.priority,function(){lp(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ap(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=mp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);dn=r,n.target.dispatchEvent(r),dn=null}else return t=Et(n),t!==null&&cp(t),e.blockedOn=n,!1;t.shift()}return!0}function jp(e,t,n){Ap(e)&&n.delete(t)}function Mp(){vp=!1,yp!==null&&Ap(yp)&&(yp=null),bp!==null&&Ap(bp)&&(bp=null),xp!==null&&Ap(xp)&&(xp=null),Sp.forEach(jp),Cp.forEach(jp)}function Np(e,n){e.blockedOn===n&&(e.blockedOn=null,vp||(vp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Mp)))}var Pp=null;function Fp(e){Pp!==e&&(Pp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Pp===e&&(Pp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(gp(r||n)===null)continue;break}var a=Et(n);a!==null&&(e.splice(t,3),t-=3,As(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Ip(e){function t(t){return Np(t,e)}yp!==null&&Np(yp,e),bp!==null&&Np(bp,e),xp!==null&&Np(xp,e),Sp.forEach(t),Cp.forEach(t);for(var n=0;n<wp.length;n++){var r=wp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<wp.length&&(n=wp[0],n.blockedOn===null);)kp(n),n.blockedOn===null&&wp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[_t]||null;if(typeof a==`function`)o||Fp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[_t]||null)s=o.formAction;else if(gp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Fp(n)}}}function Lp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Rp(e){this._internalRoot=e}zp.prototype.render=Rp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;ap(n,vu(),e,t,null,null)},zp.prototype.unmount=Rp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;ap(e.current,2,null,e,null,null),Tu(),t[vt]=null}};function zp(e){this._internalRoot=e}zp.prototype.unstable_scheduleHydration=function(e){if(e){var t=pt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<wp.length&&t!==0&&t<wp[n].priority;n++);wp.splice(n,0,e),n===0&&kp(e)}};var Bp=n.version;if(Bp!==`19.2.5`)throw Error(i(527,Bp,`19.2.5`));D.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=u(t),e=e===null?null:d(e),e=e===null?null:e.stateNode,e};var Vp={bundleType:0,version:`19.2.5`,rendererPackageName:`react-dom`,currentDispatcherRef:E,reconcilerVersion:`19.2.5`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Hp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Hp.isDisabled&&Hp.supportsFiber)try{We=Hp.inject(Vp),Ge=Hp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=$s,s=ec,c=tc;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=rp(e,1,!1,null,null,n,r,null,o,s,c,Lp),e[vt]=t.current,Dd(e),new Rp(t)}})),y=s(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=v()})),b=u(p()),x=y(),S=u(_());function C(){return C=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},C.apply(this,arguments)}var w;(function(e){e.Pop=`POP`,e.Push=`PUSH`,e.Replace=`REPLACE`})(w||={});var ee=`popstate`;function te(e){e===void 0&&(e={});function t(e,t){let{pathname:n,search:r,hash:i}=e.location;return ae(``,{pathname:n,search:r,hash:i},t.state&&t.state.usr||null,t.state&&t.state.key||`default`)}function n(e,t){return typeof t==`string`?t:oe(t)}return ce(t,n,null,e)}function T(e,t){if(e===!1||e==null)throw Error(t)}function ne(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function re(){return Math.random().toString(36).substr(2,8)}function ie(e,t){return{usr:e.state,key:e.key,idx:t}}function ae(e,t,n,r){return n===void 0&&(n=null),C({pathname:typeof e==`string`?e:e.pathname,search:``,hash:``},typeof t==`string`?se(t):t,{state:n,key:t&&t.key||r||re()})}function oe(e){let{pathname:t=`/`,search:n=``,hash:r=``}=e;return n&&n!==`?`&&(t+=n.charAt(0)===`?`?n:`?`+n),r&&r!==`#`&&(t+=r.charAt(0)===`#`?r:`#`+r),t}function se(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function ce(e,t,n,r){r===void 0&&(r={});let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=w.Pop,c=null,l=u();l??(l=0,o.replaceState(C({},o.state,{idx:l}),``));function u(){return(o.state||{idx:null}).idx}function d(){s=w.Pop;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=w.Push;let r=ae(h.location,e,t);n&&n(r,e),l=u()+1;let d=ie(r,l),f=h.createHref(r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=w.Replace;let r=ae(h.location,e,t);n&&n(r,e),l=u();let i=ie(r,l),d=h.createHref(r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){let t=i.location.origin===`null`?i.location.href:i.location.origin,n=typeof e==`string`?e:oe(e);return n=n.replace(/ $/,`%20`),T(t,`No window.location.(origin|href) available to create URL for href: `+n),new URL(n,t)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(ee,d),c=e,()=>{i.removeEventListener(ee,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}var le;(function(e){e.data=`data`,e.deferred=`deferred`,e.redirect=`redirect`,e.error=`error`})(le||={});function E(e,t,n){return n===void 0&&(n=`/`),D(e,t,n,!1)}function D(e,t,n,r){let i=Te((typeof t==`string`?se(t):t).pathname||`/`,n);if(i==null)return null;let a=ue(e);fe(a);let o=null;for(let e=0;o==null&&e<a.length;++e){let t=we(i);o=xe(a[e],t,r)}return o}function ue(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r=``);let i=(e,i,a)=>{let o={relativePath:a===void 0?e.path||``:a,caseSensitive:e.caseSensitive===!0,childrenIndex:i,route:e};o.relativePath.startsWith(`/`)&&(T(o.relativePath.startsWith(r),`Absolute route path "`+o.relativePath+`" nested under path `+(`"`+r+`" is not valid. An absolute child route path `)+`must start with the combined path of all its parent routes.`),o.relativePath=o.relativePath.slice(r.length));let s=Pe([r,o.relativePath]),c=n.concat(o);e.children&&e.children.length>0&&(T(e.index!==!0,`Index routes must not have child routes. Please remove `+(`all child routes from route path "`+s+`".`)),ue(e.children,t,c,s)),!(e.path==null&&!e.index)&&t.push({path:s,score:ye(s,e.index),routesMeta:c})};return e.forEach((e,t)=>{var n;if(e.path===``||!((n=e.path)!=null&&n.includes(`?`)))i(e,t);else for(let n of de(e.path))i(e,t,n)}),t}function de(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=de(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function fe(e){e.sort((e,t)=>e.score===t.score?be(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var pe=/^:[\w-]+$/,me=3,O=2,he=1,ge=10,_e=-2,ve=e=>e===`*`;function ye(e,t){let n=e.split(`/`),r=n.length;return n.some(ve)&&(r+=_e),t&&(r+=O),n.filter(e=>!ve(e)).reduce((e,t)=>e+(pe.test(t)?me:t===``?he:ge),r)}function be(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function xe(e,t,n){n===void 0&&(n=!1);let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u=Se({path:s.relativePath,caseSensitive:s.caseSensitive,end:c},l),d=s.route;if(!u&&c&&n&&!r[r.length-1].route.index&&(u=Se({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!u)return null;Object.assign(i,u.params),o.push({params:i,pathname:Pe([a,u.pathname]),pathnameBase:Fe(Pe([a,u.pathnameBase])),route:d}),u.pathnameBase!==`/`&&(a=Pe([a,u.pathnameBase]))}return o}function Se(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Ce(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,t,n)=>{let{paramName:r,isOptional:i}=t;if(r===`*`){let e=s[n]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let c=s[n];return i&&!c?e[r]=void 0:e[r]=(c||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function Ce(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),ne(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "`+e+`" will be treated as if it were `+(`"`+e.replace(/\*$/,`/*`)+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+(`please change the route path to "`+e.replace(/\*$/,`/*`)+`".`));let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n)=>(r.push({paramName:t,isOptional:n!=null}),n?`/?([^\\/]+)?`:`/([^\\/]+)`));return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function we(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return ne(!1,`The URL path "`+e+`" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent `+(`encoding (`+t+`).`)),e}}function Te(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}var Ee=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,De=e=>Ee.test(e);function Oe(e,t){t===void 0&&(t=`/`);let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?se(e):e,a;if(n)if(De(n))a=n;else{if(n.includes(`//`)){let e=n;n=n.replace(/\/\/+/g,`/`),ne(!1,`Pathnames cannot have embedded double slashes - normalizing `+(e+` -> `+n))}a=n.startsWith(`/`)?ke(n.substring(1),`/`):ke(n,t)}else a=t;return{pathname:a,search:Ie(r),hash:Le(i)}}function ke(e,t){let n=t.replace(/\/+$/,``).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function Ae(e,t,n,r){return`Cannot include a '`+e+`' character in a manually specified `+("`to."+t+"` field ["+JSON.stringify(r)+`].  Please separate it out to the `)+("`to."+n+"` field. Alternatively you may provide the full path as ")+`a string in <Link to="..."> and the router will parse it for you.`}function je(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Me(e,t){let n=je(e);return t?n.map((e,t)=>t===n.length-1?e.pathname:e.pathnameBase):n.map(e=>e.pathnameBase)}function Ne(e,t,n,r){r===void 0&&(r=!1);let i;typeof e==`string`?i=se(e):(i=C({},e),T(!i.pathname||!i.pathname.includes(`?`),Ae(`?`,`pathname`,`search`,i)),T(!i.pathname||!i.pathname.includes(`#`),Ae(`#`,`pathname`,`hash`,i)),T(!i.search||!i.search.includes(`#`),Ae(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=Oe(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var Pe=e=>e.join(`/`).replace(/\/\/+/g,`/`),Fe=e=>e.replace(/\/+$/,``).replace(/^\/*/,`/`),Ie=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,Le=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e;function Re(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}var ze=[`post`,`put`,`patch`,`delete`];new Set(ze);var Be=[`get`,...ze];new Set(Be);function Ve(){return Ve=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ve.apply(this,arguments)}var He=b.createContext(null),Ue=b.createContext(null),We=b.createContext(null),Ge=b.createContext(null),Ke=b.createContext({outlet:null,matches:[],isDataRoute:!1}),qe=b.createContext(null);function Je(e,t){let{relative:n}=t===void 0?{}:t;!Ye()&&T(!1);let{basename:r,navigator:i}=b.useContext(We),{hash:a,pathname:o,search:s}=tt(e,{relative:n}),c=o;return r!==`/`&&(c=o===`/`?r:Pe([r,o])),i.createHref({pathname:c,search:s,hash:a})}function Ye(){return b.useContext(Ge)!=null}function Xe(){return!Ye()&&T(!1),b.useContext(Ge).location}function Ze(e){b.useContext(We).static||b.useLayoutEffect(e)}function Qe(){let{isDataRoute:e}=b.useContext(Ke);return e?gt():$e()}function $e(){!Ye()&&T(!1);let e=b.useContext(He),{basename:t,future:n,navigator:r}=b.useContext(We),{matches:i}=b.useContext(Ke),{pathname:a}=Xe(),o=JSON.stringify(Me(i,n.v7_relativeSplatPath)),s=b.useRef(!1);return Ze(()=>{s.current=!0}),b.useCallback(function(n,i){if(i===void 0&&(i={}),!s.current)return;if(typeof n==`number`){r.go(n);return}let c=Ne(n,JSON.parse(o),a,i.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:Pe([t,c.pathname])),(i.replace?r.replace:r.push)(c,i.state,i)},[t,r,o,a,e])}function et(){let{matches:e}=b.useContext(Ke),t=e[e.length-1];return t?t.params:{}}function tt(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=b.useContext(We),{matches:i}=b.useContext(Ke),{pathname:a}=Xe(),o=JSON.stringify(Me(i,r.v7_relativeSplatPath));return b.useMemo(()=>Ne(e,JSON.parse(o),a,n===`path`),[e,o,a,n])}function nt(e,t){return rt(e,t)}function rt(e,t,n,r){!Ye()&&T(!1);let{navigator:i}=b.useContext(We),{matches:a}=b.useContext(Ke),o=a[a.length-1],s=o?o.params:{};o&&o.pathname;let c=o?o.pathnameBase:`/`;o&&o.route;let l=Xe(),u;if(t){let e=typeof t==`string`?se(t):t;!(c===`/`||e.pathname?.startsWith(c))&&T(!1),u=e}else u=l;let d=u.pathname||`/`,f=d;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);f=`/`+d.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let p=E(e,{pathname:f}),m=ct(p&&p.map(e=>Object.assign({},e,{params:Object.assign({},s,e.params),pathname:Pe([c,i.encodeLocation?i.encodeLocation(e.pathname).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:Pe([c,i.encodeLocation?i.encodeLocation(e.pathnameBase).pathname:e.pathnameBase])})),a,n,r);return t&&m?b.createElement(Ge.Provider,{value:{location:Ve({pathname:`/`,search:``,hash:``,state:null,key:`default`},u),navigationType:w.Pop}},m):m}function it(){let e=ht(),t=Re(e)?e.status+` `+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null;return b.createElement(b.Fragment,null,b.createElement(`h2`,null,`Unexpected Application Error!`),b.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?b.createElement(`pre`,{style:{padding:`0.5rem`,backgroundColor:`rgba(200,200,200, 0.5)`}},n):null,null)}var at=b.createElement(it,null),ot=class extends b.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error(`React Router caught the following error during render`,e,t)}render(){return this.state.error===void 0?this.props.children:b.createElement(Ke.Provider,{value:this.props.routeContext},b.createElement(qe.Provider,{value:this.state.error,children:this.props.component}))}};function st(e){let{routeContext:t,match:n,children:r}=e,i=b.useContext(He);return i&&i.static&&i.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=n.route.id),b.createElement(Ke.Provider,{value:t},r)}function ct(e,t,n,r){if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var i;if(!n)return null;if(n.errors)e=n.matches;else if((i=r)!=null&&i.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let a=e,o=n?.errors;if(o!=null){let e=a.findIndex(e=>e.route.id&&o?.[e.route.id]!==void 0);!(e>=0)&&T(!1),a=a.slice(0,Math.min(a.length,e+1))}let s=!1,c=-1;if(n&&r&&r.v7_partialHydration)for(let e=0;e<a.length;e++){let t=a[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(c=e),t.route.id){let{loaderData:e,errors:r}=n,i=t.route.loader&&e[t.route.id]===void 0&&(!r||r[t.route.id]===void 0);if(t.route.lazy||i){s=!0,a=c>=0?a.slice(0,c+1):[a[0]];break}}}return a.reduceRight((e,r,i)=>{let l,u=!1,d=null,f=null;n&&(l=o&&r.route.id?o[r.route.id]:void 0,d=r.route.errorElement||at,s&&(c<0&&i===0?(vt(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),u=!0,f=null):c===i&&(u=!0,f=r.route.hydrateFallbackElement||null)));let p=t.concat(a.slice(0,i+1)),m=()=>{let t;return t=l?d:u?f:r.route.Component?b.createElement(r.route.Component,null):r.route.element?r.route.element:e,b.createElement(st,{match:r,routeContext:{outlet:e,matches:p,isDataRoute:n!=null},children:t})};return n&&(r.route.ErrorBoundary||r.route.errorElement||i===0)?b.createElement(ot,{location:n.location,revalidation:n.revalidation,component:d,error:l,children:m(),routeContext:{outlet:null,matches:p,isDataRoute:!0}}):m()},null)}var lt=function(e){return e.UseBlocker=`useBlocker`,e.UseRevalidator=`useRevalidator`,e.UseNavigateStable=`useNavigate`,e}(lt||{}),ut=function(e){return e.UseBlocker=`useBlocker`,e.UseLoaderData=`useLoaderData`,e.UseActionData=`useActionData`,e.UseRouteError=`useRouteError`,e.UseNavigation=`useNavigation`,e.UseRouteLoaderData=`useRouteLoaderData`,e.UseMatches=`useMatches`,e.UseRevalidator=`useRevalidator`,e.UseNavigateStable=`useNavigate`,e.UseRouteId=`useRouteId`,e}(ut||{});function dt(e){let t=b.useContext(He);return!t&&T(!1),t}function ft(e){let t=b.useContext(Ue);return!t&&T(!1),t}function pt(e){let t=b.useContext(Ke);return!t&&T(!1),t}function mt(e){let t=pt(e),n=t.matches[t.matches.length-1];return!n.route.id&&T(!1),n.route.id}function ht(){let e=b.useContext(qe),t=ft(ut.UseRouteError),n=mt(ut.UseRouteError);return e===void 0?t.errors?.[n]:e}function gt(){let{router:e}=dt(lt.UseNavigateStable),t=mt(ut.UseNavigateStable),n=b.useRef(!1);return Ze(()=>{n.current=!0}),b.useCallback(function(r,i){i===void 0&&(i={}),n.current&&(typeof r==`number`?e.navigate(r):e.navigate(r,Ve({fromRouteId:t},i)))},[e,t])}var _t={};function vt(e,t,n){!t&&!_t[e]&&(_t[e]=!0)}var yt=(e,t,n)=>(``+t+("You can use the `"+e+"` future flag to opt-in early. ")+(`For more information, see `+n+`.`),void 0);function bt(e,t){e?.v7_startTransition===void 0&&yt(`v7_startTransition`,"React Router will begin wrapping state updates in `React.startTransition` in v7",`https://reactrouter.com/v6/upgrading/future#v7_starttransition`),e?.v7_relativeSplatPath===void 0&&(!t||t.v7_relativeSplatPath===void 0)&&yt(`v7_relativeSplatPath`,`Relative route resolution within Splat routes is changing in v7`,`https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath`),t&&(t.v7_fetcherPersist===void 0&&yt(`v7_fetcherPersist`,`The persistence behavior of fetchers is changing in v7`,`https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist`),t.v7_normalizeFormMethod===void 0&&yt(`v7_normalizeFormMethod`,"Casing of `formMethod` fields is being normalized to uppercase in v7",`https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod`),t.v7_partialHydration===void 0&&yt(`v7_partialHydration`,"`RouterProvider` hydration behavior is changing in v7",`https://reactrouter.com/v6/upgrading/future#v7_partialhydration`),t.v7_skipActionErrorRevalidation===void 0&&yt(`v7_skipActionErrorRevalidation`,"The revalidation behavior after 4xx/5xx `action` responses is changing in v7",`https://reactrouter.com/v6/upgrading/future#v7_skipactionerrorrevalidation`))}b.startTransition;function xt(e){T(!1)}function St(e){let{basename:t=`/`,children:n=null,location:r,navigationType:i=w.Pop,navigator:a,static:o=!1,future:s}=e;Ye()&&T(!1);let c=t.replace(/^\/*/,`/`),l=b.useMemo(()=>({basename:c,navigator:a,static:o,future:Ve({v7_relativeSplatPath:!1},s)}),[c,s,a,o]);typeof r==`string`&&(r=se(r));let{pathname:u=`/`,search:d=``,hash:f=``,state:p=null,key:m=`default`}=r,h=b.useMemo(()=>{let e=Te(u,c);return e==null?null:{location:{pathname:e,search:d,hash:f,state:p,key:m},navigationType:i}},[c,u,d,f,p,m,i]);return h==null?null:b.createElement(We.Provider,{value:l},b.createElement(Ge.Provider,{children:n,value:h}))}function Ct(e){let{children:t,location:n}=e;return nt(Tt(t),n)}var wt=function(e){return e[e.pending=0]=`pending`,e[e.success=1]=`success`,e[e.error=2]=`error`,e}(wt||{});new Promise(()=>{}),b.Component;function Tt(e,t){t===void 0&&(t=[]);let n=[];return b.Children.forEach(e,(e,r)=>{if(!b.isValidElement(e))return;let i=[...t,r];if(e.type===b.Fragment){n.push.apply(n,Tt(e.props.children,i));return}e.type!==xt&&T(!1),!(!e.props.index||!e.props.children)&&T(!1);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,loader:e.props.loader,action:e.props.action,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=Tt(e.props.children,i)),n.push(a)}),n}function Et(){return Et=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Et.apply(this,arguments)}function Dt(e,t){if(e==null)return{};var n={},r=Object.keys(e),i,a;for(a=0;a<r.length;a++)i=r[a],!(t.indexOf(i)>=0)&&(n[i]=e[i]);return n}function Ot(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function kt(e,t){return e.button===0&&(!t||t===`_self`)&&!Ot(e)}var At=[`onClick`,`relative`,`reloadDocument`,`replace`,`state`,`target`,`to`,`preventScrollReset`,`viewTransition`],jt=`6`;try{window.__reactRouterVersion=jt}catch{}var Mt=b.startTransition;S.flushSync,b.useId;function Nt(e){let{basename:t,children:n,future:r,window:i}=e,a=b.useRef();a.current??=te({window:i,v5Compat:!0});let o=a.current,[s,c]=b.useState({action:o.action,location:o.location}),{v7_startTransition:l}=r||{},u=b.useCallback(e=>{l&&Mt?Mt(()=>c(e)):c(e)},[c,l]);return b.useLayoutEffect(()=>o.listen(u),[o,u]),b.useEffect(()=>bt(r),[r]),b.createElement(St,{basename:t,children:n,location:s.location,navigationType:s.action,navigator:o,future:r})}var Pt=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Ft=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,It=b.forwardRef(function(e,t){let{onClick:n,relative:r,reloadDocument:i,replace:a,state:o,target:s,to:c,preventScrollReset:l,viewTransition:u}=e,d=Dt(e,At),{basename:f}=b.useContext(We),p,m=!1;if(typeof c==`string`&&Ft.test(c)&&(p=c,Pt))try{let e=new URL(window.location.href),t=c.startsWith(`//`)?new URL(e.protocol+c):new URL(c),n=Te(t.pathname,f);t.origin===e.origin&&n!=null?c=n+t.search+t.hash:m=!0}catch{}let h=Je(c,{relative:r}),g=zt(c,{replace:a,state:o,target:s,preventScrollReset:l,relative:r,viewTransition:u});function _(e){n&&n(e),e.defaultPrevented||g(e)}return b.createElement(`a`,Et({},d,{href:p||h,onClick:m||i?n:_,ref:t,target:s}))}),Lt;(function(e){e.UseScrollRestoration=`useScrollRestoration`,e.UseSubmit=`useSubmit`,e.UseSubmitFetcher=`useSubmitFetcher`,e.UseFetcher=`useFetcher`,e.useViewTransitionState=`useViewTransitionState`})(Lt||={});var Rt;(function(e){e.UseFetcher=`useFetcher`,e.UseFetchers=`useFetchers`,e.UseScrollRestoration=`useScrollRestoration`})(Rt||={});function zt(e,t){let{target:n,replace:r,state:i,preventScrollReset:a,relative:o,viewTransition:s}=t===void 0?{}:t,c=Qe(),l=Xe(),u=tt(e,{relative:o});return b.useCallback(t=>{kt(t,n)&&(t.preventDefault(),c(e,{replace:r===void 0?oe(l)===oe(u):r,state:i,preventScrollReset:a,relative:o,viewTransition:s}))},[l,c,u,r,i,n,e,a,o,s])}var Bt=s((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),Vt=s(((e,t)=>{t.exports=Bt()})),Ht=(0,b.createContext)({});function Ut(e){let t=(0,b.useRef)(null);return t.current===null&&(t.current=e()),t.current}var Wt=typeof window<`u`?b.useLayoutEffect:b.useEffect,Gt=(0,b.createContext)(null);function Kt(e,t){e.indexOf(t)===-1&&e.push(t)}function qt(e,t){let n=e.indexOf(t);n>-1&&e.splice(n,1)}var Jt=(e,t,n)=>n>t?t:n<e?e:n,Yt={},Xt=e=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e);function Zt(e){return typeof e==`object`&&!!e}var Qt=e=>/^0[^.\s]+$/u.test(e);function $t(e){let t;return()=>(t===void 0&&(t=e()),t)}var en=e=>e,tn=(e,t)=>n=>t(e(n)),nn=(...e)=>e.reduce(tn),rn=(e,t,n)=>{let r=t-e;return r===0?1:(n-e)/r},an=class{constructor(){this.subscriptions=[]}add(e){return Kt(this.subscriptions,e),()=>qt(this.subscriptions,e)}notify(e,t,n){let r=this.subscriptions.length;if(r)if(r===1)this.subscriptions[0](e,t,n);else for(let i=0;i<r;i++){let r=this.subscriptions[i];r&&r(e,t,n)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}},on=e=>e*1e3,sn=e=>e/1e3;function cn(e,t){return t?1e3/t*e:0}var ln=(e,t,n)=>(((1-3*n+3*t)*e+(3*n-6*t))*e+3*t)*e,un=1e-7,dn=12;function fn(e,t,n,r,i){let a,o,s=0;do o=t+(n-t)/2,a=ln(o,r,i)-e,a>0?n=o:t=o;while(Math.abs(a)>un&&++s<dn);return o}function pn(e,t,n,r){if(e===t&&n===r)return en;let i=t=>fn(t,0,1,e,n);return e=>e===0||e===1?e:ln(i(e),t,r)}var mn=e=>t=>t<=.5?e(2*t)/2:(2-e(2*(1-t)))/2,hn=e=>t=>1-e(1-t),gn=pn(.33,1.53,.69,.99),_n=hn(gn),vn=mn(_n),yn=e=>e>=1?1:(e*=2)<1?.5*_n(e):.5*(2-2**(-10*(e-1))),bn=e=>1-Math.sin(Math.acos(e)),xn=hn(bn),Sn=mn(bn),Cn=pn(.42,0,1,1),wn=pn(0,0,.58,1),Tn=pn(.42,0,.58,1),En=e=>Array.isArray(e)&&typeof e[0]!=`number`,Dn=e=>Array.isArray(e)&&typeof e[0]==`number`,On={linear:en,easeIn:Cn,easeInOut:Tn,easeOut:wn,circIn:bn,circInOut:Sn,circOut:xn,backIn:_n,backInOut:vn,backOut:gn,anticipate:yn},kn=e=>typeof e==`string`,An=e=>{if(Dn(e)){e.length;let[t,n,r,i]=e;return pn(t,n,r,i)}else if(kn(e))return On[e],`${e}`,On[e];return e},jn=[`setup`,`read`,`resolveKeyframes`,`preUpdate`,`update`,`preRender`,`render`,`postRender`],Mn={value:null,addProjectionMetrics:null};function Nn(e,t){let n=new Set,r=new Set,i=!1,a=!1,o=new WeakSet,s={delta:0,timestamp:0,isProcessing:!1},c=0;function l(t){o.has(t)&&(u.schedule(t),e()),c++,t(s)}let u={schedule:(e,t=!1,a=!1)=>{let s=a&&i?n:r;return t&&o.add(e),s.add(e),e},cancel:e=>{r.delete(e),o.delete(e)},process:e=>{if(s=e,i){a=!0;return}i=!0;let o=n;n=r,r=o,n.forEach(l),t&&Mn.value&&Mn.value.frameloop[t].push(c),c=0,n.clear(),i=!1,a&&(a=!1,u.process(e))}};return u}var Pn=40;function Fn(e,t){let n=!1,r=!0,i={delta:0,timestamp:0,isProcessing:!1},a=()=>n=!0,o=jn.reduce((e,n)=>(e[n]=Nn(a,t?n:void 0),e),{}),{setup:s,read:c,resolveKeyframes:l,preUpdate:u,update:d,preRender:f,render:p,postRender:m}=o,h=()=>{let a=Yt.useManualTiming,o=a?i.timestamp:performance.now();n=!1,a||(i.delta=r?1e3/60:Math.max(Math.min(o-i.timestamp,Pn),1)),i.timestamp=o,i.isProcessing=!0,s.process(i),c.process(i),l.process(i),u.process(i),d.process(i),f.process(i),p.process(i),m.process(i),i.isProcessing=!1,n&&t&&(r=!1,e(h))},g=()=>{n=!0,r=!0,i.isProcessing||e(h)};return{schedule:jn.reduce((e,t)=>{let r=o[t];return e[t]=(e,t=!1,i=!1)=>(n||g(),r.schedule(e,t,i)),e},{}),cancel:e=>{for(let t=0;t<jn.length;t++)o[jn[t]].cancel(e)},state:i,steps:o}}var{schedule:k,cancel:In,state:Ln,steps:Rn}=Fn(typeof requestAnimationFrame<`u`?requestAnimationFrame:en,!0),zn;function Bn(){zn=void 0}var Vn={now:()=>(zn===void 0&&Vn.set(Ln.isProcessing||Yt.useManualTiming?Ln.timestamp:performance.now()),zn),set:e=>{zn=e,queueMicrotask(Bn)}},Hn={layout:0,mainThread:0,waapi:0},Un=e=>t=>typeof t==`string`&&t.startsWith(e),Wn=Un(`--`),Gn=Un(`var(--`),Kn=e=>Gn(e)?qn.test(e.split(`/*`)[0].trim()):!1,qn=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function Jn(e){return typeof e==`string`?e.split(`/*`)[0].includes(`var(--`):!1}var Yn={test:e=>typeof e==`number`,parse:parseFloat,transform:e=>e},Xn={...Yn,transform:e=>Jt(0,1,e)},Zn={...Yn,default:1},Qn=e=>Math.round(e*1e5)/1e5,$n=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function er(e){return e==null}var tr=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,nr=(e,t)=>n=>!!(typeof n==`string`&&tr.test(n)&&n.startsWith(e)||t&&!er(n)&&Object.prototype.hasOwnProperty.call(n,t)),rr=(e,t,n)=>r=>{if(typeof r!=`string`)return r;let[i,a,o,s]=r.match($n);return{[e]:parseFloat(i),[t]:parseFloat(a),[n]:parseFloat(o),alpha:s===void 0?1:parseFloat(s)}},ir=e=>Jt(0,255,e),ar={...Yn,transform:e=>Math.round(ir(e))},or={test:nr(`rgb`,`red`),parse:rr(`red`,`green`,`blue`),transform:({red:e,green:t,blue:n,alpha:r=1})=>`rgba(`+ar.transform(e)+`, `+ar.transform(t)+`, `+ar.transform(n)+`, `+Qn(Xn.transform(r))+`)`};function sr(e){let t=``,n=``,r=``,i=``;return e.length>5?(t=e.substring(1,3),n=e.substring(3,5),r=e.substring(5,7),i=e.substring(7,9)):(t=e.substring(1,2),n=e.substring(2,3),r=e.substring(3,4),i=e.substring(4,5),t+=t,n+=n,r+=r,i+=i),{red:parseInt(t,16),green:parseInt(n,16),blue:parseInt(r,16),alpha:i?parseInt(i,16)/255:1}}var cr={test:nr(`#`),parse:sr,transform:or.transform},lr=e=>({test:t=>typeof t==`string`&&t.endsWith(e)&&t.split(` `).length===1,parse:parseFloat,transform:t=>`${t}${e}`}),ur=lr(`deg`),dr=lr(`%`),A=lr(`px`),fr=lr(`vh`),pr=lr(`vw`),mr={...dr,parse:e=>dr.parse(e)/100,transform:e=>dr.transform(e*100)},hr={test:nr(`hsl`,`hue`),parse:rr(`hue`,`saturation`,`lightness`),transform:({hue:e,saturation:t,lightness:n,alpha:r=1})=>`hsla(`+Math.round(e)+`, `+dr.transform(Qn(t))+`, `+dr.transform(Qn(n))+`, `+Qn(Xn.transform(r))+`)`},gr={test:e=>or.test(e)||cr.test(e)||hr.test(e),parse:e=>or.test(e)?or.parse(e):hr.test(e)?hr.parse(e):cr.parse(e),transform:e=>typeof e==`string`?e:e.hasOwnProperty(`red`)?or.transform(e):hr.transform(e),getAnimatableNone:e=>{let t=gr.parse(e);return t.alpha=0,gr.transform(t)}},_r=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function vr(e){return isNaN(e)&&typeof e==`string`&&(e.match($n)?.length||0)+(e.match(_r)?.length||0)>0}var yr=`number`,br=`color`,xr=`var`,Sr=`var(`,Cr="${}",wr=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function Tr(e){let t=e.toString(),n=[],r={color:[],number:[],var:[]},i=[],a=0;return{values:n,split:t.replace(wr,e=>(gr.test(e)?(r.color.push(a),i.push(br),n.push(gr.parse(e))):e.startsWith(Sr)?(r.var.push(a),i.push(xr),n.push(e)):(r.number.push(a),i.push(yr),n.push(parseFloat(e))),++a,Cr)).split(Cr),indexes:r,types:i}}function Er(e){return Tr(e).values}function Dr({split:e,types:t}){let n=e.length;return r=>{let i=``;for(let a=0;a<n;a++)if(i+=e[a],r[a]!==void 0){let e=t[a];e===yr?i+=Qn(r[a]):e===br?i+=gr.transform(r[a]):i+=r[a]}return i}}function Or(e){return Dr(Tr(e))}var kr=e=>typeof e==`number`?0:gr.test(e)?gr.getAnimatableNone(e):e,Ar=(e,t)=>typeof e==`number`?t?.trim().endsWith(`/`)?e:0:kr(e);function jr(e){let t=Tr(e);return Dr(t)(t.values.map((e,n)=>Ar(e,t.split[n])))}var Mr={test:vr,parse:Er,createTransformer:Or,getAnimatableNone:jr};function Nr(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function Pr({hue:e,saturation:t,lightness:n,alpha:r}){e/=360,t/=100,n/=100;let i=0,a=0,o=0;if(!t)i=a=o=n;else{let r=n<.5?n*(1+t):n+t-n*t,s=2*n-r;i=Nr(s,r,e+1/3),a=Nr(s,r,e),o=Nr(s,r,e-1/3)}return{red:Math.round(i*255),green:Math.round(a*255),blue:Math.round(o*255),alpha:r}}function Fr(e,t){return n=>n>0?t:e}var j=(e,t,n)=>e+(t-e)*n,Ir=(e,t,n)=>{let r=e*e,i=n*(t*t-r)+r;return i<0?0:Math.sqrt(i)},Lr=[cr,or,hr],Rr=e=>Lr.find(t=>t.test(e));function zr(e){let t=Rr(e);if(`${e}`,!t)return!1;let n=t.parse(e);return t===hr&&(n=Pr(n)),n}var Br=(e,t)=>{let n=zr(e),r=zr(t);if(!n||!r)return Fr(e,t);let i={...n};return e=>(i.red=Ir(n.red,r.red,e),i.green=Ir(n.green,r.green,e),i.blue=Ir(n.blue,r.blue,e),i.alpha=j(n.alpha,r.alpha,e),or.transform(i))},Vr=new Set([`none`,`hidden`]);function Hr(e,t){return Vr.has(e)?n=>n<=0?e:t:n=>n>=1?t:e}function Ur(e,t){return n=>j(e,t,n)}function Wr(e){return typeof e==`number`?Ur:typeof e==`string`?Kn(e)?Fr:gr.test(e)?Br:Jr:Array.isArray(e)?Gr:typeof e==`object`?gr.test(e)?Br:Kr:Fr}function Gr(e,t){let n=[...e],r=n.length,i=e.map((e,n)=>Wr(e)(e,t[n]));return e=>{for(let t=0;t<r;t++)n[t]=i[t](e);return n}}function Kr(e,t){let n={...e,...t},r={};for(let i in n)e[i]!==void 0&&t[i]!==void 0&&(r[i]=Wr(e[i])(e[i],t[i]));return e=>{for(let t in r)n[t]=r[t](e);return n}}function qr(e,t){let n=[],r={color:0,var:0,number:0};for(let i=0;i<t.values.length;i++){let a=t.types[i],o=e.indexes[a][r[a]];n[i]=e.values[o]??0,r[a]++}return n}var Jr=(e,t)=>{let n=Mr.createTransformer(t),r=Tr(e),i=Tr(t);return r.indexes.var.length===i.indexes.var.length&&r.indexes.color.length===i.indexes.color.length&&r.indexes.number.length>=i.indexes.number.length?Vr.has(e)&&!i.values.length||Vr.has(t)&&!r.values.length?Hr(e,t):nn(Gr(qr(r,i),i.values),n):(`${e}${t}`,Fr(e,t))};function Yr(e,t,n){return typeof e==`number`&&typeof t==`number`&&typeof n==`number`?j(e,t,n):Wr(e)(e,t)}var Xr=e=>{let t=({timestamp:t})=>e(t);return{start:(e=!0)=>k.update(t,e),stop:()=>In(t),now:()=>Ln.isProcessing?Ln.timestamp:Vn.now()}},Zr=(e,t,n=10)=>{let r=``,i=Math.max(Math.round(t/n),2);for(let t=0;t<i;t++)r+=Math.round(e(t/(i-1))*1e4)/1e4+`, `;return`linear(${r.substring(0,r.length-2)})`},Qr=2e4;function $r(e){let t=0,n=e.next(t);for(;!n.done&&t<2e4;)t+=50,n=e.next(t);return t>=2e4?1/0:t}function ei(e,t=100,n){let r=n({...e,keyframes:[0,t]}),i=Math.min($r(r),Qr);return{type:`keyframes`,ease:e=>r.next(i*e).value/t,duration:sn(i)}}var M={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};function ti(e,t){return e*Math.sqrt(1-t*t)}var ni=12;function ri(e,t,n){let r=n;for(let n=1;n<ni;n++)r-=e(r)/t(r);return r}var ii=.001;function ai({duration:e=M.duration,bounce:t=M.bounce,velocity:n=M.velocity,mass:r=M.mass}){let i,a;M.maxDuration;let o=1-t;o=Jt(M.minDamping,M.maxDamping,o),e=Jt(M.minDuration,M.maxDuration,sn(e)),o<1?(i=t=>{let r=t*o,i=r*e,a=r-n,s=ti(t,o),c=Math.exp(-i);return ii-a/s*c},a=t=>{let r=t*o*e,a=r*n+n,s=o**2*t**2*e,c=Math.exp(-r),l=ti(t**2,o);return(-i(t)+ii>0?-1:1)*((a-s)*c)/l}):(i=t=>{let r=Math.exp(-t*e),i=(t-n)*e+1;return-ii+r*i},a=t=>Math.exp(-t*e)*((n-t)*(e*e)));let s=5/e,c=ri(i,a,s);if(e=on(e),isNaN(c))return{stiffness:M.stiffness,damping:M.damping,duration:e};{let t=c**2*r;return{stiffness:t,damping:o*2*Math.sqrt(r*t),duration:e}}}var oi=[`duration`,`bounce`],si=[`stiffness`,`damping`,`mass`];function ci(e,t){return t.some(t=>e[t]!==void 0)}function li(e){let t={velocity:M.velocity,stiffness:M.stiffness,damping:M.damping,mass:M.mass,isResolvedFromDuration:!1,...e};if(!ci(e,si)&&ci(e,oi))if(t.velocity=0,e.visualDuration){let n=e.visualDuration,r=2*Math.PI/(n*1.2),i=r*r,a=2*Jt(.05,1,1-(e.bounce||0))*Math.sqrt(i);t={...t,mass:M.mass,stiffness:i,damping:a}}else{let n=ai({...e,velocity:0});t={...t,...n,mass:M.mass},t.isResolvedFromDuration=!0}return t}function ui(e=M.visualDuration,t=M.bounce){let n=typeof e==`object`?e:{visualDuration:e,keyframes:[0,1],bounce:t},{restSpeed:r,restDelta:i}=n,a=n.keyframes[0],o=n.keyframes[n.keyframes.length-1],s={done:!1,value:a},{stiffness:c,damping:l,mass:u,duration:d,velocity:f,isResolvedFromDuration:p}=li({...n,velocity:-sn(n.velocity||0)}),m=f||0,h=l/(2*Math.sqrt(c*u)),g=o-a,_=sn(Math.sqrt(c/u)),v=Math.abs(g)<5;r||=v?M.restSpeed.granular:M.restSpeed.default,i||=v?M.restDelta.granular:M.restDelta.default;let y,b,x,S,C,w;if(h<1)x=ti(_,h),S=(m+h*_*g)/x,y=e=>o-Math.exp(-h*_*e)*(S*Math.sin(x*e)+g*Math.cos(x*e)),C=h*_*S+g*x,w=h*_*g-S*x,b=e=>Math.exp(-h*_*e)*(C*Math.sin(x*e)+w*Math.cos(x*e));else if(h===1){y=e=>o-Math.exp(-_*e)*(g+(m+_*g)*e);let e=m+_*g;b=t=>Math.exp(-_*t)*(_*e*t-m)}else{let e=_*Math.sqrt(h*h-1);y=t=>{let n=Math.exp(-h*_*t),r=Math.min(e*t,300);return o-n*((m+h*_*g)*Math.sinh(r)+e*g*Math.cosh(r))/e};let t=(m+h*_*g)/e,n=h*_*t-g*e,r=h*_*g-t*e;b=t=>{let i=Math.exp(-h*_*t),a=Math.min(e*t,300);return i*(n*Math.sinh(a)+r*Math.cosh(a))}}let ee={calculatedDuration:p&&d||null,velocity:e=>on(b(e)),next:e=>{if(!p&&h<1){let t=Math.exp(-h*_*e),n=Math.sin(x*e),a=Math.cos(x*e),c=o-t*(S*n+g*a),l=on(t*(C*n+w*a));return s.done=Math.abs(l)<=r&&Math.abs(o-c)<=i,s.value=s.done?o:c,s}let t=y(e);if(p)s.done=e>=d;else{let n=on(b(e));s.done=Math.abs(n)<=r&&Math.abs(o-t)<=i}return s.value=s.done?o:t,s},toString:()=>{let e=Math.min($r(ee),Qr),t=Zr(t=>ee.next(e*t).value,e,30);return e+`ms `+t},toTransition:()=>{}};return ee}ui.applyToOptions=e=>{let t=ei(e,100,ui);return e.ease=t.ease,e.duration=on(t.duration),e.type=`keyframes`,e};var di=5;function fi(e,t,n){let r=Math.max(t-di,0);return cn(n-e(r),t-r)}function pi({keyframes:e,velocity:t=0,power:n=.8,timeConstant:r=325,bounceDamping:i=10,bounceStiffness:a=500,modifyTarget:o,min:s,max:c,restDelta:l=.5,restSpeed:u}){let d=e[0],f={done:!1,value:d},p=e=>s!==void 0&&e<s||c!==void 0&&e>c,m=e=>s===void 0?c:c===void 0||Math.abs(s-e)<Math.abs(c-e)?s:c,h=n*t,g=d+h,_=o===void 0?g:o(g);_!==g&&(h=_-d);let v=e=>-h*Math.exp(-e/r),y=e=>_+v(e),b=e=>{let t=v(e),n=y(e);f.done=Math.abs(t)<=l,f.value=f.done?_:n},x,S,C=e=>{p(f.value)&&(x=e,S=ui({keyframes:[f.value,m(f.value)],velocity:fi(y,e,f.value),damping:i,stiffness:a,restDelta:l,restSpeed:u}))};return C(0),{calculatedDuration:null,next:e=>{let t=!1;return!S&&x===void 0&&(t=!0,b(e),C(e)),x!==void 0&&e>=x?S.next(e-x):(!t&&b(e),f)}}}function mi(e,t,n){let r=[],i=n||Yt.mix||Yr,a=e.length-1;for(let n=0;n<a;n++){let a=i(e[n],e[n+1]);t&&(a=nn(Array.isArray(t)?t[n]||en:t,a)),r.push(a)}return r}function hi(e,t,{clamp:n=!0,ease:r,mixer:i}={}){let a=e.length;if(t.length,a===1)return()=>t[0];if(a===2&&t[0]===t[1])return()=>t[1];let o=e[0]===e[1];e[0]>e[a-1]&&(e=[...e].reverse(),t=[...t].reverse());let s=mi(t,r,i),c=s.length,l=n=>{if(o&&n<e[0])return t[0];let r=0;if(c>1)for(;r<e.length-2&&!(n<e[r+1]);r++);let i=rn(e[r],e[r+1],n);return s[r](i)};return n?t=>l(Jt(e[0],e[a-1],t)):l}function gi(e,t){let n=e[e.length-1];for(let r=1;r<=t;r++){let i=rn(0,t,r);e.push(j(n,1,i))}}function _i(e){let t=[0];return gi(t,e.length-1),t}function vi(e,t){return e.map(e=>e*t)}function yi(e,t){return e.map(()=>t||Tn).splice(0,e.length-1)}function bi({duration:e=300,keyframes:t,times:n,ease:r=`easeInOut`}){let i=En(r)?r.map(An):An(r),a={done:!1,value:t[0]},o=hi(vi(n&&n.length===t.length?n:_i(t),e),t,{ease:Array.isArray(i)?i:yi(t,i)});return{calculatedDuration:e,next:t=>(a.value=o(t),a.done=t>=e,a)}}var xi=e=>e!==null;function Si(e,{repeat:t,repeatType:n=`loop`},r,i=1){let a=e.filter(xi),o=i<0||t&&n!==`loop`&&t%2==1?0:a.length-1;return!o||r===void 0?a[o]:r}var Ci={decay:pi,inertia:pi,tween:bi,keyframes:bi,spring:ui};function wi(e){typeof e.type==`string`&&(e.type=Ci[e.type])}var Ti=class{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(e=>{this.resolve=e})}notifyFinished(){this.resolve()}then(e,t){return this.finished.then(e,t)}},Ei=e=>e/100,Di=class extends Ti{constructor(e){super(),this.state=`idle`,this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{let{motionValue:e}=this.options;e&&e.updatedAt!==Vn.now()&&this.tick(Vn.now()),this.isStopped=!0,this.state!==`idle`&&(this.teardown(),this.options.onStop?.())},Hn.mainThread++,this.options=e,this.initAnimation(),this.play(),e.autoplay===!1&&this.pause()}initAnimation(){let{options:e}=this;wi(e);let{type:t=bi,repeat:n=0,repeatDelay:r=0,repeatType:i,velocity:a=0}=e,{keyframes:o}=e,s=t||bi;s!==bi&&typeof o[0]!=`number`&&(this.mixKeyframes=nn(Ei,Yr(o[0],o[1])),o=[0,100]);let c=s({...e,keyframes:o});i===`mirror`&&(this.mirroredGenerator=s({...e,keyframes:[...o].reverse(),velocity:-a})),c.calculatedDuration===null&&(c.calculatedDuration=$r(c));let{calculatedDuration:l}=c;this.calculatedDuration=l,this.resolvedDuration=l+r,this.totalDuration=this.resolvedDuration*(n+1)-r,this.generator=c}updateTime(e){let t=Math.round(e-this.startTime)*this.playbackSpeed;this.holdTime===null?this.currentTime=t:this.currentTime=this.holdTime}tick(e,t=!1){let{generator:n,totalDuration:r,mixKeyframes:i,mirroredGenerator:a,resolvedDuration:o,calculatedDuration:s}=this;if(this.startTime===null)return n.next(0);let{delay:c=0,keyframes:l,repeat:u,repeatType:d,repeatDelay:f,type:p,onUpdate:m,finalKeyframe:h}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,e):this.speed<0&&(this.startTime=Math.min(e-r/this.speed,this.startTime)),t?this.currentTime=e:this.updateTime(e);let g=this.currentTime-c*(this.playbackSpeed>=0?1:-1),_=this.playbackSpeed>=0?g<0:g>r;this.currentTime=Math.max(g,0),this.state===`finished`&&this.holdTime===null&&(this.currentTime=r);let v=this.currentTime,y=n;if(u){let e=Math.min(this.currentTime,r)/o,t=Math.floor(e),n=e%1;!n&&e>=1&&(n=1),n===1&&t--,t=Math.min(t,u+1),t%2&&(d===`reverse`?(n=1-n,f&&(n-=f/o)):d===`mirror`&&(y=a)),v=Jt(0,1,n)*o}let b;_?(this.delayState.value=l[0],b=this.delayState):b=y.next(v),i&&!_&&(b.value=i(b.value));let{done:x}=b;!_&&s!==null&&(x=this.playbackSpeed>=0?this.currentTime>=r:this.currentTime<=0);let S=this.holdTime===null&&(this.state===`finished`||this.state===`running`&&x);return S&&p!==pi&&(b.value=Si(l,this.options,h,this.speed)),m&&m(b.value),S&&this.finish(),b}then(e,t){return this.finished.then(e,t)}get duration(){return sn(this.calculatedDuration)}get iterationDuration(){let{delay:e=0}=this.options||{};return this.duration+sn(e)}get time(){return sn(this.currentTime)}set time(e){e=on(e),this.currentTime=e,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=e:this.driver&&(this.startTime=this.driver.now()-e/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state=`paused`,this.holdTime=e,this.tick(e))}getGeneratorVelocity(){let e=this.currentTime;if(e<=0)return this.options.velocity||0;if(this.generator.velocity)return this.generator.velocity(e);let t=this.generator.next(e).value;return fi(e=>this.generator.next(e).value,e,t)}get speed(){return this.playbackSpeed}set speed(e){let t=this.playbackSpeed!==e;t&&this.driver&&this.updateTime(Vn.now()),this.playbackSpeed=e,t&&this.driver&&(this.time=sn(this.currentTime))}play(){if(this.isStopped)return;let{driver:e=Xr,startTime:t}=this.options;this.driver||=e(e=>this.tick(e)),this.options.onPlay?.();let n=this.driver.now();this.state===`finished`?(this.updateFinished(),this.startTime=n):this.holdTime===null?this.startTime||=t??n:this.startTime=n-this.holdTime,this.state===`finished`&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state=`running`,this.driver.start()}pause(){this.state=`paused`,this.updateTime(Vn.now()),this.holdTime=this.currentTime}complete(){this.state!==`running`&&this.play(),this.state=`finished`,this.holdTime=null}finish(){this.notifyFinished(),this.teardown(),this.state=`finished`,this.options.onComplete?.()}cancel(){this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),this.options.onCancel?.()}teardown(){this.state=`idle`,this.stopDriver(),this.startTime=this.holdTime=null,Hn.mainThread--}stopDriver(){this.driver&&=(this.driver.stop(),void 0)}sample(e){return this.startTime=0,this.tick(e,!0)}attachTimeline(e){return this.options.allowFlatten&&(this.options.type=`keyframes`,this.options.ease=`linear`,this.initAnimation()),this.driver?.stop(),e.observe(this)}};function Oi(e){for(let t=1;t<e.length;t++)e[t]??(e[t]=e[t-1])}var ki=e=>e*180/Math.PI,Ai=e=>Mi(ki(Math.atan2(e[1],e[0]))),ji={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:e=>(Math.abs(e[0])+Math.abs(e[3]))/2,rotate:Ai,rotateZ:Ai,skewX:e=>ki(Math.atan(e[1])),skewY:e=>ki(Math.atan(e[2])),skew:e=>(Math.abs(e[1])+Math.abs(e[2]))/2},Mi=e=>(e%=360,e<0&&(e+=360),e),Ni=Ai,Pi=e=>Math.sqrt(e[0]*e[0]+e[1]*e[1]),Fi=e=>Math.sqrt(e[4]*e[4]+e[5]*e[5]),Ii={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:Pi,scaleY:Fi,scale:e=>(Pi(e)+Fi(e))/2,rotateX:e=>Mi(ki(Math.atan2(e[6],e[5]))),rotateY:e=>Mi(ki(Math.atan2(-e[2],e[0]))),rotateZ:Ni,rotate:Ni,skewX:e=>ki(Math.atan(e[4])),skewY:e=>ki(Math.atan(e[1])),skew:e=>(Math.abs(e[1])+Math.abs(e[4]))/2};function Li(e){return+!!e.includes(`scale`)}function Ri(e,t){if(!e||e===`none`)return Li(t);let n=e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u),r,i;if(n)r=Ii,i=n;else{let t=e.match(/^matrix\(([-\d.e\s,]+)\)$/u);r=ji,i=t}if(!i)return Li(t);let a=r[t],o=i[1].split(`,`).map(N);return typeof a==`function`?a(o):o[a]}var zi=(e,t)=>{let{transform:n=`none`}=getComputedStyle(e);return Ri(n,t)};function N(e){return parseFloat(e.trim())}var P=[`transformPerspective`,`x`,`y`,`z`,`translateX`,`translateY`,`translateZ`,`scale`,`scaleX`,`scaleY`,`rotate`,`rotateX`,`rotateY`,`rotateZ`,`skew`,`skewX`,`skewY`],Bi=new Set(P),Vi=e=>e===Yn||e===A,Hi=new Set([`x`,`y`,`z`]),Ui=P.filter(e=>!Hi.has(e));function Wi(e){let t=[];return Ui.forEach(n=>{let r=e.getValue(n);r!==void 0&&(t.push([n,r.get()]),r.set(+!!n.startsWith(`scale`)))}),t}var Gi={width:({x:e},{paddingLeft:t=`0`,paddingRight:n=`0`,boxSizing:r})=>{let i=e.max-e.min;return r===`border-box`?i:i-parseFloat(t)-parseFloat(n)},height:({y:e},{paddingTop:t=`0`,paddingBottom:n=`0`,boxSizing:r})=>{let i=e.max-e.min;return r===`border-box`?i:i-parseFloat(t)-parseFloat(n)},top:(e,{top:t})=>parseFloat(t),left:(e,{left:t})=>parseFloat(t),bottom:({y:e},{top:t})=>parseFloat(t)+(e.max-e.min),right:({x:e},{left:t})=>parseFloat(t)+(e.max-e.min),x:(e,{transform:t})=>Ri(t,`x`),y:(e,{transform:t})=>Ri(t,`y`)};Gi.translateX=Gi.x,Gi.translateY=Gi.y;var Ki=new Set,qi=!1,Ji=!1,Yi=!1;function Xi(){if(Ji){let e=Array.from(Ki).filter(e=>e.needsMeasurement),t=new Set(e.map(e=>e.element)),n=new Map;t.forEach(e=>{let t=Wi(e);t.length&&(n.set(e,t),e.render())}),e.forEach(e=>e.measureInitialState()),t.forEach(e=>{e.render();let t=n.get(e);t&&t.forEach(([t,n])=>{e.getValue(t)?.set(n)})}),e.forEach(e=>e.measureEndState()),e.forEach(e=>{e.suspendedScrollY!==void 0&&window.scrollTo(0,e.suspendedScrollY)})}Ji=!1,qi=!1,Ki.forEach(e=>e.complete(Yi)),Ki.clear()}function Zi(){Ki.forEach(e=>{e.readKeyframes(),e.needsMeasurement&&(Ji=!0)})}function Qi(){Yi=!0,Zi(),Xi(),Yi=!1}var $i=class{constructor(e,t,n,r,i,a=!1){this.state=`pending`,this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...e],this.onComplete=t,this.name=n,this.motionValue=r,this.element=i,this.isAsync=a}scheduleResolve(){this.state=`scheduled`,this.isAsync?(Ki.add(this),qi||(qi=!0,k.read(Zi),k.resolveKeyframes(Xi))):(this.readKeyframes(),this.complete())}readKeyframes(){let{unresolvedKeyframes:e,name:t,element:n,motionValue:r}=this;if(e[0]===null){let i=r?.get(),a=e[e.length-1];if(i!==void 0)e[0]=i;else if(n&&t){let r=n.readValue(t,a);r!=null&&(e[0]=r)}e[0]===void 0&&(e[0]=a),r&&i===void 0&&r.set(e[0])}Oi(e)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(e=!1){this.state=`complete`,this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,e),Ki.delete(this)}cancel(){this.state===`scheduled`&&(Ki.delete(this),this.state=`pending`)}resume(){this.state===`pending`&&this.scheduleResolve()}},ea=e=>e.startsWith(`--`);function ta(e,t,n){ea(t)?e.style.setProperty(t,n):e.style[t]=n}var na={};function ra(e,t){let n=$t(e);return()=>na[t]??n()}var ia=ra(()=>window.ScrollTimeline!==void 0,`scrollTimeline`),aa=ra(()=>{try{document.createElement(`div`).animate({opacity:0},{easing:`linear(0, 1)`})}catch{return!1}return!0},`linearEasing`),oa=([e,t,n,r])=>`cubic-bezier(${e}, ${t}, ${n}, ${r})`,sa={linear:`linear`,ease:`ease`,easeIn:`ease-in`,easeOut:`ease-out`,easeInOut:`ease-in-out`,circIn:oa([0,.65,.55,1]),circOut:oa([.55,0,1,.45]),backIn:oa([.31,.01,.66,-.59]),backOut:oa([.33,1.53,.69,.99])};function ca(e,t){if(e)return typeof e==`function`?aa()?Zr(e,t):`ease-out`:Dn(e)?oa(e):Array.isArray(e)?e.map(e=>ca(e,t)||sa.easeOut):sa[e]}function la(e,t,n,{delay:r=0,duration:i=300,repeat:a=0,repeatType:o=`loop`,ease:s=`easeOut`,times:c}={},l=void 0){let u={[t]:n};c&&(u.offset=c);let d=ca(s,i);Array.isArray(d)&&(u.easing=d),Mn.value&&Hn.waapi++;let f={delay:r,duration:i,easing:Array.isArray(d)?`linear`:d,fill:`both`,iterations:a+1,direction:o===`reverse`?`alternate`:`normal`};l&&(f.pseudoElement=l);let p=e.animate(u,f);return Mn.value&&p.finished.finally(()=>{Hn.waapi--}),p}function ua(e){return typeof e==`function`&&`applyToOptions`in e}function da({type:e,...t}){return ua(e)&&aa()?e.applyToOptions(t):(t.duration??=300,t.ease??=`easeOut`,t)}var fa=class extends Ti{constructor(e){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!e)return;let{element:t,name:n,keyframes:r,pseudoElement:i,allowFlatten:a=!1,finalKeyframe:o,onComplete:s}=e;this.isPseudoElement=!!i,this.allowFlatten=a,this.options=e,e.type;let c=da(e);this.animation=la(t,n,r,c,i),c.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!i){let e=Si(r,this.options,o,this.speed);this.updateMotionValue&&this.updateMotionValue(e),ta(t,n,e),this.animation.cancel()}s?.(),this.notifyFinished()}}play(){this.isStopped||(this.manualStartTime=null,this.animation.play(),this.state===`finished`&&this.updateFinished())}pause(){this.animation.pause()}complete(){this.animation.finish?.()}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;let{state:e}=this;e===`idle`||e===`finished`||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){let e=this.options?.element;!this.isPseudoElement&&e?.isConnected&&this.animation.commitStyles?.()}get duration(){let e=this.animation.effect?.getComputedTiming?.().duration||0;return sn(Number(e))}get iterationDuration(){let{delay:e=0}=this.options||{};return this.duration+sn(e)}get time(){return sn(Number(this.animation.currentTime)||0)}set time(e){let t=this.finishedTime!==null;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=on(e),t&&this.animation.pause()}get speed(){return this.animation.playbackRate}set speed(e){e<0&&(this.finishedTime=null),this.animation.playbackRate=e}get state(){return this.finishedTime===null?this.animation.playState:`finished`}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(e){this.manualStartTime=this.animation.startTime=e}attachTimeline({timeline:e,rangeStart:t,rangeEnd:n,observe:r}){return this.allowFlatten&&this.animation.effect?.updateTiming({easing:`linear`}),this.animation.onfinish=null,e&&ia()?(this.animation.timeline=e,t&&(this.animation.rangeStart=t),n&&(this.animation.rangeEnd=n),en):r(this)}},pa={anticipate:yn,backInOut:vn,circInOut:Sn};function ma(e){return e in pa}function ha(e){typeof e.ease==`string`&&ma(e.ease)&&(e.ease=pa[e.ease])}var ga=10,_a=class extends fa{constructor(e){ha(e),wi(e),super(e),e.startTime!==void 0&&e.autoplay!==!1&&(this.startTime=e.startTime),this.options=e}updateMotionValue(e){let{motionValue:t,onUpdate:n,onComplete:r,element:i,...a}=this.options;if(!t)return;if(e!==void 0){t.set(e);return}let o=new Di({...a,autoplay:!1}),s=Math.max(ga,Vn.now()-this.startTime),c=Jt(0,ga,s-ga),l=o.sample(s).value,{name:u}=this.options;i&&u&&ta(i,u,l),t.setWithVelocity(o.sample(Math.max(0,s-c)).value,l,c),o.stop()}},va=(e,t)=>t===`zIndex`?!1:!!(typeof e==`number`||Array.isArray(e)||typeof e==`string`&&(Mr.test(e)||e===`0`)&&!e.startsWith(`url(`));function ya(e){let t=e[0];if(e.length===1)return!0;for(let n=0;n<e.length;n++)if(e[n]!==t)return!0}function ba(e,t,n,r){let i=e[0];if(i===null)return!1;if(t===`display`||t===`visibility`)return!0;let a=e[e.length-1],o=va(i,t),s=va(a,t);return`${t}${i}${a}${o?a:i}`,!o||!s?!1:ya(e)||(n===`spring`||ua(n))&&r}function xa(e){e.duration=0,e.type=`keyframes`}var Sa=new Set([`opacity`,`clipPath`,`filter`,`transform`]),Ca=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;function wa(e){for(let t=0;t<e.length;t++)if(typeof e[t]==`string`&&Ca.test(e[t]))return!0;return!1}var Ta=new Set([`color`,`backgroundColor`,`outlineColor`,`fill`,`stroke`,`borderColor`,`borderTopColor`,`borderRightColor`,`borderBottomColor`,`borderLeftColor`]),Ea=$t(()=>Object.hasOwnProperty.call(Element.prototype,`animate`));function Da(e){let{motionValue:t,name:n,repeatDelay:r,repeatType:i,damping:a,type:o,keyframes:s}=e;if(!(t?.owner?.current instanceof HTMLElement))return!1;let{onUpdate:c,transformTemplate:l}=t.owner.getProps();return Ea()&&n&&(Sa.has(n)||Ta.has(n)&&wa(s))&&(n!==`transform`||!l)&&!c&&!r&&i!==`mirror`&&a!==0&&o!==`inertia`}var Oa=40,ka=class extends Ti{constructor({autoplay:e=!0,delay:t=0,type:n=`keyframes`,repeat:r=0,repeatDelay:i=0,repeatType:a=`loop`,keyframes:o,name:s,motionValue:c,element:l,...u}){super(),this.stop=()=>{this._animation&&(this._animation.stop(),this.stopTimeline?.()),this.keyframeResolver?.cancel()},this.createdAt=Vn.now();let d={autoplay:e,delay:t,type:n,repeat:r,repeatDelay:i,repeatType:a,name:s,motionValue:c,element:l,...u};this.keyframeResolver=new(l?.KeyframeResolver||$i)(o,(e,t,n)=>this.onKeyframesResolved(e,t,d,!n),s,c,l),this.keyframeResolver?.scheduleResolve()}onKeyframesResolved(e,t,n,r){this.keyframeResolver=void 0;let{name:i,type:a,velocity:o,delay:s,isHandoff:c,onUpdate:l}=n;this.resolvedAt=Vn.now();let u=!0;ba(e,i,a,o)||(u=!1,(Yt.instantAnimations||!s)&&l?.(Si(e,n,t)),e[0]=e[e.length-1],xa(n),n.repeat=0);let d={startTime:r?this.resolvedAt&&this.resolvedAt-this.createdAt>Oa?this.resolvedAt:this.createdAt:void 0,finalKeyframe:t,...n,keyframes:e},f=u&&!c&&Da(d),p=d.motionValue?.owner?.current,m;if(f)try{m=new _a({...d,element:p})}catch{m=new Di(d)}else m=new Di(d);m.finished.then(()=>{this.notifyFinished()}).catch(en),this.pendingTimeline&&=(this.stopTimeline=m.attachTimeline(this.pendingTimeline),void 0),this._animation=m}get finished(){return this._animation?this.animation.finished:this._finished}then(e,t){return this.finished.finally(e).then(()=>{})}get animation(){return this._animation||(this.keyframeResolver?.resume(),Qi()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(e){this.animation.time=e}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(e){this.animation.speed=e}get startTime(){return this.animation.startTime}attachTimeline(e){return this._animation?this.stopTimeline=this.animation.attachTimeline(e):this.pendingTimeline=e,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){this._animation&&this.animation.cancel(),this.keyframeResolver?.cancel()}};function Aa(e,t,n,r=0,i=1){let a=Array.from(e).sort((e,t)=>e.sortNodePosition(t)).indexOf(t),o=e.size,s=(o-1)*r;return typeof n==`function`?n(a,o):i===1?a*r:s-a*r}var ja=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function Ma(e){let t=ja.exec(e);if(!t)return[,];let[,n,r,i]=t;return[`--${n??r}`,i]}function Na(e,t,n=1){`${e}`;let[r,i]=Ma(e);if(!r)return;let a=window.getComputedStyle(t).getPropertyValue(r);if(a){let e=a.trim();return Xt(e)?parseFloat(e):e}return Kn(i)?Na(i,t,n+1):i}var Pa={type:`spring`,stiffness:500,damping:25,restSpeed:10},Fa=e=>({type:`spring`,stiffness:550,damping:e===0?2*Math.sqrt(550):30,restSpeed:10}),Ia={type:`keyframes`,duration:.8},La={type:`keyframes`,ease:[.25,.1,.35,1],duration:.3},Ra=(e,{keyframes:t})=>t.length>2?Ia:Bi.has(e)?e.startsWith(`scale`)?Fa(t[1]):Pa:La;function za(e,t){if(e?.inherit&&t){let{inherit:n,...r}=e;return{...t,...r}}return e}function Ba(e,t){let n=e?.[t]??e?.default??e;return n===e?n:za(n,e)}var Va=new Set([`when`,`delay`,`delayChildren`,`staggerChildren`,`staggerDirection`,`repeat`,`repeatType`,`repeatDelay`,`from`,`elapsed`]);function Ha(e){for(let t in e)if(!Va.has(t))return!0;return!1}var Ua=(e,t,n,r={},i,a)=>o=>{let s=Ba(r,e)||{},c=s.delay||r.delay||0,{elapsed:l=0}=r;l-=on(c);let u={keyframes:Array.isArray(n)?n:[null,n],ease:`easeOut`,velocity:t.getVelocity(),...s,delay:-l,onUpdate:e=>{t.set(e),s.onUpdate&&s.onUpdate(e)},onComplete:()=>{o(),s.onComplete&&s.onComplete()},name:e,motionValue:t,element:a?void 0:i};Ha(s)||Object.assign(u,Ra(e,u)),u.duration&&=on(u.duration),u.repeatDelay&&=on(u.repeatDelay),u.from!==void 0&&(u.keyframes[0]=u.from);let d=!1;if((u.type===!1||u.duration===0&&!u.repeatDelay)&&(xa(u),u.delay===0&&(d=!0)),(Yt.instantAnimations||Yt.skipAnimations||i?.shouldSkipAnimations)&&(d=!0,xa(u),u.delay=0),u.allowFlatten=!s.type&&!s.ease,d&&!a&&t.get()!==void 0){let e=Si(u.keyframes,s);if(e!==void 0){k.update(()=>{u.onUpdate(e),u.onComplete()});return}}return s.isSync?new Di(u):new ka(u)};function Wa(e){let t=[{},{}];return e?.values.forEach((e,n)=>{t[0][n]=e.get(),t[1][n]=e.getVelocity()}),t}function Ga(e,t,n,r){if(typeof t==`function`){let[i,a]=Wa(r);t=t(n===void 0?e.custom:n,i,a)}if(typeof t==`string`&&(t=e.variants&&e.variants[t]),typeof t==`function`){let[i,a]=Wa(r);t=t(n===void 0?e.custom:n,i,a)}return t}function Ka(e,t,n){let r=e.getProps();return Ga(r,t,n===void 0?r.custom:n,e)}var qa=new Set([`width`,`height`,`top`,`left`,`right`,`bottom`,...P]),Ja=30,Ya=e=>!isNaN(parseFloat(e)),Xa={current:void 0},Za=class{constructor(e,t={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=e=>{let t=Vn.now();if(this.updatedAt!==t&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(e),this.current!==this.prev&&(this.events.change?.notify(this.current),this.dependents))for(let e of this.dependents)e.dirty()},this.hasAnimated=!1,this.setCurrent(e),this.owner=t.owner}setCurrent(e){this.current=e,this.updatedAt=Vn.now(),this.canTrackVelocity===null&&e!==void 0&&(this.canTrackVelocity=Ya(this.current))}setPrevFrameValue(e=this.current){this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt}onChange(e){return this.on(`change`,e)}on(e,t){this.events[e]||(this.events[e]=new an);let n=this.events[e].add(t);return e===`change`?()=>{n(),k.read(()=>{this.events.change.getSize()||this.stop()})}:n}clearListeners(){for(let e in this.events)this.events[e].clear()}attach(e,t){this.passiveEffect=e,this.stopPassiveEffect=t}set(e){this.passiveEffect?this.passiveEffect(e,this.updateAndNotify):this.updateAndNotify(e)}setWithVelocity(e,t,n){this.set(t),this.prev=void 0,this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt-n}jump(e,t=!0){this.updateAndNotify(e),this.prev=e,this.prevUpdatedAt=this.prevFrameValue=void 0,t&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){this.events.change?.notify(this.current)}addDependent(e){this.dependents||=new Set,this.dependents.add(e)}removeDependent(e){this.dependents&&this.dependents.delete(e)}get(){return Xa.current&&Xa.current.push(this),this.current}getPrevious(){return this.prev}getVelocity(){let e=Vn.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||e-this.updatedAt>Ja)return 0;let t=Math.min(this.updatedAt-this.prevUpdatedAt,Ja);return cn(parseFloat(this.current)-parseFloat(this.prevFrameValue),t)}start(e){return this.stop(),new Promise(t=>{this.hasAnimated=!0,this.animation=e(t),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.dependents?.clear(),this.events.destroy?.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}};function Qa(e,t){return new Za(e,t)}var $a=e=>Array.isArray(e);function eo(e,t,n){e.hasValue(t)?e.getValue(t).set(n):e.addValue(t,Qa(n))}function to(e){return $a(e)?e[e.length-1]||0:e}function no(e,t){let{transitionEnd:n={},transition:r={},...i}=Ka(e,t)||{};i={...i,...n};for(let t in i)eo(e,t,to(i[t]))}var ro=e=>!!(e&&e.getVelocity);function io(e){return!!(ro(e)&&e.add)}function ao(e,t){let n=e.getValue(`willChange`);if(io(n))return n.add(t);if(!n&&Yt.WillChange){let n=new Yt.WillChange(`auto`);e.addValue(`willChange`,n),n.add(t)}}function oo(e){return e.replace(/([A-Z])/g,e=>`-${e.toLowerCase()}`)}var so=`data-`+oo(`framerAppearId`);function co(e){return e.props[so]}function lo({protectedKeys:e,needsAnimating:t},n){let r=e.hasOwnProperty(n)&&t[n]!==!0;return t[n]=!1,r}function uo(e,t,{delay:n=0,transitionOverride:r,type:i}={}){let{transition:a,transitionEnd:o,...s}=t,c=e.getDefaultTransition();a=a?za(a,c):c;let l=a?.reduceMotion;r&&(a=r);let u=[],d=i&&e.animationState&&e.animationState.getState()[i];for(let t in s){let r=e.getValue(t,e.latestValues[t]??null),i=s[t];if(i===void 0||d&&lo(d,t))continue;let o={delay:n,...Ba(a||{},t)},c=r.get();if(c!==void 0&&!r.isAnimating()&&!Array.isArray(i)&&i===c&&!o.velocity){k.update(()=>r.set(i));continue}let f=!1;if(window.MotionHandoffAnimation){let n=co(e);if(n){let e=window.MotionHandoffAnimation(n,t,k);e!==null&&(o.startTime=e,f=!0)}}ao(e,t);let p=l??e.shouldReduceMotion;r.start(Ua(t,r,i,p&&qa.has(t)?{type:!1}:o,e,f));let m=r.animation;m&&u.push(m)}if(o){let t=()=>k.update(()=>{o&&no(e,o)});u.length?Promise.all(u).then(t):t()}return u}function fo(e,t,n={}){let r=Ka(e,t,n.type===`exit`?e.presenceContext?.custom:void 0),{transition:i=e.getDefaultTransition()||{}}=r||{};n.transitionOverride&&(i=n.transitionOverride);let a=r?()=>Promise.all(uo(e,r,n)):()=>Promise.resolve(),o=e.variantChildren&&e.variantChildren.size?(r=0)=>{let{delayChildren:a=0,staggerChildren:o,staggerDirection:s}=i;return po(e,t,r,a,o,s,n)}:()=>Promise.resolve(),{when:s}=i;if(s){let[e,t]=s===`beforeChildren`?[a,o]:[o,a];return e().then(()=>t())}else return Promise.all([a(),o(n.delay)])}function po(e,t,n=0,r=0,i=0,a=1,o){let s=[];for(let c of e.variantChildren)c.notify(`AnimationStart`,t),s.push(fo(c,t,{...o,delay:n+(typeof r==`function`?0:r)+Aa(e.variantChildren,c,r,i,a)}).then(()=>c.notify(`AnimationComplete`,t)));return Promise.all(s)}function mo(e,t,n={}){e.notify(`AnimationStart`,t);let r;if(Array.isArray(t)){let i=t.map(t=>fo(e,t,n));r=Promise.all(i)}else if(typeof t==`string`)r=fo(e,t,n);else{let i=typeof t==`function`?Ka(e,t,n.custom):t;r=Promise.all(uo(e,i,n))}return r.then(()=>{e.notify(`AnimationComplete`,t)})}var ho={test:e=>e===`auto`,parse:e=>e},go=e=>t=>t.test(e),_o=[Yn,A,dr,ur,pr,fr,ho],vo=e=>_o.find(go(e));function F(e){return typeof e==`number`?e===0:e===null?!0:e===`none`||e===`0`||Qt(e)}var I=new Set([`brightness`,`contrast`,`saturate`,`opacity`]);function yo(e){let[t,n]=e.slice(0,-1).split(`(`);if(t===`drop-shadow`)return e;let[r]=n.match($n)||[];if(!r)return e;let i=n.replace(r,``),a=+!!I.has(t);return r!==n&&(a*=100),t+`(`+a+i+`)`}var bo=/\b([a-z-]*)\(.*?\)/gu,xo={...Mr,getAnimatableNone:e=>{let t=e.match(bo);return t?t.map(yo).join(` `):e}},So={...Mr,getAnimatableNone:e=>{let t=Mr.parse(e);return Mr.createTransformer(e)(t.map(e=>typeof e==`number`?0:typeof e==`object`?{...e,alpha:1}:e))}},Co={...Yn,transform:Math.round},wo={borderWidth:A,borderTopWidth:A,borderRightWidth:A,borderBottomWidth:A,borderLeftWidth:A,borderRadius:A,borderTopLeftRadius:A,borderTopRightRadius:A,borderBottomRightRadius:A,borderBottomLeftRadius:A,width:A,maxWidth:A,height:A,maxHeight:A,top:A,right:A,bottom:A,left:A,inset:A,insetBlock:A,insetBlockStart:A,insetBlockEnd:A,insetInline:A,insetInlineStart:A,insetInlineEnd:A,padding:A,paddingTop:A,paddingRight:A,paddingBottom:A,paddingLeft:A,paddingBlock:A,paddingBlockStart:A,paddingBlockEnd:A,paddingInline:A,paddingInlineStart:A,paddingInlineEnd:A,margin:A,marginTop:A,marginRight:A,marginBottom:A,marginLeft:A,marginBlock:A,marginBlockStart:A,marginBlockEnd:A,marginInline:A,marginInlineStart:A,marginInlineEnd:A,fontSize:A,backgroundPositionX:A,backgroundPositionY:A,rotate:ur,rotateX:ur,rotateY:ur,rotateZ:ur,scale:Zn,scaleX:Zn,scaleY:Zn,scaleZ:Zn,skew:ur,skewX:ur,skewY:ur,distance:A,translateX:A,translateY:A,translateZ:A,x:A,y:A,z:A,perspective:A,transformPerspective:A,opacity:Xn,originX:mr,originY:mr,originZ:A,zIndex:Co,fillOpacity:Xn,strokeOpacity:Xn,numOctaves:Co},To={...wo,color:gr,backgroundColor:gr,outlineColor:gr,fill:gr,stroke:gr,borderColor:gr,borderTopColor:gr,borderRightColor:gr,borderBottomColor:gr,borderLeftColor:gr,filter:xo,WebkitFilter:xo,mask:So,WebkitMask:So},Eo=e=>To[e],Do=new Set([xo,So]);function Oo(e,t){let n=Eo(e);return Do.has(n)||(n=Mr),n.getAnimatableNone?n.getAnimatableNone(t):void 0}var ko=new Set([`auto`,`none`,`0`]);function Ao(e,t,n){let r=0,i;for(;r<e.length&&!i;){let t=e[r];typeof t==`string`&&!ko.has(t)&&Tr(t).values.length&&(i=e[r]),r++}if(i&&n)for(let r of t)e[r]=Oo(n,i)}var jo=class extends $i{constructor(e,t,n,r,i){super(e,t,n,r,i,!0)}readKeyframes(){let{unresolvedKeyframes:e,element:t,name:n}=this;if(!t||!t.current)return;super.readKeyframes();for(let n=0;n<e.length;n++){let r=e[n];if(typeof r==`string`&&(r=r.trim(),Kn(r))){let i=Na(r,t.current);i!==void 0&&(e[n]=i),n===e.length-1&&(this.finalKeyframe=r)}}if(this.resolveNoneKeyframes(),!qa.has(n)||e.length!==2)return;let[r,i]=e,a=vo(r),o=vo(i);if(Jn(r)!==Jn(i)&&Gi[n]){this.needsMeasurement=!0;return}if(a!==o)if(Vi(a)&&Vi(o))for(let t=0;t<e.length;t++){let n=e[t];typeof n==`string`&&(e[t]=parseFloat(n))}else Gi[n]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){let{unresolvedKeyframes:e,name:t}=this,n=[];for(let t=0;t<e.length;t++)(e[t]===null||F(e[t]))&&n.push(t);n.length&&Ao(e,n,t)}measureInitialState(){let{element:e,unresolvedKeyframes:t,name:n}=this;if(!e||!e.current)return;n===`height`&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=Gi[n](e.measureViewportBox(),window.getComputedStyle(e.current)),t[0]=this.measuredOrigin;let r=t[t.length-1];r!==void 0&&e.getValue(n,r).jump(r,!1)}measureEndState(){let{element:e,name:t,unresolvedKeyframes:n}=this;if(!e||!e.current)return;let r=e.getValue(t);r&&r.jump(this.measuredOrigin,!1);let i=n.length-1,a=n[i];n[i]=Gi[t](e.measureViewportBox(),window.getComputedStyle(e.current)),a!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=a),this.removedTransforms?.length&&this.removedTransforms.forEach(([t,n])=>{e.getValue(t).set(n)}),this.resolveNoneKeyframes()}};function Mo(e,t,n){if(e==null)return[];if(e instanceof EventTarget)return[e];if(typeof e==`string`){let r=document;t&&(r=t.current);let i=n?.[e]??r.querySelectorAll(e);return i?Array.from(i):[]}return Array.from(e).filter(e=>e!=null)}var No=(e,t)=>t&&typeof e==`number`?t.transform(e):e;function Po(e){return Zt(e)&&`offsetHeight`in e&&!(`ownerSVGElement`in e)}var{schedule:Fo,cancel:Io}=Fn(queueMicrotask,!1),L={x:!1,y:!1};function Lo(){return L.x||L.y}function Ro(e){return e===`x`||e===`y`?L[e]?null:(L[e]=!0,()=>{L[e]=!1}):L.x||L.y?null:(L.x=L.y=!0,()=>{L.x=L.y=!1})}function zo(e,t){let n=Mo(e),r=new AbortController;return[n,{passive:!0,...t,signal:r.signal},()=>r.abort()]}function Bo(e){return!(e.pointerType===`touch`||Lo())}function Vo(e,t,n={}){let[r,i,a]=zo(e,n);return r.forEach(e=>{let n=!1,r=!1,a,o=()=>{e.removeEventListener(`pointerleave`,u)},s=e=>{a&&=(a(e),void 0),o()},c=e=>{n=!1,window.removeEventListener(`pointerup`,c),window.removeEventListener(`pointercancel`,c),r&&(r=!1,s(e))},l=()=>{n=!0,window.addEventListener(`pointerup`,c,i),window.addEventListener(`pointercancel`,c,i)},u=e=>{if(e.pointerType!==`touch`){if(n){r=!0;return}s(e)}};e.addEventListener(`pointerenter`,n=>{if(!Bo(n))return;r=!1;let o=t(e,n);typeof o==`function`&&(a=o,e.addEventListener(`pointerleave`,u,i))},i),e.addEventListener(`pointerdown`,l,i)}),a}var Ho=(e,t)=>t?e===t?!0:Ho(e,t.parentElement):!1,Uo=e=>e.pointerType===`mouse`?typeof e.button!=`number`||e.button<=0:e.isPrimary!==!1,Wo=new Set([`BUTTON`,`INPUT`,`SELECT`,`TEXTAREA`,`A`]);function Go(e){return Wo.has(e.tagName)||e.isContentEditable===!0}var Ko=new Set([`INPUT`,`SELECT`,`TEXTAREA`]);function qo(e){return Ko.has(e.tagName)||e.isContentEditable===!0}var Jo=new WeakSet;function Yo(e){return t=>{t.key===`Enter`&&e(t)}}function Xo(e,t){e.dispatchEvent(new PointerEvent(`pointer`+t,{isPrimary:!0,bubbles:!0}))}var Zo=(e,t)=>{let n=e.currentTarget;if(!n)return;let r=Yo(()=>{if(Jo.has(n))return;Xo(n,`down`);let e=Yo(()=>{Xo(n,`up`)});n.addEventListener(`keyup`,e,t),n.addEventListener(`blur`,()=>Xo(n,`cancel`),t)});n.addEventListener(`keydown`,r,t),n.addEventListener(`blur`,()=>n.removeEventListener(`keydown`,r),t)};function Qo(e){return Uo(e)&&!Lo()}var $o=new WeakSet;function es(e,t,n={}){let[r,i,a]=zo(e,n),o=e=>{let r=e.currentTarget;if(!Qo(e)||$o.has(e))return;Jo.add(r),n.stopPropagation&&$o.add(e);let a=t(r,e),o=(e,t)=>{window.removeEventListener(`pointerup`,s),window.removeEventListener(`pointercancel`,c),Jo.has(r)&&Jo.delete(r),Qo(e)&&typeof a==`function`&&a(e,{success:t})},s=e=>{o(e,r===window||r===document||n.useGlobalTarget||Ho(r,e.target))},c=e=>{o(e,!1)};window.addEventListener(`pointerup`,s,i),window.addEventListener(`pointercancel`,c,i)};return r.forEach(e=>{(n.useGlobalTarget?window:e).addEventListener(`pointerdown`,o,i),Po(e)&&(e.addEventListener(`focus`,e=>Zo(e,i)),!Go(e)&&!e.hasAttribute(`tabindex`)&&(e.tabIndex=0))}),a}function ts(e){return Zt(e)&&`ownerSVGElement`in e}var ns=new WeakMap,rs,is=(e,t,n)=>(r,i)=>i&&i[0]?i[0][e+`Size`]:ts(r)&&`getBBox`in r?r.getBBox()[t]:r[n],as=is(`inline`,`width`,`offsetWidth`),os=is(`block`,`height`,`offsetHeight`);function ss({target:e,borderBoxSize:t}){ns.get(e)?.forEach(n=>{n(e,{get width(){return as(e,t)},get height(){return os(e,t)}})})}function cs(e){e.forEach(ss)}function ls(){typeof ResizeObserver>`u`||(rs=new ResizeObserver(cs))}function us(e,t){rs||ls();let n=Mo(e);return n.forEach(e=>{let n=ns.get(e);n||(n=new Set,ns.set(e,n)),n.add(t),rs?.observe(e)}),()=>{n.forEach(e=>{let n=ns.get(e);n?.delete(t),n?.size||rs?.unobserve(e)})}}var ds=new Set,fs;function ps(){fs=()=>{let e={get width(){return window.innerWidth},get height(){return window.innerHeight}};ds.forEach(t=>t(e))},window.addEventListener(`resize`,fs)}function ms(e){return ds.add(e),fs||ps(),()=>{ds.delete(e),!ds.size&&typeof fs==`function`&&(window.removeEventListener(`resize`,fs),fs=void 0)}}function hs(e,t){return typeof e==`function`?ms(e):us(e,t)}function gs(e){return ts(e)&&e.tagName===`svg`}var _s=[..._o,gr,Mr],vs=e=>_s.find(go(e)),ys=()=>({translate:0,scale:1,origin:0,originPoint:0}),bs=()=>({x:ys(),y:ys()}),xs=()=>({min:0,max:0}),Ss=()=>({x:xs(),y:xs()}),Cs=new WeakMap;function ws(e){return typeof e==`object`&&!!e&&typeof e.start==`function`}function Ts(e){return typeof e==`string`||Array.isArray(e)}var Es=[`animate`,`whileInView`,`whileFocus`,`whileHover`,`whileTap`,`whileDrag`,`exit`],Ds=[`initial`,...Es];function Os(e){return ws(e.animate)||Ds.some(t=>Ts(e[t]))}function ks(e){return!!(Os(e)||e.variants)}function As(e,t,n){for(let r in t){let i=t[r],a=n[r];if(ro(i))e.addValue(r,i);else if(ro(a))e.addValue(r,Qa(i,{owner:e}));else if(a!==i)if(e.hasValue(r)){let t=e.getValue(r);t.liveStyle===!0?t.jump(i):t.hasAnimated||t.set(i)}else{let t=e.getStaticValue(r);e.addValue(r,Qa(t===void 0?i:t,{owner:e}))}}for(let r in n)t[r]===void 0&&e.removeValue(r);return t}var js={current:null},Ms={current:!1},Ns=typeof window<`u`;function Ps(){if(Ms.current=!0,Ns)if(window.matchMedia){let e=window.matchMedia(`(prefers-reduced-motion)`),t=()=>js.current=e.matches;e.addEventListener(`change`,t),t()}else js.current=!1}var Fs=[`AnimationStart`,`AnimationComplete`,`Update`,`BeforeLayoutMeasure`,`LayoutMeasure`,`LayoutAnimationStart`,`LayoutAnimationComplete`],Is={};function Ls(e){Is=e}function Rs(){return Is}var zs=class{scrapeMotionValuesFromProps(e,t,n){return{}}constructor({parent:e,props:t,presenceContext:n,reducedMotionConfig:r,skipAnimations:i,blockInitialAnimation:a,visualState:o},s={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.shouldSkipAnimations=!1,this.values=new Map,this.KeyframeResolver=$i,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.hasBeenMounted=!1,this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify(`Update`,this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{let e=Vn.now();this.renderScheduledAt<e&&(this.renderScheduledAt=e,k.render(this.render,!1,!0))};let{latestValues:c,renderState:l}=o;this.latestValues=c,this.baseTarget={...c},this.initialValues=t.initial?{...c}:{},this.renderState=l,this.parent=e,this.props=t,this.presenceContext=n,this.depth=e?e.depth+1:0,this.reducedMotionConfig=r,this.skipAnimationsConfig=i,this.options=s,this.blockInitialAnimation=!!a,this.isControllingVariants=Os(t),this.isVariantNode=ks(t),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(e&&e.current);let{willChange:u,...d}=this.scrapeMotionValuesFromProps(t,{},this);for(let e in d){let t=d[e];c[e]!==void 0&&ro(t)&&t.set(c[e])}}mount(e){if(this.hasBeenMounted)for(let e in this.initialValues)this.values.get(e)?.jump(this.initialValues[e]),this.latestValues[e]=this.initialValues[e];this.current=e,Cs.set(e,this),this.projection&&!this.projection.instance&&this.projection.mount(e),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((e,t)=>this.bindToMotionValue(t,e)),this.reducedMotionConfig===`never`?this.shouldReduceMotion=!1:this.reducedMotionConfig===`always`?this.shouldReduceMotion=!0:(Ms.current||Ps(),this.shouldReduceMotion=js.current),this.shouldSkipAnimations=this.skipAnimationsConfig??!1,this.parent?.addChild(this),this.update(this.props,this.presenceContext),this.hasBeenMounted=!0}unmount(){this.projection&&this.projection.unmount(),In(this.notifyUpdate),In(this.render),this.valueSubscriptions.forEach(e=>e()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent?.removeChild(this);for(let e in this.events)this.events[e].clear();for(let e in this.features){let t=this.features[e];t&&(t.unmount(),t.isMounted=!1)}this.current=null}addChild(e){this.children.add(e),this.enteringChildren??=new Set,this.enteringChildren.add(e)}removeChild(e){this.children.delete(e),this.enteringChildren&&this.enteringChildren.delete(e)}bindToMotionValue(e,t){if(this.valueSubscriptions.has(e)&&this.valueSubscriptions.get(e)(),t.accelerate&&Sa.has(e)&&this.current instanceof HTMLElement){let{factory:n,keyframes:r,times:i,ease:a,duration:o}=t.accelerate,s=new fa({element:this.current,name:e,keyframes:r,times:i,ease:a,duration:on(o)}),c=n(s);this.valueSubscriptions.set(e,()=>{c(),s.cancel()});return}let n=Bi.has(e);n&&this.onBindTransform&&this.onBindTransform();let r=t.on(`change`,t=>{this.latestValues[e]=t,this.props.onUpdate&&k.preRender(this.notifyUpdate),n&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()}),i;typeof window<`u`&&window.MotionCheckAppearSync&&(i=window.MotionCheckAppearSync(this,e,t)),this.valueSubscriptions.set(e,()=>{r(),i&&i(),t.owner&&t.stop()})}sortNodePosition(e){return!this.current||!this.sortInstanceNodePosition||this.type!==e.type?0:this.sortInstanceNodePosition(this.current,e.current)}updateFeatures(){let e=`animation`;for(e in Is){let t=Is[e];if(!t)continue;let{isEnabled:n,Feature:r}=t;if(!this.features[e]&&r&&n(this.props)&&(this.features[e]=new r(this)),this.features[e]){let t=this.features[e];t.isMounted?t.update():(t.mount(),t.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):Ss()}getStaticValue(e){return this.latestValues[e]}setStaticValue(e,t){this.latestValues[e]=t}update(e,t){(e.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=e,this.prevPresenceContext=this.presenceContext,this.presenceContext=t;for(let t=0;t<Fs.length;t++){let n=Fs[t];this.propEventSubscriptions[n]&&(this.propEventSubscriptions[n](),delete this.propEventSubscriptions[n]);let r=e[`on`+n];r&&(this.propEventSubscriptions[n]=this.on(n,r))}this.prevMotionValues=As(this,this.scrapeMotionValuesFromProps(e,this.prevProps||{},this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(e){return this.props.variants?this.props.variants[e]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(e){let t=this.getClosestVariantNode();if(t)return t.variantChildren&&t.variantChildren.add(e),()=>t.variantChildren.delete(e)}addValue(e,t){let n=this.values.get(e);t!==n&&(n&&this.removeValue(e),this.bindToMotionValue(e,t),this.values.set(e,t),this.latestValues[e]=t.get())}removeValue(e){this.values.delete(e);let t=this.valueSubscriptions.get(e);t&&(t(),this.valueSubscriptions.delete(e)),delete this.latestValues[e],this.removeValueFromRenderState(e,this.renderState)}hasValue(e){return this.values.has(e)}getValue(e,t){if(this.props.values&&this.props.values[e])return this.props.values[e];let n=this.values.get(e);return n===void 0&&t!==void 0&&(n=Qa(t===null?void 0:t,{owner:this}),this.addValue(e,n)),n}readValue(e,t){let n=this.latestValues[e]!==void 0||!this.current?this.latestValues[e]:this.getBaseTargetFromProps(this.props,e)??this.readValueFromInstance(this.current,e,this.options);return n!=null&&(typeof n==`string`&&(Xt(n)||Qt(n))?n=parseFloat(n):!vs(n)&&Mr.test(t)&&(n=Oo(e,t)),this.setBaseTarget(e,ro(n)?n.get():n)),ro(n)?n.get():n}setBaseTarget(e,t){this.baseTarget[e]=t}getBaseTarget(e){let{initial:t}=this.props,n;if(typeof t==`string`||typeof t==`object`){let r=Ga(this.props,t,this.presenceContext?.custom);r&&(n=r[e])}if(t&&n!==void 0)return n;let r=this.getBaseTargetFromProps(this.props,e);return r!==void 0&&!ro(r)?r:this.initialValues[e]!==void 0&&n===void 0?void 0:this.baseTarget[e]}on(e,t){return this.events[e]||(this.events[e]=new an),this.events[e].add(t)}notify(e,...t){this.events[e]&&this.events[e].notify(...t)}scheduleRenderMicrotask(){Fo.render(this.render)}},Bs=class extends zs{constructor(){super(...arguments),this.KeyframeResolver=jo}sortInstanceNodePosition(e,t){return e.compareDocumentPosition(t)&2?1:-1}getBaseTargetFromProps(e,t){let n=e.style;return n?n[t]:void 0}removeValueFromRenderState(e,{vars:t,style:n}){delete t[e],delete n[e]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);let{children:e}=this.props;ro(e)&&(this.childSubscription=e.on(`change`,e=>{this.current&&(this.current.textContent=`${e}`)}))}},Vs=class{constructor(e){this.isMounted=!1,this.node=e}update(){}};function Hs({top:e,left:t,right:n,bottom:r}){return{x:{min:t,max:n},y:{min:e,max:r}}}function Us({x:e,y:t}){return{top:t.min,right:e.max,bottom:t.max,left:e.min}}function Ws(e,t){if(!t)return e;let n=t({x:e.left,y:e.top}),r=t({x:e.right,y:e.bottom});return{top:n.y,left:n.x,bottom:r.y,right:r.x}}function Gs(e){return e===void 0||e===1}function Ks({scale:e,scaleX:t,scaleY:n}){return!Gs(e)||!Gs(t)||!Gs(n)}function qs(e){return Ks(e)||Js(e)||e.z||e.rotate||e.rotateX||e.rotateY||e.skewX||e.skewY}function Js(e){return Ys(e.x)||Ys(e.y)}function Ys(e){return e&&e!==`0%`}function Xs(e,t,n){return n+t*(e-n)}function Zs(e,t,n,r,i){return i!==void 0&&(e=Xs(e,i,r)),Xs(e,n,r)+t}function Qs(e,t=0,n=1,r,i){e.min=Zs(e.min,t,n,r,i),e.max=Zs(e.max,t,n,r,i)}function $s(e,{x:t,y:n}){Qs(e.x,t.translate,t.scale,t.originPoint),Qs(e.y,n.translate,n.scale,n.originPoint)}var ec=.999999999999,tc=1.0000000000001;function nc(e,t,n,r=!1){let i=n.length;if(!i)return;t.x=t.y=1;let a,o;for(let s=0;s<i;s++){a=n[s],o=a.projectionDelta;let{visualElement:i}=a.options;i&&i.props.style&&i.props.style.display===`contents`||(r&&a.options.layoutScroll&&a.scroll&&a!==a.root&&(rc(e.x,-a.scroll.offset.x),rc(e.y,-a.scroll.offset.y)),o&&(t.x*=o.x.scale,t.y*=o.y.scale,$s(e,o)),r&&qs(a.latestValues)&&oc(e,a.latestValues,a.layout?.layoutBox))}t.x<tc&&t.x>ec&&(t.x=1),t.y<tc&&t.y>ec&&(t.y=1)}function rc(e,t){e.min+=t,e.max+=t}function ic(e,t,n,r,i=.5){Qs(e,t,n,j(e.min,e.max,i),r)}function ac(e,t){return typeof e==`string`?parseFloat(e)/100*(t.max-t.min):e}function oc(e,t,n){let r=n??e;ic(e.x,ac(t.x,r.x),t.scaleX,t.scale,t.originX),ic(e.y,ac(t.y,r.y),t.scaleY,t.scale,t.originY)}function sc(e,t){return Hs(Ws(e.getBoundingClientRect(),t))}function cc(e,t,n){let r=sc(e,n),{scroll:i}=t;return i&&(rc(r.x,i.offset.x),rc(r.y,i.offset.y)),r}var lc={x:`translateX`,y:`translateY`,z:`translateZ`,transformPerspective:`perspective`},uc=P.length;function dc(e,t,n){let r=``,i=!0;for(let a=0;a<uc;a++){let o=P[a],s=e[o];if(s===void 0)continue;let c=!0;if(typeof s==`number`)c=s===+!!o.startsWith(`scale`);else{let e=parseFloat(s);c=o.startsWith(`scale`)?e===1:e===0}if(!c||n){let e=No(s,wo[o]);if(!c){i=!1;let t=lc[o]||o;r+=`${t}(${e}) `}n&&(t[o]=e)}}return r=r.trim(),n?r=n(t,i?``:r):i&&(r=`none`),r}function fc(e,t,n){let{style:r,vars:i,transformOrigin:a}=e,o=!1,s=!1;for(let e in t){let n=t[e];if(Bi.has(e)){o=!0;continue}else if(Wn(e)){i[e]=n;continue}else{let t=No(n,wo[e]);e.startsWith(`origin`)?(s=!0,a[e]=t):r[e]=t}}if(t.transform||(o||n?r.transform=dc(t,e.transform,n):r.transform&&=`none`),s){let{originX:e=`50%`,originY:t=`50%`,originZ:n=0}=a;r.transformOrigin=`${e} ${t} ${n}`}}function pc(e,{style:t,vars:n},r,i){let a=e.style,o;for(o in t)a[o]=t[o];for(o in i?.applyProjectionStyles(a,r),n)a.setProperty(o,n[o])}function mc(e,t){return t.max===t.min?0:e/(t.max-t.min)*100}var hc={correct:(e,t)=>{if(!t.target)return e;if(typeof e==`string`)if(A.test(e))e=parseFloat(e);else return e;return`${mc(e,t.target.x)}% ${mc(e,t.target.y)}%`}},gc={correct:(e,{treeScale:t,projectionDelta:n})=>{let r=e,i=Mr.parse(e);if(i.length>5)return r;let a=Mr.createTransformer(e),o=typeof i[0]==`number`?0:1,s=n.x.scale*t.x,c=n.y.scale*t.y;i[0+o]/=s,i[1+o]/=c;let l=j(s,c,.5);return typeof i[2+o]==`number`&&(i[2+o]/=l),typeof i[3+o]==`number`&&(i[3+o]/=l),a(i)}},_c={borderRadius:{...hc,applyTo:[`borderTopLeftRadius`,`borderTopRightRadius`,`borderBottomLeftRadius`,`borderBottomRightRadius`]},borderTopLeftRadius:hc,borderTopRightRadius:hc,borderBottomLeftRadius:hc,borderBottomRightRadius:hc,boxShadow:gc};function vc(e,{layout:t,layoutId:n}){return Bi.has(e)||e.startsWith(`origin`)||(t||n!==void 0)&&(!!_c[e]||e===`opacity`)}function yc(e,t,n){let r=e.style,i=t?.style,a={};if(!r)return a;for(let t in r)(ro(r[t])||i&&ro(i[t])||vc(t,e)||n?.getValue(t)?.liveStyle!==void 0)&&(a[t]=r[t]);return a}function bc(e){return window.getComputedStyle(e)}var xc=class extends Bs{constructor(){super(...arguments),this.type=`html`,this.renderInstance=pc}readValueFromInstance(e,t){if(Bi.has(t))return this.projection?.isProjecting?Li(t):zi(e,t);{let n=bc(e),r=(Wn(t)?n.getPropertyValue(t):n[t])||0;return typeof r==`string`?r.trim():r}}measureInstanceViewportBox(e,{transformPagePoint:t}){return sc(e,t)}build(e,t,n){fc(e,t,n.transformTemplate)}scrapeMotionValuesFromProps(e,t,n){return yc(e,t,n)}},Sc={offset:`stroke-dashoffset`,array:`stroke-dasharray`},Cc={offset:`strokeDashoffset`,array:`strokeDasharray`};function wc(e,t,n=1,r=0,i=!0){e.pathLength=1;let a=i?Sc:Cc;e[a.offset]=`${-r}`,e[a.array]=`${t} ${n}`}var Tc=[`offsetDistance`,`offsetPath`,`offsetRotate`,`offsetAnchor`];function Ec(e,{attrX:t,attrY:n,attrScale:r,pathLength:i,pathSpacing:a=1,pathOffset:o=0,...s},c,l,u){if(fc(e,s,l),c){e.style.viewBox&&(e.attrs.viewBox=e.style.viewBox);return}e.attrs=e.style,e.style={};let{attrs:d,style:f}=e;d.transform&&(f.transform=d.transform,delete d.transform),(f.transform||d.transformOrigin)&&(f.transformOrigin=d.transformOrigin??`50% 50%`,delete d.transformOrigin),f.transform&&(f.transformBox=u?.transformBox??`fill-box`,delete d.transformBox);for(let e of Tc)d[e]!==void 0&&(f[e]=d[e],delete d[e]);t!==void 0&&(d.x=t),n!==void 0&&(d.y=n),r!==void 0&&(d.scale=r),i!==void 0&&wc(d,i,a,o,!1)}var Dc=new Set([`baseFrequency`,`diffuseConstant`,`kernelMatrix`,`kernelUnitLength`,`keySplines`,`keyTimes`,`limitingConeAngle`,`markerHeight`,`markerWidth`,`numOctaves`,`targetX`,`targetY`,`surfaceScale`,`specularConstant`,`specularExponent`,`stdDeviation`,`tableValues`,`viewBox`,`gradientTransform`,`pathLength`,`startOffset`,`textLength`,`lengthAdjust`]),Oc=e=>typeof e==`string`&&e.toLowerCase()===`svg`;function kc(e,t,n,r){pc(e,t,void 0,r);for(let n in t.attrs)e.setAttribute(Dc.has(n)?n:oo(n),t.attrs[n])}function Ac(e,t,n){let r=yc(e,t,n);for(let n in e)if(ro(e[n])||ro(t[n])){let t=P.indexOf(n)===-1?n:`attr`+n.charAt(0).toUpperCase()+n.substring(1);r[t]=e[n]}return r}var jc=class extends Bs{constructor(){super(...arguments),this.type=`svg`,this.isSVGTag=!1,this.measureInstanceViewportBox=Ss}getBaseTargetFromProps(e,t){return e[t]}readValueFromInstance(e,t){if(Bi.has(t)){let e=Eo(t);return e&&e.default||0}return t=Dc.has(t)?t:oo(t),e.getAttribute(t)}scrapeMotionValuesFromProps(e,t,n){return Ac(e,t,n)}build(e,t,n){Ec(e,t,this.isSVGTag,n.transformTemplate,n.style)}renderInstance(e,t,n,r){kc(e,t,n,r)}mount(e){this.isSVGTag=Oc(e.tagName),super.mount(e)}},Mc=Ds.length;function Nc(e){if(!e)return;if(!e.isControllingVariants){let t=e.parent&&Nc(e.parent)||{};return e.props.initial!==void 0&&(t.initial=e.props.initial),t}let t={};for(let n=0;n<Mc;n++){let r=Ds[n],i=e.props[r];(Ts(i)||i===!1)&&(t[r]=i)}return t}function Pc(e,t){if(!Array.isArray(t))return!1;let n=t.length;if(n!==e.length)return!1;for(let r=0;r<n;r++)if(t[r]!==e[r])return!1;return!0}var Fc=[...Es].reverse(),Ic=Es.length;function Lc(e){return t=>Promise.all(t.map(({animation:t,options:n})=>mo(e,t,n)))}function Rc(e){let t=Lc(e),n=Vc(),r=!0,i=!1,a=t=>(n,r)=>{let i=Ka(e,r,t===`exit`?e.presenceContext?.custom:void 0);if(i){let{transition:e,transitionEnd:t,...r}=i;n={...n,...r,...t}}return n};function o(n){t=n(e)}function s(o){let{props:s}=e,c=Nc(e.parent)||{},l=[],u=new Set,d={},f=1/0;for(let t=0;t<Ic;t++){let p=Fc[t],m=n[p],h=s[p]===void 0?c[p]:s[p],g=Ts(h),_=p===o?m.isActive:null;_===!1&&(f=t);let v=h===c[p]&&h!==s[p]&&g;if(v&&(r||i)&&e.manuallyAnimateOnMount&&(v=!1),m.protectedKeys={...d},!m.isActive&&_===null||!h&&!m.prevProp||ws(h)||typeof h==`boolean`)continue;if(p===`exit`&&m.isActive&&_!==!0){m.prevResolvedValues&&(d={...d,...m.prevResolvedValues});continue}let y=zc(m.prevProp,h),b=y||p===o&&m.isActive&&!v&&g||t>f&&g,x=!1,S=Array.isArray(h)?h:[h],C=S.reduce(a(p),{});_===!1&&(C={});let{prevResolvedValues:w={}}=m,ee={...w,...C},te=t=>{b=!0,u.has(t)&&(x=!0,u.delete(t)),m.needsAnimating[t]=!0;let n=e.getValue(t);n&&(n.liveStyle=!1)};for(let e in ee){let t=C[e],n=w[e];if(d.hasOwnProperty(e))continue;let r=!1;r=$a(t)&&$a(n)?!Pc(t,n):t!==n,r?t==null?u.add(e):te(e):t!==void 0&&u.has(e)?te(e):m.protectedKeys[e]=!0}m.prevProp=h,m.prevResolvedValues=C,m.isActive&&(d={...d,...C}),(r||i)&&e.blockInitialAnimation&&(b=!1);let T=v&&y;b&&(!T||x)&&l.push(...S.map(t=>{let n={type:p};if(typeof t==`string`&&(r||i)&&!T&&e.manuallyAnimateOnMount&&e.parent){let{parent:r}=e,i=Ka(r,t);if(r.enteringChildren&&i){let{delayChildren:t}=i.transition||{};n.delay=Aa(r.enteringChildren,e,t)}}return{animation:t,options:n}}))}if(u.size){let t={};if(typeof s.initial!=`boolean`){let n=Ka(e,Array.isArray(s.initial)?s.initial[0]:s.initial);n&&n.transition&&(t.transition=n.transition)}u.forEach(n=>{let r=e.getBaseTarget(n),i=e.getValue(n);i&&(i.liveStyle=!0),t[n]=r??null}),l.push({animation:t})}let p=!!l.length;return r&&(s.initial===!1||s.initial===s.animate)&&!e.manuallyAnimateOnMount&&(p=!1),r=!1,i=!1,p?t(l):Promise.resolve()}function c(t,r){if(n[t].isActive===r)return Promise.resolve();e.variantChildren?.forEach(e=>e.animationState?.setActive(t,r)),n[t].isActive=r;let i=s(t);for(let e in n)n[e].protectedKeys={};return i}return{animateChanges:s,setActive:c,setAnimateFunction:o,getState:()=>n,reset:()=>{n=Vc(),i=!0}}}function zc(e,t){return typeof t==`string`?t!==e:Array.isArray(t)?!Pc(t,e):!1}function Bc(e=!1){return{isActive:e,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function Vc(){return{animate:Bc(!0),whileInView:Bc(),whileHover:Bc(),whileTap:Bc(),whileDrag:Bc(),whileFocus:Bc(),exit:Bc()}}function Hc(e,t){e.min=t.min,e.max=t.max}function Uc(e,t){Hc(e.x,t.x),Hc(e.y,t.y)}function R(e,t){e.translate=t.translate,e.scale=t.scale,e.originPoint=t.originPoint,e.origin=t.origin}var Wc=1e-4,Gc=1-Wc,Kc=1+Wc,qc=.01,Jc=0-qc,Yc=0+qc;function Xc(e){return e.max-e.min}function Zc(e,t,n){return Math.abs(e-t)<=n}function Qc(e,t,n,r=.5){e.origin=r,e.originPoint=j(t.min,t.max,e.origin),e.scale=Xc(n)/Xc(t),e.translate=j(n.min,n.max,e.origin)-e.originPoint,(e.scale>=Gc&&e.scale<=Kc||isNaN(e.scale))&&(e.scale=1),(e.translate>=Jc&&e.translate<=Yc||isNaN(e.translate))&&(e.translate=0)}function $c(e,t,n,r){Qc(e.x,t.x,n.x,r?r.originX:void 0),Qc(e.y,t.y,n.y,r?r.originY:void 0)}function el(e,t,n,r=0){e.min=(r?j(n.min,n.max,r):n.min)+t.min,e.max=e.min+Xc(t)}function tl(e,t,n,r){el(e.x,t.x,n.x,r?.x),el(e.y,t.y,n.y,r?.y)}function nl(e,t,n,r=0){let i=r?j(n.min,n.max,r):n.min;e.min=t.min-i,e.max=e.min+Xc(t)}function rl(e,t,n,r){nl(e.x,t.x,n.x,r?.x),nl(e.y,t.y,n.y,r?.y)}function il(e,t,n,r,i){return e-=t,e=Xs(e,1/n,r),i!==void 0&&(e=Xs(e,1/i,r)),e}function al(e,t=0,n=1,r=.5,i,a=e,o=e){if(dr.test(t)&&(t=parseFloat(t),t=j(o.min,o.max,t/100)-o.min),typeof t!=`number`)return;let s=j(a.min,a.max,r);e===a&&(s-=t),e.min=il(e.min,t,n,s,i),e.max=il(e.max,t,n,s,i)}function ol(e,t,[n,r,i],a,o){al(e,t[n],t[r],t[i],t.scale,a,o)}var sl=[`x`,`scaleX`,`originX`],cl=[`y`,`scaleY`,`originY`];function ll(e,t,n,r){ol(e.x,t,sl,n?n.x:void 0,r?r.x:void 0),ol(e.y,t,cl,n?n.y:void 0,r?r.y:void 0)}function ul(e){return e.translate===0&&e.scale===1}function dl(e){return ul(e.x)&&ul(e.y)}function fl(e,t){return e.min===t.min&&e.max===t.max}function pl(e,t){return fl(e.x,t.x)&&fl(e.y,t.y)}function z(e,t){return Math.round(e.min)===Math.round(t.min)&&Math.round(e.max)===Math.round(t.max)}function ml(e,t){return z(e.x,t.x)&&z(e.y,t.y)}function hl(e){return Xc(e.x)/Xc(e.y)}function gl(e,t){return e.translate===t.translate&&e.scale===t.scale&&e.originPoint===t.originPoint}function _l(e){return[e(`x`),e(`y`)]}function vl(e,t,n){let r=``,i=e.x.translate/t.x,a=e.y.translate/t.y,o=n?.z||0;if((i||a||o)&&(r=`translate3d(${i}px, ${a}px, ${o}px) `),(t.x!==1||t.y!==1)&&(r+=`scale(${1/t.x}, ${1/t.y}) `),n){let{transformPerspective:e,rotate:t,rotateX:i,rotateY:a,skewX:o,skewY:s}=n;e&&(r=`perspective(${e}px) ${r}`),t&&(r+=`rotate(${t}deg) `),i&&(r+=`rotateX(${i}deg) `),a&&(r+=`rotateY(${a}deg) `),o&&(r+=`skewX(${o}deg) `),s&&(r+=`skewY(${s}deg) `)}let s=e.x.scale*t.x,c=e.y.scale*t.y;return(s!==1||c!==1)&&(r+=`scale(${s}, ${c})`),r||`none`}var yl=[`borderTopLeftRadius`,`borderTopRightRadius`,`borderBottomLeftRadius`,`borderBottomRightRadius`],bl=yl.length,xl=e=>typeof e==`string`?parseFloat(e):e,Sl=e=>typeof e==`number`||A.test(e);function Cl(e,t,n,r,i,a){i?(e.opacity=j(0,n.opacity??1,Tl(r)),e.opacityExit=j(t.opacity??1,0,El(r))):a&&(e.opacity=j(t.opacity??1,n.opacity??1,r));for(let i=0;i<bl;i++){let a=yl[i],o=wl(t,a),s=wl(n,a);o===void 0&&s===void 0||(o||=0,s||=0,o===0||s===0||Sl(o)===Sl(s)?(e[a]=Math.max(j(xl(o),xl(s),r),0),(dr.test(s)||dr.test(o))&&(e[a]+=`%`)):e[a]=s)}(t.rotate||n.rotate)&&(e.rotate=j(t.rotate||0,n.rotate||0,r))}function wl(e,t){return e[t]===void 0?e.borderRadius:e[t]}var Tl=Dl(0,.5,xn),El=Dl(.5,.95,en);function Dl(e,t,n){return r=>r<e?0:r>t?1:n(rn(e,t,r))}function Ol(e,t,n){let r=ro(e)?e:Qa(e);return r.start(Ua(``,r,t,n)),r.animation}function kl(e,t,n,r={passive:!0}){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n)}var Al=(e,t)=>e.depth-t.depth,jl=class{constructor(){this.children=[],this.isDirty=!1}add(e){Kt(this.children,e),this.isDirty=!0}remove(e){qt(this.children,e),this.isDirty=!0}forEach(e){this.isDirty&&this.children.sort(Al),this.isDirty=!1,this.children.forEach(e)}};function Ml(e,t){let n=Vn.now(),r=({timestamp:i})=>{let a=i-n;a>=t&&(In(r),e(a-t))};return k.setup(r,!0),()=>In(r)}function Nl(e){return ro(e)?e.get():e}var Pl=class{constructor(){this.members=[]}add(e){Kt(this.members,e);for(let t=this.members.length-1;t>=0;t--){let n=this.members[t];if(n===e||n===this.lead||n===this.prevLead)continue;let r=n.instance;(!r||r.isConnected===!1)&&!n.snapshot&&(qt(this.members,n),n.unmount())}e.scheduleRender()}remove(e){if(qt(this.members,e),e===this.prevLead&&(this.prevLead=void 0),e===this.lead){let e=this.members[this.members.length-1];e&&this.promote(e)}}relegate(e){for(let t=this.members.indexOf(e)-1;t>=0;t--){let e=this.members[t];if(e.isPresent!==!1&&e.instance?.isConnected!==!1)return this.promote(e),!0}return!1}promote(e,t){let n=this.lead;if(e!==n&&(this.prevLead=n,this.lead=e,e.show(),n)){n.updateSnapshot(),e.scheduleRender();let{layoutDependency:r}=n.options,{layoutDependency:i}=e.options;(r===void 0||r!==i)&&(e.resumeFrom=n,t&&(n.preserveOpacity=!0),n.snapshot&&(e.snapshot=n.snapshot,e.snapshot.latestValues=n.animationValues||n.latestValues),e.root?.isUpdating&&(e.isLayoutDirty=!0)),e.options.crossfade===!1&&n.hide()}}exitAnimationComplete(){this.members.forEach(e=>{e.options.onExitComplete?.(),e.resumingFrom?.options.onExitComplete?.()})}scheduleRender(){this.members.forEach(e=>e.instance&&e.scheduleRender(!1))}removeLeadSnapshot(){this.lead?.snapshot&&(this.lead.snapshot=void 0)}},Fl={hasAnimatedSinceResize:!0,hasEverUpdated:!1},Il={nodes:0,calculatedTargetDeltas:0,calculatedProjections:0},Ll=[``,`X`,`Y`,`Z`],Rl=1e3,zl=0;function Bl(e,t,n,r){let{latestValues:i}=t;i[e]&&(n[e]=i[e],t.setStaticValue(e,0),r&&(r[e]=0))}function Vl(e){if(e.hasCheckedOptimisedAppear=!0,e.root===e)return;let{visualElement:t}=e.options;if(!t)return;let n=co(t);if(window.MotionHasOptimisedAnimation(n,`transform`)){let{layout:t,layoutId:r}=e.options;window.MotionCancelOptimisedAnimation(n,`transform`,k,!(t||r))}let{parent:r}=e;r&&!r.hasCheckedOptimisedAppear&&Vl(r)}function Hl({attachResizeListener:e,defaultParent:t,measureScroll:n,checkIsScrollRoot:r,resetTransform:i}){return class{constructor(e={},n=t?.()){this.id=zl++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.layoutVersion=0,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,Mn.value&&(Il.nodes=Il.calculatedTargetDeltas=Il.calculatedProjections=0),this.nodes.forEach(B),this.nodes.forEach(Yl),this.nodes.forEach(Xl),this.nodes.forEach(V),Mn.addProjectionMetrics&&Mn.addProjectionMetrics(Il)},this.resolvedRelativeTargetAt=0,this.linkedParentVersion=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=e,this.root=n?n.root||n:this,this.path=n?[...n.path,n]:[],this.parent=n,this.depth=n?n.depth+1:0;for(let e=0;e<this.path.length;e++)this.path[e].shouldResetTransform=!0;this.root===this&&(this.nodes=new jl)}addEventListener(e,t){return this.eventHandlers.has(e)||this.eventHandlers.set(e,new an),this.eventHandlers.get(e).add(t)}notifyListeners(e,...t){let n=this.eventHandlers.get(e);n&&n.notify(...t)}hasListeners(e){return this.eventHandlers.has(e)}mount(t){if(this.instance)return;this.isSVG=ts(t)&&!gs(t),this.instance=t;let{layoutId:n,layout:r,visualElement:i}=this.options;if(i&&!i.current&&i.mount(t),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(r||n)&&(this.isLayoutDirty=!0),e){let n,r=0,i=()=>this.root.updateBlockedByResize=!1;k.read(()=>{r=window.innerWidth}),e(t,()=>{let e=window.innerWidth;e!==r&&(r=e,this.root.updateBlockedByResize=!0,n&&n(),n=Ml(i,250),Fl.hasAnimatedSinceResize&&(Fl.hasAnimatedSinceResize=!1,this.nodes.forEach(Jl)))})}n&&this.root.registerSharedNode(n,this),this.options.animate!==!1&&i&&(n||r)&&this.addEventListener(`didUpdate`,({delta:e,hasLayoutChanged:t,hasRelativeLayoutChanged:n,layout:r})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}let a=this.options.transition||i.getDefaultTransition()||ru,{onLayoutAnimationStart:o,onLayoutAnimationComplete:s}=i.getProps(),c=!this.targetLayout||!ml(this.targetLayout,r),l=!t&&n;if(this.options.layoutRoot||this.resumeFrom||l||t&&(c||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);let t={...Ba(a,`layout`),onPlay:o,onComplete:s};(i.shouldReduceMotion||this.options.layoutRoot)&&(t.delay=0,t.type=!1),this.startAnimation(t),this.setAnimationOrigin(e,l)}else t||Jl(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=r})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);let e=this.getStack();e&&e.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),In(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(Zl),this.animationId++)}getTransformTemplate(){let{visualElement:e}=this.options;return e&&e.getProps().transformTemplate}willUpdate(e=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&Vl(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let e=0;e<this.path.length;e++){let t=this.path[e];t.shouldResetTransform=!0,(typeof t.latestValues.x==`string`||typeof t.latestValues.y==`string`)&&(t.isLayoutDirty=!0),t.updateScroll(`snapshot`),t.options.layoutRoot&&t.willUpdate(!1)}let{layoutId:t,layout:n}=this.options;if(t===void 0&&!n)return;let r=this.getTransformTemplate();this.prevTransformTemplateValue=r?r(this.latestValues,``):void 0,this.updateSnapshot(),e&&this.notifyListeners(`willUpdate`)}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){let e=this.updateBlockedByResize;this.unblockUpdate(),this.updateBlockedByResize=!1,this.clearAllSnapshots(),e&&this.nodes.forEach(W),this.nodes.forEach(U);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach(Gl);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(Kl),this.nodes.forEach(ql),this.nodes.forEach(Ul),this.nodes.forEach(Wl)):this.nodes.forEach(Gl),this.clearAllSnapshots();let e=Vn.now();Ln.delta=Jt(0,1e3/60,e-Ln.timestamp),Ln.timestamp=e,Ln.isProcessing=!0,Rn.update.process(Ln),Rn.preRender.process(Ln),Rn.render.process(Ln),Ln.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,Fo.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(H),this.sharedNodes.forEach(Ql)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,k.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){k.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!Xc(this.snapshot.measuredBox.x)&&!Xc(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let e=0;e<this.path.length;e++)this.path[e].updateScroll();let e=this.layout;this.layout=this.measure(!1),this.layoutVersion++,this.layoutCorrected||=Ss(),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners(`measure`,this.layout.layoutBox);let{visualElement:t}=this.options;t&&t.notify(`LayoutMeasure`,this.layout.layoutBox,e?e.layoutBox:void 0)}updateScroll(e=`measure`){let t=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===e&&(t=!1),t&&this.instance){let t=r(this.instance);this.scroll={animationId:this.root.animationId,phase:e,isRoot:t,offset:n(this.instance),wasRoot:this.scroll?this.scroll.isRoot:t}}}resetTransform(){if(!i)return;let e=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,t=this.projectionDelta&&!dl(this.projectionDelta),n=this.getTransformTemplate(),r=n?n(this.latestValues,``):void 0,a=r!==this.prevTransformTemplateValue;e&&this.instance&&(t||qs(this.latestValues)||a)&&(i(this.instance,r),this.shouldResetTransform=!1,this.scheduleRender())}measure(e=!0){let t=this.measurePageBox(),n=this.removeElementScroll(t);return e&&(n=this.removeTransform(n)),su(n),{animationId:this.root.animationId,measuredBox:t,layoutBox:n,latestValues:{},source:this.id}}measurePageBox(){let{visualElement:e}=this.options;if(!e)return Ss();let t=e.measureViewportBox();if(!(this.scroll?.wasRoot||this.path.some(lu))){let{scroll:e}=this.root;e&&(rc(t.x,e.offset.x),rc(t.y,e.offset.y))}return t}removeElementScroll(e){let t=Ss();if(Uc(t,e),this.scroll?.wasRoot)return t;for(let n=0;n<this.path.length;n++){let r=this.path[n],{scroll:i,options:a}=r;r!==this.root&&i&&a.layoutScroll&&(i.wasRoot&&Uc(t,e),rc(t.x,i.offset.x),rc(t.y,i.offset.y))}return t}applyTransform(e,t=!1,n){let r=n||Ss();Uc(r,e);for(let e=0;e<this.path.length;e++){let n=this.path[e];!t&&n.options.layoutScroll&&n.scroll&&n!==n.root&&(rc(r.x,-n.scroll.offset.x),rc(r.y,-n.scroll.offset.y)),qs(n.latestValues)&&oc(r,n.latestValues,n.layout?.layoutBox)}return qs(this.latestValues)&&oc(r,this.latestValues,this.layout?.layoutBox),r}removeTransform(e){let t=Ss();Uc(t,e);for(let e=0;e<this.path.length;e++){let n=this.path[e];if(!qs(n.latestValues))continue;let r;n.instance&&(Ks(n.latestValues)&&n.updateSnapshot(),r=Ss(),Uc(r,n.measurePageBox())),ll(t,n.latestValues,n.snapshot?.layoutBox,r)}return qs(this.latestValues)&&ll(t,this.latestValues),t}setTargetDelta(e){this.targetDelta=e,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(e){this.options={...this.options,...e,crossfade:e.crossfade===void 0?!0:e.crossfade}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==Ln.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(e=!1){let t=this.getLead();this.isProjectionDirty||=t.isProjectionDirty,this.isTransformDirty||=t.isTransformDirty,this.isSharedProjectionDirty||=t.isSharedProjectionDirty;let n=!!this.resumingFrom||this!==t;if(!(e||n&&this.isSharedProjectionDirty||this.isProjectionDirty||this.parent?.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;let{layout:r,layoutId:i}=this.options;if(!this.layout||!(r||i))return;this.resolvedRelativeTargetAt=Ln.timestamp;let a=this.getClosestProjectingParent();a&&this.linkedParentVersion!==a.layoutVersion&&!a.options.layoutRoot&&this.removeRelativeTarget(),!this.targetDelta&&!this.relativeTarget&&(this.options.layoutAnchor!==!1&&a&&a.layout?this.createRelativeTarget(a,this.layout.layoutBox,a.layout.layoutBox):this.removeRelativeTarget()),!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=Ss(),this.targetWithTransforms=Ss()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),tl(this.target,this.relativeTarget,this.relativeParent.target,this.options.layoutAnchor||void 0)):this.targetDelta?(this.resumingFrom?this.applyTransform(this.layout.layoutBox,!1,this.target):Uc(this.target,this.layout.layoutBox),$s(this.target,this.targetDelta)):Uc(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget&&(this.attemptToResolveRelativeTarget=!1,this.options.layoutAnchor!==!1&&a&&!!a.resumingFrom==!!this.resumingFrom&&!a.options.layoutScroll&&a.target&&this.animationProgress!==1?this.createRelativeTarget(a,this.target,a.target):this.relativeParent=this.relativeTarget=void 0),Mn.value&&Il.calculatedTargetDeltas++)}getClosestProjectingParent(){if(!(!this.parent||Ks(this.parent.latestValues)||Js(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}createRelativeTarget(e,t,n){this.relativeParent=e,this.linkedParentVersion=e.layoutVersion,this.forceRelativeParentToResolveTarget(),this.relativeTarget=Ss(),this.relativeTargetOrigin=Ss(),rl(this.relativeTargetOrigin,t,n,this.options.layoutAnchor||void 0),Uc(this.relativeTarget,this.relativeTargetOrigin)}removeRelativeTarget(){this.relativeParent=this.relativeTarget=void 0}calcProjection(){let e=this.getLead(),t=!!this.resumingFrom||this!==e,n=!0;if((this.isProjectionDirty||this.parent?.isProjectionDirty)&&(n=!1),t&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(n=!1),this.resolvedRelativeTargetAt===Ln.timestamp&&(n=!1),n)return;let{layout:r,layoutId:i}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(r||i))return;Uc(this.layoutCorrected,this.layout.layoutBox);let a=this.treeScale.x,o=this.treeScale.y;nc(this.layoutCorrected,this.treeScale,this.path,t),e.layout&&!e.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(e.target=e.layout.layoutBox,e.targetWithTransforms=Ss());let{target:s}=e;if(!s){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(R(this.prevProjectionDelta.x,this.projectionDelta.x),R(this.prevProjectionDelta.y,this.projectionDelta.y)),$c(this.projectionDelta,this.layoutCorrected,s,this.latestValues),(this.treeScale.x!==a||this.treeScale.y!==o||!gl(this.projectionDelta.x,this.prevProjectionDelta.x)||!gl(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners(`projectionUpdate`,s)),Mn.value&&Il.calculatedProjections++}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(e=!0){if(this.options.visualElement?.scheduleRender(),e){let e=this.getStack();e&&e.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=bs(),this.projectionDelta=bs(),this.projectionDeltaWithTransform=bs()}setAnimationOrigin(e,t=!1){let n=this.snapshot,r=n?n.latestValues:{},i={...this.latestValues},a=bs();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!t;let o=Ss(),s=(n?n.source:void 0)!==(this.layout?this.layout.source:void 0),c=this.getStack(),l=!c||c.members.length<=1,u=!!(s&&!l&&this.options.crossfade===!0&&!this.path.some(nu));this.animationProgress=0;let d;this.mixTargetDelta=t=>{let n=t/1e3;$l(a.x,e.x,n),$l(a.y,e.y,n),this.setTargetDelta(a),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(rl(o,this.layout.layoutBox,this.relativeParent.layout.layoutBox,this.options.layoutAnchor||void 0),tu(this.relativeTarget,this.relativeTargetOrigin,o,n),d&&pl(this.relativeTarget,d)&&(this.isProjectionDirty=!1),d||=Ss(),Uc(d,this.relativeTarget)),s&&(this.animationValues=i,Cl(i,r,this.latestValues,n,u,l)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=n},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(e){this.notifyListeners(`animationStart`),this.currentAnimation?.stop(),this.resumingFrom?.currentAnimation?.stop(),this.pendingAnimation&&=(In(this.pendingAnimation),void 0),this.pendingAnimation=k.update(()=>{Fl.hasAnimatedSinceResize=!0,Hn.layout++,this.motionValue||=Qa(0),this.motionValue.jump(0,!1),this.currentAnimation=Ol(this.motionValue,[0,1e3],{...e,velocity:0,isSync:!0,onUpdate:t=>{this.mixTargetDelta(t),e.onUpdate&&e.onUpdate(t)},onStop:()=>{Hn.layout--},onComplete:()=>{Hn.layout--,e.onComplete&&e.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);let e=this.getStack();e&&e.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners(`animationComplete`)}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(Rl),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){let e=this.getLead(),{targetWithTransforms:t,target:n,layout:r,latestValues:i}=e;if(!(!t||!n||!r)){if(this!==e&&this.layout&&r&&cu(this.options.animationType,this.layout.layoutBox,r.layoutBox)){n=this.target||Ss();let t=Xc(this.layout.layoutBox.x);n.x.min=e.target.x.min,n.x.max=n.x.min+t;let r=Xc(this.layout.layoutBox.y);n.y.min=e.target.y.min,n.y.max=n.y.min+r}Uc(t,n),oc(t,i),$c(this.projectionDeltaWithTransform,this.layoutCorrected,t,i)}}registerSharedNode(e,t){this.sharedNodes.has(e)||this.sharedNodes.set(e,new Pl),this.sharedNodes.get(e).add(t);let n=t.options.initialPromotionConfig;t.promote({transition:n?n.transition:void 0,preserveFollowOpacity:n&&n.shouldPreserveFollowOpacity?n.shouldPreserveFollowOpacity(t):void 0})}isLead(){let e=this.getStack();return e?e.lead===this:!0}getLead(){let{layoutId:e}=this.options;return e&&this.getStack()?.lead||this}getPrevLead(){let{layoutId:e}=this.options;return e?this.getStack()?.prevLead:void 0}getStack(){let{layoutId:e}=this.options;if(e)return this.root.sharedNodes.get(e)}promote({needsReset:e,transition:t,preserveFollowOpacity:n}={}){let r=this.getStack();r&&r.promote(this,n),e&&(this.projectionDelta=void 0,this.needsReset=!0),t&&this.setOptions({transition:t})}relegate(){let e=this.getStack();return e?e.relegate(this):!1}resetSkewAndRotation(){let{visualElement:e}=this.options;if(!e)return;let t=!1,{latestValues:n}=e;if((n.z||n.rotate||n.rotateX||n.rotateY||n.rotateZ||n.skewX||n.skewY)&&(t=!0),!t)return;let r={};n.z&&Bl(`z`,e,r,this.animationValues);for(let t=0;t<Ll.length;t++)Bl(`rotate${Ll[t]}`,e,r,this.animationValues),Bl(`skew${Ll[t]}`,e,r,this.animationValues);e.render();for(let t in r)e.setStaticValue(t,r[t]),this.animationValues&&(this.animationValues[t]=r[t]);e.scheduleRender()}applyProjectionStyles(e,t){if(!this.instance||this.isSVG)return;if(!this.isVisible){e.visibility=`hidden`;return}let n=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,e.visibility=``,e.opacity=``,e.pointerEvents=Nl(t?.pointerEvents)||``,e.transform=n?n(this.latestValues,``):`none`;return}let r=this.getLead();if(!this.projectionDelta||!this.layout||!r.target){this.options.layoutId&&(e.opacity=this.latestValues.opacity===void 0?1:this.latestValues.opacity,e.pointerEvents=Nl(t?.pointerEvents)||``),this.hasProjected&&!qs(this.latestValues)&&(e.transform=n?n({},``):`none`,this.hasProjected=!1);return}e.visibility=``;let i=r.animationValues||r.latestValues;this.applyTransformsToTarget();let a=vl(this.projectionDeltaWithTransform,this.treeScale,i);n&&(a=n(i,a)),e.transform=a;let{x:o,y:s}=this.projectionDelta;e.transformOrigin=`${o.origin*100}% ${s.origin*100}% 0`,r.animationValues?e.opacity=r===this?i.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:i.opacityExit:e.opacity=r===this?i.opacity===void 0?``:i.opacity:i.opacityExit===void 0?0:i.opacityExit;for(let t in _c){if(i[t]===void 0)continue;let{correct:n,applyTo:o,isCSSVariable:s}=_c[t],c=a===`none`?i[t]:n(i[t],r);if(o){let t=o.length;for(let n=0;n<t;n++)e[o[n]]=c}else s?this.options.visualElement.renderState.vars[t]=c:e[t]=c}this.options.layoutId&&(e.pointerEvents=r===this?Nl(t?.pointerEvents)||``:`none`)}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(e=>e.currentAnimation?.stop()),this.root.nodes.forEach(U),this.root.sharedNodes.clear()}}}function Ul(e){e.updateLayout()}function Wl(e){let t=e.resumeFrom?.snapshot||e.snapshot;if(e.isLead()&&e.layout&&t&&e.hasListeners(`didUpdate`)){let{layoutBox:n,measuredBox:r}=e.layout,{animationType:i}=e.options,a=t.source!==e.layout.source;if(i===`size`)_l(e=>{let r=a?t.measuredBox[e]:t.layoutBox[e],i=Xc(r);r.min=n[e].min,r.max=r.min+i});else if(i===`x`||i===`y`){let e=i===`x`?`y`:`x`;Hc(a?t.measuredBox[e]:t.layoutBox[e],n[e])}else cu(i,t.layoutBox,n)&&_l(r=>{let i=a?t.measuredBox[r]:t.layoutBox[r],o=Xc(n[r]);i.max=i.min+o,e.relativeTarget&&!e.currentAnimation&&(e.isProjectionDirty=!0,e.relativeTarget[r].max=e.relativeTarget[r].min+o)});let o=bs();$c(o,n,t.layoutBox);let s=bs();a?$c(s,e.applyTransform(r,!0),t.measuredBox):$c(s,n,t.layoutBox);let c=!dl(o),l=!1;if(!e.resumeFrom){let r=e.getClosestProjectingParent();if(r&&!r.resumeFrom){let{snapshot:i,layout:a}=r;if(i&&a){let o=e.options.layoutAnchor||void 0,s=Ss();rl(s,t.layoutBox,i.layoutBox,o);let c=Ss();rl(c,n,a.layoutBox,o),ml(s,c)||(l=!0),r.options.layoutRoot&&(e.relativeTarget=c,e.relativeTargetOrigin=s,e.relativeParent=r)}}}e.notifyListeners(`didUpdate`,{layout:n,snapshot:t,delta:s,layoutDelta:o,hasLayoutChanged:c,hasRelativeLayoutChanged:l})}else if(e.isLead()){let{onExitComplete:t}=e.options;t&&t()}e.options.transition=void 0}function B(e){Mn.value&&Il.nodes++,e.parent&&(e.isProjecting()||(e.isProjectionDirty=e.parent.isProjectionDirty),e.isSharedProjectionDirty||=!!(e.isProjectionDirty||e.parent.isProjectionDirty||e.parent.isSharedProjectionDirty),e.isTransformDirty||=e.parent.isTransformDirty)}function V(e){e.isProjectionDirty=e.isSharedProjectionDirty=e.isTransformDirty=!1}function H(e){e.clearSnapshot()}function U(e){e.clearMeasurements()}function W(e){e.isLayoutDirty=!0,e.updateLayout()}function Gl(e){e.isLayoutDirty=!1}function Kl(e){e.isAnimationBlocked&&e.layout&&!e.isLayoutDirty&&(e.snapshot=e.layout,e.isLayoutDirty=!0)}function ql(e){let{visualElement:t}=e.options;t&&t.getProps().onBeforeLayoutMeasure&&t.notify(`BeforeLayoutMeasure`),e.resetTransform()}function Jl(e){e.finishAnimation(),e.targetDelta=e.relativeTarget=e.target=void 0,e.isProjectionDirty=!0}function Yl(e){e.resolveTargetDelta()}function Xl(e){e.calcProjection()}function Zl(e){e.resetSkewAndRotation()}function Ql(e){e.removeLeadSnapshot()}function $l(e,t,n){e.translate=j(t.translate,0,n),e.scale=j(t.scale,1,n),e.origin=t.origin,e.originPoint=t.originPoint}function eu(e,t,n,r){e.min=j(t.min,n.min,r),e.max=j(t.max,n.max,r)}function tu(e,t,n,r){eu(e.x,t.x,n.x,r),eu(e.y,t.y,n.y,r)}function nu(e){return e.animationValues&&e.animationValues.opacityExit!==void 0}var ru={duration:.45,ease:[.4,0,.1,1]},iu=e=>typeof navigator<`u`&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(e),au=iu(`applewebkit/`)&&!iu(`chrome/`)?Math.round:en;function ou(e){e.min=au(e.min),e.max=au(e.max)}function su(e){ou(e.x),ou(e.y)}function cu(e,t,n){return e===`position`||e===`preserve-aspect`&&!Zc(hl(t),hl(n),.2)}function lu(e){return e!==e.root&&e.scroll?.wasRoot}var uu=Hl({attachResizeListener:(e,t)=>kl(e,`resize`,t),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body?.scrollLeft||0,y:document.documentElement.scrollTop||document.body?.scrollTop||0}),checkIsScrollRoot:()=>!0}),du={current:void 0},fu=Hl({measureScroll:e=>({x:e.scrollLeft,y:e.scrollTop}),defaultParent:()=>{if(!du.current){let e=new uu({});e.mount(window),e.setOptions({layoutScroll:!0}),du.current=e}return du.current},resetTransform:(e,t)=>{e.style.transform=t===void 0?`none`:t},checkIsScrollRoot:e=>window.getComputedStyle(e).position===`fixed`}),pu=(0,b.createContext)({transformPagePoint:e=>e,isStatic:!1,reducedMotion:`never`});function mu(e,t){if(typeof e==`function`)return e(t);e!=null&&(e.current=t)}function hu(...e){return t=>{let n=!1,r=e.map(e=>{let r=mu(e,t);return!n&&typeof r==`function`&&(n=!0),r});if(n)return()=>{for(let t=0;t<r.length;t++){let n=r[t];typeof n==`function`?n():mu(e[t],null)}}}}function gu(...e){return b.useCallback(hu(...e),e)}var G=Vt(),_u=class extends b.Component{getSnapshotBeforeUpdate(e){let t=this.props.childRef.current;if(Po(t)&&e.isPresent&&!this.props.isPresent&&this.props.pop!==!1){let e=t.offsetParent,n=Po(e)&&e.offsetWidth||0,r=Po(e)&&e.offsetHeight||0,i=getComputedStyle(t),a=this.props.sizeRef.current;a.height=parseFloat(i.height),a.width=parseFloat(i.width),a.top=t.offsetTop,a.left=t.offsetLeft,a.right=n-a.width-a.left,a.bottom=r-a.height-a.top}return null}componentDidUpdate(){}render(){return this.props.children}};function vu({children:e,isPresent:t,anchorX:n,anchorY:r,root:i,pop:a}){let o=(0,b.useId)(),s=(0,b.useRef)(null),c=(0,b.useRef)({width:0,height:0,top:0,left:0,right:0,bottom:0}),{nonce:l}=(0,b.useContext)(pu),u=gu(s,e.props?.ref??e?.ref);return(0,b.useInsertionEffect)(()=>{let{width:e,height:u,top:d,left:f,right:p,bottom:m}=c.current;if(t||a===!1||!s.current||!e||!u)return;let h=n===`left`?`left: ${f}`:`right: ${p}`,g=r===`bottom`?`bottom: ${m}`:`top: ${d}`;s.current.dataset.motionPopId=o;let _=document.createElement(`style`);l&&(_.nonce=l);let v=i??document.head;return v.appendChild(_),_.sheet&&_.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${u}px !important;
            ${h}px !important;
            ${g}px !important;
          }
        `),()=>{s.current?.removeAttribute(`data-motion-pop-id`),v.contains(_)&&v.removeChild(_)}},[t]),(0,G.jsx)(_u,{isPresent:t,childRef:s,sizeRef:c,pop:a,children:a===!1?e:b.cloneElement(e,{ref:u})})}var yu=({children:e,initial:t,isPresent:n,onExitComplete:r,custom:i,presenceAffectsLayout:a,mode:o,anchorX:s,anchorY:c,root:l})=>{let u=Ut(bu),d=(0,b.useId)(),f=!0,p=(0,b.useMemo)(()=>(f=!1,{id:d,initial:t,isPresent:n,custom:i,onExitComplete:e=>{u.set(e,!0);for(let e of u.values())if(!e)return;r&&r()},register:e=>(u.set(e,!1),()=>u.delete(e))}),[n,u,r]);return a&&f&&(p={...p}),(0,b.useMemo)(()=>{u.forEach((e,t)=>u.set(t,!1))},[n]),b.useEffect(()=>{!n&&!u.size&&r&&r()},[n]),e=(0,G.jsx)(vu,{pop:o===`popLayout`,isPresent:n,anchorX:s,anchorY:c,root:l,children:e}),(0,G.jsx)(Gt.Provider,{value:p,children:e})};function bu(){return new Map}function xu(e=!0){let t=(0,b.useContext)(Gt);if(t===null)return[!0,null];let{isPresent:n,onExitComplete:r,register:i}=t,a=(0,b.useId)();(0,b.useEffect)(()=>{if(e)return i(a)},[e]);let o=(0,b.useCallback)(()=>e&&r&&r(a),[a,r,e]);return!n&&r?[!1,o]:[!0]}var Su=e=>e.key||``;function Cu(e){let t=[];return b.Children.forEach(e,e=>{(0,b.isValidElement)(e)&&t.push(e)}),t}var wu=({children:e,custom:t,initial:n=!0,onExitComplete:r,presenceAffectsLayout:i=!0,mode:a=`sync`,propagate:o=!1,anchorX:s=`left`,anchorY:c=`top`,root:l})=>{let[u,d]=xu(o),f=(0,b.useMemo)(()=>Cu(e),[e]),p=o&&!u?[]:f.map(Su),m=(0,b.useRef)(!0),h=(0,b.useRef)(f),g=Ut(()=>new Map),_=(0,b.useRef)(new Set),[v,y]=(0,b.useState)(f),[x,S]=(0,b.useState)(f);Wt(()=>{m.current=!1,h.current=f;for(let e=0;e<x.length;e++){let t=Su(x[e]);p.includes(t)?(g.delete(t),_.current.delete(t)):g.get(t)!==!0&&g.set(t,!1)}},[x,p.length,p.join(`-`)]);let C=[];if(f!==v){let e=[...f];for(let t=0;t<x.length;t++){let n=x[t],r=Su(n);p.includes(r)||(e.splice(t,0,n),C.push(n))}return a===`wait`&&C.length&&(e=C),S(Cu(e)),y(f),null}let{forceRender:w}=(0,b.useContext)(Ht);return(0,G.jsx)(G.Fragment,{children:x.map(e=>{let v=Su(e),y=o&&!u?!1:f===x||p.includes(v);return(0,G.jsx)(yu,{isPresent:y,initial:!m.current||n?void 0:!1,custom:t,presenceAffectsLayout:i,mode:a,root:l,onExitComplete:y?void 0:()=>{if(_.current.has(v))return;if(g.has(v))_.current.add(v),g.set(v,!0);else return;let e=!0;g.forEach(t=>{t||(e=!1)}),e&&(w?.(),S(h.current),o&&d?.(),r&&r())},anchorX:s,anchorY:c,children:e},v)})})},Tu=(0,b.createContext)({strict:!1}),Eu={animation:[`animate`,`variants`,`whileHover`,`whileTap`,`exit`,`whileInView`,`whileFocus`,`whileDrag`],exit:[`exit`],drag:[`drag`,`dragControls`],focus:[`whileFocus`],hover:[`whileHover`,`onHoverStart`,`onHoverEnd`],tap:[`whileTap`,`onTap`,`onTapStart`,`onTapCancel`],pan:[`onPan`,`onPanStart`,`onPanSessionStart`,`onPanEnd`],inView:[`whileInView`,`onViewportEnter`,`onViewportLeave`],layout:[`layout`,`layoutId`]},Du=!1;function Ou(){if(Du)return;let e={};for(let t in Eu)e[t]={isEnabled:e=>Eu[t].some(t=>!!e[t])};Ls(e),Du=!0}function ku(){return Ou(),Rs()}function Au(e){let t=ku();for(let n in e)t[n]={...t[n],...e[n]};Ls(t)}var ju=new Set(`animate.exit.variants.initial.style.values.variants.transition.transformTemplate.custom.inherit.onBeforeLayoutMeasure.onAnimationStart.onAnimationComplete.onUpdate.onDragStart.onDrag.onDragEnd.onMeasureDragConstraints.onDirectionLock.onDragTransitionEnd._dragX._dragY.onHoverStart.onHoverEnd.onViewportEnter.onViewportLeave.globalTapTarget.propagate.ignoreStrict.viewport`.split(`.`));function Mu(e){return e.startsWith(`while`)||e.startsWith(`drag`)&&e!==`draggable`||e.startsWith(`layout`)||e.startsWith(`onTap`)||e.startsWith(`onPan`)||e.startsWith(`onLayout`)||ju.has(e)}var Nu=c({default:()=>Pu}),Pu,Fu=o((()=>{throw Pu={},Error(`Could not resolve "@emotion/is-prop-valid" imported by "framer-motion". Is it installed?`)})),Iu=e=>!Mu(e);function Lu(e){typeof e==`function`&&(Iu=t=>t.startsWith(`on`)?!Mu(t):e(t))}try{Lu((Fu(),d(Nu)).default)}catch{}function Ru(e,t,n){let r={};for(let i in e)i===`values`&&typeof e.values==`object`||ro(e[i])||(Iu(i)||n===!0&&Mu(i)||!t&&!Mu(i)||e.draggable&&i.startsWith(`onDrag`))&&(r[i]=e[i]);return r}var zu=(0,b.createContext)({});function Bu(e,t){if(Os(e)){let{initial:t,animate:n}=e;return{initial:t===!1||Ts(t)?t:void 0,animate:Ts(n)?n:void 0}}return e.inherit===!1?{}:t}function Vu(e){let{initial:t,animate:n}=Bu(e,(0,b.useContext)(zu));return(0,b.useMemo)(()=>({initial:t,animate:n}),[Hu(t),Hu(n)])}function Hu(e){return Array.isArray(e)?e.join(` `):e}var Uu=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function Wu(e,t,n){for(let r in t)!ro(t[r])&&!vc(r,n)&&(e[r]=t[r])}function Gu({transformTemplate:e},t){return(0,b.useMemo)(()=>{let n=Uu();return fc(n,t,e),Object.assign({},n.vars,n.style)},[t])}function Ku(e,t){let n=e.style||{},r={};return Wu(r,n,e),Object.assign(r,Gu(e,t)),r}function qu(e,t){let n={},r=Ku(e,t);return e.drag&&e.dragListener!==!1&&(n.draggable=!1,r.userSelect=r.WebkitUserSelect=r.WebkitTouchCallout=`none`,r.touchAction=e.drag===!0?`none`:`pan-${e.drag===`x`?`y`:`x`}`),e.tabIndex===void 0&&(e.onTap||e.onTapStart||e.whileTap)&&(n.tabIndex=0),n.style=r,n}var Ju=()=>({...Uu(),attrs:{}});function Yu(e,t,n,r){let i=(0,b.useMemo)(()=>{let n=Ju();return Ec(n,t,Oc(r),e.transformTemplate,e.style),{...n.attrs,style:{...n.style}}},[t]);if(e.style){let t={};Wu(t,e.style,e),i.style={...t,...i.style}}return i}var K=[`animate`,`circle`,`defs`,`desc`,`ellipse`,`g`,`image`,`line`,`filter`,`marker`,`mask`,`metadata`,`path`,`pattern`,`polygon`,`polyline`,`rect`,`stop`,`switch`,`symbol`,`svg`,`text`,`tspan`,`use`,`view`];function Xu(e){return typeof e!=`string`||e.includes(`-`)?!1:!!(K.indexOf(e)>-1||/[A-Z]/u.test(e))}function Zu(e,t,n,{latestValues:r},i,a=!1,o){let s=(o??Xu(e)?Yu:qu)(t,r,i,e),c=Ru(t,typeof e==`string`,a),l=e===b.Fragment?{}:{...c,...s,ref:n},{children:u}=t,d=(0,b.useMemo)(()=>ro(u)?u.get():u,[u]);return(0,b.createElement)(e,{...l,children:d})}function Qu({scrapeMotionValuesFromProps:e,createRenderState:t},n,r,i){return{latestValues:$u(n,r,i,e),renderState:t()}}function $u(e,t,n,r){let i={},a=r(e,{});for(let e in a)i[e]=Nl(a[e]);let{initial:o,animate:s}=e,c=Os(e),l=ks(e);t&&l&&!c&&e.inherit!==!1&&(o===void 0&&(o=t.initial),s===void 0&&(s=t.animate));let u=n?n.initial===!1:!1;u||=o===!1;let d=u?s:o;if(d&&typeof d!=`boolean`&&!ws(d)){let t=Array.isArray(d)?d:[d];for(let n=0;n<t.length;n++){let r=Ga(e,t[n]);if(r){let{transitionEnd:e,transition:t,...n}=r;for(let e in n){let t=n[e];if(Array.isArray(t)){let e=u?t.length-1:0;t=t[e]}t!==null&&(i[e]=t)}for(let t in e)i[t]=e[t]}}}return i}var ed=e=>(t,n)=>{let r=(0,b.useContext)(zu),i=(0,b.useContext)(Gt),a=()=>Qu(e,t,r,i);return n?a():Ut(a)},td=ed({scrapeMotionValuesFromProps:yc,createRenderState:Uu}),nd=ed({scrapeMotionValuesFromProps:Ac,createRenderState:Ju}),rd=Symbol.for(`motionComponentSymbol`);function id(e,t,n){let r=(0,b.useRef)(n);(0,b.useInsertionEffect)(()=>{r.current=n});let i=(0,b.useRef)(null);return(0,b.useCallback)(n=>{n&&e.onMount?.(n);let a=r.current;if(typeof a==`function`)if(n){let e=a(n);typeof e==`function`&&(i.current=e)}else i.current?(i.current(),i.current=null):a(n);else a&&(a.current=n);t&&(n?t.mount(n):t.unmount())},[t])}var ad=(0,b.createContext)({});function od(e){return e&&typeof e==`object`&&Object.prototype.hasOwnProperty.call(e,`current`)}function sd(e,t,n,r,i,a){let{visualElement:o}=(0,b.useContext)(zu),s=(0,b.useContext)(Tu),c=(0,b.useContext)(Gt),l=(0,b.useContext)(pu),u=l.reducedMotion,d=l.skipAnimations,f=(0,b.useRef)(null),p=(0,b.useRef)(!1);r||=s.renderer,!f.current&&r&&(f.current=r(e,{visualState:t,parent:o,props:n,presenceContext:c,blockInitialAnimation:c?c.initial===!1:!1,reducedMotionConfig:u,skipAnimations:d,isSVG:a}),p.current&&f.current&&(f.current.manuallyAnimateOnMount=!0));let m=f.current,h=(0,b.useContext)(ad);m&&!m.projection&&i&&(m.type===`html`||m.type===`svg`)&&cd(f.current,n,i,h);let g=(0,b.useRef)(!1);(0,b.useInsertionEffect)(()=>{m&&g.current&&m.update(n,c)});let _=n[so],v=(0,b.useRef)(!!_&&typeof window<`u`&&!window.MotionHandoffIsComplete?.(_)&&window.MotionHasOptimisedAnimation?.(_));return Wt(()=>{p.current=!0,m&&(g.current=!0,window.MotionIsMounted=!0,m.updateFeatures(),m.scheduleRenderMicrotask(),v.current&&m.animationState&&m.animationState.animateChanges())}),(0,b.useEffect)(()=>{m&&(!v.current&&m.animationState&&m.animationState.animateChanges(),v.current&&=(queueMicrotask(()=>{window.MotionHandoffMarkAsComplete?.(_)}),!1),m.enteringChildren=void 0)}),m}function cd(e,t,n,r){let{layoutId:i,layout:a,drag:o,dragConstraints:s,layoutScroll:c,layoutRoot:l,layoutAnchor:u,layoutCrossfade:d}=t;e.projection=new n(e.latestValues,t[`data-framer-portal-id`]?void 0:ld(e.parent)),e.projection.setOptions({layoutId:i,layout:a,alwaysMeasureLayout:!!o||s&&od(s),visualElement:e,animationType:typeof a==`string`?a:`both`,initialPromotionConfig:r,crossfade:d,layoutScroll:c,layoutRoot:l,layoutAnchor:u})}function ld(e){if(e)return e.options.allowProjection===!1?ld(e.parent):e.projection}function ud(e,{forwardMotionProps:t=!1,type:n}={},r,i){r&&Au(r);let a=n?n===`svg`:Xu(e),o=a?nd:td;function s(n,s){let c,l={...(0,b.useContext)(pu),...n,layoutId:dd(n)},{isStatic:u}=l,d=Vu(n),f=o(n,u);if(!u&&typeof window<`u`){fd(l,r);let t=pd(l);c=t.MeasureLayout,d.visualElement=sd(e,f,l,i,t.ProjectionNode,a)}return(0,G.jsxs)(zu.Provider,{value:d,children:[c&&d.visualElement?(0,G.jsx)(c,{visualElement:d.visualElement,...l}):null,Zu(e,n,id(f,d.visualElement,s),f,u,t,a)]})}s.displayName=`motion.${typeof e==`string`?e:`create(${e.displayName??e.name??``})`}`;let c=(0,b.forwardRef)(s);return c[rd]=e,c}function dd({layoutId:e}){let t=(0,b.useContext)(Ht).id;return t&&e!==void 0?t+`-`+e:e}function fd(e,t){(0,b.useContext)(Tu).strict}function pd(e){let{drag:t,layout:n}=ku();if(!t&&!n)return{};let r={...t,...n};return{MeasureLayout:t?.isEnabled(e)||n?.isEnabled(e)?r.MeasureLayout:void 0,ProjectionNode:r.ProjectionNode}}function md(e,t){if(typeof Proxy>`u`)return ud;let n=new Map,r=(n,r)=>ud(n,r,e,t);return new Proxy((e,t)=>r(e,t),{get:(i,a)=>a===`create`?r:(n.has(a)||n.set(a,ud(a,void 0,e,t)),n.get(a))})}var hd=(e,t)=>t.isSVG??Xu(e)?new jc(t):new xc(t,{allowProjection:e!==b.Fragment}),gd=class extends Vs{constructor(e){super(e),e.animationState||=Rc(e)}updateAnimationControlsSubscription(){let{animate:e}=this.node.getProps();ws(e)&&(this.unmountControls=e.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){let{animate:e}=this.node.getProps(),{animate:t}=this.node.prevProps||{};e!==t&&this.updateAnimationControlsSubscription()}unmount(){this.node.animationState.reset(),this.unmountControls?.()}},_d=0,vd={animation:{Feature:gd},exit:{Feature:class extends Vs{constructor(){super(...arguments),this.id=_d++,this.isExitComplete=!1}update(){if(!this.node.presenceContext)return;let{isPresent:e,onExitComplete:t}=this.node.presenceContext,{isPresent:n}=this.node.prevPresenceContext||{};if(!this.node.animationState||e===n)return;if(e&&n===!1){if(this.isExitComplete){let{initial:e,custom:t}=this.node.getProps();if(typeof e==`string`){let n=Ka(this.node,e,t);if(n){let{transition:e,transitionEnd:t,...r}=n;for(let e in r)this.node.getValue(e)?.jump(r[e])}}this.node.animationState.reset(),this.node.animationState.animateChanges()}else this.node.animationState.setActive(`exit`,!1);this.isExitComplete=!1;return}let r=this.node.animationState.setActive(`exit`,!e);t&&!e&&r.then(()=>{this.isExitComplete=!0,t(this.id)})}mount(){let{register:e,onExitComplete:t}=this.node.presenceContext||{};t&&t(this.id),e&&(this.unmount=e(this.id))}unmount(){}}}};function yd(e){return{point:{x:e.pageX,y:e.pageY}}}var bd=e=>t=>Uo(t)&&e(t,yd(t));function xd(e,t,n,r){return kl(e,t,bd(n),r)}var Sd=({current:e})=>e?e.ownerDocument.defaultView:null,Cd=(e,t)=>Math.abs(e-t);function wd(e,t){let n=Cd(e.x,t.x),r=Cd(e.y,t.y);return Math.sqrt(n**2+r**2)}var q=new Set([`auto`,`scroll`]),Td=class{constructor(e,t,{transformPagePoint:n,contextWindow:r=window,dragSnapToOrigin:i=!1,distanceThreshold:a=3,element:o}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.lastRawMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.scrollPositions=new Map,this.removeScrollListeners=null,this.onElementScroll=e=>{this.handleScroll(e.target)},this.onWindowScroll=()=>{this.handleScroll(window)},this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;this.lastRawMoveEventInfo&&(this.lastMoveEventInfo=Ed(this.lastRawMoveEventInfo,this.transformPagePoint));let e=Od(this.lastMoveEventInfo,this.history),t=this.startEvent!==null,n=wd(e.offset,{x:0,y:0})>=this.distanceThreshold;if(!t&&!n)return;let{point:r}=e,{timestamp:i}=Ln;this.history.push({...r,timestamp:i});let{onStart:a,onMove:o}=this.handlers;t||(a&&a(this.lastMoveEvent,e),this.startEvent=this.lastMoveEvent),o&&o(this.lastMoveEvent,e)},this.handlePointerMove=(e,t)=>{this.lastMoveEvent=e,this.lastRawMoveEventInfo=t,this.lastMoveEventInfo=Ed(t,this.transformPagePoint),k.update(this.updatePoint,!0)},this.handlePointerUp=(e,t)=>{this.end();let{onEnd:n,onSessionEnd:r,resumeAnimation:i}=this.handlers;if((this.dragSnapToOrigin||!this.startEvent)&&i&&i(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;let a=Od(e.type===`pointercancel`?this.lastMoveEventInfo:Ed(t,this.transformPagePoint),this.history);this.startEvent&&n&&n(e,a),r&&r(e,a)},!Uo(e))return;this.dragSnapToOrigin=i,this.handlers=t,this.transformPagePoint=n,this.distanceThreshold=a,this.contextWindow=r||window;let s=Ed(yd(e),this.transformPagePoint),{point:c}=s,{timestamp:l}=Ln;this.history=[{...c,timestamp:l}];let{onSessionStart:u}=t;u&&u(e,Od(s,this.history)),this.removeListeners=nn(xd(this.contextWindow,`pointermove`,this.handlePointerMove),xd(this.contextWindow,`pointerup`,this.handlePointerUp),xd(this.contextWindow,`pointercancel`,this.handlePointerUp)),o&&this.startScrollTracking(o)}startScrollTracking(e){let t=e.parentElement;for(;t;){let e=getComputedStyle(t);(q.has(e.overflowX)||q.has(e.overflowY))&&this.scrollPositions.set(t,{x:t.scrollLeft,y:t.scrollTop}),t=t.parentElement}this.scrollPositions.set(window,{x:window.scrollX,y:window.scrollY}),window.addEventListener(`scroll`,this.onElementScroll,{capture:!0}),window.addEventListener(`scroll`,this.onWindowScroll),this.removeScrollListeners=()=>{window.removeEventListener(`scroll`,this.onElementScroll,{capture:!0}),window.removeEventListener(`scroll`,this.onWindowScroll)}}handleScroll(e){let t=this.scrollPositions.get(e);if(!t)return;let n=e===window,r=n?{x:window.scrollX,y:window.scrollY}:{x:e.scrollLeft,y:e.scrollTop},i={x:r.x-t.x,y:r.y-t.y};i.x===0&&i.y===0||(n?this.lastMoveEventInfo&&(this.lastMoveEventInfo.point.x+=i.x,this.lastMoveEventInfo.point.y+=i.y):this.history.length>0&&(this.history[0].x-=i.x,this.history[0].y-=i.y),this.scrollPositions.set(e,r),k.update(this.updatePoint,!0))}updateHandlers(e){this.handlers=e}end(){this.removeListeners&&this.removeListeners(),this.removeScrollListeners&&this.removeScrollListeners(),this.scrollPositions.clear(),In(this.updatePoint)}};function Ed(e,t){return t?{point:t(e.point)}:e}function Dd(e,t){return{x:e.x-t.x,y:e.y-t.y}}function Od({point:e},t){return{point:e,delta:Dd(e,Ad(t)),offset:Dd(e,kd(t)),velocity:jd(t,.1)}}function kd(e){return e[0]}function Ad(e){return e[e.length-1]}function jd(e,t){if(e.length<2)return{x:0,y:0};let n=e.length-1,r=null,i=Ad(e);for(;n>=0&&(r=e[n],!(i.timestamp-r.timestamp>on(t)));)n--;if(!r)return{x:0,y:0};r===e[0]&&e.length>2&&i.timestamp-r.timestamp>on(t)*2&&(r=e[1]);let a=sn(i.timestamp-r.timestamp);if(a===0)return{x:0,y:0};let o={x:(i.x-r.x)/a,y:(i.y-r.y)/a};return o.x===1/0&&(o.x=0),o.y===1/0&&(o.y=0),o}function Md(e,{min:t,max:n},r){return t!==void 0&&e<t?e=r?j(t,e,r.min):Math.max(e,t):n!==void 0&&e>n&&(e=r?j(n,e,r.max):Math.min(e,n)),e}function Nd(e,t,n){return{min:t===void 0?void 0:e.min+t,max:n===void 0?void 0:e.max+n-(e.max-e.min)}}function Pd(e,{top:t,left:n,bottom:r,right:i}){return{x:Nd(e.x,n,i),y:Nd(e.y,t,r)}}function Fd(e,t){let n=t.min-e.min,r=t.max-e.max;return t.max-t.min<e.max-e.min&&([n,r]=[r,n]),{min:n,max:r}}function Id(e,t){return{x:Fd(e.x,t.x),y:Fd(e.y,t.y)}}function Ld(e,t){let n=.5,r=Xc(e),i=Xc(t);return i>r?n=rn(t.min,t.max-r,e.min):r>i&&(n=rn(e.min,e.max-i,t.min)),Jt(0,1,n)}function J(e,t){let n={};return t.min!==void 0&&(n.min=t.min-e.min),t.max!==void 0&&(n.max=t.max-e.min),n}var Rd=.35;function zd(e=Rd){return e===!1?e=0:e===!0&&(e=Rd),{x:Bd(e,`left`,`right`),y:Bd(e,`top`,`bottom`)}}function Bd(e,t,n){return{min:Vd(e,t),max:Vd(e,n)}}function Vd(e,t){return typeof e==`number`?e:e[t]||0}var Hd=new WeakMap,Ud=class{constructor(e){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=Ss(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=e}start(e,{snapToCursor:t=!1,distanceThreshold:n}={}){let{presenceContext:r}=this.visualElement;if(r&&r.isPresent===!1)return;let i=e=>{t&&this.snapToCursor(yd(e).point),this.stopAnimation()},a=(e,t)=>{let{drag:n,dragPropagation:r,onDragStart:i}=this.getProps();if(n&&!r&&(this.openDragLock&&this.openDragLock(),this.openDragLock=Ro(n),!this.openDragLock))return;this.latestPointerEvent=e,this.latestPanInfo=t,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),_l(e=>{let t=this.getAxisMotionValue(e).get()||0;if(dr.test(t)){let{projection:n}=this.visualElement;if(n&&n.layout){let r=n.layout.layoutBox[e];r&&(t=Xc(r)*(parseFloat(t)/100))}}this.originPoint[e]=t}),i&&k.update(()=>i(e,t),!1,!0),ao(this.visualElement,`transform`);let{animationState:a}=this.visualElement;a&&a.setActive(`whileDrag`,!0)},o=(e,t)=>{this.latestPointerEvent=e,this.latestPanInfo=t;let{dragPropagation:n,dragDirectionLock:r,onDirectionLock:i,onDrag:a}=this.getProps();if(!n&&!this.openDragLock)return;let{offset:o}=t;if(r&&this.currentDirection===null){this.currentDirection=qd(o),this.currentDirection!==null&&i&&i(this.currentDirection);return}this.updateAxis(`x`,t.point,o),this.updateAxis(`y`,t.point,o),this.visualElement.render(),a&&k.update(()=>a(e,t),!1,!0)},s=(e,t)=>{this.latestPointerEvent=e,this.latestPanInfo=t,this.stop(e,t),this.latestPointerEvent=null,this.latestPanInfo=null},c=()=>{let{dragSnapToOrigin:e}=this.getProps();(e||this.constraints)&&this.startAnimation({x:0,y:0})},{dragSnapToOrigin:l}=this.getProps();this.panSession=new Td(e,{onSessionStart:i,onStart:a,onMove:o,onSessionEnd:s,resumeAnimation:c},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:l,distanceThreshold:n,contextWindow:Sd(this.visualElement),element:this.visualElement.current})}stop(e,t){let n=e||this.latestPointerEvent,r=t||this.latestPanInfo,i=this.isDragging;if(this.cancel(),!i||!r||!n)return;let{velocity:a}=r;this.startAnimation(a);let{onDragEnd:o}=this.getProps();o&&k.postRender(()=>o(n,r))}cancel(){this.isDragging=!1;let{projection:e,animationState:t}=this.visualElement;e&&(e.isAnimationBlocked=!1),this.endPanSession();let{dragPropagation:n}=this.getProps();!n&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),t&&t.setActive(`whileDrag`,!1)}endPanSession(){this.panSession&&this.panSession.end(),this.panSession=void 0}updateAxis(e,t,n){let{drag:r}=this.getProps();if(!n||!Kd(e,r,this.currentDirection))return;let i=this.getAxisMotionValue(e),a=this.originPoint[e]+n[e];this.constraints&&this.constraints[e]&&(a=Md(a,this.constraints[e],this.elastic[e])),i.set(a)}resolveConstraints(){let{dragConstraints:e,dragElastic:t}=this.getProps(),n=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):this.visualElement.projection?.layout,r=this.constraints;e&&od(e)?this.constraints||=this.resolveRefConstraints():e&&n?this.constraints=Pd(n.layoutBox,e):this.constraints=!1,this.elastic=zd(t),r!==this.constraints&&!od(e)&&n&&this.constraints&&!this.hasMutatedConstraints&&_l(e=>{this.constraints!==!1&&this.getAxisMotionValue(e)&&(this.constraints[e]=J(n.layoutBox[e],this.constraints[e]))})}resolveRefConstraints(){let{dragConstraints:e,onMeasureDragConstraints:t}=this.getProps();if(!e||!od(e))return!1;let n=e.current,{projection:r}=this.visualElement;if(!r||!r.layout)return!1;let i=cc(n,r.root,this.visualElement.getTransformPagePoint()),a=Id(r.layout.layoutBox,i);if(t){let e=t(Us(a));this.hasMutatedConstraints=!!e,e&&(a=Hs(e))}return a}startAnimation(e){let{drag:t,dragMomentum:n,dragElastic:r,dragTransition:i,dragSnapToOrigin:a,onDragTransitionEnd:o}=this.getProps(),s=this.constraints||{},c=_l(o=>{if(!Kd(o,t,this.currentDirection))return;let c=s&&s[o]||{};(a===!0||a===o)&&(c={min:0,max:0});let l=r?200:1e6,u=r?40:1e7,d={type:`inertia`,velocity:n?e[o]:0,bounceStiffness:l,bounceDamping:u,timeConstant:750,restDelta:1,restSpeed:10,...i,...c};return this.startAxisValueAnimation(o,d)});return Promise.all(c).then(o)}startAxisValueAnimation(e,t){let n=this.getAxisMotionValue(e);return ao(this.visualElement,e),n.start(Ua(e,n,0,t,this.visualElement,!1))}stopAnimation(){_l(e=>this.getAxisMotionValue(e).stop())}getAxisMotionValue(e){let t=`_drag${e.toUpperCase()}`,n=this.visualElement.getProps();return n[t]||this.visualElement.getValue(e,(n.initial?n.initial[e]:void 0)||0)}snapToCursor(e){_l(t=>{let{drag:n}=this.getProps();if(!Kd(t,n,this.currentDirection))return;let{projection:r}=this.visualElement,i=this.getAxisMotionValue(t);if(r&&r.layout){let{min:n,max:a}=r.layout.layoutBox[t],o=i.get()||0;i.set(e[t]-j(n,a,.5)+o)}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;let{drag:e,dragConstraints:t}=this.getProps(),{projection:n}=this.visualElement;if(!od(t)||!n||!this.constraints)return;this.stopAnimation();let r={x:0,y:0};_l(e=>{let t=this.getAxisMotionValue(e);if(t&&this.constraints!==!1){let n=t.get();r[e]=Ld({min:n,max:n},this.constraints[e])}});let{transformTemplate:i}=this.visualElement.getProps();this.visualElement.current.style.transform=i?i({},``):`none`,n.root&&n.root.updateScroll(),n.updateLayout(),this.constraints=!1,this.resolveConstraints(),_l(t=>{if(!Kd(t,e,null))return;let n=this.getAxisMotionValue(t),{min:i,max:a}=this.constraints[t];n.set(j(i,a,r[t]))}),this.visualElement.render()}addListeners(){if(!this.visualElement.current)return;Hd.set(this.visualElement,this);let e=this.visualElement.current,t=xd(e,`pointerdown`,t=>{let{drag:n,dragListener:r=!0}=this.getProps(),i=t.target,a=i!==e&&qo(i);n&&r&&!a&&this.start(t)}),n,r=()=>{let{dragConstraints:t}=this.getProps();od(t)&&t.current&&(this.constraints=this.resolveRefConstraints(),n||=Gd(e,t.current,()=>this.scalePositionWithinConstraints()))},{projection:i}=this.visualElement,a=i.addEventListener(`measure`,r);i&&!i.layout&&(i.root&&i.root.updateScroll(),i.updateLayout()),k.read(r);let o=kl(window,`resize`,()=>this.scalePositionWithinConstraints()),s=i.addEventListener(`didUpdate`,(({delta:e,hasLayoutChanged:t})=>{this.isDragging&&t&&(_l(t=>{let n=this.getAxisMotionValue(t);n&&(this.originPoint[t]+=e[t].translate,n.set(n.get()+e[t].translate))}),this.visualElement.render())}));return()=>{o(),t(),a(),s&&s(),n&&n()}}getProps(){let e=this.visualElement.getProps(),{drag:t=!1,dragDirectionLock:n=!1,dragPropagation:r=!1,dragConstraints:i=!1,dragElastic:a=Rd,dragMomentum:o=!0}=e;return{...e,drag:t,dragDirectionLock:n,dragPropagation:r,dragConstraints:i,dragElastic:a,dragMomentum:o}}};function Wd(e){let t=!0;return()=>{if(t){t=!1;return}e()}}function Gd(e,t,n){let r=hs(e,Wd(n)),i=hs(t,Wd(n));return()=>{r(),i()}}function Kd(e,t,n){return(t===!0||t===e)&&(n===null||n===e)}function qd(e,t=10){let n=null;return Math.abs(e.y)>t?n=`y`:Math.abs(e.x)>t&&(n=`x`),n}var Jd=class extends Vs{constructor(e){super(e),this.removeGroupControls=en,this.removeListeners=en,this.controls=new Ud(e)}mount(){let{dragControls:e}=this.node.getProps();e&&(this.removeGroupControls=e.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||en}update(){let{dragControls:e}=this.node.getProps(),{dragControls:t}=this.node.prevProps||{};e!==t&&(this.removeGroupControls(),e&&(this.removeGroupControls=e.subscribe(this.controls)))}unmount(){this.removeGroupControls(),this.removeListeners(),this.controls.isDragging||this.controls.endPanSession()}},Yd=e=>(t,n)=>{e&&k.update(()=>e(t,n),!1,!0)},Xd=class extends Vs{constructor(){super(...arguments),this.removePointerDownListener=en}onPointerDown(e){this.session=new Td(e,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:Sd(this.node)})}createPanHandlers(){let{onPanSessionStart:e,onPanStart:t,onPan:n,onPanEnd:r}=this.node.getProps();return{onSessionStart:Yd(e),onStart:Yd(t),onMove:Yd(n),onEnd:(e,t)=>{delete this.session,r&&k.postRender(()=>r(e,t))}}}mount(){this.removePointerDownListener=xd(this.node.current,`pointerdown`,e=>this.onPointerDown(e))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}},Zd=!1,Qd=class extends b.Component{componentDidMount(){let{visualElement:e,layoutGroup:t,switchLayoutGroup:n,layoutId:r}=this.props,{projection:i}=e;i&&(t.group&&t.group.add(i),n&&n.register&&r&&n.register(i),Zd&&i.root.didUpdate(),i.addEventListener(`animationComplete`,()=>{this.safeToRemove()}),i.setOptions({...i.options,layoutDependency:this.props.layoutDependency,onExitComplete:()=>this.safeToRemove()})),Fl.hasEverUpdated=!0}getSnapshotBeforeUpdate(e){let{layoutDependency:t,visualElement:n,drag:r,isPresent:i}=this.props,{projection:a}=n;return a?(a.isPresent=i,e.layoutDependency!==t&&a.setOptions({...a.options,layoutDependency:t}),Zd=!0,r||e.layoutDependency!==t||t===void 0||e.isPresent!==i?a.willUpdate():this.safeToRemove(),e.isPresent!==i&&(i?a.promote():a.relegate()||k.postRender(()=>{let e=a.getStack();(!e||!e.members.length)&&this.safeToRemove()})),null):null}componentDidUpdate(){let{visualElement:e,layoutAnchor:t}=this.props,{projection:n}=e;n&&(n.options.layoutAnchor=t,n.root.didUpdate(),Fo.postRender(()=>{!n.currentAnimation&&n.isLead()&&this.safeToRemove()}))}componentWillUnmount(){let{visualElement:e,layoutGroup:t,switchLayoutGroup:n}=this.props,{projection:r}=e;Zd=!0,r&&(r.scheduleCheckAfterUnmount(),t&&t.group&&t.group.remove(r),n&&n.deregister&&n.deregister(r))}safeToRemove(){let{safeToRemove:e}=this.props;e&&e()}render(){return null}};function $d(e){let[t,n]=xu(),r=(0,b.useContext)(Ht);return(0,G.jsx)(Qd,{...e,layoutGroup:r,switchLayoutGroup:(0,b.useContext)(ad),isPresent:t,safeToRemove:n})}var ef={pan:{Feature:Xd},drag:{Feature:Jd,ProjectionNode:fu,MeasureLayout:$d}};function tf(e,t,n){let{props:r}=e;e.animationState&&r.whileHover&&e.animationState.setActive(`whileHover`,n===`Start`);let i=r[`onHover`+n];i&&k.postRender(()=>i(t,yd(t)))}var nf=class extends Vs{mount(){let{current:e}=this.node;e&&(this.unmount=Vo(e,(e,t)=>(tf(this.node,t,`Start`),e=>tf(this.node,e,`End`))))}unmount(){}},rf=class extends Vs{constructor(){super(...arguments),this.isActive=!1}onFocus(){let e=!1;try{e=this.node.current.matches(`:focus-visible`)}catch{e=!0}!e||!this.node.animationState||(this.node.animationState.setActive(`whileFocus`,!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive(`whileFocus`,!1),this.isActive=!1)}mount(){this.unmount=nn(kl(this.node.current,`focus`,()=>this.onFocus()),kl(this.node.current,`blur`,()=>this.onBlur()))}unmount(){}};function af(e,t,n){let{props:r}=e;if(e.current instanceof HTMLButtonElement&&e.current.disabled)return;e.animationState&&r.whileTap&&e.animationState.setActive(`whileTap`,n===`Start`);let i=r[`onTap`+(n===`End`?``:n)];i&&k.postRender(()=>i(t,yd(t)))}var of=class extends Vs{mount(){let{current:e}=this.node;if(!e)return;let{globalTapTarget:t,propagate:n}=this.node.props;this.unmount=es(e,(e,t)=>(af(this.node,t,`Start`),(e,{success:t})=>af(this.node,e,t?`End`:`Cancel`)),{useGlobalTarget:t,stopPropagation:n?.tap===!1})}unmount(){}},sf=new WeakMap,cf=new WeakMap,lf=e=>{let t=sf.get(e.target);t&&t(e)},uf=e=>{e.forEach(lf)};function df({root:e,...t}){let n=e||document;cf.has(n)||cf.set(n,{});let r=cf.get(n),i=JSON.stringify(t);return r[i]||(r[i]=new IntersectionObserver(uf,{root:e,...t})),r[i]}function ff(e,t,n){let r=df(t);return sf.set(e,n),r.observe(e),()=>{sf.delete(e),r.unobserve(e)}}var pf={some:0,all:1},mf=class extends Vs{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){this.stopObserver?.();let{viewport:e={}}=this.node.getProps(),{root:t,margin:n,amount:r=`some`,once:i}=e,a={root:t?t.current:void 0,rootMargin:n,threshold:typeof r==`number`?r:pf[r]};this.stopObserver=ff(this.node.current,a,e=>{let{isIntersecting:t}=e;if(this.isInView===t||(this.isInView=t,i&&!t&&this.hasEnteredView))return;t&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive(`whileInView`,t);let{onViewportEnter:n,onViewportLeave:r}=this.node.getProps(),a=t?n:r;a&&a(e)})}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>`u`)return;let{props:e,prevProps:t}=this.node;[`amount`,`margin`,`root`].some(hf(e,t))&&this.startObserver()}unmount(){this.stopObserver?.(),this.hasEnteredView=!1,this.isInView=!1}};function hf({viewport:e={}},{viewport:t={}}={}){return n=>e[n]!==t[n]}var gf={inView:{Feature:mf},tap:{Feature:of},focus:{Feature:rf},hover:{Feature:nf}},_f={layout:{ProjectionNode:fu,MeasureLayout:$d}},Y=md({...vd,...gf,...ef,..._f},hd),vf={some:0,all:1};function yf(e,t,{root:n,margin:r,amount:i=`some`}={}){let a=Mo(e),o=new WeakMap,s=new IntersectionObserver(e=>{e.forEach(e=>{let n=o.get(e.target);if(e.isIntersecting!==!!n)if(e.isIntersecting){let n=t(e.target,e);typeof n==`function`?o.set(e.target,n):s.unobserve(e.target)}else typeof n==`function`&&(n(e),o.delete(e.target))})},{root:n,rootMargin:r,threshold:typeof i==`number`?i:vf[i]});return a.forEach(e=>s.observe(e)),()=>s.disconnect()}function bf(e,{root:t,margin:n,amount:r,once:i=!1,initial:a=!1}={}){let[o,s]=(0,b.useState)(a);return(0,b.useEffect)(()=>{if(!e.current||i&&o)return;let a=()=>(s(!0),i?void 0:()=>s(!1)),c={root:t&&t.current||void 0,margin:n,amount:r};return yf(e.current,a,c)},[t,e,n,i,r]),o}var xf=`919499944939`,Sf={"/":`Be my hands and eyes for my parents. How can we work together for them?`,"/subscription":`I want the best for my parents. Help me manage their daily care as a team.`,"/about":`I want to learn more about 60Plus India and how you can help my parents.`,"/contact":`I'd like to reach out to your team. How can we work together for my parents?`,"/privacy-policy":`I'd like to know more about how you protect my parents' data and privacy.`,"/terms-and-conditions":`I'd like to review the terms before subscribing for my parents.`,"subscription-popup":`Hi, I'm interested in the 60Plus Premium Plan. Could you share more details and guide me on the next steps?`,"monthly-doctor-visit":`Help me monitor my parents' health at home. Let's keep them healthy together.`,"24-7-emergency-call":`Be my local safety net. Please help my parents for me if they face a crisis.`,"24-7-companion":`I don't want them to be lonely. Be my proxy for their daily company and care.`,"monthly-care-executive-visit":`Visit my parents' home for me. Help me check if they are safe and happy.`,"integrated-senior-health-index":`Let's track my parents' health in one place. Help me see how they are doing.`,"senior-home-safety-assessment":`Help me check my parents' home and make it safer for me. I worry about falls.`,"digitalization-of-medical-records":`Help me organize my parents' medical history. I need to see it with your help.`,"voice-reminder-for-parents":`Help me remind my parents about their daily routine. Let's work together.`,"daily-updates-to-children":`Give me daily updates on my parents for me. I want to feel close to them.`,"free-online-community":`Help my parents stay social online. Let's work together to keep them happy.`,"audiologist-home-visit":`Help me look after my parents' hearing. Visit them at home for me.`,"medicine-delivery":`Manage my parents' medicines with me. Let's ensure they never miss a dose.`,"senior-citizen-insurance-assessment":`Help me check my parents' insurance. Let's work together to protect them.`,"velai-consultation":`Help me find a purpose for my parents. Let's keep them active together.`,"trip-consultation":`Help me plan a safe trip for my parents. Be my support while they travel.`,"nutrition-consultation":`Help me plan my parents' meals. Let's make sure they stay strong together.`,"on-demand-services":`Be my hands for my parents' daily chores. Help me get their errands done.`,"complimentary-products":`Help me give my parents useful gifts. Let's provide them comfort together.`,"blood-test":`Help me arrange tests for my parents at home. Let's watch their health together.`,"offline-events":`Help my parents make friends. Please include them in your meetups for me.`,"gait-analysis":`Help me check my parents' walking balance. I need your eyes on their safety.`};function Cf(e){let t=Sf[e.replace(/^\/services\//,``)]||Sf[`/`];return`https://wa.me/${xf}?text=${encodeURIComponent(t)}`}var wf=[`Home`,`Services`,`Testimonials`,`About Us`,`Contact Us`];function Tf({alwaysWhite:e=!1}){let[t,n]=(0,b.useState)(!1),[r,i]=(0,b.useState)(!1),[a,o]=(0,b.useState)(!1),[s,c]=(0,b.useState)({name:``,mobile:``}),[l,u]=(0,b.useState)(!1),d=Qe(),f=Xe(),p=()=>{d(`/book-free-senior-home-safety-assessment`),n(!1)},m=e=>{let{name:t,value:n}=e.target;c(e=>({...e,[t]:n}))},h=e=>{if(e.preventDefault(),!s.name.trim()||!s.mobile.trim()){alert(`Please fill in both name and mobile number`);return}if(!/^[0-9]{10,15}$/.test(s.mobile)){alert(`Please enter a valid mobile number`);return}u(!0)},g=()=>{o(!1),u(!1),c({name:``,mobile:``}),n(!1)};(0,b.useEffect)(()=>{let e=()=>i(window.scrollY>24);return window.addEventListener(`scroll`,e),()=>window.removeEventListener(`scroll`,e)},[]);let _=e=>{let t=e===`services`?`services-cards`:e,r=document.getElementById(t);if(r){let e=r.getBoundingClientRect().top+window.scrollY-76;window.scrollTo({top:e,behavior:`smooth`})}else d(`/`),sessionStorage.setItem(`scrollTo`,t);n(!1)};return(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(`style`,{children:`
        :root {
          --cta: linear-gradient(94deg, #8235d0 -2.32%, #5f308e 99.71%);
          --purple: #8235d0;
          --nav-h: 76px;
          --fb: 'Nunito Sans', sans-serif;
        }

        .nav {
          position: fixed;
          inset: 0 0 auto 0;
          z-index: 1000;
          height: var(--nav-h);
          display: flex;
          align-items: center;
          padding: 0 clamp(18px, 5vw, 72px);
          transition: background 0.4s, box-shadow 0.4s;
          box-sizing: border-box;
        }
        .nav.top { background: transparent; }
        .nav.scrolled {
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: 0 1px 0 rgba(130,53,208,0.14);
        }

        .nav-inner {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .nav-logo-img {
          height: 40px;
          width: auto;
          object-fit: contain;
          display: block;
        }
        .nav-logo-sep {
          width: 1px;
          height: 28px;
          background: rgba(255,255,255,0.45);
          flex-shrink: 0;
          transition: background 0.3s;
        }
        .nav.scrolled .nav-logo-sep,
        .nav.always-white .nav-logo-sep {
          background: rgba(130,53,208,0.2);
        }

        .nav-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-links a {
          font-family: var(--fb);
          font-size: 15px;
          font-weight: 700;
          color: #1a0a2e;
          text-decoration: none;
          letter-spacing: 0.2px;
          position: relative;
          transition: color 0.2s;
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--cta);
          border-radius: 2px;
          transition: width 0.26s ease;
        }
        .nav-links a:hover::after { width: 100%; }

        .btn-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 11px 26px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          font-family: var(--fb);
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.4px;
          color: #fff !important;
          -webkit-text-fill-color: #fff !important;
          background: var(--cta) !important;
          text-decoration: none;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s;
          box-sizing: border-box;
        }
        .btn-cta:hover { transform: translateY(-2px); }
        .btn-cta:active { transform: translateY(0); }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 6px;
          background: none;
          border: none;
          flex-shrink: 0;
        }
        .hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: #1a0a2e;
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
          transform-origin: center;
        }
        .nav.scrolled .hamburger span,
        .nav.always-white .hamburger span { background: #2d1060; }

        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── Mobile drawer ── */
        .mob-menu {
          position: fixed;
          top: var(--nav-h);
          left: 0;
          right: 0;
          box-sizing: border-box;
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 999;
          padding: 20px 20px 28px 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          border-bottom: 1px solid rgba(130,53,208,0.15);
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
        }
        .mob-menu a {
          font-family: var(--fb);
          font-size: 17px;
          font-weight: 700;
          color: #2d1060;
          text-decoration: none;
          padding: 12px 4px;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          transition: color 0.2s;
          display: block;
          box-sizing: border-box;
          width: 100%;
        }
        .mob-menu a:hover { color: var(--purple); }

        /* Dedicated mobile Subscribe button - separate from .btn-cta to avoid conflicts */
        .mob-sub-btn {
          margin-top: 14px;
          display: block;
          width: 100%;
          box-sizing: border-box;
          padding: 14px 20px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          font-family: var(--fb);
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.4px;
          color: #fff !important;
          -webkit-text-fill-color: #fff !important;
          background: linear-gradient(94deg, #8235d0 -2.32%, #5f308e 99.71%);
          text-decoration: none;
          text-align: center;
          transition: transform 0.2s;
        }
        .mob-sub-btn:hover { transform: translateY(-2px); }

        /* ── Breakpoints ── */
        @media (max-width: 768px) {
          .nav-inner {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .nav-links    { display: none !important; }
          .nav-cta-desk { display: none !important; }
          .hamburger    { display: flex !important; }
        }

        @media (min-width: 769px) {
          .hamburger    { display: none !important; }
          .nav-links    { display: flex !important; }
          .nav-cta-desk { display: inline-flex !important; }
        }

        /* SUBSCRIPTION POPUP */
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .popup-content {
          background: white;
          border-radius: 16px;
          padding: 32px;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }

        .popup-close {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f8f5ff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8235d0;
          font-weight: bold;
          font-size: 16px;
          transition: all 0.2s ease;
        }

        .popup-close:hover {
          background: #8235d0;
          color: white;
        }

        .subscribe-form h3 {
          font-family: "Gambarino", serif;
          font-size: 24px;
          color: #1a0a2e;
          margin: 0 0 4px;
          text-align: center;
          font-weight: 500;
        }

        .subscribe-form .subtitle {
          text-align: center;
          color: rgba(26, 10, 46, 0.6);
          font-size: 14px;
          margin-bottom: 24px;
          font-weight: 500;
        }

        .form-group {
          margin-bottom: 20px;
          position: relative;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #1a0a2e;
          margin-bottom: 8px;
        }

        .form-group input {
          width: 100%;
          padding: 14px 14px 14px 44px;
          border: 2px solid rgba(26,10,46,0.1);
          border-radius: 12px;
          font-size: 15px;
          font-family: 'Nunito Sans', sans-serif;
          color: #1a0a2e;
          box-sizing: border-box;
          transition: all 0.2s ease;
          background: #fafafa;
        }

        .form-group input:focus {
          outline: none;
          border-color: #8235d0;
          background: white;
        }

        .form-group input::placeholder {
          color: rgba(26,10,46,0.4);
        }

        .form-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #8235d0;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 4px;
        }

        .submit-btn, .cancel-btn {
          flex: 1;
          padding: 14px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          border: none;
          font-family: 'Nunito Sans', sans-serif;
          transition: all 0.2s ease;
        }

        .submit-btn {
          background: linear-gradient(94deg, #8235d0, #5f308e);
          color: white;
        }

        .submit-btn:hover {
          background: linear-gradient(94deg, #7a2bc4, #562aa0);
        }

        .cancel-btn {
          background: #f8f5ff;
          color: #8235d0;
          border: 2px solid rgba(130, 53, 208, 0.2);
        }

        .cancel-btn:hover {
          background: #f0e6ff;
        }

        .success-content {
          text-align: center;
          padding-top: 6px;
        }

        .success-content .success-icon {
          width: 50px;
          height: 50px;
          background: #e8f5e9;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: #4caf50;
        }

        .success-content h3 {
          font-family: "Gambarino", serif;
          font-size: 24px;
          color: #1a0a2e;
          margin: 0 0 10px;
          font-weight: 500;
        }

        .success-content p {
          font-size: 15px;
          color: #1a0a2e;
          margin: 0 0 24px;
          line-height: 1.5;
          font-weight: 500;
        }

        .whatsapp-support {
          margin: 24px 0;
        }

        .whatsapp-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 28px;
          background: #25D366;
          color: white;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 15px;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
        }

        .whatsapp-btn:hover {
          background: #128C7E;
        }

        .payment-note {
          background: #f8f9fa;
          padding: 12px;
          border-radius: 8px;
          font-size: 13px;
          color: #666;
          margin: 24px 0;
          font-style: italic;
          border: 1px solid #e0e0e0;
        }

        .close-btn {
          padding: 12px 28px;
          background: #8235d0;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          cursor: pointer;
          margin-top: 12px;
          font-weight: 700;
          transition: all 0.2s ease;
        }

        .close-btn:hover {
          background: #7a2bc4;
        }

        @media (max-width: 768px) {
          .popup-content {
            margin: 20px;
            padding: 28px 20px;
          }

          .form-actions {
            flex-direction: column;
          }

          .whatsapp-btn {
            width: 100%;
          }
        }
      `}),(0,G.jsx)(Y.nav,{className:`nav ${r||e?`scrolled`:`top`}${e?` always-white`:``}`,initial:{y:-76,opacity:0},animate:{y:0,opacity:1},transition:{duration:.55,ease:[.22,1,.36,1]},children:(0,G.jsxs)(`div`,{className:`nav-inner`,children:[(0,G.jsxs)(`a`,{href:`/`,className:`nav-logo`,"aria-label":`ITEL and 60 Plus`,children:[(0,G.jsx)(`img`,{src:`/logo/60_plus_india.png`,alt:`60 Plus`,className:`nav-logo-img`}),(0,G.jsx)(`span`,{className:`nav-logo-sep`}),(0,G.jsx)(`img`,{src:`/logo/ITEL_LOGO.png`,alt:`ITEL`,className:`nav-logo-img`})]}),(0,G.jsx)(`ul`,{className:`nav-links`,children:wf.map(e=>(0,G.jsx)(`li`,{children:e===`About Us`?(0,G.jsx)(It,{to:`/about`,onClick:()=>n(!1),children:e}):e===`Contact Us`?(0,G.jsx)(It,{to:`/contact`,onClick:()=>n(!1),children:e}):(0,G.jsx)(`a`,{href:`#`,onClick:t=>{t.preventDefault(),_(e.toLowerCase())},children:e})},e))}),!f.pathname.includes(`book-free-senior-home-safety-assessment`)&&(0,G.jsx)(`button`,{onClick:p,className:`btn-cta nav-cta-desk`,children:`Book Free Assessment`}),(0,G.jsxs)(`button`,{className:`hamburger${t?` open`:``}`,onClick:()=>n(e=>!e),"aria-label":`Toggle menu`,children:[(0,G.jsx)(`span`,{}),(0,G.jsx)(`span`,{}),(0,G.jsx)(`span`,{})]})]})}),(0,G.jsx)(wu,{children:t&&(0,G.jsxs)(Y.div,{className:`mob-menu`,initial:{opacity:0,y:-14},animate:{opacity:1,y:0},exit:{opacity:0,y:-14},transition:{duration:.22},children:[wf.map(e=>e===`About Us`?(0,G.jsx)(It,{to:`/about`,onClick:()=>n(!1),children:e},e):e===`Contact Us`?(0,G.jsx)(It,{to:`/contact`,onClick:()=>n(!1),children:e},e):(0,G.jsx)(`a`,{href:`#`,onClick:t=>{t.preventDefault(),_(e.toLowerCase())},children:e},e)),!f.pathname.includes(`book-free-senior-home-safety-assessment`)&&(0,G.jsx)(`button`,{className:`mob-sub-btn`,onClick:p,children:`Book Free Assessment`})]})}),a&&(0,G.jsx)(`div`,{className:`popup-overlay`,onClick:g,children:(0,G.jsxs)(`div`,{className:`popup-content`,onClick:e=>e.stopPropagation(),children:[(0,G.jsx)(`button`,{className:`popup-close`,onClick:g,children:`×`}),l?(0,G.jsxs)(`div`,{className:`success-content`,children:[(0,G.jsx)(`div`,{className:`success-icon`,children:(0,G.jsxs)(`svg`,{width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:[(0,G.jsx)(`path`,{d:`M22 11.08V12a10 10 0 1 1-5.93-9.14`}),(0,G.jsx)(`polyline`,{points:`22,4 12,14.01 9,11.01`})]})}),(0,G.jsx)(`h3`,{children:`Thank You!`}),(0,G.jsx)(`p`,{children:`Our team will contact you within 24 hours.`}),(0,G.jsx)(`div`,{className:`whatsapp-support`,children:(0,G.jsxs)(`a`,{href:Cf(f.pathname),target:`_blank`,rel:`noopener noreferrer`,className:`whatsapp-btn`,children:[(0,G.jsx)(`svg`,{width:`20`,height:`20`,viewBox:`0 0 24 24`,fill:`currentColor`,children:(0,G.jsx)(`path`,{d:`M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.386`})}),`Contact us for 24/7 Support`]})}),(0,G.jsx)(`div`,{className:`payment-note`,children:`We're working on the payment process`})]}):(0,G.jsxs)(`div`,{className:`subscribe-form`,children:[(0,G.jsx)(`h3`,{children:`Subscribe to Our Service`}),(0,G.jsx)(`p`,{className:`subtitle`,children:`Fill in your details and our team will contact you shortly`}),(0,G.jsxs)(`form`,{onSubmit:h,children:[(0,G.jsxs)(`div`,{className:`form-group`,children:[(0,G.jsx)(`label`,{htmlFor:`name`,children:`Full Name`}),(0,G.jsxs)(`div`,{style:{position:`relative`},children:[(0,G.jsxs)(`svg`,{className:`form-icon`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:[(0,G.jsx)(`path`,{d:`M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2`}),(0,G.jsx)(`circle`,{cx:`12`,cy:`7`,r:`4`})]}),(0,G.jsx)(`input`,{type:`text`,id:`name`,name:`name`,value:s.name,onChange:m,placeholder:`Enter your full name`,required:!0})]})]}),(0,G.jsxs)(`div`,{className:`form-group`,children:[(0,G.jsx)(`label`,{htmlFor:`mobile`,children:`Mobile Number`}),(0,G.jsxs)(`div`,{style:{position:`relative`},children:[(0,G.jsxs)(`svg`,{className:`form-icon`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:[(0,G.jsx)(`rect`,{x:`5`,y:`2`,width:`14`,height:`20`,rx:`2`,ry:`2`}),(0,G.jsx)(`path`,{d:`M12 18h.01`})]}),(0,G.jsx)(`input`,{type:`tel`,id:`mobile`,name:`mobile`,value:s.mobile,onChange:m,placeholder:`Enter your mobile number`,required:!0})]})]}),(0,G.jsxs)(`div`,{className:`form-actions`,children:[(0,G.jsx)(`button`,{type:`submit`,className:`submit-btn`,children:`Submit`}),(0,G.jsx)(`button`,{type:`button`,className:`cancel-btn`,onClick:g,children:`Cancel`})]})]})]})]})})]})}var Ef=(...e)=>e.filter((e,t,n)=>!!e&&e.trim()!==``&&n.indexOf(e)===t).join(` `).trim(),Df=e=>e.replace(/([a-z0-9])([A-Z])/g,`$1-$2`).toLowerCase(),Of=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase()),kf=e=>{let t=Of(e);return t.charAt(0).toUpperCase()+t.slice(1)},Af={xmlns:`http://www.w3.org/2000/svg`,width:24,height:24,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`},jf=e=>{for(let t in e)if(t.startsWith(`aria-`)||t===`role`||t===`title`)return!0;return!1},Mf=(0,b.createContext)({}),Nf=()=>(0,b.useContext)(Mf),Pf=(0,b.forwardRef)(({color:e,size:t,strokeWidth:n,absoluteStrokeWidth:r,className:i=``,children:a,iconNode:o,...s},c)=>{let{size:l=24,strokeWidth:u=2,absoluteStrokeWidth:d=!1,color:f=`currentColor`,className:p=``}=Nf()??{},m=r??d?Number(n??u)*24/Number(t??l):n??u;return(0,b.createElement)(`svg`,{ref:c,...Af,width:t??l??Af.width,height:t??l??Af.height,stroke:e??f,strokeWidth:m,className:Ef(`lucide`,p,i),...!a&&!jf(s)&&{"aria-hidden":`true`},...s},[...o.map(([e,t])=>(0,b.createElement)(e,t)),...Array.isArray(a)?a:[a]])}),X=(e,t)=>{let n=(0,b.forwardRef)(({className:n,...r},i)=>(0,b.createElement)(Pf,{ref:i,iconNode:t,className:Ef(`lucide-${Df(kf(e))}`,`lucide-${e}`,n),...r}));return n.displayName=kf(e),n},Ff=X(`activity`,[[`path`,{d:`M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2`,key:`169zse`}]]),If=X(`apple`,[[`path`,{d:`M12 6.528V3a1 1 0 0 1 1-1h0`,key:`11qiee`}],[`path`,{d:`M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21`,key:`110c12`}]]),Lf=X(`arrow-right`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`m12 5 7 7-7 7`,key:`xquz4c`}]]),Rf=X(`bed`,[[`path`,{d:`M2 4v16`,key:`vw9hq8`}],[`path`,{d:`M2 8h18a2 2 0 0 1 2 2v10`,key:`1dgv2r`}],[`path`,{d:`M2 17h20`,key:`18nfp3`}],[`path`,{d:`M6 8v9`,key:`1yriud`}]]),zf=X(`bell`,[[`path`,{d:`M10.268 21a2 2 0 0 0 3.464 0`,key:`vwvbt9`}],[`path`,{d:`M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326`,key:`11g9vi`}]]),Bf=X(`briefcase`,[[`path`,{d:`M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16`,key:`jecpp`}],[`rect`,{width:`20`,height:`14`,x:`2`,y:`6`,rx:`2`,key:`i6l2r4`}]]),Vf=X(`cable`,[[`path`,{d:`M17 19a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1z`,key:`trhst0`}],[`path`,{d:`M17 21v-2`,key:`ds4u3f`}],[`path`,{d:`M19 14V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V10`,key:`1mo9zo`}],[`path`,{d:`M21 21v-2`,key:`eo0ou`}],[`path`,{d:`M3 5V3`,key:`1k5hjh`}],[`path`,{d:`M4 10a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2z`,key:`1dd30t`}],[`path`,{d:`M7 5V3`,key:`1t1388`}]]),Hf=X(`calendar`,[[`path`,{d:`M8 2v4`,key:`1cmpym`}],[`path`,{d:`M16 2v4`,key:`4m81vk`}],[`rect`,{width:`18`,height:`18`,x:`3`,y:`4`,rx:`2`,key:`1hopcy`}],[`path`,{d:`M3 10h18`,key:`8toen8`}]]),Uf=X(`chef-hat`,[[`path`,{d:`M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z`,key:`1qvrer`}],[`path`,{d:`M6 17h12`,key:`1jwigz`}]]),Wf=X(`chevron-down`,[[`path`,{d:`m6 9 6 6 6-6`,key:`qrunsl`}]]),Gf=X(`chevron-left`,[[`path`,{d:`m15 18-6-6 6-6`,key:`1wnfg3`}]]),Kf=X(`chevron-right`,[[`path`,{d:`m9 18 6-6-6-6`,key:`mthhwq`}]]),qf=X(`circle-check-big`,[[`path`,{d:`M21.801 10A10 10 0 1 1 17 3.335`,key:`yps3ct`}],[`path`,{d:`m9 11 3 3L22 4`,key:`1pflzl`}]]),Jf=X(`clipboard-list`,[[`rect`,{width:`8`,height:`4`,x:`8`,y:`2`,rx:`1`,ry:`1`,key:`tgr4d6`}],[`path`,{d:`M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2`,key:`116196`}],[`path`,{d:`M12 11h4`,key:`1jrz19`}],[`path`,{d:`M12 16h4`,key:`n85exb`}],[`path`,{d:`M8 11h.01`,key:`1dfujw`}],[`path`,{d:`M8 16h.01`,key:`18s6g9`}]]),Yf=X(`clock`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M12 6v6l4 2`,key:`mmk7yg`}]]),Xf=X(`door-open`,[[`path`,{d:`M11 20H2`,key:`nlcfvz`}],[`path`,{d:`M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z`,key:`au4z13`}],[`path`,{d:`M11 4H8a2 2 0 0 0-2 2v14`,key:`74r1mk`}],[`path`,{d:`M14 12h.01`,key:`1jfl7z`}],[`path`,{d:`M22 20h-3`,key:`vhrsz`}]]),Zf=X(`droplets`,[[`path`,{d:`M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z`,key:`1ptgy4`}],[`path`,{d:`M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97`,key:`1sl1rz`}]]),Qf=X(`ear`,[[`path`,{d:`M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0`,key:`1dfaln`}],[`path`,{d:`M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4`,key:`1qnva7`}]]),$f=X(`file-text`,[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`,key:`wfsgrz`}],[`path`,{d:`M10 9H8`,key:`b1mrlr`}],[`path`,{d:`M16 13H8`,key:`t4e002`}],[`path`,{d:`M16 17H8`,key:`z1uh3a`}]]),ep=X(`footprints`,[[`path`,{d:`M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z`,key:`1dudjm`}],[`path`,{d:`M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z`,key:`l2t8xc`}],[`path`,{d:`M16 17h4`,key:`1dejxt`}],[`path`,{d:`M4 13h4`,key:`1bwh8b`}]]),tp=X(`gift`,[[`path`,{d:`M12 7v14`,key:`1akyts`}],[`path`,{d:`M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8`,key:`1sqzm4`}],[`path`,{d:`M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5`,key:`kc0143`}],[`rect`,{x:`3`,y:`7`,width:`18`,height:`4`,rx:`1`,key:`1hberx`}]]),np=X(`globe`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20`,key:`13o1zl`}],[`path`,{d:`M2 12h20`,key:`9i4pu4`}]]),rp=X(`heart-pulse`,[[`path`,{d:`M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5`,key:`mvr1a0`}],[`path`,{d:`M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27`,key:`auskq0`}]]),ip=X(`house`,[[`path`,{d:`M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8`,key:`5wwlr5`}],[`path`,{d:`M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z`,key:`r6nss1`}]]),ap=X(`inbox`,[[`polyline`,{points:`22 12 16 12 14 15 10 15 8 12 2 12`,key:`o97t9d`}],[`path`,{d:`M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z`,key:`oot6mr`}]]),op=X(`languages`,[[`path`,{d:`m5 8 6 6`,key:`1wu5hv`}],[`path`,{d:`m4 14 6-6 2-3`,key:`1k1g8d`}],[`path`,{d:`M2 5h12`,key:`or177f`}],[`path`,{d:`M7 2h1`,key:`1t2jsx`}],[`path`,{d:`m22 22-5-10-5 10`,key:`don7ne`}],[`path`,{d:`M14 18h6`,key:`1m8k6r`}]]),sp=X(`layers`,[[`path`,{d:`M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z`,key:`zw3jo`}],[`path`,{d:`M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12`,key:`1wduqc`}],[`path`,{d:`M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17`,key:`kqbvx6`}]]),cp=X(`lightbulb`,[[`path`,{d:`M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5`,key:`1gvzjb`}],[`path`,{d:`M9 18h6`,key:`x1upvd`}],[`path`,{d:`M10 22h4`,key:`ceow96`}]]),lp=X(`lock`,[[`rect`,{width:`18`,height:`11`,x:`3`,y:`11`,rx:`2`,ry:`2`,key:`1w4ew1`}],[`path`,{d:`M7 11V7a5 5 0 0 1 10 0v4`,key:`fwvmzm`}]]),up=X(`map-pin`,[[`path`,{d:`M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0`,key:`1r0f0z`}],[`circle`,{cx:`12`,cy:`10`,r:`3`,key:`ilqhr7`}]]),dp=X(`maximize-2`,[[`path`,{d:`M15 3h6v6`,key:`1q9fwt`}],[`path`,{d:`m21 3-7 7`,key:`1l2asr`}],[`path`,{d:`m3 21 7-7`,key:`tjx5ai`}],[`path`,{d:`M9 21H3v-6`,key:`wtvkvv`}]]),fp=X(`message-circle`,[[`path`,{d:`M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719`,key:`1sd12s`}]]),pp=X(`message-square`,[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`,key:`18887p`}]]),mp=X(`pause`,[[`rect`,{x:`14`,y:`3`,width:`5`,height:`18`,rx:`1`,key:`kaeet6`}],[`rect`,{x:`5`,y:`3`,width:`5`,height:`18`,rx:`1`,key:`1wsw3u`}]]),hp=X(`phone-call`,[[`path`,{d:`M13 2a9 9 0 0 1 9 9`,key:`1itnx2`}],[`path`,{d:`M13 6a5 5 0 0 1 5 5`,key:`11nki7`}],[`path`,{d:`M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384`,key:`9njp5v`}]]),gp=X(`pill`,[[`path`,{d:`m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z`,key:`wa1lgi`}],[`path`,{d:`m8.5 8.5 7 7`,key:`rvfmvr`}]]),_p=X(`plane`,[[`path`,{d:`M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z`,key:`1v9wt8`}]]),vp=X(`play`,[[`path`,{d:`M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z`,key:`10ikf1`}]]),yp=X(`shield-check`,[[`path`,{d:`M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z`,key:`oel41y`}],[`path`,{d:`m9 12 2 2 4-4`,key:`dzmm74`}]]),bp=X(`shield`,[[`path`,{d:`M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z`,key:`oel41y`}]]),xp=X(`smartphone`,[[`rect`,{width:`14`,height:`20`,x:`5`,y:`2`,rx:`2`,ry:`2`,key:`1yt0o3`}],[`path`,{d:`M12 18h.01`,key:`mhygvu`}]]),Sp=X(`stethoscope`,[[`path`,{d:`M11 2v2`,key:`1539x4`}],[`path`,{d:`M5 2v2`,key:`1yf1q8`}],[`path`,{d:`M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1`,key:`rb5t3r`}],[`path`,{d:`M8 15a6 6 0 0 0 12 0v-3`,key:`x18d4x`}],[`circle`,{cx:`20`,cy:`10`,r:`2`,key:`ts1r5v`}]]),Cp=X(`test-tube`,[[`path`,{d:`M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2`,key:`125lnx`}],[`path`,{d:`M8.5 2h7`,key:`csnxdl`}],[`path`,{d:`M14.5 16h-5`,key:`1ox875`}]]),wp=X(`ticket`,[[`path`,{d:`M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z`,key:`qn84l0`}],[`path`,{d:`M13 5v2`,key:`dyzc3o`}],[`path`,{d:`M13 17v2`,key:`1ont0d`}],[`path`,{d:`M13 11v2`,key:`1wjjxi`}]]),Tp=X(`users`,[[`path`,{d:`M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2`,key:`1yyitq`}],[`path`,{d:`M16 3.128a4 4 0 0 1 0 7.744`,key:`16gr8j`}],[`path`,{d:`M22 21v-2a4 4 0 0 0-3-3.87`,key:`kshegd`}],[`circle`,{cx:`9`,cy:`7`,r:`4`,key:`nufk8`}]]),Ep=X(`volume-2`,[[`path`,{d:`M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z`,key:`uqj9uw`}],[`path`,{d:`M16 9a5 5 0 0 1 0 6`,key:`1q6k2b`}],[`path`,{d:`M19.364 18.364a9 9 0 0 0 0-12.728`,key:`ijwkga`}]]),Dp=X(`volume-x`,[[`path`,{d:`M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z`,key:`uqj9uw`}],[`line`,{x1:`22`,x2:`16`,y1:`9`,y2:`15`,key:`1ewh16`}],[`line`,{x1:`16`,x2:`22`,y1:`9`,y2:`15`,key:`5ykzw1`}]]),Op=X(`wrench`,[[`path`,{d:`M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z`,key:`1ngwbx`}]]),kp=X(`x`,[[`path`,{d:`M18 6 6 18`,key:`1bl5f8`}],[`path`,{d:`m6 6 12 12`,key:`d8bk6v`}]]),Ap=X(`zap`,[[`path`,{d:`M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z`,key:`1xq2db`}]]);function jp(){let[e,t]=(0,b.useState)(!0),n=(0,b.useRef)(null),r=Xe(),[i,a]=(0,b.useState)(!1),[o,s]=(0,b.useState)({name:``,mobile:``}),[c,l]=(0,b.useState)(!1),u=Qe(),d=e=>{let{name:t,value:n}=e.target;s(e=>({...e,[t]:n}))},f=e=>{if(e.preventDefault(),!o.name.trim()||!o.mobile.trim()){alert(`Please fill in both name and mobile number`);return}if(!/^[0-9]{10,15}$/.test(o.mobile)){alert(`Please enter a valid mobile number`);return}l(!0)},p=()=>{a(!1),l(!1),s({name:``,mobile:``})};return(0,b.useEffect)(()=>{n.current&&(n.current.muted=e)},[e]),(0,b.useEffect)(()=>{let e=sessionStorage.getItem(`scrollTo`);if(!e)return;sessionStorage.removeItem(`scrollTo`);let t=setTimeout(()=>{let t=document.getElementById(e);if(t){let e=t.getBoundingClientRect().top+window.scrollY-76;window.scrollTo({top:e,behavior:`smooth`})}},120);return()=>clearTimeout(t)},[]),(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(Tf,{}),(0,G.jsx)(`style`,{children:`
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;800&display=swap');

        .hero-view {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: linear-gradient(
            180deg,
            #f4edff 0%,
            #f9f6ff 60%,
            #f3ecff 100%
          );
          display: flex;
          flex-direction: column;
          font-family: 'Nunito Sans', sans-serif;
          padding-top: 80px;
          box-sizing: border-box;
          overflow-x: hidden;
        }

        /* Subtle Purple Wash BG with Parallax */
        .hero-bg-wash {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 85% 15%, rgba(130,53,208,0.10), transparent 40%),
            radial-gradient(circle at 60% 40%, rgba(130,53,208,0.05), transparent 60%),
            linear-gradient(180deg, #f6f0ff 0%, #ffffff 70%);
          z-index: 0;
          pointer-events: none;

          transform: translateY(0); /* needed for animation */
          transition: transform 0.1s linear;
          opacity: 0.9;
        }

        .hero-main-area {
          flex: 1; 
          display: flex;
          align-items: center;
          z-index: 1;
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          align-items: center;
          max-width: 1300px;
          margin: 0 auto;
          width: 100%;
          padding: 0 40px;
          gap: 60px;
        }

        /* Text Styles */
        .hero-content h1 {
          font-family: 'Gambarino', serif;
          font-size: clamp(34px, 4.5vw, 60px);
          line-height: 1.1;
          color: #1a0a2e;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .hero-content h1 span { color: #8235d0; }

        .hero-content p {
          font-size: clamp(16px, 1.2vw, 18px);
          line-height: 1.6;
          color: rgba(26, 10, 46, 0.6);
          margin-bottom: 32px;
          max-width: 500px;
        }

        .btn-cta {
          display: inline-block;
          padding: 16px 44px;
          background: linear-gradient(94deg, #8235d0, #5f308e);
          color: white;
          border-radius: 50px;
          font-weight: 800;
          font-size: 15px;
          text-decoration: none;
          box-shadow: 0 10px 20px rgba(130, 53, 208, 0.2);
        }

        /* Video Styles */
        .video-card {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 28px;
          background: linear-gradient(135deg, rgba(130,53,208,0.18), rgba(130,53,208,0.05));
          padding: 2px;
          box-shadow:
            0 12px 30px rgba(0, 0, 0, 0.08),
            0 4px 12px rgba(130, 53, 208, 0.08);
          overflow: hidden;
        }

        .hero-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 26px;
        }

        /* Hide all native controls */
        .hero-video::-webkit-media-controls { display: none !important; }
        .hero-video::-webkit-media-controls-enclosure { display: none !important; }

        .mute-toggle {
          position: absolute;
          bottom: 12px;
          right: 12px;
          width: 34px;
          height: 34px;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #1a0a2e;
          z-index: 10;
        }

        /* Features/Stats Bar */
        .features-bar {
          width: 100%;
          max-width: 1300px;
          margin: 40px auto;
          padding: 0 40px;
          z-index: 2;
        }

        .features-inner {
          background: #ffffff;
          border-radius: 24px;
          padding: 30px 20px;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.03);
        }

        .feat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          padding: 10px 0;
          border-radius: 12px;
        }

        .features-inner > .feat-item:not(:last-child)::after {
          content: "";
          position: absolute;
          right: 0;
          top: 20%;
          height: 60%;
          width: 1px;
          background: rgba(0, 0, 0, 0.06);
        }

        .feat-icon {
          color: #8235d0;
          margin-bottom: 10px;
          background: rgba(130, 53, 208, 0.08);
          padding: 12px;
          border-radius: 12px;
          transition: transform 0.2s ease;
        }

        .feat-item:hover .feat-icon {
          transform: scale(1.1);
        }

        .feat-val { font-weight: 800; font-size: 15px; color: #1a0a2e; }
        .feat-label { font-size: 11px; color: rgba(26, 10, 46, 0.5); font-weight: 700; text-transform: uppercase; }

        /* MOBILE FIXES */
        @media (max-width: 768px) {
          .hero-view { padding-top: 70px; }

          .hero-container {
            grid-template-columns: 1fr;
            padding: 0; /* Remove container padding for full width video */
            gap: 30px;
          }

          .hero-content {
            padding: 0 20px;
            text-align: center;
          }

          .hero-content p { margin: 0 auto 24px; }

          /* Video full-width on mobile */
          .hero-visual {
            width: 100%;
            padding: 0;
          }

          .video-card {
            border-radius: 0;
            padding: 2px;
            box-shadow: none;
          }

          /* Neat horizontal 3-column grid for cards */
          .features-bar {
            padding: 0;
            margin-top: 20px;
            display: flex;
            justify-content: center; /* KEY */
          }

          .features-inner {
            width: calc(100% - 24px); /* equal side spacing */
            margin: 0 auto; /* center */
            grid-template-columns: repeat(3, 1fr); /* 3 cards per row */
            gap: 20px 5px;
            padding: 24px 10px;
            border-radius: 16px;
          }

          .feat-icon {
            padding: 8px;
            margin-bottom: 6px;
          }

          .features-inner > .feat-item::after {
            display: none;
          }

          .features-inner {
            border-top: 1px solid rgba(0,0,0,0.05);
          }

          .feat-item {
            border-bottom: 1px solid rgba(0,0,0,0.05);
            padding-bottom: 10px;
          }

          .feat-val { font-size: 13px; }
          .feat-label { font-size: 9px; letter-spacing: 0; }
        }

        /* SUBSCRIPTION POPUP */
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .popup-content {
          background: white;
          border-radius: 16px;
          padding: 32px;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }

        .popup-close {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f8f5ff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8235d0;
          font-weight: bold;
          font-size: 16px;
          transition: all 0.2s ease;
        }

        .popup-close:hover {
          background: #8235d0;
          color: white;
        }

        .subscribe-form h3 {
          font-family: "Gambarino", serif;
          font-size: 24px;
          color: #1a0a2e;
          margin: 0 0 4px;
          text-align: center;
          font-weight: 500;
        }

        .subscribe-form .subtitle {
          text-align: center;
          color: rgba(26, 10, 46, 0.6);
          font-size: 14px;
          margin-bottom: 24px;
          font-weight: 500;
        }

        .form-group {
          margin-bottom: 20px;
          position: relative;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #1a0a2e;
          margin-bottom: 8px;
        }

        .form-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #8235d0;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .form-group input {
          width: 100%;
          padding: 14px 14px 14px 44px;
          border: 2px solid rgba(26,10,46,0.1);
          border-radius: 12px;
          font-size: 15px;
          font-family: 'Nunito Sans', sans-serif;
          color: #1a0a2e;
          box-sizing: border-box;
          transition: all 0.2s ease;
          background: #fafafa;
        }

        .form-group input:focus {
          outline: none;
          border-color: #8235d0;
          background: white;
        }

        .form-group input::placeholder {
          color: rgba(26,10,46,0.4);
        }

        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 4px;
        }

        .submit-btn, .cancel-btn {
          flex: 1;
          padding: 14px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          border: none;
          font-family: 'Nunito Sans', sans-serif;
          transition: all 0.2s ease;
        }

        .submit-btn {
          background: linear-gradient(94deg, #8235d0, #5f308e);
          color: white;
        }

        .submit-btn:hover {
          background: linear-gradient(94deg, #7a2bc4, #562aa0);
        }

        .cancel-btn {
          background: #f8f5ff;
          color: #8235d0;
          border: 2px solid rgba(130, 53, 208, 0.2);
        }

        .cancel-btn:hover {
          background: #f0e6ff;
        }

        .success-content {
          text-align: center;
          padding-top: 6px;
        }

        .success-content .success-icon {
          width: 50px;
          height: 50px;
          background: #e8f5e9;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: #4caf50;
        }

        .success-content h3 {
          font-family: "Gambarino", serif;
          font-size: 24px;
          color: #1a0a2e;
          margin: 0 0 10px;
          font-weight: 500;
        }

        .success-content p {
          font-size: 15px;
          color: #1a0a2e;
          margin: 0 0 24px;
          line-height: 1.5;
          font-weight: 500;
        }

        .whatsapp-support {
          margin: 24px 0;
        }

        .whatsapp-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 28px;
          background: #25D366;
          color: white;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 15px;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
        }

        .whatsapp-btn:hover {
          background: #128C7E;
        }

        .payment-note {
          background: #f8f9fa;
          padding: 12px;
          border-radius: 8px;
          font-size: 13px;
          color: #666;
          margin: 24px 0;
          font-style: italic;
          border: 1px solid #e0e0e0;
        }

        .close-btn {
          padding: 12px 28px;
          background: #8235d0;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          cursor: pointer;
          margin-top: 12px;
          font-weight: 700;
          transition: all 0.2s ease;
        }

        .close-btn:hover {
          background: #7a2bc4;
        }

        @media (max-width: 768px) {
          .popup-content {
            margin: 20px;
            padding: 28px 20px;
          }

          .form-actions {
            flex-direction: column;
          }

          .whatsapp-btn {
            width: 100%;
          }
        }
      `}),(0,G.jsxs)(`div`,{id:`home`,className:`hero-view`,children:[(0,G.jsx)(`div`,{className:`hero-bg-wash`}),(0,G.jsx)(`div`,{className:`hero-main-area`,children:(0,G.jsxs)(`div`,{className:`hero-container`,children:[(0,G.jsxs)(Y.div,{className:`hero-content`,initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.8},children:[(0,G.jsxs)(`h1`,{children:[`Care for your parents, even when `,(0,G.jsx)(`span`,{children:`you're away.`})]}),(0,G.jsx)(`p`,{children:`Trusted support, regular check-ins, and a caring community - ensuring your parents stay safe, active, and independent at home.`}),(0,G.jsx)(`button`,{onClick:()=>u(`/book-free-senior-home-safety-assessment`),className:`btn-cta`,children:`Book Free Assessment`})]}),(0,G.jsx)(Y.div,{className:`hero-visual`,initial:{opacity:0,scale:.98},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.1},children:(0,G.jsxs)(`div`,{className:`video-card`,children:[(0,G.jsx)(`video`,{ref:n,className:`hero-video`,src:`/videos/hero_video_ta.mp4`,autoPlay:!0,loop:!0,muted:!0,playsInline:!0,disablePictureInPicture:!0,disableRemotePlayback:!0,controlsList:`nodownload nofullscreen noremoteplayback`}),(0,G.jsx)(`button`,{className:`mute-toggle`,onClick:()=>t(!e),children:e?(0,G.jsx)(Dp,{size:20}):(0,G.jsx)(Ep,{size:20})})]})})]})}),(0,G.jsx)(Y.div,{className:`features-bar`,initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.8,delay:.3},children:(0,G.jsxs)(`div`,{className:`features-inner`,children:[(0,G.jsxs)(`div`,{className:`feat-item`,children:[(0,G.jsx)(`div`,{className:`feat-icon`,children:(0,G.jsx)(Tp,{size:24})}),(0,G.jsx)(`span`,{className:`feat-val`,children:`50K+`}),(0,G.jsx)(`span`,{className:`feat-label`,children:`Families`})]}),(0,G.jsxs)(`div`,{className:`feat-item`,children:[(0,G.jsx)(`div`,{className:`feat-icon`,children:(0,G.jsx)(up,{size:24})}),(0,G.jsx)(`span`,{className:`feat-val`,children:`Tamil Nadu`}),(0,G.jsx)(`span`,{className:`feat-label`,children:`Based`})]}),(0,G.jsxs)(`div`,{className:`feat-item`,children:[(0,G.jsx)(`div`,{className:`feat-icon`,children:(0,G.jsx)(Sp,{size:24})}),(0,G.jsx)(`span`,{className:`feat-val`,children:`21+ Premium`}),(0,G.jsx)(`span`,{className:`feat-label`,children:`Services`})]}),(0,G.jsxs)(`div`,{className:`feat-item`,children:[(0,G.jsx)(`div`,{className:`feat-icon`,children:(0,G.jsx)(rp,{size:24})}),(0,G.jsx)(`span`,{className:`feat-val`,children:`Monthly`}),(0,G.jsx)(`span`,{className:`feat-label`,children:`Checks`})]}),(0,G.jsxs)(`div`,{className:`feat-item`,children:[(0,G.jsx)(`div`,{className:`feat-icon`,children:(0,G.jsx)(hp,{size:24})}),(0,G.jsx)(`span`,{className:`feat-val`,children:`24/7 Call`}),(0,G.jsx)(`span`,{className:`feat-label`,children:`Response`})]}),(0,G.jsxs)(`div`,{className:`feat-item`,children:[(0,G.jsx)(`div`,{className:`feat-icon`,children:(0,G.jsx)(yp,{size:24})}),(0,G.jsx)(`span`,{className:`feat-val`,children:`Dedicated`}),(0,G.jsx)(`span`,{className:`feat-label`,children:`Manager`})]})]})}),i&&(0,G.jsx)(`div`,{className:`popup-overlay`,onClick:p,children:(0,G.jsxs)(`div`,{className:`popup-content`,onClick:e=>e.stopPropagation(),children:[(0,G.jsx)(`button`,{className:`popup-close`,onClick:p,children:`×`}),c?(0,G.jsxs)(`div`,{className:`success-content`,children:[(0,G.jsx)(`div`,{className:`success-icon`,children:(0,G.jsxs)(`svg`,{width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:[(0,G.jsx)(`path`,{d:`M22 11.08V12a10 10 0 1 1-5.93-9.14`}),(0,G.jsx)(`polyline`,{points:`22,4 12,14.01 9,11.01`})]})}),(0,G.jsx)(`h3`,{children:`Thank You!`}),(0,G.jsx)(`p`,{children:`Our team will contact you within 24 hours.`}),(0,G.jsx)(`div`,{className:`whatsapp-support`,children:(0,G.jsxs)(`a`,{href:Cf(r.pathname),target:`_blank`,rel:`noopener noreferrer`,className:`whatsapp-btn`,children:[(0,G.jsx)(`svg`,{width:`20`,height:`20`,viewBox:`0 0 24 24`,fill:`currentColor`,children:(0,G.jsx)(`path`,{d:`M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.386`})}),`Contact us for 24/7 Support`]})}),(0,G.jsx)(`div`,{className:`payment-note`,children:`We're working on the payment process`})]}):(0,G.jsxs)(`div`,{className:`subscribe-form`,children:[(0,G.jsx)(`h3`,{children:`Subscribe to Our Service`}),(0,G.jsx)(`p`,{className:`subtitle`,children:`Fill in your details and our team will contact you shortly`}),(0,G.jsxs)(`form`,{onSubmit:f,children:[(0,G.jsxs)(`div`,{className:`form-group`,children:[(0,G.jsx)(`label`,{htmlFor:`name`,children:`Full Name`}),(0,G.jsxs)(`div`,{style:{position:`relative`},children:[(0,G.jsxs)(`svg`,{className:`form-icon`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:[(0,G.jsx)(`path`,{d:`M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2`}),(0,G.jsx)(`circle`,{cx:`12`,cy:`7`,r:`4`})]}),(0,G.jsx)(`input`,{type:`text`,id:`name`,name:`name`,value:o.name,onChange:d,placeholder:`Enter your full name`,required:!0})]})]}),(0,G.jsxs)(`div`,{className:`form-group`,children:[(0,G.jsx)(`label`,{htmlFor:`mobile`,children:`Mobile Number`}),(0,G.jsxs)(`div`,{style:{position:`relative`},children:[(0,G.jsxs)(`svg`,{className:`form-icon`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:[(0,G.jsx)(`rect`,{x:`5`,y:`2`,width:`14`,height:`20`,rx:`2`,ry:`2`}),(0,G.jsx)(`path`,{d:`M12 18h.01`})]}),(0,G.jsx)(`input`,{type:`tel`,id:`mobile`,name:`mobile`,value:o.mobile,onChange:d,placeholder:`Enter your mobile number`,required:!0})]})]}),(0,G.jsxs)(`div`,{className:`form-actions`,children:[(0,G.jsx)(`button`,{type:`submit`,className:`submit-btn`,children:`Submit`}),(0,G.jsx)(`button`,{type:`button`,className:`cancel-btn`,onClick:p,children:`Cancel`})]})]})]})]})})]})]})}var Mp=[{slug:`monthly-doctor-visit`,cat:`Healthcare & Medical`,name:`Monthly Doctor Visit`,description:`Regular monthly visits from qualified doctors to monitor your parent's health and address any medical concerns.`},{slug:`24-7-emergency-call`,cat:`Daily Support & Monitoring`,name:`24/7 Emergency Call`,description:`Round-the-clock emergency support with immediate response when your parents need urgent assistance.`},{slug:`24-7-companion`,cat:`Daily Support & Monitoring`,name:`24/7 Companion`,description:`Personalized companion services to provide emotional support and assistance with daily activities.`},{slug:`monthly-care-executive-visit`,cat:`Home Care & Safety`,name:`Monthly Care Executive Visit`,description:`Professional care executive visits to assess living conditions and provide recommendations for safety and comfort.`},{slug:`integrated-senior-health-index`,cat:`Healthcare & Medical`,name:`Integrated Senior Health Index`,description:`Comprehensive health assessment using our proprietary index to track and improve overall wellness.`},{slug:`senior-home-safety-assessment`,cat:`Home Care & Safety`,name:`Senior Home Safety Assessment`,description:`Detailed evaluation of home safety to identify potential hazards and recommend improvements.`},{slug:`digitalization-of-medical-records`,cat:`Digital & Records`,name:`Digitalization of Medical Records`,description:`Secure digitization and organization of medical records for easy access and sharing with healthcare providers.`},{slug:`voice-reminder-for-parents`,cat:`Daily Support & Monitoring`,name:`Voice Reminder for Parents`,description:`Customizable voice reminders for medications, appointments, and daily tasks to maintain routine.`},{slug:`daily-updates-to-children`,cat:`Daily Support & Monitoring`,name:`Daily Updates to Children`,description:`Regular updates sent to children about their parents' wellbeing and daily activities.`},{slug:`free-online-community`,cat:`Digital & Records`,name:`Free Online Community`,description:`Access to our supportive online community where seniors can connect and share experiences.`},{slug:`audiologist-home-visit`,cat:`Healthcare & Medical`,name:`Audiologist Home Visit`,description:`Specialized hearing assessments and consultations conducted in the comfort of home.`},{slug:`medicine-delivery`,cat:`Daily Support & Monitoring`,name:`Medicine Delivery`,description:`Reliable medicine delivery service to ensure timely access to prescribed medications.`},{slug:`senior-citizen-insurance-assessment`,cat:`Healthcare & Medical`,name:`Senior Citizen Insurance Assessment`,description:`Expert evaluation and recommendations for insurance coverage tailored to senior needs.`},{slug:`velai-consultation`,cat:`Lifestyle & Wellness`,name:`Velai Consultation`,description:`Career and lifestyle consultation services for seniors looking to explore new opportunities.`},{slug:`trip-consultation`,cat:`Lifestyle & Wellness`,name:`Trip Consultation`,description:`Specialized travel planning and consultation for safe and enjoyable trips for seniors.`},{slug:`nutrition-consultation`,cat:`Lifestyle & Wellness`,name:`Nutrition Consultation`,description:`Personalized nutrition advice and meal planning tailored to senior health needs.`},{slug:`on-demand-services`,cat:`Daily Support & Monitoring`,name:`On Demand Services`,description:`Flexible support services available whenever needed for various daily tasks and requirements.`},{slug:`complimentary-products`,cat:`Extras & Benefits`,name:`Complimentary Products`,description:`Quality products provided complimentary to enhance daily life and comfort.`},{slug:`blood-test`,cat:`Healthcare & Medical`,name:`Blood Test`,description:`Convenient at-home blood testing services with professional sample collection and analysis.`},{slug:`offline-events`,cat:`Extras & Benefits`,name:`Offline Events`,description:`Engaging offline events and activities to promote social interaction and community involvement.`},{slug:`gait-analysis`,cat:`Home Care & Safety`,name:`Gait Analysis`,description:`Professional assessment of walking patterns to identify fall risks and recommend preventive measures.`}],Np={"Monthly Doctor Visit":(0,G.jsx)(Sp,{size:20}),"24/7 Emergency Call":(0,G.jsx)(hp,{size:20}),"24/7 Companion":(0,G.jsx)(Tp,{size:20}),"Monthly Care Executive Visit":(0,G.jsx)(ip,{size:20}),"Integrated Senior Health Index":(0,G.jsx)(rp,{size:20}),"Senior Home Safety Assessment":(0,G.jsx)(yp,{size:20}),"Digitalization of Medical Records":(0,G.jsx)($f,{size:20}),"Voice Reminder for Parents":(0,G.jsx)(zf,{size:20}),"Daily Updates to Children":(0,G.jsx)(fp,{size:20}),"Free Online Community":(0,G.jsx)(np,{size:20}),"Audiologist Home Visit":(0,G.jsx)(Qf,{size:20}),"Medicine Delivery":(0,G.jsx)(gp,{size:20}),"Senior Citizen Insurance Assessment":(0,G.jsx)(bp,{size:20}),"Velai Consultation":(0,G.jsx)(Bf,{size:20}),"Trip Consultation":(0,G.jsx)(_p,{size:20}),"Nutrition Consultation":(0,G.jsx)(If,{size:20}),"On Demand Services":(0,G.jsx)(Ap,{size:20}),"Complimentary Products":(0,G.jsx)(tp,{size:20}),"Blood Test":(0,G.jsx)(Cp,{size:20}),"Offline Events":(0,G.jsx)(Hf,{size:20}),"Gait Analysis":(0,G.jsx)(Ff,{size:20})};function Pp({items:e,direction:t=`left`,speed:n=40,globalIndex:r}){let i=(0,b.useRef)(null),a=(0,b.useRef)(null),o=(0,b.useRef)(0),s=(0,b.useRef)(!1),c=(0,b.useRef)(0),l=(0,b.useRef)(0),u=(0,b.useRef)(!1),d=(0,b.useRef)(0),f=Qe(),p=[...e,...e,...e,...e];return(0,b.useEffect)(()=>{let e=i.current;if(!e)return;let r=requestAnimationFrame(()=>{d.current=e.scrollWidth/4,o.current=d.current;let r=()=>{if(!u.current){let r=t===`left`?-n/75:n/75;o.current+=r;let i=d.current;o.current<=0&&(o.current+=i),o.current>=i*2&&(o.current-=i),e.style.transform=`translateX(${-o.current}px)`}a.current=requestAnimationFrame(r)};a.current=requestAnimationFrame(r)});return()=>{cancelAnimationFrame(r),cancelAnimationFrame(a.current)}},[t,n]),(0,G.jsxs)(`div`,{className:`marquee-mask`,onMouseEnter:()=>{s.current||(u.current=!0)},onMouseLeave:()=>{s.current=!1,u.current=!1},onPointerDown:e=>{s.current=!0,u.current=!0,c.current=e.clientX,l.current=o.current,d.current=i.current?i.current.scrollWidth/4:d.current,i.current?.parentElement?.setPointerCapture(e.pointerId)},onPointerMove:e=>{if(!s.current)return;let t=c.current-e.clientX,n=i.current;if(!n)return;let r=d.current,a=l.current+t;a<=0&&(a+=r),a>=r*2&&(a-=r),o.current=a,n.style.transform=`translateX(${-a}px)`},onPointerUp:()=>{s.current=!1,u.current=!0},onTouchStart:e=>{s.current=!0,u.current=!0,c.current=e.touches[0].clientX,l.current=o.current,d.current=i.current?i.current.scrollWidth/4:d.current},onTouchMove:e=>{if(!s.current)return;let t=c.current-e.touches[0].clientX,n=i.current;if(!n)return;let r=d.current,a=l.current+t;a<=0&&(a+=r),a>=r*2&&(a-=r),o.current=a,n.style.transform=`translateX(${-a}px)`},onTouchEnd:()=>{s.current=!1,u.current=!1},style:{cursor:`grab`,userSelect:`none`,overflow:`hidden`,position:`relative`,touchAction:`pan-y`},children:[(0,G.jsx)(`div`,{className:`marquee-edge-fade`}),(0,G.jsx)(`div`,{ref:i,className:`marquee-track`,style:{willChange:`transform`},children:p.map((t,n)=>{let i=n%e.length,a=r*7+i+1;return(0,G.jsxs)(`div`,{className:`marquee-card`,children:[(0,G.jsxs)(`div`,{className:`top-row`,children:[(0,G.jsx)(`span`,{className:`num`,children:String(a).padStart(2,`0`)}),(0,G.jsx)(`span`,{className:`icon`,children:Np[t.name]})]}),(0,G.jsx)(`div`,{className:`name`,children:t.name}),(0,G.jsx)(`button`,{className:`link`,onPointerDown:e=>e.stopPropagation(),onClick:()=>f(`/services/${t.slug}`),"aria-label":`Learn more about ${t.name}`,children:`Learn more →`})]},`${r}-${n}`)})})]})}function Fp(){let[e,t]=(0,b.useState)(!1),[n,r]=(0,b.useState)({name:``,mobile:``}),[i,a]=(0,b.useState)(!1),o=Qe(),s=Xe(),c=e=>{let{name:t,value:n}=e.target;r(e=>({...e,[t]:n}))},l=e=>{if(e.preventDefault(),!n.name.trim()||!n.mobile.trim()){alert(`Please fill in both name and mobile number`);return}if(!/^[0-9]{10,15}$/.test(n.mobile)){alert(`Please enter a valid mobile number`);return}a(!0)},u=()=>{t(!1),a(!1),r({name:``,mobile:``})},d=[Mp.slice(0,7),Mp.slice(7,14),Mp.slice(14,21)];return(0,G.jsxs)(`section`,{className:`services`,id:`services`,children:[(0,G.jsx)(`style`,{children:`
        .services {
          position: relative;
          background: linear-gradient(180deg, #ffffff 0%, #faf7ff 50%, #f3ecff 100%);
          padding: 120px 0 60px;
          font-family: 'Nunito Sans', sans-serif;
          color: #1a0a2e;
          overflow: hidden;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }

        /* ── HEAD LAYOUT ── */
        .services-head {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          margin-bottom: 80px;
          align-items: flex-start;
        }

        .tag {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 2px;
          color: #8235d0;
          margin-bottom: 24px;
          display: inline-block;
          text-transform: uppercase;
        }

        .services h2 {
          font-family: "Gambarino", serif !important;
          font-size: clamp(34px, 4vw, 50px);
          font-weight: 500;
          line-height: 1.15;
          margin-bottom: 32px;
          color: #1a0a2e;
        }

        /* ── TWO-LINE EQUAL PRICING ── */
        .combined-pricing-block {
          margin-top: 48px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .joining-label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(26, 10, 46, 0.5);
          margin-right: 8px;
        }

        .pricing-main-line.equal-flow {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .price-flow {
          display: flex;
          align-items: baseline;
          gap: 12px;
          font-family: 'Gambarino', serif;
        }

        .price-old,
        .price-new {
          font-size: 64px;
          font-weight: 600;
          letter-spacing: -2px;
          color: #1a0a2e;
        }

        .price-old {
          text-decoration: line-through;
          text-decoration-thickness: 3px;
          color: rgba(26, 10, 46, 0.55);
        }

        .flow-arrow {
          font-size: 32px;
          color: rgba(26, 10, 46, 0.3);
          transform: translateY(-6px);
          animation: pulseArrow 2s ease-in-out infinite;
        }

        @keyframes pulseArrow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        .p-mo {
          font-size: 18px;
          font-weight: 600;
          color: rgba(26, 10, 46, 0.4);
          margin-left: 4px;
        }

        .save-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          padding: 8px 14px;
          border-radius: 8px;
          border: 1px solid rgba(130, 53, 208, 0.25);
          background: rgba(130, 53, 208, 0.04);
          line-height: 1;
          margin-left: 8px;
        }

        .badge-top {
          font-size: 12px;
          font-weight: 800;
          color: #8235d0;
        }

        .badge-bottom {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.8px;
          color: rgba(130, 53, 208, 0.7);
        }

        .meta-info-inline {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 4px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(26, 10, 46, 0.65);
        }

        .meta-item.highlight {
          color: #1a0a2e;
          font-weight: 600;
        }

        .meta-dot {
          margin: 0 6px;
          color: rgba(26, 10, 46, 0.25);
        }

        .meta-date {
          color: #1a0a2e;
          font-weight: 700;
        }

        /* ── LEFT COLUMN ── */
        .left-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        /* ── RIGHT COLUMN ── */
        .right-col {
          padding-top: 10px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .right-col p {
          font-size: 17px;
          line-height: 1.7;
          color: rgba(26,10,46,0.7);
          margin-bottom: 24px;
          max-width: 480px;
        }

        /* CTA pushed to the right column, bottom-aligned */
        .right-col-cta {
          margin-top: auto;
          padding-top: 12px;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 44px;
          border-radius: 50px;
          background: linear-gradient(94deg, #8235d0, #5f308e);
          color: white;
          text-decoration: none;
          font-weight: 800;
          font-size: 16px;
          font-family: 'Nunito Sans', sans-serif;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          box-shadow: 0 10px 20px rgba(130, 53, 208, 0.15);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(130, 53, 208, 0.25);
        }

        /* ── MARQUEE ── */
        .marquee-full { width: 100%; overflow: hidden; padding: 0; background: #faf7ff; }
        .marquee-wrapper { display: flex; flex-direction: column; gap: 24px; width: 100%; padding-top: 20px; }

        .marquee-card { width: 220px; height: 180px; flex-shrink: 0; background: #ffffff; border-radius: 18px; padding: 20px; color: inherit; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 4px 20px rgba(0,0,0,0.02); transition: all 0.3s cubic-bezier(0.2,0,0,1); }
        .marquee-card:hover { transform: translateY(-8px); border-color: rgba(130,53,208,0.2); box-shadow: 0 20px 40px rgba(130,53,208,0.08); }

        .top-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .num { font-size: 14px; font-weight: 800; color: #8235d0; opacity: 0.7; }
        .icon { color: #8235d0; display: flex; align-items: center; justify-content: center; }
        .name { font-family: "Gambarino", serif !important; font-size: 20px; line-height: 1.3; margin-bottom: 16px; color: #1a0a2e; }

        .link { color: #8235d0; font-weight: 700; text-decoration: none; font-size: 14px; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; background: none; border: none; padding: 0; outline: none; }
        .link:hover { text-decoration: underline; }

        /* ── CTA SCROLL ── */
        .services-cta-scroll { margin-top: 60px; overflow: hidden; display: flex; align-items: center; gap: 40px; }

        .cta-marquee { position: relative; overflow: hidden; flex: 1; }
        .cta-marquee::before, .cta-marquee::after { content: ""; position: absolute; top: 0; width: 80px; height: 100%; z-index: 2; pointer-events: none; }
        .cta-marquee::before { left: 0; background: linear-gradient(to right, #f3ecff, transparent); }
        .cta-marquee::after { right: 0; background: linear-gradient(to left, #f3ecff, transparent); }
        .cta-marquee:hover .cta-track { animation-play-state: paused; }
        .cta-track { display: flex; gap: 80px; width: max-content; animation: cta-scroll 22s linear infinite; }
        .cta-track span { font-size: 17px; font-weight: 500; color: rgba(26,10,46,0.7); white-space: nowrap; }
        .cta-track span:not(:last-child)::after { content: ""; width: 6px; height: 6px; background: rgba(130,53,208,0.3); border-radius: 50%; display: inline-block; margin: 0 18px; vertical-align: middle; }
        @keyframes cta-scroll { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }

        .cta-btn-wrap { flex-shrink: 0; }
        .cta-btn { display: inline-block; padding: 16px 44px; border-radius: 50px; background: linear-gradient(94deg, #8235d0, #5f308e); color: #fff; font-weight: 700; font-family: 'Nunito Sans', sans-serif; text-decoration: none; transition: all 0.25s ease; border: none; cursor: pointer; white-space: nowrap; }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 24px rgba(130, 53, 208, 0.2); }

        /* ── MARQUEE EDGE FADE ── */
        .marquee-edge-fade {
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
          background: linear-gradient(to right, #faf7ff 0%, transparent 80px, transparent calc(100% - 80px), #faf7ff 100%);
        }

        .marquee-track {
          display: flex;
          gap: 20px;
          width: max-content;
          padding-left: 40px;
          padding-right: 40px;
        }

        /* ── RESPONSIVE ── */
        @media(max-width:900px) {
          .services-head { grid-template-columns: 1fr; gap: 32px; margin-bottom: 40px; }
          .services { padding: 60px 0 40px; }
          .container { padding: 0 20px; }

          .services h2 { font-size: clamp(28px, 7vw, 36px); margin-bottom: 20px; }

          .pricing-main-line.equal-flow { flex-wrap: wrap; gap: 12px; }
          .price-old, .price-new { font-size: 48px; }
          .flow-arrow { font-size: 24px; }
          .meta-info-inline { width: 100%; }

          .btn-primary { padding: 14px 32px; font-size: 15px; }

          .right-col p { font-size: 15px; line-height: 1.7; margin-bottom: 16px; max-width: 100%; }

          .marquee-card { width: 180px; height: 160px; padding: 16px; }
          .name { font-size: 17px; }

          .marquee-edge-fade { display: none; }

          .marquee-track { padding-left: 8px; padding-right: 8px; gap: 12px; }

          .marquee-wrapper { gap: 16px; }

          .services-cta-scroll { margin-top: 40px; flex-direction: column; align-items: stretch; gap: 16px; }
          .cta-btn-wrap { text-align: center; }
          .cta-btn { padding: 14px 32px; font-size: 15px; }
        }

        @media(max-width: 480px) {
          .services h2 { font-size: 26px; }
          .pricing-main-line.equal-flow { flex-direction: column; align-items: flex-start; gap: 12px; }
          .price-old, .price-new { font-size: 40px; }
          .flow-arrow { font-size: 20px; }
          .meta-info-inline { flex-direction: column; align-items: flex-start; gap: 8px; }
          .meta-dot { display: none; }
          .marquee-card { width: 160px; height: 155px; padding: 14px; }
          .name { font-size: 15px; }
        }

        /* ── SUBSCRIPTION POPUP ── */
        .popup-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .popup-content {
          background: white;
          border-radius: 16px;
          padding: 32px;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }

        .popup-close {
          position: absolute;
          top: 12px; right: 12px;
          width: 32px; height: 32px;
          border-radius: 50%;
          background: #f8f5ff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8235d0;
          font-weight: bold;
          font-size: 16px;
          transition: all 0.2s ease;
        }
        .popup-close:hover { background: #8235d0; color: white; }

        .subscribe-form h3 {
          font-family: "Gambarino", serif;
          font-size: 24px;
          color: #1a0a2e;
          margin: 0 0 4px;
          text-align: center;
          font-weight: 500;
        }

        .subscribe-form .subtitle {
          text-align: center;
          color: rgba(26, 10, 46, 0.6);
          font-size: 14px;
          margin-bottom: 24px;
          font-weight: 500;
        }

        .form-group { margin-bottom: 20px; position: relative; }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #1a0a2e;
          margin-bottom: 8px;
        }

        .form-group input {
          width: 100%;
          padding: 14px 14px 14px 44px;
          border: 2px solid rgba(26,10,46,0.1);
          border-radius: 12px;
          font-size: 15px;
          font-family: 'Nunito Sans', sans-serif;
          color: #1a0a2e;
          box-sizing: border-box;
          transition: all 0.2s ease;
          background: #fafafa;
        }

        .form-group input:focus {
          outline: none;
          border-color: #8235d0;
          background: white;
        }

        .form-group input::placeholder { color: rgba(26,10,46,0.4); }

        .form-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #8235d0;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .form-actions { display: flex; gap: 12px; margin-top: 4px; }

        .submit-btn, .cancel-btn {
          flex: 1;
          padding: 14px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          border: none;
          font-family: 'Nunito Sans', sans-serif;
          transition: all 0.2s ease;
        }

        .submit-btn { background: linear-gradient(94deg, #8235d0, #5f308e); color: white; }
        .submit-btn:hover { background: linear-gradient(94deg, #7a2bc4, #562aa0); }

        .cancel-btn { background: #f8f5ff; color: #8235d0; border: 2px solid rgba(130, 53, 208, 0.2); }
        .cancel-btn:hover { background: #f0e6ff; }

        .success-content { text-align: center; padding-top: 6px; }

        .success-content .success-icon {
          width: 50px; height: 50px;
          background: #e8f5e9;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: #4caf50;
        }

        .success-content h3 {
          font-family: "Gambarino", serif;
          font-size: 24px;
          color: #1a0a2e;
          margin: 0 0 10px;
          font-weight: 500;
        }
        .success-content p {
          font-size: 15px;
          color: #1a0a2e;
          margin: 0 0 24px;
          line-height: 1.5;
          font-weight: 500;
        }

        .whatsapp-support { margin: 24px 0; }

        .whatsapp-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 28px;
          background: #25D366;
          color: white;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 15px;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
        }
        .whatsapp-btn:hover { background: #128C7E; }

        .payment-note {
          background: #f8f9fa;
          padding: 12px;
          border-radius: 8px;
          font-size: 13px;
          color: #666;
          margin: 24px 0;
          font-style: italic;
          border: 1px solid #e0e0e0;
        }

        .close-btn {
          padding: 12px 28px;
          background: #8235d0;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          cursor: pointer;
          margin-top: 12px;
          font-weight: 700;
          transition: all 0.2s ease;
        }
        .close-btn:hover { background: #7a2bc4; }

        @media (max-width: 768px) {
          .popup-content { margin: 20px; padding: 28px 20px; }
          .form-actions { flex-direction: column; }
          .whatsapp-btn { width: 100%; }
        }
      `}),(0,G.jsx)(`div`,{className:`container`,children:(0,G.jsxs)(Y.div,{className:`services-head`,initial:{opacity:0,y:60},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.3},transition:{duration:.9,ease:[.22,1,.36,1]},children:[(0,G.jsxs)(`div`,{className:`left-col`,children:[(0,G.jsx)(`span`,{className:`tag`,children:`OUR SERVICES`}),(0,G.jsx)(`h2`,{children:`Complete care for your parents, designed for peace of mind.`}),(0,G.jsxs)(`div`,{className:`combined-pricing-block`,children:[(0,G.jsxs)(`div`,{className:`pricing-main-line equal-flow`,children:[(0,G.jsxs)(`div`,{className:`price-flow`,children:[(0,G.jsx)(`span`,{className:`price-old`,children:`$200`}),(0,G.jsx)(`span`,{className:`flow-arrow`,children:`→`}),(0,G.jsx)(`span`,{className:`price-new`,children:`$100`}),(0,G.jsx)(`span`,{className:`p-mo`,children:`/month`})]}),(0,G.jsxs)(`span`,{className:`save-badge`,children:[(0,G.jsx)(`span`,{className:`badge-top`,children:`50% OFF`}),(0,G.jsx)(`span`,{className:`badge-bottom`,children:`JOINING OFFER`})]})]}),(0,G.jsxs)(`div`,{className:`meta-info-inline`,children:[(0,G.jsx)(`span`,{className:`meta-item highlight`,children:`+ Accessories included`}),(0,G.jsx)(`span`,{className:`meta-dot`,children:`•`}),(0,G.jsxs)(`span`,{className:`meta-item`,children:[`Valid until `,(0,G.jsx)(`strong`,{className:`meta-date`,children:`May 15`})]})]})]})]}),(0,G.jsxs)(`div`,{className:`right-col`,children:[(0,G.jsx)(`p`,{children:`Your trusted companion for elderly care in Tamil Nadu. We provide personalised support ensuring your parents' well-being while you're away.`}),(0,G.jsx)(`p`,{children:`From regular health check-ups and home safety to daily monitoring and emergency support, every aspect of care is managed by our experienced team.`}),(0,G.jsxs)(`p`,{children:[`A complete system of `,(0,G.jsx)(`strong`,{children:`21 carefully designed services`}),`, covering healthcare, safety, and daily support.`]}),(0,G.jsx)(`div`,{className:`right-col-cta`,children:(0,G.jsx)(`button`,{onClick:()=>o(`/subscription#pricing`),className:`btn-primary`,children:`Subscribe Now →`})})]})]})}),(0,G.jsx)(`div`,{className:`marquee-full`,id:`services-cards`,children:(0,G.jsx)(`div`,{className:`marquee-wrapper`,children:d.map((e,t)=>(0,G.jsx)(Pp,{items:e,direction:t%2==0?`left`:`right`,speed:t===1?4:5,globalIndex:t},t))})}),(0,G.jsx)(`div`,{className:`container`,children:(0,G.jsxs)(`div`,{className:`services-cta-scroll`,children:[(0,G.jsx)(`div`,{className:`cta-marquee`,children:(0,G.jsx)(`div`,{className:`cta-track`,children:[...[,,,]].map((e,t)=>[(0,G.jsx)(`span`,{children:`21 essential services`},`serv-${t}`),(0,G.jsx)(`span`,{children:`Complete care system`},`care-${t}`),(0,G.jsx)(`span`,{children:`Health & safety`},`health-${t}`),(0,G.jsx)(`span`,{children:`Daily support & monitoring`},`daily-${t}`),(0,G.jsx)(`span`,{children:`Independence for your parents`},`indepen-${t}`)])})}),(0,G.jsx)(`div`,{className:`cta-btn-wrap`,children:(0,G.jsx)(`button`,{onClick:()=>o(`/subscription#pricing`),className:`cta-btn`,children:`Subscribe Now`})})]})}),e&&(0,G.jsx)(`div`,{className:`popup-overlay`,onClick:u,children:(0,G.jsxs)(`div`,{className:`popup-content`,onClick:e=>e.stopPropagation(),children:[(0,G.jsx)(`button`,{className:`popup-close`,onClick:u,children:`×`}),i?(0,G.jsxs)(`div`,{className:`success-content`,children:[(0,G.jsx)(`div`,{className:`success-icon`,children:(0,G.jsxs)(`svg`,{width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:[(0,G.jsx)(`path`,{d:`M22 11.08V12a10 10 0 1 1-5.93-9.14`}),(0,G.jsx)(`polyline`,{points:`22,4 12,14.01 9,11.01`})]})}),(0,G.jsx)(`h3`,{children:`Thank You!`}),(0,G.jsx)(`p`,{children:`Our team will contact you within 24 hours.`}),(0,G.jsx)(`div`,{className:`whatsapp-support`,children:(0,G.jsxs)(`a`,{href:Cf(s.pathname),target:`_blank`,rel:`noopener noreferrer`,className:`whatsapp-btn`,children:[(0,G.jsx)(`svg`,{width:`20`,height:`20`,viewBox:`0 0 24 24`,fill:`currentColor`,children:(0,G.jsx)(`path`,{d:`M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.386`})}),`Contact us for 24/7 Support`]})}),(0,G.jsx)(`div`,{className:`payment-note`,children:`We're working on the payment process`})]}):(0,G.jsxs)(`div`,{className:`subscribe-form`,children:[(0,G.jsx)(`h3`,{children:`Subscribe to Our Service`}),(0,G.jsx)(`p`,{className:`subtitle`,children:`Fill in your details and our team will contact you shortly`}),(0,G.jsxs)(`form`,{onSubmit:l,children:[(0,G.jsxs)(`div`,{className:`form-group`,children:[(0,G.jsx)(`label`,{htmlFor:`name`,children:`Full Name`}),(0,G.jsxs)(`div`,{style:{position:`relative`},children:[(0,G.jsxs)(`svg`,{className:`form-icon`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:[(0,G.jsx)(`path`,{d:`M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2`}),(0,G.jsx)(`circle`,{cx:`12`,cy:`7`,r:`4`})]}),(0,G.jsx)(`input`,{type:`text`,id:`name`,name:`name`,value:n.name,onChange:c,placeholder:`Enter your full name`,required:!0})]})]}),(0,G.jsxs)(`div`,{className:`form-group`,children:[(0,G.jsx)(`label`,{htmlFor:`mobile`,children:`Mobile Number`}),(0,G.jsxs)(`div`,{style:{position:`relative`},children:[(0,G.jsxs)(`svg`,{className:`form-icon`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:[(0,G.jsx)(`rect`,{x:`5`,y:`2`,width:`14`,height:`20`,rx:`2`,ry:`2`}),(0,G.jsx)(`path`,{d:`M12 18h.01`})]}),(0,G.jsx)(`input`,{type:`tel`,id:`mobile`,name:`mobile`,value:n.mobile,onChange:c,placeholder:`Enter your mobile number`,required:!0})]})]}),(0,G.jsxs)(`div`,{className:`form-actions`,children:[(0,G.jsx)(`button`,{type:`submit`,className:`submit-btn`,children:`Submit`}),(0,G.jsx)(`button`,{type:`button`,className:`cancel-btn`,onClick:u,children:`Cancel`})]})]})]})]})})]})}var Ip=[{id:1,name:`Premila Srinivasan`,city:`Anna Nagar, Chennai`,childrenIn:`Chennai`,text:`My children live here in Chennai, yet I never felt this cared for before. 60Plus brought us closer as a family - through their platform, I found new friendships, meaningful activities, and a sense of purpose I had forgotten.`,video:`videos/testimonial_1.mp4`},{id:2,name:`Suresh`,city:`Chennai`,childrenIn:null,text:`I was under so much stress - constant worry, no peace of mind. 60Plus introduced me to their events and activity sessions. I started attending, met people my age, and slowly that stress just began to lift.`,video:`videos/testimonial_2.mp4`},{id:3,name:`Vijay`,city:`Chennai`,childrenIn:null,text:`Having a doctor come home every month has changed everything for me. Early on, the doctor caught something my family had all missed. That one visit made all the difference.`,video:`videos/testimonial_3.mp4`},{id:4,name:`Kala`,city:`Chennai`,childrenIn:`California & Canada`,text:`My son is in California and my daughter is in Canada, but I never feel alone. The singing sessions are my favourite - the moment they announce one, I am the first to join.`,video:`videos/testimonial_4.mp4`},{id:5,name:`Elderly couple`,city:`Chennai`,childrenIn:null,text:`We never imagined that after 60, life could feel this full of joy. What started as just attending a few sessions has now become six years of beautiful memories.`,video:`videos/testimonial_5.mp4`}];function Lp(){let e=(0,b.useRef)([]),[t,n]=(0,b.useState)(0),[r,i]=(0,b.useState)(null),[a,o]=(0,b.useState)(!0),s=(0,b.useRef)(!1),c=(0,b.useRef)({});(0,b.useEffect)(()=>{s.current=a},[a]);let[l,u]=(0,b.useState)(Ip.map(()=>0)),[d,f]=(0,b.useState)(null),[p,m]=(0,b.useState)(null),h=(0,b.useRef)(null),g=(0,b.useRef)(null),_=(0,b.useRef)(!1),v=(0,b.useRef)(!1),y=(0,b.useRef)(!1),x=(0,b.useRef)(0),S=(0,b.useRef)(0),[C,w]=(0,b.useState)(!1);(0,b.useEffect)(()=>{let e=()=>w(window.innerWidth<=768);return e(),window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),(0,b.useEffect)(()=>{let e=new IntersectionObserver(e=>{e.forEach(e=>{let n=e.target.querySelector(`video`);if(n){let a=parseInt(n.dataset.index);e.isIntersecting?a===t&&!c.current[a]&&(n.muted=s.current,n.play().then(()=>{i(a),c.current[a]=!1}).catch(()=>{})):(n.pause(),r===a&&i(null))}})},{root:null,rootMargin:`0px`,threshold:.5}),n=setTimeout(()=>{document.querySelectorAll(`.t-video-wrap`).forEach(t=>{e.observe(t)})},100);return()=>{clearTimeout(n),e.disconnect()}},[t,r]),(0,b.useEffect)(()=>{let t=setTimeout(()=>{let t=e.current[0];t&&(t.muted=!0,t.play().then(()=>i(0)).catch(()=>{}))},800);return()=>clearTimeout(t)},[]),(0,b.useEffect)(()=>{e.current.forEach((e,n)=>{e&&n!==t&&(e.pause(),e.muted=!0)})},[t]);let ee=(0,b.useCallback)(t=>{if(_.current||v.current)return;_.current=!0,setTimeout(()=>{_.current=!1},600);let r=Ip.length,a=(t%r+r)%r;e.current.forEach((e,t)=>{e&&t!==a&&(e.pause(),e.currentTime=0)}),i(null),n(a),setTimeout(()=>{let t=e.current[a];t&&(t.muted=s.current,t.play().then(()=>i(a)).catch(()=>{}))},500)},[]),te=(0,b.useCallback)(()=>{},[]),T=(0,b.useCallback)(()=>{clearInterval(g.current)},[]),ne=(0,b.useCallback)(()=>{T()},[T]);(0,b.useEffect)(()=>(te(),()=>{clearInterval(g.current)}),[te]);let re=e=>{ne(),ee(t+e)},ie=e=>{ne(),ee(e)},ae=t=>{v.current=!0;let n=e.current[t];n&&(r===t?(n.pause(),i(null),c.current[t]=!0):(e.current.forEach((e,n)=>{e&&n!==t&&e.pause()}),n.muted=s.current,n.play().then(()=>{i(t),c.current[t]=!1}).catch(()=>{})),setTimeout(()=>v.current=!1,300))},oe=(t,n)=>{n.stopPropagation(),v.current=!0;let r=e.current[t];r&&r.pause(),i(null),m(t),document.body.style.overflow=`hidden`},se=()=>{let n=h.current;n&&(n.pause(),n.currentTime=0),m(null),document.body.style.overflow=``,v.current=!1,setTimeout(()=>{let n=e.current[t];n&&(n.muted=s.current,n.play().catch(()=>{}))},200)};(0,b.useEffect)(()=>{let e=e=>{e.key===`Escape`&&se()};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[t]);let ce=e=>{let n=Ip.length,r=e-t;r>n/2&&(r-=n),r<-n/2&&(r+=n);let i=Math.abs(r),a=r===0,o=C?{"-2":-150,"-1":-95,0:0,1:95,2:150}:{"-2":-560,"-1":-300,0:0,1:300,2:560},s=C?{0:1,1:.9,2:.78}:{0:1,1:.82,2:.68},c={0:10,1:6,2:2},l={0:1,1:.72,2:.45},u=C?{0:0,1:10,2:22}:{0:0,1:30,2:55};return i>2?{display:`none`}:{transform:`translateX(${o[r]??r*300}px) translateY(${u[i]??60}px) scale(${s[i]??.5})`,zIndex:c[i]??0,opacity:l[i]??0,filter:a?`none`:`brightness(${1-i*.08})`,transition:`transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1), filter 0.65s ease`,pointerEvents:`auto`,cursor:a?`default`:`pointer`}};return(0,G.jsxs)(`section`,{className:`testimonials`,id:`testimonials`,children:[(0,G.jsx)(`style`,{children:`
        .testimonials {
          padding: 80px 0 120px;
          background: #ffffff;
          font-family: 'Nunito Sans', sans-serif;
          color: #1a0a2e;
          overflow: hidden;
          position: relative;
        }

        .header-container {
          max-width: 900px;
          margin: 0 auto 64px;
          padding: 0 20px;
          text-align: center;
        }

        .header-container::after {
          content: "";
          display: block;
          width: 80px;
          height: 2px;
          margin: 28px auto 0;
          background: linear-gradient(94deg, #8235d0, #5f308e);
          border-radius: 2px;
        }

        .tag {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 2.5px;
          color: #8235d0;
          margin-bottom: 16px;
          display: inline-block;
          text-transform: uppercase;
        }

        .testimonials h2 {
          font-family: "Gambarino", serif;
          font-size: clamp(34px, 4.5vw, 50px);
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: -0.4px;
          margin: 0 0 4px;
        }

        .testimonials h2 span {
          color: #8235d0;
          display: block;
        }

        .sub {
          max-width: 600px;
          margin: 18px auto 0;
          font-size: 16px;
          line-height: 1.8;
          color: rgba(26,10,46,0.55);
        }

        /* ── CAROUSEL ── */
        .carousel-outer {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-stage {
          position: relative;
          height: 560px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
          padding: 0 20px;
          touch-action: pan-y;
        }

        /* ── CARD ── */
        .t-card {
          position: absolute;
          width: 268px;
          border-radius: 24px;
          overflow: hidden;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: box-shadow 0.5s ease, border-color 0.5s ease;
        }

        .t-card.center-card {
          box-shadow: 0 16px 48px rgba(130,53,208,0.14), 0 4px 16px rgba(0,0,0,0.06);
          border-color: rgba(130,53,208,0.15);
          cursor: default;
        }

        .t-card.center-card.playing-glow {
          animation: card-glow 3s ease-in-out infinite;
        }

        @keyframes card-glow {
          0%, 100% { box-shadow: 0 16px 48px rgba(130,53,208,0.14), 0 4px 16px rgba(0,0,0,0.06); }
          50% { box-shadow: 0 20px 56px rgba(130,53,208,0.25), 0 8px 24px rgba(0,0,0,0.08); }
        }

        /* ── VIDEO ── */
        .t-video-wrap {
          width: 100%;
          aspect-ratio: 9/16;
          background: #111;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          touch-action: pan-y;
        }

        .center-play,
        .mute-btn,
        .fullscreen-btn {
          touch-action: manipulation;
        }

        .t-card {
          touch-action: pan-y;
        }

        .t-video-wrap::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40%;
          background: linear-gradient(to top, rgba(0,0,0,0.35), transparent);
          pointer-events: none;
          z-index: 5;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .t-card.center-card:hover .t-video-wrap::after {
          opacity: 1;
        }

        .t-video-wrap video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: rgba(255,255,255,0.18);
          z-index: 10;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #8235d0, #c084fc);
          border-radius: 0 2px 2px 0;
          transition: width 0.1s linear;
        }

        .center-play {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 8;
          transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1), background 0.3s ease, color 0.3s ease;
        }

        .center-play.paused {
          background: rgba(255,255,255,0.92);
          color: #8235d0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          animation: play-pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .center-play.playing {
          background: rgba(0,0,0,0.45);
          color: #fff;
          backdrop-filter: blur(4px);
          opacity: 1; /* Always visible */
        }

        .center-play.playing:hover {
          opacity: 1;
        }

        .center-play:hover {
          transform: translate(-50%, -50%) scale(1.1);
        }

        @keyframes play-pulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(0,0,0,0.15), 0 0 0 0 rgba(130,53,208,0.4); }
          50% { box-shadow: 0 4px 20px rgba(0,0,0,0.15), 0 0 0 14px rgba(130,53,208,0); }
        }

        .mute-btn {
          position: absolute;
          bottom: 12px;
          left: 10px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 9;
          backdrop-filter: blur(6px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          transition: all 0.25s ease;
        }

        .fullscreen-btn {
          position: absolute;
          bottom: 12px;
          right: 10px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 9;
          backdrop-filter: blur(6px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          transition: all 0.25s ease;
        }

        .fullscreen-btn:hover {
          background: rgba(255,255,255,1);
          transform: scale(1.12);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .mute-btn:hover {
          background: rgba(255,255,255,1);
          transform: scale(1.12);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        /* ── INFO ── */
        .t-info {
          padding: 16px 18px 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .t-name {
          font-family: "Gambarino", serif;
          font-size: 17px;
          font-weight: 600;
          color: #1a0a2e;
          margin: 0;
        }

        .t-city {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          color: #8235d0;
          text-transform: uppercase;
          margin: 0;
        }

        .t-children-location {
          font-size: 11px;
          font-weight: 600;
          color: rgba(130,53,208,0.7);
          margin: 0;
        }

        .t-divider {
          height: 1px;
          background: rgba(0,0,0,0.06);
        }

        .t-text {
          font-size: 13px;
          line-height: 1.65;
          color: rgba(26,10,46,0.65);
          font-style: italic;
          margin: 0;
        }

        .t-text.collapsed {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .t-text.expanded { display: block; }

        .read-more-btn {
          background: none;
          border: none;
          color: #8235d0;
          font-size: 12px;
          font-weight: 800;
          font-family: 'Nunito Sans', sans-serif;
          cursor: pointer;
          padding: 4px 0 0;
          letter-spacing: 0.3px;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s ease;
        }

        .read-more-btn:hover { color: #5f308e; }

        /* ── PLAYING INDICATOR ── */
        .playing-indicator {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
          z-index: 9;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .playing-indicator.visible { opacity: 1; }

        .playing-indicator span {
          display: block;
          width: 3px;
          height: 12px;
          background: #fff;
          border-radius: 2px;
          animation: eq-bar 0.8s ease-in-out infinite;
        }

        .playing-indicator span:nth-child(2) { animation-delay: 0.15s; height: 8px; }
        .playing-indicator span:nth-child(3) { animation-delay: 0.3s; height: 14px; }

        @keyframes eq-bar {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }

        /* ── ARROWS ── */
        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.95);
          border: 1px solid rgba(130,53,208,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8235d0;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(8px);
        }

        .carousel-arrow:hover {
          background: rgba(130,53,208,0.08);
          border-color: rgba(130,53,208,0.5);
          transform: translateY(-50%) scale(1.08);
        }

        .carousel-arrow.left { left: 16px; }
        .carousel-arrow.right { right: 16px; }

        /* ── DOTS ── */
        .carousel-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 28px;
        }

        .dot {
          height: 8px;
          border-radius: 10px;
          background: rgba(130,53,208,0.2);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
          width: 8px;
        }

        .dot.active {
          width: 24px;
          background: #8235d0;
        }

        .carousel-stage {
          max-width: 900px;
          margin: 0 auto;
        }

        /* ── FULLSCREEN MODAL ── */
        .fs-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fs-inner {
          position: relative;
          width: 100%;
          height: 100%;
          max-width: 480px;
          background: #000;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .fs-inner video {
          flex: 1;
          width: 100%;
          object-fit: contain;
          background: #000;
        }

        .fs-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.25);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          backdrop-filter: blur(8px);
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .fs-close:hover { background: rgba(255,255,255,0.2); transform: scale(1.08); }

        .fs-info {
          padding: 20px 24px;
          background: #111;
          color: #fff;
          flex-shrink: 0;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .fs-name {
          font-family: "Gambarino", serif;
          font-size: 22px;
          margin: 0 0 4px;
          color: #fff;
        }

        .fs-city {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #c084fc;
          text-transform: uppercase;
          margin: 0 0 10px;
        }

        .fs-text {
          font-size: 14px;
          line-height: 1.72;
          color: rgba(255,255,255,0.68);
          font-style: italic;
          margin: 0;
        }

        @media (max-width: 768px) {
          .carousel-stage { height: 460px; padding: 0 10px; }

          .t-card { width: 220px; }

          .carousel-arrow.left { left: 6px; }
          .carousel-arrow.right { right: 6px; }
          .fs-inner { max-width: 100%; }
          .fs-close { top: 10px; right: 10px; width: 36px; height: 36px; }
          .fs-info { padding: 14px 16px; }
          .fs-name { font-size: 18px; }
          .fs-city { font-size: 10px; }
          .fs-text { font-size: 13px; }
        }
      `}),(0,G.jsxs)(`div`,{className:`header-container`,children:[(0,G.jsx)(Y.span,{className:`tag`,initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{duration:.5,ease:[.22,1,.36,1]},viewport:{once:!0},children:`Testimonials`}),(0,G.jsxs)(Y.h2,{initial:{opacity:0,y:40},whileInView:{opacity:1,y:0},transition:{duration:.7,delay:.1,ease:[.22,1,.36,1]},viewport:{once:!0},children:[`Stories of trust.`,(0,G.jsx)(`span`,{children:`From families like yours.`})]}),(0,G.jsx)(Y.p,{className:`sub`,initial:{opacity:0,y:24},whileInView:{opacity:1,y:0},transition:{duration:.6,delay:.25,ease:[.22,1,.36,1]},viewport:{once:!0},children:`Real stories from families across Tamil Nadu who trust 60Plus to care for their loved ones with compassion, consistency, and dignity.`})]}),(0,G.jsxs)(`div`,{className:`carousel-outer`,children:[(0,G.jsx)(`button`,{className:`carousel-arrow left`,onClick:()=>re(-1),"aria-label":`Previous`,children:(0,G.jsx)(Gf,{size:22})}),(0,G.jsx)(`div`,{className:`carousel-stage`,children:Ip.map((n,s)=>{let c=s===t,p=ce(s);return p.display===`none`?null:(0,G.jsxs)(`div`,{className:`t-card${c?` center-card`:``}${c&&r===s?` playing-glow`:``}`,style:p,onTouchStart:e=>{if(e.target.closest(`.center-play`)||e.target.closest(`.mute-btn`)||e.target.closest(`.fullscreen-btn`)){y.current=!0;return}y.current=!1,x.current=e.touches[0].clientX},onTouchMove:e=>{y.current||(S.current=e.touches[0].clientX)},onTouchEnd:()=>{if(y.current){y.current=!1;return}let e=x.current-S.current;Math.abs(e)<50||(ne(),ee(e>0?t+1:t-1))},onClick:()=>{s!==t&&(ne(),ee(s))},children:[(0,G.jsxs)(`div`,{className:`t-video-wrap`,children:[(0,G.jsx)(`div`,{className:`progress-bar`,children:(0,G.jsx)(`div`,{className:`progress-fill`,style:{width:`${l[s]}%`}})}),(0,G.jsx)(`video`,{ref:t=>e.current[s]=t,"data-index":s,src:n.video,playsInline:!0,preload:`metadata`,muted:a,onPlay:()=>i(s),onPause:()=>i(e=>e===s?null:e),onTimeUpdate:e=>{let t=e.target.currentTime/e.target.duration*100||0;u(e=>{let n=[...e];return n[s]=t,n})},onEnded:()=>{i(null),ee(t+1)}}),c&&(0,G.jsxs)(G.Fragment,{children:[(0,G.jsxs)(`div`,{className:`playing-indicator${r===s?` visible`:``}`,children:[(0,G.jsx)(`span`,{}),(0,G.jsx)(`span`,{}),(0,G.jsx)(`span`,{})]}),(0,G.jsx)(`button`,{className:`center-play ${r===s?`playing`:`paused`}`,onClick:e=>{e.stopPropagation(),ae(s)},children:r===s?(0,G.jsx)(mp,{size:24}):(0,G.jsx)(vp,{size:24})}),(0,G.jsx)(`button`,{className:`mute-btn`,onClick:t=>{t.stopPropagation(),v.current=!0;let n=!a;o(n),e.current.forEach(e=>{e&&(e.muted=n)}),setTimeout(()=>v.current=!1,300)},children:a?(0,G.jsx)(Dp,{size:14}):(0,G.jsx)(Ep,{size:14})}),(0,G.jsx)(`button`,{className:`fullscreen-btn`,onClick:e=>oe(s,e),"aria-label":`Watch full video`,children:(0,G.jsx)(dp,{size:14})})]})]}),(0,G.jsxs)(`div`,{className:`t-info`,children:[(0,G.jsxs)(`div`,{children:[(0,G.jsx)(`p`,{className:`t-name`,children:n.name}),(0,G.jsx)(`p`,{className:`t-city`,children:n.city}),n.childrenIn&&(0,G.jsxs)(`p`,{className:`t-children-location`,children:[`✈ Children in `,n.childrenIn]})]}),(0,G.jsx)(`div`,{className:`t-divider`}),(0,G.jsxs)(`div`,{className:`t-text-wrap`,children:[(0,G.jsxs)(`p`,{className:`t-text ${d===s?`expanded`:`collapsed`}`,children:[`"`,n.text,`"`]}),c&&(0,G.jsx)(`button`,{className:`read-more-btn`,onClick:e=>{e.stopPropagation(),f(d===s?null:s)},children:d===s?`Show less ↑`:`Read more ↓`})]})]})]},n.id)})}),(0,G.jsx)(`button`,{className:`carousel-arrow right`,onClick:()=>re(1),"aria-label":`Next`,children:(0,G.jsx)(Kf,{size:22})})]}),(0,G.jsx)(`div`,{className:`carousel-dots`,children:Ip.map((e,n)=>(0,G.jsx)(`span`,{className:`dot${n===t?` active`:``}`,onClick:()=>ie(n)},n))}),p!==null&&(0,G.jsx)(`div`,{className:`fs-overlay`,onClick:se,children:(0,G.jsxs)(`div`,{className:`fs-inner`,onClick:e=>e.stopPropagation(),children:[(0,G.jsx)(`button`,{className:`fs-close`,onClick:se,children:(0,G.jsx)(kp,{size:16})}),(0,G.jsx)(`video`,{ref:h,src:Ip[p].video,controls:!0,playsInline:!0,autoPlay:!0}),(0,G.jsxs)(`div`,{className:`fs-info`,children:[(0,G.jsx)(`p`,{className:`fs-name`,children:Ip[p].name}),(0,G.jsx)(`p`,{className:`fs-city`,children:Ip[p].city}),(0,G.jsxs)(`p`,{className:`fs-text`,children:[`"`,Ip[p].text,`"`]})]})]})})]})}var Rp=[{label:`Instagram`,href:`https://www.instagram.com/life_after_sixty_tamil`,path:`M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z`},{label:`YouTube`,href:`https://m.youtube.com/@LifeAfterSixty-Tamil`,path:`M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.376.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.376-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z`}],zp=[[`Home`,`home`],[`Services`,`services`],[`Testimonials`,`testimonials`],[`About Us`,`/about`],[`Contact Us`,`/contact`]],Bp=[{icon:(0,G.jsx)(`path`,{d:`M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z`}),fill:`#8235d0`,content:(0,G.jsx)(`a`,{href:`tel:+919499944939`,children:`+91 94999 44939`})},{icon:(0,G.jsx)(`path`,{d:`M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.85L.057 23.885l6.233-1.633A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.359-.214-3.7.97.988-3.607-.234-.37A9.818 9.818 0 1112 21.818z`}),fill:`#8235d0`,content:(0,G.jsx)(`a`,{href:Cf(location.pathname),target:`_blank`,rel:`noopener noreferrer`,children:`Chat on WhatsApp`})},{icon:(0,G.jsx)(`path`,{d:`M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z`}),fill:`#8235d0`,content:(0,G.jsx)(`a`,{href:`mailto:reach@nurahub.com`,children:`reach@nurahub.com`})},{icon:(0,G.jsx)(`path`,{d:`M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z`}),fill:`#8235d0`,content:(0,G.jsxs)(`address`,{children:[`Nura AI Labs (Incubated at ITEL),`,(0,G.jsx)(`br`,{}),`Plot No. 22,`,(0,G.jsx)(`br`,{}),`Rajalakshmi Nagar, 3rd Main Road,`,(0,G.jsx)(`br`,{}),`Velachery, Chennai – 600 042,`,(0,G.jsx)(`br`,{}),`Tamil Nadu, India.`]})}],Vp={home:`home`,services:`services-cards`,testimonials:`testimonials`},Hp=()=>{let e=Qe(),t=Xe(),n=t.pathname===`/lottery`,r=n?`#b8956a`:`#8235d0`,i=n=>{let r=Vp[n];t.pathname===`/`?(()=>{let e=document.getElementById(r);if(e){let t=e.getBoundingClientRect().top+window.scrollY-76;window.scrollTo({top:t,behavior:`smooth`})}})():(sessionStorage.setItem(`scrollTo`,r),e(`/`))};return(0,G.jsxs)(`footer`,{className:`footer`,children:[(0,G.jsx)(`style`,{children:`
        .footer {
          background: #0f0a1f;
          color: rgba(255,255,255,0.8);
          padding: 60px 40px 28px;
          padding-bottom: calc(28px + var(--sb-h, 0px));
          font-family: 'Nunito Sans', sans-serif;
          transition: padding-bottom 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .footer-grid {
          max-width: 1160px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.7fr 0.9fr 1.4fr;
          gap: 48px;
          padding-bottom: 40px;
          align-items: start;
        }

        .footer-heading {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: rgba(255,255,255,0.9);
          margin: 0 0 20px 0;
          display: block;
        }

        /* COL 1 */
        .footer-logo-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .footer-logo-row img {
          height: 42px;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }
        .footer-logo-sep {
          width: 1px;
          height: 24px;
          background: rgba(255,255,255,0.2);
          flex-shrink: 0;
        }
        .footer-tagline {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255,255,255,0.45);
          margin: 0 0 28px 0;
          max-width: 300px;
        }
        .footer-social {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 4px;
        }
        .social-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          flex-shrink: 0;
          transition: background 0.22s, border-color 0.22s, transform 0.22s;
        }
        .social-icon:hover {
          background: ${r};
          border-color: ${r};
          transform: translateY(-3px);
        }
        .social-icon svg {
          width: 14px;
          height: 14px;
          fill: rgba(255,255,255,0.7);
          display: block;
        }
        .social-icon:hover svg { fill: #fff; }

        /* COL 2 */
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .footer-links a,
        .footer-links button {
          display: block;
          width: 100%;
          text-align: left;
          padding: 6px 0;
          text-decoration: none;
          color: rgba(255,255,255,0.5);
          font-size: 14px;
          font-weight: 500;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Nunito Sans', sans-serif;
          transition: color 0.2s, transform 0.2s;
        }
        .footer-links a:hover,
        .footer-links button:hover {
          color: #ffffff;
          transform: translateX(4px);
        }

        /* COL 3 */
        .footer-contact-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .footer-contact-icon {
          flex-shrink: 0;
          width: 16px;
          height: 16px;
          margin-top: 2px;
        }
        .footer-contact-item a,
        .footer-contact-item address {
          font-size: 13.5px;
          line-height: 1.65;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-style: normal;
          transition: color 0.2s;
        }
        .footer-contact-item a:hover { color: rgba(255,255,255,0.85); }
        
        /* BOTTOM BAR */
        .footer-bottom {
          max-width: 1160px;
          margin: 0 auto;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.07);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }
        .footer-bottom p {
          font-size: 12.5px;
          color: rgba(255,255,255,0.28);
          margin: 0;
        }
        .footer-bottom-links {
          display: flex;
          gap: 10px;
          white-space: nowrap;
          flex-wrap: nowrap;
        }

        @media (min-width: 861px) {
          .footer-bottom-links {
            margin-right: 80px;   /* push left slightly */
          }
        }
        .footer-bottom-links a {
          font-size: 12.5px;
          color: rgba(255,255,255,0.38);
          text-decoration: none;
          padding: 3px 8px;
          border-radius: 4px;
          transition: color 0.2s;
        }
        .footer-bottom-links a:hover { color: #fff; }

        /* MOBILE */
        @media (max-width: 860px) {
          .footer { padding: 52px 24px 28px; padding-bottom: calc(28px + var(--sb-h, 0px)); }
          .footer-grid { grid-template-columns: 1fr; gap: 36px; }
          .footer-tagline { max-width: 100%; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}),(0,G.jsxs)(`div`,{className:`footer-grid`,children:[(0,G.jsxs)(`div`,{children:[(0,G.jsxs)(`div`,{className:`footer-logo-row`,children:[(0,G.jsx)(`img`,{src:`/logo/60_plus_india.png`,alt:`60 Plus`}),(0,G.jsx)(`span`,{className:`footer-logo-sep`}),(0,G.jsx)(`img`,{src:`/logo/ITEL_LOGO.png`,alt:`ITEL`})]}),(0,G.jsx)(`p`,{className:`footer-tagline`,children:`Helping you care for your parents - even from miles away.`}),(0,G.jsx)(`span`,{className:`footer-heading`,children:`Follow Us`}),(0,G.jsx)(`div`,{className:`footer-social`,children:Rp.map(e=>(0,G.jsx)(`a`,{href:e.href,target:`_blank`,rel:`noopener noreferrer`,className:`social-icon`,"aria-label":e.label,children:(0,G.jsx)(`svg`,{viewBox:`0 0 24 24`,children:(0,G.jsx)(`path`,{d:e.path})})},e.label))})]}),(0,G.jsxs)(`div`,{children:[(0,G.jsx)(`span`,{className:`footer-heading`,children:`Quick Links`}),(0,G.jsx)(`div`,{className:`footer-links`,children:zp.map(([e,t])=>[`home`,`services`,`testimonials`].includes(t)?(0,G.jsx)(`button`,{onClick:()=>i(t),children:e},e):(0,G.jsx)(It,{to:t,onClick:()=>window.scrollTo(0,0),children:e},e))})]}),(0,G.jsxs)(`div`,{children:[(0,G.jsx)(`span`,{className:`footer-heading`,children:`Contact Info`}),(0,G.jsx)(`div`,{className:`footer-contact-list`,children:Bp.map((e,t)=>(0,G.jsxs)(`div`,{className:`footer-contact-item`,children:[(0,G.jsx)(`svg`,{className:`footer-contact-icon`,viewBox:`0 0 24 24`,fill:n?`#b8956a`:e.fill,xmlns:`http://www.w3.org/2000/svg`,children:e.icon}),(0,G.jsx)(`div`,{children:e.content})]},t))})]})]}),(0,G.jsxs)(`div`,{className:`footer-bottom`,children:[(0,G.jsx)(`p`,{children:`© 2026 60Plus India. All rights reserved.`}),(0,G.jsxs)(`div`,{className:`footer-bottom-links`,children:[(0,G.jsx)(`a`,{href:`/terms-and-conditions`,children:`Terms & Conditions`}),(0,G.jsx)(`a`,{href:`/privacy-policy`,children:`Privacy Policy`})]})]})]})},Up=()=>{let e=Xe();return(0,G.jsxs)(`div`,{className:`wa-container`,children:[(0,G.jsx)(`style`,{children:`
            .wa-container {
              position: fixed;
              bottom: calc(30px + var(--sb-h, 0px));
              right: 24px;
              z-index: 999;
              display: flex;
              flex-direction: row;
              align-items: center;
              gap: 8px;
              transition: bottom 0.4s cubic-bezier(0.22, 1, 0.36, 1);
            }

            /* TEXT - always visible */
            .wa-text {
              background: white;
              color: #1a0a2e;
              padding: 8px 14px;
              border-radius: 999px;
              font-size: 13px;
              font-weight: 500;
              box-shadow: 0 6px 20px rgba(0,0,0,0.08);
              white-space: nowrap;
            }

            /* BUTTON */
            .wa-btn {
              position: relative;
              width: 56px;
              height: 56px;
              border-radius: 50%;
              background: #25D366;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 10px 25px rgba(0,0,0,0.15);
              transition: transform 0.22s;
            }

            .wa-btn:hover {
              transform: translateY(-3px);
            }

            /* ICON */
            .wa-btn svg {
              width: 26px;
              height: 26px;
              fill: #fff;
            }

/* MOBILE */
            @media (max-width: 768px) {
              .wa-text {
                display: none;
              }

              .wa-container {
                right: 16px;
                bottom: calc(30px + var(--sb-h, 0px));
              }
            }
          `}),(0,G.jsx)(`div`,{className:`wa-text`,children:`Talk to our team`}),(0,G.jsx)(`a`,{href:Cf(e.pathname),target:`_blank`,rel:`noopener noreferrer`,className:`wa-btn`,children:(0,G.jsxs)(`svg`,{viewBox:`0 0 24 24`,children:[(0,G.jsx)(`path`,{d:`M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z`}),(0,G.jsx)(`path`,{d:`M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.85L.057 23.885l6.233-1.633A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.359-.214-3.7.97.988-3.607-.234-.37A9.818 9.818 0 1112 21.818z`})]})})]})},Wp=()=>{let[e,t]=(0,b.useState)(!1),[n,r]=(0,b.useState)(!1),i=Qe(),a=Xe();(0,b.useEffect)(()=>{window.scrollY;let e=()=>{window.scrollY>300?t(!0):t(!1);let e=document.querySelector(`.footer`);if(e){let t=e.getBoundingClientRect(),n=window.innerHeight;t.top<n?r(!0):r(!1)}};return window.addEventListener(`scroll`,e,{passive:!0}),()=>window.removeEventListener(`scroll`,e)},[]);let o=e&&!n;return(0,b.useEffect)(()=>{document.body.style.setProperty(`--sb-h`,o?`60px`:`0px`)},[o]),(0,b.useEffect)(()=>()=>document.body.style.removeProperty(`--sb-h`),[]),(0,G.jsxs)(`div`,{className:`sticky-banner ${o?`sticky-banner--visible`:``}`,children:[(0,G.jsx)(`style`,{children:`
        .sticky-banner {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 998;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 0;
          overflow: hidden;
          transition: height 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 0.3s ease;
          opacity: 0;
          pointer-events: none;
          font-family: 'Nunito Sans', sans-serif;
        }

        .sticky-banner--visible {
          height: 64px;
          opacity: 1;
          pointer-events: auto;
        }

        .sticky-banner-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          width: 100%;
          background: linear-gradient(94deg, #8235d0 -2.32%, #5f308e 99.71%);
          padding: 10px 40px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 -4px 30px rgba(130, 53, 208, 0.25);
        }

        .sticky-banner-inner::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.08) 0%, transparent 60%);
          pointer-events: none;
        }

        .sticky-banner-text {
          color: rgba(255, 255, 255, 0.95);
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.3px;
          white-space: nowrap;
          text-align: center;
        }

        .sticky-banner-text span {
          color: #fff;
          font-weight: 800;
        }

        .sticky-banner-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.95);
          color: #8235d0;
          border: none;
          border-radius: 999px;
          padding: 10px 24px;
          font-size: 14px;
          font-weight: 700;
          font-family: 'Nunito Sans', sans-serif;
          cursor: pointer;
          white-space: nowrap;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
          position: relative;
          z-index: 1;
        }

        .sticky-banner-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        .sticky-banner-cta:active {
          transform: translateY(0);
        }

        .sticky-banner-cta svg {
          width: 14px;
          height: 14px;
          transition: transform 0.2s;
        }

        .sticky-banner-cta:hover svg {
          transform: translateX(2px);
        }

        @media (max-width: 640px) {
          .sticky-banner--visible {
            height: 56px;
          }

          .sticky-banner-inner {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
            gap: 10px;
          }

          .sticky-banner-text {
            font-size: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 65%;
          }

          .sticky-banner-cta {
            padding: 6px 14px;
            font-size: 12px;
            flex-shrink: 0;
          }
        }
      `}),(0,G.jsxs)(`div`,{className:`sticky-banner-inner`,children:[(0,G.jsx)(`p`,{className:`sticky-banner-text`,children:a.pathname.includes(`book-free-senior-home-safety-assessment`)?(0,G.jsxs)(G.Fragment,{children:[`Free `,(0,G.jsx)(`span`,{children:`home safety check`}),` for your parents in Chennai`]}):(0,G.jsxs)(G.Fragment,{children:[`Get a `,(0,G.jsx)(`span`,{children:`free home safety assessment`}),` for your parents`]})}),(0,G.jsxs)(`button`,{className:`sticky-banner-cta`,onClick:()=>{if(a.pathname.includes(`book-free-senior-home-safety-assessment`)){let e=document.getElementById(`bfsa-hero-form`);if(e){let t=e.getBoundingClientRect().top+window.scrollY-90;window.scrollTo({top:t,behavior:`smooth`})}}else i(`/book-free-senior-home-safety-assessment`)},children:[a.pathname.includes(`book-free-senior-home-safety-assessment`)?`Book Now`:`Book Free`,(0,G.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,G.jsx)(`path`,{d:`M5 12h14M12 5l7 7-7 7`})})]})]})]})};function Gp(){let[e,t]=(0,b.useState)(!1);return(0,b.useEffect)(()=>{let e=()=>{t(window.scrollY>window.innerHeight*.6)};return e(),window.addEventListener(`scroll`,e),()=>window.removeEventListener(`scroll`,e)},[]),(0,G.jsx)(wu,{children:e&&(0,G.jsxs)(Y.div,{className:`scroll-top`,onClick:()=>{window.scrollTo({top:0,behavior:`smooth`})},initial:{opacity:0,y:40,scale:.9},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:40,scale:.9},transition:{duration:.4,ease:`easeInOut`},children:[(0,G.jsx)(`style`,{children:`
            .scroll-top {
              position: fixed;
              bottom: calc(100px + var(--sb-h, 0px));
              right: 24px;
              width: 56px;
              height: 56px;
              border-radius: 50%;
              background: linear-gradient(135deg, #8235d0, #5f308e);
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              z-index: 999;
              transition: bottom 0.4s cubic-bezier(0.22, 1, 0.36, 1);
            }

            .scroll-top:hover {
              transform: translateY(-4px) scale(1.08);
            }

            .scroll-top svg {
              width: 22px;
              height: 22px;
              fill: white;
            }

            @media (max-width: 768px) {
              .scroll-top {
                right: 16px;
                bottom: calc(100px + var(--sb-h, 0px));
                width: 56px;
                height: 56px;
              }
            }
          `}),(0,G.jsx)(`svg`,{viewBox:`0 0 24 24`,children:(0,G.jsx)(`path`,{d:`M12 4l-8 8h5v8h6v-8h5z`})})]})})}function Kp({items:e=[]}){return(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(`style`,{children:`
        .bc-wrapper {
          max-width: 1000px;
          width: 100%;
          margin: 20px 0 10px;
          padding: 0 24px;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 14px;
          color: rgba(26, 10, 46, 0.65);
          box-sizing: border-box;
          text-align: left;
        }
        .bc-wrapper a {
          color: #8235d0;
          text-decoration: none;
          font-weight: 700;
        }
        .bc-wrapper a:hover {
          text-decoration: underline;
        }
        .bc-sep {
          margin: 0 8px;
          color: rgba(26, 10, 46, 0.4);
        }
        .bc-current {
          color: rgba(26, 10, 46, 0.65);
        }
      `}),(0,G.jsxs)(`div`,{className:`bc-wrapper`,children:[(0,G.jsx)(It,{to:`/`,children:`Home`}),e.map((e,t)=>(0,G.jsxs)(`span`,{children:[(0,G.jsx)(`span`,{className:`bc-sep`,children:`>`}),e.href?(0,G.jsx)(It,{to:e.href,children:e.label}):(0,G.jsx)(`span`,{className:`bc-current`,children:e.label})]},t))]})]})}function qp(e,t,n){(0,b.useEffect)(()=>{document.title=e;let r=(e,t,n)=>{let r=document.querySelector(`meta[${e}="${t}"]`);r||(r=document.createElement(`meta`),r.setAttribute(e,t),document.head.appendChild(r)),r.setAttribute(`content`,n)};r(`name`,`description`,t),r(`name`,`keywords`,n),r(`property`,`og:title`,e),r(`property`,`og:description`,t),r(`property`,`og:type`,`website`),r(`property`,`twitter:title`,e),r(`property`,`twitter:description`,t),r(`property`,`twitter:card`,`summary_large_image`)},[e,t,n])}var Jp={"monthly-doctor-visit":{title:`Monthly Doctor Home Visit for Seniors in Tamil Nadu | 60Plus India`,description:`Skip the hospital wait. 60Plus provides professional monthly doctor home visits for seniors in Tamil Nadu. Personalized medical care, chronic condition monitoring, and preventive health checks for your parents.`},"24-7-emergency-call":{title:`24/7 Emergency Response for Elderly in Tamil Nadu | 60Plus India`,description:`Never worry about your parents being alone. 60Plus provides 24/7 emergency support for seniors in Tamil Nadu with <60s response time, medical coordination, and real-time family alerts.`},"24-7-companion":{title:`24/7 Companion & Home Assistance for Seniors in Tamil Nadu | 60Plus India`,description:`Ensure your parents are never alone. 60Plus offers professional 24/7 companion care in Tamil Nadu, providing emotional support, daily living assistance, and safety supervision to combat isolation and ensure well-being.`},"monthly-care-executive-visit":{title:`Monthly Care Executive Visits & Home Safety for Seniors | 60Plus India`,description:`Ensure your parents' home is safe and comfortable. 60Plus provides monthly Care Executive visits in Tamil Nadu for home safety audits, lifestyle monitoring, and detailed reports for families living abroad.`},"integrated-senior-health-index":{title:`Integrated Senior Health Index & Health Tracking | 60Plus India`,description:`Stop managing scattered medical reports. 60Plus Integrated Senior Health Index offers a unified 360° view of your parent's health. Track vitals, identify medical risks, and make data-driven decisions from anywhere.`},"senior-home-safety-assessment":{title:`Senior Home Safety Assessment & Fall Prevention Tamil Nadu | 60Plus India`,description:`Protect your parents from falls and accidents. 60Plus provides professional senior home safety assessments in Tamil Nadu, including fall risk audits, grab bar recommendations, and security enhancements for independent living.`},"digitalization-of-medical-records":{title:`Digitalize & Organize Medical Records for Seniors | 60Plus India`,description:`Stop losing critical health reports. 60Plus collects, organizes, and digitizes your parents' medical records in Tamil Nadu. Secure, structured, and accessible anywhere - ideal for NRI families.`},"voice-reminder-for-parents":{title:`Voice Medication Reminders & Senior Check-in Calls | 60Plus India`,description:`Ensure your parents never miss a dose. 60Plus provides personalized voice reminders and check-in calls for seniors in Tamil Nadu. Professional medication alerts and routine support for NRI families.`},"daily-updates-to-children":{title:`Daily Wellness Updates for NRI Parents in India | 60Plus India`,description:`Stay connected with your parents in Tamil Nadu. 60Plus provides daily health updates, activity summaries, and real-time alerts for families living abroad. Ensure peace of mind with professional remote monitoring.`},"free-online-community":{title:`Online Community for Seniors in India | Social Engagement | 60Plus India`,description:`Fight senior loneliness with 60Plus. Our moderated online community for elderly parents in India offers group activities, social interaction, and emotional support. A safe space for NRIs' parents to stay active.`},"audiologist-home-visit":{title:`Audiologist Home Visit for Seniors in Tamil Nadu | 60Plus India`,description:`Professional hearing care at home. 60Plus provides monthly audiologist visits for seniors in Tamil Nadu, including hearing assessments, hearing aid maintenance, and family updates. No more clinic visits.`},"medicine-delivery":{title:`Reliable Medicine Delivery for Seniors in Tamil Nadu | 60Plus India`,description:`Ensure your parents never miss a dose. 60Plus provides managed medicine delivery for seniors in Tamil Nadu, including prescription verification, proactive refills, and verified sourcing. Perfect for NRI families.`},"senior-citizen-insurance-assessment":{title:`Health Insurance Assessment for Senior Citizens in India | 60Plus India`,description:`Ensure your parents have the right financial protection. 60Plus offers expert health insurance assessment for senior citizens in India, helping NRI families evaluate, choose, and manage the best medical coverage for parents.`},"velai-consultation":{title:`Post-Retirement Jobs & Engagement for Seniors in India | 60Plus India`,description:`Help your parents stay active and purposeful. 60Plus Velai Consultation offers post-retirement job opportunities, part-time roles, and knowledge-sharing activities for seniors in India. Rediscover purpose after 60.`},"trip-consultation":{title:`Safe Senior Travel Planning & Trip Consultation India | 60Plus India`,description:`Plan safe, comfortable, and stress-free trips for your parents. 60Plus offers expert trip consultation for seniors in India, focusing on accessibility, health needs, and travel support. Peace of mind for NRI families.`},"nutrition-consultation":{title:`Senior Nutrition Consultation & Diet Plans in Tamil Nadu | 60Plus India`,description:`Personalized dietary guidance for healthy aging. 60Plus offers expert nutrition consultation for seniors in Tamil Nadu, focusing on diabetes, heart health, and immunity. Expert dietitians for NRI parents.`},"on-demand-services":{title:`On-Demand Home Assistance & Errands for Seniors in Tamil Nadu | 60Plus India`,description:`Get flexible, on-demand support for your parents in Tamil Nadu. From daily errands and bill payments to household maintenance coordination, 60Plus provides reliable assistance for seniors living alone.`},"complimentary-products":{title:`Complimentary Senior Care Products & Wellness Essentials | 60Plus India`,description:`Enhance your parents' daily comfort with curated wellness essentials. 60Plus Premium includes 4 complimentary senior-friendly products delivered quarterly to parents in Tamil Nadu. Stress-free care for NRI families.`},"blood-test":{title:`Blood Test at Home for Seniors in Tamil Nadu | 60Plus India`,description:`Safe and convenient diagnostic testing for your parents. 60Plus provides blood test home sample collection in Tamil Nadu with certified lab analysis and digital reports. Proactive health monitoring for NRI families.`},"offline-events":{title:`Senior Citizen Social Events & Meetups in Tamil Nadu | 60Plus India`,description:`Keep your parents socially active and happy. 60Plus organizes safe, engaging offline events and community meetups for seniors in Tamil Nadu. From cultural programs to learning sessions, we help reduce isolation.`},"gait-analysis":{title:`Gait Analysis & Mobility Assessment for Seniors in Tamil Nadu | 60Plus India`,description:`Prevent falls before they happen. 60Plus offers professional at-home Gait Analysis for seniors in Tamil Nadu. We analyze walking patterns and balance to ensure safe mobility and independence for your parents.`}},Yp={"monthly-doctor-visit":{"@context":`https://schema.org`,"@type":`Service`,serviceType:`Monthly Doctor Home Visit`,provider:{"@type":`LocalBusiness`,name:`60Plus India`,address:{"@type":`PostalAddress`,streetAddress:`Plot No 22, Rajalakshmi Nagar, Velacheri`,addressLocality:`Chennai`,addressRegion:`TN`,postalCode:`600042`,addressCountry:`IN`}},areaServed:{"@type":`State`,name:`Tamil Nadu`},description:`Professional monthly doctor consultations at home for elderly individuals, focusing on personalized treatment, preventive care, and chronic condition management.`,offers:{"@type":`Offer`,description:`Part of the 21-service Premium Plan`,price:`200.00`,priceCurrency:`USD`},hasOfferCatalog:{"@type":`OfferCatalog`,name:`Elderly Healthcare Services`,itemListElement:[{"@type":`Offer`,itemOffered:{"@type":`Service`,name:`Personalized Medical Care`}},{"@type":`Offer`,itemOffered:{"@type":`Service`,name:`Preventive Health Monitoring`}}]}},"24-7-emergency-call":{"@context":`https://schema.org`,"@type":`Service`,serviceType:`24/7 Emergency Call & Support`,provider:{"@type":`LocalBusiness`,name:`60Plus India`,address:{"@type":`PostalAddress`,streetAddress:`Plot No 22, Rajalakshmi Nagar, Velacheri`,addressLocality:`Chennai`,addressRegion:`TN`,postalCode:`600042`,addressCountry:`IN`}},areaServed:{"@type":`State`,name:`Tamil Nadu`},description:`Immediate 24/7 emergency support for elderly parents including medical coordination, family notifications, and support for non-medical distress like anxiety or confusion.`,availableChannel:{"@type":`ServiceChannel`,serviceUrl:`https://www.60plusindia.com`,availableLanguage:[`English`,`Tamil`]},offers:{"@type":`Offer`,description:`Part of the 21-service Premium Plan`,price:`200.00`,priceCurrency:`USD`}},"24-7-companion":{"@context":`https://schema.org`,"@type":`Service`,serviceType:`24/7 Companion and Daily Assistance`,provider:{"@type":`LocalBusiness`,name:`60Plus India`,address:{"@type":`PostalAddress`,streetAddress:`Plot No 22, Rajalakshmi Nagar, Velacheri`,addressLocality:`Chennai`,addressRegion:`TN`,postalCode:`600042`,addressCountry:`IN`}},areaServed:{"@type":`State`,name:`Tamil Nadu`},description:`Continuous 24/7 companionship for elderly individuals focusing on emotional stability, daily living assistance, safety supervision, and family coordination.`,offers:{"@type":`Offer`,description:`Part of the 21-service Premium Plan`,price:`200.00`,priceCurrency:`USD`}},"monthly-care-executive-visit":{"@context":`https://schema.org`,"@type":`Service`,serviceType:`Monthly Care Executive Visit & Home Safety Audit`,provider:{"@type":`LocalBusiness`,name:`60Plus India`,address:{"@type":`PostalAddress`,streetAddress:`Plot No 22, Rajalakshmi Nagar, Velacheri`,addressLocality:`Chennai`,addressRegion:`TN`,postalCode:`600042`,addressCountry:`IN`}},areaServed:{"@type":`State`,name:`Tamil Nadu`},description:`Professional monthly home visits to assess elderly living conditions, identify safety risks, monitor lifestyle habits, and provide structured reports to family members abroad.`,offers:{"@type":`Offer`,description:`Included in the 21-service Premium Plan`,price:`200.00`,priceCurrency:`USD`}},"integrated-senior-health-index":{"@context":`https://schema.org`,"@type":`Service`,serviceType:`Integrated Senior Health Index & Monitoring`,provider:{"@type":`LocalBusiness`,name:`60Plus India`,address:{"@type":`PostalAddress`,streetAddress:`Plot No 22, Rajalakshmi Nagar, Velacheri`,addressLocality:`Chennai`,addressRegion:`TN`,postalCode:`600042`,addressCountry:`IN`}},areaServed:{"@type":`State`,name:`Tamil Nadu`},description:`A comprehensive health tracking system that combines medical history, lifestyle habits, and routine check-up data into a single, data-driven health index for seniors.`,offers:{"@type":`Offer`,description:`Included in the 21-service Premium Plan`,price:`200.00`,priceCurrency:`USD`}},"senior-home-safety-assessment":{"@context":`https://schema.org`,"@type":`Service`,serviceType:`Senior Home Safety Assessment`,provider:{"@type":`LocalBusiness`,name:`60Plus India`,address:{"@type":`PostalAddress`,streetAddress:`Plot No 22, Rajalakshmi Nagar, Velacheri`,addressLocality:`Chennai`,addressRegion:`TN`,postalCode:`600042`,addressCountry:`IN`}},areaServed:{"@type":`State`,name:`Tamil Nadu`},description:`Professional evaluation of home environments to identify fall risks, suggest accessibility improvements, and enhance security for elderly individuals living independently.`,offers:{"@type":`Offer`,description:`Included in the 21-service Premium Plan`,price:`200.00`,priceCurrency:`USD`}},"digitalization-of-medical-records":{"@context":`https://schema.org`,"@type":`Service`,serviceType:`Digitalization of Medical Records for Seniors`,provider:{"@type":`LocalBusiness`,name:`60Plus India`,address:{"@type":`PostalAddress`,streetAddress:`Plot No 22, Rajalakshmi Nagar, Velacheri`,addressLocality:`Chennai`,addressRegion:`TN`,postalCode:`600042`,addressCountry:`IN`}},areaServed:{"@type":`State`,name:`Tamil Nadu`},description:`Professional collection and digitalization of physical medical documents including lab reports, prescriptions, and scan reports into a secure, structured digital format for easy access and sharing.`,offers:{"@type":`Offer`,description:`Included in the 21-service Premium Plan`,price:`200.00`,priceCurrency:`USD`}},"voice-reminder-for-parents":{"@context":`https://schema.org`,"@type":`Service`,serviceType:`Voice Reminder & Senior Check-in Service`,provider:{"@type":`LocalBusiness`,name:`60Plus India`,address:{"@type":`PostalAddress`,streetAddress:`Plot No 22, Rajalakshmi Nagar, Velacheri`,addressLocality:`Chennai`,addressRegion:`TN`,postalCode:`600042`,addressCountry:`IN`}},areaServed:{"@type":`State`,name:`Tamil Nadu`},description:`Personalized voice-based reminders for medications, daily routines, and appointments, coupled with regular human check-in calls to ensure senior well-being and combat isolation.`,offers:{"@type":`Offer`,description:`Included in the 21-service Premium Plan`,price:`200.00`,priceCurrency:`USD`}},"daily-updates-to-children":{"@context":`https://schema.org`,"@type":`Service`,serviceType:`Daily Remote Monitoring and Family Updates`,provider:{"@type":`LocalBusiness`,name:`60Plus India`,address:{"@type":`PostalAddress`,streetAddress:`Plot No 22, Rajalakshmi Nagar, Velacheri`,addressLocality:`Chennai`,addressRegion:`TN`,postalCode:`600042`,addressCountry:`IN`}},areaServed:{"@type":`State`,name:`Tamil Nadu`},description:`A structured reporting service for NRIs providing daily summaries of their parents' health, medication adherence, daily activities, and real-time alerts from the care team.`,offers:{"@type":`Offer`,description:`Included in the 21-service Premium Plan`,price:`200.00`,priceCurrency:`USD`}},"free-online-community":{"@context":`https://schema.org`,"@type":`Service`,serviceType:`Senior Online Community & Social Engagement`,provider:{"@type":`LocalBusiness`,name:`60Plus India`,address:{"@type":`PostalAddress`,streetAddress:`Plot No 22, Rajalakshmi Nagar, Velacheri`,addressLocality:`Chennai`,addressRegion:`TN`,postalCode:`600042`,addressCountry:`IN`}},areaServed:{"@type":`State`,name:`Tamil Nadu`},description:`A safe, moderated online platform for elderly individuals to engage in social interaction, group activities, and emotional support to combat isolation.`,offers:{"@type":`Offer`,description:`Included in the 21-service Premium Plan`,price:`200.00`,priceCurrency:`USD`}},"audiologist-home-visit":{"@context":`https://schema.org`,"@type":`Service`,serviceType:`Audiologist Home Visit`,provider:{"@type":`LocalBusiness`,name:`60Plus India`,address:{"@type":`PostalAddress`,streetAddress:`Plot No 22, Rajalakshmi Nagar, Velacheri`,addressLocality:`Chennai`,addressRegion:`TN`,postalCode:`600042`,addressCountry:`IN`}},areaServed:{"@type":`State`,name:`Tamil Nadu`},description:`Professional at-home hearing assessments, hearing aid maintenance, and hearing health guidance for elderly individuals in Tamil Nadu.`,offers:{"@type":`Offer`,description:`Included in the 21-service Premium Plan`,price:`200.00`,priceCurrency:`USD`}},"medicine-delivery":{"@context":`https://schema.org`,"@type":`Service`,serviceType:`Managed Medicine Delivery for Seniors`,provider:{"@type":`LocalBusiness`,name:`60Plus India`,address:{"@type":`PostalAddress`,streetAddress:`Plot No 22, Rajalakshmi Nagar, Velacheri`,addressLocality:`Chennai`,addressRegion:`TN`,postalCode:`600042`,addressCountry:`IN`}},areaServed:{"@type":`State`,name:`Tamil Nadu`},description:`Prescription-based medicine procurement and doorstep delivery service for elderly individuals, featuring proactive refill management and coordination with healthcare providers.`,offers:{"@type":`Offer`,description:`Included in the 21-service Premium Plan`,price:`200.00`,priceCurrency:`USD`}},"senior-citizen-insurance-assessment":{"@context":`https://schema.org`,"@type":`Service`,serviceType:`Senior Citizen Health Insurance Assessment`,provider:{"@type":`LocalBusiness`,name:`60Plus India`,address:{"@type":`PostalAddress`,streetAddress:`Plot No 22, Rajalakshmi Nagar, Velacheri`,addressLocality:`Chennai`,addressRegion:`TN`,postalCode:`600042`,addressCountry:`IN`}},areaServed:{"@type":`State`,name:`Tamil Nadu`},description:`Expert evaluation and guidance on health insurance for senior citizens, helping families choose the right coverage to manage medical costs and financial risks.`,offers:{"@type":`Offer`,description:`Included in the 21-service Premium Plan`,price:`200.00`,priceCurrency:`USD`}},"velai-consultation":{"@context":`https://schema.org`,"@type":`Service`,serviceType:`Velai Consultation (Senior Post-Retirement Engagement)`,provider:{"@type":`LocalBusiness`,name:`60Plus India`,address:{"@type":`PostalAddress`,streetAddress:`Plot No 22, Rajalakshmi Nagar, Velacheri`,addressLocality:`Chennai`,addressRegion:`TN`,postalCode:`600042`,addressCountry:`IN`}},areaServed:{"@type":`State`,name:`Tamil Nadu`},description:`A consultation service helping senior citizens find meaningful post-retirement opportunities, including part-time roles, flexible work-from-home options, and knowledge-sharing activities to maintain an active lifestyle.`,offers:{"@type":`Offer`,description:`Included in the 21-service Premium Plan`,price:`200.00`,priceCurrency:`USD`}},"trip-consultation":{"@context":`https://schema.org`,"@type":`Service`,serviceType:`Senior Trip Consultation & Travel Planning`,provider:{"@type":`LocalBusiness`,name:`60Plus India`,address:{"@type":`PostalAddress`,streetAddress:`Plot No 22, Rajalakshmi Nagar, Velacheri`,addressLocality:`Chennai`,addressRegion:`TN`,postalCode:`600042`,addressCountry:`IN`}},areaServed:{"@type":`State`,name:`Tamil Nadu`},description:`Expert travel planning for elderly individuals, focusing on senior-friendly destinations, health and safety considerations, and complete logistical support for comfortable journeys.`,offers:{"@type":`Offer`,description:`Included in the 21-service Premium Plan`,price:`200.00`,priceCurrency:`USD`}},"nutrition-consultation":{"@context":`https://schema.org`,"@type":`Service`,serviceType:`Senior Nutrition Consultation`,provider:{"@type":`LocalBusiness`,name:`60Plus India`,address:{"@type":`PostalAddress`,streetAddress:`Plot No 22, Rajalakshmi Nagar, Velacheri`,addressLocality:`Chennai`,addressRegion:`TN`,postalCode:`600042`,addressCountry:`IN`}},areaServed:{"@type":`State`,name:`Tamil Nadu`},description:`Personalized dietary and nutrition consultation for elderly individuals, specializing in meal planning for chronic conditions like diabetes and heart health to support healthy aging.`,offers:{"@type":`Offer`,description:`Included in the 21-service Premium Plan`,price:`200.00`,priceCurrency:`USD`}},"on-demand-services":{"@context":`https://schema.org`,"@type":`Service`,serviceType:`On-Demand Senior Assistance and Concierge`,provider:{"@type":`LocalBusiness`,name:`60Plus India`,address:{"@type":`PostalAddress`,streetAddress:`Plot No 22, Rajalakshmi Nagar, Velacheri`,addressLocality:`Chennai`,addressRegion:`TN`,postalCode:`600042`,addressCountry:`IN`}},areaServed:{"@type":`State`,name:`Tamil Nadu`},description:`Flexible on-demand support for elderly individuals including daily errands, bill payments, household maintenance coordination, and custom request handling through verified assistants.`,offers:{"@type":`Offer`,description:`Included in the 21-service Premium Plan`,price:`200.00`,priceCurrency:`USD`}},"complimentary-products":{"@context":`https://schema.org`,"@type":`Service`,serviceType:`Complimentary Senior Wellness Products`,provider:{"@type":`LocalBusiness`,name:`60Plus India`,address:{"@type":`PostalAddress`,streetAddress:`Plot No 22, Rajalakshmi Nagar, Velacheri`,addressLocality:`Chennai`,addressRegion:`TN`,postalCode:`600042`,addressCountry:`IN`}},areaServed:{"@type":`State`,name:`Tamil Nadu`},description:`Quarterly delivery of curated essential products designed to support health, safety, and daily comfort for senior citizens living independently.`,offers:{"@type":`Offer`,description:`Included in the 21-service Premium Plan (4 products per year)`,price:`200.00`,priceCurrency:`USD`}},"blood-test":{"@context":`https://schema.org`,"@type":`Service`,serviceType:`Blood Test at Home & Diagnostic Support`,provider:{"@type":`LocalBusiness`,name:`60Plus India`,address:{"@type":`PostalAddress`,streetAddress:`Plot No 22, Rajalakshmi Nagar, Velacheri`,addressLocality:`Chennai`,addressRegion:`TN`,postalCode:`600042`,addressCountry:`IN`}},areaServed:{"@type":`State`,name:`Tamil Nadu`},description:`Professional home-based diagnostic sample collection for seniors, featuring certified laboratory analysis, hygienic protocols, and digital/physical report delivery.`,offers:{"@type":`Offer`,description:`Included in the 21-service Premium Plan`,price:`200.00`,priceCurrency:`USD`}},"offline-events":{"@context":`https://schema.org`,"@type":`Service`,serviceType:`Senior Social Events and Community Engagement`,provider:{"@type":`LocalBusiness`,name:`60Plus India`,address:{"@type":`PostalAddress`,streetAddress:`Plot No 22, Rajalakshmi Nagar, Velacheri`,addressLocality:`Chennai`,addressRegion:`TN`,postalCode:`600042`,addressCountry:`IN`}},areaServed:{"@type":`State`,name:`Tamil Nadu`},description:`Organized offline events, social gatherings, and recreational activities for seniors designed to reduce loneliness and promote mental well-being in a safe, supportive environment.`,offers:{"@type":`Offer`,description:`Included in the 21-service Premium Plan`,price:`200.00`,priceCurrency:`USD`}},"gait-analysis":{"@context":`https://schema.org`,"@type":`Service`,serviceType:`Gait Analysis and Mobility Assessment`,provider:{"@type":`LocalBusiness`,name:`60Plus India`,address:{"@type":`PostalAddress`,streetAddress:`Plot No 22, Rajalakshmi Nagar, Velacheri`,addressLocality:`Chennai`,addressRegion:`TN`,postalCode:`600042`,addressCountry:`IN`}},areaServed:{"@type":`State`,name:`Tamil Nadu`},description:`Yearly professional evaluation of walking patterns, balance, and stability for elderly individuals to identify mobility risks and prevent falls.`,offers:{"@type":`Offer`,description:`Included in the 21-service Premium Plan (Yearly Assessment)`,price:`200.00`,priceCurrency:`USD`}}},Xp=[{slug:`monthly-doctor-visit`,name:`Monthly Doctor Visit`,cat:`Healthcare & Medical`,icon:(0,G.jsx)(Sp,{size:22}),description:`Regular monthly visits from qualified doctors to monitor your parent's health and address any medical concerns proactively.`},{slug:`24-7-emergency-call`,name:`24/7 Emergency Call`,cat:`Daily Support & Monitoring`,icon:(0,G.jsx)(hp,{size:22}),description:`Round-the-clock emergency support with immediate response when your parents need urgent assistance.`},{slug:`24-7-companion`,name:`24/7 Companion`,cat:`Daily Support & Monitoring`,icon:(0,G.jsx)(Tp,{size:22}),description:`Personalized companion services to provide emotional support and assistance with daily activities.`},{slug:`monthly-care-executive-visit`,name:`Monthly Care Executive Visit`,cat:`Home Care & Safety`,icon:(0,G.jsx)(ip,{size:22}),description:`Professional care executive visits to assess living conditions and provide recommendations for safety and comfort.`},{slug:`integrated-senior-health-index`,name:`Integrated Senior Health Index`,cat:`Healthcare & Medical`,icon:(0,G.jsx)(rp,{size:22}),description:`Comprehensive health assessment using our proprietary index to track and improve overall wellness.`},{slug:`senior-home-safety-assessment`,name:`Senior Home Safety Assessment`,cat:`Home Care & Safety`,icon:(0,G.jsx)(yp,{size:22}),description:`Detailed evaluation of home safety to identify potential hazards and recommend improvements.`},{slug:`digitalization-of-medical-records`,name:`Digitalization of Medical Records`,cat:`Digital & Records`,icon:(0,G.jsx)($f,{size:22}),description:`Secure digitization and organization of medical records for easy access and sharing with healthcare providers.`},{slug:`voice-reminder-for-parents`,name:`Voice Reminder for Parents`,cat:`Daily Support & Monitoring`,icon:(0,G.jsx)(zf,{size:22}),description:`Customizable voice reminders for medications, appointments, and daily tasks to maintain routine.`},{slug:`daily-updates-to-children`,name:`Daily Updates to Children`,cat:`Daily Support & Monitoring`,icon:(0,G.jsx)(fp,{size:22}),description:`Regular updates sent to children about their parents' wellbeing and daily activities.`},{slug:`free-online-community`,name:`Free Online Community`,cat:`Digital & Records`,icon:(0,G.jsx)(np,{size:22}),description:`Access to our supportive online community where seniors can connect and share experiences.`},{slug:`audiologist-home-visit`,name:`Audiologist Home Visit`,cat:`Healthcare & Medical`,icon:(0,G.jsx)(Qf,{size:22}),description:`Specialized hearing assessments and consultations conducted in the comfort of home.`},{slug:`medicine-delivery`,name:`Medicine Delivery`,cat:`Daily Support & Monitoring`,icon:(0,G.jsx)(gp,{size:22}),description:`Reliable medicine delivery service to ensure timely access to prescribed medications.`},{slug:`senior-citizen-insurance-assessment`,name:`Senior Citizen Insurance Assessment`,cat:`Healthcare & Medical`,icon:(0,G.jsx)(bp,{size:22}),description:`Expert evaluation and recommendations for insurance coverage tailored to senior needs.`},{slug:`velai-consultation`,name:`Velai Consultation`,cat:`Lifestyle & Wellness`,icon:(0,G.jsx)(Bf,{size:22}),description:`Career and lifestyle consultation services for seniors looking to explore new opportunities.`},{slug:`trip-consultation`,name:`Trip Consultation`,cat:`Lifestyle & Wellness`,icon:(0,G.jsx)(_p,{size:22}),description:`Specialized travel planning and consultation for safe and enjoyable trips for seniors.`},{slug:`nutrition-consultation`,name:`Nutrition Consultation`,cat:`Lifestyle & Wellness`,icon:(0,G.jsx)(If,{size:22}),description:`Personalized nutrition advice and meal planning tailored to senior health needs.`},{slug:`on-demand-services`,name:`On Demand Services`,cat:`Daily Support & Monitoring`,icon:(0,G.jsx)(Ap,{size:22}),description:`Flexible support services available whenever needed for various daily tasks and requirements.`},{slug:`complimentary-products`,name:`Complimentary Products`,cat:`Extras & Benefits`,icon:(0,G.jsx)(tp,{size:22}),description:`Quality products provided complimentary to enhance daily life and comfort.`},{slug:`blood-test`,name:`Blood Test`,cat:`Healthcare & Medical`,icon:(0,G.jsx)(Cp,{size:22}),description:`Convenient at-home blood testing services with professional sample collection and analysis.`},{slug:`offline-events`,name:`Offline Events`,cat:`Extras & Benefits`,icon:(0,G.jsx)(Hf,{size:22}),description:`Engaging offline events and activities to promote social interaction and community involvement.`},{slug:`gait-analysis`,name:`Gait Analysis`,cat:`Home Care & Safety`,icon:(0,G.jsx)(Ff,{size:22}),description:`Professional assessment of walking patterns to identify fall risks and recommend preventive measures.`}],Zp={accent:`#8235d0`,light:`rgba(130,53,208,0.06)`,border:`rgba(130,53,208,0.13)`},Qp={"monthly-doctor-visit":{tagline:`Comprehensive Care at Home`,summary:`Doctor home visits bring medical care directly to your parents' doorstep. Instead of travelling to hospitals and waiting for consultations, elderly individuals can receive professional healthcare in the comfort of their home. This makes medical care more accessible, convenient, and consistent, especially for those with mobility challenges or chronic conditions.`,image:`/images/doctor-visit.jpg`,stats:[{value:`Home-based`,label:`Delivery`},{value:`Comprehensive`,label:`Care model`},{value:`Personalized`,label:`Treatment`},{value:`Professional`,label:`Service`}],what:{heading:`What to expect from at-home doctor consultations`,items:[{title:`Personalized Medical Care`,body:`Doctor home visits allow physicians to spend more time understanding the patient's condition in detail. This enables them to provide more focused attention, listen to concerns carefully, and recommend treatments that are tailored to individual health needs.`,quote:`Every patient receives care designed specifically for them.`},{title:`Reduced Need for Hospital Visits`,body:`Many health conditions can be managed without visiting a hospital. With home consultations, elderly individuals can avoid long waiting times, travel discomfort, and unnecessary exposure to crowded environments, while still receiving quality medical care.`,quote:`Quality care without the stress of travel.`},{title:`Convenient and Accessible Healthcare`,body:`Booking a doctor visit at home is simple and efficient. This makes it easier for seniors who may skip regular check-ups due to inconvenience or mobility issues, ensuring that healthcare is consistent and timely.`,quote:`Professional care delivered to your doorstep.`},{title:`Preventive and Routine Care`,body:`Regular health check-ups help in early detection of potential health issues. By monitoring health consistently, it becomes easier to manage conditions early and reduce the chances of serious complications or hospitalisation.`,quote:`Early care leads to better outcomes.`},{title:`Safe and Professional Support`,body:`All medical professionals involved are experienced and trained in elderly care. The service ensures safety, reliability, and professionalism, giving families confidence in the care being provided at home.`,quote:`Trusted professionals you can rely on.`},{title:`Continuity of Care at Home`,body:`Having regular doctor visits at home creates familiarity and comfort for elderly individuals. This continuity improves communication, builds trust, and leads to better long-term health management.`,quote:`Consistent care builds better health.`}]},why:{heading:`Why this service is important`,body:`Access to regular medical care is essential for maintaining good health, especially for elderly individuals.

Doctor home visits remove the challenges of travel, waiting times, and delayed consultations, making healthcare more accessible and consistent.

They also support early diagnosis, better monitoring of chronic conditions, and timely medical advice.

For families living away, this service provides reassurance that their parents are receiving professional care regularly, without disruption.

Overall, it ensures better health outcomes, improved comfort, and greater peace of mind.`,image:`/images/doctor2.jpg`}},"24-7-emergency-call":{tagline:`Always On. Always Ready. Always There.`,summary:`Emergencies don't wait - and neither should care. With 24/7 Emergency Call support, your parents are never alone. Whether it's a sudden health concern, a fall, or a moment of fear, help is instantly available - coordinated, responsive, and handled with clarity when it matters the most.`,image:`/images/hand_in_hand.jpg`,stats:[{value:`24/7`,label:`Availability`},{value:`< 60 sec`,label:`Response time`},{value:`Immediate`,label:`Action trigger`},{value:`Real-time`,label:`Family updates`}],what:{heading:`What every emergency support covers`,items:[{title:`Instant Emergency Response`,body:`Our team is available round the clock to respond to any emergency call. As soon as your parent reaches out, we quickly understand the situation and initiate the required support without delay.`,quote:`Quick response can make a critical difference.`},{title:`Medical Coordination`,body:`In case of medical emergencies, we coordinate with nearby hospitals, ambulance services, and healthcare providers to ensure timely medical attention.`,quote:`Right support at the right time ensures better outcomes.`},{title:`Family Notification`,body:`We keep family members informed about the situation in real time. You will receive updates on what is happening and what actions are being taken.`,quote:`Stay informed, even from a distance.`},{title:`Continuous Monitoring`,body:`Our responsibility does not end with the first response. We continue to monitor the situation, follow up on medical care, and ensure that your parent is safe and stable.`,quote:`Care continues beyond the first response.`},{title:`Support for Non-Medical Situations`,body:`Not all emergencies are medical. Situations like anxiety, confusion, or sudden distress also require immediate attention. Our team provides guidance and reassurance.`,quote:`Support is not just medical - it is human.`},{title:`Emergency Record & Tracking`,body:`Every emergency interaction is documented and tracked to ensure continuity of care. This helps in understanding patterns and keeping a clear record for families and healthcare providers.`,quote:`Every incident is tracked for better future care.`}]},why:{heading:`How It Helps You (Children Living Abroad)`,body:`When you live far away, emergencies are not just events - they are your biggest worry.

This service removes that uncertainty completely.

You no longer need to depend on chance, neighbours, or delayed communication. Every situation is handled immediately, with clarity, coordination, and full visibility to you.

You stay informed, you stay connected, and most importantly, you stay reassured that your parents are never alone - not even for a moment.

Because true safety is not just about reacting to emergencies - it is about knowing that someone is always there before you even need to ask.`,image:`/images/img2.jpg`}},"24-7-companion":{tagline:`Continuous Care and Companionship at Home`,summary:`Elderly individuals often need more than just medical support - they need consistent companionship and assistance in their daily lives. With our 24/7 Companion service, your parents are supported at all times by trained professionals who ensure comfort, safety, and emotional well-being throughout the day.`,image:`/images/img6.jpg`,stats:[{value:`24/7`,label:`Availability`},{value:`In-home`,label:`Support`},{value:`Daily`,label:`Assistance`},{value:`Trusted`,label:`Caregivers`}],what:{heading:`What companion support includes`,items:[{title:`Daily Living Assistance`,body:`Companions assist with everyday activities such as walking, eating, medication reminders, and basic routines.`,quote:`Support that makes everyday life easier.`},{title:`Emotional Companionship`,body:`Having someone present to talk, listen, and engage with provides emotional stability and improves overall well-being for elderly individuals.`,quote:`Presence brings comfort beyond care.`},{title:`Safety and Supervision`,body:`Continuous supervision helps in preventing falls, accidents, or risky situations at home. Caregivers remain attentive and responsive.`,quote:`Safety is maintained through constant care.`},{title:`Routine and Activity Support`,body:`Companions help with daily schedules, light activities, and engagement to keep both mind and body active.`,quote:`A consistent routine supports a healthier life.`},{title:`Coordination with Families`,body:`Families are kept informed about daily activities and well-being, ensuring transparency and connection even from a distance.`,quote:`Stay connected to everyday care.`},{title:`Reliable and Trained Caregivers`,body:`All companions are trained to handle elderly care with professionalism and empathy, ensuring dependable support.`,quote:`Care delivered with trust and responsibility.`}]},why:{heading:`Why this service is important`,body:`As parents age, they require not only medical care but also continuous support in their daily lives.

Living alone can lead to isolation, missed routines, and safety concerns.

With a dedicated companion available at all times, your parents receive consistent assistance, emotional support, and supervision.

For families living away, this service provides confidence that their parents are not alone and are being cared for responsibly throughout the day.

It ensures comfort, safety, and a better quality of life at home.`,image:`/images/errands1.jpg`}},"monthly-care-executive-visit":{tagline:`Regular Home Assessments for Better Living`,summary:`A comfortable and safe living environment plays a key role in the well-being of elderly individuals. With our Monthly Care Executive Visit, trained professionals visit your parents' home to assess their living conditions and ensure their daily environment supports health, safety, and comfort.`,image:`/images/caretender.jpg`,stats:[{value:`Monthly`,label:`Visits`},{value:`In-home`,label:`Assessment`},{value:`Safety`,label:`Focus`},{value:`Structured`,label:`Reports`}],what:{heading:`What each care executive visit includes`,items:[{title:`Home Environment Assessment`,body:`The care executive evaluates the overall living environment, including cleanliness, accessibility, and general safety.`,quote:`A safe home environment supports better living.`},{title:`Health & Lifestyle Observation`,body:`The executive observes daily routines, eating habits, and general well-being to understand how your parents are managing day-to-day.`,quote:`Understanding daily life helps improve care.`},{title:`Safety Risk Identification`,body:`Potential risks such as fall hazards, poor lighting, or unsafe arrangements are identified and recommendations provided.`,quote:`Prevention begins with awareness.`},{title:`Basic Support & Guidance`,body:`Care executives provide guidance to help improve daily routines, hygiene practices, and overall comfort.`,quote:`Small improvements make a big difference.`},{title:`Family Updates and Reporting`,body:`After each visit, a structured update is shared with family members including observations, concerns, and recommendations.`,quote:`Clear updates keep families connected.`},{title:`Coordination with Other Services`,body:`If additional support is required, the care executive helps coordinate with relevant services for a smooth care experience.`,quote:`Care works best when everything is connected.`}]},why:{heading:`Why this service is important`,body:`As parents grow older, their living environment becomes just as important as their medical care.

Small issues at home can often go unnoticed but may lead to larger problems over time.

Regular visits by a care executive help identify these concerns early and ensure that the home remains safe, comfortable, and supportive.

For families living away, this service provides visibility into their parents' daily living conditions and reassurance that everything is being monitored regularly.`,image:`/images/hand_in_hand.jpg`}},"integrated-senior-health-index":{tagline:`A Complete View of Your Parent's Health`,summary:`Understanding health is not just about individual reports - it is about seeing the complete picture. The Integrated Senior Health Index combines multiple health parameters into a single, structured view, helping track overall well-being, identify risks early, and support better decision-making over time.`,image:`/images/hero-main.jpg`,stats:[{value:`360°`,label:`Health view`},{value:`Continuous`,label:`Tracking`},{value:`Data-driven`,label:`Insights`},{value:`Preventive`,label:`Approach`}],what:{heading:`What the health index includes`,items:[{title:`Comprehensive Health Assessment`,body:`The health index brings together key health parameters such as medical history, current conditions, lifestyle habits, and routine check-up data.`,quote:`All health information, in one structured view.`},{title:`Regular Health Tracking`,body:`Health data is tracked consistently over time, allowing patterns and changes to be observed that may not be visible through one-time check-ups.`,quote:`Tracking over time reveals what one report cannot.`},{title:`Risk Identification`,body:`By analysing combined health data, potential risks can be identified early, allowing for timely action.`,quote:`Early identification leads to better prevention.`},{title:`Structured Health Reports`,body:`All information is presented in a clear and easy-to-understand format for families and healthcare professionals.`,quote:`Clarity helps in making better decisions.`},{title:`Support for Medical Decisions`,body:`Doctors and caregivers can use the health index as a reference to understand overall condition and plan treatment.`,quote:`Better data supports better care decisions.`},{title:`Continuous Improvement in Care`,body:`With ongoing updates and monitoring, the health index helps improve the quality of care over time based on real data.`,quote:`Care improves when it is guided by data.`}]},why:{heading:`Why this service is important`,body:`Health information is often scattered across reports, prescriptions, and different consultations.

This makes it difficult to understand the overall condition of elderly individuals.

The Integrated Senior Health Index brings everything together into a single, structured system that provides clarity and continuity.

It helps in early detection of risks, better monitoring of chronic conditions, and more informed medical decisions.

For families living away, it offers a clear and reliable view of their parents' health without depending on fragmented updates.`,image:`/images/img1.jpg`}},"senior-home-safety-assessment":{tagline:`Creating a Safer Living Environment at Home`,summary:`As parents grow older, their home environment needs to adapt to their changing needs. Small risks such as slippery floors, poor lighting, or unsafe arrangements can lead to serious injuries. The Senior Home Safety Assessment ensures their living space is evaluated, improved, and made safer for everyday living.`,image:`/images/grabbar.jpg`,stats:[{value:`In-home`,label:`Assessment`},{value:`Safety`,label:`Focused`},{value:`Risk-based`,label:`Evaluation`},{value:`Preventive`,label:`Approach`}],what:{heading:`What the safety assessment includes`,items:[{title:`Home Safety Evaluation`,body:`A detailed assessment of the home is carried out to identify potential risks in bathrooms, bedrooms, and walking spaces.`,quote:`A safer home starts with proper evaluation.`},{title:`Fall Risk Identification`,body:`Common causes of falls such as slippery floors, uneven surfaces, and lack of support are identified with special attention to high-risk areas.`,quote:`Preventing falls is the first step to safety.`},{title:`Safety Recommendations`,body:`Practical suggestions such as installing grab bars, using anti-slip mats, improving lighting, and rearranging furniture are provided.`,quote:`Simple changes can prevent serious risks.`},{title:`Home Accessibility Improvements`,body:`Adjustments are recommended to make daily movement easier, especially for seniors with mobility challenges.`,quote:`Ease of movement improves independence.`},{title:`Security Enhancements`,body:`Basic security measures such as video doorbells or monitoring systems are suggested to improve safety for seniors living alone.`,quote:`Safety includes both inside and outside protection.`},{title:`Ongoing Safety Awareness`,body:`Families are guided on how to maintain a safe environment over time as needs evolve.`,quote:`Safety is a continuous process, not a one-time setup.`}]},why:{heading:`Why this service is important`,body:`A home that once felt comfortable may not always remain safe as parents grow older.

Small risks such as slips, poor visibility, or lack of support can lead to serious injuries.

A structured safety assessment helps identify these issues early and provides practical solutions to prevent them.

For families living away, this service ensures that their parents' living environment is regularly reviewed and improved for safety.`,image:`/images/img4.jpg`}},"digitalization-of-medical-records":{tagline:`Organized Medical Records for Better Care`,summary:`Medical records are essential for understanding a person's health history and ensuring proper treatment. However, these records are often scattered across reports, prescriptions, and hospital documents. This service helps collect, organize, and digitize all medical information into a structured format.`,image:`/images/hero-digi.jpeg`,stats:[{value:`Centralized`,label:`Records`},{value:`Digital`,label:`Access`},{value:`Secure`,label:`Storage`},{value:`Updated`,label:`Continuously`}],what:{heading:`What medical record management includes`,items:[{title:`Collection of Medical Documents`,body:`All existing medical documents such as prescriptions, lab reports, discharge summaries, and scan reports are collected and organized.`,quote:`Every record matters in understanding health.`},{title:`Digital Record Creation`,body:`Physical documents are converted into digital formats for easy storage and access by families and healthcare providers.`,quote:`Digital access makes healthcare faster and easier.`},{title:`Structured Health History`,body:`Patient history including past treatments, family medical background, and ongoing conditions is compiled into a clear structured format.`,quote:`Clear history supports better care decisions.`},{title:`Secure Storage and Privacy`,body:`All records are stored securely with proper confidentiality measures while remaining accessible to authorized individuals.`,quote:`Privacy and safety go hand in hand.`},{title:`Easy Sharing with Healthcare Providers`,body:`Organized records can be easily shared with doctors and hospitals, improving communication and ensuring accurate treatment.`,quote:`Better communication leads to better treatment.`},{title:`Continuous Updates`,body:`Medical records are regularly updated with new reports, prescriptions, and treatments to always reflect current health status.`,quote:`Up-to-date records enable better care at all times.`}]},why:{heading:`Why this service is important`,body:`Medical information is often scattered across different documents and locations, making it difficult to access when needed.

In emergencies or during consultations, missing or incomplete records can delay proper treatment.

By organizing and digitizing all medical records, this service ensures that accurate information is always available.

For families living away, it provides clarity and easy access to their parents' medical history at any time.`,image:`/images/old_person8.jpg`}},"voice-reminder-for-parents":{tagline:`Timely Reminders for Daily Health and Routine`,summary:`As parents grow older, it becomes common to forget medications, routines, or important daily activities. With our Voice Reminder service, seniors receive gentle and timely reminders for medicines, routines, and daily needs, ensuring consistency and better health management.`,image:`/images/old_person_3.jpg`,stats:[{value:`Daily`,label:`Reminders`},{value:`On-time`,label:`Alerts`},{value:`Personalized`,label:`Schedules`},{value:`Supportive`,label:`Check-ins`}],what:{heading:`What the reminder service includes`,items:[{title:`Daily Medicine Reminders`,body:`Seniors are reminded at the right time to take their medications as prescribed, preventing missed doses.`,quote:`Timely medication leads to better health outcomes.`},{title:`Personalized Reminder Scheduling`,body:`Reminders are set based on individual routines and prescriptions, customized to match the specific needs of your parents.`,quote:`Every reminder is tailored to individual needs.`},{title:`Voice-Based Friendly Alerts`,body:`Reminders are delivered in a simple and friendly manner, making it easy for seniors to understand and follow.`,quote:`Gentle reminders create better adherence.`},{title:`Routine Activity Reminders`,body:`Apart from medicines, reminders can include daily routines such as meals, hydration, or appointments.`,quote:`Consistency in routine supports overall well-being.`},{title:`Regular Check-in Calls`,body:`Our team connects with your parents through periodic calls to check on their well-being and provide human interaction.`,quote:`Regular conversations bring comfort and connection.`},{title:`Family Updates and Alerts`,body:`Important updates from reminders and conversations are shared with family members to keep you informed.`,quote:`Stay informed about daily care, even from afar.`}]},why:{heading:`Why this service is important`,body:`Forgetting medications or daily routines is common among elderly individuals and can directly impact their health.

Irregular medication intake or missed routines can lead to complications over time.

With timely reminders and regular check-ins, this service ensures that your parents stay consistent with their daily schedule.

For families living away, it offers reassurance that their parents are being guided and supported every day.`,image:`/images/img5.jpg`}},"daily-updates-to-children":{tagline:`Stay Connected to Your Parents Every Day`,summary:`When you live away from your parents, staying updated about their daily well-being can be challenging. With our Daily Updates service, you receive regular and reliable information about their health, routine, and overall condition, helping you stay connected and informed at all times.`,image:`/images/img3.jpg`,stats:[{value:`Daily`,label:`Updates`},{value:`Real-time`,label:`Insights`},{value:`Consistent`,label:`Tracking`},{value:`Connected`,label:`Families`}],what:{heading:`What daily updates include`,items:[{title:`Health and Well-being Updates`,body:`Regular updates are shared regarding your parents' health condition, including any changes, concerns, or improvements.`,quote:`Stay informed about what truly matters.`},{title:`Daily Activity Summary`,body:`Information about daily routines such as meals, medication adherence, and general activities is shared for a clear picture.`,quote:`A clear view of everyday life.`},{title:`Important Alerts and Notifications`,body:`If any unusual situation or concern arises, immediate alerts are sent to ensure you can take timely action.`,quote:`Timely alerts help prevent bigger issues.`},{title:`Communication from Care Team`,body:`Updates from caregivers, care executives, or support staff are shared to give additional insights into your parents' needs.`,quote:`Direct updates from those who care for them.`},{title:`Consistency in Monitoring`,body:`Daily reporting ensures no gaps in information, helping identify patterns and understand changes over time.`,quote:`Consistency builds clarity and confidence.`},{title:`Peace of Mind for Families`,body:`Knowing how your parents are doing every day reduces anxiety and uncertainty, keeping you connected even from far away.`,quote:`Peace of mind comes from staying informed.`}]},why:{heading:`Why this service is important`,body:`Distance often makes it difficult to stay updated about your parents' daily life.

Irregular communication can lead to uncertainty and concern about their well-being.

With structured daily updates, you receive consistent and reliable information about their health, routine, and overall condition.

This helps you stay connected, make informed decisions, and respond quickly if needed.

For families living abroad, it provides reassurance that nothing important is missed.`,image:`/images/img8.jpg`}},"free-online-community":{tagline:`A Space to Connect, Share, and Engage`,summary:`Staying socially active is just as important as physical health, especially for seniors. Our Free Online Community provides a safe and welcoming space where your parents can connect with others, share experiences, and stay engaged through meaningful interactions.`,image:`/images/iStock-1166426940.jpg`,stats:[{value:`Online`,label:`Access`},{value:`Active`,label:`Community`},{value:`Engaging`,label:`Activities`},{value:`Supportive`,label:`Network`}],what:{heading:`What the community offers`,items:[{title:`Social Interaction`,body:`Seniors can connect with others in similar age groups, share conversations, and build meaningful relationships.`,quote:`Connection brings comfort and belonging.`},{title:`Group Activities and Engagement`,body:`The community includes various activities such as discussions, light learning sessions, and interactive events.`,quote:`Engagement keeps the mind active and positive.`},{title:`Safe and Moderated Environment`,body:`All interactions are monitored to ensure a respectful and safe space for seniors to participate freely.`,quote:`A safe space encourages open participation.`},{title:`Emotional Support Network`,body:`Being part of a community allows seniors to share their thoughts, experiences, and challenges for emotional support.`,quote:`Shared experiences create stronger bonds.`},{title:`Easy Access and Participation`,body:`The platform is designed to be simple and easy to use, regardless of technical familiarity.`,quote:`Simplicity makes participation easier.`},{title:`Continuous Engagement`,body:`Regular activities and interactions ensure that seniors remain active and involved over time.`,quote:`Staying engaged improves quality of life.`}]},why:{heading:`Why this service is important`,body:`As parents grow older, social interaction often reduces, leading to feelings of isolation and loneliness.

A supportive community helps them stay connected, engaged, and mentally active.

Being part of a group where they can share experiences and participate in activities improves emotional well-being.

For families living away, it provides reassurance that their parents are not alone and have a network of people around them.`,image:`/images/iStock-921464498.jpg`}},"audiologist-home-visit":{tagline:`Hearing Care Delivered at Home`,summary:`Hearing issues are common among seniors and can affect communication, confidence, and overall quality of life. With our Audiologist Home Visit service, professional hearing assessments and guidance are provided at home, making care more comfortable without visiting clinics.`,image:`/images/img1.jpg`,stats:[{value:`1/month`,label:`Visit`},{value:`12/year`,label:`Annual visits`},{value:`At-home`,label:`Service`},{value:`Professional`,label:`Assessment`}],what:{heading:`What each audiologist visit includes`,items:[{title:`Hearing Assessment`,body:`A basic evaluation of hearing ability is conducted to identify any signs of hearing loss or difficulty.`,quote:`Early detection improves hearing care.`},{title:`Guidance on Hearing Health`,body:`The audiologist provides guidance on maintaining hearing health, including care practices and lifestyle adjustments.`,quote:`Proper guidance helps preserve hearing ability.`},{title:`Hearing Aid Support`,body:`For seniors using hearing aids, support is provided for usage, maintenance, and adjustments.`,quote:`Well-maintained devices improve daily life.`},{title:`Monitoring Changes Over Time`,body:`Regular monthly visits help track changes in hearing ability and ensure any decline is identified early.`,quote:`Regular monitoring prevents unnoticed decline.`},{title:`Comfort of Home-Based Care`,body:`All assessments and support are provided at home, eliminating the need for travel.`,quote:`Care at home improves comfort and access.`},{title:`Family Awareness and Updates`,body:`Observations and recommendations are shared with family members to keep them informed about hearing health.`,quote:`Stay informed about hearing health.`}]},why:{heading:`Why this service is important`,body:`Hearing loss often develops gradually and may go unnoticed in the early stages.

If not addressed, it can affect communication, social interaction, and overall well-being.

Regular hearing assessments help in identifying issues early and managing them effectively.

With home-based visits, seniors receive consistent and comfortable care without the need to travel.

For families living away, this service ensures that their parents' hearing health is monitored regularly.`,image:`/images/physio_2.jpg`}},"medicine-delivery":{tagline:`Reliable Access to Medicines at the Right Time`,summary:`Ensuring that seniors receive their medicines on time is essential for maintaining their health. With our Medicine Delivery service, prescribed medicines are procured and delivered directly to your parents' home, eliminating the need for travel, delays, or missed doses.`,image:`/images/digi.jpg`,stats:[{value:`On-time`,label:`Delivery`},{value:`Verified`,label:`Sources`},{value:`Regular`,label:`Refills`},{value:`Hassle-free`,label:`Process`}],what:{heading:`What the medicine delivery service includes`,items:[{title:`Prescription-Based Procurement`,body:`Medicines are sourced strictly based on valid prescriptions, with careful verification before procurement.`,quote:`Accuracy in medicines is critical for safe treatment.`},{title:`Timely and Scheduled Delivery`,body:`Medicines are delivered on time according to the required schedule, ensuring no gaps in treatment.`,quote:`Timely delivery ensures uninterrupted care.`},{title:`Support for Regular Refills`,body:`For long-term medications, refills are tracked and managed proactively to prevent seniors from running out.`,quote:`Consistency in supply supports better health outcomes.`},{title:`Coordination with Doctors`,body:`If there are changes in prescriptions, the service coordinates with doctors to update required medicines.`,quote:`Aligned care ensures the right medicines at the right time.`},{title:`Quality Assurance`,body:`Medicines are procured from trusted and verified pharmacies to ensure authenticity and quality.`,quote:`Trusted sources ensure safe medication.`},{title:`Convenience and Reduced Dependence`,body:`By delivering medicines directly to the doorstep, seniors do not need to travel or depend on others.`,quote:`Convenience improves consistency in care.`}]},why:{heading:`Why this service is important`,body:`Regular access to prescribed medicines is essential for managing health conditions effectively.

Delays, missed refills, or incorrect medications can lead to serious health complications.

With a structured medicine delivery system, these risks are minimized by ensuring timely, accurate, and consistent supply.

For families living away, this service provides confidence that their parents are receiving the right medicines without interruption.`,image:`/images/img2.jpg`}},"senior-citizen-insurance-assessment":{tagline:`Right Insurance for Better Financial Protection`,summary:`As parents grow older, the risk of medical conditions and unexpected hospital expenses increases. Having the right health insurance ensures these situations can be handled without financial stress. This service helps evaluate and guide families towards the most suitable insurance plans for senior citizens.`,image:`/images/pension.jpg`,stats:[{value:`60+`,label:`Age focus`},{value:`Coverage`,label:`Guidance`},{value:`Financial`,label:`Protection`},{value:`Expert`,label:`Support`}],what:{heading:`What the insurance assessment includes`,items:[{title:`Evaluation of Insurance Needs`,body:`Understanding the health condition, age, and medical history to identify suitable insurance options.`,quote:`Right planning begins with proper understanding.`},{title:`Guidance on Policy Coverage`,body:`Clear guidance is provided to help understand what each policy includes and how it benefits your parents.`,quote:`Clarity in coverage leads to better decisions.`},{title:`Support in Choosing the Right Plan`,body:`Comparing plans and choosing one that offers the best balance between coverage, cost, and benefits.`,quote:`Choosing the right plan avoids future complications.`},{title:`Understanding Premium and Costs`,body:`Proper explanation of premium structure, payment options, and long-term cost implications.`,quote:`Understanding costs helps in better financial planning.`},{title:`Assistance with Online Insurance Process`,body:`Guidance is provided at every step to help you complete the insurance process without confusion.`,quote:`A simple process makes insurance easier to access.`},{title:`Support for Informed Decision Making`,body:`Families are guided to review terms, conditions, and benefits carefully before finalizing a policy.`,quote:`Informed decisions provide better security.`}]},why:{heading:`Why this service is important`,body:`As people age, the chances of critical illnesses and hospitalization increase.

Medical treatments today are advanced but also expensive, making proper financial protection essential.

Without insurance, unexpected medical costs can become a significant burden.

By choosing the right insurance plan early, these risks can be managed effectively.

For families living away, it provides confidence that medical emergencies can be handled without financial stress.`,image:`/images/pension-759.jpg`}},"velai-consultation":{tagline:`Meaningful Opportunities for an Active Life`,summary:`Staying active and engaged is essential for a healthy and fulfilling life. Many senior citizens have the energy, experience, and desire to continue contributing in meaningful ways. Velai Consultation helps seniors explore suitable opportunities that match their interests and abilities.`,image:`/images/online_doctor.jpg`,stats:[{value:`Flexible`,label:`Opportunities`},{value:`Part-time`,label:`Roles`},{value:`WFH`,label:`Options`},{value:`Purposeful`,label:`Engagement`}],what:{heading:`What the consultation includes`,items:[{title:`Understanding Interests and Skills`,body:`The consultation begins by understanding the senior's interests, past experience, and current capabilities.`,quote:`The right opportunity starts with understanding the individual.`},{title:`Curated Job Opportunities`,body:`Relevant opportunities such as part-time roles, work-from-home options, or flexible engagements are curated from trusted networks.`,quote:`Opportunities tailored for comfort and flexibility.`},{title:`Guidance on Suitable Roles`,body:`Clear guidance is provided on choosing roles that match energy levels, lifestyle, and preferences.`,quote:`The right role supports both comfort and purpose.`},{title:`Support for New Career Exploration`,body:`Seniors who wish to explore new areas or interests are supported with ideas and direction.`,quote:`It is never too late to explore new paths.`},{title:`Encouraging Knowledge Sharing`,body:`Opportunities are suggested where seniors can share their expertise with younger generations or communities.`,quote:`Experience shared becomes a lasting contribution.`},{title:`Improving Engagement and Well-being`,body:`Staying engaged in meaningful work helps improve mental health, confidence, and overall well-being.`,quote:`Active engagement leads to a healthier life.`}]},why:{heading:`Why this service is important`,body:`After retirement, many seniors experience a sudden change in routine and reduced engagement.

This can lead to feelings of isolation or lack of purpose.

By exploring suitable work or meaningful activities, seniors can stay active, independent, and mentally engaged.

For families, it brings reassurance that their parents are leading a productive and fulfilling life.`,image:`/images/img5.jpg`}},"trip-consultation":{tagline:`Safe and Comfortable Travel Planning for Seniors`,summary:`Travel can be a refreshing and fulfilling experience for seniors when planned with care. Trip Consultation helps families plan safe, comfortable, and well-structured travel experiences for their parents, ensuring health, convenience, and support are considered.`,image:`/images/img6.jpg`,stats:[{value:`Planned`,label:`Trips`},{value:`Safe`,label:`Travel`},{value:`Comfort`,label:`Focused`},{value:`Guided`,label:`Support`}],what:{heading:`What the trip consultation includes`,items:[{title:`Understanding Travel Needs`,body:`The consultation begins by understanding the senior's preferences, health condition, and travel expectations.`,quote:`Every journey starts with understanding the traveler.`},{title:`Destination Planning`,body:`Suitable destinations are suggested based on accessibility, climate, and convenience.`,quote:`The right destination makes travel easier and safer.`},{title:`Health and Safety Considerations`,body:`Medical needs, accessibility, and emergency support are considered while planning the trip.`,quote:`Safe travel is well-planned travel.`},{title:`Travel and Stay Arrangements`,body:`Guidance is provided for selecting appropriate travel options and accommodation that are comfortable and senior-friendly.`,quote:`Comfortable arrangements make travel enjoyable.`},{title:`Assistance Planning During Travel`,body:`Recommendations for support services or companions during the trip ensure seniors are not left unsupported.`,quote:`Support ensures confidence during travel.`},{title:`Complete Travel Guidance`,body:`Families are guided through the entire process, including preparation, packing essentials, and planning for contingencies.`,quote:`Good preparation leads to better journeys.`}]},why:{heading:`Why this service is important`,body:`Travel can improve mental well-being, provide relaxation, and create meaningful experiences for seniors.

However, without proper planning, it can also become stressful and physically demanding.

By carefully considering health, comfort, and safety, this service ensures that seniors can travel confidently.

For families, it offers reassurance that their parents' travel is safe and well-organized.`,image:`/images/lonely_old_man.jpg`}},"nutrition-consultation":{tagline:`Balanced Nutrition for Healthy Aging`,summary:`As we age, the body undergoes changes that affect metabolism, immunity, and overall health. Proper nutrition plays a key role in maintaining strength, preventing deficiencies, and improving quality of life. With our Nutrition Consultation service, seniors receive personalized dietary guidance.`,image:`/images/home_nurse_4.jpg`,stats:[{value:`Personalized`,label:`Plans`},{value:`Balanced`,label:`Nutrition`},{value:`Guided`,label:`Consultation`},{value:`Healthy`,label:`Lifestyle`}],what:{heading:`What the nutrition consultation includes`,items:[{title:`Personalized Meal Planning`,body:`Meal plans are designed based on individual health conditions, age, weight, and dietary preferences.`,quote:`Balanced meals support better health every day.`},{title:`Diet Chart for Health Management`,body:`Structured diet charts are created to manage weight, chronic conditions, and nutritional deficiencies.`,quote:`A structured diet leads to better control over health.`},{title:`Nutritional Counselling`,body:`Nutrition experts assess overall health and lifestyle to provide guidance on improving eating habits.`,quote:`Guidance helps build sustainable healthy habits.`},{title:`Support for Chronic Conditions`,body:`Special attention is given to conditions such as diabetes, heart issues, and obesity with adjusted diet plans.`,quote:`Proper nutrition complements medical care.`},{title:`Monitoring and Adjustments`,body:`Nutritional plans are reviewed and updated periodically based on changes in health condition or lifestyle.`,quote:`Regular updates keep nutrition aligned with health needs.`},{title:`Improving Overall Well-being`,body:`A balanced diet helps improve energy levels, sleep quality, and immunity for an active lifestyle.`,quote:`Good nutrition enhances quality of life.`}]},why:{heading:`Why this service is important`,body:`As people age, their nutritional needs change and deficiencies become more common.

Poor diet can lead to weakened immunity, chronic conditions, and reduced quality of life.

A structured nutrition plan helps maintain strength, manage health conditions, and improve overall well-being.

For families living away, this service ensures that their parents are following a balanced and appropriate diet.`,image:`/images/img1.jpg`}},"on-demand-services":{tagline:`Support When You Need It, As You Need It`,summary:`Not all needs can be planned in advance. Seniors may require occasional assistance for tasks, errands, or unexpected situations. With our On Demand Services, support is available whenever required, ensuring your parents receive timely help without depending on others.`,image:`/images/errands 2.jpg`,stats:[{value:`Flexible`,label:`Support`},{value:`On-request`,label:`Service`},{value:`Quick`,label:`Response`},{value:`Reliable`,label:`Assistance`}],what:{heading:`What on demand services include`,items:[{title:`Assistance for Daily Errands`,body:`Support is provided for everyday tasks such as grocery shopping, bill payments, or basic household needs.`,quote:`Everyday tasks made easier with support.`},{title:`Immediate Support for Urgent Needs`,body:`In situations where immediate assistance is required, the service ensures a quick response to address the need effectively.`,quote:`Timely support when it matters most.`},{title:`Coordination of Services`,body:`If additional services are required such as maintenance, repairs, or medical support, coordination is handled smoothly.`,quote:`One point of contact for multiple needs.`},{title:`Companion Support on Request`,body:`Temporary companionship or assistance can be arranged whenever required for specific situations or activities.`,quote:`Support available whenever needed.`},{title:`Custom Requests Handling`,body:`The service is flexible enough to handle custom requests, ensuring individual requirements are addressed efficiently.`,quote:`Flexible support tailored to individual needs.`},{title:`Reliable and Verified Assistance`,body:`All services are provided through trusted and verified sources, ensuring safety, reliability, and quality.`,quote:`Trusted support you can depend on.`}]},why:{heading:`Why this service is important`,body:`Seniors may occasionally face situations where they need help beyond their regular routine.

Without reliable support, even simple tasks can become challenging.

On demand services provide flexibility by offering assistance exactly when it is required.

For families living away, it offers reassurance that help is always available when needed.

It ensures convenience, safety, and continuity in daily living.`,image:`/images/caretender.jpg`}},"complimentary-products":{tagline:`Thoughtful Additions for Everyday Comfort`,summary:`Small comforts can make a big difference in daily life, especially for seniors. Our Complimentary Products service provides carefully selected essentials that support health, safety, and convenience - meaningful inclusions designed to improve comfort and enhance overall well-being at home.`,image:`/images/grabbar.jpg`,stats:[{value:`4/year`,label:`Products`},{value:`Quarterly`,label:`Delivery cycle`},{value:`Curated`,label:`Selection`},{value:`Useful`,label:`Daily support`}],what:{heading:`What complimentary support includes`,items:[{title:`Curated Essential Products`,body:`Each product is carefully selected based on the needs of seniors, focusing on health, safety, and ease of use.`,quote:`Every product is chosen with purpose and care.`},{title:`Quarterly Delivery`,body:`Products are provided once every four months, ensuring regular support without the need to request or arrange them.`,quote:`Regular support ensures nothing important is missed.`},{title:`Support for Daily Living`,body:`Products are designed to simplify everyday activities and improve comfort at home.`,quote:`Small improvements lead to better everyday living.`},{title:`Quality and Reliability`,body:`All products are sourced from trusted providers to ensure quality, safety, and durability.`,quote:`Quality products create dependable support.`},{title:`Aligned with Care Services`,body:`The selection of products is aligned with the overall care plan, complementing other services.`,quote:`Every product supports the bigger care system.`},{title:`Convenience for Families`,body:`Families do not have to worry about identifying or purchasing essentials separately - they are automatically provided.`,quote:`Care delivered without extra effort.`}]},why:{heading:`Why this service is important`,body:`Providing care is not only about medical support - it is also about ensuring comfort, convenience, and quality of life.

Many small but essential items often go unnoticed, yet they play a significant role in maintaining hygiene, safety, and ease of routine.

With complimentary products delivered regularly, these needs are taken care of proactively.

For families living away, it offers reassurance that even the smallest aspects of care are being handled thoughtfully.`,image:`/images/img2.jpg`}},"blood-test":{tagline:`Convenient and Safe Diagnostic Testing at Home`,summary:`Regular health check-ups are essential for early detection and effective management of medical conditions. With our Blood Test at Home service, samples are collected directly from your parents' home, eliminating the need to visit clinics and ensuring safe, timely, and convenient diagnostic support.`,image:`/images/home_nurse_4.jpg`,stats:[{value:`At home`,label:`Collection`},{value:`6 months`,label:`Frequency`},{value:`Certified`,label:`Lab`},{value:`Digital`,label:`Reports`}],what:{heading:`What the home testing service includes`,items:[{title:`Home Sample Collection`,body:`Blood, urine, and other required samples are collected directly at home by trained professionals.`,quote:`Testing made easy at your doorstep.`},{title:`Safe and Hygienic Process`,body:`All sample collection procedures follow proper hygiene and safety protocols without exposure to crowded environments.`,quote:`Safety is ensured at every step.`},{title:`Lab-Based Testing`,body:`Collected samples are sent to certified laboratories for accurate analysis and reliable diagnostic results.`,quote:`Accurate results support better treatment.`},{title:`Regular Health Monitoring`,body:`Tests can be scheduled once every six months to monitor key health parameters and detect any changes early.`,quote:`Regular testing helps in early detection.`},{title:`Report Delivery and Access`,body:`Test reports are shared digitally and can also be delivered as physical copies for easy access.`,quote:`Easy access to important health reports.`},{title:`Convenience and Time Saving`,body:`By avoiding hospital visits and waiting times, the service provides a comfortable and stress-free experience.`,quote:`Convenience improves consistency in health checks.`}]},why:{heading:`Why this service is important`,body:`Regular diagnostic tests play a key role in monitoring health and detecting potential issues early.

For seniors, visiting hospitals or labs frequently can be inconvenient and sometimes risky.

With home sample collection, these challenges are eliminated while maintaining accuracy and reliability.

For families living away, it provides reassurance that their parents' health is being checked regularly.`,image:`/images/physio_3.jpg`}},"offline-events":{tagline:`Engaging Activities and Social Gatherings for Seniors`,summary:`Staying socially active and engaged is essential for emotional well-being. Our Offline Events bring seniors together through meaningful activities, group interactions, and community gatherings, helping them stay connected, active, and involved in real-world experiences.`,image:`/images/img2.jpg`,stats:[{value:`Regular`,label:`Events`},{value:`Community`,label:`Engagement`},{value:`Interactive`,label:`Activities`},{value:`Local`,label:`Participation`}],what:{heading:`What offline events include`,items:[{title:`Social Gatherings`,body:`Seniors can participate in organized meetups and group interactions, helping them connect with others.`,quote:`Meeting others creates a sense of belonging.`},{title:`Recreational Activities`,body:`Events include light physical activities, games, or cultural programs that keep seniors active and engaged.`,quote:`Active participation supports overall well-being.`},{title:`Learning and Awareness Sessions`,body:`Informative sessions on health, lifestyle, or general topics keep seniors informed and mentally stimulated.`,quote:`Learning keeps the mind sharp and engaged.`},{title:`Safe and Organized Environment`,body:`All events are planned with safety and comfort in mind, ensuring seniors can participate without stress.`,quote:`Comfort and safety are always prioritized.`},{title:`Encouraging Social Interaction`,body:`Events are designed to encourage communication and participation, helping reduce loneliness.`,quote:`Interaction brings positivity and connection.`},{title:`Support for Participation`,body:`Assistance and guidance are provided to ensure seniors can attend and participate comfortably.`,quote:`Support ensures everyone can take part.`}]},why:{heading:`Why this service is important`,body:`As parents grow older, opportunities for social interaction may reduce, leading to feelings of isolation.

Participating in offline events helps them stay socially active and connected with others.

These interactions improve emotional well-being, boost confidence, and create a sense of belonging.

For families living away, it provides reassurance that their parents are actively involved in a supportive community.`,image:`/images/iStock-1183276890.jpg`}},"gait-analysis":{tagline:`Assessing Movement for Better Mobility and Safety`,summary:`As people age, changes in walking patterns can indicate underlying health or mobility issues. Gait Analysis helps evaluate how seniors walk, identify risks such as imbalance or instability, and provide guidance to improve movement and prevent falls.`,image:`/images/hero_physio1.jpg`,stats:[{value:`Yearly`,label:`Assessment`},{value:`Mobility`,label:`Focus`},{value:`Preventive`,label:`Approach`},{value:`Professional`,label:`Evaluation`}],what:{heading:`What the gait analysis includes`,items:[{title:`Walking Pattern Assessment`,body:`The way a senior walks is carefully observed and analyzed to identify irregularities such as imbalance or reduced stability.`,quote:`Movement patterns reveal important health insights.`},{title:`Balance and Stability Evaluation`,body:`Balance and coordination are assessed to understand the risk of falls and mobility challenges.`,quote:`Better balance leads to safer movement.`},{title:`Identification of Mobility Risks`,body:`Potential risks such as weakness, posture issues, or joint limitations are identified early for timely corrective measures.`,quote:`Early identification helps prevent complications.`},{title:`Recommendations for Improvement`,body:`Guidance is provided on exercises, posture correction, or lifestyle adjustments to improve walking ability.`,quote:`Simple improvements can enhance mobility.`},{title:`Monitoring Over Time`,body:`Yearly assessments help track changes in mobility and detect any decline before it becomes serious.`,quote:`Regular monitoring supports long-term mobility.`},{title:`Support for Fall Prevention`,body:`By understanding gait and balance, preventive measures can be taken to reduce the risk of falls and related injuries.`,quote:`Prevention is key to avoiding injuries.`}]},why:{heading:`Why this service is important`,body:`Changes in walking patterns are often early indicators of health or mobility issues in seniors.

If left unnoticed, these changes can increase the risk of falls and injuries.

A structured gait analysis helps identify such risks early and provides guidance to improve movement.

For families living away, it provides reassurance that their parents' mobility and safety are being monitored.

This leads to better independence, reduced fall risk, and improved quality of life.`,image:`/images/nurse 5.jpg`}}};function $p({children:e,delay:t=0,y:n=28}){let r=(0,b.useRef)(null),i=bf(r,{once:!0,margin:`-60px 0px`});return(0,G.jsx)(Y.div,{ref:r,initial:{opacity:0,y:n},animate:i?{opacity:1,y:0}:{opacity:0,y:n},transition:{duration:.72,delay:t,ease:[.22,1,.36,1]},children:e})}function em(){let[e,t]=(0,b.useState)(!1),[n,r]=(0,b.useState)({name:``,mobile:``}),[i,a]=(0,b.useState)(!1),{slug:o}=et();Xe();let s=Qe(),c=Xp.find(e=>e.slug===o),l=Qp[o]||null,u=Zp,d=c?Xp.filter(e=>e.cat===c.cat&&e.slug!==o).slice(0,3):[],f=Xp.findIndex(e=>e.slug===o)+1,p=Jp[o]||{};qp(p.title||`${c?.name} | 60 Plus India`,p.description||c?.description,p.keywords||`${c?.name}, 60 plus india`),(0,b.useEffect)(()=>{if(!c)return;let e=`service-jsonld`;document.getElementById(e)?.remove();let t=Yp[o]||{"@context":`https://schema.org`,"@type":`Service`,serviceType:c.name,provider:{"@type":`LocalBusiness`,name:`60Plus India`,address:{"@type":`PostalAddress`,streetAddress:`Plot No 22, Rajalakshmi Nagar, Velacheri`,addressLocality:`Chennai`,addressRegion:`TN`,postalCode:`600042`,addressCountry:`IN`}},areaServed:{"@type":`State`,name:`Tamil Nadu`},description:p.description||c.description,offers:{"@type":`Offer`,description:`Part of the 21-service Premium Plan`,price:`200.00`,priceCurrency:`USD`}},n=document.createElement(`script`);return n.type=`application/ld+json`,n.id=e,n.textContent=JSON.stringify(t),document.head.appendChild(n),()=>document.getElementById(e)?.remove()},[o]);let m=e=>{let{name:t,value:n}=e.target;r(e=>({...e,[t]:n}))},h=e=>{if(e.preventDefault(),!n.name.trim()||!n.mobile.trim()){alert(`Please fill in both name and mobile number`);return}if(!/^[0-9]{10,15}$/.test(n.mobile)){alert(`Please enter a valid mobile number`);return}a(!0)},g=()=>{t(!1),a(!1),r({name:``,mobile:``})};return(0,b.useEffect)(()=>{window.scrollTo(0,0)},[o]),c?(0,G.jsxs)(`div`,{className:`sd`,children:[(0,G.jsx)(Tf,{alwaysWhite:!0}),(0,G.jsx)(`style`,{children:`
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .sd {
          min-height: 100vh;
          background: #ffffff;
          font-family: 'Nunito Sans', sans-serif;
          color: #1a0a2e;
          overflow-x: hidden;
          padding-top: 76px;
        }

        .w { max-width: 1080px; margin: 0 auto; padding: 0 24px; }

        .sd-nav {
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 34px 0 0; gap: 12px; flex-wrap: wrap;
        }
        .sd-back-btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 700; color: rgba(26,10,46,.38);
          background: none; border: none; cursor: pointer;
          transition: color .18s, gap .18s;
        }
        .sd-back-btn:hover { color: #8235d0; gap: 10px; }

        /* ── HERO ── */
        .sd-hero {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 88px; align-items: center;
          padding: 64px 0 88px;
        }
        .sd-index-label {
          font-size: 11px; font-weight: 800; letter-spacing: 2px;
          color: rgba(26,10,46,.25); text-transform: uppercase;
          margin-bottom: 12px;
        }
        .sd-cat-tag {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 5px 14px; border-radius: 6px; margin-bottom: 22px;
          font-size: 11px; font-weight: 800; letter-spacing: 1.2px;
          text-transform: uppercase; border: 1px solid;
        }
        .sd-h1 {
          font-family: "Gambarino", serif;
          font-size: clamp(36px, 4.2vw, 56px);
          font-weight: 500; line-height: 1.1;
          letter-spacing: -.5px; color: #1a0a2e;
          margin-bottom: 20px;
        }
        .sd-tagline {
          font-size: 14px; font-weight: 800;
          letter-spacing: .4px; margin-bottom: 16px;
        }
        .sd-summary {
          font-size: 17px; line-height: 1.82;
          color: #1a0a2e; font-weight: 500;
          margin-bottom: 40px;
        }

        /* ── STATS - fixed single-line layout ── */
        .sd-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px; /* 🔥 adds breathing space */
  border-top: 1px solid rgba(26,10,46,.08);
  padding-top: 24px;
}
        .sd-stat {
          
  padding-right: 0;
  border-right: none;
}
          min-width: 0;
          overflow: hidden;
        }
        .sd-stat:last-child {
          border-right: none;
          padding-right: 0;
        }
        .sd-stat-val {
          font-size: 16px;
          font-weight: 800;
          color: #1a0a2e;
          letter-spacing: -.1px;
          line-height: 1.3;
          margin-bottom: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sd-stat-lbl {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: rgba(26,10,46,.32);
          line-height: 1.3;
          white-space: nowrap;
        }

        .sd-cs {
          display: inline-flex; align-items: flex-start; gap: 13px;
          padding: 18px 22px; border-radius: 14px;
          border: 1px solid rgba(130,53,208,.12);
          background: rgba(130,53,208,.04);
        }
        .sd-cs strong { display: block; font-size: 15px; font-weight: 800; color: #1a0a2e; margin-bottom: 3px; }
        .sd-cs span { font-size: 13px; color: rgba(26,10,46,.45); line-height: 1.55; }

        .sd-img-frame {
          border-radius: 24px; overflow: hidden;
          aspect-ratio: 4/3; position: relative;
          background: rgba(130,53,208,.05);
        }
        .sd-img-frame img { width: 100%; height: 100%; object-fit: cover; object-position: center center; display: block; }
        .sd-img-ph { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
        .sd-img-bar {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 22px 26px;
          background: linear-gradient(to top, rgba(8,3,20,.75) 0%, transparent 100%);
          display: flex; align-items: flex-end; justify-content: space-between;
        }
        .sd-img-cat { font-size: 12px; font-weight: 700; color: rgba(255,255,255,.55); letter-spacing: .4px; }
        .sd-img-badge { font-size: 10px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: rgba(255,255,255,.82); background: rgba(255,255,255,.11); border: 1px solid rgba(255,255,255,.18); padding: 6px 12px; border-radius: 6px; }

        .sd-rule { border: none; border-top: 1px solid rgba(26,10,46,.07); }

        .sd-eyebrow {
          display: flex; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 800; letter-spacing: 2.2px;
          text-transform: uppercase; color: #8235d0; margin-bottom: 14px;
        }
        .sd-eyebrow::before { content: ""; width: 24px; height: 1.5px; background: #8235d0; border-radius: 2px; flex-shrink: 0; }

        .sd-what { padding: 80px 0; }
        .sd-what-head { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 56px; gap: 12px; flex-wrap: wrap; }
        .sd-what-h2 { font-family: "Gambarino", serif; font-size: clamp(26px, 2.8vw, 38px); font-weight: 500; color: #1a0a2e; line-height: 1.15; }
        .sd-what-count { font-size: 13px; font-weight: 700; color: rgba(26,10,46,.28); white-space: nowrap; }

        .sd-newspaper { display: grid; grid-template-columns: 1fr 1px 1fr; gap: 0; }
        .sd-spine { background: rgba(26,10,46,.07); width: 1px; }
        .sd-np-col { display: flex; flex-direction: column; }
        .sd-np-col-left  { padding-right: 52px; }
        .sd-np-col-right { padding-left: 52px; }
        .sd-np-item { padding: 32px 0; border-bottom: 1px solid rgba(26,10,46,.07); }
        .sd-np-item:last-child { border-bottom: none; }
        .sd-np-num { font-size: 13px; font-weight: 900; letter-spacing: 2px; color: #1a0a2e; text-transform: uppercase; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
        .sd-np-num-bar { display: inline-block; width: 18px; height: 3px; border-radius: 2px; flex-shrink: 0; }
        .sd-np-title { font-size: 19px; font-weight: 800; color: #1a0a2e; line-height: 1.25; letter-spacing: -.15px; margin-bottom: 12px; }
        .sd-np-body { font-size: 15px; line-height: 1.82; color: #1a0a2e; font-weight: 500; }
        .sd-np-quote { margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(26,10,46,.07); font-size: 13px; font-weight: 700; font-style: italic; line-height: 1.5; }

        .sd-why { padding: 80px 0; }
        .sd-why-grid { display: grid; grid-template-columns: 5fr 4fr; gap: 80px; align-items: center; }
        .sd-why-h2 { font-family: "Gambarino", serif; font-size: clamp(24px, 2.6vw, 34px); font-weight: 500; color: #1a0a2e; line-height: 1.2; margin-bottom: 20px; }
        .sd-why-body { font-size: 16px; line-height: 1.9; color: #1a0a2e; font-weight: 500; white-space: pre-line; }
        .sd-why-frame { border-radius: 20px; overflow: hidden; aspect-ratio: 4/3; }
        .sd-why-frame img { width: 100%; height: 100%; object-fit: cover; object-position: center center; display: block; }

        .sd-cta-sec { padding: 0 0 88px; }
        .sd-cta {
          background: #1a0a2e; border-radius: 22px; padding: 52px 56px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 36px; flex-wrap: wrap; position: relative; overflow: hidden;
        }
        .sd-cta::before { content: ""; position: absolute; top: -90px; right: -90px; width: 300px; height: 300px; border-radius: 50%; background: rgba(130,53,208,.12); pointer-events: none; }
        .sd-cta::after { content: ""; position: absolute; bottom: -60px; left: -60px; width: 200px; height: 200px; border-radius: 50%; background: rgba(130,53,208,.07); pointer-events: none; }
        .sd-cta-eyebrow { font-size: 10px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,.85); margin-bottom: 10px; }
        .sd-cta-h3 { font-family: "Gambarino", serif; font-size: clamp(20px, 2vw, 28px); font-weight: 500; color: #fff; line-height: 1.2; margin-bottom: 8px; }
        .sd-cta-sub { font-size: 14px; color: rgba(255,255,255,.85); font-weight: 600; }
        .sd-cta-right { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; flex-shrink: 0; position: relative; z-index: 1; }
        .sd-cta-btn { padding: 18px 44px; border-radius: 50px; background: linear-gradient(94deg, #8235d0, #5f308e); color: #fff; font-weight: 800; font-size: 16px; border: none; cursor: pointer; white-space: nowrap; transition: transform .2s; }
        .sd-cta-btn:hover { transform: translateY(-2px); }
        .sd-cta-note { font-size: 11px; color: rgba(255,255,255,.18); font-weight: 600; }

        .sd-related { padding: 0 0 100px; }
        .sd-related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .sd-rel-card { background: #fff; border: 1px solid rgba(26,10,46,.07); border-radius: 18px; padding: 28px 24px 22px; cursor: pointer; text-align: left; width: 100%; transition: border-color .25s, box-shadow .25s, transform .25s; }
        .sd-rel-card:hover { border-color: rgba(130,53,208,.16); box-shadow: 0 10px 32px rgba(130,53,208,.07); transform: translateY(-4px); }
        .sd-rel-icon { margin-bottom: 14px; }
        .sd-rel-name { font-family: "Gambarino", serif; font-size: 17px; font-weight: 500; color: #1a0a2e; line-height: 1.3; margin-bottom: 6px; }
        .sd-rel-cat { font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: rgba(26,10,46,.28); margin-bottom: 16px; }
        .sd-rel-link { display: inline-flex; align-items: center; gap: 5px; font-size: 13px; font-weight: 800; color: #8235d0; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .w { padding: 0 24px; }
          .sd-hero { grid-template-columns: 1fr; gap: 44px; padding: 44px 0 64px; }
          .sd-img-frame { aspect-ratio: 4/3; }
          .sd-stats { grid-template-columns: repeat(2, 1fr); gap: 20px 0; }
          .sd-stat { border-right: none; padding-right: 0; border-bottom: 1px solid rgba(26,10,46,.07); padding-bottom: 14px; }
          .sd-stat:nth-child(2n) { border-bottom: 1px solid rgba(26,10,46,.07); }
          .sd-stat:last-child { border-bottom: none; }
          .sd-stat-val { font-size: 14px; white-space: normal; }
          .sd-newspaper { grid-template-columns: 1fr; }
          .sd-spine { display: none; }
          .sd-np-col-left { padding-right: 0; }
          .sd-np-col-right { padding-left: 0; }
          .sd-why-grid { grid-template-columns: 1fr; gap: 40px; }
          .sd-cta { flex-direction: column; align-items: flex-start; padding: 36px 32px; }
          .sd-cta-right { align-items: flex-start; }
          .sd-related-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .sd-h1 { font-size: 30px; }
          .sd-related-grid { grid-template-columns: 1fr; }
          .sd-cta { padding: 28px 22px; }
          .sd-stats { grid-template-columns: repeat(2, 1fr); }
        }

        /* SUBSCRIPTION POPUP */
        .popup-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
        .popup-content { background: white; border-radius: 16px; padding: 32px; max-width: 480px; width: 100%; box-shadow: 0 10px 30px rgba(0,0,0,0.15); max-height: 90vh; overflow-y: auto; position: relative; }
        .popup-close { position: absolute; top: 12px; right: 12px; width: 32px; height: 32px; border-radius: 50%; background: #f8f5ff; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #8235d0; font-weight: bold; font-size: 16px; transition: all 0.2s ease; }
        .popup-close:hover { background: #8235d0; color: white; }
        .subscribe-form h3 { font-family: "Gambarino", serif; font-size: 24px; color: #1a0a2e; margin: 0 0 4px; text-align: center; font-weight: 500; }
        .subscribe-form .subtitle { text-align: center; color: rgba(26,10,46,.6); font-size: 14px; margin-bottom: 24px; font-weight: 500; }
        .form-group { margin-bottom: 20px; position: relative; }
        .form-group label { display: block; font-size: 14px; font-weight: 600; color: #1a0a2e; margin-bottom: 8px; }
        .form-group input { width: 100%; padding: 14px 14px 14px 44px; border: 2px solid rgba(26,10,46,0.1); border-radius: 12px; font-size: 15px; font-family: 'Nunito Sans', sans-serif; color: #1a0a2e; box-sizing: border-box; transition: all 0.2s ease; background: #fafafa; }
        .form-group input:focus { outline: none; border-color: #8235d0; background: white; }
        .form-group input::placeholder { color: rgba(26,10,46,0.4); }
        .form-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #8235d0; z-index: 1; display: flex; align-items: center; justify-content: center; }
        .form-actions { display: flex; gap: 12px; margin-top: 4px; }
        .submit-btn, .cancel-btn { flex: 1; padding: 14px; border-radius: 12px; font-size: 15px; font-weight: 700; cursor: pointer; border: none; font-family: 'Nunito Sans', sans-serif; transition: all 0.2s ease; }
        .submit-btn { background: linear-gradient(94deg, #8235d0, #5f308e); color: white; }
        .submit-btn:hover { background: linear-gradient(94deg, #7a2bc4, #562aa0); }
        .cancel-btn { background: #f8f5ff; color: #8235d0; border: 2px solid rgba(130,53,208,0.2); }
        .cancel-btn:hover { background: #f0e6ff; }
        .success-content { text-align: center; padding-top: 6px; }
        .success-content .success-icon { width: 50px; height: 50px; background: #e8f5e9; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: #4caf50; }
        .success-content h3 { font-family: "Gambarino", serif; font-size: 24px; color: #1a0a2e; margin: 0 0 10px; font-weight: 500; }
        .success-content p { font-size: 15px; color: #1a0a2e; margin: 0 0 24px; line-height: 1.5; font-weight: 500; }
        .whatsapp-support { margin: 24px 0; }
        .whatsapp-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 28px; background: #25D366; color: white; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 15px; transition: all 0.2s ease; border: none; cursor: pointer; }
        .whatsapp-btn:hover { background: #128C7E; }
        .payment-note { background: #f8f9fa; padding: 12px; border-radius: 8px; font-size: 13px; color: #666; margin: 24px 0; font-style: italic; border: 1px solid #e0e0e0; }
        .close-btn { padding: 12px 28px; background: #8235d0; color: white; border: none; border-radius: 12px; font-size: 15px; cursor: pointer; margin-top: 12px; font-weight: 700; transition: all 0.2s ease; }
        .close-btn:hover { background: #7a2bc4; }
        @media (max-width: 768px) {
          .popup-content { margin: 20px; padding: 28px 20px; }
          .form-actions { flex-direction: column; }
          .whatsapp-btn { width: 100%; }
        }
      `}),(0,G.jsx)(Kp,{items:[{label:`Services`,href:`/#services`},{label:c.name}]}),(0,G.jsx)(`div`,{className:`w`}),(0,G.jsx)(`div`,{className:`w`,children:(0,G.jsxs)(`div`,{className:`sd-hero`,children:[(0,G.jsxs)(Y.div,{initial:{opacity:0,x:-30},animate:{opacity:1,x:0},transition:{duration:.72,ease:[.22,1,.36,1]},children:[(0,G.jsxs)(`div`,{className:`sd-index-label`,children:[`Service `,String(f).padStart(2,`0`),` of `,Xp.length]}),(0,G.jsxs)(`div`,{className:`sd-cat-tag`,style:{background:u.light,color:u.accent,borderColor:u.border},children:[(0,G.jsx)(`span`,{style:{display:`flex`,alignItems:`center`},children:c.icon}),c.cat]}),(0,G.jsx)(`h1`,{className:`sd-h1`,children:c.name}),l?(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(`p`,{className:`sd-tagline`,style:{color:u.accent},children:l.tagline}),(0,G.jsx)(`p`,{className:`sd-summary`,children:l.summary})]}):(0,G.jsx)(`p`,{className:`sd-summary`,children:c.description}),l?.stats?(0,G.jsx)(`div`,{className:`sd-stats`,children:l.stats.map((e,t)=>(0,G.jsxs)(`div`,{className:`sd-stat`,children:[(0,G.jsx)(`div`,{className:`sd-stat-val`,children:e.value}),(0,G.jsx)(`div`,{className:`sd-stat-lbl`,children:e.label})]},t))}):(0,G.jsxs)(`div`,{className:`sd-cs`,children:[(0,G.jsx)(Yf,{size:18,color:`#8235d0`,style:{flexShrink:0,marginTop:2}}),(0,G.jsxs)(`div`,{children:[(0,G.jsx)(`strong`,{children:`Full guide coming soon`}),(0,G.jsx)(`span`,{children:`We're preparing a detailed page for this service. Subscribe to stay updated.`})]})]})]}),(0,G.jsx)(Y.div,{initial:{opacity:0,x:30},animate:{opacity:1,x:0},transition:{duration:.72,ease:[.22,1,.36,1]},children:(0,G.jsxs)(`div`,{className:`sd-img-frame`,children:[l?.image?(0,G.jsx)(`img`,{src:l.image,alt:c.name}):(0,G.jsx)(`div`,{className:`sd-img-ph`,style:{background:u.light},children:(0,G.jsx)(`div`,{style:{color:u.accent,opacity:.13,transform:`scale(5.5)`},children:c.icon})}),(0,G.jsxs)(`div`,{className:`sd-img-bar`,children:[(0,G.jsx)(`span`,{className:`sd-img-cat`,children:c.cat}),(0,G.jsx)(`span`,{className:`sd-img-badge`,children:`60Plus Premium`})]})]})})]})}),(0,G.jsx)(`hr`,{className:`sd-rule`}),l?.what&&(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(`div`,{className:`w`,children:(0,G.jsxs)(`div`,{className:`sd-what`,children:[(0,G.jsx)($p,{children:(0,G.jsxs)(`div`,{className:`sd-what-head`,children:[(0,G.jsxs)(`div`,{children:[(0,G.jsx)(`div`,{className:`sd-eyebrow`,children:`What's included`}),(0,G.jsx)(`h2`,{className:`sd-what-h2`,children:l.what.heading})]}),(0,G.jsxs)(`span`,{className:`sd-what-count`,children:[l.what.items.length,` areas of care per visit`]})]})}),(0,G.jsxs)(`div`,{className:`sd-newspaper`,children:[(0,G.jsx)(`div`,{className:`sd-np-col sd-np-col-left`,children:l.what.items.filter((e,t)=>t%2==0).map((e,t)=>(0,G.jsx)($p,{delay:t*.07,y:18,children:(0,G.jsxs)(`div`,{className:`sd-np-item`,children:[(0,G.jsxs)(`div`,{className:`sd-np-num`,children:[(0,G.jsx)(`span`,{className:`sd-np-num-bar`,style:{background:u.accent}}),String(t*2+1).padStart(2,`0`)]}),(0,G.jsx)(`div`,{className:`sd-np-title`,children:e.title}),(0,G.jsx)(`p`,{className:`sd-np-body`,children:e.body}),e.quote&&(0,G.jsx)(`p`,{className:`sd-np-quote`,style:{color:u.accent},children:e.quote})]})},t))}),(0,G.jsx)(`div`,{className:`sd-spine`}),(0,G.jsx)(`div`,{className:`sd-np-col sd-np-col-right`,children:l.what.items.filter((e,t)=>t%2!=0).map((e,t)=>(0,G.jsx)($p,{delay:t*.07+.04,y:18,children:(0,G.jsxs)(`div`,{className:`sd-np-item`,children:[(0,G.jsxs)(`div`,{className:`sd-np-num`,children:[(0,G.jsx)(`span`,{className:`sd-np-num-bar`,style:{background:u.accent}}),String(t*2+2).padStart(2,`0`)]}),(0,G.jsx)(`div`,{className:`sd-np-title`,children:e.title}),(0,G.jsx)(`p`,{className:`sd-np-body`,children:e.body}),e.quote&&(0,G.jsx)(`p`,{className:`sd-np-quote`,style:{color:u.accent},children:e.quote})]})},t))})]})]})}),(0,G.jsx)(`hr`,{className:`sd-rule`})]}),l?.why&&(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(`div`,{className:`w`,children:(0,G.jsx)(`div`,{className:`sd-why`,children:(0,G.jsxs)(`div`,{className:`sd-why-grid`,children:[(0,G.jsx)($p,{children:(0,G.jsxs)(`div`,{children:[(0,G.jsx)(`div`,{className:`sd-eyebrow`,children:`Why it matters`}),(0,G.jsx)(`h2`,{className:`sd-why-h2`,children:l.why.heading}),(0,G.jsx)(`p`,{className:`sd-why-body`,children:l.why.body})]})}),(0,G.jsx)($p,{delay:.1,y:20,children:(0,G.jsx)(`div`,{className:`sd-why-frame`,children:(0,G.jsx)(`img`,{src:l.why.image,alt:`Why it matters`})})})]})})}),(0,G.jsx)(`hr`,{className:`sd-rule`})]}),(0,G.jsxs)(`div`,{className:`w`,children:[(0,G.jsx)(`div`,{style:{height:68}}),(0,G.jsx)($p,{children:(0,G.jsxs)(`div`,{className:`sd-cta`,children:[(0,G.jsxs)(`div`,{style:{position:`relative`,zIndex:1},children:[(0,G.jsx)(`p`,{className:`sd-cta-eyebrow`,children:`60Plus Premium Plan`}),(0,G.jsx)(`h3`,{className:`sd-cta-h3`,children:`This service is part of one complete plan`}),(0,G.jsx)(`p`,{className:`sd-cta-sub`,children:`All 21 services included - $100 per month`})]}),(0,G.jsx)(`div`,{className:`sd-cta-right`,children:(0,G.jsx)(`button`,{className:`sd-cta-btn`,onClick:()=>s(`/subscription#pricing`),children:`Subscribe Now`})})]})}),(0,G.jsx)(`div`,{style:{height:80}})]}),d.length>0&&(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(`hr`,{className:`sd-rule`}),(0,G.jsx)(`div`,{className:`w`,children:(0,G.jsxs)(`div`,{className:`sd-related`,children:[(0,G.jsx)(`div`,{style:{height:64}}),(0,G.jsx)($p,{children:(0,G.jsxs)(`div`,{className:`sd-eyebrow`,style:{marginBottom:22},children:[`More in `,c.cat]})}),(0,G.jsx)(`div`,{className:`sd-related-grid`,children:d.map((e,t)=>(0,G.jsx)($p,{delay:t*.07,y:18,children:(0,G.jsxs)(`button`,{className:`sd-rel-card`,onClick:()=>s(`/services/${e.slug}`),children:[(0,G.jsx)(`div`,{className:`sd-rel-icon`,style:{color:u.accent},children:e.icon}),(0,G.jsx)(`div`,{className:`sd-rel-name`,children:e.name}),(0,G.jsx)(`div`,{className:`sd-rel-cat`,children:e.cat}),(0,G.jsxs)(`span`,{className:`sd-rel-link`,children:[`Learn more `,(0,G.jsx)(Lf,{size:12})]})]})},e.slug))})]})})]}),e&&(0,G.jsx)(`div`,{className:`popup-overlay`,onClick:g,children:(0,G.jsxs)(`div`,{className:`popup-content`,onClick:e=>e.stopPropagation(),children:[(0,G.jsx)(`button`,{className:`popup-close`,onClick:g,children:`×`}),i?(0,G.jsxs)(`div`,{className:`success-content`,children:[(0,G.jsx)(`div`,{className:`success-icon`,children:(0,G.jsxs)(`svg`,{width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:[(0,G.jsx)(`path`,{d:`M22 11.08V12a10 10 0 1 1-5.93-9.14`}),(0,G.jsx)(`polyline`,{points:`22,4 12,14.01 9,11.01`})]})}),(0,G.jsx)(`h3`,{children:`Thank You!`}),(0,G.jsx)(`p`,{children:`Our team will contact you within 24 hours.`}),(0,G.jsx)(`div`,{className:`whatsapp-support`,children:(0,G.jsxs)(`a`,{href:Cf(o),target:`_blank`,rel:`noopener noreferrer`,className:`whatsapp-btn`,children:[(0,G.jsx)(`svg`,{width:`20`,height:`20`,viewBox:`0 0 24 24`,fill:`currentColor`,children:(0,G.jsx)(`path`,{d:`M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.386`})}),`Contact us for 24/7 Support`]})}),(0,G.jsx)(`div`,{className:`payment-note`,children:`We're working on the payment process`})]}):(0,G.jsxs)(`div`,{className:`subscribe-form`,children:[(0,G.jsx)(`h3`,{children:`Subscribe to Our Service`}),(0,G.jsx)(`p`,{className:`subtitle`,children:`Fill in your details and our team will contact you shortly`}),(0,G.jsxs)(`form`,{onSubmit:h,children:[(0,G.jsxs)(`div`,{className:`form-group`,children:[(0,G.jsx)(`label`,{htmlFor:`name`,children:`Full Name`}),(0,G.jsxs)(`div`,{style:{position:`relative`},children:[(0,G.jsxs)(`svg`,{className:`form-icon`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:[(0,G.jsx)(`path`,{d:`M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2`}),(0,G.jsx)(`circle`,{cx:`12`,cy:`7`,r:`4`})]}),(0,G.jsx)(`input`,{type:`text`,id:`name`,name:`name`,value:n.name,onChange:m,placeholder:`Enter your full name`,required:!0})]})]}),(0,G.jsxs)(`div`,{className:`form-group`,children:[(0,G.jsx)(`label`,{htmlFor:`mobile`,children:`Mobile Number`}),(0,G.jsxs)(`div`,{style:{position:`relative`},children:[(0,G.jsxs)(`svg`,{className:`form-icon`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:[(0,G.jsx)(`rect`,{x:`5`,y:`2`,width:`14`,height:`20`,rx:`2`,ry:`2`}),(0,G.jsx)(`path`,{d:`M12 18h.01`})]}),(0,G.jsx)(`input`,{type:`tel`,id:`mobile`,name:`mobile`,value:n.mobile,onChange:m,placeholder:`Enter your mobile number`,required:!0})]})]}),(0,G.jsxs)(`div`,{className:`form-actions`,children:[(0,G.jsx)(`button`,{type:`submit`,className:`submit-btn`,children:`Submit`}),(0,G.jsx)(`button`,{type:`button`,className:`cancel-btn`,onClick:g,children:`Cancel`})]})]})]})]})})]}):(0,G.jsx)(`div`,{style:{minHeight:`100vh`,display:`flex`,alignItems:`center`,justifyContent:`center`,background:`linear-gradient(180deg,#fff 0%,#f6f2ff 100%)`,fontFamily:`'Nunito Sans',sans-serif`},children:(0,G.jsxs)(Y.div,{style:{textAlign:`center`,padding:`0 24px`},initial:{opacity:0,y:30},animate:{opacity:1,y:0},children:[(0,G.jsx)(`p`,{style:{fontSize:11,fontWeight:800,letterSpacing:2,color:`#8235d0`,textTransform:`uppercase`,marginBottom:20},children:`Not found`}),(0,G.jsx)(`h2`,{style:{fontFamily:`"Gambarino",serif`,fontSize:40,color:`#1a0a2e`,marginBottom:14,fontWeight:500},children:`This page doesn't exist`}),(0,G.jsx)(`p`,{style:{color:`rgba(26,10,46,.5)`,marginBottom:36,fontSize:16},children:`Browse all 21 services on our home page.`}),(0,G.jsx)(`button`,{onClick:()=>s(`/`),style:{padding:`15px 36px`,borderRadius:50,background:`linear-gradient(94deg,#8235d0,#5f308e)`,color:`#fff`,fontWeight:800,fontSize:15,border:`none`,cursor:`pointer`},children:`Back to Home`})]})})}var tm={hidden:{opacity:0,y:48},visible:(e=0)=>({opacity:1,y:0,transition:{duration:.7,delay:e*.08,ease:[.22,1,.36,1]}}),exit:{opacity:0,y:-20,transition:{duration:.4,ease:[.22,1,.36,1]}}},nm={hidden:{opacity:0,scale:.97},visible:(e=0)=>({opacity:1,scale:1,transition:{duration:.6,delay:e*.07,ease:[.22,1,.36,1]}})};function rm({children:e,custom:t=0,className:n=``,variants:r=tm}){let i=(0,b.useRef)(null),a=bf(i,{once:!0,margin:`-80px 0px`});return(0,G.jsx)(Y.div,{ref:i,className:n,custom:t,variants:r,initial:`hidden`,animate:a?`visible`:`hidden`,children:e})}function im(){qp(`Premium Elder Care Services for NRIs in India | 60Plus India`,`Give your parents in India the care they deserve from anywhere in the world. 60Plus Global's Premium Plan includes 21 services, 24/7 emergency support, and monthly doctor visits for $2400/year. Trusted by global families.`,`premium elder care India, NRI parent care services, 60Plus Global subscription, senior care plans for NRIs, elderly care ecosystem India, professional parent care from abroad, annual senior care membership, geriatric care management India, 24/7 emergency support for parents India, monthly doctor home visits, senior health index India, home safety assessment for seniors, managed elderly care services`),(0,b.useEffect)(()=>{let e=`subscription-jsonld`;if(document.getElementById(e))return;let t=document.createElement(`script`);return t.type=`application/ld+json`,t.id=e,t.textContent=JSON.stringify({"@context":`https://schema.org`,"@type":`Product`,name:`60Plus Premium Plan`,image:`https://www.60plusindia.com/logo/60_plus_india.png`,description:`A complete elder care ecosystem for parents in India, featuring 21 premium services including monthly doctor visits, 24/7 emergency support, and a dedicated care manager.`,brand:{"@type":`Brand`,name:`60Plus India`},offers:{"@type":`Offer`,url:`https://www.60plusindia.com/subscription`,priceCurrency:`USD`,price:`1200.00`,priceValidUntil:`2026-12-31`,availability:`https://schema.org/InStock`,description:`Annual membership exclusive of GST`},aggregateRating:{"@type":`AggregateRating`,ratingValue:`4.9`,reviewCount:`50000`}}),document.head.appendChild(t),()=>{document.getElementById(e)?.remove()}},[]);let e=Xe();(0,b.useEffect)(()=>{e.hash===`#pricing`&&setTimeout(()=>{let e=document.getElementById(`pricing`);if(e){let t=e.getBoundingClientRect().top+window.scrollY-90;window.scrollTo({top:t,behavior:`smooth`})}},300)},[e.hash]);let[t,n]=(0,b.useState)(!1),[r,i]=(0,b.useState)(!1),a=(0,b.useRef)(null),o=(0,b.useRef)(null),s=(0,b.useRef)(null),c=(0,b.useRef)(null),l=()=>i(!1);(0,b.useEffect)(()=>{let e=!1,t=()=>{e||(e=!0,requestAnimationFrame(()=>{let t=window.scrollY*.12;a.current&&(a.current.style.transform=`rotate(-4deg) translateY(${t}px)`),o.current&&(o.current.style.transform=`rotate(4deg) translateY(${t}px)`),s.current&&(s.current.style.transform=`translateY(${t}px)`),c.current&&(c.current.style.transform=`translateY(${t}px)`),e=!1}))};return window.addEventListener(`scroll`,t,{passive:!0}),()=>window.removeEventListener(`scroll`,t)},[]);let u=Xp;return(0,G.jsxs)(`section`,{className:`subscription`,children:[(0,G.jsx)(Tf,{alwaysWhite:!0}),(0,G.jsx)(Kp,{items:[{label:`Subscription`}]}),(0,G.jsx)(`style`,{children:`
        body {
          background: linear-gradient(180deg, #ffffff 0%, #f6f2ff 100%);
        }

        .subscription {
          padding: 0;
          background: linear-gradient(180deg, #ffffff 0%, #f6f2ff 100%);
          font-family: 'Nunito Sans', sans-serif;
          padding-top: 76px;
        }

        /* ── HERO ── */
        .sub-hero {
          padding: 70px 20px 100px;
          text-align: center;
          background: linear-gradient(180deg, #ffffff 0%, #faf5ff 100%);
          position: relative;
          overflow: visible;
        }

        .sub-hero-inner {
          max-width: 900px;
          margin: auto;
        }

        .sub-hero h1 {
          font-family: "Gambarino", serif;
          font-size: clamp(34px, 5vw, 56px);
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: -0.5px;
          margin-bottom: 20px;
          color: #1a0a2e;
        }

        .sub-hero p {
          font-size: 18px;
          line-height: 1.7;
          color: rgba(26,10,46,0.7);
          max-width: 700px;
          margin: 0 auto;
        }

        /* ── HERO VISUAL ── */
        .hero-visual-wrapper {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 48px;
          max-width: 1200px;
          margin: -40px auto 80px;
          padding: 0 40px;
          position: relative;
          z-index: 2;
        }

        .hero-visual-wrapper::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 700px 400px at center, rgba(130,53,208,0.10), transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Side columns ── */
        .side-col {
          width: 190px;
          flex-shrink: 0;
          position: relative;
          height: 330px;
          z-index: 1;
        }

        .side-img-main {
          position: absolute;
          width: 170px;
          height: 230px;
          object-fit: cover;
          border-radius: 20px;
          opacity: 0.95;
          filter: contrast(1.05) saturate(1.1);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          transform-origin: center;
          z-index: 2;
          top: 0;
        }

        .side-img-back {
          position: absolute;
          width: 150px;
          height: 210px;
          object-fit: cover;
          border-radius: 20px;
          opacity: 0.45;
          box-shadow: 0 12px 28px rgba(0,0,0,0.10);
          z-index: 1;
          top: 20px;
        }

        .side-col-left .side-img-main  { right: 0;    transform: rotate(-4deg); }
        .side-col-left .side-img-back  { right: -14px; transform: rotate(6deg);  }
        .side-col-right .side-img-main { left: 0;     transform: rotate(4deg);  }
        .side-col-right .side-img-back { left: -14px;  transform: rotate(-6deg); }

        .side-label {
          position: absolute;
          top: 252px;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 3;
          white-space: nowrap;
        }

        .side-col-left .side-label  { right: 0; }
        .side-col-right .side-label { left: 0;  }

        .side-label .icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #8235d0;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .side-label strong {
          font-size: 15px;
          font-weight: 800;
          letter-spacing: -0.2px;
          color: #1a0a2e;
          display: block;
        }

        .side-label p {
          margin: 0;
          font-size: 12px;
          color: rgba(26,10,46,0.65);
          font-weight: 600;
        }

        /* ────────────────────────────
           MATURE PREMIUM PRICING CARD
        ──────────────────────────── */
        .pricing-card-premium {
          flex: 0 0 520px;
          max-width: 520px;
          background: #ffffff;
          border-radius: 32px;
          padding: 64px 48px 48px;
          text-align: center;
          box-shadow: 0 40px 100px rgba(26, 10, 46, 0.06), 0 10px 30px rgba(26, 10, 46, 0.04);
          position: relative;
          z-index: 2;
          overflow: hidden;
          border: 1px solid rgba(130, 53, 208, 0.1);
          backdrop-filter: blur(6px);
        }

        /* Ribbon: Sleeker, Professional Gold */
        .premium-ribbon {
          position: absolute;
          top: 0;
          right: 0;
          width: 200px;
          height: 200px;
          overflow: hidden;
          z-index: 5;
        }

        .premium-ribbon span {
          position: absolute;
          width: 280px;
          padding: 10px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            45deg,
            #caa63d 0%,
            #f7e58a 20%,
            #e0c15a 40%,
            #fff2a6 50%,
            #e0c15a 60%,
            #b8962e 80%,
            #f7e58a 100%
          );
          color: #1a0a2e;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          text-align: center;
          right: -70px;
          top: 45px;
          transform: rotate(45deg);
          white-space: nowrap;
        }

        .premium-ribbon span::after {
          content: "";
          position: absolute;
          top: 0;
          left: -40%;
          width: 40%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255,255,255,0.6),
            transparent
          );
          transform: skewX(-20deg);
          pointer-events: none;
        }

        .card-header { margin-bottom: 32px; }

        .status-badge {
          display: inline-block;
          background: linear-gradient(135deg, #8235d0, #6d28d9);
          color: #fff;
          padding: 6px 16px;
          border-radius: 99px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.5px;
          margin-bottom: 20px;
          text-transform: uppercase;
        }

        .plan-main {
          font-family: "Gambarino", serif;
          font-size: 34px;
          font-weight: 500;
          color: #1a0a2e;
          margin: 10px 0 0;
          letter-spacing: -0.4px;
        }

        .plan-sub {
          font-size: 15px;
          color: rgba(26,10,46,0.5);
          font-weight: 600;
        }

        .annual-sub {
          display: none;
        }

        .limited-offer {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(26, 10, 46, 0.55);

  margin-top: 20px;   /* ↓ reduced from 20px */
}

        /* ── PRICE STACK ── */
        .price-section {
          margin: 16px 0 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .price-flow {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 18px;
          margin: 18px 0 10px;
        }

        .price-old {
          font-family: "Gambarino", serif;
          font-size: 54px;
          font-weight: 500;
          color: rgba(26, 10, 46, 0.7);
          position: relative;
          letter-spacing: -2px;
          line-height: 1;
        }

        .price-old::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 52%;
          height: 2px;
          background: rgba(26, 10, 46, 0.6);
        }

        .price-arrow {
          font-size: 22px;
          color: rgba(26, 10, 46, 0.4);
        }

        .price-new {
          display: flex;
          align-items: baseline;
          justify-content: center;
          color: #1a0a2e;
        }

        .price-new .currency {
          font-family: "Gambarino", serif;
          font-size: 32px;
          margin-right: 4px;
          font-weight: 400;
        }

        .price-new .amount {
          font-family: "Gambarino", serif;
          font-size: 80px;
          font-weight: 500;
          letter-spacing: -3px;
          line-height: 1;
        }

        .price-new .period {
          font-size: 18px;
          color: rgba(26, 10, 46, 0.5);
          margin-left: 8px;
          font-weight: 600;
        }

        .price-subtext {
          font-size: 14px;
          color: rgba(26, 10, 46, 0.6);
          margin-top: 10px;
          font-weight: 600;
          text-align: center;
        }

        .neat-divider {
          border: none;
          border-top: 1px solid rgba(26, 10, 46, 0.08);
          margin: 32px 0;
        }

        /* Features */
        .premium-features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px 24px;
          list-style: none;
          padding: 0;
          margin: 0 0 40px;
          text-align: left;
        }

        .premium-features-grid li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          font-weight: 600;
          color: #1a0a2e;
        }

        .check-icon {
          color: #8235d0;
          flex-shrink: 0;
        }

        .btn-subscribe-premium {
          width: 100%;
          padding: 20px;
          border-radius: 999px;
          background: linear-gradient(94deg, #8235d0 -2.32%, #5f308e 99.71%);
          color: #fff;
          font-weight: 800;
          font-size: 16px;
          letter-spacing: 0.4px;
          border: none;
          cursor: pointer;
          box-shadow: 0 12px 30px rgba(130, 53, 208, 0.25);
          transition: all 0.25s ease;
        }

        .btn-subscribe-premium:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 40px rgba(130, 53, 208, 0.35);
        }

        .price-note {
          margin-top: 16px;
          font-size: 12px;
          color: rgba(26,10,46,0.4);
          font-weight: 600;
        }

        /* ── MOBILE: card takes full width, side cols hide ── */
        @media (max-width: 860px) {
          .hero-visual-wrapper {
            flex-direction: column;
            align-items: center;
            margin: -20px auto 60px;
            padding: 0 20px;
            gap: 0;
          }
          .side-col { display: none; }
          .pricing-card-premium {
            flex: 0 0 auto;
            width: 100%;
            max-width: 500px;
            padding: 48px 36px 36px;
            border-radius: 24px;
          }
          .premium-features-grid { grid-template-columns: 1fr 1fr; gap: 11px 12px; }
        }

        @media (max-width: 600px) {
          .pricing-card-premium { padding: 48px 24px 32px; }
          .price-new .amount { font-size: 64px; }
          .price-old { font-size: 40px; }
          .premium-features-grid { grid-template-columns: 1fr; }
        }

        /* ── IMAGE MARQUEE ── */
        .marquee-caption {
          text-align: center;
          margin-bottom: 24px;
          font-size: 14px;
          color: rgba(26,10,46,0.65);
          font-weight: 500;
          letter-spacing: 0.3px;
          position: relative;
        }

        .marquee-caption::after {
          content: "";
          display: block;
          width: 120px;
          height: 1px;
          margin: 10px auto 0;
          background: linear-gradient(to right, transparent, rgba(130,53,208,0.4), transparent);
        }

        .image-marquee {
          overflow: hidden;
          margin: 30px 0 40px;
          padding: 0 20px;
        }

        .track {
          display: flex;
          gap: 20px;
          animation: scroll 30s linear infinite;
          width: max-content;
        }

        .track img {
          width: 160px;
          height: 200px;
          object-fit: cover;
          border-radius: 16px;
          flex-shrink: 0;
        }

        @keyframes scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* ── SERVICES SECTION ── */
        .services-section {
          background: #ffffff;
          border-radius: 32px;
          margin: 0 auto 140px;
          padding: 60px 30px 60px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.03);
          max-width: 1200px;
        }

        .services-header {
          text-align: center;
          margin-bottom: 50px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .badge {
          background: #8235d0;
          color: white;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 12px;
          display: inline-block;
          margin-bottom: 12px;
          font-weight: 700;
        }

        .services-header h2 {
          font-family: "Gambarino", serif;
          font-size: clamp(34px, 4vw, 50px);
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: -0.4px;
          margin-bottom: 10px;
          color: #1a0a2e;
        }

        .services-header p {
          font-size: 16px;
          color: rgba(26,10,46,0.65);
          line-height: 1.6;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 80px;
        }

        @media(max-width: 1000px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }

        .subscription::after { display: none; }
        .services-grid > div { display: contents; }

        .service-card {
          background: #fff;
          border-radius: 18px;
          padding: 30px;
          border: 1px solid rgba(0,0,0,0.06);
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 16px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          height: 100%;
          box-sizing: border-box;
        }

        .service-card:hover {
          border-color: rgba(130,53,208,0.2);
          box-shadow: 0 25px 50px rgba(130,53,208,0.10);
        }

        .service-icon {
          color: #8235d0;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          min-width: 44px;
          border-radius: 12px;
          background: rgba(130,53,208,0.08);
          margin-bottom: 0;
        }

        .service-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          height: 100%;
        }

        .service-title {
          font-family: "Gambarino", serif;
          font-size: 18px;
          margin-bottom: 12px;
          color: #1a0a2e;
          text-align: left;
        }

        .link {
          color: #8235d0;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: all 0.2s ease;
        }

        .link:hover {
          color: #5f308e;
          transform: translateX(4px);
        }

        /* ── VIEW ALL ── */
        .view-all {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 10px;
          margin-bottom: 0;
        }

        .view-btn {
          padding: 16px 36px;
          border-radius: 999px;
          border: 1px solid #8235d0;
          background: rgba(130,53,208,0.05);
          color: #8235d0;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .view-btn:hover {
          background: #8235d0;
          color: white;
          transform: translateY(-2px);
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .sub-hero { padding: 60px 16px 40px; }
          .sub-hero h1 { font-size: 30px; line-height: 1.3; }
          .sub-hero p { font-size: 15px; margin-bottom: 30px; }
          .track img { width: 120px; height: 160px; }
          .services-section { padding: 40px 16px 80px; border-radius: 20px; }
          .services-grid { grid-template-columns: 1fr; gap: 16px; }
          .service-card { padding: 18px; }
          .service-title { font-size: 16px; }
          .view-btn { width: 100%; max-width: 280px; text-align: center; }
          .breadcrumb { padding: 0 16px 0; }
        }

        /* ── POPUP ── */
        .popup-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .popup-content-premium {
          background: white;
          border-radius: 24px;
          padding: 48px 36px 40px;
          max-width: 420px;
          width: 100%;
          text-align: center;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18);
          position: relative;
        }

        .popup-close {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f3eeff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8235d0;
          font-weight: bold;
          font-size: 18px;
          line-height: 1;
          transition: all 0.2s ease;
        }

        .popup-close:hover {
          background: #8235d0;
          color: white;
        }

        .popup-title {
          font-family: 'Gambarino', serif;
          font-size: 26px;
          font-weight: 500;
          color: #1a0a2e;
          margin: 0 0 12px;
          letter-spacing: -0.3px;
        }

        .popup-desc {
          font-size: 15px;
          line-height: 1.65;
          color: rgba(26, 10, 46, 0.58);
          margin: 0 0 32px;
          max-width: 300px;
          margin-left: auto;
          margin-right: auto;
        }

        .popup-cta {
          display: inline-block;
          padding: 15px 32px;
          background: linear-gradient(135deg, #25D366, #1ebe5d);
          color: #fff;
          border-radius: 999px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.25s ease;
          letter-spacing: 0.1px;
        }

        .popup-cta:hover { transform: translateY(-2px); }

        .popup-note {
          margin-top: 18px;
          font-size: 13px;
          color: rgba(26, 10, 46, 0.38);
          font-weight: 500;
        }

        @media (max-width: 480px) {
          .popup-content-premium { padding: 40px 24px 32px; border-radius: 20px; }
          .popup-title { font-size: 22px; }
        }
      `}),(0,G.jsx)(`section`,{className:`sub-hero`,children:(0,G.jsxs)(`div`,{className:`sub-hero-inner`,children:[(0,G.jsxs)(Y.h1,{variants:tm,initial:`hidden`,animate:`visible`,custom:0,children:[`60Plus - Premium Elder Care Services`,(0,G.jsx)(`br`,{}),` for Your Parents in India`]}),(0,G.jsx)(Y.p,{variants:tm,initial:`hidden`,animate:`visible`,custom:1,children:`Give your parents the love, care, and attention they deserve - even from miles away. With 60Plus India's comprehensive care plans, your loved ones stay healthy, happy, and truly cared for - just like you would if you were there.`})]})}),(0,G.jsxs)(`div`,{className:`hero-visual-wrapper`,children:[(0,G.jsxs)(Y.div,{className:`side-col side-col-left`,variants:tm,initial:`hidden`,animate:`visible`,custom:1,children:[(0,G.jsx)(`img`,{ref:a,src:`images/hand_in_hand.jpg`,className:`side-img-main`,alt:`Elderly person receiving care`}),(0,G.jsx)(`img`,{src:`images/old_person_3.jpg`,className:`side-img-back`,alt:`Elderly person smiling`}),(0,G.jsxs)(`div`,{ref:s,className:`side-label`,children:[(0,G.jsx)(`div`,{className:`icon`,children:(0,G.jsx)(yp,{size:16})}),(0,G.jsxs)(`div`,{children:[(0,G.jsx)(`strong`,{children:`Trusted Care`}),(0,G.jsx)(`p`,{children:`Every step of the way`})]})]})]}),(0,G.jsxs)(Y.div,{className:`pricing-card-premium`,id:`pricing`,variants:tm,initial:`hidden`,animate:`visible`,custom:0,children:[(0,G.jsx)(`div`,{className:`premium-ribbon`,children:(0,G.jsx)(`span`,{children:`50% OFF • UNTIL MAY 15`})}),(0,G.jsxs)(`div`,{className:`card-header`,children:[(0,G.jsx)(`div`,{className:`status-badge`,children:`MOST POPULAR`}),(0,G.jsx)(`h2`,{className:`plan-main`,children:`60Plus Premium Plan`}),(0,G.jsx)(`div`,{className:`limited-offer`,children:`LIMITED TIME OFFER`})]}),(0,G.jsxs)(`div`,{className:`price-section`,children:[(0,G.jsxs)(`div`,{className:`price-flow`,children:[(0,G.jsx)(`div`,{className:`price-old`,children:`$2,400`}),(0,G.jsx)(`div`,{className:`price-arrow`,children:`→`}),(0,G.jsxs)(`div`,{className:`price-new`,children:[(0,G.jsx)(`span`,{className:`currency`,children:`$`}),(0,G.jsx)(`span`,{className:`amount`,children:`1,200`}),(0,G.jsx)(`span`,{className:`period`,children:`/ year`})]})]}),(0,G.jsx)(`p`,{className:`price-subtext`,children:`+ Accessories included`})]}),(0,G.jsx)(`hr`,{className:`neat-divider`}),(0,G.jsxs)(`ul`,{className:`premium-features-grid`,children:[(0,G.jsxs)(`li`,{children:[(0,G.jsx)(yp,{size:18,className:`check-icon`}),` 21 Premium Services`]}),(0,G.jsxs)(`li`,{children:[(0,G.jsx)(yp,{size:18,className:`check-icon`}),` Monthly Monitoring`]}),(0,G.jsxs)(`li`,{children:[(0,G.jsx)(yp,{size:18,className:`check-icon`}),` 24/7 Emergency Support`]}),(0,G.jsxs)(`li`,{children:[(0,G.jsx)(yp,{size:18,className:`check-icon`}),` Updates for Family`]}),(0,G.jsxs)(`li`,{children:[(0,G.jsx)(yp,{size:18,className:`check-icon`}),` Dedicated Care Manager`]}),(0,G.jsxs)(`li`,{children:[(0,G.jsx)(yp,{size:18,className:`check-icon`}),` No Hidden Costs`]})]}),(0,G.jsx)(`button`,{className:`btn-subscribe-premium`,onClick:()=>i(!0),children:`Subscribe Now →`})]}),(0,G.jsxs)(Y.div,{className:`side-col side-col-right`,variants:tm,initial:`hidden`,animate:`visible`,custom:1,children:[(0,G.jsx)(`img`,{ref:o,src:`images/old_person_3.jpg`,className:`side-img-main`,alt:`Elderly person smiling`}),(0,G.jsx)(`img`,{src:`images/hand_in_hand.jpg`,className:`side-img-back`,alt:`Elderly person receiving care`}),(0,G.jsxs)(`div`,{ref:c,className:`side-label`,children:[(0,G.jsx)(`div`,{className:`icon`,children:(0,G.jsx)(rp,{size:16})}),(0,G.jsxs)(`div`,{children:[(0,G.jsx)(`strong`,{children:`Safety. Health.`}),(0,G.jsx)(`p`,{children:`Happiness. Always.`})]})]})]})]}),(0,G.jsx)(rm,{children:(0,G.jsx)(`div`,{className:`marquee-caption`,children:`Caring moments that matter`})}),(0,G.jsx)(`div`,{className:`image-marquee`,children:(0,G.jsx)(`div`,{className:`track`,children:[...[,,]].map((e,t)=>[1,2,3,4,5,6,7,8].map(e=>(0,G.jsx)(`img`,{src:`/images/img${e}.jpg`,alt:`Elderly care image ${e}`},`${t}-${e}`)))})}),(0,G.jsxs)(`div`,{className:`services-section`,children:[(0,G.jsxs)(rm,{className:`services-header`,children:[(0,G.jsx)(`span`,{className:`badge`,children:`21 SERVICES INCLUDED`}),(0,G.jsx)(`h2`,{children:`Everything Your Parents Need - In One Plan`}),(0,G.jsx)(`p`,{children:`A complete ecosystem of healthcare, daily support, and lifestyle services designed for comfort, dignity, and peace of mind.`})]}),(0,G.jsx)(`div`,{className:`services-grid`,children:(t?u:u.slice(0,12)).map((e,t)=>(0,G.jsx)(rm,{custom:t%4,variants:nm,children:(0,G.jsxs)(Y.div,{className:`service-card`,whileHover:{y:-6,scale:1.02,transition:{duration:.2}},children:[(0,G.jsx)(`div`,{className:`service-icon`,children:e.icon}),(0,G.jsxs)(`div`,{className:`service-content`,children:[(0,G.jsx)(`div`,{className:`service-title`,children:e.name}),(0,G.jsx)(It,{to:`/services/${e.slug}`,className:`link`,children:`Learn more →`})]})]})},e.slug))}),(0,G.jsx)(rm,{custom:0,children:(0,G.jsx)(`div`,{className:`view-all`,children:(0,G.jsx)(`button`,{onClick:()=>n(!t),className:`view-btn`,children:t?`Show Less ↑`:`View all 21 services →`})})})]}),r&&(0,G.jsx)(`div`,{className:`popup-overlay`,onClick:l,children:(0,G.jsxs)(`div`,{className:`popup-content-premium`,onClick:e=>e.stopPropagation(),children:[(0,G.jsx)(`button`,{className:`popup-close`,onClick:l,children:`×`}),(0,G.jsx)(`h2`,{className:`popup-title`,children:`Complete your subscription`}),(0,G.jsx)(`p`,{className:`popup-desc`,children:`Our team will assist you personally with the next steps to get started.`}),(0,G.jsx)(`a`,{href:Cf(e.pathname),target:`_blank`,rel:`noopener noreferrer`,className:`popup-cta`,children:`Continue on WhatsApp →`}),(0,G.jsx)(`p`,{className:`popup-note`,children:`You'll be guided step by step by our team`})]})})]})}function am(){return qp(`How We Keep Your Information Safe | 60 Plus India`,`We promise to keep your parents' health details and personal information private and safe. Read here to see how we protect your family's data.`,`privacy policy, data safety, medical record privacy`),(0,b.useEffect)(()=>{window.scrollTo(0,0)},[]),(0,G.jsxs)(`div`,{style:Z.page,children:[(0,G.jsx)(Kp,{items:[{label:`Privacy Policy`}]}),(0,G.jsxs)(`div`,{style:Z.container,children:[(0,G.jsxs)(`div`,{style:Z.docHeader,children:[(0,G.jsx)(`h1`,{style:Z.docTitle,children:`Privacy Policy`}),(0,G.jsx)(`p`,{style:Z.docIntro,children:`60Plus India ("60Plus," "we," "us," or "our") values your privacy. This Privacy Policy explains how we collect, use, store, share, and protect your personal information when you visit our website, submit an enquiry, book or use our services, communicate with us, or otherwise interact with us.`}),(0,G.jsx)(`p`,{style:Z.docIntro,children:`By using our website or services, you agree to this Privacy Policy. If you do not agree, please do not use our website or services.`}),(0,G.jsx)(`div`,{style:Z.divider})]}),(0,G.jsxs)(om,{title:`1. Who We Are`,children:[(0,G.jsxs)(`p`,{children:[(0,G.jsx)(`strong`,{children:`Business Name:`}),` NURA AI LABS PRIVATE LIMITED`]}),(0,G.jsxs)(`p`,{children:[(0,G.jsx)(`strong`,{children:`Registered Address:`}),` Nura AI Labs (Incubated at ITEL), Plot No. 22, Rajalakshmi Nagar, 3rd Main Road, Velachery, Chennai – 600 042, Tamil Nadu, India.`]}),(0,G.jsxs)(`p`,{children:[(0,G.jsx)(`strong`,{children:`Email:`}),` `,(0,G.jsx)(`a`,{href:`mailto:reach@nurahub.com`,style:Z.link,children:`reach@nurahub.com`})]}),(0,G.jsxs)(`p`,{children:[(0,G.jsx)(`strong`,{children:`Phone:`}),` `,(0,G.jsx)(`a`,{href:`tel:+919499944939`,style:Z.link,children:`+91 94999 44939`})]}),(0,G.jsx)(`p`,{children:`If you have questions about this Privacy Policy or your personal information, you may contact us using the details above.`})]}),(0,G.jsxs)(om,{title:`2. Scope of This Policy`,children:[(0,G.jsx)(`p`,{children:`This Privacy Policy applies to personal information collected through:`}),(0,G.jsxs)(`ul`,{style:Z.list,children:[(0,G.jsx)(`li`,{children:`our website`}),(0,G.jsx)(`li`,{children:`booking forms and consultation forms`}),(0,G.jsx)(`li`,{children:`payment and checkout flows`}),(0,G.jsx)(`li`,{children:`email, phone, WhatsApp, and support interactions`}),(0,G.jsx)(`li`,{children:`appointment scheduling and service coordination`}),(0,G.jsx)(`li`,{children:`subscriptions, memberships, packages, and recurring plans`}),(0,G.jsx)(`li`,{children:`any other official communication or service channel operated by us`})]}),(0,G.jsx)(`p`,{children:`This Privacy Policy should be read together with our Terms & Conditions.`})]}),(0,G.jsxs)(om,{title:`3. Information We Collect`,children:[(0,G.jsx)(`p`,{children:`We may collect the following categories of information:`}),(0,G.jsx)(`h3`,{style:Z.subsectionTitle,children:`A. Identity and Contact Information`}),(0,G.jsxs)(`ul`,{style:Z.list,children:[(0,G.jsx)(`li`,{children:`full name`}),(0,G.jsx)(`li`,{children:`patient name`}),(0,G.jsx)(`li`,{children:`age or date of birth, where necessary`}),(0,G.jsx)(`li`,{children:`email address`}),(0,G.jsx)(`li`,{children:`phone number`}),(0,G.jsx)(`li`,{children:`WhatsApp number`}),(0,G.jsx)(`li`,{children:`postal address`}),(0,G.jsx)(`li`,{children:`city, state, pin code`}),(0,G.jsx)(`li`,{children:`emergency contact details`}),(0,G.jsx)(`li`,{children:`caregiver or family representative details`})]}),(0,G.jsx)(`h3`,{style:Z.subsectionTitle,children:`B. Service and Booking Information`}),(0,G.jsxs)(`ul`,{style:Z.list,children:[(0,G.jsx)(`li`,{children:`service requested`}),(0,G.jsx)(`li`,{children:`appointment details`}),(0,G.jsx)(`li`,{children:`booking history`}),(0,G.jsx)(`li`,{children:`care preferences`}),(0,G.jsx)(`li`,{children:`location for service delivery`}),(0,G.jsx)(`li`,{children:`communications regarding scheduling, rescheduling, cancellation, and fulfilment`})]}),(0,G.jsx)(`h3`,{style:Z.subsectionTitle,children:`C. Payment and Transaction Information`}),(0,G.jsxs)(`p`,{children:[(0,G.jsx)(`strong`,{children:`Important:`}),` We do not store your full card details, CVV, or complete banking credentials on our systems unless expressly stated and lawfully permitted. Payments are processed through authorized third-party payment partners.`]}),(0,G.jsxs)(`ul`,{style:Z.list,children:[(0,G.jsx)(`li`,{children:`order or booking ID`}),(0,G.jsx)(`li`,{children:`payment amount`}),(0,G.jsx)(`li`,{children:`payment status`}),(0,G.jsx)(`li`,{children:`payment method`}),(0,G.jsx)(`li`,{children:`transaction reference number`}),(0,G.jsx)(`li`,{children:`invoice details`})]}),(0,G.jsx)(`h3`,{style:Z.subsectionTitle,children:`D. Health or Care-Related Information`}),(0,G.jsx)(`p`,{children:`Where relevant to providing or coordinating services, we may collect limited health, wellness, mobility, support, or care-related information that you or your authorized representative provide to us, including:`}),(0,G.jsxs)(`ul`,{style:Z.list,children:[(0,G.jsx)(`li`,{children:`basic care needs`}),(0,G.jsx)(`li`,{children:`symptoms or service requirements shared during booking`}),(0,G.jsx)(`li`,{children:`mobility or accessibility requirements`}),(0,G.jsx)(`li`,{children:`patient condition details reasonably required for coordination of service`})]}),(0,G.jsx)(`p`,{children:`You should provide only the information necessary for us to deliver or coordinate the requested service.`}),(0,G.jsx)(`h3`,{style:Z.subsectionTitle,children:`E. Technical and Usage Information`}),(0,G.jsx)(`p`,{children:`When you use our website, we may automatically collect:`}),(0,G.jsxs)(`ul`,{style:Z.list,children:[(0,G.jsx)(`li`,{children:`IP address`}),(0,G.jsx)(`li`,{children:`browser type`}),(0,G.jsx)(`li`,{children:`device type`}),(0,G.jsx)(`li`,{children:`operating system`}),(0,G.jsx)(`li`,{children:`pages visited`}),(0,G.jsx)(`li`,{children:`time spent on pages`}),(0,G.jsx)(`li`,{children:`referral source`}),(0,G.jsx)(`li`,{children:`approximate location based on IP`}),(0,G.jsx)(`li`,{children:`cookies and session identifiers`})]}),(0,G.jsx)(`h3`,{style:Z.subsectionTitle,children:`F. Communication Records`}),(0,G.jsx)(`p`,{children:`We may keep records of:`}),(0,G.jsxs)(`ul`,{style:Z.list,children:[(0,G.jsx)(`li`,{children:`emails`}),(0,G.jsx)(`li`,{children:`customer support requests`}),(0,G.jsx)(`li`,{children:`call logs`}),(0,G.jsx)(`li`,{children:`WhatsApp or chat messages`}),(0,G.jsx)(`li`,{children:`complaints, feedback, and dispute-resolution communications`})]})]}),(0,G.jsxs)(om,{title:`4. How We Collect Information`,children:[(0,G.jsx)(`p`,{children:`We collect information:`}),(0,G.jsxs)(`ul`,{style:Z.list,children:[(0,G.jsx)(`li`,{children:`directly from you when you fill out a form, make a booking, request a consultation, contact us, or make a payment`}),(0,G.jsx)(`li`,{children:`from the patient or authorized representative`}),(0,G.jsx)(`li`,{children:`from caregivers or family members acting on behalf of a patient`}),(0,G.jsx)(`li`,{children:`from our service partners or providers, where necessary to coordinate a booked service`}),(0,G.jsx)(`li`,{children:`automatically through cookies, analytics tools, and standard website technologies`}),(0,G.jsx)(`li`,{children:`from payment gateway partners regarding payment status and transaction confirmation`})]})]}),(0,G.jsxs)(om,{title:`5. How We Use Your Information`,children:[(0,G.jsx)(`p`,{children:`We may use your personal information for the following purposes:`}),(0,G.jsx)(`h3`,{style:Z.subsectionTitle,children:`A. To Provide and Coordinate Services`}),(0,G.jsxs)(`ul`,{style:Z.list,children:[(0,G.jsx)(`li`,{children:`to receive and process enquiries`}),(0,G.jsx)(`li`,{children:`to create and manage bookings`}),(0,G.jsx)(`li`,{children:`to coordinate consultations, visits, care support, or related services`}),(0,G.jsx)(`li`,{children:`to communicate appointment details and service updates`}),(0,G.jsx)(`li`,{children:`to provide customer support`})]}),(0,G.jsx)(`h3`,{style:Z.subsectionTitle,children:`B. To Process Payments and Transactions`}),(0,G.jsxs)(`ul`,{style:Z.list,children:[(0,G.jsx)(`li`,{children:`to confirm orders and payments`}),(0,G.jsx)(`li`,{children:`to generate invoices and receipts`}),(0,G.jsx)(`li`,{children:`to manage refunds, cancellations, and disputes`}),(0,G.jsx)(`li`,{children:`to detect suspicious or unauthorized transactions`})]}),(0,G.jsx)(`h3`,{style:Z.subsectionTitle,children:`C. To Improve Operations and Service Quality`}),(0,G.jsxs)(`ul`,{style:Z.list,children:[(0,G.jsx)(`li`,{children:`to understand demand, service performance, and operational issues`}),(0,G.jsx)(`li`,{children:`to improve our website, service delivery, workflows, and support`}),(0,G.jsx)(`li`,{children:`to maintain internal records and audit trails`})]}),(0,G.jsx)(`h3`,{style:Z.subsectionTitle,children:`D. To Communicate With You`}),(0,G.jsxs)(`ul`,{style:Z.list,children:[(0,G.jsx)(`li`,{children:`to respond to enquiries`}),(0,G.jsx)(`li`,{children:`to send service confirmations, reminders, updates, and support messages`}),(0,G.jsx)(`li`,{children:`to notify you about changes to our policies or services`}),(0,G.jsx)(`li`,{children:`to send marketing or promotional communications only where permitted or where you have opted in`})]}),(0,G.jsx)(`h3`,{style:Z.subsectionTitle,children:`E. To Protect Rights and Prevent Misuse`}),(0,G.jsxs)(`ul`,{style:Z.list,children:[(0,G.jsx)(`li`,{children:`to prevent fraud, abuse, misuse, spam, and unauthorized activity`}),(0,G.jsx)(`li`,{children:`to investigate complaints or disputes`}),(0,G.jsx)(`li`,{children:`to protect our customers, personnel, partners, systems, and legal rights`})]}),(0,G.jsx)(`h3`,{style:Z.subsectionTitle,children:`F. To Comply With Law`}),(0,G.jsx)(`ul`,{style:Z.list,children:(0,G.jsx)(`li`,{children:`to comply with applicable legal, regulatory, tax, accounting, law-enforcement, or contractual obligations`})})]}),(0,G.jsxs)(om,{title:`6. Basis on Which We Process Information`,children:[(0,G.jsx)(`p`,{children:`Depending on the nature of the interaction, we may process your information because:`}),(0,G.jsxs)(`ul`,{style:Z.list,children:[(0,G.jsx)(`li`,{children:`it is necessary to provide or coordinate the service you requested`}),(0,G.jsx)(`li`,{children:`you provided consent`}),(0,G.jsx)(`li`,{children:`it is necessary to communicate with you regarding your booking or enquiry`}),(0,G.jsx)(`li`,{children:`it is necessary for payment processing, fraud prevention, or record-keeping`}),(0,G.jsx)(`li`,{children:`it is required under applicable law`}),(0,G.jsx)(`li`,{children:`it is necessary for our legitimate operational, safety, support, or compliance purposes, to the extent permitted by law`})]})]}),(0,G.jsxs)(om,{title:`7. Consent`,children:[(0,G.jsx)(`p`,{children:`When you provide personal information for a booking, consultation request, transaction, service coordination, or support request, you consent to our using that information for that purpose.`}),(0,G.jsx)(`p`,{children:`Where we rely on consent for optional communications, marketing, or particular data uses, you may withdraw that consent at any time by contacting us.`}),(0,G.jsx)(`p`,{children:`Withdrawal of consent does not affect processing already carried out lawfully before withdrawal and may affect our ability to provide certain services where the information is necessary for service delivery.`})]}),(0,G.jsx)(om,{title:`8. Information Shared on Behalf of a Patient`,children:(0,G.jsx)(`p`,{children:`If you provide personal or care-related information about a patient, parent, family member, or dependent, you represent that you are authorized to do so and that the information provided is accurate to the best of your knowledge.`})}),(0,G.jsxs)(om,{title:`9. How We Share Information`,children:[(0,G.jsx)(`p`,{children:`We do not sell your personal information. We may share your information only in the following circumstances:`}),(0,G.jsx)(`h3`,{style:Z.subsectionTitle,children:`A. With Service Providers and Operational Partners`}),(0,G.jsx)(`p`,{children:`We may share information with our employees, contractors, partner professionals, logistics or coordination teams, and service providers only to the extent necessary to deliver, support, or coordinate the requested service.`}),(0,G.jsx)(`h3`,{style:Z.subsectionTitle,children:`B. With Payment Partners`}),(0,G.jsx)(`p`,{children:`Payments may be processed through third-party payment gateways, banks, or payment service providers. These third parties may receive transaction-related information necessary to process the payment, confirm the status, handle reversals, and manage fraud checks.`}),(0,G.jsx)(`h3`,{style:Z.subsectionTitle,children:`C. With Technology and Support Vendors`}),(0,G.jsx)(`p`,{children:`We may use third-party vendors for hosting, analytics, messaging, customer support, scheduling, CRM, or communications infrastructure. They receive access only as needed to perform services for us.`}),(0,G.jsx)(`h3`,{style:Z.subsectionTitle,children:`D. With Regulators, Law Enforcement, or Legal Authorities`}),(0,G.jsx)(`p`,{children:`We may disclose information if required by law, court order, lawful government request, or where necessary to protect rights, safety, or legal claims.`}),(0,G.jsx)(`h3`,{style:Z.subsectionTitle,children:`E. Business Transfers`}),(0,G.jsx)(`p`,{children:`If our business is reorganized, merged, acquired, or transferred, information may be transferred as part of that transaction, subject to applicable law.`})]}),(0,G.jsxs)(om,{title:`10. Payment Gateway and Third-Party Websites`,children:[(0,G.jsx)(`p`,{children:`Our website may integrate with or redirect you to third-party services, including payment gateways and other service platforms. Once you leave our website or submit data to a third-party service, that party's own privacy policy and terms apply.`}),(0,G.jsx)(`p`,{children:`We encourage you to review the privacy policies of payment gateways and third-party platforms before completing a transaction.`})]}),(0,G.jsxs)(om,{title:`11. Cookies and Similar Technologies`,children:[(0,G.jsx)(`p`,{children:`We may use cookies, session tools, analytics tools, and similar technologies to:`}),(0,G.jsxs)(`ul`,{style:Z.list,children:[(0,G.jsx)(`li`,{children:`keep the website functioning properly`}),(0,G.jsx)(`li`,{children:`remember user preferences`}),(0,G.jsx)(`li`,{children:`understand traffic and usage`}),(0,G.jsx)(`li`,{children:`improve performance and user experience`}),(0,G.jsx)(`li`,{children:`secure sessions and detect suspicious activity`})]}),(0,G.jsx)(`p`,{children:`You can control cookies through your browser settings. Disabling cookies may affect website functionality.`})]}),(0,G.jsxs)(om,{title:`12. Analytics`,children:[(0,G.jsx)(`p`,{children:`We may use analytics tools such as Google Analytics or similar services to understand website traffic, user behavior, and performance. These tools may collect technical and usage data such as page views, session duration, device type, and referral source.`}),(0,G.jsx)(`p`,{children:`These tools help us improve our website and service experience.`})]}),(0,G.jsxs)(om,{title:`13. Data Retention`,children:[(0,G.jsx)(`p`,{children:`We retain personal information only for as long as reasonably necessary for:`}),(0,G.jsxs)(`ul`,{style:Z.list,children:[(0,G.jsx)(`li`,{children:`providing services`}),(0,G.jsx)(`li`,{children:`customer support and follow-up`}),(0,G.jsx)(`li`,{children:`internal record-keeping`}),(0,G.jsx)(`li`,{children:`refunds, disputes, and complaint handling`}),(0,G.jsx)(`li`,{children:`tax, audit, accounting, and legal compliance`}),(0,G.jsx)(`li`,{children:`fraud prevention and security review`})]}),(0,G.jsx)(`p`,{children:`Retention periods may vary depending on the type of information, the service involved, and legal requirements.`})]}),(0,G.jsxs)(om,{title:`14. Data Security`,children:[(0,G.jsx)(`p`,{children:`We take reasonable technical, administrative, and organizational measures to protect personal information against unauthorized access, misuse, alteration, disclosure, or destruction.`}),(0,G.jsx)(`p`,{children:`These measures may include:`}),(0,G.jsxs)(`ul`,{style:Z.list,children:[(0,G.jsx)(`li`,{children:`SSL or secure transmission protocols`}),(0,G.jsx)(`li`,{children:`restricted access controls`}),(0,G.jsx)(`li`,{children:`password and system security practices`}),(0,G.jsx)(`li`,{children:`vendor access limitations`}),(0,G.jsx)(`li`,{children:`operational review and monitoring`})]}),(0,G.jsx)(`p`,{children:`However, no method of transmission or storage is completely secure. We therefore cannot guarantee absolute security.`})]}),(0,G.jsx)(om,{title:`15. Cross-Border Storage or Processing`,children:(0,G.jsx)(`p`,{children:`Some of our service providers, vendors, analytics providers, messaging tools, or payment partners may store or process information outside your state or country. Where this happens, we will seek to ensure that the information is handled with reasonable safeguards and in accordance with applicable law.`})}),(0,G.jsxs)(om,{title:`16. Your Rights`,children:[(0,G.jsx)(`p`,{children:`Subject to applicable law, you may have the right to:`}),(0,G.jsxs)(`ul`,{style:Z.list,children:[(0,G.jsx)(`li`,{children:`request access to the personal information we hold about you`}),(0,G.jsx)(`li`,{children:`request correction of inaccurate or incomplete information`}),(0,G.jsx)(`li`,{children:`request deletion of information where deletion is legally permitted`}),(0,G.jsx)(`li`,{children:`withdraw consent for certain processing`}),(0,G.jsx)(`li`,{children:`object to or restrict certain uses, where applicable`}),(0,G.jsx)(`li`,{children:`opt out of promotional communications`})]}),(0,G.jsx)(`p`,{children:`To exercise any of these rights, contact us using the details in this Policy. We may need to verify your identity before acting on your request.`})]}),(0,G.jsxs)(om,{title:`17. Marketing Communications`,children:[(0,G.jsx)(`p`,{children:`We may send you service-related messages without separate marketing consent where necessary for bookings, transactions, reminders, support, and customer care.`}),(0,G.jsx)(`p`,{children:`We will send promotional or marketing communications only where permitted by law or where you have opted in. You may opt out of marketing messages at any time using the unsubscribe option or by contacting us.`})]}),(0,G.jsx)(om,{title:`18. Children and Minors`,children:(0,G.jsx)(`p`,{children:`Our services are not intended to be independently contracted online by children. Where information relating to a minor is provided in connection with a service, it must be provided by a parent, guardian, or authorized representative.`})}),(0,G.jsx)(om,{title:`19. Sensitive Information`,children:(0,G.jsx)(`p`,{children:`Please do not send us more medical or sensitive personal information than is reasonably necessary for the requested service. Where sensitive or care-related information is shared with us, you acknowledge that it is being shared for the purpose of enabling, coordinating, supporting, or assessing the requested service.`})}),(0,G.jsxs)(om,{title:`20. Complaints and Grievances`,children:[(0,G.jsx)(`p`,{children:`If you have a complaint regarding privacy, data use, or misuse of your information, please contact us first so we can investigate and respond.`}),(0,G.jsxs)(`div`,{style:Z.contactBox,children:[(0,G.jsx)(`p`,{style:Z.contactLine,children:(0,G.jsx)(`strong`,{children:`Privacy / Grievance Contact:`})}),(0,G.jsx)(`p`,{style:Z.contactLine,children:`60Plus India`}),(0,G.jsxs)(`p`,{style:Z.contactLine,children:[`Nura AI Labs  (Incubated at ITEL),`,(0,G.jsx)(`br`,{}),` Plot No. 22,`,(0,G.jsx)(`br`,{}),`Rajalakshmi Nagar, 3rd Main Road,`,(0,G.jsx)(`br`,{}),`Velachery, Chennai – 600 042,`,(0,G.jsx)(`br`,{}),`Tamil Nadu, India.`]}),(0,G.jsxs)(`p`,{style:Z.contactLine,children:[`Email: `,(0,G.jsx)(`a`,{href:`mailto:reach@nurahub.com`,style:Z.link,children:`reach@nurahub.com`})]}),(0,G.jsxs)(`p`,{style:Z.contactLine,children:[`Phone: `,(0,G.jsx)(`a`,{href:`tel:+919499944939`,style:Z.link,children:`+91 94999 44939`})]})]})]}),(0,G.jsx)(om,{title:`21. Changes to This Privacy Policy`,children:(0,G.jsx)(`p`,{children:`We may update this Privacy Policy from time to time. The latest version will always be posted on this page with the revised effective date. Your continued use of our website or services after any update constitutes acceptance of the revised Policy, to the extent permitted by law.`})}),(0,G.jsxs)(om,{title:`22. Contact Us`,isLast:!0,children:[(0,G.jsx)(`p`,{children:`If you would like to access, correct, update, or request deletion of your information, or if you have any questions about this Privacy Policy, please contact:`}),(0,G.jsxs)(`div`,{style:Z.contactBox,children:[(0,G.jsx)(`p`,{style:Z.contactLine,children:(0,G.jsx)(`strong`,{children:`60Plus India`})}),(0,G.jsxs)(`p`,{style:Z.contactLine,children:[`Nura AI Labs  (Incubated at ITEL),`,(0,G.jsx)(`br`,{}),` Plot No. 22,`,(0,G.jsx)(`br`,{}),`Rajalakshmi Nagar, 3rd Main Road,`,(0,G.jsx)(`br`,{}),`Velachery, Chennai – 600 042,`,(0,G.jsx)(`br`,{}),`Tamil Nadu, India.`]}),(0,G.jsxs)(`p`,{style:Z.contactLine,children:[`Email: `,(0,G.jsx)(`a`,{href:`mailto:reach@nurahub.com`,style:Z.link,children:`reach@nurahub.com`})]}),(0,G.jsxs)(`p`,{style:Z.contactLine,children:[`Phone: `,(0,G.jsx)(`a`,{href:`tel:+919499944939`,style:Z.link,children:`+91 94999 44939`})]})]})]}),(0,G.jsx)(`div`,{style:Z.footer,children:(0,G.jsx)(`div`,{style:Z.footerLinks})})]})]})}function om({title:e,children:t,isLast:n=!1}){return(0,G.jsxs)(`div`,{style:n?{...Z.section,borderBottom:`none`}:Z.section,children:[(0,G.jsx)(`h2`,{style:Z.sectionTitle,children:e}),(0,G.jsx)(`div`,{style:Z.sectionBody,children:t})]})}var Z={page:{backgroundColor:`#ffffff`,minHeight:`100vh`,fontFamily:`'Nunito Sans', 'Helvetica Neue', Arial, sans-serif`,color:`#1a0a2e`},topBar:{borderBottom:`1px solid rgba(130,53,208,0.15)`,padding:`14px 40px`,backgroundColor:`#fafafa`},backLink:{fontSize:`14px`,color:`#8235d0`,textDecoration:`none`,fontFamily:`'Nunito Sans', 'Helvetica Neue', Arial, sans-serif`,letterSpacing:`0.01em`,fontWeight:`700`},container:{maxWidth:`760px`,margin:`0 auto`,padding:`56px 24px 40px`},docHeader:{marginBottom:`48px`},docMeta:{fontSize:`12px`,color:`#888`,fontFamily:`'Nunito Sans', 'Helvetica Neue', Arial, sans-serif`,letterSpacing:`0.04em`,textTransform:`uppercase`,marginBottom:`12px`},docTitle:{fontSize:`46px`,fontWeight:`500`,color:`#1a0a2e`,margin:`0 0 18px 0`,letterSpacing:`-0.5px`,lineHeight:1.2,fontFamily:`'Gambarino-Regular', serif`},docIntro:{fontSize:`19px`,color:`rgba(26,10,46,0.8)`,lineHeight:1.75,fontFamily:`'Nunito Sans', 'Helvetica Neue', Arial, sans-serif`,marginBottom:`12px`},divider:{borderTop:`2px solid #8235d0`,width:`48px`,marginTop:`4px`},section:{marginBottom:`40px`,paddingBottom:`40px`},sectionTitle:{fontSize:`18px`,fontWeight:`700`,color:`#1a0a2e`,fontFamily:`'Nunito Sans', 'Helvetica Neue', Arial, sans-serif`,textTransform:`uppercase`,letterSpacing:`0.08em`,marginBottom:`14px`},subsectionTitle:{fontSize:`19px`,fontWeight:`700`,color:`#1a0a2e`,fontFamily:`'Nunito Sans', 'Helvetica Neue', Arial, sans-serif`,marginTop:`18px`,marginBottom:`8px`},sectionBody:{display:`flex`,flexDirection:`column`,gap:`12px`},list:{paddingLeft:`20px`,margin:`4px 0`,display:`flex`,flexDirection:`column`,gap:`7px`},contactBox:{border:`1px solid rgba(130,53,208,0.15)`,borderRadius:`6px`,padding:`18px 22px`,marginTop:`10px`,backgroundColor:`#fafafa`,display:`flex`,flexDirection:`column`,gap:`5px`},contactLine:{fontSize:`16px`,color:`#333`,margin:`3px 0`,fontFamily:`'Nunito Sans', 'Helvetica Neue', Arial, sans-serif`},link:{color:`#8235d0`,textDecoration:`underline`},footer:{marginTop:`20px`,paddingTop:`0px`,display:`flex`,justifyContent:`center`,alignItems:`center`,flexWrap:`wrap`,gap:`12px`,fontFamily:`'Nunito Sans', 'Helvetica Neue', Arial, sans-serif`,fontSize:`14px`,color:`rgba(26,10,46,0.5)`},footerLinks:{display:`flex`,gap:`24px`},footerLink:{color:`#8235d0`,textDecoration:`none`,fontSize:`14px`,fontWeight:`700`,fontFamily:`'Nunito Sans', 'Helvetica Neue', Arial, sans-serif`}};function sm(){return qp(`Our Simple Service Rules | 60 Plus India`,`This page explains how we provide our services. We keep our rules simple so you know exactly how we look after your family and your health.`,`service rules, 60 plus india terms, care agreement`),(0,b.useEffect)(()=>{window.scrollTo(0,0)},[]),(0,G.jsxs)(`div`,{style:$.page,children:[(0,G.jsx)(Kp,{items:[{label:`Terms & Conditions`}]}),(0,G.jsxs)(`div`,{style:$.container,children:[(0,G.jsxs)(`div`,{style:$.docHeader,children:[(0,G.jsx)(`h1`,{style:$.docTitle,children:`Terms & Conditions`}),(0,G.jsx)(`p`,{style:$.docIntro,children:`These Terms & Conditions ("Terms") govern your access to and use of the website, mobile interfaces, communication channels, and services made available by 60Plus India ("60Plus," "we," "us," or "our").`}),(0,G.jsx)(`p`,{style:$.docIntro,children:`By accessing our website, booking a service, making a payment, registering an account, subscribing to a plan, or otherwise using our services, you agree to be bound by these Terms, our Privacy Policy, and our Cancellation, Rescheduling & Refund Policy. If you do not agree, do not use our website or services.`}),(0,G.jsx)(`div`,{style:$.divider})]}),(0,G.jsxs)(Q,{title:`1. About Us`,children:[(0,G.jsx)(`p`,{children:`60Plus India provides senior care support, care coordination, wellness support services, and, where applicable, facilitation and scheduling of consultations, visits, assessments, or related support services through our internal team and/or independent partner professionals and service providers.`}),(0,G.jsxs)(`div`,{style:$.contactBox,children:[(0,G.jsxs)(`p`,{style:$.contactLine,children:[(0,G.jsx)(`strong`,{children:`Registered Business Name:`}),`NURA AI LABS PRIVATE LIMITED`]}),(0,G.jsxs)(`p`,{style:$.contactLine,children:[(0,G.jsx)(`strong`,{children:`Registered Address:`}),`Nura AI Labs (Incubated at ITEL), Plot No. 22, Rajalakshmi Nagar, 3rd Main Road, Velachery, Chennai – 600 042, Tamil Nadu, India.`]}),(0,G.jsxs)(`p`,{style:$.contactLine,children:[(0,G.jsx)(`strong`,{children:`Email:`}),` `,(0,G.jsx)(`a`,{href:`mailto:reach@nurahub.com`,style:$.link,children:`reach@nurahub.com`})]}),(0,G.jsxs)(`p`,{style:$.contactLine,children:[(0,G.jsx)(`strong`,{children:`Phone:`}),` `,(0,G.jsx)(`a`,{href:`tel:+919499944939`,style:$.link,children:`+91 94999 44939`})]})]})]}),(0,G.jsxs)(Q,{title:`2. Eligibility`,children:[(0,G.jsx)(`p`,{children:`You may use our website and services only if:`}),(0,G.jsxs)(`ul`,{style:$.list,children:[(0,G.jsx)(`li`,{children:`you are at least 18 years old and legally capable of entering into a binding contract; or`}),(0,G.jsx)(`li`,{children:`you are using the services on behalf of a patient, family member, dependent, or another person with valid authority to do so.`})]}),(0,G.jsx)(`p`,{children:`You agree that all information provided by you is true, complete, and up to date.`})]}),(0,G.jsxs)(Q,{title:`3. Scope of Services`,children:[(0,G.jsx)(`p`,{children:`60Plus may offer, directly or through partner providers, services including but not limited to:`}),(0,G.jsxs)(`ul`,{style:$.list,children:[(0,G.jsx)(`li`,{children:`senior care support and coordination`}),(0,G.jsx)(`li`,{children:`home visit coordination`}),(0,G.jsx)(`li`,{children:`consultations, assessments, and wellness support`}),(0,G.jsx)(`li`,{children:`care plans, subscriptions, or service packages`}),(0,G.jsx)(`li`,{children:`appointment scheduling and related support services`})]}),(0,G.jsx)(`p`,{children:`The exact nature, scope, timing, pricing, and availability of services may vary by city, provider availability, patient condition, service category, and operational constraints.`}),(0,G.jsx)(`p`,{children:`Nothing on the website shall be interpreted as a guarantee that every listed service is available at all times or in all locations.`})]}),(0,G.jsx)(Q,{title:`4. No Emergency Service`,children:(0,G.jsxs)(`p`,{children:[`Our platform and services are `,(0,G.jsx)(`strong`,{children:`not emergency services`}),`. If you believe a patient is experiencing a medical emergency, immediately contact local emergency services or go to the nearest hospital.`]})}),(0,G.jsxs)(Q,{title:`5. Independent Professional Judgment`,children:[(0,G.jsx)(`p`,{children:`Where services are rendered by doctors, nurses, therapists, care staff, diagnostic providers, or other professionals, such professionals remain responsible for their own professional judgment, advice, and conduct within the scope of applicable law and professional standards.`}),(0,G.jsx)(`p`,{children:`60Plus may facilitate scheduling, coordination, communication, collection, and support, but does not override or control the independent medical or professional judgment of licensed providers.`})]}),(0,G.jsxs)(Q,{title:`6. User Responsibilities`,children:[(0,G.jsx)(`p`,{children:(0,G.jsx)(`strong`,{children:`You agree to:`})}),(0,G.jsxs)(`ul`,{style:$.list,children:[(0,G.jsx)(`li`,{children:`provide accurate patient, booking, and contact information`}),(0,G.jsx)(`li`,{children:`disclose material facts relevant to service delivery`}),(0,G.jsx)(`li`,{children:`ensure that the patient and/or authorized representative is available at the scheduled time`}),(0,G.jsx)(`li`,{children:`maintain respectful conduct toward our staff, partner providers, and support teams`}),(0,G.jsx)(`li`,{children:`comply with all instructions reasonably required for safe service delivery`}),(0,G.jsx)(`li`,{children:`use the website and services only for lawful purposes`})]}),(0,G.jsx)(`p`,{children:(0,G.jsx)(`strong`,{children:`You must not:`})}),(0,G.jsxs)(`ul`,{style:$.list,children:[(0,G.jsx)(`li`,{children:`misuse the platform`}),(0,G.jsx)(`li`,{children:`submit false or misleading information`}),(0,G.jsx)(`li`,{children:`interfere with platform security or functionality`}),(0,G.jsx)(`li`,{children:`make fraudulent bookings or payments`}),(0,G.jsx)(`li`,{children:`use abusive, threatening, defamatory, or unlawful language or conduct toward our staff or providers`})]})]}),(0,G.jsxs)(Q,{title:`7. Bookings and Service Requests`,children:[(0,G.jsx)(`p`,{children:`A booking or service request is treated as confirmed only after:`}),(0,G.jsxs)(`ul`,{style:$.list,children:[(0,G.jsx)(`li`,{children:`required information has been received,`}),(0,G.jsx)(`li`,{children:`applicable payment or authorization has been completed, and`}),(0,G.jsx)(`li`,{children:`we issue a confirmation by website, app, email, SMS, WhatsApp, phone, or other official communication channel.`})]}),(0,G.jsx)(`p`,{children:`We reserve the right to decline, reschedule, modify, or cancel a booking where necessary due to provider unavailability, incomplete information, operational limitations, safety concerns, suspected fraud, legal restrictions, force majeure events, or other legitimate reasons.`})]}),(0,G.jsxs)(Q,{title:`8. Pricing`,children:[(0,G.jsxs)(`p`,{children:[`All prices displayed on the website or otherwise communicated by us are in `,(0,G.jsx)(`strong`,{children:`Indian Rupees `}),` or `,(0,G.jsx)(`strong`,{children:`USD`}),` unless expressly stated otherwise.`]}),(0,G.jsx)(`p`,{children:`Pricing may vary depending on:`}),(0,G.jsxs)(`ul`,{style:$.list,children:[(0,G.jsx)(`li`,{children:`service type`}),(0,G.jsx)(`li`,{children:`duration`}),(0,G.jsx)(`li`,{children:`location`}),(0,G.jsx)(`li`,{children:`provider category`}),(0,G.jsx)(`li`,{children:`urgency`}),(0,G.jsx)(`li`,{children:`add-on services`}),(0,G.jsx)(`li`,{children:`taxes and statutory levies`}),(0,G.jsx)(`li`,{children:`subscription plan or package terms`})]}),(0,G.jsx)(`p`,{children:`Applicable taxes, government levies, platform fees, or convenience fees, if any, will be disclosed at or before checkout.`})]}),(0,G.jsxs)(Q,{title:`9. Payments`,children:[(0,G.jsx)(`p`,{children:`Payments may be collected through third-party payment gateways, banking partners, UPI, cards, net banking, links, recurring mandates, or other approved payment methods.`}),(0,G.jsx)(`p`,{children:(0,G.jsx)(`strong`,{children:`By making a payment, you:`})}),(0,G.jsxs)(`ul`,{style:$.list,children:[(0,G.jsx)(`li`,{children:`authorize the applicable payment transaction`}),(0,G.jsx)(`li`,{children:`confirm that you are legally entitled to use the chosen payment instrument`}),(0,G.jsx)(`li`,{children:`agree to pay all charges, taxes, and applicable fees disclosed at checkout or otherwise agreed with us`})]}),(0,G.jsx)(`p`,{children:`Payment authorization does not by itself guarantee service completion. Service remains subject to confirmation, provider availability, and these Terms.`})]}),(0,G.jsxs)(Q,{title:`10. Recurring Plans and Auto-Renewals`,children:[(0,G.jsx)(`p`,{children:`If you enroll in a recurring subscription, membership, package, or auto-renewal plan:`}),(0,G.jsxs)(`ul`,{style:$.list,children:[(0,G.jsx)(`li`,{children:`you authorize us or our payment partner to charge the recurring amount as disclosed at sign-up`}),(0,G.jsx)(`li`,{children:`the billing frequency, plan benefits, and renewal terms will be displayed at the time of subscription`}),(0,G.jsx)(`li`,{children:`you may cancel future renewals before the next billing date in accordance with the applicable plan rules`}),(0,G.jsx)(`li`,{children:`cancellation of auto-renewal prevents future billing but does not automatically entitle you to a refund for the current billing cycle unless expressly stated in the applicable refund policy or required by law`})]})]}),(0,G.jsx)(Q,{title:`11. Cancellation, Rescheduling, and Refunds`,children:(0,G.jsx)(`p`,{children:`All cancellations, rescheduling requests, failed service cases, duplicate payments, and refunds are governed by the policy set forth in Section 25 of these Terms.`})}),(0,G.jsxs)(Q,{title:`12. Service Fulfilment and Timelines`,children:[(0,G.jsx)(`p`,{children:`Service timing is subject to operational conditions, provider availability, location, patient readiness, traffic, weather, and unforeseen events. Any time slot or ETA is an estimate unless explicitly guaranteed in writing.`}),(0,G.jsx)(`p`,{children:`We will make commercially reasonable efforts to deliver services within the confirmed slot or revised slot communicated to you.`})]}),(0,G.jsx)(Q,{title:`13. Third-Party Providers and Tools`,children:(0,G.jsx)(`p`,{children:`Our services may involve third-party providers, communication channels, software tools, logistics support, diagnostic partners, payment gateways, or other service partners. We are not responsible for the independent policies, systems, downtime, or acts/omissions of third parties except to the extent required by law.`})}),(0,G.jsx)(Q,{title:`14. Accuracy of Website Information`,children:(0,G.jsx)(`p`,{children:`We try to ensure that all information on the website is accurate and current. However, website content may contain errors, omissions, or outdated information relating to services, pricing, availability, or descriptions. We reserve the right to correct, update, suspend, or withdraw content or services without prior notice.`})}),(0,G.jsxs)(Q,{title:`15. Intellectual Property`,children:[(0,G.jsx)(`p`,{children:`All content on the website, including text, graphics, logos, designs, service marks, software, media, and brand elements, is owned by or licensed to 60Plus and is protected by applicable intellectual property laws.`}),(0,G.jsx)(`p`,{children:`You may not copy, reproduce, distribute, modify, reverse engineer, publish, or commercially exploit any content without our prior written permission.`})]}),(0,G.jsx)(Q,{title:`16. Privacy`,children:(0,G.jsx)(`p`,{children:`Your use of the website and services is also governed by our Privacy Policy. By using our services, you consent to the collection, use, storage, and disclosure of information as described in that policy.`})}),(0,G.jsxs)(Q,{title:`17. Disclaimers`,children:[(0,G.jsx)(`p`,{children:`To the fullest extent permitted by law:`}),(0,G.jsxs)(`ul`,{style:$.list,children:[(0,G.jsx)(`li`,{children:`the website and services are provided on an "as is" and "as available" basis`}),(0,G.jsx)(`li`,{children:`we do not guarantee uninterrupted, error-free, or always-available service`}),(0,G.jsx)(`li`,{children:`we do not guarantee that every service will be suitable for every user or patient`}),(0,G.jsx)(`li`,{children:`informational content on the website is for general informational purposes only and does not replace a direct professional evaluation where required`})]})]}),(0,G.jsxs)(Q,{title:`18. Limitation of Liability`,children:[(0,G.jsx)(`p`,{children:`To the fullest extent permitted by law, 60Plus, its affiliates, directors, officers, employees, contractors, agents, and partners shall not be liable for any indirect, incidental, special, consequential, punitive, or exemplary damages, including loss of profits, loss of data, business interruption, or loss arising out of or related to:`}),(0,G.jsxs)(`ul`,{style:$.list,children:[(0,G.jsx)(`li`,{children:`use or inability to use the website or services`}),(0,G.jsx)(`li`,{children:`delays, rescheduling, or service interruptions`}),(0,G.jsx)(`li`,{children:`actions or omissions of independent third-party providers`}),(0,G.jsx)(`li`,{children:`unauthorized access, system failures, or third-party technical issues`})]}),(0,G.jsx)(`p`,{children:`Nothing in these Terms excludes liability that cannot be excluded under applicable law.`})]}),(0,G.jsxs)(Q,{title:`19. Indemnity`,children:[(0,G.jsx)(`p`,{children:`You agree to indemnify and hold harmless 60Plus, its affiliates, personnel, and partners from claims, liabilities, losses, damages, costs, and expenses arising out of:`}),(0,G.jsxs)(`ul`,{style:$.list,children:[(0,G.jsx)(`li`,{children:`your breach of these Terms`}),(0,G.jsx)(`li`,{children:`false information submitted by you`}),(0,G.jsx)(`li`,{children:`your misuse of the website or services`}),(0,G.jsx)(`li`,{children:`your violation of applicable law or third-party rights`})]})]}),(0,G.jsxs)(Q,{title:`20. Suspension or Termination`,children:[(0,G.jsx)(`p`,{children:`We may suspend, restrict, or terminate access to the website or services, or refuse a booking or user, at our discretion, where we reasonably believe there is:`}),(0,G.jsxs)(`ul`,{style:$.list,children:[(0,G.jsx)(`li`,{children:`fraud or payment risk`}),(0,G.jsx)(`li`,{children:`abuse or misuse`}),(0,G.jsx)(`li`,{children:`legal or compliance risk`}),(0,G.jsx)(`li`,{children:`safety risk`}),(0,G.jsx)(`li`,{children:`repeated cancellation or operational disruption`}),(0,G.jsx)(`li`,{children:`breach of these Terms`})]})]}),(0,G.jsx)(Q,{title:`21. Force Majeure`,children:(0,G.jsx)(`p`,{children:`We shall not be liable for failure or delay caused by events beyond our reasonable control, including natural disasters, strikes, disease outbreaks, provider disruptions, transport failures, internet outages, government action, civil unrest, or other force majeure events.`})}),(0,G.jsx)(Q,{title:`22. Governing Law and Jurisdiction`,children:(0,G.jsx)(`p`,{children:`These Terms shall be governed by the laws of India. Subject to applicable law, courts located in Chennai, Tamil Nadu shall have exclusive jurisdiction over disputes arising out of or relating to these Terms or our services.`})}),(0,G.jsx)(Q,{title:`23. Changes to These Terms`,children:(0,G.jsx)(`p`,{children:`We may update these Terms from time to time. The revised version will be posted on this page with the updated effective date. Continued use of the website or services after such update constitutes acceptance of the revised Terms.`})}),(0,G.jsxs)(Q,{title:`25. Cancellation, Rescheduling & Refund Policy`,children:[(0,G.jsx)(`p`,{children:`We aim to provide fair and transparent cancellation and refund handling. Refund outcomes depend on:`}),(0,G.jsxs)(`ul`,{style:$.list,children:[(0,G.jsx)(`li`,{children:`the nature of the service booked`}),(0,G.jsx)(`li`,{children:`whether the service was scheduled, assigned, or already initiated`}),(0,G.jsx)(`li`,{children:`whether a provider was dispatched or time was reserved`}),(0,G.jsx)(`li`,{children:`whether the request concerns duplicate payment, technical failure, provider unavailability, or customer cancellation`}),(0,G.jsx)(`li`,{children:`applicable law and payment partner rules`})]}),(0,G.jsx)(`h3`,{style:$.subsectionTitle,children:`A. Rescheduling by Customer`}),(0,G.jsx)(`p`,{children:`Customers may request a reschedule by contacting us through our official support channels.`}),(0,G.jsx)(`p`,{children:(0,G.jsx)(`strong`,{children:`Standard rule:`})}),(0,G.jsxs)(`ul`,{style:$.list,children:[(0,G.jsxs)(`li`,{children:[(0,G.jsx)(`strong`,{children:`Reschedule request made at least 6 hours before the scheduled service time:`}),` one reschedule is permitted at no additional charge, subject to provider availability.`]}),(0,G.jsxs)(`li`,{children:[(0,G.jsx)(`strong`,{children:`Reschedule request made less than 6 hours before the scheduled service time:`}),` rescheduling may be permitted subject to operational feasibility and may attract an administrative or provider-blocking charge, if disclosed at the time of confirmation.`]})]}),(0,G.jsx)(`p`,{children:`Where the service is urgent, same-day, or on-demand, rescheduling is always subject to availability.`}),(0,G.jsx)(`h3`,{style:$.subsectionTitle,children:`B. Cancellation by Customer`}),(0,G.jsx)(`h4`,{style:$.subSubsectionTitle,children:`i. Cancellation at least 6 hours before the scheduled service time`}),(0,G.jsx)(`p`,{children:`If you cancel at least 6 hours before the confirmed service time, you are eligible for:`}),(0,G.jsxs)(`ul`,{style:$.list,children:[(0,G.jsx)(`li`,{children:`a full refund, or`}),(0,G.jsx)(`li`,{children:`one no-cost reschedule, if preferred by you and operationally feasible`})]}),(0,G.jsx)(`h4`,{style:$.subSubsectionTitle,children:`ii. Cancellation less than 6 hours before the scheduled service time`}),(0,G.jsx)(`p`,{children:`If you cancel less than 6 hours before the confirmed service time but before service commencement, you are eligible for:`}),(0,G.jsxs)(`ul`,{style:$.list,children:[(0,G.jsx)(`li`,{children:`a 50% refund, and`}),(0,G.jsx)(`li`,{children:`the remaining amount may be retained toward administrative, coordination, and provider allocation costs`})]}),(0,G.jsx)(`h4`,{style:$.subSubsectionTitle,children:`iii. Cancellation after service commencement or provider dispatch`}),(0,G.jsx)(`p`,{children:`If the service has already commenced, or if a provider has already been dispatched to the service location, no refund will ordinarily be available, except where required by law or where we determine that the service could not be delivered due to reasons solely attributable to us.`}),(0,G.jsx)(`h4`,{style:$.subSubsectionTitle,children:`iv. No-show / Patient unavailable / Access denied`}),(0,G.jsx)(`p`,{children:`No refund will ordinarily be available if:`}),(0,G.jsxs)(`ul`,{style:$.list,children:[(0,G.jsx)(`li`,{children:`the patient or authorized contact is unavailable at the scheduled time`}),(0,G.jsx)(`li`,{children:`the address or access details provided are materially incorrect`}),(0,G.jsx)(`li`,{children:`the provider is unable to render the booked service because access was denied or conditions at the location made delivery impossible despite reasonable efforts`})]}),(0,G.jsx)(`h3`,{style:$.subsectionTitle,children:`C. Cancellation by 60Plus`}),(0,G.jsx)(`p`,{children:`If we cancel a confirmed booking due to provider unavailability, operational inability, internal error, location constraints, or other reasons attributable to us, you will be offered:`}),(0,G.jsxs)(`ul`,{style:$.list,children:[(0,G.jsx)(`li`,{children:`a full refund, or`}),(0,G.jsx)(`li`,{children:`a rescheduled slot, at your choice, subject to availability`})]}),(0,G.jsx)(`h3`,{style:$.subsectionTitle,children:`D. Service Not Delivered / Material Service Failure`}),(0,G.jsx)(`p`,{children:`You may be eligible for a full or partial refund if:`}),(0,G.jsxs)(`ul`,{style:$.list,children:[(0,G.jsx)(`li`,{children:`a confirmed service was not delivered at all for reasons attributable to us`}),(0,G.jsx)(`li`,{children:`the wrong service was delivered due to our clear operational error`}),(0,G.jsx)(`li`,{children:`there was duplicate billing`}),(0,G.jsx)(`li`,{children:`a payment was captured but the booking was not confirmed and no service was provided`}),(0,G.jsx)(`li`,{children:`there was a demonstrable technical or processing error resulting in wrongful charge`})]}),(0,G.jsx)(`p`,{children:`Refunds for dissatisfaction that do not involve non-delivery or material service failure are assessed case by case, but are not automatic.`}),(0,G.jsx)(`h3`,{style:$.subsectionTitle,children:`E. Subscription Plans / Packages`}),(0,G.jsx)(`p`,{children:`If you are enrolled in a subscription, care plan, or package:`}),(0,G.jsxs)(`ul`,{style:$.list,children:[(0,G.jsx)(`li`,{children:`you may cancel future renewals at any time before the next billing date`}),(0,G.jsx)(`li`,{children:`cancellation stops future billing but does not automatically entitle you to a refund for the current billing cycle`}),(0,G.jsx)(`li`,{children:`amounts for already-consumed services, completed visits, used credits, or elapsed subscription periods are non-refundable unless otherwise required by law`}),(0,G.jsx)(`li`,{children:`where a package is partially used, any refund may be adjusted for services already consumed, benefits already availed, taxes, gateway charges where legally permissible, and non-recoverable third-party costs`})]}),(0,G.jsx)(`h3`,{style:$.subsectionTitle,children:`F. Non-Refundable Items`}),(0,G.jsx)(`p`,{children:`Unless required by law or expressly approved by us, the following are ordinarily non-refundable once incurred or consumed:`}),(0,G.jsxs)(`ul`,{style:$.list,children:[(0,G.jsx)(`li`,{children:`completed consultations or visits`}),(0,G.jsx)(`li`,{children:`provider dispatch costs after dispatch`}),(0,G.jsx)(`li`,{children:`charges for services already rendered`}),(0,G.jsx)(`li`,{children:`charges relating to no-show or failed customer-side access`}),(0,G.jsx)(`li`,{children:`taxes or statutory levies already remitted, where not recoverable`}),(0,G.jsx)(`li`,{children:`any clearly disclosed non-refundable administrative or convenience fee`})]}),(0,G.jsx)(`h3`,{style:$.subsectionTitle,children:`G. Duplicate / Failed / Pending Payments`}),(0,G.jsxs)(`p`,{children:[(0,G.jsx)(`strong`,{children:`Duplicate payment:`}),` If the same transaction is charged more than once for the same order or booking, the excess amount will be refunded after verification.`]}),(0,G.jsxs)(`p`,{children:[(0,G.jsx)(`strong`,{children:`Failed payment with debit:`}),` If your bank account is debited but the booking is not confirmed, the amount may either be automatically reversed by the bank/payment network, or be refunded after reconciliation and verification.`]}),(0,G.jsx)(`h3`,{style:$.subsectionTitle,children:`H. How to Request a Cancellation or Refund`}),(0,G.jsx)(`p`,{children:`To request cancellation, rescheduling, or refund, contact:`}),(0,G.jsxs)(`div`,{style:$.contactBox,children:[(0,G.jsxs)(`p`,{style:$.contactLine,children:[(0,G.jsx)(`strong`,{children:`Email:`}),` `,(0,G.jsx)(`a`,{href:`mailto:reach@nurahub.com`,style:$.link,children:`reach@nurahub.com`})]}),(0,G.jsxs)(`p`,{style:$.contactLine,children:[(0,G.jsx)(`strong`,{children:`Phone / WhatsApp:`}),` `,(0,G.jsx)(`a`,{href:`tel:+919499944939`,style:$.link,children:`+91 94999 44939`})]})]}),(0,G.jsx)(`p`,{children:`Please include:`}),(0,G.jsxs)(`ul`,{style:$.list,children:[(0,G.jsx)(`li`,{children:`customer name`}),(0,G.jsx)(`li`,{children:`patient name, if different`}),(0,G.jsx)(`li`,{children:`booking ID / order ID / invoice number`}),(0,G.jsx)(`li`,{children:`payment date and amount`}),(0,G.jsx)(`li`,{children:`registered mobile number / email`}),(0,G.jsx)(`li`,{children:`reason for cancellation or refund request`}),(0,G.jsx)(`li`,{children:`supporting screenshots or proof, if relevant`})]}),(0,G.jsx)(`h3`,{style:$.subsectionTitle,children:`I. Refund Processing Timelines`}),(0,G.jsx)(`p`,{children:`Where a refund is approved:`}),(0,G.jsxs)(`ul`,{style:$.list,children:[(0,G.jsx)(`li`,{children:`we aim to initiate the refund within 3 business days of approval and verification`}),(0,G.jsx)(`li`,{children:`once initiated, the refund typically reflects in the original payment source within 5 to 10 working days, depending on the payment mode, issuing bank, and payment network`})]}),(0,G.jsx)(`p`,{children:`Refunds will generally be credited back to the original payment instrument unless otherwise required by law or specifically agreed by us.`}),(0,G.jsx)(`h3`,{style:$.subsectionTitle,children:`J. Abuse Prevention`}),(0,G.jsx)(`p`,{children:`We reserve the right to deny refund or rescheduling requests that are fraudulent, abusive, repetitive, inconsistent with records, or otherwise violate these Terms & Conditions.`}),(0,G.jsx)(`h3`,{style:$.subsectionTitle,children:`K. Chargebacks and Payment Disputes`}),(0,G.jsx)(`p`,{children:`We encourage customers to contact us first for a faster resolution of cancellation, refund, or service issues. Initiating a chargeback without first seeking resolution may delay final settlement while the dispute is reviewed by the payment ecosystem.`})]}),(0,G.jsxs)(Q,{title:`26. Contact Us`,isLast:!0,children:[(0,G.jsx)(`p`,{children:`For questions, complaints, cancellations, support requests, or legal notices, contact:`}),(0,G.jsxs)(`div`,{style:$.contactBox,children:[(0,G.jsx)(`p`,{style:$.contactLine,children:(0,G.jsx)(`strong`,{children:`60Plus India`})}),(0,G.jsxs)(`p`,{style:$.contactLine,children:[`Nura AI Labs  (Incubated at ITEL),`,(0,G.jsx)(`br`,{}),` Plot No. 22,`,(0,G.jsx)(`br`,{}),`Rajalakshmi Nagar, 3rd Main Road,`,(0,G.jsx)(`br`,{}),`Velachery, Chennai – 600 042,`,(0,G.jsx)(`br`,{}),`Tamil Nadu, India.`]}),(0,G.jsxs)(`p`,{style:$.contactLine,children:[`Email: `,(0,G.jsx)(`a`,{href:`mailto:reach@nurahub.com`,style:$.link,children:`reach@nurahub.com`})]}),(0,G.jsxs)(`p`,{style:$.contactLine,children:[`Phone: `,(0,G.jsx)(`a`,{href:`tel:+919499944939`,style:$.link,children:`+91 94999 44939`})]})]})]}),(0,G.jsx)(`div`,{style:$.footer,children:(0,G.jsx)(`div`,{style:$.footerLinks})})]})]})}function Q({title:e,children:t,isLast:n=!1}){return(0,G.jsxs)(`div`,{style:n?{...$.section,borderBottom:`none`}:$.section,children:[(0,G.jsx)(`h2`,{style:$.sectionTitle,children:e}),(0,G.jsx)(`div`,{style:$.sectionBody,children:t})]})}var $={page:{backgroundColor:`#ffffff`,minHeight:`100vh`,fontFamily:`'Nunito Sans', 'Helvetica Neue', Arial, sans-serif`,color:`#1a0a2e`},topBar:{borderBottom:`1px solid rgba(130,53,208,0.1)`,padding:`14px 40px`,backgroundColor:`#fafafa`},backLink:{fontSize:`14px`,color:`#8235d0`,textDecoration:`none`,fontFamily:`'Nunito Sans', 'Helvetica Neue', Arial, sans-serif`,letterSpacing:`0.01em`,fontWeight:`700`},container:{maxWidth:`800px`,margin:`0 auto`,padding:`56px 24px 40px`},docHeader:{marginBottom:`48px`},docMeta:{fontSize:`14px`,color:`#8235d0`,fontFamily:`'Nunito Sans', 'Helvetica Neue', Arial, sans-serif`,letterSpacing:`0.04em`,textTransform:`uppercase`,marginBottom:`12px`,fontWeight:`700`},docTitle:{fontSize:`36px`,fontWeight:`500`,color:`#1a0a2e`,margin:`0 0 18px 0`,letterSpacing:`-0.5px`,lineHeight:1.2,fontFamily:`'Gambarino', 'Gambarino-Regular', serif`},docIntro:{fontSize:`18px`,color:`#1a0a2e`,lineHeight:1.75,fontFamily:`'Nunito Sans', 'Helvetica Neue', Arial, sans-serif`,marginBottom:`12px`},divider:{borderTop:`2px solid #8235d0`,width:`48px`,marginTop:`4px`},section:{marginBottom:`40px`,paddingBottom:`40px`},sectionTitle:{fontSize:`20px`,fontWeight:`700`,color:`#1a0a2e`,fontFamily:`'Nunito Sans', 'Helvetica Neue', Arial, sans-serif`,marginBottom:`14px`,lineHeight:1.4},subsectionTitle:{fontSize:`18px`,fontWeight:`700`,color:`#1a0a2e`,fontFamily:`'Nunito Sans', 'Helvetica Neue', Arial, sans-serif`,marginTop:`18px`,marginBottom:`8px`},subSubsectionTitle:{fontSize:`16px`,fontWeight:`600`,color:`#1a0a2e`,fontFamily:`'Nunito Sans', 'Helvetica Neue', Arial, sans-serif`,marginTop:`12px`,marginBottom:`6px`},sectionBody:{display:`flex`,flexDirection:`column`,gap:`12px`},list:{paddingLeft:`20px`,margin:`4px 0`,display:`flex`,flexDirection:`column`,gap:`7px`},contactBox:{border:`1px solid rgba(130,53,208,0.2)`,borderRadius:`8px`,padding:`18px 22px`,marginTop:`10px`,backgroundColor:`rgba(130,53,208,0.05)`,display:`flex`,flexDirection:`column`,gap:`5px`},contactLine:{fontSize:`16px`,color:`#1a0a2e`,margin:`3px 0`,fontFamily:`'Nunito Sans', 'Helvetica Neue', Arial, sans-serif`},link:{color:`#8235d0`,textDecoration:`underline`,fontWeight:`600`},footer:{marginTop:`20px`,paddingTop:`0px`,display:`flex`,justifyContent:`center`,alignItems:`center`,flexWrap:`wrap`,gap:`12px`,fontFamily:`'Nunito Sans', 'Helvetica Neue', Arial, sans-serif`,fontSize:`16px`,color:`#1a0a2e`},footerLinks:{display:`flex`,gap:`24px`},footerLink:{color:`#8235d0`,textDecoration:`none`,fontSize:`14px`,fontWeight:`700`,fontFamily:`'Nunito Sans', 'Helvetica Neue', Arial, sans-serif`}},cm=[{badge:`Our Inspiration`,title:`Why We Care`,content:`As seniors navigate through life, they encounter the inevitable changes that come with aging. For those who deeply care about their elderly loved ones, witnessing them cope with the physical and mental challenges of aging highlights the need for holistic support. This support encompasses emotional, financial, mental, and physical well-being.`},{badge:`Our Mission`,title:`What Drives Us`,content:`At 60Plus India, our mission is both simple and profound: to bring happiness, safety, comfort, and security into the lives of senior citizens. We firmly believe that every individual deserves a life filled with dignity and peace as they gracefully age.`},{badge:`Our Vision`,title:`The Future We See`,content:`Our vision is to create a society where senior citizens thrive, enjoying peace, social engagement, compassionate care, financial stability, and self-sufficiency. We aspire to build a community where every senior citizen feels genuinely valued and empowered.`}],lm={hidden:{opacity:0,y:48},visible:(e=0)=>({opacity:1,y:0,transition:{duration:.7,delay:e*.08,ease:[.22,1,.36,1]}})};function um({children:e,custom:t=0,className:n=``,variants:r=lm}){let i=(0,b.useRef)(null),a=bf(i,{once:!0,margin:`-80px 0px`});return(0,G.jsx)(Y.div,{ref:i,className:n,custom:t,variants:r,initial:`hidden`,animate:a?`visible`:`hidden`,children:e})}function dm(){Qe();let e=Xe();qp(`About 60 Plus India | We Care Like Family`,`We are a team that helps older people live better lives. We provide health care and emotional support to seniors, acting as a bridge between them and their children.`,`about 60 plus india, senior support team, caring for parents`),(0,b.useEffect)(()=>{window.scrollTo(0,0)},[]);let[t,n]=(0,b.useState)(!1),[r,i]=(0,b.useState)({name:``,mobile:``}),[a,o]=(0,b.useState)(!1),s=e=>{let{name:t,value:n}=e.target;i(e=>({...e,[t]:n}))},c=e=>{if(e.preventDefault(),!r.name.trim()||!r.mobile.trim()){alert(`Please fill in both name and mobile number`);return}if(!/^[0-9]{10,15}$/.test(r.mobile)){alert(`Please enter a valid mobile number`);return}o(!0)},l=()=>{n(!1),o(!1),i({name:``,mobile:``})};return(0,G.jsxs)(`section`,{className:`about-page`,children:[(0,G.jsx)(Tf,{alwaysWhite:!0}),(0,G.jsx)(`style`,{children:`
        .about-page {
          padding: 0;
          background: linear-gradient(180deg, #ffffff 0%, #f6f2ff 100%);
          font-family: 'Nunito Sans', sans-serif;
          padding-top: 76px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }


        /* ── HERO SECTION ── */
        .about-hero {
          background: linear-gradient(180deg, #ffffff 0%, #faf5ff 100%);
          padding: 70px 20px 100px;
          text-align: center;
          position: relative;
          overflow: visible;
        }

        .about-hero::after {
          content: "";
          position: absolute;
          bottom: -60px;
          left: 0;
          width: 100%;
          height: 100px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 100' preserveAspectRatio='none'%3E%3Cpath d='M0,0 Q720,100 1440,0 L1440,0 L0,0 Z' fill='%23faf5ff'/%3E%3C/svg%3E");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          z-index: 0;
          pointer-events: none;
        }

        .about-hero-inner {
          max-width: 900px;
          margin: auto;
          position: relative;
          z-index: 1;
        }

        .about-hero h1 {
          font-family: "Gambarino", serif;
          font-size: clamp(34px, 5vw, 56px);
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: -0.5px;
          margin-bottom: 20px;
          color: #1a0a2e;
        }

        .about-hero p {
          font-size: 18px;
          line-height: 1.7;
          color: rgba(26,10,46,0.7);
          max-width: 700px;
          margin: 0 auto;
        }

        /* ── SINGLE CONSISTENT CONTAINER ── */
        .about-container {
          width: 100%;
          max-width: 1000px;
          margin-left: auto;
          margin-right: auto;
          padding: 0 24px;
          box-sizing: border-box;
        }

        /* ── REPRESENTATION IMAGE ── */
        .about-representation {
          margin: -30px 0 80px;
          position: relative;
          z-index: 2;
        }

        .about-representation img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
        }

        /* ── CONTENT SECTIONS ── */
        .about-sections {
          margin: 0 auto 100px;
        }

        .about-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 48px 44px;
          margin-bottom: 32px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.05);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }

        .about-card:hover {
          box-shadow: 0 12px 40px rgba(130,53,208,0.08);
          transform: translateY(-2px);
        }

        .about-card-badge {
          display: inline-block;
          background: #8235d0;
          color: white;
          padding: 6px 16px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .about-card h2 {
          font-family: "Gambarino", serif;
          font-size: clamp(26px, 3.5vw, 38px);
          font-weight: 500;
          color: #1a0a2e;
          margin-bottom: 16px;
          line-height: 1.25;
        }

        .about-card p {
          font-size: 17px;
          line-height: 1.75;
          color: rgba(26,10,46,0.7);
          max-width: 800px;
        }

        /* ── FOUNDER SECTION ── */
        .about-founder {
          margin: 0 auto 100px;
        }

        .founder-card {
          background: linear-gradient(135deg, #1a0a2e 0%, #2d1654 100%);
          border-radius: 28px;
          padding: 40px 44px;  /* reduce from 56px */
          color: white;
          position: relative;
          overflow: hidden;
        }

        .new-layout {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 36px;
        }

        .founder-desc {
          font-size: 15px;
          line-height: 1.85;
          color: rgba(255,255,255,0.75);
          max-width: 100%;
          letter-spacing: 0.2px;
          text-align: justify;
        }

        .founder-card::before {
          content: "";
          position: absolute;
          top: -80px;
          right: -80px;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: rgba(130,53,208,0.2);
          filter: blur(60px);
          pointer-events: none;
        }

        .founder-img-wrapper {
          flex-shrink: 0;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid rgba(130,53,208,0.6);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          align-self: center;
        }

        .founder-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .founder-text {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
        }

        .founder-label {
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin-bottom: 16px;
          margin-top: 0;
        }

        .founder-name {
          font-family: "Gambarino", serif;
          font-size: clamp(26px, 3vw, 34px);
          font-weight: 500;
          margin: 0;
          line-height: 1.15;
        }

        .founder-role {
          font-size: 14px;
          color: rgba(255,255,255,0.55);
          margin: 0 0 16px;
          font-weight: 600;
        }


        .founder-name-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 4px;
        }

        .founder-linkedin-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
          padding: 10px 16px;
          border-radius: 999px;
          background: rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.9);
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.3px;
          border: 1px solid rgba(255,255,255,0.15);
          cursor: pointer;
          transition: all 0.25s ease;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .founder-linkedin-btn:hover {
          background: rgba(255,255,255,0.2);
          box-shadow: 0 4px 16px rgba(0,0,0,0.25);
          transform: scale(1.02);
        }

        .founder-linkedin-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          transition: all 0.25s ease;
        }

        .founder-linkedin-icon svg {
          width: 14px;
          height: 14px;
          fill: #0A66C2;
        }

        .founder-linkedin-icon:hover {
          background: rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }
        }

        /* ── CTA SECTION ── */
        .about-cta {
          margin: 0 auto;
          padding-bottom: 40px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .about-cta h2 {
          font-family: "Gambarino", serif;
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 500;
          color: #1a0a2e;
          margin-bottom: 16px;
          line-height: 1.25;
          text-align: center;
        }

        #join-our-journey {
          text-align: center;
        }

      #subscribe-now-btn {
    display: block !important;
    margin: 0 auto 30px !important;
    text-align: center;
}

        .about-cta p {
          font-size: 17px;
          line-height: 1.7;
          color: rgba(26,10,46,0.65);
          max-width: 600px;
          margin: 0 auto 32px;
        }

        .about-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 18px 44px;
          border-radius: 999px;
          background: linear-gradient(94deg, #8235d0, #5f308e);
          color: white;
          font-weight: 800;
          font-size: 16px;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          text-align: center;
          width: fit-content;
          margin: ;
        }

        .about-cta-btn:hover {
          transform: translateY(2px);
        }

        /* SUBSCRIPTION POPUP */
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .popup-content {
          background: white;
          border-radius: 16px;
          padding: 32px;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }

        .popup-close {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f8f5ff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8235d0;
          font-weight: bold;
          font-size: 16px;
          transition: all 0.2s ease;
        }

        .popup-close:hover {
          background: #8235d0;
          color: white;
        }

        .subscribe-form h3 {
          font-family: "Gambarino", serif;
          font-size: 24px;
          color: #1a0a2e;
          margin: 0 0 4px;
          text-align: center;
          font-weight: 500;
        }

        .subscribe-form .subtitle {
          text-align: center;
          color: rgba(26, 10, 46, 0.6);
          font-size: 14px;
          margin-bottom: 24px;
          font-weight: 500;
        }

        .form-group {
          margin-bottom: 20px;
          position: relative;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #1a0a2e;
          margin-bottom: 8px;
        }

        .form-group input {
          width: 100%;
          padding: 14px 14px 14px 44px;
          border: 2px solid rgba(26,10,46,0.1);
          border-radius: 12px;
          font-size: 15px;
          font-family: 'Nunito Sans', sans-serif;
          color: #1a0a2e;
          box-sizing: border-box;
          transition: all 0.2s ease;
          background: #fafafa;
        }

        .form-group input:focus {
          outline: none;
          border-color: #8235d0;
          background: white;
        }

        .form-group input::placeholder {
          color: rgba(26,10,46,0.4);
        }

        .form-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #8235d0;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 4px;
        }

        .submit-btn, .cancel-btn {
          flex: 1;
          padding: 14px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          border: none;
          font-family: 'Nunito Sans', sans-serif;
          transition: all 0.2s ease;
        }

        .submit-btn {
          background: linear-gradient(94deg, #8235d0, #5f308e);
          color: white;
        }

        .submit-btn:hover {
          background: linear-gradient(94deg, #7a2bc4, #562aa0);
        }

        .cancel-btn {
          background: #f8f5ff;
          color: #8235d0;
          border: 2px solid rgba(130, 53, 208, 0.2);
        }

        .cancel-btn:hover {
          background: #f0e6ff;
        }

        .success-content {
          text-align: center;
          padding-top: 6px;
        }

        .success-content .success-icon {
          width: 50px;
          height: 50px;
          background: #e8f5e9;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: #4caf50;
        }

        .success-content h3 {
          font-family: "Gambarino", serif;
          font-size: 24px;
          color: #1a0a2e;
          margin: 0 0 10px;
          font-weight: 500;
        }

        .success-content p {
          font-size: 15px;
          color: #1a0a2e;
          margin: 0 0 24px;
          line-height: 1.5;
          font-weight: 500;
        }

        .whatsapp-support {
          margin: 24px 0;
        }

        .whatsapp-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 28px;
          background: #25D366;
          color: white;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 15px;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
        }

        .whatsapp-btn:hover {
          background: #128C7E;
        }

        .payment-note {
          background: #f8f9fa;
          padding: 12px;
          border-radius: 8px;
          font-size: 13px;
          color: #666;
          margin: 24px 0;
          font-style: italic;
          border: 1px solid #e0e0e0;
        }

        .close-btn {
          padding: 12px 28px;
          background: #8235d0;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          cursor: pointer;
          margin-top: 12px;
          font-weight: 700;
          transition: all 0.2s ease;
        }

        .close-btn:hover {
          background: #7a2bc4;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .about-hero {
            padding: 60px 16px 60px;
          }
          .about-hero h1 {
            font-size: 30px;
            line-height: 1.3;
          }
          .about-hero p {
            font-size: 15px;
          }
          .about-representation img {
            height: 240px;
            border-radius: 18px;
          }
          .about-card {
            padding: 32px 24px;
            border-radius: 18px;
          }
          .about-card h2 {
            font-size: 24px;
          }
          .about-card p {
            font-size: 15px;
          }
          .founder-card {
            flex-direction: column;
            text-align: center;
            padding: 40px 28px;
            gap: 28px;
            border-radius: 20px;
          }
          .founder-img-section {
            align-items: center;
          }
          .founder-img-wrapper {
            width: 140px;
            height: 140px;
          }
          .founder-linkedin-btn {
            font-size: 12px;
            padding: 8px 14px;
          }
          .founder-desc {
            max-width: 100%;
          }
          .about-breadcrumb {
            padding: 0 16px;
          }

          .popup-content {
            margin: 20px;
            padding: 28px 20px;
          }

          .form-actions {
            flex-direction: column;
          }

          .whatsapp-btn {
            width: 100%;
          }
        }
      `}),(0,G.jsx)(Kp,{items:[{label:`About Us`}]}),(0,G.jsx)(`section`,{className:`about-hero`,children:(0,G.jsxs)(`div`,{className:`about-hero-inner`,children:[(0,G.jsxs)(Y.h1,{variants:lm,initial:`hidden`,animate:`visible`,custom:0,children:[`About `,(0,G.jsx)(`span`,{style:{color:`#8235d0`,fontWeight:700},children:`60Plus`}),` India `,(0,G.jsx)(`span`,{style:{fontSize:`clamp(16px, 2.5vw, 22px)`,fontWeight:400,opacity:.6},children:`powered by Nura AI Labs`})]}),(0,G.jsx)(Y.p,{variants:lm,initial:`hidden`,animate:`visible`,custom:1,children:`Dedicated to bringing happiness, safety, and dignity into the lives of senior citizens - because they deserve the best.`})]})}),(0,G.jsx)(`div`,{className:`about-container`,children:(0,G.jsx)(um,{className:`about-representation`,children:(0,G.jsx)(`img`,{src:`/images/old_person8.jpg`,alt:`Seniors enjoying a happy and fulfilling life`})})}),(0,G.jsx)(`div`,{className:`about-container`,children:(0,G.jsx)(`div`,{className:`about-sections`,children:cm.map((e,t)=>(0,G.jsx)(um,{custom:t,children:(0,G.jsxs)(`div`,{className:`about-card`,children:[(0,G.jsx)(`span`,{className:`about-card-badge`,children:e.badge}),(0,G.jsx)(`h2`,{children:e.title}),(0,G.jsx)(`p`,{children:e.content})]})},e.badge))})}),(0,G.jsx)(`div`,{className:`about-container`,children:(0,G.jsx)(um,{className:`about-founder`,children:(0,G.jsxs)(`div`,{className:`founder-card new-layout`,children:[(0,G.jsx)(`div`,{className:`founder-img-section`,children:(0,G.jsx)(`div`,{className:`founder-img-wrapper`,children:(0,G.jsx)(`img`,{src:`/images/arasi.png`,alt:`Founder of 60Plus India`})})}),(0,G.jsxs)(`div`,{className:`founder-text`,children:[(0,G.jsx)(`span`,{className:`founder-label`,children:`The Story Behind 60Plus`}),(0,G.jsxs)(`div`,{className:`founder-name-row`,children:[(0,G.jsx)(`h2`,{className:`founder-name`,children:`Arasi Arul`}),(0,G.jsx)(`a`,{href:`https://www.linkedin.com/in/arasiarul`,target:`_blank`,rel:`noopener noreferrer`,className:`founder-linkedin-icon`,children:(0,G.jsx)(`svg`,{viewBox:`0 0 24 24`,children:(0,G.jsx)(`path`,{d:`M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.07c.67-1.27 2.3-2.6 4.73-2.6C22.42 7.6 24 10.08 24 14.1V24h-5v-8.5c0-2.03-.04-4.64-2.83-4.64-2.83 0-3.26 2.2-3.26 4.48V24h-5V8z`})})})]}),(0,G.jsx)(`p`,{className:`founder-role`,children:`60Plus India`}),(0,G.jsx)(`p`,{className:`founder-desc`,children:`Arasi Arul is dedicated to improving the lives of senior citizens through 60Plus India. Inspired by caregiving challenges during the pandemic, she built a platform focused on healthcare, safety, and daily support for seniors. With an engineering background and an MBA from LIBA, she combines empathy with execution to create meaningful impact.`})]})]})})}),t&&(0,G.jsx)(`div`,{className:`popup-overlay`,onClick:l,children:(0,G.jsxs)(`div`,{className:`popup-content`,onClick:e=>e.stopPropagation(),children:[(0,G.jsx)(`button`,{className:`popup-close`,onClick:l,children:`×`}),a?(0,G.jsxs)(`div`,{className:`success-content`,children:[(0,G.jsx)(`div`,{className:`success-icon`,children:(0,G.jsxs)(`svg`,{width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:[(0,G.jsx)(`path`,{d:`M22 11.08V12a10 10 0 1 1-5.93-9.14`}),(0,G.jsx)(`polyline`,{points:`22,4 12,14.01 9,11.01`})]})}),(0,G.jsx)(`h3`,{children:`Thank You!`}),(0,G.jsx)(`p`,{children:`Our team will contact you within 24 hours.`}),(0,G.jsx)(`div`,{className:`whatsapp-support`,children:(0,G.jsxs)(`a`,{href:Cf(e.pathname),target:`_blank`,rel:`noopener noreferrer`,className:`whatsapp-btn`,children:[(0,G.jsx)(`svg`,{width:`20`,height:`20`,viewBox:`0 0 24 24`,fill:`currentColor`,children:(0,G.jsx)(`path`,{d:`M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.386`})}),`Contact us for 24/7 Support`]})}),(0,G.jsx)(`div`,{className:`payment-note`,children:`We're working on the payment process`})]}):(0,G.jsxs)(`div`,{className:`subscribe-form`,children:[(0,G.jsx)(`h3`,{children:`Subscribe to Our Service`}),(0,G.jsx)(`p`,{className:`subtitle`,children:`Fill in your details and our team will contact you shortly`}),(0,G.jsxs)(`form`,{onSubmit:c,children:[(0,G.jsxs)(`div`,{className:`form-group`,children:[(0,G.jsx)(`label`,{htmlFor:`name`,children:`Full Name`}),(0,G.jsxs)(`div`,{style:{position:`relative`},children:[(0,G.jsxs)(`svg`,{className:`form-icon`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:[(0,G.jsx)(`path`,{d:`M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2`}),(0,G.jsx)(`circle`,{cx:`12`,cy:`7`,r:`4`})]}),(0,G.jsx)(`input`,{type:`text`,id:`name`,name:`name`,value:r.name,onChange:s,placeholder:`Enter your full name`,required:!0})]})]}),(0,G.jsxs)(`div`,{className:`form-group`,children:[(0,G.jsx)(`label`,{htmlFor:`mobile`,children:`Mobile Number`}),(0,G.jsxs)(`div`,{style:{position:`relative`},children:[(0,G.jsxs)(`svg`,{className:`form-icon`,width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:[(0,G.jsx)(`rect`,{x:`5`,y:`2`,width:`14`,height:`20`,rx:`2`,ry:`2`}),(0,G.jsx)(`path`,{d:`M12 18h.01`})]}),(0,G.jsx)(`input`,{type:`tel`,id:`mobile`,name:`mobile`,value:r.mobile,onChange:s,placeholder:`Enter your mobile number`,required:!0})]})]}),(0,G.jsxs)(`div`,{className:`form-actions`,children:[(0,G.jsx)(`button`,{type:`submit`,className:`submit-btn`,children:`Submit`}),(0,G.jsx)(`button`,{type:`button`,className:`cancel-btn`,onClick:l,children:`Cancel`})]})]})]})]})})]})}var fm={hidden:{opacity:0,y:48},visible:(e=0)=>({opacity:1,y:0,transition:{duration:.7,delay:e*.08,ease:[.22,1,.36,1]}})};function pm({children:e,custom:t=0,className:n=``}){let r=(0,b.useRef)(null),i=bf(r,{once:!0,margin:`-80px 0px`});return(0,G.jsx)(Y.div,{ref:r,className:n,custom:t,variants:fm,initial:`hidden`,animate:i?`visible`:`hidden`,children:e})}function mm(){qp(`Contact Us | Get Help for Your Parents | 60 Plus India`,`Have a question? Call or message us. We are here to help you find the best care and health services for your parents living in India.`,`contact 60 plus india, help for parents, elder care support`),(0,b.useEffect)(()=>{window.scrollTo(0,0)},[]);let[e,t]=(0,b.useState)({name:``,email:``,phone:``,message:``}),[n,r]=(0,b.useState)(!1),[i,a]=(0,b.useState)(!1),[o,s]=(0,b.useState)({}),[c,l]=(0,b.useState)(``),u=()=>{let t={};return e.name.trim()||(t.name=`Name is required`),e.email.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email)||(t.email=`Enter a valid email`):t.email=`Email is required`,e.phone.trim()?/^[+]?[\d\s-]{10,}$/.test(e.phone)||(t.phone=`Enter a valid phone number`):t.phone=`Phone number is required`,t},d=n=>{t({...e,[n.target.name]:n.target.value}),o[n.target.name]&&s({...o,[n.target.name]:``})},f=async t=>{t.preventDefault();let n=u();if(Object.keys(n).length>0){s(n);return}a(!0),l(``);try{let t=e.message.trim(),n={name:e.name,email:e.email,phoneNumber:e.phone,...t?{message:t}:{}},i=await fetch(`https://mobile-api.nurahub.com/v1/marketing/60plusIndia/contactus`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(n)});if(!i.ok){l(`Server error. Please try again later.`);return}let a=await i.json();a.status===`success`&&a.data?r(!0):l(a.message||`Something went wrong. Please try again.`)}catch{l(`Network error. Please check your connection and try again.`)}finally{a(!1)}},p=()=>{r(!1),l(``),t({name:``,email:``,phone:``,message:``})};return(0,G.jsxs)(`section`,{className:`contact-page`,children:[(0,G.jsx)(Tf,{alwaysWhite:!0}),(0,G.jsx)(`style`,{children:`
        .contact-page {
          padding: 0;
          background: linear-gradient(180deg, #ffffff 0%, #f6f2ff 100%);
          font-family: 'Nunito Sans', sans-serif;
          padding-top: 76px;
          min-height: 100vh;
        }


        .contact-hero {
          background: linear-gradient(180deg, #ffffff 0%, #faf5ff 100%);
          padding: 70px 20px 40px;
          text-align: center;
          position: relative;
          overflow: visible;
        }

        .contact-hero::after {
          content: "";
          position: absolute;
          bottom: -40px;
          left: 0;
          width: 100%;
          height: 80px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 100' preserveAspectRatio='none'%3E%3Cpath d='M0,0 Q720,100 1440,0 L1440,0 L0,0 Z' fill='%23faf5ff'/%3E%3C/svg%3E");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          z-index: 0;
          pointer-events: none;
        }

        .contact-hero-inner {
          max-width: 700px;
          margin: auto;
          position: relative;
          z-index: 1;
        }

        .contact-hero h1 {
          font-family: "Gambarino", serif;
          font-size: clamp(34px, 5vw, 52px);
          font-weight: 500;
          line-height: 1.2;
          margin-bottom: 16px;
          color: #1a0a2e;
        }

        .contact-hero p {
          font-size: 18px;
          line-height: 1.7;
          color: rgba(26,10,46,0.7);
        }

        .contact-content {
          max-width: 1100px;
          margin: 0 auto;
          padding: 60px 24px 60px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          position: relative;
          z-index: 1;
          align-items: stretch;
        }

        .contact-form-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.05);
          height: 100%; /* fill the grid cell height */
          display: flex;
          flex-direction: column;
          justify-content: center; /* center content vertically */
        }

       

        .contact-form-content {
          display: flex;
          flex-direction: column;
        }

        .contact-content > div:first-child {
          display: flex;
          flex-direction: column;
        }

        .contact-form-card {
          display: flex;
          flex-direction: column;
        }

        .contact-form-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .contact-form-card {
          display: flex;
          flex-direction: column;
        }

        .contact-form-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .contact-form-card h2 {
          font-family: "Gambarino", serif;
          font-size: 26px;
          font-weight: 500;
          color: #1a0a2e;
          margin-bottom: 8px;
        }

        .contact-form-card > p {
          font-size: 15px;
          color: rgba(26,10,46,0.65);
          margin-bottom: 32px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: #1a0a2e;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 14px 18px;
          border: 2px solid rgba(26,10,46,0.1);
          border-radius: 14px;
          font-size: 15px;
          font-family: 'Nunito Sans', sans-serif;
          color: #1a0a2e;
          background: #fafafa;
          transition: all 0.25s ease;
          box-sizing: border-box;
          outline: none;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #8235d0;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(130,53,208,0.1);
        }

        .form-group input.has-error,
        .form-group textarea.has-error {
          border-color: #e53e3e;
          background: #fff5f5;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-error-msg {
          font-size: 12px;
          color: #e53e3e;
          margin-top: 6px;
          font-weight: 600;
        }

        .form-submit-btn {
          width: 100%;
          padding: 16px;
          border-radius: 14px;
          background: linear-gradient(94deg, #8235d0, #5f308e);
          color: white;
          font-weight: 800;
          font-size: 16px;
          font-family: 'Nunito Sans', sans-serif;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 8px;
        }

        .form-submit-btn:hover {
          transform: translateY(-2px);
        }

        .form-success {
          text-align: center;
          padding: 40px 20px;
        }

        .form-success-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8235d0, #5f308e);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }

        .form-success-icon svg {
          width: 36px;
          height: 36px;
          fill: white;
        }

        .form-success h3 {
          font-family: "Gambarino", serif;
          font-size: 26px;
          color: #1a0a2e;
          margin-bottom: 12px;
        }

        .form-success p {
          font-size: 16px;
          color: rgba(26,10,46,0.65);
          line-height: 1.6;
        }

        .contact-info-card {
          display: flex;
          flex-direction: column;
          gap: 20px;
          height: 100%;          /* fill the full grid cell height */
        }

        .info-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 28px 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          transition: all 0.3s ease;
          flex: 1;               /* each card takes equal share of height */
          justify-content: center; /* center content vertically within each card */
        }

        .contact-info-card > div {   /* targets the ScrollReveal motion.div children */
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .info-card-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .info-card-wrapper .info-card {
          flex: 1;
          justify-content: center;
        }

        .info-card:hover {
          box-shadow: 0 8px 28px rgba(130,53,208,0.1);
          transform: translateY(-4px);
        }

        .info-card-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8235d0, #5f308e);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .info-card-icon svg {
          width: 22px;
          height: 22px;
          fill: #fff;
        }

        .info-card h3 {
          font-family: "Gambarino", serif;
          font-size: 16px;
          font-weight: 500;
          color: #1a0a2e;
          margin: 0;
        }

        .info-card a {
          font-size: 14px;
          font-weight: 600;
          color: #8235d0;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .info-card a:hover {
          opacity: 0.7;
        }

        .info-card p {
          font-size: 13px;
          line-height: 1.6;
          color: rgba(26,10,46,0.65);
          margin: 0;
        }

        .info-card .itel-inline {
          color: #8235d0;
          font-weight: 600;
          font-size: 12px;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          padding: 48px;
          max-width: 480px;
          width: 90%;
          text-align: center;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
          position: relative;
          animation: modalPop 0.3s ease-out;
          border: 1px solid rgba(0,0,0,0.08);
        }

        @keyframes modalPop {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .modal-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 28px;
          border: 2px solid #1a0a2e;
        }

        .modal-icon svg {
          width: 32px;
          height: 32px;
          fill: #1a0a2e;
        }

        .modal-title {
          font-family: "Gambarino", serif;
          font-size: 28px;
          color: #1a0a2e;
          margin-bottom: 16px;
          font-weight: 500;
        }

        .modal-message {
          font-size: 16px;
          color: rgba(26,10,46,0.75);
          line-height: 1.7;
          margin-bottom: 32px;
          font-weight: 400;
        }

        .modal-button {
          background: linear-gradient(94deg, #8235d0, #5f308e);
          color: white;
          border: none;
          padding: 16px 40px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(130, 53, 208, 0.25);
        }

        .modal-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(130, 53, 208, 0.35);
        }

        /* Loader Styles */
        .loader {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid #ffffff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          display: inline-block;
          margin-right: 12px;
          vertical-align: middle;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: 30px;
            padding: 40px 16px 60px;
          }
          .contact-form-card {
            padding: 32px 24px;
          }
          .contact-breadcrumb {
            padding: 0 16px;
          }
          .contact-hero {
            padding: 50px 16px 30px;
          }
          .contact-hero h1 {
            font-size: 30px;
          }

          .modal-content {
            padding: 32px 24px;
            margin: 0 16px;
          }

          .info-block {
            padding: 28px 20px;  /* reduce from 40px */
          }

          .contact-info-card {
            flex-direction: column;
          }

          .info-card {
            flex-direction: column;
            gap: 10px;
            padding: 24px 20px;
          }

          .info-card-icon {
            width: 42px;
            height: 42px;
          }

          .info-card-icon svg {
            width: 18px;
            height: 18px;
          }
      `}),(0,G.jsx)(Kp,{items:[{label:`Contact Us`}]}),(0,G.jsx)(`section`,{className:`contact-hero`,children:(0,G.jsxs)(`div`,{className:`contact-hero-inner`,children:[(0,G.jsx)(Y.h1,{variants:fm,initial:`hidden`,animate:`visible`,custom:0,children:`Get in Touch`}),(0,G.jsx)(Y.p,{variants:fm,initial:`hidden`,animate:`visible`,custom:1,children:`We would love to hear from you. Whether you have a question, need support, or want to learn more - we are just a message away.`})]})}),(0,G.jsxs)(`div`,{className:`contact-content`,children:[(0,G.jsx)(pm,{custom:0,children:(0,G.jsx)(`div`,{className:`contact-form-card`,children:(0,G.jsxs)(`div`,{className:`contact-form-content`,children:[(0,G.jsx)(`h2`,{children:`Send us a Message`}),(0,G.jsx)(`p`,{children:`Fill out the form below and we will get back to you shortly.`}),(0,G.jsxs)(`form`,{onSubmit:f,noValidate:!0,children:[(0,G.jsxs)(`div`,{className:`form-group`,children:[(0,G.jsx)(`label`,{htmlFor:`name`,children:`Your Name`}),(0,G.jsx)(`input`,{type:`text`,id:`name`,name:`name`,placeholder:`e.g. Ramesh Kumar`,value:e.name,onChange:d,className:o.name?`has-error`:``}),o.name&&(0,G.jsx)(`p`,{className:`form-error-msg`,children:o.name})]}),(0,G.jsxs)(`div`,{className:`form-group`,children:[(0,G.jsx)(`label`,{htmlFor:`email`,children:`Email Address`}),(0,G.jsx)(`input`,{type:`email`,id:`email`,name:`email`,placeholder:`e.g. ramesh@example.com`,value:e.email,onChange:d,className:o.email?`has-error`:``}),o.email&&(0,G.jsx)(`p`,{className:`form-error-msg`,children:o.email})]}),(0,G.jsxs)(`div`,{className:`form-group`,children:[(0,G.jsx)(`label`,{htmlFor:`phone`,children:`Phone Number`}),(0,G.jsx)(`input`,{type:`tel`,id:`phone`,name:`phone`,placeholder:`e.g. +91 98765 43210`,value:e.phone,onChange:d,className:o.phone?`has-error`:``}),o.phone&&(0,G.jsx)(`p`,{className:`form-error-msg`,children:o.phone})]}),(0,G.jsxs)(`div`,{className:`form-group`,children:[(0,G.jsx)(`label`,{htmlFor:`message`,children:`Message (Optional)`}),(0,G.jsx)(`textarea`,{id:`message`,name:`message`,placeholder:`Tell us how we can help you...`,value:e.message,onChange:d})]}),c&&(0,G.jsx)(`p`,{className:`form-error-msg`,style:{textAlign:`center`},children:c}),(0,G.jsx)(`button`,{type:`submit`,className:`form-submit-btn`,disabled:i,children:i?(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(`span`,{className:`loader`}),`Sending...`]}):`Send Message`})]})]})})}),n&&(0,G.jsx)(`div`,{className:`modal-overlay`,onClick:p,children:(0,G.jsxs)(`div`,{className:`modal-content`,onClick:e=>e.stopPropagation(),children:[(0,G.jsx)(`div`,{className:`modal-icon`,children:(0,G.jsx)(`svg`,{viewBox:`0 0 24 24`,children:(0,G.jsx)(`path`,{d:`M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z`})})}),(0,G.jsx)(`h3`,{className:`modal-title`,children:`Message Sent!`}),(0,G.jsx)(`p`,{className:`modal-message`,children:`Thank you for reaching out. Our team will get back to you within 24 hours.`}),(0,G.jsx)(`button`,{className:`modal-button`,onClick:p,children:`OK`})]})}),(0,G.jsxs)(`div`,{className:`contact-info-card`,children:[(0,G.jsx)(pm,{custom:1,className:`info-card-wrapper`,children:(0,G.jsxs)(`div`,{className:`info-card`,children:[(0,G.jsx)(`div`,{className:`info-card-icon`,children:(0,G.jsx)(`svg`,{viewBox:`0 0 24 24`,children:(0,G.jsx)(`path`,{d:`M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z`})})}),(0,G.jsx)(`h3`,{children:`Phone`}),(0,G.jsx)(`a`,{href:`tel:+919499944939`,children:`+91 94999 44939`})]})}),(0,G.jsx)(pm,{custom:2,className:`info-card-wrapper`,children:(0,G.jsxs)(`div`,{className:`info-card`,children:[(0,G.jsx)(`div`,{className:`info-card-icon`,children:(0,G.jsx)(`svg`,{viewBox:`0 0 24 24`,children:(0,G.jsx)(`path`,{d:`M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z`})})}),(0,G.jsx)(`h3`,{children:`Email`}),(0,G.jsx)(`a`,{href:`mailto:reach@nurahub.com`,children:`reach@nurahub.com`})]})}),(0,G.jsx)(pm,{custom:3,className:`info-card-wrapper`,children:(0,G.jsxs)(`div`,{className:`info-card`,children:[(0,G.jsx)(`div`,{className:`info-card-icon`,children:(0,G.jsx)(`svg`,{viewBox:`0 0 24 24`,children:(0,G.jsx)(`path`,{d:`M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z`})})}),(0,G.jsx)(`h3`,{children:`Office Address`}),(0,G.jsx)(`p`,{children:`Nura AI Labs (Incubated at ITEL), Plot No. 22, Rajalakshmi Nagar, 3rd Main Road, Velachery, Chennai – 600 042, Tamil Nadu, India.`})]})})]})]})]})}function hm(){return(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(Tf,{alwaysWhite:!0}),(0,G.jsx)(`style`,{children:`
        .not-found {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          padding: 120px 24px 60px;
          font-family: 'Nunito Sans', sans-serif;
          background: linear-gradient(180deg, #ffffff 0%, #f6f2ff 100%);
        }

        .nf-badge {
          font-size: 12px;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: rgba(130,53,208,0.7);
          font-weight: 700;
          margin-bottom: 12px;
        }

        .not-found-code {
          font-family: 'Gambarino', serif;
          font-size: clamp(72px, 12vw, 140px);
          font-weight: 500;
          line-height: 1;
          color: #8235d0;
          margin-bottom: 10px;
        }

        .not-found-title {
          font-family: 'Gambarino', serif;
          font-size: clamp(24px, 3vw, 34px);
          font-weight: 500;
          color: #1a0a2e;
          margin-bottom: 14px;
        }

        .not-found-desc {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(26, 10, 46, 0.6);
          max-width: 440px;
          margin-bottom: 36px;
        }

        .not-found-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 40px;
          background: linear-gradient(94deg, #8235d0, #5f308e);
          color: white;
          border-radius: 999px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          box-shadow: 0 12px 28px rgba(130, 53, 208, 0.25);
          transition: all 0.25s ease;
        }

        .not-found-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 32px rgba(130, 53, 208, 0.3);
        }

        .nf-footer-note {
          margin-top: 28px;
          font-size: 13px;
          color: rgba(26,10,46,0.45);
        }

        @media (max-width: 480px) {
          .not-found {
            padding-top: 100px;
          }
        }
      `}),(0,G.jsxs)(`div`,{className:`not-found`,children:[(0,G.jsx)(`div`,{className:`nf-badge`,children:`60Plus India`}),(0,G.jsx)(`div`,{className:`not-found-code`,children:`404`}),(0,G.jsx)(`h1`,{className:`not-found-title`,children:`This page isn’t available`}),(0,G.jsx)(`p`,{className:`not-found-desc`,children:`It seems the page you’re looking for doesn’t exist or may have been moved. Let’s take you back to a place where you can continue caring for your parents.`}),(0,G.jsxs)(It,{to:`/`,className:`not-found-cta`,children:[`Return to Home`,(0,G.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:(0,G.jsx)(`path`,{d:`M5 12h14M13 5l7 7-7 7`})})]}),(0,G.jsx)(`div`,{className:`nf-footer-note`,children:`If you believe this is an error, feel free to reach out to our team.`})]})]})}var gm=[{question:`How do I enter the lucky draw?`,answer:`Simply fill out the entry form with your details. It takes less than a minute.`},{question:`Is there any cost to participate?`,answer:`No, participation is completely free. No purchase is required.`},{question:`How are winners selected?`,answer:`Winners are chosen randomly from all valid entries.`},{question:`When will the winners be announced?`,answer:`Winners will be announced on May 3.`},{question:`How will I know if I win?`,answer:`If you win, we will contact you via email. Please check your inbox (and spam folder).`},{question:`What is the 60Plus Premium subscription reward?`,answer:`Along with the 10 gadget winners, one special winner will be selected to receive a full year of 60Plus Premium Subscription for their parents in India at no cost.`}],_m={hidden:{opacity:0,y:40},visible:(e=0)=>({opacity:1,y:0,transition:{duration:.65,delay:e*.07,ease:[.22,1,.36,1]}})},vm={hidden:{opacity:0,scale:.98},visible:(e=0)=>({opacity:1,scale:1,transition:{duration:.55,delay:e*.06,ease:[.22,1,.36,1]}})};function ym({children:e,custom:t=0,className:n=``,variants:r=_m}){let i=(0,b.useRef)(null),a=bf(i,{once:!0,margin:`-72px 0px`});return(0,G.jsx)(Y.div,{ref:i,className:n,custom:t,variants:r,initial:`hidden`,animate:a?`visible`:`hidden`,children:e})}function bm(e){return String(e).padStart(2,`0`)}function xm(){qp(`60Plus Lucky Draw | Win Exciting Gifts`,`Join the 60Plus lucky draw and win exciting gifts for your loved ones back home.`,`60plus lucky draw, smart glass, smart ring, digital timer, parents care gifts`);let e=(0,b.useRef)(null),t=`May 3, 2026`,[n,r]=(0,b.useState)(0),[i,a]=(0,b.useState)({name:``,phone:``,email:``,countryCode:`+1`,city:``}),[o,s]=(0,b.useState)({name:``,phone:``,email:``,city:``}),[c,l]=(0,b.useState)(!1),[u,d]=(0,b.useState)(null),[f,p]=(0,b.useState)(!1),[m,h]=(0,b.useState)(!1),g=[{label:`US (+1)`,value:`+1`},{label:`India (+91)`,value:`+91`},{label:`UK (+44)`,value:`+44`},{label:`UAE (+971)`,value:`+971`}];(0,b.useEffect)(()=>{let t=e.current;if(!t||typeof IntersectionObserver>`u`)return;let n=new IntersectionObserver(([e])=>{p(e.isIntersecting)},{threshold:.35});return n.observe(t),()=>n.disconnect()},[]),(0,b.useEffect)(()=>{if(!m)return;let e=document.body.style.overflow;return document.body.style.overflow=`hidden`,()=>{document.body.style.overflow=e}},[m]),(0,b.useMemo)(()=>{let e=Math.floor(n/86400),t=Math.floor(n%86400/3600),r=Math.floor(n%3600/60),i=n%60;return[bm(e),bm(t),bm(r),bm(i)]},[n]);let _=(e,t)=>{let n=t.trim();if(e===`city`)return``;if(!n)return`This field is required.`;if(e===`name`&&!/^[a-zA-Z\s'.-]{2,60}$/.test(n))return`Enter a valid full name.`;if(e===`phone`){let e=n.replace(/\D/g,``);if(e.length<7||e.length>12)return`Enter a valid phone number.`}return e===`email`&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n)?`Enter a valid email address.`:``},v=(e,t)=>{a(n=>({...n,[e]:t})),s(n=>({...n,[e]:_(e,t)}))},[y,x]=(0,b.useState)(!1),[S,C]=(0,b.useState)(``),w=async e=>{e.preventDefault()},ee=()=>{l(!1),a({name:``,phone:``,email:``,countryCode:`+1`,city:``}),s({name:``,phone:``,email:``,city:``})},te=()=>{e.current?.scrollIntoView({behavior:`smooth`,block:`start`})};return(0,G.jsxs)(`main`,{className:`lottery-page`,children:[(0,G.jsx)(`style`,{children:`
        .lottery-page {
          --paper: #faf8f5;
          --paper-2: #f1ece4;
          --ink: #141118;
          --ink-soft: #3d3848;
          --line: rgba(20, 17, 24, 0.08);
          --accent: #4f2db8;
          --accent-hover: #3d2294;
          --gold: #b8956a;
          --gold-soft: #d4bc94;
          --hero-bg: #0e0c10;
          --footer-bg: #0f0a1f;
          --grain: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E");

          min-height: 100vh;
          font-family: 'Nunito Sans', sans-serif;
          color: var(--ink);
          background: var(--paper);
          overflow-x: hidden;
          padding-top: 48px;
          padding-bottom: 88px;
        }
        @media (min-width: 769px) {
          .lottery-page {
            padding-top: 48px;
            padding-bottom: 0;
          }
        }

        .lottery-topbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1100;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0 14px;
          background:
            linear-gradient(90deg, rgba(95, 45, 184, 0.18) 0%, rgba(14, 12, 16, 0.88) 48%, rgba(95, 45, 184, 0.12) 100%),
            var(--hero-bg);
          border-bottom: 1px solid rgba(212, 188, 148, 0.24);
          box-shadow: 0 4px 18px rgba(10, 8, 14, 0.5);
          backdrop-filter: blur(8px);
          color: rgba(245, 242, 235, 0.92);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .lottery-topbar svg {
          color: #d4bc94;
          flex-shrink: 0;
        }
        .lottery-topbar-time {
          color: var(--gold-soft);
          font-weight: 800;
          letter-spacing: 0.08em;
        }
        .lottery-topbar-mobile-copy {
          display: none;
          color: #f5f2eb;
          font-weight: 700;
          letter-spacing: 0.08em;
        }
        @media (max-width: 900px) {
          .lottery-topbar {
            font-size: 0.7rem;
            letter-spacing: 0.08em;
          }
        }
        @media (max-width: 640px) {
          .lottery-page {
            padding-top: 44px;
          }
          .lottery-topbar {
            height: 44px;
            font-size: 0.66rem;
            gap: 0.35rem;
          }
          .lottery-topbar-desktop-copy {
            display: none;
          }
          .lottery-topbar-mobile-copy {
            display: inline;
          }
          .lottery-topbar-time {
            letter-spacing: 0.04em;
          }
          .hero-kicker-logo {
            width: 48px;
            height: 48px;
          }
          .hero-kicker-logo.itel {
            width: 34px;
            height: 34px;
          }
          .hero-kicker-sep {
            height: 22px;
          }
        }

        .lottery-inner {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 22px;
        }

        .lottery-section {
          padding: 5rem 22px;
        }
        @media (max-width: 768px) {
          .lottery-section { padding: 3.25rem 22px; }
        }

        .section-tight { padding-top: 3rem; padding-bottom: 3rem; }

        .font-display {
          font-family: 'Gambarino', 'Gambarino-Regular', serif !important;
        }

        /* -- Hero -- */
        .lottery-hero {
          background: var(--hero-bg);
          color: #f5f2eb;
          position: relative;
          isolation: isolate;
          padding: 0 22px 4.5rem;
        }
        .lottery-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--grain);
          z-index: 0;
          pointer-events: none;
          opacity: 1;
        }
        .lottery-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 90% 70% at 85% 15%, rgba(95, 45, 184, 0.22), transparent 55%),
            radial-gradient(ellipse 60% 50% at 10% 90%, rgba(184, 149, 106, 0.12), transparent 50%);
          z-index: 0;
          pointer-events: none;
        }

        .hero-grid {
          max-width: 1080px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 2.5rem;
          align-items: center;
          padding-top: 2rem;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; padding-top: 1.5rem; }
        }

        .hero-brand {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1080px;
          margin: 0 auto;
          padding: 1.5rem 22px 0;
          position: relative;
          z-index: 1;
        }
        .hero-logo {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: rgba(245, 242, 235, 0.55);
        }
        .hero-logo em {
          font-style: normal;
          color: var(--gold-soft);
        }

        .hero-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.23em;
          text-transform: uppercase;
          color: var(--gold-soft);
          margin-bottom: 1.25rem;
        }
        .hero-kicker-logos {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          margin-right: 0.6rem;
        }
        .hero-kicker-logo {
          width: 60px;
          height: 60px;
          object-fit: contain;
          display: inline-block;
          vertical-align: middle;
          filter: brightness(0) invert(1) drop-shadow(0 3px 7px rgba(0, 0, 0, 0.22));
        }
        .hero-kicker-sep {
          width: 1px;
          height: 26px;
          background: rgba(245, 242, 235, 0.28);
        }
        .hero-kicker-logo.itel {
          width: 46px;
          height: 46px;
        }

        .hero-title {
          font-family: 'Nunito Sans', sans-serif;
          font-weight: 700;
          font-size: clamp(2.35rem, 5.5vw, 3.65rem);
          line-height: 1.05;
          letter-spacing: -0.012em;
          margin: 0 0 1.25rem;
          color: #faf8f5;
        }
        .hero-title span.accent {
          color: var(--gold-soft);
          font-style: normal;
          font-weight: 700;
        }

        .hero-lede {
          font-size: 1.05rem;
          line-height: 1.65;
          color: rgba(245, 242, 235, 0.72);
          max-width: 34ch;
          margin: 0 0 2rem;
        }

        .hero-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem 1.25rem;

          margin-bottom: 1.5rem;
          padding-top: 1.2rem;   /* 🔥 increase space from line */

          border-top: 1px solid rgba(245, 242, 235, 0.12);
        }
        .hero-stat {
          min-width: 5.5rem;
        }
        .hero-stat strong {
          display: block;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 1.85rem;
          font-weight: 700;
          color: var(--gold-soft);
          line-height: 1.1;
        }
        .hero-stat span {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(245, 242, 235, 0.45);
        }

        .hero-cta-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1rem;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.95rem 1.65rem;
          border-radius: 999px;
          border: 1px solid rgba(212, 188, 148, 0.45);
          cursor: pointer;
          font-family: 'Nunito Sans', sans-serif;
          font-weight: 800;
          font-size: 0.95rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--gold-soft) !important;
          background: linear-gradient(180deg, rgba(18, 15, 25, 0.95), rgba(10, 8, 14, 0.95));
          box-shadow: 0 12px 30px rgba(9, 8, 14, 0.45), inset 0 0 0 1px rgba(255, 255, 255, 0.05);
          text-decoration: none;
        }
        .btn-primary:hover {
          color: #f5f2eb !important;
          border-color: rgba(212, 188, 148, 0.75);
          background: linear-gradient(180deg, rgba(25, 21, 35, 0.98), rgba(12, 9, 18, 0.98));
        }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.85rem 1rem;
          border-radius: 999px;
          border: 1px solid rgba(245, 242, 235, 0.2);
          background: transparent;
          color: rgba(245, 242, 235, 0.85);
          font-family: 'Nunito Sans', sans-serif;
          font-weight: 600;
          font-size: 0.88rem;
          cursor: pointer;
        }
        .btn-ghost:hover {
          border-color: rgba(245, 242, 235, 0.4);
          color: #fff;
        }

        .hero-visual {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          gap: 1rem;
          min-height: 100%;
        }
        @media (max-width: 900px) {
          .hero-visual { align-items: center; padding-top: 1rem; }
        }
        .hero-frame {
          width: 100%;
          max-width: 1050px;
          display: flex;
          justify-content: center;
          overflow: visible;
        }
        .hero-frame img {
          width: 150%;
          max-width: none;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.45));
          animation: stageFloat 4.1s ease-in-out infinite;
        }

        .hero-sub-note {
          font-size: 0.8rem;
          color: rgba(245,242,235,0.6);
          margin-top: 0.6rem;
          margin-bottom: 1.4rem; /* 🔥 ADD THIS */
        }
        @media (max-width: 768px) {
          .hero-frame img {
            width: 118%;
          }
        }

        /* -- Sections -- */
        .bg-paper { background: var(--paper); }
        .bg-paper-2 { background: var(--paper-2); }
        .bg-ink { background: var(--footer-bg); color: #e8e4dc; }
        .bg-ink .section-eyebrow { color: var(--gold-soft); }
        .bg-ink .section-title { color: #f5f2eb; }
        .bg-ink .section-desc { color: rgba(232, 228, 220, 0.82); }

        .section-head {
          max-width: 38rem;
          margin-bottom: 2.75rem;
        }
        .section-head.center { text-align: center; margin-left: auto; margin-right: auto; }
        .section-eyebrow {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 1rem;   /* 🔥 FIXED */
        }
        .section-title {
          font-family: 'Nunito Sans', sans-serif;
          font-size: clamp(1.75rem, 3.5vw, 2.35rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: 0.015em;
          margin: 0.2rem 0 0.9rem;   /* 🔥 balanced spacing */
          color: var(--ink);
        }
        .section-desc {
          margin: 0;
          font-size: 1.02rem;
          line-height: 1.6;
          color: var(--ink-soft);
        }

        /* Steps */
        .steps-track {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          position: relative;
        }
        @media (max-width: 820px) {
          .steps-track { grid-template-columns: 1fr; gap: 1.25rem; }
        }
        .steps-track::before {
          content: '';
          position: absolute;
          top: 2.1rem;
          left: 8%;
          right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--line), transparent);
          z-index: 0;
        }
        @media (max-width: 820px) {
          .steps-track::before { display: none; }
        }
        .step-card {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 0 0.75rem;
          transition: transform 0.25s ease;
        }
        .step-num {
          width: 4.25rem;
          height: 4.25rem;
          margin: 0 auto 1.25rem;
          border-radius: 50%;
          background: var(--paper);
          border: 1px solid var(--line);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--accent);
          box-shadow: 0 8px 24px rgba(20, 17, 24, 0.06);
        }
        .step-title {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 1.2rem;
          font-weight: 600;
          letter-spacing: 0.018em;
          margin: 0 0 0.5rem;
        }
        .step-desc {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.55;
          color: var(--ink-soft);
          max-width: 22ch;
          margin-inline: auto;
        }

        /* Prizes */
        .prize-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 900px) {
          .prize-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 500px) {
          .prize-grid {
            grid-template-columns: 1fr;
          }
        }
        .prize-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 1.75rem 1.35rem;
          text-align: center;
          position: relative;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .prize-card:hover {
          border-color: rgba(79, 45, 184, 0.2);
          box-shadow: 0 18px 40px rgba(20, 17, 24, 0.07);
        }
        .prize-img {
          width: 8.75rem;
          height: 8.75rem;
          margin: 0 auto 0.85rem;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          background: radial-gradient(circle at 50% 42%, rgba(95, 45, 184, 0.08), rgba(95, 45, 184, 0.02) 72%, transparent 100%);
        }
        .prize-img img {
          width: 120%;
          height: 120%;
          object-fit: contain;
          border-radius: 12px;
          filter: drop-shadow(0 10px 16px rgba(20, 17, 24, 0.18));
        }
        .prize-img img.prize-img-fill {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .prize-card:nth-child(2) .prize-img img {
          width: 104%;
          height: 96%;
        }
        .prize-name {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 1.2rem;
          font-weight: 600;
          letter-spacing: 0.015em;
          margin: 0 0 0.35rem;
        }
        .prize-worth {
          display: inline-block;
          margin: 0 0 0.7rem;
          padding: 0.22rem 0.65rem;
          border-radius: 999px;
          background: rgba(212, 188, 148, 0.18);
          border: 1px solid rgba(184, 149, 106, 0.35);
          color: #6e5633;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          line-height: 1.2;
          box-shadow: 0 4px 12px rgba(184, 149, 106, 0.16);
        }
        .prize-sub {
          margin: 0;
          font-size: 0.9rem;
          color: var(--ink-soft);
          line-height: 1.45;
        }

        /* Form */
        .form-shell {
          max-width: 1080px;
          margin: 0 auto;
        }
        .form-highlight {
          background:
            radial-gradient(ellipse 70% 70% at 10% 8%, rgba(184, 149, 106, 0.08), transparent 58%),
            linear-gradient(180deg, #f8f3ea 0%, #f4eee4 100%);
        }
        .form-layout {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 1.4rem;
          align-items: stretch;
        }
        .form-story {
          padding: 0.2rem 0.4rem;
          align-self: center;
        }
        .form-story .lead {
          margin-bottom: 0.7rem;
        }
        .form-story p {
          margin: 0 0 1rem;
        }
        .form-story-points {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.55rem;
        }
        .form-story-points li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--ink-soft);
        }
        .form-story-points li::before {
          content: "•";
          color: var(--gold);
          font-size: 1rem;
          line-height: 1;
        }
        .form-panel {
          width: 100%;
          max-width: 780px;
          box-sizing: border-box;
          background: linear-gradient(180deg, #fff 0%, #fbf8f3 100%);
          border: 1px solid rgba(184, 149, 106, 0.22);
          border-radius: 18px;
          padding: 1.85rem 1.65rem;
          box-shadow: 0 18px 34px rgba(20, 17, 24, 0.08);
        }
        .form-panel h2 {
          font-family: 'Nunito Sans', sans-serif;
          font-size: clamp(1.34rem, 2.2vw, 1.7rem);
          font-weight: 700;
          letter-spacing: 0.015em;
          margin: 0 0 0.4rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--ink);
        }
        .form-panel h2 svg {
          color: #5f4a2d;
          background: rgba(184, 149, 106, 0.1);
          border: 1px solid rgba(184, 149, 106, 0.18);
          border-radius: 999px;
          padding: 6px;
          flex-shrink: 0;
        }
        .form-intro {
          margin: 0 0 1.2rem;
          font-size: 0.95rem;
          color: var(--ink-soft);
          line-height: 1.55;
        }
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.9rem 0.95rem;
        }
        .form-group.span-2 {
          grid-column: span 2;
        }
        .form-spacer {
          min-height: 1px;
        }
        .form-group {
          margin-bottom: 0;
        }
        .form-group label {
          display: block;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: rgba(20, 17, 24, 0.78);
          margin-bottom: 0.42rem;
        }
        .form-control {
          width: 100%;
          box-sizing: border-box;
          padding: 0.92rem 0.95rem;
          border: 1px solid rgba(184, 149, 106, 0.24);
          border-radius: 13px;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 0.93rem;
          color: var(--ink);
          background: #f8f4ed;
          transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
        }
        textarea.form-control {
          min-height: 94px;
          resize: vertical;
          line-height: 1.45;
        }
        .form-control::placeholder {
          color: rgba(61, 56, 72, 0.5);
          font-size: 0.88rem;
        }
        .form-control:focus {
          outline: none;
          border-color: rgba(184, 149, 106, 0.56);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(184, 149, 106, 0.15);
        }
        .form-control:disabled {
          background: #f5f5f5;
          color: #888;
          cursor: not-allowed;
          opacity: 0.7;
        }
        .field-error {
          margin: 0.35rem 0 0 0.12rem;
          color: #ffb4ae;
          font-size: 0.74rem;
          line-height: 1.35;
          font-weight: 600;
        }
        .form-control.is-invalid {
          border-color: rgba(255, 141, 133, 0.72);
          box-shadow: 0 0 0 2px rgba(255, 141, 133, 0.16);
        }
        .form-submit {
          width: 100%;
          margin-top: 0.95rem;
          padding: 1rem 1rem;
          border: 1px solid rgba(212, 188, 148, 0.45);
          border-radius: 13px;
          font-family: 'Nunito Sans', sans-serif;
          font-weight: 800;
          font-size: 0.92rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          color: var(--gold-soft);
          background: linear-gradient(180deg, rgba(18, 15, 25, 0.95), rgba(10, 8, 14, 0.95));
          box-shadow: 0 10px 24px rgba(9, 8, 14, 0.24), inset 0 0 0 1px rgba(255, 255, 255, 0.04);
        }
        .form-submit:hover {
          color: #f5f2eb;
          border-color: rgba(212, 188, 148, 0.72);
          background: linear-gradient(180deg, rgba(25, 21, 35, 0.98), rgba(12, 9, 18, 0.98));
        }
        .form-trust {
          margin: 0.75rem 0 0.15rem;
          font-size: 0.8rem;
          color: var(--ink-soft);
          line-height: 1.5;
        }

        .form-closed-banner {
          background: rgba(184,149,106,0.12);
          border: 1px solid rgba(184,149,106,0.3);
          padding: 14px;
          border-radius: 12px;
          margin-bottom: 14px;
          text-align: center;
        }

        .form-closed-banner strong {
          display: block;
          font-weight: 800;
          margin-bottom: 4px;
        }

        .loader {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(212, 188, 148, 0.3);
          border-top: 2px solid var(--gold-soft);
          border-radius: 50%;
          display: inline-block;
          margin-right: 8px;
          vertical-align: middle;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .form-foot {
          margin: 0.7rem 0 0;
          font-size: 0.72rem;
          line-height: 1.55;
          color: var(--ink-soft);
          text-align: center;
        }
        .form-foot button {
          background: none;
          border: none;
          padding: 0;
          margin: 0;
          cursor: pointer;
          color: var(--accent);
          font-weight: 700;
          text-decoration: underline;
          font-family: inherit;
          font-size: inherit;
        }
        .form-foot button:hover { opacity: 0.86; }
        @media (max-width: 768px) {
          .form-shell {
            width: 100%;
            padding-left: 14px;
            padding-right: 14px;
            box-sizing: border-box;
          }
          .form-layout {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .form-story {
            padding: 0;
          }
          .form-story p {
            font-size: 0.88rem;
          }
          .form-panel {
            max-width: 100%;
            padding: 1.35rem 1rem 1.15rem;
            border-radius: 14px;
            box-shadow: 0 14px 28px rgba(20, 17, 24, 0.08);
          }
          .form-panel h2 {
            font-size: 1.24rem;
            gap: 0.4rem;
          }
          .form-intro {
            margin-bottom: 0.95rem;
            font-size: 0.9rem;
          }
          .form-grid {
            grid-template-columns: 1fr;
            gap: 0.82rem;
          }
          .form-group.span-2 {
            grid-column: span 1;
          }
          .form-spacer {
            display: none;
          }
          .form-group {
            margin-bottom: 0;
          }
          .form-group label {
            font-size: 0.68rem;
          }
          .form-control {
            padding: 0.82rem 0.82rem;
            border-radius: 12px;
            font-size: 0.88rem;
          }
          .form-control::placeholder {
            font-size: 0.84rem;
          }
          .field-error {
            font-size: 0.72rem;
          }
          .form-submit {
            margin-top: 0.7rem;
            padding: 0.88rem;
            border-radius: 12px;
            font-size: 0.82rem;
            letter-spacing: 0.06em;
          }
          .form-trust {
            margin-top: 0.68rem;
            font-size: 0.76rem;
          }
          .form-foot {
            margin-top: 0.62rem;
            font-size: 0.68rem;
            text-align: center;
          }
          #lottery-form.lottery-section {
            padding-left: 14px;
            padding-right: 14px;
          }
        }
        @media (max-width: 420px) {
          .form-panel {
            padding: 1.2rem 0.8rem 1.05rem;
          }
          .form-panel h2 {
            font-size: 1.08rem;
          }
          .form-intro {
            font-size: 0.86rem;
          }
        }

        /* Timer */
        .timer-band {
          background: var(--footer-bg);
          color: #e8e4dc;
          padding: 3rem 22px;
          position: relative;
          overflow: hidden;
        }
        .timer-band::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--grain);
          opacity: 0.5;
          pointer-events: none;
        }
        .timer-inner {
          position: relative;
          z-index: 1;
          max-width: 720px;
          margin: 0 auto;
          text-align: center;
        }
        .timer-label {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--gold);
          margin: 0 0 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
        }
        .timer-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: baseline;
          gap: 0.35rem 0.5rem;
        }
        .timer-box {
          font-family: 'Nunito Sans', sans-serif;
          font-weight: 600;
          font-size: clamp(2.1rem, 7vw, 3.2rem);
          line-height: 1;
          letter-spacing: 0.02em;
          color: #faf8f5;
          min-width: 2ch;
          padding: 0.35rem 0.15rem;
          animation: timerPulse 1.8s ease-in-out infinite;
        }
        .timer-dot {
          font-family: 'Nunito Sans', sans-serif;
          font-size: clamp(1.4rem, 4vw, 2rem);
          color: var(--gold-soft);
          opacity: 0.65;
          padding: 0 0.1rem;
        }
        .timer-units {
          display: flex;
          justify-content: center;
          gap: clamp(1.5rem, 8vw, 3.5rem);
          margin-top: 1rem;
          flex-wrap: wrap;
        }
        .timer-unit {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(232, 228, 220, 0.45);
          min-width: 4.5rem;
          text-align: center;
        }

        .timer-ended {
          text-align: center;
          padding: 20px;
        }

        .timer-ended h3 {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: #faf8f5;
          margin-bottom: 8px;
        }

        .timer-ended p {
          font-size: 0.95rem;
          color: rgba(232,228,220,0.7);
        }

        /* Showcase (bowl only) */
        .show-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
          gap: 2.5rem;
          align-items: center;
        }
        @media (max-width: 880px) {
          .show-grid { grid-template-columns: 1fr; gap: 2rem; text-align: center; }
        }
        .show-visual {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .show-bowl img {
          width: min(240px, 58vw);
          height: auto;
          animation: bowlFloat 3.6s ease-in-out infinite;
        }
        @media (min-width: 1024px) {
          .show-bowl img {
            width: min(320px, 32vw);
          }
        }
        .show-bowl span {
          display: block;
          text-align: center;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-soft);
          margin-top: 0.5rem;
        }
        .show-text .lead {
          font-family: 'Nunito Sans', sans-serif;
          font-size: clamp(1.45rem, 3vw, 1.85rem);
          font-weight: 600;
          line-height: 1.25;
          letter-spacing: 0.02em;
          margin: 0 0 1rem;
        }
        .show-text p {
          margin: 0;
          font-size: 1.02rem;
          line-height: 1.65;
          color: var(--ink-soft);
        }

        /* Who we are */
        .who-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 900px) {
          .who-grid { grid-template-columns: 1fr; }
        }
        .who-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 1.5rem 1.35rem 1.4rem;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .who-badge {
          display: block;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.19em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.55rem;
        }
        .who-title {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 1.15rem;
          font-weight: 600;
          letter-spacing: 0.015em;
          margin: 0 0 0.55rem;
          line-height: 1.25;
        }
        .who-body {
          margin: 0;
          font-size: 0.88rem;
          line-height: 1.58;
          color: var(--ink-soft);
        }
        .who-more {
          text-align: center;
          margin: 1.75rem 0 0;
          font-size: 0.95rem;
        }
        .who-more a {
          color: var(--accent);
          font-weight: 700;
          text-decoration: none;
        }
        .who-more a:hover {
          text-decoration: underline;
        }

        /* FAQ */
        .faq-wrap {
          max-width: 720px;
          margin: 0 auto;
        }
        .faq-item {
          border-bottom: 1px solid var(--line);
          transition: background 0.2s ease;
          border-radius: 12px;
        }
        .faq-item:first-of-type {
          border-top: 1px solid var(--line);
        }
        .faq-q {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem 0.9rem;
          border: none;
          background: none;
          cursor: pointer;
          text-align: left;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.012em;
          color: var(--ink);
        }
        .faq-item:hover {
          background: rgba(79, 45, 184, 0.03);
        }
        .faq-q:hover {
          color: var(--accent);
        }
        .faq-a {
          padding: 0 2rem 1.05rem 0.9rem;
          margin: 0;
          font-size: 0.94rem;
          line-height: 1.62;
          color: var(--ink-soft);
        }
        .faq-answer-wrap {
          overflow: hidden;
        }
        .faq-chevron {
          flex-shrink: 0;
          color: var(--accent);
          transition: transform 0.2s ease;
        }
        .faq-chevron.is-open {
          transform: rotate(180deg);
        }
        .bg-ink .faq-item {
          border-bottom-color: rgba(232, 228, 220, 0.18);
        }
        .bg-ink .faq-item:first-of-type {
          border-top-color: rgba(232, 228, 220, 0.18);
        }
        .bg-ink .faq-item:hover {
          background: rgba(232, 228, 220, 0.06);
        }
        .bg-ink .faq-q {
          color: #f5f2eb;
        }
        .bg-ink .faq-q:hover {
          color: var(--gold-soft);
        }
        .bg-ink .faq-a {
          color: rgba(232, 228, 220, 0.86);
        }
        .bg-ink .faq-chevron {
          color: var(--gold-soft);
        }
        .faq-policies {
          text-align: center;
          margin: 1.5rem 0 0;
          font-size: 0.88rem;
        }
        .faq-policies a {
          color: var(--accent);
          font-weight: 700;
          text-decoration: none;
        }
        .faq-policies a:hover {
          text-decoration: underline;
        }
        .faq-policies span {
          color: var(--ink-soft);
          padding: 0 0.35rem;
        }

        /* Info */
        .info-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .info-row { grid-template-columns: 1fr; }
        }
        .info-tile {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 1.5rem 1.25rem;
          text-align: center;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .info-tile svg {
          color: var(--accent);
          margin-bottom: 0.65rem;
        }
        .info-tile h4 {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          margin: 0 0 0.4rem;
          color: var(--ink);
        }
        .info-tile p {
          margin: 0;
          font-size: 0.92rem;
          color: var(--ink-soft);
          line-height: 1.45;
        }

        .page-footer {
          text-align: center;
          padding: 2rem 22px 2.5rem;
          font-size: 0.88rem;
          color: var(--ink-soft);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          border-top: 1px solid var(--line);
        }
        .page-footer svg { color: var(--accent); flex-shrink: 0; }

        .success-message {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          background: rgba(10, 8, 14, 0.55);
          padding: 1rem;
        }
        .success-message-card {
          background: linear-gradient(180deg, #fff 0%, #fbf8f3 100%);
          border: 1px solid rgba(184, 149, 106, 0.24);
          border-radius: 20px;
          padding: 2rem 1.6rem 1.45rem;
          max-width: 92vw;
          width: 27rem;
          text-align: center;
          box-shadow: 0 28px 60px rgba(20, 17, 24, 0.22);
          animation: successModalPop 0.28s ease-out;
        }
        .success-icon-wrap {
          width: 66px;
          height: 66px;
          border-radius: 50%;
          margin: 0 auto 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(184, 149, 106, 0.35);
          background: rgba(184, 149, 106, 0.14);
        }
        .success-message h3 {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 1.4rem;
          letter-spacing: 0.018em;
          margin: 0 0 0.45rem;
          color: #1b1527;
        }
        .success-message p {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--ink-soft);
        }
        .success-highlight {
          color: #2a2435;
          font-weight: 800;
        }
        .success-message p + p {
          margin-top: 0.45rem;
        }
        .success-close-btn {
          margin-top: 1rem;
          border: 1px solid rgba(184, 149, 106, 0.42);
          background: rgba(184, 149, 106, 0.13);
          color: #6e5633;
          border-radius: 10px;
          padding: 0.45rem 1rem;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
        }
        .success-close-btn:hover {
          background: rgba(184, 149, 106, 0.2);
        }
        .terms-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1200;
          background: rgba(10, 8, 14, 0.64);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .terms-modal-card {
          width: min(900px, 96vw);
          max-height: 88vh;
          overflow: auto;
          background: linear-gradient(180deg, #fff 0%, #fbf8f3 100%);
          border: 1px solid rgba(184, 149, 106, 0.24);
          border-radius: 20px;
          box-shadow: 0 30px 70px rgba(20, 17, 24, 0.28);
          padding: 0;
        }
        .terms-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          position: sticky;
          top: 0;
          z-index: 5;
          background: #fbf8f3;
          padding: 1rem 1.45rem 0.85rem;
          border-bottom: 1px solid rgba(184, 149, 106, 0.2);
          box-shadow: 0 8px 16px rgba(20, 17, 24, 0.05);
        }
        .terms-modal-kicker {
          display: block;
          margin: 0 0 0.25rem;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.17em;
          text-transform: uppercase;
          color: #8a6b3f;
        }
        .terms-modal-title {
          margin: 0;
          font-size: clamp(1rem, 2.2vw, 1.35rem);
          font-weight: 800;
          color: #1b1527;
          line-height: 1.24;
          letter-spacing: 0.02em;
        }
        .terms-close {
          border: 1px solid rgba(184, 149, 106, 0.35);
          background: rgba(184, 149, 106, 0.12);
          color: #6e5633;
          width: 34px;
          height: 34px;
          border-radius: 10px;
          font-size: 1rem;
          cursor: pointer;
          flex-shrink: 0;
        }
        .terms-close:hover { background: rgba(184, 149, 106, 0.2); }
        .terms-modal-body {
          font-size: 0.93rem;
          line-height: 1.68;
          color: #2a2435;
          padding: 1rem 1.45rem 1.6rem;
        }
        .terms-modal-body strong {
          color: #1d1728;
          font-weight: 900;
        }
        .terms-modal-body h3 {
          margin: 1.1rem 0 0.45rem;
          font-size: 1.02rem;
          letter-spacing: 0.02em;
          color: #141118;
        }
        .terms-modal-body p {
          margin: 0.45rem 0;
        }
        .terms-modal-body ul {
          margin: 0.3rem 0 0.75rem 1.2rem;
          padding: 0;
        }
        .terms-modal-body li {
          margin: 0.22rem 0;
        }
        .terms-copyright {
          text-align: center;
          margin-top: 1rem;
        }
        @keyframes successModalPop {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .sticky-cta {
          display: none;
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 50;
          padding: 0.85rem 1rem calc(0.85rem + env(safe-area-inset-bottom));
          background: rgba(250, 248, 245, 0.92);
          backdrop-filter: blur(10px);
          border-top: 1px solid var(--line);
        }
        @media (max-width: 768px) {
          .sticky-cta { display: block; }
        }
        .sticky-cta button {
          width: 100%;
          padding: 0.9rem;
          border: none;
          border-radius: 16px;
          font-family: 'Nunito Sans', sans-serif;
          font-weight: 800;
          font-size: 0.85rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          color: #faf8f5;
          background: var(--ink);
        }

        @keyframes panelGlow {
          0%, 100% { box-shadow: 0 24px 48px rgba(20, 17, 24, 0.06); }
          50% { box-shadow: 0 28px 54px rgba(79, 45, 184, 0.16); }
        }
        @keyframes timerPulse {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-2px); opacity: 0.86; }
        }
        @keyframes bowlFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes stageFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        /* 60Plus Section Styles */
        .offer60plus-section .gold {
          color: var(--ink);
          font-weight: 800;
          letter-spacing: 0.01em;
        }

        /* CARD LAYOUT */
        .offer60plus-card {
          display: grid;
          grid-template-columns: 1.1fr 1fr;   /* image slightly bigger */
          gap: 2rem;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 20px 40px rgba(20,17,24,0.08);
        }

        @media (max-width: 900px) {
          .offer60plus-card {
            grid-template-columns: 1fr;
            padding: 1.5rem 1.25rem 1.75rem;
            gap: 1.25rem;
          }

          .offer60plus-card.refined {
            padding: 0;
            gap: 0;
          }

          .offer60plus-card.refined .offer60plus-content {
            padding: 1.5rem 1.5rem 2rem;
          }
        }

        /* VISUAL */
        .offer60plus-visual {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          min-height: 260px;
        }

        .offer60plus-visual img {
          width: 100%;
          max-width: 320px;
          object-fit: contain;
          filter: drop-shadow(0 14px 30px rgba(0,0,0,0.12));
        }

        .offer60plus-visual.refined {
          display: block;
          min-height: 0;
          height: 100%;
          align-self: stretch;
          overflow: hidden;
          border-radius: 20px 0 0 20px;
        }

        .offer60plus-visual.refined img {
          display: block;
          width: 100%;
          height: 100%;
          max-width: none;
          min-height: 100%;
          object-fit: cover;
          object-position: center;
          border-radius: 0;
          filter: none;
        }

        /* CONTENT */
        .offer60plus-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* BADGE */
        .offer60plus-badge {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.6rem;
        }

        /* TITLE */
        .offer60plus-title {
          font-size: 1.65rem;
          font-weight: 800;
          margin-bottom: 0.6rem;
          background: linear-gradient(135deg, #b8956a 0%, #6e4e2a 60%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.004em;
          line-height: 1.2;
        }

        /* DESC */
        .offer60plus-desc {
          font-size: 0.95rem;
          color: var(--ink-soft);
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        /* FEATURES */
        .offer60plus-features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.6rem 1rem;
          margin-bottom: 1.2rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--ink-soft);
        }

        .feature-item svg {
          color: var(--gold);
        }

        /* CTA */
        .offer60plus-cta {
          margin-top: 0.5rem;
        }

        /* NOTE */
        .offer60plus-note {
          font-size: 0.75rem;
          margin-top: 0.6rem;
          color: rgba(20,17,24,0.5);

          text-align: center;     /* ✅ center text */
          width: 100%;            /* ✅ take full width */
        }

        /* Refined Card Styling — no outer padding on image side; image fills its cell */
        .offer60plus-card.refined {
          align-items: stretch;
          gap: 2rem;
          padding: 0;
          overflow: hidden;
        }

        .offer60plus-card.refined .offer60plus-content {
          padding: 2rem 2rem 2rem 0;
          box-sizing: border-box;
        }

        .offer60plus-desc.highlight {
          font-size: 0.98rem;
          font-weight: 600;
          color: #2a2435;
          line-height: 1.5;
          margin-bottom: 0.5rem;
        }

        /* SPECIAL CARD */
        .prize-card.special {
          border: 1px solid rgba(184,149,106,0.45);
          box-shadow: 0 18px 40px rgba(184,149,106,0.18);
        }

        /* IMAGE */
        .prize-img.special {
          background: radial-gradient(circle at center, rgba(184,149,106,0.18), transparent 70%);
        }

        /* TEXT */
        .prize-sub.premium {
          font-weight: 600;
          color: #1b1527;
        }

        /* Clean features */
        .offer60plus-features.clean {
          display: grid;
          grid-template-columns: max-content max-content;
          gap: 1rem 2.25rem;
          margin-top: 0.35rem;
          margin-bottom: 0.55rem;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          box-sizing: border-box;
        }

        .offer60plus-more-services {
          grid-column: 1 / -1;
          text-align: center;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--gold);
          margin: 0.45rem 0 0;
          padding-top: 0.3rem;
          letter-spacing: 0.02em;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--ink-soft);
        }

        .feature-item svg {
          color: var(--gold);
          width: 16px;
          height: 16px;
        }

        @media (max-width: 900px) {
          .offer60plus-visual.refined {
            border-radius: 20px 20px 0 0;
            height: auto;
            min-height: 200px;
            max-height: 320px;
          }

          .offer60plus-visual.refined img {
            min-height: 200px;
            max-height: 320px;
            height: 100%;
          }
        }

        /* CTA spacing FIX */
        .offer60plus-cta.spaced {
          margin-top: 0.85rem;
          margin-bottom: 0.6rem;

          display: flex;
          justify-content: center;   /* horizontal center */
          align-items: center;

          width: 100%;
        }
        .offer60plus-cta.spaced > * {
          width: 100%;
          max-width: 320px;
        }
        .offer60plus-cta.spaced .btn-primary {
          min-width: 220px;
          max-width: 320px;
          width: auto;
          justify-content: center;
        }
        @media (max-width: 768px) {
          /* Single horizontal gutter (section only) so the card and copy use full width */
          .offer60plus-section .lottery-inner {
            padding-left: 0;
            padding-right: 0;
          }

          .offer60plus-section.lottery-section {
            padding-left: calc(18px + env(safe-area-inset-left, 0px));
            padding-right: calc(18px + env(safe-area-inset-right, 0px));
          }

          .offer60plus-card.refined .offer60plus-content {
            padding: 1.75rem clamp(1.125rem, 4.5vw, 1.5rem) 2.25rem;
            width: 100%;
            box-sizing: border-box;
          }

          .offer60plus-features.clean {
            grid-template-columns: 1fr;
            width: 100%;
            max-width: none;
            margin-left: 0;
            margin-right: 0;
            gap: 0.85rem;
            padding: 0.75rem 0;
            box-sizing: border-box;
          }

          .offer60plus-features.clean .feature-item {
            justify-content: flex-start;
          }

          .offer60plus-more-services {
            margin-top: 0.45rem;
            padding-top: 0.35rem;
          }

          .offer60plus-cta.spaced {
            margin-top: 0.9rem;
          }

          .offer60plus-cta.spaced > * {
            max-width: 100%;
          }

          .offer60plus-cta.spaced .btn-primary {
            font-size: 0.85rem;
            padding: 1rem 1.25rem;
            letter-spacing: 0.04em;
            border-radius: 999px;
          }

          .offer60plus-note {
            padding-left: 0.25rem;
            padding-right: 0.25rem;
          }
        }

        .offer60plus-content {
          align-items: center;   /* ✅ center everything */
          text-align: center;    /* ✅ align text with CTA */
        }
      `}),(0,G.jsxs)(`div`,{className:`lottery-topbar`,role:`status`,"aria-live":`polite`,children:[(0,G.jsx)(`span`,{className:`lottery-topbar-desktop-copy`,children:`ENDS APRIL 27 • 11:59 PM CDT`}),(0,G.jsx)(`span`,{className:`lottery-topbar-mobile-copy`,children:`ENDS APR 27 • 11:59 PM`}),(0,G.jsx)(`span`,{className:`lottery-topbar-time`,children:`Entries Closed`}),(0,G.jsx)(`span`,{className:`lottery-topbar-mobile-copy`,children:`DRAW CLOSED`})]}),(0,G.jsx)(`header`,{className:`lottery-hero`,"aria-label":`Lucky draw`,children:(0,G.jsxs)(`div`,{className:`hero-grid`,children:[(0,G.jsxs)(ym,{children:[(0,G.jsx)(`p`,{className:`hero-kicker`,children:(0,G.jsxs)(`span`,{className:`hero-kicker-logos`,"aria-hidden":!0,children:[(0,G.jsx)(`img`,{className:`hero-kicker-logo`,src:`/logo/60_plus_india.png`,alt:``}),(0,G.jsx)(`span`,{className:`hero-kicker-sep`}),(0,G.jsx)(`img`,{className:`hero-kicker-logo itel`,src:`/logo/ITEL_LOGO.png`,alt:``})]})}),(0,G.jsxs)(`h1`,{className:`hero-title font-display`,children:[`Gifts that cross oceans, `,(0,G.jsx)(`span`,{className:`accent`,children:`for the people who raised you.`})]}),(0,G.jsx)(`p`,{className:`hero-lede`,children:`Enter the draw for a chance to gift your parents a full year of 60Plus Premium Subscription.`}),(0,G.jsxs)(`div`,{className:`hero-stats`,children:[(0,G.jsxs)(`div`,{className:`hero-stat`,children:[(0,G.jsx)(`strong`,{children:`Free`}),(0,G.jsx)(`span`,{children:`Entry`})]}),(0,G.jsxs)(`div`,{className:`hero-stat`,children:[(0,G.jsx)(`strong`,{children:`10+1`}),(0,G.jsx)(`span`,{children:`Total winners`})]}),(0,G.jsxs)(`div`,{className:`hero-stat`,children:[(0,G.jsx)(`strong`,{children:`Multiple`}),(0,G.jsx)(`span`,{children:`Benefits`})]})]}),(0,G.jsx)(`p`,{className:`hero-sub-note`,children:`10 winners take home smart gadgets. 1 special winner receives 60Plus Premium Subscription for one year.`}),(0,G.jsx)(`div`,{className:`hero-cta-row`,children:(0,G.jsxs)(Y.button,{type:`button`,className:`btn-primary`,onClick:te,whileHover:{scale:1.02},whileTap:{scale:.98},children:[`Join the draw`,(0,G.jsx)(Kf,{size:18,"aria-hidden":!0})]})})]}),(0,G.jsx)(`div`,{className:`hero-visual`,children:(0,G.jsx)(ym,{custom:1,children:(0,G.jsx)(`div`,{className:`hero-frame`,children:(0,G.jsx)(`img`,{src:`/images/stand_image.png`,alt:`Lucky draw prize stage`})})})})]})}),(0,G.jsx)(`section`,{className:`lottery-section bg-paper-2 offer60plus-section`,children:(0,G.jsxs)(`div`,{className:`lottery-inner`,children:[(0,G.jsxs)(ym,{className:`section-head center`,children:[(0,G.jsx)(`p`,{className:`section-eyebrow`,children:`Exclusive Benefit`}),(0,G.jsx)(`h2`,{className:`section-title font-display`,children:`Get a chance to win 1-Year 60Plus Premium Subscription`}),(0,G.jsx)(`p`,{className:`section-desc`,children:`It takes less than a minute to participate and one winner will unlock a full year of care, safety, and support for their parents.`})]}),(0,G.jsx)(ym,{children:(0,G.jsxs)(`div`,{className:`offer60plus-card refined`,children:[(0,G.jsx)(`div`,{className:`offer60plus-visual refined`,children:(0,G.jsx)(`img`,{src:`/images/lottery_page_1_year_free_plan.png`,alt:`60Plus subscription`})}),(0,G.jsxs)(`div`,{className:`offer60plus-content`,children:[(0,G.jsx)(`div`,{className:`offer60plus-badge`,children:`Part of 10+1 Winner Draw`}),(0,G.jsx)(`h3`,{className:`offer60plus-title`,children:`60Plus Subscription`}),(0,G.jsx)(`p`,{className:`offer60plus-desc highlight`,children:`Complete Premium care and support for your parents in India, helping them stay safe, healthy, and well cared for every day.`}),(0,G.jsxs)(`div`,{className:`offer60plus-features clean`,children:[(0,G.jsxs)(`div`,{className:`feature-item`,children:[(0,G.jsx)(qf,{size:16}),`Monthly Doctor Visit`]}),(0,G.jsxs)(`div`,{className:`feature-item`,children:[(0,G.jsx)(yp,{size:16}),`24/7 Emergency Call`]}),(0,G.jsxs)(`div`,{className:`feature-item`,children:[(0,G.jsx)(zf,{size:16}),`Daily Updates to Children`]}),(0,G.jsxs)(`div`,{className:`feature-item`,children:[(0,G.jsx)(Tp,{size:16}),`Monthly Care Executive Visit`]}),(0,G.jsx)(`p`,{className:`offer60plus-more-services`,children:`+17 more services included`})]}),(0,G.jsx)(`div`,{className:`offer60plus-cta spaced`,children:(0,G.jsx)(Y.div,{whileHover:{scale:1.02},whileTap:{scale:.98},children:(0,G.jsxs)(It,{to:`/`,className:`btn-primary`,children:[`See What You Get`,(0,G.jsx)(Kf,{size:18,"aria-hidden":!0})]})})}),(0,G.jsx)(`p`,{className:`offer60plus-note`,children:`Eligible only if parents are residing in India.`})]})]})})]})}),(0,G.jsx)(`section`,{className:`lottery-section bg-paper`,"aria-labelledby":`how-heading`,children:(0,G.jsxs)(`div`,{className:`lottery-inner`,children:[(0,G.jsxs)(ym,{className:`section-head center`,children:[(0,G.jsx)(`p`,{className:`section-eyebrow`,children:`Process`}),(0,G.jsx)(`h2`,{id:`how-heading`,className:`section-title font-display`,children:`Simple as one, two, three`}),(0,G.jsx)(`p`,{className:`section-desc`,children:`No stress, no confusion - just enter and let luck do its thing.`})]}),(0,G.jsx)(ym,{children:(0,G.jsx)(`div`,{className:`steps-track`,children:[{n:`01`,t:`Enter the draw`,d:`Submit your details to participate.`},{n:`02`,t:`Get selected`,d:`11 participants will be selected randomly.`},{n:`03`,t:`Win benefits`,d:`10 winners receive gadgets. 1 winner receives a 1-year 60Plus subscription.`}].map((e,t)=>(0,G.jsxs)(Y.div,{className:`step-card`,variants:vm,initial:`hidden`,whileInView:`visible`,viewport:{once:!0,margin:`-40px`},custom:t,whileHover:{y:-5,scale:1.02},children:[(0,G.jsx)(`div`,{className:`step-num`,children:e.n}),(0,G.jsx)(`h3`,{className:`step-title font-display`,children:e.t}),(0,G.jsx)(`p`,{className:`step-desc`,children:e.d})]},e.n))})})]})}),(0,G.jsx)(`section`,{className:`lottery-section bg-paper-2`,"aria-labelledby":`prizes-heading`,children:(0,G.jsxs)(`div`,{className:`lottery-inner`,children:[(0,G.jsxs)(ym,{className:`section-head center`,children:[(0,G.jsx)(`p`,{className:`section-eyebrow`,children:`Prizes`}),(0,G.jsx)(`h2`,{id:`prizes-heading`,className:`section-title font-display`,children:`What you could win`}),(0,G.jsx)(`p`,{className:`section-desc`,children:`10 winners will receive smart devices. One special winner receives a 1-year 60Plus Premium Subscription.`})]}),(0,G.jsxs)(`div`,{className:`prize-grid`,children:[[{img:`/images/glass.png`,title:`Smart glass`,sub:`Stay connected without lifting a finger - calls, music, and comfort, all in one.`},{img:`/images/ring.png`,title:`Health ring`,sub:`Quietly tracks your health - so you can stay informed without the effort.`},{img:`/images/digitalclock.png`,title:`Digital timer`,sub:`Gentle alarms for everyday moments - keeping routines simple and on track.`}].map((e,t)=>(0,G.jsxs)(Y.article,{className:`prize-card`,variants:vm,initial:`hidden`,whileInView:`visible`,viewport:{once:!0,margin:`-50px`},custom:t,whileHover:{scale:1.02,y:-4},transition:{type:`spring`,stiffness:380,damping:28},children:[(0,G.jsx)(`div`,{className:`prize-img`,children:(0,G.jsx)(`img`,{src:e.img,alt:``})}),(0,G.jsx)(`h3`,{className:`prize-name font-display`,children:e.title}),(0,G.jsx)(`p`,{className:`prize-sub`,children:e.sub})]},e.title)),(0,G.jsxs)(Y.article,{className:`prize-card`,variants:vm,initial:`hidden`,whileInView:`visible`,viewport:{once:!0},whileHover:{scale:1.02,y:-4},transition:{type:`spring`,stiffness:380,damping:28},children:[(0,G.jsx)(`div`,{className:`prize-img`,children:(0,G.jsx)(`img`,{className:`prize-img-fill`,src:`/images/lotter_page_what_could_you_win.png`,alt:`60Plus subscription`})}),(0,G.jsx)(`h3`,{className:`prize-name font-display`,style:{color:`black`},children:`60Plus Subscription`}),(0,G.jsx)(`p`,{className:`prize-sub`,children:`Continuous care and everyday support to keep your parents safe, healthy.`})]})]})]})}),(0,G.jsx)(wu,{children:m&&(0,G.jsx)(Y.div,{className:`terms-modal-overlay`,role:`dialog`,"aria-modal":`true`,"aria-labelledby":`lottery-terms-title`,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.22,ease:[.22,1,.36,1]},children:(0,G.jsxs)(Y.div,{className:`terms-modal-card`,initial:{opacity:0,y:20,scale:.97},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:12,scale:.98},transition:{duration:.26,ease:[.22,1,.36,1]},children:[(0,G.jsxs)(`div`,{className:`terms-modal-header`,children:[(0,G.jsxs)(`h2`,{id:`lottery-terms-title`,className:`terms-modal-title`,children:[(0,G.jsx)(`span`,{className:`terms-modal-kicker`,children:`Official Terms`}),`LUCKY DRAW TERMS & CONDITIONS`]}),(0,G.jsx)(`button`,{type:`button`,className:`terms-close`,onClick:()=>h(!1),"aria-label":`Close terms`,children:`✕`})]}),(0,G.jsxs)(`div`,{className:`terms-modal-body`,children:[(0,G.jsxs)(`p`,{children:[(0,G.jsx)(`strong`,{children:`Promoter:`}),` 60Plus India (A brand of Nura AI Labs Private Limited)`]}),(0,G.jsxs)(`p`,{children:[(0,G.jsx)(`strong`,{children:`Effective Date:`}),` April 2026`]}),(0,G.jsxs)(`p`,{children:[(0,G.jsx)(`strong`,{children:`Location:`}),` United States (Event-Based Participation)`]}),(0,G.jsx)(`h3`,{children:`1. ORGANIZER`}),(0,G.jsxs)(`p`,{children:[`This Lucky Draw ("Contest") is organized and promoted by `,(0,G.jsx)(`strong`,{children:`60Plus India, operated by Nura AI Labs Private Limited`}),`, a company registered in India, with its registered office at:`]}),(0,G.jsxs)(`p`,{children:[`Plot No. 22, Rajalakshmi Nagar,`,(0,G.jsx)(`br`,{}),`3rd Main Road, Velachery,`,(0,G.jsx)(`br`,{}),`Chennai – 600 042, India.`]}),(0,G.jsx)(`h3`,{children:`2. ELIGIBILITY`}),(0,G.jsxs)(`ul`,{children:[(0,G.jsxs)(`li`,{children:[`Open only to individuals aged `,(0,G.jsx)(`strong`,{children:`18 years or above`}),`.`]}),(0,G.jsxs)(`li`,{children:[`Intended primarily for `,(0,G.jsx)(`strong`,{children:`Non-Resident Indians (NRIs)`}),` attending the event.`]}),(0,G.jsxs)(`li`,{children:[`Employees, affiliates, partners, and their immediate family members are `,(0,G.jsx)(`strong`,{children:`not eligible`}),`.`]})]}),(0,G.jsx)(`h3`,{children:`3. NO PURCHASE REQUIRED`}),(0,G.jsxs)(`ul`,{children:[(0,G.jsxs)(`li`,{children:[`Participation is `,(0,G.jsx)(`strong`,{children:`completely free`}),`.`]}),(0,G.jsx)(`li`,{children:`No purchase or payment increases the chance of winning.`})]}),(0,G.jsx)(`h3`,{children:`4. ENTRY REQUIREMENTS`}),(0,G.jsx)(`p`,{children:`To enter the Lucky Draw, participants must:`}),(0,G.jsxs)(`ul`,{children:[(0,G.jsx)(`li`,{children:`Scan the official QR code at the event`}),(0,G.jsxs)(`li`,{children:[`Submit the digital entry form with:`,(0,G.jsxs)(`ul`,{children:[(0,G.jsx)(`li`,{children:`Full Name`}),(0,G.jsx)(`li`,{children:`Valid Phone Number`}),(0,G.jsx)(`li`,{children:`Valid Email Address`}),(0,G.jsx)(`li`,{children:`Parents’ Location in India`})]})]})]}),(0,G.jsxs)(`p`,{children:[(0,G.jsx)(`strong`,{children:`ENTRY LIMIT:`}),` Only `,(0,G.jsx)(`strong`,{children:`one (1) entry per person`}),` is allowed. Duplicate or fraudulent entries will result in `,(0,G.jsx)(`strong`,{children:`disqualification`}),`.`]}),(0,G.jsx)(`h3`,{children:`5. CONTEST PERIOD`}),(0,G.jsx)(`p`,{children:`The lucky draw entry period closes on April 27, 2026 at 11:59 PM CDT.`}),(0,G.jsx)(`p`,{children:`Entries submitted after this deadline will not be considered.`}),(0,G.jsx)(`h3`,{children:`6. PRIZES`}),(0,G.jsxs)(`p`,{children:[`A total of `,(0,G.jsx)(`strong`,{children:`10 winners`}),` will be selected:`]}),(0,G.jsxs)(`ul`,{children:[(0,G.jsx)(`li`,{children:`2 × Smart Glasses`}),(0,G.jsx)(`li`,{children:`2 × Health Rings`}),(0,G.jsx)(`li`,{children:`6 × Digital Clocks`})]}),(0,G.jsx)(`p`,{children:(0,G.jsx)(`strong`,{children:`Conditions:`})}),(0,G.jsxs)(`ul`,{children:[(0,G.jsxs)(`li`,{children:[`Prizes are `,(0,G.jsx)(`strong`,{children:`non-transferable`})]}),(0,G.jsxs)(`li`,{children:[`No `,(0,G.jsx)(`strong`,{children:`cash alternatives`})]}),(0,G.jsx)(`li`,{children:`Organizer reserves the right to substitute prizes with equal or higher value items`})]}),(0,G.jsx)(`h3`,{children:`6A. SPECIAL BENEFIT – 60PLUS SUBSCRIPTION`}),(0,G.jsx)(`p`,{children:`In addition to the 10 prize winners, one (1) separate participant will be selected randomly to receive a complimentary 1-year 60Plus premium subscription.`}),(0,G.jsx)(`p`,{children:(0,G.jsx)(`strong`,{children:`Conditions:`})}),(0,G.jsxs)(`ul`,{children:[(0,G.jsx)(`li`,{children:`This benefit is independent of the 10 prize winners and will be awarded to a different participant.`}),(0,G.jsx)(`li`,{children:`The subscription is applicable only if the participant's parents are residing in India.`}),(0,G.jsx)(`li`,{children:`The subscription includes services as per the standard 60Plus premium subscription plan available at the time of activation.`}),(0,G.jsx)(`li`,{children:`The benefit is non-transferable and cannot be exchanged for cash or any other service.`}),(0,G.jsx)(`li`,{children:`The subscription will be activated only after successful verification of participant details.`}),(0,G.jsx)(`li`,{children:`60Plus India reserves the right to modify service coverage based on operational availability in specific locations.`}),(0,G.jsx)(`li`,{children:`Misuse, false information, or ineligibility may result in cancellation of the benefit.`})]}),(0,G.jsx)(`h3`,{children:`7. WINNER SELECTION`}),(0,G.jsxs)(`ul`,{children:[(0,G.jsxs)(`li`,{children:[`Winners will be selected through a `,(0,G.jsx)(`strong`,{children:`random computerized draw`})]}),(0,G.jsxs)(`li`,{children:[`Announcement Date: `,(0,G.jsx)(`strong`,{children:`May 3, 2026`})]}),(0,G.jsxs)(`li`,{children:[`Winners will be notified via `,(0,G.jsx)(`strong`,{children:`Email`})]})]}),(0,G.jsx)(`h3`,{children:`8. CLAIMING PRIZES`}),(0,G.jsxs)(`ul`,{children:[(0,G.jsxs)(`li`,{children:[`Winners must respond within `,(0,G.jsx)(`strong`,{children:`7 days`})]}),(0,G.jsx)(`li`,{children:`Failure to respond will result in disqualification and selection of an alternate winner`})]}),(0,G.jsx)(`h3`,{children:`9. DATA USAGE & CONSENT (IMPORTANT – FULL COVERAGE)`}),(0,G.jsxs)(`p`,{children:[`By participating, you `,(0,G.jsx)(`strong`,{children:`explicitly agree`}),` that:`]}),(0,G.jsxs)(`p`,{children:[(0,G.jsx)(`strong`,{children:`Data Collection:`}),` We collect Name, Phone Number, Email Address, and Location.`]}),(0,G.jsxs)(`p`,{children:[(0,G.jsx)(`strong`,{children:`Usage:`}),` Your data may be used for lead generation, customer support, service communication, and marketing & promotions.`]}),(0,G.jsxs)(`p`,{children:[(0,G.jsx)(`strong`,{children:`Communication Consent:`}),` You agree to be contacted via Email, Phone calls, SMS, and WhatsApp.`]}),(0,G.jsxs)(`p`,{children:[(0,G.jsx)(`strong`,{children:`Data Protection:`}),` Your data will `,(0,G.jsx)(`strong`,{children:`NOT be sold`}),` to third parties. Data is stored securely and used internally.`]}),(0,G.jsxs)(`p`,{children:[(0,G.jsx)(`strong`,{children:`Opt-Out:`}),` You may unsubscribe anytime via email (reach@nurahub.com)`]}),(0,G.jsx)(`h3`,{children:`10. LIMITATION OF LIABILITY (CRITICAL SECTION)`}),(0,G.jsxs)(`p`,{children:[`By entering this contest, you agree that the organizer provides prizes `,(0,G.jsx)(`strong`,{children:`“as-is” without warranty`}),`. 60Plus India is `,(0,G.jsx)(`strong`,{children:`not responsible`}),` for product defects, misuse of prizes, or indirect/consequential damages.`]}),(0,G.jsxs)(`p`,{children:[(0,G.jsx)(`strong`,{children:`Full Release:`}),` You release 60Plus India from any claims, losses, damages, and legal disputes.`]}),(0,G.jsx)(`h3`,{children:`11. TECHNICAL DISCLAIMER`}),(0,G.jsx)(`p`,{children:`The organizer is not responsible for QR code failures, network issues, submission errors, or delayed entries.`}),(0,G.jsx)(`h3`,{children:`12. DISQUALIFICATION`}),(0,G.jsx)(`p`,{children:`Participants may be disqualified if they provide false/incomplete data, attempt fraud or manipulation, or violate any terms.`}),(0,G.jsx)(`h3`,{children:`13. MODIFICATION RIGHTS`}),(0,G.jsx)(`p`,{children:`60Plus India reserves the right to modify, suspend, or cancel the contest at any time without prior notice due to fraud, technical issues, or external circumstances.`}),(0,G.jsx)(`h3`,{children:`14. GOVERNING LAW`}),(0,G.jsxs)(`ul`,{children:[(0,G.jsxs)(`li`,{children:[`Governed by `,(0,G.jsx)(`strong`,{children:`laws of India`})]}),(0,G.jsxs)(`li`,{children:[`Jurisdiction: `,(0,G.jsx)(`strong`,{children:`Chennai, Tamil Nadu`})]})]}),(0,G.jsx)(`h3`,{children:`15. FINAL AGREEMENT`}),(0,G.jsx)(`p`,{children:`By participating, you confirm that:`}),(0,G.jsxs)(`ul`,{children:[(0,G.jsx)(`li`,{children:`You have read and understood these Terms`}),(0,G.jsx)(`li`,{children:`You agree to all conditions`}),(0,G.jsx)(`li`,{children:`You consent to data usage and communication`})]}),(0,G.jsx)(`p`,{className:`terms-copyright`,children:(0,G.jsx)(`strong`,{children:`© 2026 60Plus India. All rights reserved.`})})]})]})})}),(0,G.jsx)(`section`,{className:`timer-band`,"aria-labelledby":`timer-heading`,children:(0,G.jsx)(ym,{children:(0,G.jsxs)(`div`,{className:`timer-inner`,children:[(0,G.jsxs)(`p`,{id:`timer-heading`,className:`timer-label`,children:[(0,G.jsx)(Ap,{size:14,"aria-hidden":!0}),`Draw has ended`,(0,G.jsx)(Ap,{size:14,"aria-hidden":!0})]}),(0,G.jsxs)(`div`,{className:`timer-ended`,children:[(0,G.jsx)(`h3`,{children:`Entries are now closed`}),(0,G.jsxs)(`p`,{children:[`The lucky draw has ended. Winners will be announced on `,t,`.`]})]})]})})}),(0,G.jsx)(`section`,{className:`lottery-section bg-paper`,"aria-labelledby":`showcase-heading`,children:(0,G.jsx)(`div`,{className:`lottery-inner`,children:(0,G.jsx)(ym,{children:(0,G.jsxs)(`div`,{className:`show-grid`,children:[(0,G.jsx)(`div`,{className:`show-visual`,children:(0,G.jsxs)(Y.div,{className:`show-bowl`,initial:{opacity:0,y:22},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:`-60px`},transition:{duration:.65,ease:[.22,1,.36,1]},children:[(0,G.jsx)(`img`,{src:`/images/bowl.png`,alt:`Draw bowl for all entries`}),(0,G.jsx)(`span`,{children:`Ten names · one moment`})]})}),(0,G.jsxs)(`div`,{className:`show-text`,children:[(0,G.jsx)(`p`,{className:`lead font-display`,id:`showcase-heading`,children:`Made for your parents, even when you're away`}),(0,G.jsx)(`p`,{children:`These are things that help your parents in their daily life from useful devices to regular care and support. We help with everyday needs like staying on schedule, tracking health, and getting help when needed. Everything is chosen to keep them safe, comfortable, and well cared for in India.`})]})]})})})}),(0,G.jsx)(`section`,{className:`lottery-section bg-paper-2`,"aria-labelledby":`who-heading`,children:(0,G.jsxs)(`div`,{className:`lottery-inner`,children:[(0,G.jsxs)(ym,{className:`section-head center`,children:[(0,G.jsx)(`p`,{className:`section-eyebrow`,children:`Who we are`}),(0,G.jsx)(`h2`,{id:`who-heading`,className:`section-title font-display`,children:`60Plus India`}),(0,G.jsx)(`p`,{className:`section-desc`,children:`The same mission, vision, and inspiration you will read on our About page - shared here so you know who runs this draw.`})]}),(0,G.jsxs)(ym,{children:[(0,G.jsx)(`div`,{className:`who-grid`,children:cm.map((e,t)=>(0,G.jsxs)(Y.article,{className:`who-card`,variants:vm,initial:`hidden`,whileInView:`visible`,viewport:{once:!0,margin:`-40px`},custom:t,whileHover:{y:-5},children:[(0,G.jsx)(`span`,{className:`who-badge`,children:e.badge}),(0,G.jsx)(`h3`,{className:`who-title font-display`,children:e.title}),(0,G.jsx)(`p`,{className:`who-body`,children:e.content})]},e.badge))}),(0,G.jsx)(`p`,{className:`who-more`,children:(0,G.jsx)(It,{to:`/about`,children:`Read the full About Us story →`})})]})]})}),(0,G.jsx)(`section`,{className:`lottery-section section-tight bg-ink`,"aria-label":`Important dates`,children:(0,G.jsx)(`div`,{className:`lottery-inner`,children:(0,G.jsx)(ym,{children:(0,G.jsxs)(`div`,{className:`info-row`,children:[(0,G.jsxs)(Y.div,{className:`info-tile`,whileHover:{y:-5},transition:{type:`spring`,stiffness:320,damping:24},children:[(0,G.jsx)(Hf,{size:20,strokeWidth:1.75,"aria-hidden":!0}),(0,G.jsx)(`h4`,{className:`font-display`,children:`Closed on`}),(0,G.jsx)(`p`,{children:`April 27, 2026`})]}),(0,G.jsxs)(Y.div,{className:`info-tile`,whileHover:{y:-5},transition:{type:`spring`,stiffness:320,damping:24},children:[(0,G.jsx)(zf,{size:20,strokeWidth:1.75,"aria-hidden":!0}),(0,G.jsx)(`h4`,{className:`font-display`,children:`Announced on`}),(0,G.jsx)(`p`,{children:t})]}),(0,G.jsxs)(Y.div,{className:`info-tile`,whileHover:{y:-5},transition:{type:`spring`,stiffness:320,damping:24},children:[(0,G.jsx)(ap,{size:20,strokeWidth:1.75,"aria-hidden":!0}),(0,G.jsx)(`h4`,{className:`font-display`,children:`We'll write`}),(0,G.jsx)(`p`,{children:`Winners hear from us by email - check spam folders too.`})]})]})})})}),(0,G.jsx)(`section`,{id:`lottery-form`,ref:e,className:`lottery-section section-tight bg-paper`,"aria-labelledby":`form-heading`,children:(0,G.jsx)(`div`,{className:`lottery-inner form-shell`,children:(0,G.jsx)(ym,{children:(0,G.jsxs)(`div`,{className:`form-layout`,children:[(0,G.jsxs)(`aside`,{className:`form-story show-text`,"aria-label":`Why enter`,children:[(0,G.jsx)(`p`,{className:`lead font-display`,children:`60 seconds today. A better day for them tomorrow.`}),(0,G.jsx)(`p`,{children:`Even from miles away, a small step from you can make everyday life easier for your parents. This is a simple chance to bring more comfort, support, and ease into their daily routine, without taking more than a minute of your time.`})]}),(0,G.jsxs)(`div`,{className:`form-panel`,children:[(0,G.jsxs)(`h2`,{id:`form-heading`,className:`font-display`,children:[(0,G.jsx)(wp,{size:22,"aria-hidden":!0}),`Claim your spot in the draw`]}),(0,G.jsx)(`p`,{className:`form-intro`,children:`Takes less than a minute. One entry. One chance.`}),(0,G.jsxs)(`div`,{className:`form-closed-banner`,children:[(0,G.jsx)(`strong`,{children:`Entries are now closed.`}),(0,G.jsxs)(`p`,{children:[`The lucky draw has ended. Winners will be announced on `,t,`.`]})]}),(0,G.jsxs)(`form`,{onSubmit:w,children:[(0,G.jsxs)(`div`,{className:`form-grid`,children:[(0,G.jsxs)(`div`,{className:`form-group span-2`,children:[(0,G.jsx)(`label`,{children:`Participant Name *`}),(0,G.jsx)(`input`,{type:`text`,className:`form-control ${o.name?`is-invalid`:``} disabled`,placeholder:`Enter your full name`,value:i.name,onChange:e=>v(`name`,e.target.value),disabled:!0}),o.name&&(0,G.jsx)(`p`,{className:`field-error`,children:o.name})]}),(0,G.jsxs)(`div`,{className:`form-group span-2`,style:{display:`flex`,gap:`8px`},children:[(0,G.jsxs)(`div`,{style:{minWidth:`120px`},children:[(0,G.jsx)(`label`,{children:`Code *`}),(0,G.jsx)(`select`,{className:`form-control disabled`,value:i.countryCode,onChange:e=>v(`countryCode`,e.target.value),disabled:!0,children:g.map(e=>(0,G.jsx)(`option`,{value:e.value,children:e.label},e.label))})]}),(0,G.jsxs)(`div`,{style:{flex:1},children:[(0,G.jsx)(`label`,{children:`Phone Number *`}),(0,G.jsx)(`input`,{type:`tel`,className:`form-control ${o.phone?`is-invalid`:``} disabled`,placeholder:`Enter phone number`,value:i.phone,onChange:e=>v(`phone`,e.target.value),inputMode:`numeric`,disabled:!0}),o.phone&&(0,G.jsx)(`p`,{className:`field-error`,children:o.phone})]})]}),(0,G.jsxs)(`div`,{className:`form-group span-2`,children:[(0,G.jsx)(`label`,{children:`Email ID *`}),(0,G.jsx)(`input`,{type:`email`,className:`form-control ${o.email?`is-invalid`:``} disabled`,placeholder:`Enter your email`,value:i.email,onChange:e=>v(`email`,e.target.value.toLowerCase()),disabled:!0}),o.email&&(0,G.jsx)(`p`,{className:`field-error`,children:o.email})]}),(0,G.jsxs)(`div`,{className:`form-group span-2`,children:[(0,G.jsx)(`label`,{children:`Parent Location (City)`}),(0,G.jsx)(`input`,{type:`text`,className:`form-control disabled`,placeholder:`Enter city (optional)`,value:i.city,onChange:e=>v(`city`,e.target.value),disabled:!0})]})]}),S&&(0,G.jsx)(`p`,{className:`field-error`,style:{textAlign:`center`},children:S}),(0,G.jsx)(Y.button,{type:`submit`,className:`form-submit`,whileHover:{scale:1.01},whileTap:{scale:.99},disabled:!0,children:`Entries Closed`}),(0,G.jsx)(`p`,{className:`form-trust`,children:`Includes eligibility for 60Plus subscription benefit.`})]}),(0,G.jsxs)(`p`,{className:`form-foot`,children:[`By entering you accept our`,` `,(0,G.jsx)(`button`,{type:`button`,onClick:()=>h(!0),children:`Terms & Conditions`}),`.`]})]})]})})})}),(0,G.jsx)(`section`,{className:`lottery-section bg-paper-2`,"aria-labelledby":`faq-heading`,children:(0,G.jsxs)(`div`,{className:`lottery-inner`,children:[(0,G.jsxs)(ym,{className:`section-head center`,children:[(0,G.jsx)(`p`,{className:`section-eyebrow`,children:`FAQ`}),(0,G.jsx)(`h2`,{id:`faq-heading`,className:`section-title font-display`,children:`Questions about the draw`}),(0,G.jsx)(`p`,{className:`section-desc`,children:`Quick answers; official policies are linked below.`})]}),(0,G.jsx)(ym,{children:(0,G.jsx)(`div`,{className:`faq-wrap`,children:gm.map((e,t)=>{let n=u===t;return(0,G.jsxs)(Y.div,{className:`faq-item`,initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:`-40px`},transition:{delay:t*.05,duration:.5},children:[(0,G.jsxs)(`button`,{type:`button`,className:`faq-q`,"aria-expanded":n,"aria-controls":`faq-panel-${t}`,id:`faq-trigger-${t}`,onClick:()=>d(n?null:t),children:[e.question,(0,G.jsx)(Wf,{className:`faq-chevron${n?` is-open`:``}`,size:22,"aria-hidden":!0})]}),(0,G.jsx)(Y.div,{className:`faq-answer-wrap`,initial:!1,animate:{height:n?`auto`:0,opacity:+!!n},transition:{duration:.32,ease:[.22,1,.36,1]},children:(0,G.jsx)(`p`,{className:`faq-a`,id:`faq-panel-${t}`,role:`region`,"aria-labelledby":`faq-trigger-${t}`,"aria-hidden":!n,children:e.answer})})]},e.question)})})})]})}),(0,G.jsx)(Hp,{}),!f&&(0,G.jsx)(`div`,{className:`sticky-cta`,children:(0,G.jsx)(Y.button,{type:`button`,onClick:te,whileHover:{scale:1.01},whileTap:{scale:.98},children:`Join the draw`})}),c&&(0,G.jsx)(`div`,{className:`success-message`,role:`alertdialog`,"aria-modal":`true`,"aria-labelledby":`lottery-success-title`,children:(0,G.jsxs)(`div`,{className:`success-message-card`,children:[(0,G.jsx)(`div`,{className:`success-icon-wrap`,children:(0,G.jsx)(qf,{color:`#6e5633`,size:34,"aria-hidden":!0})}),(0,G.jsx)(`h3`,{id:`lottery-success-title`,className:`font-display`,children:`You're in`}),(0,G.jsxs)(`p`,{children:[`Thank you for submitting your entry. You will receive a`,` `,(0,G.jsx)(`span`,{className:`success-highlight`,children:`confirmation email`}),` from`,` `,(0,G.jsx)(`span`,{className:`success-highlight`,children:`60Plus India`}),`.`]}),(0,G.jsxs)(`p`,{children:[`Winners will be `,(0,G.jsx)(`span`,{className:`success-highlight`,children:`notified via email`}),` on`,` `,(0,G.jsx)(`span`,{className:`success-highlight`,children:t}),`.`]}),(0,G.jsx)(`button`,{type:`button`,className:`success-close-btn`,onClick:ee,children:`Got it`})]})})]})}var Sm={hidden:{opacity:0,y:36},visible:(e=0)=>({opacity:1,y:0,transition:{duration:.65,delay:e*.08,ease:[.22,1,.36,1]}})},Cm={hidden:{opacity:0,scale:.98},visible:(e=0)=>({opacity:1,scale:1,transition:{duration:.55,delay:e*.07,ease:[.22,1,.36,1]}})};function wm({children:e,custom:t=0,variants:n=Sm,className:r=``}){let i=(0,b.useRef)(null),a=bf(i,{once:!0,margin:`-72px 0px`});return(0,G.jsx)(Y.div,{ref:i,className:r,custom:t,variants:n,initial:`hidden`,animate:a?`visible`:`hidden`,children:e})}var Tm={name:``,email:``,phone:``,countryCity:``,parentsArea:``,bestTimeToCall:``,lookingFor:``,biggestConcern:``},Em={INVALID_NAME:`Please enter a valid name.`,INVALID_EMAIL:`Please enter a valid email address.`,INVALID_WHATSAPP_NUMBER:`Please enter a valid WhatsApp number with country code.`,INVALID_COUNTRY_CITY:`Please enter your country and city.`,INVALID_PARENTS_CITY:`Please enter the area where your parents live.`,INVALID_BIGGEST_CONCERN:`Your message is too long. Please shorten it.`,FAILED_TO_SUBMIT_ENTRY:`We could not save your request. Please try again.`},Dm=[{num:`01`,title:`Fill this form`,desc:`Takes 2 minutes. Tell us where your parents live in Chennai and when our team can reach you.`},{num:`02`,title:`We call you`,desc:`Our care executive calls you within 24 hours to answer your questions and confirm the visit.`},{num:`03`,title:`We visit their home`,desc:`A trained member of our team visits your parents' home in Chennai and checks every room against a thorough safety checklist.`},{num:`04`,title:`You receive a detailed report`,desc:`Within 48 hours of the visit, you receive a comprehensive assessment report with photos, identified hazards, and specific recommendations.`}],Om=[{icon:(0,G.jsx)(Zf,{size:20}),title:`Bathroom hazards`,desc:`Wet floors and missing grab bars are the leading cause of falls at home for seniors`},{icon:(0,G.jsx)(cp,{size:20}),title:`Poor lighting`,desc:`Dark corridors and stairways dramatically raise fall risk, especially at night`},{icon:(0,G.jsx)(Vf,{size:20}),title:`Loose cords and wires`,desc:`Cables stretched across the floor are invisible tripping hazards`},{icon:(0,G.jsx)(Rf,{size:20}),title:`Unsafe beds and seating`,desc:`Beds and chairs without support make getting up difficult and dangerous`},{icon:(0,G.jsx)(Xf,{size:20}),title:`Floor transitions`,desc:`Uneven surfaces and raised door thresholds cause unexpected trips every day`},{icon:(0,G.jsx)(sp,{size:20}),title:`Cluttered walkways`,desc:`Obstacles, loose rugs and stored items turn ordinary pathways into hazard zones`}],km=[{icon:(0,G.jsx)(Zf,{size:18}),text:`Bathroom: grab bars, non-slip surfaces, shower access`},{icon:(0,G.jsx)(ep,{size:18}),text:`Fall hazards: loose rugs, stairways, uneven thresholds`},{icon:(0,G.jsx)(cp,{size:18}),text:`Lighting: hallways, night lights, sensor light placement`},{icon:(0,G.jsx)(Xf,{size:18}),text:`Emergency access: exit routes, phone placement, door handles`},{icon:(0,G.jsx)(Uf,{size:18}),text:`Kitchen: gas handling, sharp object storage, reach height`},{icon:(0,G.jsx)(Ap,{size:18}),text:`Electrical: loose wiring, overloaded sockets, switch placement`}],Am=[{icon:(0,G.jsx)(Jf,{size:36}),title:`A thorough assessment report`,desc:`Room-by-room findings with photos, identified risks, and clear notes on what was observed during the visit`},{icon:(0,G.jsx)(qf,{size:36}),title:`Personalised recommendations`,desc:`Specific guidance based on your parents' health, mobility, and the actual layout of their home`},{icon:(0,G.jsx)(Op,{size:36}),title:`Access to our care team`,desc:`If you would like support implementing the changes or exploring ongoing care, our team is ready. There is no obligation`}],jm=[{icon:(0,G.jsx)(yp,{size:22}),title:`Professional and accountable`,desc:`Incubated at ITEL, backed by professional standards and a team that takes responsibility seriously.`},{icon:(0,G.jsx)(Tp,{size:22}),title:`Trained care executives`,desc:`Every member of our team is trained in elder care, safety assessment, and compassionate senior support.`},{icon:(0,G.jsx)(xp,{size:22}),title:`Regular updates for families`,desc:`NRI families stay informed with consistent updates on what is happening with their parents.`},{icon:(0,G.jsx)(op,{size:22}),title:`Tamil and English`,desc:`We speak with your parents in Tamil and coordinate with you in English. No confusion.`}],Mm=[{q:`Is this really 100% free?`,a:`Completely free. No hidden charges, no subscription required, no payment information of any kind. We offer this as a genuine service to help NRI families understand the safety situation in their parents' home.`},{q:`I am based in the USA. Can I book this for my parents in Chennai?`,a:`Yes, this is exactly who this is for. You fill the form from wherever you are in the world. Our team in Chennai coordinates directly with your parents to schedule the visit. You receive the full report by email.`},{q:`Will my parents feel comfortable with someone coming in?`,a:`Our team members are trained in elder care and approach every home visit with genuine warmth and patience. They introduce themselves properly, explain the purpose of the visit in Tamil, and work at a pace your parents are comfortable with. Their comfort is always our first priority.`},{q:`Which areas in Chennai do you cover?`,a:`We serve all major Chennai localities including T. Nagar, Velachery, Anna Nagar, Adyar, Mylapore, Nungambakkam, Porur, Tambaram, Chromepet, Sholinganallur and surrounding areas. Fill the form and our team will confirm availability for your parents' specific location.`},{q:`How long does the visit take?`,a:`The home visit typically takes 45 to 60 minutes. Our expert checks every room including the bathroom, bedroom, kitchen, living areas, stairways and emergency exits, and documents findings with photos.`},{q:`What happens after the assessment?`,a:`You receive a comprehensive safety report, typically within 48 hours of the visit. If you would like to explore our ongoing care services after the assessment, our team is happy to discuss it. There is no obligation. The assessment stands completely on its own.`}];function Nm(){qp(`Free Senior Home Safety Assessment in Chennai | 60Plus India`,`Worried about your parents living alone in Chennai? We send a trained expert to their home, check every room for safety hazards, and send you a complete report. Free for NRI families worldwide.`,`free home safety assessment Chennai, NRI parent care Chennai, senior home check Chennai, elderly safety assessment India, elder care Chennai NRI`),(0,b.useEffect)(()=>{window.scrollTo(0,0)},[]);let[e,t]=(0,b.useState)(Tm),[n,r]=(0,b.useState)({}),[i,a]=(0,b.useState)(!1),[o,s]=(0,b.useState)(!1),[c,l]=(0,b.useState)(``),[u,d]=(0,b.useState)(null),f=(0,b.useRef)(null),p=()=>{let t={};return e.name.trim()?/^[A-Za-z\s.'\-]{2,100}$/.test(e.name.trim())||(t.name=`Enter a valid name`):t.name=`Name is required`,e.email.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email)||(t.email=`Enter a valid email address`):t.email=`Email is required`,e.phone.trim()?/^\+[1-9][0-9]{6,14}$/.test(e.phone.trim().replace(/\s/g,``))||(t.phone=`Include country code e.g. +1 415 555 1234`):t.phone=`WhatsApp number is required`,e.countryCity.trim()||(t.countryCity=`Country and city is required`),e.bestTimeToCall||(t.bestTimeToCall=`Please select a time`),t},m=e=>{let{name:i,value:a}=e.target;t(e=>({...e,[i]:a})),n[i]&&r(e=>({...e,[i]:``})),c&&l(``)};return(0,G.jsxs)(`div`,{className:`bfsa`,children:[(0,G.jsx)(Tf,{alwaysWhite:!0}),(0,G.jsx)(`style`,{children:`
        /* ─── BASE ─── */
        .bfsa {
          font-family: 'Nunito Sans', sans-serif;
          background: #ffffff;
          padding-top: 76px;
        }

        /* ─── HERO ─── */
        .bfsa-hero {
          background: linear-gradient(160deg, #0d0822 0%, #1a0a2e 100%);
          padding: 88px clamp(24px, 5vw, 80px) 96px;
        }
        .bfsa-hero-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 460px; gap: 64px; align-items: start;
        }
        .bfsa-eyebrow {
          display: block; font-size: 11px; font-weight: 800;
          letter-spacing: 2px; text-transform: uppercase;
          color: #c084fc; margin-bottom: 24px;
        }
        .bfsa-hero-left h1 {
          font-family: "Gambarino", serif;
          font-size: clamp(38px, 5.2vw, 62px);
          font-weight: 500; line-height: 1.12;
          color: #ffffff; margin-bottom: 24px;
        }
        .bfsa-hero-left h1 em {
          font-style: normal; color: #c084fc;
        }
        .bfsa-hero-left > p {
          font-size: 17px; line-height: 1.8;
          color: rgba(255,255,255,0.68); max-width: 480px; margin-bottom: 32px;
        }
        .bfsa-reach {
          font-size: 13px; color: rgba(255,255,255,0.38);
          font-weight: 600; margin-bottom: 28px; display: block;
        }
        .bfsa-trust-row { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 0; }
        .bfsa-trust-pill {
          display: inline-flex; align-items: center; gap: 6px;
          border: 1px solid rgba(255,255,255,0.14);
          color: rgba(255,255,255,0.6); font-size: 12px; font-weight: 700;
          padding: 7px 14px; border-radius: 999px;
        }
        .bfsa-hero-stats {
          display: grid; grid-template-columns: repeat(3, 1fr);
          margin-top: 44px; padding-top: 36px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .bfsa-hero-stat { padding-right: 24px; }
        .bfsa-hero-stat:last-child { padding-right: 0; }
        .hero-stat-num {
          font-family: "Gambarino", serif; font-size: 38px; font-weight: 500;
          color: #ffffff; display: block; line-height: 1.1; margin-bottom: 6px;
        }
        .hero-stat-lbl {
          font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.4);
          text-transform: uppercase; letter-spacing: 0.8px; display: block;
        }

        /* ─── FORM CARD ─── */
        .bfsa-form-card {
          background: #ffffff; border-radius: 20px;
          padding: 36px 32px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.32);
          position: relative; overflow: hidden;
        }
        .bfsa-form-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #8235d0, #c084fc);
          border-radius: 20px 20px 0 0;
        }
        .bfsa-form-card h3 {
          font-family: "Gambarino", serif; font-size: 22px; font-weight: 500;
          color: #1a0a2e; margin-bottom: 4px;
        }
        .bfsa-form-card > p {
          font-size: 13px; color: rgba(26,10,46,0.48); font-weight: 600; margin-bottom: 22px;
        }
        .bfsa-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .bfsa-field { margin-bottom: 14px; }
        .bfsa-field label {
          display: block; font-size: 11px; font-weight: 800;
          color: #1a0a2e; margin-bottom: 5px;
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .bfsa-field label .opt {
          font-weight: 400; text-transform: none; letter-spacing: 0;
          color: rgba(26,10,46,0.38); font-size: 11px;
        }
        .bfsa-field input,
        .bfsa-field select,
        .bfsa-field textarea {
          width: 100%; padding: 11px 13px;
          border: 1.5px solid rgba(26,10,46,0.12);
          border-radius: 10px; font-size: 14px;
          font-family: 'Nunito Sans', sans-serif;
          color: #1a0a2e; background: #fafafa;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          box-sizing: border-box; outline: none;
          -webkit-appearance: none; appearance: none;
        }
        .bfsa-field input:focus,
        .bfsa-field select:focus,
        .bfsa-field textarea:focus {
          border-color: #8235d0; background: #fff;
          box-shadow: 0 0 0 3px rgba(130,53,208,0.09);
        }
        .bfsa-field input.err,
        .bfsa-field select.err,
        .bfsa-field textarea.err { border-color: #dc2626; background: #fff8f8; }
        .bfsa-field input::placeholder,
        .bfsa-field textarea::placeholder { color: rgba(26,10,46,0.3); }
        .bfsa-field textarea { resize: vertical; min-height: 72px; }
        .bfsa-err { font-size: 11px; color: #dc2626; margin-top: 4px; font-weight: 600; }

        .bfsa-submit {
          width: 100%; padding: 15px; margin-top: 6px;
          background: linear-gradient(94deg, #8235d0, #6925b4);
          color: #fff; font-family: 'Nunito Sans', sans-serif;
          font-size: 16px; font-weight: 800; border: none;
          border-radius: 12px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: transform 0.25s, box-shadow 0.25s;
          box-shadow: 0 4px 18px rgba(130,53,208,0.28);
        }
        .bfsa-submit:hover:not(:disabled) {
          transform: translateY(-2px); box-shadow: 0 8px 28px rgba(130,53,208,0.36);
        }
        .bfsa-submit:disabled { opacity: 0.68; cursor: not-allowed; }
        .bfsa-spin {
          width: 16px; height: 16px; border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%;
          animation: bfsaSpin 0.75s linear infinite; flex-shrink: 0;
        }
        @keyframes bfsaSpin { to { transform: rotate(360deg); } }
        .bfsa-form-footer {
          display: flex; align-items: center; justify-content: center; gap: 5px;
          font-size: 11px; color: rgba(26,10,46,0.38); font-weight: 600; margin-top: 12px;
        }
        .bfsa-api-err {
          font-size: 12px; color: #dc2626; text-align: center;
          margin-bottom: 8px; font-weight: 600;
        }

        /* ─── SECTION SHARED ─── */
        .bfsa-section { padding: 96px clamp(24px, 4vw, 64px); }
        .bfsa-section--alt { background: #F8F5FB; }
        .bfsa-section-inner { max-width: 1100px; margin: 0 auto; }
        .bfsa-section-inner--md { max-width: 960px; margin: 0 auto; }
        .bfsa-section-inner--narrow { max-width: 800px; margin: 0 auto; }
        .bfsa-tag {
          display: block; font-size: 11px; font-weight: 800;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: #8235d0; margin-bottom: 14px;
        }
        .bfsa-section h2 {
          font-family: "Gambarino", serif;
          font-size: clamp(28px, 3.5vw, 44px);
          font-weight: 500; color: #1a0a2e; line-height: 1.18;
          margin-bottom: 16px;
        }
        .bfsa-section-sub {
          font-size: 17px; color: rgba(26,10,46,0.62);
          line-height: 1.78; max-width: 580px; margin-bottom: 48px;
        }
        .bfsa-problem-header { text-align: center; margin-bottom: 52px; }
        .bfsa-problem-header .bfsa-section-sub { margin: 0 auto 28px; }

        /* ─── HOW IT WORKS ─── */
        .hiw-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 8px; margin-top: 56px;
        }
        .hiw-step { padding: 0 24px 0 0; }
        .hiw-step:last-child { padding-right: 0; }
        .hiw-num {
          font-family: "Gambarino", serif;
          font-size: 48px; font-weight: 500; line-height: 1;
          color: rgba(130,53,208,0.28); display: block; margin-bottom: 18px;
        }
        .hiw-step h4 {
          font-size: 17px; font-weight: 700; color: #1a0a2e; margin-bottom: 10px;
          line-height: 1.3;
        }
        .hiw-step p { font-size: 14px; color: rgba(26,10,46,0.6); line-height: 1.7; margin: 0; }

        /* ─── WHY THIS MATTERS ─── */
        .why-layout {
          display: grid; grid-template-columns: 420px 1fr;
          gap: 72px; align-items: start;
        }
        .why-left .bfsa-section-sub { margin-bottom: 28px; }
        .why-stats-panel {
          display: grid; grid-template-columns: 1fr 1fr;
          background: #1a0a2e; border-radius: 16px; padding: 24px;
        }
        .why-stats-panel > div { padding-right: 20px; }
        .why-stats-panel > div + div {
          padding-right: 0; padding-left: 20px;
          border-left: 1px solid rgba(255,255,255,0.1);
        }
        .why-stat-num {
          font-family: "Gambarino", serif; font-size: 28px; font-weight: 500;
          color: #c084fc; display: block; line-height: 1; margin-bottom: 6px;
        }
        .why-stat-lbl {
          font-size: 12px; font-weight: 600;
          color: rgba(255,255,255,0.58); line-height: 1.4; display: block;
        }
        .why-hazards-list { display: flex; flex-direction: column; }
        .why-hazard {
          display: flex; gap: 16px; align-items: flex-start;
          padding: 22px 0; border-bottom: 1px solid rgba(26,10,46,0.07);
        }
        .why-hazards-list > *:first-child .why-hazard { border-top: 1px solid rgba(26,10,46,0.07); }
        .why-hazard-icon {
          flex-shrink: 0; width: 40px; height: 40px; border-radius: 10px;
          background: #fff; display: flex; align-items: center; justify-content: center;
          color: #8235d0; box-shadow: 0 2px 8px rgba(26,10,46,0.08);
        }
        .why-hazard-title { font-size: 15px; font-weight: 700; color: #1a0a2e; margin-bottom: 4px; }
        .why-hazard-desc { font-size: 13px; color: rgba(26,10,46,0.55); line-height: 1.6; margin: 0; }

        /* ─── THE ASSESSMENT ─── */
        .assess-layout {
          display: grid; grid-template-columns: 360px 1fr;
          gap: 72px; align-items: start;
        }
        .assess-left .bfsa-section-sub { margin-bottom: 28px; }
        .assess-note {
          padding: 18px 20px; background: #F8F5FB;
          border-radius: 12px; border-left: 3px solid #8235d0;
        }
        .assess-note p {
          font-size: 13px; color: rgba(26,10,46,0.65);
          line-height: 1.65; margin: 0; font-weight: 600;
        }
        .assess-list { display: flex; flex-direction: column; }
        .assess-item {
          display: flex; gap: 16px; align-items: flex-start;
          padding: 22px 0; border-bottom: 1px solid rgba(26,10,46,0.07);
        }
        .assess-list > *:first-child .assess-item { border-top: 1px solid rgba(26,10,46,0.07); }
        .assess-icon {
          flex-shrink: 0; width: 40px; height: 40px; border-radius: 10px;
          background: linear-gradient(135deg, #8235d0, #6925b4);
          display: flex; align-items: center; justify-content: center; color: #fff;
        }
        .assess-room { font-size: 15px; font-weight: 700; color: #1a0a2e; margin-bottom: 3px; }
        .assess-detail { font-size: 13px; color: rgba(26,10,46,0.55); line-height: 1.55; margin: 0; }

        /* ─── WHAT YOU RECEIVE ─── */
        .outcomes-rows { display: flex; flex-direction: column; margin-top: 56px; }
        .outcome-row {
          display: grid; grid-template-columns: 60px 1fr 56px;
          gap: 28px; align-items: center; padding: 36px 0;
          border-bottom: 1px solid rgba(26,10,46,0.07);
        }
        .outcomes-rows > *:first-child .outcome-row { border-top: 1px solid rgba(26,10,46,0.07); }
        .outcome-row-icon {
          width: 60px; height: 60px; border-radius: 14px; flex-shrink: 0;
          background: #fff; display: flex; align-items: center; justify-content: center;
          color: #8235d0; box-shadow: 0 4px 16px rgba(130,53,208,0.1);
        }
        .outcome-row-title {
          font-family: "Gambarino", serif; font-size: 22px; font-weight: 500;
          color: #1a0a2e; margin-bottom: 8px; line-height: 1.2;
        }
        .outcome-row-desc {
          font-size: 15px; color: rgba(26,10,46,0.62); line-height: 1.72; margin: 0;
        }
        .outcome-row-num {
          font-family: "Gambarino", serif; font-size: 52px; font-weight: 500;
          color: rgba(130,53,208,0.13); line-height: 1; text-align: right;
          flex-shrink: 0; user-select: none;
        }

        /* ─── ABOUT ─── */
        .bfsa-about-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start;
        }
        .bfsa-about-left h2 { margin-bottom: 20px; }
        .bfsa-about-left h2 em { font-style: normal; color: #8235d0; }
        .bfsa-about-left > p {
          font-size: 16px; color: rgba(26,10,46,0.68); line-height: 1.82; margin-bottom: 16px;
        }
        .about-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 28px; }
        .about-stat {
          background: #F8F5FB; border-radius: 12px; padding: 18px 12px; text-align: center;
          border: 1px solid rgba(130,53,208,0.08);
        }
        .about-stat-num { font-size: 26px; font-weight: 800; color: #8235d0; display: block; }
        .about-stat-label { font-size: 11px; color: rgba(26,10,46,0.55); font-weight: 700; line-height: 1.4; margin-top: 4px; display: block; }
        .about-cards { display: flex; flex-direction: column; gap: 12px; }
        .about-card {
          background: #F8F5FB; border-radius: 14px; padding: 20px;
          border: 1px solid rgba(130,53,208,0.08);
          display: flex; gap: 14px; align-items: flex-start; transition: border-color 0.2s;
        }
        .about-card:hover { border-color: rgba(130,53,208,0.22); }
        .about-card-icon {
          flex-shrink: 0; width: 42px; height: 42px; border-radius: 11px;
          background: linear-gradient(135deg, #8235d0, #6925b4);
          display: flex; align-items: center; justify-content: center; color: #fff;
        }
        .about-card h4 { font-size: 15px; font-weight: 700; color: #1a0a2e; margin-bottom: 5px; }
        .about-card p { font-size: 13px; color: rgba(26,10,46,0.6); line-height: 1.6; margin: 0; }

        /* ─── FAQ ─── */
        .faq-list { display: flex; flex-direction: column; gap: 10px; margin-top: 16px; }
        .faq-item {
          border-radius: 13px; border: 1px solid rgba(26,10,46,0.08);
          overflow: hidden; transition: border-color 0.2s;
        }
        .faq-item.open { border-color: rgba(130,53,208,0.3); }
        .faq-q {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          padding: 20px 22px; background: none; border: none; cursor: pointer;
          text-align: left; font-family: 'Nunito Sans', sans-serif;
          font-size: 15px; font-weight: 700; color: #1a0a2e; gap: 16px;
          transition: color 0.2s;
        }
        .faq-item.open .faq-q { color: #8235d0; }
        .faq-chevron {
          flex-shrink: 0; color: rgba(26,10,46,0.35);
          transition: transform 0.28s ease, color 0.2s;
        }
        .faq-item.open .faq-chevron { transform: rotate(180deg); color: #8235d0; }
        .faq-a { overflow: hidden; }
        .faq-a p {
          padding: 0 22px 20px; font-size: 14px;
          color: rgba(26,10,46,0.68); line-height: 1.78; margin: 0;
        }

        /* ─── FINAL CTA ─── */
        .bfsa-cta {
          background: linear-gradient(160deg, #0d0822 0%, #1a0a2e 100%);
          padding: 96px clamp(24px, 4vw, 64px);
        }
        .bfsa-cta-inner { max-width: 640px; margin: 0 auto; text-align: center; }
        .bfsa-cta-pre {
          display: block; font-size: 11px; font-weight: 800;
          letter-spacing: 2px; text-transform: uppercase;
          color: rgba(255,255,255,0.55); margin-bottom: 20px;
        }
        .bfsa-cta h2 {
          font-family: "Gambarino", serif;
          font-size: clamp(30px, 4.5vw, 50px);
          font-weight: 500; color: #ffffff; line-height: 1.18; margin-bottom: 20px;
        }
        .bfsa-cta h2 em { font-style: normal; color: #f0daff; }
        .bfsa-cta-inner > p {
          font-size: 16px; color: rgba(255,255,255,0.75); line-height: 1.78; margin-bottom: 36px;
        }
        .bfsa-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 17px 38px; border-radius: 13px;
          background: linear-gradient(94deg, #8235d0, #6925b4);
          color: #ffffff; font-family: 'Nunito Sans', sans-serif;
          font-size: 17px; font-weight: 800; border: none; cursor: pointer;
          box-shadow: 0 8px 28px rgba(0,0,0,0.18);
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .bfsa-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(0,0,0,0.24); }
        .bfsa-cta-note {
          display: flex; align-items: center; justify-content: center; gap: 5px;
          font-size: 12px; color: rgba(255,255,255,0.5); font-weight: 600; margin-top: 16px;
        }

        /* ─── MODAL ─── */
        .bfsa-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.52);
          display: flex; align-items: center; justify-content: center; z-index: 1000;
        }
        .bfsa-modal {
          background: #fff; border-radius: 20px; padding: 48px 40px;
          max-width: 440px; width: 90%; text-align: center;
          box-shadow: 0 28px 56px rgba(0,0,0,0.18); animation: bfsaPop 0.28s ease-out;
        }
        @keyframes bfsaPop { from { opacity: 0; transform: scale(0.88) translateY(20px); } to { opacity: 1; transform: none; } }
        .bfsa-modal-check {
          width: 68px; height: 68px; border-radius: 50%; background: #f0fdf4;
          display: flex; align-items: center; justify-content: center; margin: 0 auto 22px;
        }
        .bfsa-modal-check svg { width: 30px; height: 30px; fill: #16a34a; }
        .bfsa-modal h3 {
          font-family: "Gambarino", serif; font-size: 24px; color: #1a0a2e;
          margin-bottom: 12px; font-weight: 500;
        }
        .bfsa-modal p {
          font-size: 15px; color: rgba(26,10,46,0.68); line-height: 1.72; margin-bottom: 24px;
        }
        .bfsa-modal-wa {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 22px; background: #25D366; color: #fff;
          text-decoration: none; border-radius: 11px; font-weight: 700; font-size: 14px;
          transition: background 0.2s; margin-bottom: 16px;
        }
        .bfsa-modal-wa:hover { background: #128C7E; }
        .bfsa-modal-close {
          display: block; background: #8235d0; color: #fff; border: none;
          padding: 13px 34px; border-radius: 11px; font-size: 15px; font-weight: 700;
          cursor: pointer; font-family: 'Nunito Sans', sans-serif;
          transition: background 0.2s; margin: 0 auto;
        }
        .bfsa-modal-close:hover { background: #6925b4; }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 1100px) {
          .bfsa-hero-inner { grid-template-columns: 1fr 420px; gap: 44px; }
        }
        @media (max-width: 960px) {
          .hiw-grid { grid-template-columns: repeat(2, 1fr); gap: 32px; margin-top: 40px; }
          .hiw-step { padding: 0; }
          .bfsa-about-grid { grid-template-columns: 1fr; gap: 40px; }
          .about-stats { grid-template-columns: repeat(3, 1fr); }
          .why-layout { grid-template-columns: 1fr; gap: 48px; }
          .assess-layout { grid-template-columns: 1fr; gap: 48px; }
        }
        @media (max-width: 900px) {
          .bfsa-hero-inner { grid-template-columns: 1fr; gap: 40px; }
          .bfsa-hero-left > p { max-width: 100%; }
          .bfsa-form-card { max-width: 520px; }
          .bfsa-hero-stats { grid-template-columns: repeat(3, 1fr); margin-top: 36px; }
        }
        @media (max-width: 768px) {
          .bfsa-hero { padding: 60px 20px 72px; }
          .bfsa-section { padding: 72px 20px; }
          .bfsa-form-card { padding: 28px 20px; }
          .bfsa-form-row { grid-template-columns: 1fr; }
          .hiw-grid { grid-template-columns: 1fr; gap: 28px; }
          .about-stats { grid-template-columns: 1fr; gap: 10px; }
          .bfsa-hero-stats { grid-template-columns: repeat(3, 1fr); }
          .hero-stat-num { font-size: 30px; }
          .why-stats-panel { grid-template-columns: 1fr; }
          .why-stats-panel > div + div {
            padding-left: 0; padding-top: 16px;
            border-left: none; border-top: 1px solid rgba(255,255,255,0.1);
          }
          .outcome-row { grid-template-columns: 56px 1fr; }
          .outcome-row-num { display: none; }
        }
        @media (max-width: 480px) {
          .bfsa-hero-stats { gap: 4px; }
          .bfsa-hero-stat { padding-right: 12px; }
        }
      `}),o&&(0,G.jsx)(`div`,{className:`bfsa-modal-overlay`,onClick:()=>s(!1),children:(0,G.jsxs)(`div`,{className:`bfsa-modal`,onClick:e=>e.stopPropagation(),children:[(0,G.jsx)(`div`,{className:`bfsa-modal-check`,children:(0,G.jsx)(`svg`,{viewBox:`0 0 24 24`,children:(0,G.jsx)(`path`,{d:`M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z`})})}),(0,G.jsx)(`h3`,{children:`Assessment Booked`}),(0,G.jsx)(`p`,{children:`Your request has been submitted. Our care team will call you at the time you selected to confirm the visit to your parents' home.`}),(0,G.jsx)(`div`,{children:(0,G.jsxs)(`a`,{href:`https://wa.me/919499944939?text=Hi,%20I%20just%20booked%20a%20free%20home%20safety%20assessment%20on%20your%20website.%20Please%20confirm%20the%20visit.`,target:`_blank`,rel:`noopener noreferrer`,className:`bfsa-modal-wa`,children:[(0,G.jsx)(pp,{size:16}),` Chat with us on WhatsApp`]})}),(0,G.jsx)(`button`,{className:`bfsa-modal-close`,onClick:()=>s(!1),children:`Got it, thank you`})]})}),(0,G.jsx)(`section`,{className:`bfsa-hero`,id:`bfsa-form-top`,children:(0,G.jsxs)(`div`,{className:`bfsa-hero-inner`,children:[(0,G.jsxs)(Y.div,{className:`bfsa-hero-left`,variants:Sm,initial:`hidden`,animate:`visible`,custom:0,children:[(0,G.jsx)(`span`,{className:`bfsa-eyebrow`,children:`Free Senior Home Safety Assessment`}),(0,G.jsxs)(`h1`,{children:[`You can't always be there`,(0,G.jsx)(`br`,{}),`for your parents.`,(0,G.jsx)(`br`,{}),(0,G.jsx)(`em`,{children:`We can.`})]}),(0,G.jsx)(`p`,{children:`Our care team visits your parents' home in Chennai, checks every room for safety risks, and sends you a complete report. You stay wherever you are in the world. It costs nothing.`}),(0,G.jsx)(`span`,{className:`bfsa-reach`,children:`Trusted by NRI families across the USA, UK, Canada, Singapore, UAE and the world.`}),(0,G.jsxs)(`div`,{className:`bfsa-trust-row`,children:[(0,G.jsxs)(`span`,{className:`bfsa-trust-pill`,children:[(0,G.jsx)(yp,{size:12}),` ITEL Incubated`]}),(0,G.jsxs)(`span`,{className:`bfsa-trust-pill`,children:[(0,G.jsx)(Tp,{size:12}),` Trained Experts`]}),(0,G.jsxs)(`span`,{className:`bfsa-trust-pill`,children:[(0,G.jsx)(op,{size:12}),` Tamil & English`]})]}),(0,G.jsxs)(`div`,{className:`bfsa-hero-stats`,children:[(0,G.jsxs)(`div`,{className:`bfsa-hero-stat`,children:[(0,G.jsx)(`span`,{className:`hero-stat-num`,children:`21+`}),(0,G.jsx)(`span`,{className:`hero-stat-lbl`,children:`Care Services`})]}),(0,G.jsxs)(`div`,{className:`bfsa-hero-stat`,children:[(0,G.jsx)(`span`,{className:`hero-stat-num`,children:`24/7`}),(0,G.jsx)(`span`,{className:`hero-stat-lbl`,children:`Emergency Support`})]}),(0,G.jsxs)(`div`,{className:`bfsa-hero-stat`,children:[(0,G.jsx)(`span`,{className:`hero-stat-num`,children:`100%`}),(0,G.jsx)(`span`,{className:`hero-stat-lbl`,children:`Family Transparency`})]})]})]}),(0,G.jsxs)(Y.div,{variants:Sm,initial:`hidden`,animate:`visible`,custom:1,ref:f,className:`bfsa-form-card`,children:[(0,G.jsx)(`h3`,{children:`Book the Free Assessment`}),(0,G.jsx)(`p`,{children:`Our team will call you to confirm the visit`}),(0,G.jsxs)(`form`,{onSubmit:async n=>{n.preventDefault();let i=p();if(Object.keys(i).length>0){r(i);return}a(!0),l(``);try{let n={name:e.name.trim(),emailId:e.email.trim(),whatsappNumber:e.phone.trim().replace(/\s/g,``),countryCity:e.countryCity.trim(),bestTimeToCall:e.bestTimeToCall,...e.parentsArea.trim()?{parentsCity:e.parentsArea.trim()}:{},...e.biggestConcern.trim()?{biggestConcern:e.biggestConcern.trim()}:{}},i=await fetch(`https://mobile-api.nurahub.com/v1/marketing/60plusIndia/book-free-senior-home-safety-assessment`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(n)});if(!i.ok){let e=await i.json().catch(()=>({}));l(Em[e.message]||e.message||`Server error. Please try again.`);return}let a=await i.json();a.status===`success`&&a.data?(window.gtag?.(`event`,`conversion`,{send_to:`AW-18196059485/xXgmCKSfm7YcEN2qx-RD`}),s(!0),t(Tm),r({})):l(Em[a.message]||a.message||`Something went wrong. Please try again.`)}catch(e){l(e instanceof TypeError&&e.message.includes(`fetch`)?`Network error. Please check your connection.`:`An unexpected error occurred. Please try again.`)}finally{a(!1)}},noValidate:!0,children:[(0,G.jsxs)(`div`,{className:`bfsa-form-row`,children:[(0,G.jsxs)(`div`,{className:`bfsa-field`,children:[(0,G.jsxs)(`label`,{htmlFor:`f-name`,children:[`Your name `,(0,G.jsx)(`span`,{style:{color:`#dc2626`},children:`*`})]}),(0,G.jsx)(`input`,{id:`f-name`,name:`name`,type:`text`,placeholder:`e.g. Ramesh Kumar`,value:e.name,onChange:m,className:n.name?`err`:``}),n.name&&(0,G.jsx)(`p`,{className:`bfsa-err`,children:n.name})]}),(0,G.jsxs)(`div`,{className:`bfsa-field`,children:[(0,G.jsxs)(`label`,{htmlFor:`f-email`,children:[`Email address `,(0,G.jsx)(`span`,{style:{color:`#dc2626`},children:`*`})]}),(0,G.jsx)(`input`,{id:`f-email`,name:`email`,type:`email`,placeholder:`you@example.com`,value:e.email,onChange:m,className:n.email?`err`:``}),n.email&&(0,G.jsx)(`p`,{className:`bfsa-err`,children:n.email})]})]}),(0,G.jsxs)(`div`,{className:`bfsa-form-row`,children:[(0,G.jsxs)(`div`,{className:`bfsa-field`,children:[(0,G.jsxs)(`label`,{htmlFor:`f-phone`,children:[`WhatsApp number `,(0,G.jsx)(`span`,{style:{color:`#dc2626`},children:`*`})]}),(0,G.jsx)(`input`,{id:`f-phone`,name:`phone`,type:`tel`,placeholder:`+1 415 555 1234`,value:e.phone,onChange:m,className:n.phone?`err`:``}),n.phone&&(0,G.jsx)(`p`,{className:`bfsa-err`,children:n.phone})]}),(0,G.jsxs)(`div`,{className:`bfsa-field`,children:[(0,G.jsxs)(`label`,{htmlFor:`f-country`,children:[`Your country and city `,(0,G.jsx)(`span`,{style:{color:`#dc2626`},children:`*`})]}),(0,G.jsx)(`input`,{id:`f-country`,name:`countryCity`,type:`text`,placeholder:`e.g. USA, New York`,value:e.countryCity,onChange:m,className:n.countryCity?`err`:``}),n.countryCity&&(0,G.jsx)(`p`,{className:`bfsa-err`,children:n.countryCity})]})]}),(0,G.jsxs)(`div`,{className:`bfsa-field`,children:[(0,G.jsxs)(`label`,{htmlFor:`f-area`,children:[`Where in Chennai do your parents live `,(0,G.jsx)(`span`,{className:`opt`,children:`(optional)`})]}),(0,G.jsx)(`input`,{id:`f-area`,name:`parentsArea`,type:`text`,placeholder:`e.g. Velachery, T. Nagar, Anna Nagar`,value:e.parentsArea,onChange:m})]}),(0,G.jsxs)(`div`,{className:`bfsa-field`,children:[(0,G.jsxs)(`label`,{htmlFor:`f-time`,children:[`Best time for us to call you `,(0,G.jsx)(`span`,{style:{color:`#dc2626`},children:`*`})]}),(0,G.jsxs)(`select`,{id:`f-time`,name:`bestTimeToCall`,value:e.bestTimeToCall,onChange:m,className:n.bestTimeToCall?`err`:``,children:[(0,G.jsx)(`option`,{value:``,children:`Select a time (IST)`}),(0,G.jsx)(`option`,{value:`morning`,children:`Morning`}),(0,G.jsx)(`option`,{value:`afternoon`,children:`Afternoon`}),(0,G.jsx)(`option`,{value:`evening`,children:`Evening`})]}),n.bestTimeToCall&&(0,G.jsx)(`p`,{className:`bfsa-err`,children:n.bestTimeToCall})]}),(0,G.jsxs)(`div`,{className:`bfsa-field`,children:[(0,G.jsxs)(`label`,{htmlFor:`f-concern`,children:[`Any specific concerns about your parents `,(0,G.jsx)(`span`,{className:`opt`,children:`(optional)`})]}),(0,G.jsx)(`textarea`,{id:`f-concern`,name:`biggestConcern`,placeholder:`Their mobility, health conditions, being home alone...`,value:e.biggestConcern,onChange:m})]}),c&&(0,G.jsx)(`p`,{className:`bfsa-api-err`,children:c}),(0,G.jsx)(`button`,{type:`submit`,className:`bfsa-submit`,disabled:i,children:i?(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(`span`,{className:`bfsa-spin`}),` Submitting...`]}):(0,G.jsxs)(G.Fragment,{children:[`Book My Free Assessment `,(0,G.jsx)(Lf,{size:16})]})}),(0,G.jsxs)(`p`,{className:`bfsa-form-footer`,children:[(0,G.jsx)(lp,{size:11}),` Free. No payment info needed. No commitment.`]})]})]})]})}),(0,G.jsx)(`section`,{className:`bfsa-section`,children:(0,G.jsxs)(`div`,{className:`bfsa-section-inner`,children:[(0,G.jsx)(wm,{children:(0,G.jsx)(`span`,{className:`bfsa-tag`,children:`How it works`})}),(0,G.jsx)(wm,{children:(0,G.jsx)(`h2`,{children:`Here's what happens when you fill the form`})}),(0,G.jsx)(`div`,{className:`hiw-grid`,children:Dm.map((e,t)=>(0,G.jsx)(wm,{custom:t,variants:Cm,children:(0,G.jsxs)(`div`,{className:`hiw-step`,children:[(0,G.jsx)(`span`,{className:`hiw-num`,children:e.num}),(0,G.jsx)(`h4`,{children:e.title}),(0,G.jsx)(`p`,{children:e.desc})]})},e.num))})]})}),(0,G.jsx)(`section`,{className:`bfsa-section bfsa-section--alt`,children:(0,G.jsx)(`div`,{className:`bfsa-section-inner`,children:(0,G.jsxs)(`div`,{className:`why-layout`,children:[(0,G.jsx)(wm,{custom:0,children:(0,G.jsxs)(`div`,{className:`why-left`,children:[(0,G.jsx)(`span`,{className:`bfsa-tag`,children:`Why this matters`}),(0,G.jsx)(`h2`,{children:`Most home accidents happen in rooms that look completely safe`}),(0,G.jsx)(`p`,{className:`bfsa-section-sub`,children:`You might visit once a year. The loose step near the bathroom, the slippery kitchen floor, the missing night light in the corridor — these risks are there every single day.`}),(0,G.jsxs)(`div`,{className:`why-stats-panel`,children:[(0,G.jsxs)(`div`,{children:[(0,G.jsx)(`span`,{className:`why-stat-num`,children:`1 in 3`}),(0,G.jsx)(`span`,{className:`why-stat-lbl`,children:`seniors falls at home every year`})]}),(0,G.jsxs)(`div`,{children:[(0,G.jsx)(`span`,{className:`why-stat-num`,children:`Most`}),(0,G.jsx)(`span`,{className:`why-stat-lbl`,children:`are preventable with the right assessment`})]})]})]})}),(0,G.jsx)(`div`,{className:`why-hazards-list`,children:Om.map((e,t)=>(0,G.jsx)(wm,{custom:t,children:(0,G.jsxs)(`div`,{className:`why-hazard`,children:[(0,G.jsx)(`div`,{className:`why-hazard-icon`,children:e.icon}),(0,G.jsxs)(`div`,{children:[(0,G.jsx)(`p`,{className:`why-hazard-title`,children:e.title}),(0,G.jsx)(`p`,{className:`why-hazard-desc`,children:e.desc})]})]})},e.title))})]})})}),(0,G.jsx)(`section`,{className:`bfsa-section`,children:(0,G.jsx)(`div`,{className:`bfsa-section-inner`,children:(0,G.jsxs)(`div`,{className:`assess-layout`,children:[(0,G.jsx)(wm,{custom:0,children:(0,G.jsxs)(`div`,{className:`assess-left`,children:[(0,G.jsx)(`span`,{className:`bfsa-tag`,children:`The assessment`}),(0,G.jsxs)(`h2`,{children:[`Every room.`,(0,G.jsx)(`br`,{}),`Every corner.`]}),(0,G.jsx)(`p`,{className:`bfsa-section-sub`,children:`Our trained expert arrives at your parents' home and works through a detailed room-by-room checklist — nothing is skimmed over.`}),(0,G.jsx)(`div`,{className:`assess-note`,children:(0,G.jsx)(`p`,{children:`The visit takes 45 to 60 minutes. Photos are taken throughout. You receive the complete report within 48 hours.`})})]})}),(0,G.jsx)(`div`,{className:`assess-list`,children:km.map((e,t)=>(0,G.jsx)(wm,{custom:t,children:(0,G.jsxs)(`div`,{className:`assess-item`,children:[(0,G.jsx)(`div`,{className:`assess-icon`,children:e.icon}),(0,G.jsxs)(`div`,{children:[(0,G.jsx)(`p`,{className:`assess-room`,children:e.text.split(`:`)[0]}),(0,G.jsx)(`p`,{className:`assess-detail`,children:e.text.split(`:`).slice(1).join(`:`).trim()})]})]})},e.text))})]})})}),(0,G.jsx)(`section`,{className:`bfsa-section bfsa-section--alt`,children:(0,G.jsxs)(`div`,{className:`bfsa-section-inner`,children:[(0,G.jsx)(wm,{children:(0,G.jsx)(`span`,{className:`bfsa-tag`,children:`What you receive`})}),(0,G.jsx)(wm,{children:(0,G.jsx)(`h2`,{children:`What you get after the assessment`})}),(0,G.jsx)(wm,{children:(0,G.jsx)(`p`,{className:`bfsa-section-sub`,children:`Within 48 hours of the visit, you receive everything you need to understand your parents' safety situation and take the right steps forward.`})}),(0,G.jsx)(`div`,{className:`outcomes-rows`,children:Am.map((e,t)=>(0,G.jsx)(wm,{custom:t,variants:Cm,children:(0,G.jsxs)(`div`,{className:`outcome-row`,children:[(0,G.jsx)(`div`,{className:`outcome-row-icon`,children:e.icon}),(0,G.jsxs)(`div`,{className:`outcome-row-body`,children:[(0,G.jsx)(`h4`,{className:`outcome-row-title`,children:e.title}),(0,G.jsx)(`p`,{className:`outcome-row-desc`,children:e.desc})]})]})},e.title))})]})}),(0,G.jsx)(`section`,{className:`bfsa-section`,children:(0,G.jsxs)(`div`,{className:`bfsa-section-inner`,children:[(0,G.jsx)(wm,{children:(0,G.jsx)(`span`,{className:`bfsa-tag`,children:`Who we are`})}),(0,G.jsxs)(`div`,{className:`bfsa-about-grid`,children:[(0,G.jsx)(wm,{custom:0,children:(0,G.jsxs)(`div`,{className:`bfsa-about-left`,children:[(0,G.jsxs)(`h2`,{children:[`We act as a `,(0,G.jsx)(`em`,{children:`"Professional Relative"`}),` for your parents in Chennai`]}),(0,G.jsx)(`p`,{children:`60Plus India was built because no parent should feel alone or unsafe at home, and no child abroad should feel helpless about it.`}),(0,G.jsx)(`p`,{children:`Our team is on the ground in Chennai, trained in elder care, and genuinely committed to the families we serve. We bridge the gap between your love from afar and your parents' daily reality.`}),(0,G.jsxs)(`div`,{className:`about-stats`,children:[(0,G.jsxs)(`div`,{className:`about-stat`,children:[(0,G.jsx)(`span`,{className:`about-stat-num`,children:`21+`}),(0,G.jsx)(`span`,{className:`about-stat-label`,children:`Services Offered`})]}),(0,G.jsxs)(`div`,{className:`about-stat`,children:[(0,G.jsx)(`span`,{className:`about-stat-num`,children:`24/7`}),(0,G.jsx)(`span`,{className:`about-stat-label`,children:`Emergency Support`})]}),(0,G.jsxs)(`div`,{className:`about-stat`,children:[(0,G.jsx)(`span`,{className:`about-stat-num`,children:`100%`}),(0,G.jsx)(`span`,{className:`about-stat-label`,children:`Family Transparency`})]})]})]})}),(0,G.jsx)(wm,{custom:1,children:(0,G.jsx)(`div`,{className:`about-cards`,children:jm.map(e=>(0,G.jsxs)(`div`,{className:`about-card`,children:[(0,G.jsx)(`div`,{className:`about-card-icon`,children:e.icon}),(0,G.jsxs)(`div`,{children:[(0,G.jsx)(`h4`,{children:e.title}),(0,G.jsx)(`p`,{children:e.desc})]})]},e.title))})})]})]})}),(0,G.jsx)(`section`,{className:`bfsa-cta`,children:(0,G.jsx)(wm,{variants:Cm,children:(0,G.jsxs)(`div`,{className:`bfsa-cta-inner`,children:[(0,G.jsx)(`span`,{className:`bfsa-cta-pre`,children:`Still thinking about it`}),(0,G.jsxs)(`h2`,{children:[`It takes two minutes`,(0,G.jsx)(`br`,{}),`to `,(0,G.jsx)(`em`,{children:`fill the form.`})]}),(0,G.jsx)(`p`,{children:`Our team visits your parents in Chennai, checks their home from top to bottom, and sends you a complete safety report. You don't need to travel. You don't need to arrange anything. Just fill the form.`}),(0,G.jsxs)(`button`,{className:`bfsa-cta-btn`,onClick:()=>f.current?.scrollIntoView({behavior:`smooth`,block:`center`}),children:[`Book My Free Assessment `,(0,G.jsx)(Lf,{size:17})]}),(0,G.jsxs)(`p`,{className:`bfsa-cta-note`,children:[(0,G.jsx)(lp,{size:11}),` Free. No credit card. No commitment.`]})]})})}),(0,G.jsx)(`section`,{className:`bfsa-section bfsa-section--alt`,children:(0,G.jsxs)(`div`,{className:`bfsa-section-inner--narrow`,children:[(0,G.jsx)(wm,{children:(0,G.jsx)(`span`,{className:`bfsa-tag`,children:`Your questions, answered`})}),(0,G.jsx)(wm,{children:(0,G.jsx)(`h2`,{children:`Common questions about the free assessment`})}),(0,G.jsx)(`div`,{className:`faq-list`,children:Mm.map((e,t)=>(0,G.jsx)(wm,{custom:t%2,children:(0,G.jsxs)(`div`,{className:`faq-item${u===t?` open`:``}`,children:[(0,G.jsxs)(`button`,{className:`faq-q`,onClick:()=>d(u===t?null:t),children:[(0,G.jsx)(`span`,{children:e.q}),(0,G.jsx)(Wf,{size:19,className:`faq-chevron`})]}),(0,G.jsx)(wu,{initial:!1,children:u===t&&(0,G.jsx)(Y.div,{className:`faq-a`,initial:{height:0,opacity:0},animate:{height:`auto`,opacity:1},exit:{height:0,opacity:0},transition:{duration:.26,ease:[.22,1,.36,1]},children:(0,G.jsx)(`p`,{children:e.a})})})]})},t))})]})})]})}var Pm={hidden:{opacity:0,y:48},visible:(e=0)=>({opacity:1,y:0,transition:{duration:.7,delay:e*.08,ease:[.22,1,.36,1]}})};function Fm({children:e,custom:t=0,className:n=``}){let r=(0,b.useRef)(null),i=bf(r,{once:!0,margin:`-80px 0px`});return(0,G.jsx)(Y.div,{ref:r,className:n,custom:t,variants:Pm,initial:`hidden`,animate:i?`visible`:`hidden`,children:e})}var Im={name:``,phone:``,email:``,countryCity:``,parentsArea:``,bestTimeToCall:``,biggestConcern:``,lookingFor:``};function Lm(){qp(`Enquiry | Get a Personalised Care Plan | 60 Plus India`,`Tell us about your parents and we will arrange a free, no-obligation call to discuss how we can help them live safely and happily at home.`,`elderly care enquiry, senior care Chennai, NRI parents care, enquiry form`),(0,b.useEffect)(()=>{window.scrollTo(0,0)},[]);let[e,t]=(0,b.useState)(Im),[n,r]=(0,b.useState)({}),[i,a]=(0,b.useState)(!1),[o,s]=(0,b.useState)(!1),c=()=>{let t={};return e.name.trim()||(t.name=`Name is required`),e.phone.trim()?/^[+]?[\d\s\-]{7,20}$/.test(e.phone)||(t.phone=`Enter a valid phone number with country code`):t.phone=`Phone / WhatsApp number is required`,e.email.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email)||(t.email=`Enter a valid email address`):t.email=`Email is required`,e.countryCity.trim()||(t.countryCity=`Country / city is required`),e.bestTimeToCall||(t.bestTimeToCall=`Please select a time`),t},l=e=>{let{name:i,value:a}=e.target;t(e=>({...e,[i]:a})),n[i]&&r(e=>({...e,[i]:``}))},u=async e=>{e.preventDefault();let t=c();if(Object.keys(t).length>0){r(t);return}a(!0),await new Promise(e=>setTimeout(e,1500)),a(!1),s(!0)},d=()=>{s(!1),t(Im),r({})};return(0,G.jsxs)(`section`,{className:`enquiry-page`,children:[(0,G.jsx)(Tf,{alwaysWhite:!0}),(0,G.jsx)(`style`,{children:`
        .enquiry-page {
          padding: 0; background: linear-gradient(180deg, #ffffff 0%, #f6f2ff 100%);
          font-family: 'Nunito Sans', sans-serif; padding-top: 76px; min-height: 100vh;
        }
        .enquiry-breadcrumb {
          max-width: 1200px; margin: 20px auto 10px; padding: 0 24px;
          font-size: 14px; color: rgba(26,10,46,0.65);
        }
        .enquiry-breadcrumb a { color: #8235d0; text-decoration: none; font-weight: 700; }
        .enquiry-breadcrumb a:hover { text-decoration: underline; }
        .enquiry-breadcrumb span { margin: 0 8px; color: rgba(26,10,46,0.4); }

        .enquiry-hero {
          background: linear-gradient(180deg, #ffffff 0%, #faf5ff 100%);
          padding: 70px 20px 100px; text-align: center; position: relative; overflow: visible;
        }
        .enquiry-hero::after {
          content: ""; position: absolute; bottom: -60px; left: 0; width: 100%; height: 100px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 100' preserveAspectRatio='none'%3E%3Cpath d='M0,0 Q720,100 1440,0 L1440,0 L0,0 Z' fill='%23faf5ff'/%3E%3C/svg%3E");
          background-size: 100% 100%; background-repeat: no-repeat; z-index: 0; pointer-events: none;
        }
        .enquiry-hero-inner { max-width: 700px; margin: auto; position: relative; z-index: 1; }
        .enquiry-hero h1 {
          font-family: "Gambarino", serif; font-size: clamp(34px, 5vw, 52px); font-weight: 500;
          line-height: 1.2; margin-bottom: 16px; color: #1a0a2e;
        }
        .enquiry-hero p { font-size: 18px; line-height: 1.7; color: rgba(26,10,46,0.7); max-width: 600px; margin: 0 auto; }

        .enquiry-content {
          max-width: 1100px; margin: 0 auto; padding: 60px 24px 80px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 40px; position: relative; z-index: 1; align-items: start;
        }
        .enquiry-form-card {
          background: #ffffff; border-radius: 24px; padding: 40px 36px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06); border: 1px solid rgba(0,0,0,0.05);
        }
        .enquiry-form-card h2 {
          font-family: "Gambarino", serif; font-size: 26px; font-weight: 500; color: #1a0a2e; margin-bottom: 6px;
        }
        .enquiry-form-card > p { font-size: 15px; color: rgba(26,10,46,0.65); margin-bottom: 28px; line-height: 1.6; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { margin-bottom: 18px; }
        .form-group label {
          display: block; font-size: 13px; font-weight: 700; color: #1a0a2e; margin-bottom: 6px;
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .form-group label .optional { font-weight: 400; text-transform: none; letter-spacing: 0; color: rgba(26,10,46,0.45); font-size: 12px; }
        .form-group input, .form-group textarea {
          width: 100%; padding: 13px 16px; border: 2px solid rgba(26,10,46,0.1); border-radius: 14px;
          font-size: 15px; font-family: 'Nunito Sans', sans-serif; color: #1a0a2e; background: #fafafa;
          transition: all 0.25s ease; box-sizing: border-box; outline: none;
        }
        .form-group input:focus, .form-group textarea:focus {
          border-color: #8235d0; background: #ffffff; box-shadow: 0 0 0 4px rgba(130,53,208,0.1);
        }
        .form-group input.has-error, .form-group textarea.has-error { border-color: #e53e3e; background: #fff5f5; }
        .form-group input::placeholder, .form-group textarea::placeholder { color: rgba(26,10,46,0.4); }
        .form-group textarea { resize: vertical; min-height: 90px; }
        .form-error-msg { font-size: 12px; color: #e53e3e; margin-top: 4px; font-weight: 600; }
        .radio-group { display: flex; gap: 10px; flex-wrap: wrap; }
        .radio-option { position: relative; }
        .radio-option input[type="radio"] { position: absolute; opacity: 0; width: 0; height: 0; }
        .radio-option label {
          display: inline-block; padding: 10px 20px; border: 2px solid rgba(26,10,46,0.12); border-radius: 12px;
          font-size: 14px; font-weight: 600; color: rgba(26,10,46,0.7); cursor: pointer; transition: all 0.25s ease;
          background: #fafafa; text-transform: none; letter-spacing: 0;
        }
        .radio-option input[type="radio"]:checked + label {
          border-color: #8235d0; background: rgba(130,53,208,0.08); color: #8235d0;
        }
        .radio-option label:hover { border-color: rgba(130,53,208,0.4); }
        .radio-group.has-error .radio-option label { border-color: #e53e3e; }
        .form-submit-btn {
          width: 100%; padding: 16px; border-radius: 14px; background: linear-gradient(94deg, #8235d0, #5f308e);
          color: white; font-weight: 800; font-size: 16px; font-family: 'Nunito Sans', sans-serif;
          border: none; cursor: pointer; transition: all 0.3s ease; margin-top: 8px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .form-submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(130,53,208,0.25); }
        .form-submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .loader {
          width: 18px; height: 18px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid #ffffff;
          border-radius: 50%; animation: spin 0.8s linear infinite; display: inline-block; margin-right: 10px; vertical-align: middle;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        .enquiry-info { display: flex; flex-direction: column; gap: 24px; }
        .info-card {
          background: #ffffff; border-radius: 20px; padding: 28px 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.05); transition: all 0.3s ease;
        }
        .info-card:hover { box-shadow: 0 8px 28px rgba(130,53,208,0.1); transform: translateY(-4px); }
        .info-card-badge {
          display: inline-block; background: #8235d0; color: white; padding: 5px 14px; border-radius: 999px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 16px;
        }
        .info-card h3 { font-family: "Gambarino", serif; font-size: 20px; font-weight: 500; color: #1a0a2e; margin-bottom: 16px; }
        .steps-list { display: flex; flex-direction: column; gap: 16px; }
        .step-item { display: flex; gap: 14px; align-items: flex-start; }
        .step-num {
          flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%;
          background: linear-gradient(135deg, #8235d0, #5f308e); color: white;
          display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 800;
        }
        .step-text h4 { font-size: 15px; font-weight: 700; color: #1a0a2e; margin: 0 0 2px; }
        .step-text p { font-size: 13px; color: rgba(26,10,46,0.6); margin: 0; line-height: 1.5; }
        .trust-list { display: flex; flex-direction: column; gap: 12px; }
        .trust-item { display: flex; align-items: center; gap: 12px; }
        .trust-icon {
          flex-shrink: 0; width: 36px; height: 36px; border-radius: 10px; background: rgba(130,53,208,0.08);
          display: flex; align-items: center; justify-content: center; color: #8235d0;
        }
        .trust-item p { font-size: 14px; color: #1a0a2e; margin: 0; font-weight: 600; line-height: 1.4; }
        .whatsapp-card {
          background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
          border: 1px solid rgba(34,197,94,0.2); text-align: center; padding: 28px 24px; border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05); transition: all 0.3s ease;
        }
        .whatsapp-card:hover { transform: translateY(-4px); box-shadow: 0 8px 28px rgba(34,197,94,0.15); }
        .whatsapp-card h3 { font-family: "Gambarino", serif; font-size: 20px; font-weight: 500; color: #1a0a2e; margin-bottom: 8px; }
        .whatsapp-card p { font-size: 14px; color: rgba(26,10,46,0.65); margin-bottom: 20px; line-height: 1.5; }
        .whatsapp-link {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 14px 28px;
          background: #25D366; color: white; text-decoration: none; border-radius: 14px; font-weight: 700; font-size: 15px;
          transition: all 0.25s ease; border: none; cursor: pointer;
        }
        .whatsapp-link:hover { background: #128C7E; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(37,211,102,0.3); }

        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center; z-index: 1000;
        }
        .modal-content {
          background: white; border-radius: 20px; padding: 48px; max-width: 480px; width: 90%; text-align: center;
          box-shadow: 0 25px 50px rgba(0,0,0,0.15); position: relative; animation: modalPop 0.3s ease-out;
          border: 1px solid rgba(0,0,0,0.08);
        }
        @keyframes modalPop { from { opacity: 0; transform: scale(0.8) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .modal-icon {
          width: 80px; height: 80px; border-radius: 50%; background: white; display: flex; align-items: center;
          justify-content: center; margin: 0 auto 28px; border: 2px solid #1a0a2e;
        }
        .modal-icon svg { width: 32px; height: 32px; fill: #1a0a2e; }
        .modal-title { font-family: "Gambarino", serif; font-size: 28px; color: #1a0a2e; margin-bottom: 16px; font-weight: 500; }
        .modal-message { font-size: 16px; color: rgba(26,10,46,0.75); line-height: 1.7; margin-bottom: 24px; font-weight: 400; }
        .modal-whatsapp { margin-bottom: 24px; }
        .modal-button {
          background: linear-gradient(94deg, #8235d0, #5f308e); color: white; border: none; padding: 16px 40px;
          border-radius: 12px; font-weight: 700; font-size: 16px; cursor: pointer; transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(130,53,208,0.25);
        }
        .modal-button:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(130,53,208,0.35); }

        @media (max-width: 768px) {
          .enquiry-content { grid-template-columns: 1fr; gap: 30px; padding: 40px 16px 60px; }
          .enquiry-form-card { padding: 28px 20px; }
          .form-row { grid-template-columns: 1fr; }
          .enquiry-hero { padding: 50px 16px 60px; }
          .enquiry-hero h1 { font-size: 30px; }
          .enquiry-breadcrumb { padding: 0 16px; }
          .modal-content { padding: 32px 24px; margin: 0 16px; }
          .radio-group { flex-direction: column; }
          .radio-option label { width: 100%; text-align: center; }
          .step-item { gap: 10px; }
        }
      `}),o&&(0,G.jsx)(`div`,{className:`modal-overlay`,onClick:d,children:(0,G.jsxs)(`div`,{className:`modal-content`,onClick:e=>e.stopPropagation(),children:[(0,G.jsx)(`div`,{className:`modal-icon`,children:(0,G.jsx)(`svg`,{viewBox:`0 0 24 24`,children:(0,G.jsx)(`path`,{d:`M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z`})})}),(0,G.jsx)(`h3`,{className:`modal-title`,children:`Enquiry Received!`}),(0,G.jsx)(`p`,{className:`modal-message`,children:`Thank you for reaching out. Our care team will call you at your preferred time to discuss the best care plan for your parents.`}),(0,G.jsx)(`div`,{className:`modal-whatsapp`,children:(0,G.jsx)(`a`,{href:`https://wa.me/919499944939?text=Hi,%20I%20just%20submitted%20an%20enquiry%20on%20your%20website.%20I%20would%20like%20to%20know%20more%20about%20care%20plans%20for%20my%20parents.`,target:`_blank`,rel:`noopener noreferrer`,className:`whatsapp-link`,children:`💬 Chat on WhatsApp`})}),(0,G.jsx)(`button`,{className:`modal-button`,onClick:d,children:`OK, Got it`})]})}),(0,G.jsxs)(`div`,{className:`enquiry-breadcrumb`,children:[(0,G.jsx)(It,{to:`/`,children:`Home`}),(0,G.jsx)(`span`,{children:`>`}),(0,G.jsx)(`span`,{children:`Enquiry`})]}),(0,G.jsx)(`section`,{className:`enquiry-hero`,children:(0,G.jsxs)(`div`,{className:`enquiry-hero-inner`,children:[(0,G.jsx)(Y.h1,{variants:Pm,initial:`hidden`,animate:`visible`,custom:0,children:`We'd Love to Help Your Parents`}),(0,G.jsx)(Y.p,{variants:Pm,initial:`hidden`,animate:`visible`,custom:1,children:`Tell us a little about your situation and we'll arrange a free, no-obligation call to discuss how we can help.`})]})}),(0,G.jsxs)(`div`,{className:`enquiry-content`,children:[(0,G.jsx)(Fm,{custom:0,children:(0,G.jsxs)(`div`,{className:`enquiry-form-card`,children:[(0,G.jsx)(`h2`,{children:`Tell Us About Your Parents`}),(0,G.jsx)(`p`,{children:`Fill in the details below and our care team will reach out at your preferred time.`}),(0,G.jsxs)(`form`,{onSubmit:u,noValidate:!0,children:[(0,G.jsxs)(`div`,{className:`form-row`,children:[(0,G.jsxs)(`div`,{className:`form-group`,children:[(0,G.jsxs)(`label`,{htmlFor:`name`,children:[`Your Name `,(0,G.jsx)(`span`,{style:{color:`#e53e3e`},children:`*`})]}),(0,G.jsx)(`input`,{type:`text`,id:`name`,name:`name`,placeholder:`e.g. Ramesh Kumar`,value:e.name,onChange:l,className:n.name?`has-error`:``}),n.name&&(0,G.jsx)(`p`,{className:`form-error-msg`,children:n.name})]}),(0,G.jsxs)(`div`,{className:`form-group`,children:[(0,G.jsxs)(`label`,{htmlFor:`phone`,children:[`Phone / WhatsApp `,(0,G.jsx)(`span`,{style:{color:`#e53e3e`},children:`*`})]}),(0,G.jsx)(`input`,{type:`tel`,id:`phone`,name:`phone`,placeholder:`+91 98765 43210`,value:e.phone,onChange:l,className:n.phone?`has-error`:``}),n.phone&&(0,G.jsx)(`p`,{className:`form-error-msg`,children:n.phone})]})]}),(0,G.jsxs)(`div`,{className:`form-row`,children:[(0,G.jsxs)(`div`,{className:`form-group`,children:[(0,G.jsxs)(`label`,{htmlFor:`email`,children:[`Email Address `,(0,G.jsx)(`span`,{style:{color:`#e53e3e`},children:`*`})]}),(0,G.jsx)(`input`,{type:`email`,id:`email`,name:`email`,placeholder:`e.g. ramesh@example.com`,value:e.email,onChange:l,className:n.email?`has-error`:``}),n.email&&(0,G.jsx)(`p`,{className:`form-error-msg`,children:n.email})]}),(0,G.jsxs)(`div`,{className:`form-group`,children:[(0,G.jsxs)(`label`,{htmlFor:`countryCity`,children:[`Country / City `,(0,G.jsx)(`span`,{style:{color:`#e53e3e`},children:`*`})]}),(0,G.jsx)(`input`,{type:`text`,id:`countryCity`,name:`countryCity`,placeholder:`e.g. Singapore / San Francisco`,value:e.countryCity,onChange:l,className:n.countryCity?`has-error`:``}),n.countryCity&&(0,G.jsx)(`p`,{className:`form-error-msg`,children:n.countryCity})]})]}),(0,G.jsxs)(`div`,{className:`form-group`,children:[(0,G.jsxs)(`label`,{htmlFor:`parentsArea`,children:[`Which area of Chennai do your parents live in? `,(0,G.jsx)(`span`,{className:`optional`,children:`(Optional)`})]}),(0,G.jsx)(`input`,{type:`text`,id:`parentsArea`,name:`parentsArea`,placeholder:`e.g. Velachery, T. Nagar, Anna Nagar`,value:e.parentsArea,onChange:l})]}),(0,G.jsxs)(`div`,{className:`form-group`,children:[(0,G.jsxs)(`label`,{children:[`Best Time to Call You `,(0,G.jsx)(`span`,{style:{color:`#e53e3e`},children:`*`})]}),(0,G.jsx)(`div`,{className:`radio-group ${n.bestTimeToCall?`has-error`:``}`,children:[`Morning`,`Afternoon`,`Evening`].map(i=>(0,G.jsxs)(`div`,{className:`radio-option`,children:[(0,G.jsx)(`input`,{type:`radio`,id:`time-${i}`,name:`bestTimeToCall`,value:i,checked:e.bestTimeToCall===i,onChange:e=>{t(t=>({...t,bestTimeToCall:e.target.value})),n.bestTimeToCall&&r(e=>({...e,bestTimeToCall:``}))}}),(0,G.jsx)(`label`,{htmlFor:`time-${i}`,children:i})]},i))}),n.bestTimeToCall&&(0,G.jsx)(`p`,{className:`form-error-msg`,children:n.bestTimeToCall})]}),(0,G.jsxs)(`div`,{className:`form-group`,children:[(0,G.jsxs)(`label`,{htmlFor:`biggestConcern`,children:[`What is your biggest concern about your parents? `,(0,G.jsx)(`span`,{className:`optional`,children:`(Optional)`})]}),(0,G.jsx)(`textarea`,{id:`biggestConcern`,name:`biggestConcern`,placeholder:`e.g. They live alone and I worry about their health and safety...`,value:e.biggestConcern,onChange:l})]}),(0,G.jsxs)(`div`,{className:`form-group`,children:[(0,G.jsxs)(`label`,{children:[`What are you looking for? `,(0,G.jsx)(`span`,{className:`optional`,children:`(Optional)`})]}),(0,G.jsx)(`div`,{className:`radio-group`,children:[{v:`Full managed care`,l:`Full Managed Care`},{v:`Occasional help`,l:`Occasional Help`},{v:`Just exploring`,l:`Just Exploring`}].map(n=>(0,G.jsxs)(`div`,{className:`radio-option`,children:[(0,G.jsx)(`input`,{type:`radio`,id:`look-${n.v}`,name:`lookingFor`,value:n.v,checked:e.lookingFor===n.v,onChange:e=>t(t=>({...t,lookingFor:e.target.value}))}),(0,G.jsx)(`label`,{htmlFor:`look-${n.v}`,children:n.l})]},n.v))})]}),(0,G.jsx)(`button`,{type:`submit`,className:`form-submit-btn`,disabled:i,children:i?(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(`span`,{className:`loader`}),`Submitting...`]}):`Request a Callback`})]})]})}),(0,G.jsxs)(`div`,{className:`enquiry-info`,children:[(0,G.jsx)(Fm,{custom:1,children:(0,G.jsxs)(`div`,{className:`info-card`,children:[(0,G.jsx)(`span`,{className:`info-card-badge`,children:`What Happens Next`}),(0,G.jsx)(`h3`,{children:`A Simple 3-Step Process`}),(0,G.jsxs)(`div`,{className:`steps-list`,children:[(0,G.jsxs)(`div`,{className:`step-item`,children:[(0,G.jsx)(`div`,{className:`step-num`,children:`1`}),(0,G.jsxs)(`div`,{className:`step-text`,children:[(0,G.jsx)(`h4`,{children:`We Call You`}),(0,G.jsx)(`p`,{children:`Our care team calls you at your preferred time to understand your needs.`})]})]}),(0,G.jsxs)(`div`,{className:`step-item`,children:[(0,G.jsx)(`div`,{className:`step-num`,children:`2`}),(0,G.jsxs)(`div`,{className:`step-text`,children:[(0,G.jsx)(`h4`,{children:`We Understand`}),(0,G.jsx)(`p`,{children:`We learn about your parents' health, daily routine, and what matters most to them.`})]})]}),(0,G.jsxs)(`div`,{className:`step-item`,children:[(0,G.jsx)(`div`,{className:`step-num`,children:`3`}),(0,G.jsxs)(`div`,{className:`step-text`,children:[(0,G.jsx)(`h4`,{children:`We Create a Plan`}),(0,G.jsx)(`p`,{children:`A personalised care plan is designed — no pressure, no obligation.`})]})]})]})]})}),(0,G.jsx)(Fm,{custom:2,children:(0,G.jsxs)(`div`,{className:`info-card`,children:[(0,G.jsx)(`span`,{className:`info-card-badge`,children:`Trusted by Families`}),(0,G.jsx)(`h3`,{children:`Why NRIs & Families Choose Us`}),(0,G.jsxs)(`div`,{className:`trust-list`,children:[(0,G.jsxs)(`div`,{className:`trust-item`,children:[(0,G.jsx)(`div`,{className:`trust-icon`,children:`🛡️`}),(0,G.jsx)(`p`,{children:`Incubated at ITEL — trusted by families`})]}),(0,G.jsxs)(`div`,{className:`trust-item`,children:[(0,G.jsx)(`div`,{className:`trust-icon`,children:`👨‍⚕️`}),(0,G.jsx)(`p`,{children:`21 comprehensive services in one plan`})]}),(0,G.jsxs)(`div`,{className:`trust-item`,children:[(0,G.jsx)(`div`,{className:`trust-icon`,children:`📋`}),(0,G.jsx)(`p`,{children:`Dedicated care manager for your parents`})]}),(0,G.jsxs)(`div`,{className:`trust-item`,children:[(0,G.jsx)(`div`,{className:`trust-icon`,children:`⏰`}),(0,G.jsx)(`p`,{children:`24/7 emergency support, always available`})]})]})]})}),(0,G.jsx)(Fm,{custom:3,children:(0,G.jsxs)(`div`,{className:`whatsapp-card`,children:[(0,G.jsx)(`h3`,{children:`Prefer WhatsApp?`}),(0,G.jsx)(`p`,{children:`Skip the form and chat with us directly. We respond within minutes.`}),(0,G.jsx)(`a`,{href:`https://wa.me/919499944939?text=Hi,%20I%20would%20like%20to%20enquire%20about%20care%20services%20for%20my%20parents.`,target:`_blank`,rel:`noopener noreferrer`,className:`whatsapp-link`,children:`💬 Chat with Us Now`})]})})]})]})]})}var Rm={hidden:{opacity:0,y:24},visible:(e=0)=>({opacity:1,y:0,transition:{duration:.6,delay:e*.07,ease:[.22,1,.36,1]}})};function zm({children:e,className:t=``,custom:n=0}){let r=(0,b.useRef)(null),i=bf(r,{once:!0,margin:`-60px 0px`});return(0,G.jsx)(Y.div,{ref:r,className:t,custom:n,variants:Rm,initial:`hidden`,animate:i?`visible`:`hidden`,children:e})}var Bm=[{n:`01`,title:`Skyrocketing depression rates`,desc:`Research indicates that roughly 30% of nursing home residents suffer from clinical depression — more than three times higher than older adults living in their own community setting. The institutional environment, lack of familiar stimuli, and loss of purpose are the primary drivers.`},{n:`02`,title:`The isolation epidemic`,desc:`The WHO notes that social isolation and loneliness affect about 1 in 4 older people and serves as a primary trigger for cognitive decline. India's Longitudinal Ageing Study (LASI) found that living arrangements are a predominant predictor of life satisfaction. Uprooting an elder severs ties with their neighborhood, shopkeepers, and familiar routines — and replaces them with a room full of strangers.`},{n:`03`,title:`Loss of dignity and autonomy`,desc:`In a facility, elders adapt to an institutional schedule — eating, sleeping, and socializing when the facility dictates. Psychological studies link loss of autonomy directly to feelings of helplessness and diminished self-worth. For a person who has lived independently for six or seven decades, this is not a minor inconvenience. It is a systematic erosion of identity.`},{n:`04`,title:`Depersonalized, one-to-many care`,desc:`Even in well-run old age homes, care is structured on a one-to-many ratio. Understaffing is a global issue in elder care, meaning residents often wait for basic assistance. Your parent — a person with decades of stories, preferences, and personality — becomes one of many. That loss of individual recognition has measurable psychological consequences.`}],Vm=[{n:`01`,title:`Preserving autonomy and dignity`,desc:`Autonomy is the cornerstone of psychological health in aging. By staying at home, elders maintain control over their daily routines. They eat what they want, when they want, and retain ownership of their space. This continuous sense of independence drastically lowers the risk of clinical depression.`},{n:`02`,title:`1-on-1 individualized attention`,desc:`Unlike a facility where a nurse monitors a dozen residents, at-home care provides a 1-to-1 caregiver-to-patient ratio. This ensures immediate response times, personalized companionship, and care plans customized entirely to the elder's specific physical and emotional needs.`},{n:`03`,title:`Maintaining community connections`,desc:`Aging in place allows elders to remain tethered to their identity. They receive visits from familiar friends, attend their local temple or church, and sit on the porch they have known for decades. The WHO identifies these familiar social connections as vital for mental health, stress reduction, and ultimately extending lifespan.`},{n:`04`,title:`Reduced risk of facility-acquired infections`,desc:`Communal living environments are breeding grounds for infectious diseases due to close quarters. Aging at home significantly limits exposure to hospital-acquired infections and seasonal viruses — a particularly important consideration for seniors with compromised immunity.`}],Hm=[{title:`Free home safety assessment`,desc:`Our trained experts physically visit the home in Chennai, check every room against a comprehensive safety checklist, and deliver a detailed report to the family. The assessment is completely free and requires no commitment.`},{title:`24/7 emergency support`,desc:`Our platform provides round-the-clock emergency response — immediate escalation, coordination with local hospitals, and real-time updates to family members anywhere in the world. Your parents are never truly alone.`},{title:`Regular updates for NRI families`,desc:`NRI families stay informed through consistent updates on their parents' day-to-day wellbeing — without needing to be physically present. We bridge the distance between your love from abroad and their daily reality in Chennai.`}];function Um(){let e=Qe();qp(`Why Old Age Homes Harm Your Parents More Than You Think | 60Plus India`,`Research shows 30% of old age home residents suffer from depression — 3× higher than at-home seniors. See how in-home elder care in Chennai preserves your parents' dignity and mental health.`,`old age homes Chennai, old age home effects, nursing home India, elder care at home Chennai, aging in place India, NRI parent care, senior home safety Chennai`),(0,b.useEffect)(()=>{window.scrollTo(0,0);let e=document.createElement(`script`);return e.type=`application/ld+json`,e.text=JSON.stringify({"@context":`https://schema.org`,"@type":`Article`,headline:`Why Old Age Homes Affect Your Parents Psychologically — What the Data Shows`,description:`Research shows 30% of nursing home residents suffer from depression — 3× higher than seniors aging in place. A data-driven look at institutional care vs at-home elder care.`,author:{"@type":`Organization`,name:`60Plus India`},publisher:{"@type":`Organization`,name:`60Plus India`,logo:{"@type":`ImageObject`,url:`https://www.60plusindia.com/logo/60_plus_india.png`}},datePublished:`2026-05-31`,dateModified:`2026-05-31`,url:`https://www.60plusindia.com/blogs/how-old-age-affects-seniors`,mainEntityOfPage:{"@type":`WebPage`,"@id":`https://www.60plusindia.com/blogs/how-old-age-affects-seniors`},keywords:`old age homes, elder care Chennai, nursing home India, aging in place`}),document.head.appendChild(e),()=>{try{document.head.removeChild(e)}catch{}}},[]);let t=()=>e(`/book-free-senior-home-safety-assessment`);return(0,G.jsxs)(`div`,{className:`blg`,children:[(0,G.jsx)(Tf,{alwaysWhite:!0}),(0,G.jsx)(`style`,{children:`
        .blg {
          font-family: 'Nunito Sans', sans-serif;
          background: #ffffff;
          padding-top: 76px;
        }

        /* ─── HERO ─── */
        .blg-hero {
          background: linear-gradient(160deg, #0d0822 0%, #1a0a2e 100%);
          padding: 72px clamp(24px, 5vw, 80px) 88px;
        }
        .blg-hero-inner { max-width: 860px; margin: 0 auto; }
        .blg-eyebrow {
          display: inline-block;
          background: rgba(130,53,208,0.22); border: 1px solid rgba(130,53,208,0.35);
          color: #c084fc; font-size: 11px; font-weight: 800;
          letter-spacing: 1.5px; text-transform: uppercase;
          padding: 6px 14px; border-radius: 999px; margin-bottom: 26px;
        }
        .blg-hero h1 {
          font-family: "Gambarino", serif;
          font-size: clamp(28px, 4.2vw, 52px);
          font-weight: 500; color: #ffffff; line-height: 1.18; margin-bottom: 22px;
        }
        .blg-hero h1 em { font-style: normal; color: #c084fc; }
        .blg-hero-sub {
          font-size: 18px; color: rgba(255,255,255,0.65);
          line-height: 1.78; margin-bottom: 36px; max-width: 680px;
        }
        .blg-meta {
          display: flex; align-items: center; gap: 22px; flex-wrap: wrap;
          font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.36);
        }
        .blg-meta-item { display: flex; align-items: center; gap: 6px; }

        /* ─── BODY LAYOUT ─── */
        .blg-body { padding: 72px clamp(24px, 4vw, 64px); }
        .blg-layout {
          max-width: 1060px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 300px; gap: 56px; align-items: start;
        }

        /* ─── ARTICLE ─── */
        .blg-article { min-width: 0; }
        .blg-prose p {
          font-size: 17px; line-height: 1.88;
          color: rgba(26,10,46,0.75); margin-bottom: 22px;
        }
        .blg-prose p:last-child { margin-bottom: 0; }
        .blg-prose strong { font-weight: 700; color: #1a0a2e; }
        .blg-article h2 {
          font-family: "Gambarino", serif;
          font-size: clamp(22px, 2.6vw, 32px);
          font-weight: 500; color: #1a0a2e; line-height: 1.22;
          margin-top: 0; margin-bottom: 18px;
        }
        .blg-section-tag {
          display: block; font-size: 11px; font-weight: 800;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: #8235d0; margin-bottom: 10px;
        }
        .blg-divider {
          border: none; border-top: 1px solid rgba(26,10,46,0.08); margin: 56px 0;
        }

        /* Key stats strip */
        .blg-stats-strip {
          background: linear-gradient(160deg, #0d0822 0%, #1a0a2e 100%);
          border-radius: 20px; padding: 36px 32px;
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 0;
          margin: 40px 0;
        }
        .blg-stat {
          padding: 0 28px 0 0;
          border-right: 1px solid rgba(255,255,255,0.08);
        }
        .blg-stat + .blg-stat { padding-left: 28px; }
        .blg-stat:last-child { border-right: none; }
        .blg-stat-num {
          font-family: "Gambarino", serif; font-size: 34px; font-weight: 500;
          color: #c084fc; display: block; line-height: 1.1; margin-bottom: 8px;
        }
        .blg-stat-label {
          font-size: 12px; font-weight: 600;
          color: rgba(255,255,255,0.55); line-height: 1.55; display: block;
        }

        /* Problem points */
        .blg-points { display: flex; flex-direction: column; margin-top: 8px; }
        .blg-point {
          display: flex; gap: 20px; align-items: flex-start;
          padding: 24px 0; border-bottom: 1px solid rgba(26,10,46,0.07);
        }
        .blg-points > .blg-point:first-child { border-top: 1px solid rgba(26,10,46,0.07); }
        .blg-point-num {
          font-family: "Gambarino", serif; font-size: 36px; font-weight: 500;
          color: rgba(130,53,208,0.2); line-height: 1; flex-shrink: 0; width: 40px;
          margin-top: 2px;
        }
        .blg-point-title {
          font-size: 16px; font-weight: 700; color: #1a0a2e; margin-bottom: 7px;
        }
        .blg-point-desc {
          font-size: 15px; color: rgba(26,10,46,0.65); line-height: 1.75; margin: 0;
        }

        /* Inline CTA */
        .blg-inline-cta {
          background: #F8F5FB; border-radius: 16px;
          padding: 26px 28px; margin: 44px 0;
          display: flex; align-items: center; justify-content: space-between; gap: 20px;
          border: 1px solid rgba(130,53,208,0.1);
        }
        .blg-inline-cta-text { font-size: 16px; font-weight: 700; color: #1a0a2e; margin: 0; line-height: 1.4; }
        .blg-inline-cta-sub { font-size: 13px; font-weight: 400; color: rgba(26,10,46,0.58); display: block; margin-top: 4px; }
        .blg-inline-btn {
          flex-shrink: 0; display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 22px; background: linear-gradient(94deg, #8235d0, #6925b4);
          color: #fff; font-size: 14px; font-weight: 800; font-family: 'Nunito Sans', sans-serif;
          border: none; border-radius: 10px; cursor: pointer; white-space: nowrap;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 14px rgba(130,53,208,0.26);
        }
        .blg-inline-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(130,53,208,0.34); }

        /* Solution points */
        .blg-solutions { display: flex; flex-direction: column; gap: 36px; margin-top: 8px; }
        .blg-solution-num {
          font-family: "Gambarino", serif; font-size: 13px; font-weight: 500;
          color: #8235d0; display: block; margin-bottom: 5px;
        }
        .blg-solution h3 {
          font-size: 18px; font-weight: 700; color: #1a0a2e; margin-bottom: 10px; line-height: 1.3;
        }
        .blg-solution-desc {
          font-size: 16px; color: rgba(26,10,46,0.68); line-height: 1.8; margin: 0;
        }

        /* Advantage items */
        .blg-advantages { display: flex; flex-direction: column; gap: 0; margin-top: 8px; }
        .blg-advantage {
          padding: 24px 0; border-bottom: 1px solid rgba(26,10,46,0.07);
        }
        .blg-advantages > .blg-advantage:first-child { border-top: 1px solid rgba(26,10,46,0.07); }
        .blg-advantage h3 {
          font-size: 16px; font-weight: 700; color: #1a0a2e; margin-bottom: 7px;
        }
        .blg-advantage-desc {
          font-size: 15px; color: rgba(26,10,46,0.65); line-height: 1.75; margin: 0;
        }

        /* ─── SIDEBAR ─── */
        .blg-sidebar { position: sticky; top: 96px; }
        .blg-cta-card {
          background: #ffffff; border-radius: 20px; padding: 28px 24px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.09);
          border: 1px solid rgba(26,10,46,0.07);
          position: relative; overflow: hidden;
        }
        .blg-cta-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #8235d0, #c084fc);
        }
        .blg-cta-card h3 {
          font-family: "Gambarino", serif; font-size: 20px; font-weight: 500;
          color: #1a0a2e; margin-bottom: 10px; line-height: 1.28;
        }
        .blg-cta-card-sub {
          font-size: 14px; color: rgba(26,10,46,0.6); line-height: 1.65; margin-bottom: 22px;
        }
        .blg-cta-card-btn {
          width: 100%; padding: 14px;
          background: linear-gradient(94deg, #8235d0, #6925b4);
          color: #fff; font-family: 'Nunito Sans', sans-serif;
          font-size: 15px; font-weight: 800; border: none; border-radius: 11px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 18px rgba(130,53,208,0.28);
        }
        .blg-cta-card-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(130,53,208,0.35); }
        .blg-cta-card-note {
          display: flex; align-items: center; justify-content: center; gap: 5px;
          font-size: 11px; color: rgba(26,10,46,0.36); font-weight: 600; margin-top: 10px;
        }
        .blg-sidebar-context {
          margin-top: 16px; background: #F8F5FB; border-radius: 14px; padding: 18px;
          border: 1px solid rgba(130,53,208,0.07);
        }
        .blg-sidebar-context p {
          font-size: 12px; color: rgba(26,10,46,0.55); line-height: 1.65; margin: 0;
        }
        .blg-sidebar-context strong { color: #1a0a2e; font-weight: 700; }

        /* ─── FINAL CTA ─── */
        .blg-final-cta {
          background: linear-gradient(160deg, #0d0822 0%, #1a0a2e 100%);
          padding: 88px clamp(24px, 4vw, 64px);
          text-align: center;
        }
        .blg-final-cta-inner { max-width: 600px; margin: 0 auto; }
        .blg-final-pre {
          display: block; font-size: 11px; font-weight: 800;
          letter-spacing: 2px; text-transform: uppercase;
          color: rgba(255,255,255,0.4); margin-bottom: 18px;
        }
        .blg-final-cta h2 {
          font-family: "Gambarino", serif;
          font-size: clamp(26px, 3.8vw, 46px);
          font-weight: 500; color: #ffffff; line-height: 1.18; margin-bottom: 18px;
        }
        .blg-final-cta h2 em { font-style: normal; color: #c084fc; }
        .blg-final-sub {
          font-size: 16px; color: rgba(255,255,255,0.62); line-height: 1.78; margin-bottom: 34px;
        }
        .blg-final-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 36px; border-radius: 12px;
          background: linear-gradient(94deg, #8235d0, #6925b4);
          color: #fff; font-family: 'Nunito Sans', sans-serif;
          font-size: 16px; font-weight: 800; border: none; cursor: pointer;
          box-shadow: 0 8px 28px rgba(130,53,208,0.36);
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .blg-final-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(130,53,208,0.44); }
        .blg-final-note {
          display: flex; align-items: center; justify-content: center; gap: 5px;
          font-size: 12px; color: rgba(255,255,255,0.38); font-weight: 600; margin-top: 14px;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 900px) {
          .blg-layout { grid-template-columns: 1fr; gap: 0; }
          .blg-sidebar { position: static; margin-top: 48px; }
          .blg-stats-strip { grid-template-columns: 1fr; gap: 0; }
          .blg-stat {
            padding: 18px 0; border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
          .blg-stat + .blg-stat { padding-left: 0; }
          .blg-stat:last-child { border-bottom: none; padding-bottom: 0; }
        }
        @media (max-width: 600px) {
          .blg-inline-cta { flex-direction: column; align-items: flex-start; }
          .blg-inline-btn { width: 100%; justify-content: center; }
        }
      `}),(0,G.jsx)(`section`,{className:`blg-hero`,children:(0,G.jsx)(`div`,{className:`blg-hero-inner`,children:(0,G.jsxs)(Y.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.65,ease:[.22,1,.36,1]},children:[(0,G.jsx)(`span`,{className:`blg-eyebrow`,children:`Senior Care Research`}),(0,G.jsxs)(`h1`,{children:[`Why Old Age Homes Affect`,(0,G.jsx)(`br`,{}),`Your Parents More Than `,(0,G.jsx)(`em`,{children:`You Think`})]}),(0,G.jsx)(`p`,{className:`blg-hero-sub`,children:`A data-driven look at how institutional care impacts elder mental health, dignity, and identity — and how aging in place at home changes everything.`}),(0,G.jsxs)(`div`,{className:`blg-meta`,children:[(0,G.jsxs)(`span`,{className:`blg-meta-item`,children:[(0,G.jsx)(Hf,{size:13}),` May 2026`]}),(0,G.jsxs)(`span`,{className:`blg-meta-item`,children:[(0,G.jsx)(Yf,{size:13}),` 6 min read`]}),(0,G.jsx)(`span`,{className:`blg-meta-item`,children:`By 60Plus India Research Team`})]})]})})}),(0,G.jsx)(`div`,{className:`blg-body`,children:(0,G.jsxs)(`div`,{className:`blg-layout`,children:[(0,G.jsxs)(`article`,{className:`blg-article`,children:[(0,G.jsx)(zm,{children:(0,G.jsxs)(`div`,{className:`blg-prose`,children:[(0,G.jsx)(`p`,{children:`Deciding how to care for aging parents is one of the most emotionally heavy choices a family can make. Your goal — keeping them safe while preserving their happiness — is exactly what the data supports.`}),(0,G.jsx)(`p`,{children:`The research paints a stark contrast between the psychological outcomes of institutionalized care in old age homes and aging in place. When elders are removed from their familiar environments, the impact on their mental health, dignity, and sense of identity can be severe and lasting.`})]})}),(0,G.jsx)(zm,{children:(0,G.jsxs)(`div`,{className:`blg-stats-strip`,children:[(0,G.jsxs)(`div`,{className:`blg-stat`,children:[(0,G.jsx)(`span`,{className:`blg-stat-num`,children:`30%`}),(0,G.jsx)(`span`,{className:`blg-stat-label`,children:`of nursing home residents suffer from clinical depression`})]}),(0,G.jsxs)(`div`,{className:`blg-stat`,children:[(0,G.jsx)(`span`,{className:`blg-stat-num`,children:`3×`}),(0,G.jsx)(`span`,{className:`blg-stat-label`,children:`higher depression rates in institutional care vs community living`})]}),(0,G.jsxs)(`div`,{className:`blg-stat`,children:[(0,G.jsx)(`span`,{className:`blg-stat-num`,children:`1 in 4`}),(0,G.jsx)(`span`,{className:`blg-stat-label`,children:`older adults affected by isolation, per WHO — a leading cause of cognitive decline`})]})]})}),(0,G.jsxs)(zm,{children:[(0,G.jsx)(`span`,{className:`blg-section-tag`,children:`The research`}),(0,G.jsx)(`h2`,{children:`The Reality of Institutional Care`}),(0,G.jsx)(`div`,{className:`blg-prose`,children:(0,G.jsx)(`p`,{children:`While old age homes provide physical safety, the institutional model often inadvertently compromises an elder's psychological well-being. Here is what the research actually shows.`})})]}),(0,G.jsx)(`div`,{className:`blg-points`,children:Bm.map((e,t)=>(0,G.jsx)(zm,{custom:t,children:(0,G.jsxs)(`div`,{className:`blg-point`,children:[(0,G.jsx)(`span`,{className:`blg-point-num`,children:e.n}),(0,G.jsxs)(`div`,{children:[(0,G.jsx)(`p`,{className:`blg-point-title`,children:e.title}),(0,G.jsx)(`p`,{className:`blg-point-desc`,children:e.desc})]})]})},e.n))}),(0,G.jsx)(zm,{children:(0,G.jsxs)(`div`,{className:`blg-inline-cta`,children:[(0,G.jsxs)(`div`,{children:[(0,G.jsx)(`p`,{className:`blg-inline-cta-text`,children:`Is your parents' home in Chennai safe enough to age in?`}),(0,G.jsx)(`span`,{className:`blg-inline-cta-sub`,children:`Our expert visits their home, checks every room, and sends you a complete safety report — for free.`})]}),(0,G.jsxs)(`button`,{className:`blg-inline-btn`,onClick:t,children:[`Book Free Assessment `,(0,G.jsx)(Lf,{size:15})]})]})}),(0,G.jsx)(`hr`,{className:`blg-divider`}),(0,G.jsxs)(zm,{children:[(0,G.jsx)(`span`,{className:`blg-section-tag`,children:`The solution`}),(0,G.jsx)(`h2`,{children:`How At-Home Care Prevents Cognitive and Emotional Decline`}),(0,G.jsx)(`div`,{className:`blg-prose`,children:(0,G.jsxs)(`p`,{children:[`Providing the medical and structural benefits of an old age home inside the elder's actual home — which is the core mission of `,(0,G.jsx)(`strong`,{children:`60plusindia.com`}),` — directly counteracts these negative outcomes. Here is how each dimension of the problem is addressed.`]})})]}),(0,G.jsx)(`div`,{className:`blg-solutions`,children:Vm.map((e,t)=>(0,G.jsx)(zm,{custom:t,children:(0,G.jsxs)(`div`,{children:[(0,G.jsx)(`span`,{className:`blg-solution-num`,children:e.n}),(0,G.jsx)(`h3`,{style:{fontSize:18,fontWeight:700,color:`#1a0a2e`,marginBottom:10,lineHeight:1.3},children:e.title}),(0,G.jsx)(`p`,{className:`blg-solution-desc`,children:e.desc})]})},e.n))}),(0,G.jsx)(`hr`,{className:`blg-divider`}),(0,G.jsxs)(zm,{children:[(0,G.jsx)(`span`,{className:`blg-section-tag`,children:`The 60Plus India approach`}),(0,G.jsx)(`h2`,{children:`Bringing Professional Care Into the Home`}),(0,G.jsxs)(`div`,{className:`blg-prose`,children:[(0,G.jsx)(`p`,{children:`Many families default to old age homes because they fear they cannot manage their parents' medical emergencies or daily physical needs alone. This is the exact gap that services like 60Plus India are built to fill.`}),(0,G.jsx)(`p`,{children:`By bringing professional caregiving, medical monitoring, and emergency response infrastructure directly into the home, families can give their parents the best of both worlds — the safety and professionalism of institutional care, with the dignity and warmth of being home.`})]})]}),(0,G.jsx)(`div`,{className:`blg-advantages`,children:Hm.map((e,t)=>(0,G.jsx)(zm,{custom:t,children:(0,G.jsxs)(`div`,{className:`blg-advantage`,children:[(0,G.jsx)(`h3`,{children:e.title}),(0,G.jsx)(`p`,{className:`blg-advantage-desc`,children:e.desc})]})},e.title))})]}),(0,G.jsxs)(`aside`,{className:`blg-sidebar`,children:[(0,G.jsx)(zm,{children:(0,G.jsxs)(`div`,{className:`blg-cta-card`,children:[(0,G.jsx)(`h3`,{children:`Is your parents' home safe to age in?`}),(0,G.jsx)(`p`,{className:`blg-cta-card-sub`,children:`Our trained expert visits their home in Chennai, checks every room for safety risks, and sends you a complete report. Completely free.`}),(0,G.jsxs)(`button`,{className:`blg-cta-card-btn`,onClick:t,children:[`Book Free Assessment `,(0,G.jsx)(Lf,{size:15})]}),(0,G.jsxs)(`p`,{className:`blg-cta-card-note`,children:[(0,G.jsx)(lp,{size:11}),` Free. No payment info needed.`]})]})}),(0,G.jsx)(zm,{custom:1,children:(0,G.jsx)(`div`,{className:`blg-sidebar-context`,children:(0,G.jsxs)(`p`,{children:[(0,G.jsx)(`strong`,{children:`60Plus India`}),` operates on the ground in Chennai with trained care executives, 24/7 emergency support, and 21+ elder care services — built for NRI families worldwide.`]})})})]})]})}),(0,G.jsx)(`section`,{className:`blg-final-cta`,children:(0,G.jsx)(zm,{children:(0,G.jsxs)(`div`,{className:`blg-final-cta-inner`,children:[(0,G.jsx)(`span`,{className:`blg-final-pre`,children:`Take the first step`}),(0,G.jsxs)(`h2`,{children:[`Your parents deserve to age`,(0,G.jsx)(`br`,{}),`at home, with `,(0,G.jsx)(`em`,{children:`dignity.`})]}),(0,G.jsx)(`p`,{className:`blg-final-sub`,children:`The research is clear: aging in place is far better for your parents' mental health, dignity, and well-being. We make it possible — even from the other side of the world.`}),(0,G.jsxs)(`button`,{className:`blg-final-btn`,onClick:t,children:[`Book a Free Home Safety Assessment `,(0,G.jsx)(Lf,{size:16})]}),(0,G.jsxs)(`p`,{className:`blg-final-note`,children:[(0,G.jsx)(lp,{size:11}),` Completely free. For NRI families worldwide.`]})]})})})]})}function Wm(){let e=Xe().pathname===`/lottery`;return(0,G.jsxs)(G.Fragment,{children:[(0,G.jsxs)(Ct,{children:[(0,G.jsx)(xt,{path:`/`,element:(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(jp,{}),(0,G.jsx)(Fp,{}),(0,G.jsx)(Lp,{})]})}),(0,G.jsx)(xt,{path:`/subscription`,element:(0,G.jsx)(im,{})}),(0,G.jsx)(xt,{path:`/about`,element:(0,G.jsx)(dm,{})}),(0,G.jsx)(xt,{path:`/contact`,element:(0,G.jsx)(mm,{})}),(0,G.jsx)(xt,{path:`/services/:slug`,element:(0,G.jsx)(em,{})}),(0,G.jsx)(xt,{path:`/privacy-policy`,element:(0,G.jsx)(am,{})}),(0,G.jsx)(xt,{path:`/terms-and-conditions`,element:(0,G.jsx)(sm,{})}),(0,G.jsx)(xt,{path:`/lottery`,element:(0,G.jsx)(xm,{})}),(0,G.jsx)(xt,{path:`/book-free-senior-home-safety-assessment`,element:(0,G.jsx)(Nm,{})}),(0,G.jsx)(xt,{path:`/enquiry`,element:(0,G.jsx)(Lm,{})}),(0,G.jsx)(xt,{path:`/blogs/how-old-age-affects-seniors`,element:(0,G.jsx)(Um,{})}),(0,G.jsx)(xt,{path:`*`,element:(0,G.jsx)(hm,{})})]}),!e&&(0,G.jsx)(Hp,{}),!e&&(0,G.jsx)(Wp,{}),!e&&(0,G.jsx)(Up,{}),!e&&(0,G.jsx)(Gp,{})]})}function Gm(){return(0,b.useEffect)(()=>{let e=document.getElementById(`lcp-placeholder`);e&&(e.style.opacity=`0`,e.style.transition=`opacity 0.3s ease`,setTimeout(()=>{e.style.display=`none`},300));let t=document.getElementById(`app`);t&&t.classList.remove(`lcp-hidden`)},[]),(0,G.jsx)(Nt,{children:(0,G.jsx)(`div`,{className:`App`,children:(0,G.jsx)(Wm,{})})})}var Km=document.getElementById(`app`),qm=document.getElementById(`lcp-placeholder`);qm&&(qm.style.display=`none`),Km&&Km.classList.remove(`lcp-hidden`),(0,x.createRoot)(Km).render((0,G.jsx)(Gm,{}));