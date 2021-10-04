(this["webpackJsonpsae-app"]=this["webpackJsonpsae-app"]||[]).push([[0],{199:function(e,t,a){},200:function(e,t,a){},201:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(14),c=a.n(s),i=a(5),o=a(15),l=a(6),d=a(138),u=a.n(d),j=a(142),b=a.n(j),m=a(143),h=a.n(m),p=a(144),O=a.n(p),f=a(251),x=a(249),g=a(239),v=function(){return!!document.documentElement.classList.contains("dark")},y=a(18),k=a.n(y);var w=function(){k.a.get("http://localhost:5000/login",{params:{token:localStorage.getItem("saejinaToken")}}).then((function(e){e.data.loggedIn||localStorage.removeItem("saejinaToken")})).catch((function(e){console.log(e)}))};var N=function(){return w(),!!localStorage.getItem("saejinaToken")},C=a(27),S=a.n(C),I=a(41);function D(e,t){return E.apply(this,arguments)}function E(){return(E=Object(I.a)(S.a.mark((function e(t,a){return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a?k.a.get("http://localhost:5000/perms/"+a).then((function(e){t(e.data.permissions)})):k.a.get("http://localhost:5000/perms",{params:{token:localStorage.getItem("saejinaToken")}}).then((function(e){t(e.data.permissions)}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function T(e){var t=Object(n.useState)(void 0),a=Object(l.a)(t,2),r=a[0],s=a[1];return Object(n.useEffect)((function(){N()&&D(s,e)}),[s]),[r,s]}var P=a(1),B=[{title:"Home",path:"/",Icon:u.a},{title:"Users",path:"/users",Icon:b.a,permission:"community"},{title:"Commands",path:"/commands",Icon:h.a,permission:"commands"},{title:"Permissions",path:"/permissions",Icon:O.a,permission:"administrator"}];var F=function(e){var t=e.active,a=e.className,n=T(),r=Object(l.a)(n,1)[0];return Object(P.jsx)("div",{className:Object(i.a)(a,"flex flex-col flex-shrink-0 w-1/30 min-w-min h-screen border-r",v()?"bg-darker border-light":"bg-light border-danger"),children:Object(P.jsx)(f.a,{defaultActiveKey:"/",className:"flex flex-col items-center justify-center",children:B.map((function(e,a){var n=e.title,s=e.path,c=e.Icon,o=e.permission;return!o||r&&(r.includes(o)||r.includes("administrator"))?Object(P.jsx)(x.a,{placement:"right",overlay:Object(P.jsx)(g.a,{id:"tooltip-right-".concat(a),className:"ml-1",children:n}),children:Object(P.jsx)(f.a.Link,{eventKey:"link-"+a,href:s,className:Object(i.a)("border-b w-full h-16 flex items-center justify-center",v()?"border-light":"border-danger"),children:Object(P.jsx)(c,{className:t===s?v()?"text-secondary":"text-warning":v()?"text-primary":"text-success"})},a)},"right-tooltip-"+a):Object(P.jsx)("div",{},"private-"+a)}))})})},U=a(241),L=a(248),H=a(246),q=a(247),V=a(3),z=a(7),K=a(252),W=a(242),Q=a(149),_=a(250),A=a(255);var J=function(){window.location.reload()},M={username:"",password:"",isButtonDisabled:!0,helperText:"",isError:!1},R=function(e,t){switch(t.type){case"setUsername":return Object(V.a)(Object(V.a)({},e),{},{username:t.payload});case"setPassword":return Object(V.a)(Object(V.a)({},e),{},{password:t.payload});case"setIsButtonDisabled":return Object(V.a)(Object(V.a)({},e),{},{isButtonDisabled:t.payload});case"loginSuccess":return Object(V.a)(Object(V.a)({},e),{},{helperText:t.payload,isError:!1});case"loginFailed":return Object(V.a)(Object(V.a)({},e),{},{helperText:t.payload,isError:!0});case"setIsError":return Object(V.a)(Object(V.a)({},e),{},{isError:t.payload})}};var G=function(e){var t=e.setShow,a=Object(n.useReducer)(R,M),r=Object(l.a)(a,2),s=r[0],c=r[1];Object(n.useEffect)((function(){s.username.trim()&&s.password.trim()?c({type:"setIsButtonDisabled",payload:!1}):c({type:"setIsButtonDisabled",payload:!0})}),[s.username,s.password]);var i=function(){k.a.post("http://localhost:5000/login",{username:s.username.trim(),password:s.password.trim()}).then((function(e){localStorage.setItem("saejinaToken",e.data.token),c({type:"loginSuccess",payload:e.data.msg}),t(!1),J()})).catch((function(e){c({type:"loginFailed",payload:e.response?e.response.data.msg:"Internal server error"}),console.log(e)}))},o=function(e){13!==e.keyCode&&13!==e.which||s.isButtonDisabled||i()};return Object(P.jsx)("form",{noValidate:!0,autoComplete:"off",children:Object(P.jsx)(A.a,{bg:"lighter",children:Object(P.jsxs)(A.a.Body,{children:[Object(P.jsxs)("div",{children:[Object(P.jsx)(_.a,{error:s.isError,fullWidth:!0,id:"username",type:"username",label:"Username",placeholder:"Username",margin:"normal",onChange:function(e){c({type:"setUsername",payload:e.target.value})},onKeyPress:o,autoFocus:!0}),Object(P.jsx)(_.a,{error:s.isError,fullWidth:!0,id:"password",type:"password",label:"Password",placeholder:"Password",margin:"normal",helperText:s.helperText,onChange:function(e){c({type:"setPassword",payload:e.target.value})},onKeyPress:o})]}),Object(P.jsx)(U.a,{variant:"success",size:"lg",className:"flex-grow w-full",onClick:i,disabled:s.isButtonDisabled,children:"Login"})]})})})},X=["show","setShow"];k.a.defaults.withCredentials=!0;var Y=Object(Q.a)({palette:{primary:{main:"#1f51ff"}}});var Z=function(e){var t=e.show,a=e.setShow,n=Object(z.a)(e,X);return Object(P.jsx)(W.a,{theme:Y,children:Object(P.jsxs)(K.a,Object(V.a)(Object(V.a)({show:t},n),{},{contentClassName:"bg-darker",children:[Object(P.jsx)(K.a.Header,{closeButton:!0,closeVariant:v()?"white":void 0,className:Object(i.a)(v()?"bg-darker text-light border-light":"bg-light text-dark border-dark"),children:Object(P.jsx)(K.a.Title,{children:"Login"})}),Object(P.jsx)(K.a.Body,{className:Object(i.a)(v()?"bg-darker":"bg-light"),children:Object(P.jsx)(G,{setShow:a})})]}))})},$=a(243),ee=a(254),te=a(244),ae=a(245);var ne=function(e){var t=e.size,a=void 0===t?"xs":t,n=e.color,r=e.className;return Object(P.jsx)("div",{className:Object(i.a)(r,"w-full",{xs:"border-b my-2",sm:"border my-3",md:"border-2 my-4",lg:"border-4 my-6",xl:"border-8 my-8",none:"border-0 my-1"}[a],n?"border-"+n:"border-primary")})};var re=function(){return localStorage.removeItem("saejinaToken"),!0};var se=function(e){var t=e.image,a=e.username,r=Object(n.useState)(!1),s=Object(l.a)(r,2),c=s[0],o=s[1],d=function(){return o(!1)};return Object(P.jsxs)("div",{className:"flex items-center",children:[Object(P.jsx)("button",{onClick:c?d:function(){return o(!0)},className:"w-14",children:Object(P.jsx)($.a,{src:t,alt:"PP",roundedCircle:!0,fluid:!0,className:"h-14"})}),Object(P.jsxs)(ee.a,{show:c,onHide:d,placement:"end",scroll:!0,backdrop:!0,className:Object(i.a)(v()?"bg-dark text-light":"bg-light text-dark"),children:[Object(P.jsxs)(ee.a.Header,{closeButton:!0,closeVariant:v()?"white":void 0,children:["Bonjour ",a," !"]}),Object(P.jsx)(ee.a.Body,{children:Object(P.jsxs)(te.a,{className:"flex flex-col items-center",children:[Object(P.jsx)($.a,{src:t,alt:"PP",roundedCircle:!0,fluid:!0,className:"h-32 mx-6"}),Object(P.jsx)(ne,{size:"xs",color:v()?"lighter":"dark",className:"my-4"}),Object(P.jsxs)(f.a,{className:"flex-col w-full space-y-2",children:[Object(P.jsx)(f.a.Item,{children:Object(P.jsx)(ae.a,{color:"primary",disabled:!0,className:Object(i.a)("w-full",v()?"text-light":"text-dark"),children:"Coming soon..."})}),Object(P.jsx)(f.a.Item,{children:Object(P.jsx)(ae.a,{variant:"contained",color:"primary",className:"w-full",onClick:function(){return re()&&J()},children:"Deconnexion"})})]})]})})]})]})};var ce=function(){return localStorage.theme||"light"};var ie=function(e){"light"===(e||localStorage.theme)?(localStorage.theme="dark",document.documentElement.classList.add("dark"),J()):(localStorage.theme="light",document.documentElement.classList.remove("dark"),J())};var oe=function(e){var t=e.data,a=e.className,r=Object(n.useState)(!1),s=Object(l.a)(r,2),c=s[0],o=s[1],d=N()?"Logout":"Login",u=ce();return Object(P.jsxs)("div",{className:Object(i.a)(a,"flex border-b  w-full h-16 justify-between items-center absolute",v()?"bg-darker border-light text-light":"bg-light border-danger text-dark"),children:[Object(P.jsx)("div",{className:"w-full h-full flex items-center min-w-max ml-2",children:Object(P.jsx)("a",{href:"/",className:"text-decoration-none link-dark",children:Object(P.jsx)("span",{className:Object(i.a)(" text-2xl font-bold",v()?"text-primary":"text-success"),children:"Saejina"})})}),Object(P.jsxs)("div",{className:"mr-2 flex flex-row items-center space-x-4",children:[Object(P.jsx)("button",{onClick:function(){ie()},children:"light"===u?Object(P.jsx)(H.a,{className:"text-dark"}):Object(P.jsx)(q.a,{className:"text-lighter"})}),"Login"===d?Object(P.jsx)(U.a,{color:v()?"primary":"success",onClick:function(){return N()?re()&&J():o(!0)},children:d}):t.profilePic?Object(P.jsx)(se,{image:t.profilePic,username:t.username}):Object(P.jsx)(L.a,{animation:"border"}),Object(P.jsx)(Z,{show:c,onHide:function(){return o(!1)},backdropClassName:"bg-error",setShow:o})]})]})};function le(e){var t=e.children,a=e.data,n=Object(o.g)().pathname;return Object(P.jsxs)("div",{className:Object(i.a)("flex flex-col",v()?"bg-dark":"bg-lighter"),children:[Object(P.jsx)(oe,{data:a,className:"shadow-md"}),Object(P.jsxs)("div",{className:"flex mt-16",children:[Object(P.jsx)(F,{active:n,className:"shadow-md"}),Object(P.jsx)("div",{className:Object(i.a)("mx-1 p-3 w-full h-full",v()?"text-light":"text-dark"),children:t})]})]})}var de=le,ue=a(253),je=a(148),be=a.n(je),me=a(108);function he(){return(he=Object(I.a)(S.a.mark((function e(t){return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:k.a.get("http://localhost:5000/discord/servers",{params:{token:localStorage.getItem("saejinaToken")}}).then((function(e){t(e.data.servers)}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function pe(){var e=Object(n.useState)([{id:"",name:"",serverPic:""}]),t=Object(l.a)(e,2),a=t[0],r=t[1];return Object(n.useEffect)((function(){N()&&function(e){he.apply(this,arguments)}(r)}),[r]),a}function Oe(e){var t=e.name,a=e.serverPic,n=t.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,"").split(" ").map((function(e){return e[0]}));return Object(P.jsxs)("div",{className:"flex flex-row items-center",children:[Object(P.jsx)("div",{className:Object(i.a)("flex items-center justify-center w-6 h-6 rounded-full",!a&&"bg-dark text-light text-sm"),children:a?Object(P.jsx)($.a,{src:a,roundedCircle:!0,fluid:!0}):Object(P.jsx)("div",{children:n})}),Object(P.jsx)("div",{className:"ml-2",children:t})]})}var fe=function(e){var t=e.className,a=e.setServer,n=pe(),r=n?n.map((function(e){return{value:e,label:Oe(e)}})):[];return Object(P.jsx)("div",{className:Object(i.a)(t),children:Object(P.jsx)(me.a,{options:r,isSearchable:!1,onChange:function(e){a(e.value)},placeholder:"Selectionnez un serveur ..."})})};function xe(){return(xe=Object(I.a)(S.a.mark((function e(t,a){return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:k.a.get("http://localhost:5000/discord/channels/"+a,{params:{token:localStorage.getItem("saejinaToken")}}).then((function(e){t(e.data.channels)}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ge(e){var t=Object(n.useState)([{id:"",name:"",category:""}]),a=Object(l.a)(t,2),r=a[0],s=a[1];return Object(n.useEffect)((function(){N()&&function(e,t){xe.apply(this,arguments)}(s,e)}),[s]),r}function ve(e){var t=e.name,a=e.category,n=void 0===a?"":a;return Object(P.jsxs)("div",{className:"flex justify-between",children:[Object(P.jsxs)("div",{children:["#",t]}),Object(P.jsx)("div",{className:"pl-96",children:n})]})}var ye=function(e){var t=e.server,a=e.setChannel,n=e.className,r=ge(t.id),s=r?r.map((function(e){return{value:e,label:ve(e)}})):[];return Object(P.jsx)("div",{className:Object(i.a)(n),children:Object(P.jsx)(me.a,{onChange:function(e){a(e.value)},isLoading:!r,isDisabled:!t,options:s,isSearchable:!1})})},ke=a(257),we=a(147),Ne=a.n(we);var Ce=function(e){var t=e.items,a=void 0===t?[]:t,n=e.className;return a.length>0?Object(P.jsx)("div",{className:n,children:Object(P.jsx)(ke.a,{children:a.map((function(e,t){return Object(P.jsxs)(ke.a.Item,{className:"flex items-center justify-between",children:[e.text,Object(P.jsx)(U.a,{id:"".concat(t),variant:"warning",onClick:e.onClick,children:Object(P.jsx)(Ne.a,{})})]},"option-".concat(t))}))})}):null},Se=Object(Q.a)({palette:{primary:{main:"#1f51ff"}}}),Ie={channelId:"",question:"",currentOption:"",options:[],isButtonDisabled:!0,isOptionDisabled:!0,isTimeUsed:!1,helperText:"",isError:!1},De=function(e,t){switch(t.type){case"setChannelId":return Object(V.a)(Object(V.a)({},e),{},{channelId:t.payload.id});case"setQuestion":return Object(V.a)(Object(V.a)({},e),{},{question:t.payload});case"setCurrentOption":return Object(V.a)(Object(V.a)({},e),{},{currentOption:t.payload});case"addOption":return Object(V.a)(Object(V.a)({},e),{},{options:e.options.concat(t.payload)});case"removeOption":return e.options.splice(t.payload,1),Object(V.a)({},e);case"setTime":return Object(V.a)(Object(V.a)({},e),{},{time:t.payload});case"setIsButtonDisabled":return Object(V.a)(Object(V.a)({},e),{},{isButtonDisabled:t.payload});case"setIsOptionDisabled":return Object(V.a)(Object(V.a)({},e),{},{isOptionDisabled:t.payload});case"setIsTimeUsed":return Object(V.a)(Object(V.a)({},e),{},{isTimeUsed:t.payload});case"success":return Object(V.a)(Object(V.a)({},e),{},{helperText:t.payload,isError:!1});case"fail":return Object(V.a)(Object(V.a)({},e),{},{helperText:t.payload,isError:!0});case"setIsError":return Object(V.a)(Object(V.a)({},e),{},{isError:t.payload})}};var Ee=function(){var e=Object(n.useReducer)(De,Ie),t=Object(l.a)(e,2),a=t[0],r=t[1],s=Object(n.useState)({id:"",name:"",serverPic:""}),c=Object(l.a)(s,2),i=c[0],o=c[1];Object(n.useEffect)((function(){a.question.trim()&&a.channelId.trim()&&a.options.length>0?r({type:"setIsButtonDisabled",payload:!1}):r({type:"setIsButtonDisabled",payload:!0}),a.currentOption.trim()?r({type:"setIsOptionDisabled",payload:!1}):r({type:"setIsOptionDisabled",payload:!0})}),[a.question,a.channelId,a.options,a.currentOption]);var d=function(){r({type:"addOption",payload:a.currentOption})},u=function(e){var t;console.log(e),r({type:"removeOption",payload:Number(null===(t=e.target.parentElement)||void 0===t?void 0:t.id)})};return Object(P.jsx)(W.a,{theme:Se,children:Object(P.jsxs)("form",{className:"flex-col space-y-4",children:[Object(P.jsx)(fe,{setServer:o,className:"text-dark"}),""!==i.id&&Object(P.jsx)(ye,{server:i,setChannel:function(e){r({type:"setChannelId",payload:e})},className:"text-dark"}),Object(P.jsx)(_.a,{error:a.isError,fullWidth:!0,id:"question",type:"question",label:"Question",placeholder:"Havok est il le meilleur des devs ? :)",margin:"normal",onChange:function(e){r({type:"setQuestion",payload:e.target.value})},className:v()?"text-light border-light":"text-dark border-danger"}),Object(P.jsxs)("div",{className:"grid grid-cols-8 items-center space-x-4",children:[Object(P.jsx)(_.a,{error:a.isError,id:"option",type:"option",label:"Option",placeholder:"Oui ! UwU",margin:"normal",onChange:function(e){r({type:"setCurrentOption",payload:e.target.value})},onKeyPress:function(e){13!==e.keyCode&&13!==e.which||a.isOptionDisabled||d()},className:"col-span-7"}),Object(P.jsx)(U.a,{variant:"warning",onClick:d,disabled:a.isOptionDisabled,className:"col-span-1 flex-grow",children:Object(P.jsx)(be.a,{})})]}),Object(P.jsx)(Ce,{items:a.options.map((function(e){return{text:e,onClick:u}}))}),Object(P.jsxs)("div",{className:"flex items-end space-x-4",children:[Object(P.jsx)(_.a,{error:a.isError,id:"duration",type:"duration",label:"Temps",placeholder:"1h 23min 45s",margin:"normal",helperText:a.helperText,disabled:!a.isTimeUsed,onChange:function(e){r({type:"setTime",payload:e.target.value})}}),Object(P.jsxs)("div",{className:"flex items-center",children:[Object(P.jsx)(ue.a,{checked:a.isTimeUsed,onChange:function(e){r({type:"setIsTimeUsed",payload:e.target.checked})},className:"text-warning",name:"Sp\xe9cifier un temps"}),Object(P.jsx)("div",{className:"text-dark pb-1",children:"Sp\xe9cifier un temps"})]})]}),Object(P.jsx)(U.a,{variant:"success",size:"lg",className:"flex-grow w-full",onClick:function(){var e={channelId:a.channelId,options:a.options,question:a.question,serverId:i.id,time:a.time};k.a.post("http://localhost:5000/commands/poll",{params:e}).then((function(){r({type:"success",payload:"Sondage cr\xe9\xe9"})})).catch((function(e){console.log(e),r({type:"fail",payload:"Une erreur est survenue"})}))},disabled:a.isButtonDisabled,children:"Cr\xe9er"})]})})},Te=["className"];function Pe(e){var t=e.className,a=Object(z.a)(e,Te);return Object(P.jsxs)(ee.a,Object(V.a)(Object(V.a)({placement:"end",scroll:!0,backdrop:!0,className:Object(i.a)(v()?"bg-dark text-light":"bg-light text-dark",t)},a),{},{children:[Object(P.jsx)(ee.a.Header,{closeButton:!0,closeVariant:v()?"white":void 0,children:"Cr\xe9er un sondage"}),Object(P.jsx)(ee.a.Body,{children:Object(P.jsx)(Ee,{})})]}))}var Be=function(e){var t=e.className,a=Object(n.useState)(!1),r=Object(l.a)(a,2),s=r[0],c=r[1];return Object(P.jsxs)("div",{className:t,children:[Object(P.jsx)(Pe,{show:s,onHide:function(){return c(!1)},className:"w-1/2"}),Object(P.jsx)(U.a,{variant:v()?"primary":"warning",onClick:function(){return c(!0)},children:"Cr\xe9er un sondage"})]})};function Fe(){return(Fe=Object(I.a)(S.a.mark((function e(t,a){return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a?k.a.get("http://localhost:5000/discord/user/"+a).then((function(e){t({username:e.data.username,id:e.data.discord_id,platformId:e.data.id,profilePic:e.data.profilePic})})):k.a.get("http://localhost:5000/discord/user",{params:{token:localStorage.getItem("saejinaToken")}}).then((function(e){t({username:e.data.username,id:e.data.discord_id,platformId:e.data.id,profilePic:e.data.profilePic})}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var Ue=function(e,t){return Fe.apply(this,arguments)};function Le(e){var t=Object(n.useState)({username:"",id:"",profilePic:""}),a=Object(l.a)(t,2),r=a[0],s=a[1];return Object(n.useEffect)((function(){N()&&Ue(s,e)}),[s]),r}function He(){var e=Le();return Object(P.jsx)(de,{data:e,children:Object(P.jsx)("div",{className:"flex",children:Object(P.jsx)(Be,{})})})}Object(o.h)(He);function qe(){var e=Le();return Object(P.jsxs)(le,{data:e,children:["Welcome ",e.username," !"]})}Object(o.h)(qe);function Ve(){return Object(P.jsx)("div",{className:"flex items-center justify-center text-9xl",children:Object(P.jsx)("span",{children:"NOT FOUND"})})}var ze=a(256),Ke=a(240);var We=function(e){var t=e.permissions,a=e.data,r=e.handleClose,s=Object(n.useState)(t.includes("administrator")),c=Object(l.a)(s,2),i=c[0],o=c[1],d=Object(n.useState)(t.includes("community")),u=Object(l.a)(d,2),j=u[0],b=u[1],m=Object(n.useState)(t.includes("commands")),h=Object(l.a)(m,2),p=h[0],O=h[1],f=Object(n.useState)({err:!1,msg:""}),x=Object(l.a)(f,2),g=x[0],y=x[1],w=[{label:"Administrator",onChange:function(e,t){return o(t)},value:i},{label:"Community",onChange:function(e,t){return b(t)},value:j},{label:"Commands",onChange:function(e,t){return O(t)},value:p}];return Object(P.jsxs)("form",{noValidate:!0,autoComplete:"off",className:"flex flex-col",children:[w.map((function(e,t){return Object(P.jsx)(ze.a,{control:Object(P.jsx)(ue.a,{checked:e.value,name:e.label,className:v()?"text-primary":"",color:v()?"primary":"secondary",onChange:e.onChange}),label:e.label},"user-"+t)})),g.msg&&Object(P.jsx)(Ke.a,{className:v()?"text-light":"text-dark",children:g.msg}),Object(P.jsx)(U.a,{variant:"success",size:"lg",className:"flex-grow w-full mt-4",onClick:function(){return function(e,t,a,n,r,s){k.a.put("http://localhost:5000/perms/edit/"+n,{params:{administrator:e,community:t,commands:a}}).then((function(){r({err:!1,msg:"Changements sauvegard\xe9s."}),s&&s()})).catch((function(e){console.log(e),r({err:!0,msg:"Une erreur s'est produite"})}))}(i,j,p,a.platformId,y,r)},children:"Valider"})]})},Qe=Object(Q.a)({palette:{primary:{main:"#f180f8"},secondary:{main:"#1f51ff"}}});var _e=function(e){var t=e.id,a=e.className,r=Le(t),s=Object(n.useState)(!0),c=Object(l.a)(s,2),o=c[0],d=c[1],u=T(r.platformId),j=Object(l.a)(u,2),b=j[0],m=j[1],h=Object(n.useState)(!1),p=Object(l.a)(h,2),O=p[0],f=p[1],x=function(){f(!1),D(m,r.platformId)};return Object(n.useEffect)((function(){r&&d(!1)}),[r,d]),Object(P.jsxs)("div",{children:[Object(P.jsx)("button",{onClick:function(){return f(!0)},className:a,children:o?Object(P.jsx)(L.a,{animation:"border"}):Object(P.jsxs)("div",{className:"flex flex-col h-24 w-24 space-y-1 p-2",children:[Object(P.jsx)($.a,{src:r.profilePic,roundedCircle:!0,fluid:!0}),Object(P.jsx)("div",{className:"self-center",children:r.username})]})}),Object(P.jsx)(W.a,{theme:Qe,children:Object(P.jsxs)(K.a,{show:O,onHide:x,centered:!0,contentClassName:"bg-darker",children:[Object(P.jsx)(K.a.Header,{closeButton:!0,closeVariant:v()?"white":void 0,className:Object(i.a)(v()?"bg-darker text-light border-light":"bg-light text-dark border-dark"),children:Object(P.jsx)(K.a.Title,{children:r.username})}),Object(P.jsx)(K.a.Body,{className:Object(i.a)(v()?"bg-darker text-light":"bg-light text-dark"),children:b?Object(P.jsx)(We,{permissions:b,data:r,handleClose:x}):Object(P.jsx)(L.a,{animation:"border"})})]})})]})};function Ae(){return(Ae=Object(I.a)(S.a.mark((function e(t){return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:k.a.get("http://localhost:5000/discord/ids").then((function(e){t(e.data)}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Je(){var e=Object(n.useState)([]),t=Object(l.a)(e,2),a=t[0],r=t[1];return Object(n.useEffect)((function(){!function(e){Ae.apply(this,arguments)}(r)}),[r]),a}function Me(){var e=Le(),t=Je();return Object(P.jsx)(de,{data:e,children:Object(P.jsx)("div",{className:"flex flex-wrap justify-around",children:t.map((function(e,t){return Object(P.jsx)(_e,{id:e.discord_id},"user-"+t)}))})})}Object(o.h)(Me);function Re(){var e=Le();return Object(P.jsx)(de,{data:e,children:"Users"})}Object(o.h)(Re);var Ge=[{path:"/users",page:Re,secured:!0,permission:"community"},{path:"/commands",page:He,secured:!0,permission:"commands"},{path:"/permissions",page:Me,secured:!0,permission:"administrator"},{path:"/",page:qe},{path:"/404",page:Ve}],Xe=a(57);var Ye=function(e){var t=e.children,a=e.openedChildren,r=e.neededPermission,s=T(),c=Object(l.a)(s,1)[0],i=Object(n.useState)(!0),o=Object(l.a)(i,2),d=o[0],u=o[1],j=Le();return Object(n.useEffect)((function(){u(!c)}),[u,c]),r?d?Object(P.jsx)(de,{data:j,children:Object(P.jsx)(L.a,{animation:"border",className:v()?"bg-dark":"bg-lighter"})}):c.includes(r)||c.includes("administrator")?t:a:t},Ze=["neededPermission"];var $e=function(e){var t=e.neededPermission,a=Object(z.a)(e,Ze);return N()?Object(P.jsx)(Ye,{neededPermission:t,openedChildren:Object(P.jsx)(o.a,{to:"/"}),children:Object(P.jsx)(o.b,Object(V.a)({},a))}):Object(P.jsx)(o.a,{to:"/"})},et=Object(Q.a)({palette:{primary:{main:"#f180f8"},secondary:{main:"#04FFF7"},warning:{main:"#1f51ff"}}});var tt=function(){return Object(n.useEffect)((function(){w()})),Object(P.jsx)(W.a,{theme:et,children:Object(P.jsx)(Xe.a,{children:Object(P.jsxs)(o.d,{children:[Ge.map((function(e,t){var a=e.path,n=e.page,r=e.secured,s=e.permission;return r?Object(P.jsx)($e,{path:a,component:n,exact:!0,neededPermission:s},t):Object(P.jsx)(o.b,{path:a,component:n,exact:!0},t)})),Object(P.jsx)(o.a,{to:"/404"})]})})})},at=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,258)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,s=t.getLCP,c=t.getTTFB;a(e),n(e),r(e),s(e),c(e)}))};a(198),a(199),a(200);var nt=function(){var e="light";localStorage.theme?e=localStorage.theme:window.matchMedia("(prefers-color-scheme: dark)").matches&&(e="dark"),"dark"===e?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")};nt(),c.a.render(Object(P.jsx)(r.a.StrictMode,{children:Object(P.jsx)(tt,{})}),document.getElementById("root")),at()}},[[201,1,2]]]);
//# sourceMappingURL=main.6b60ee92.chunk.js.map