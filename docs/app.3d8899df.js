!function(){var e=window.__fuse=window.__fuse||{},t=e.modules=e.modules||{};e.dt=function(e){return e&&e.__esModule?e:{default:e}},e.bundle=function(e,a){for(var s in e)t[s]=e[s];a&&a()},e.c={},e.r=function(a){var s=e.c[a];if(s)return s.m.exports;var i=t[a];if(!i)throw new Error("Module "+a+" was not found");return(s=e.c[a]={}).exports={},s.m={exports:s.exports},i(e.r,s.exports,s.m),s.m.exports}}(),__fuse.bundle({1:function(e,t,a){t.__esModule=!0,e(2).polyfill();var s=e(3),i=__fuse.dt(s),n=e(4),r=__fuse.dt(n),o=e(5),l=e(6),c=e(7),d=e(8),u=e(9),m=e(10),f=__fuse.dt(m),p=e(11);const h=c.configureStore(),_=e=>i.default.createElement(o.Provider,{store:h},i.default.createElement(l.HashRouter,null,i.default.createElement("div",null,e.children))),g=()=>i.default.createElement(i.default.Fragment,null,i.default.createElement(p.CssBaseline,null),i.default.createElement(_,null,i.default.createElement(l.Switch,null,i.default.createElement(l.Route,{exact:!0,path:"/",component:f.default}),i.default.createElement(l.Route,{path:"/:mixId",component:f.default})))),y=()=>{window.__MIXQUEUE_INIT__||(h.dispatch(d.setControl({control:u.music})),window.__MIXQUEUE_INIT__=!0)};r.default.render(i.default.createElement(g,null),document.querySelector("#app"),y),t.default={main:y,Main:g,App:_}},7:function(e,t,a){t.__esModule=!0;var s=e(17),i=e(18),n=__fuse.dt(i),r=e(9),o=e(19);t.injectAsyncReducer=(e,t,a)=>{e.asyncReducers[t]=a,e.replaceReducer(o.createReducer(e.asyncReducers))},t.configureStore=()=>{const e=window.__REDUX_STORE__,t=window.__MUSIC__,a=e?e.asyncReducers:{},i=o.createReducer(a),l=[n.default],c=e?(e.replaceReducer(i),e):window.__REDUX_STORE__=s.createStore(i,s.compose(s.applyMiddleware(...l)));return c.asyncReducers=a,t||(window.__MUSIC__=new r.MusicControl(c)),c}},8:function(e,t,a){t.__esModule=!0;var s=e(20),i=__fuse.dt(s),n=e(21);const r=i.default("music"),o=n.asyncFactory(r);t.setControl=r("SET_CONTROL"),t.play=o("PLAY",(async(e,t,a)=>{const{control:s}=a().music;await s().play()})),t.pause=o("PAUSE",(async(e,t,a)=>{const{control:s}=a().music;await s().pause()})),t.stop=o("STOP",(async(e,t,a)=>{const{control:s}=a().music;await s().stop()})),t.setSrc=o("SET_SRC",(async({src:e},t,a)=>{const{control:s}=a().music;return s().setSourceUrl(e)})),t.setTime=o("SET_TIME",(async({time:e},t,a)=>{const{control:s}=a().music;return s().setCurrentTime(e)})),t.setSeeking=r("SET_SEEKING"),t.setPlaying=r("SET_PLAYING"),t.setWaiting=r("SET_WAITING"),t.timeUpdate=r("TIME_UPDATE"),t.loadedMetadata=r("LOADED_METADATA")},9:function(e,t,a){t.__esModule=!0;var s=e(17),i=e(8);window.AudioContext=window.AudioContext||window.webkitAudioContext,t.music=()=>window.__MUSIC__;class n{constructor(e){this.store=e,this.onLoad=()=>{},this.play=()=>this.element.play(),this.pause=()=>this.element.pause(),this.stop=async()=>{const e=this.element.pause();return this.element.currentTime=0,e},this.setSourceUrl=e=>{if(e){const t=encodeURI(e);if(this.element.src!=t)return this.element.src=t,!0}return!1},this.setCurrentTime=e=>{this.element.currentTime=e},this.onWaiting=()=>{this.actions.setWaiting({waiting:!0})},this.onPlaying=()=>{this.actions.setWaiting({waiting:!1})},this.onPlay=()=>{this.actions.setPlaying({playing:!0})},this.onPause=()=>{this.actions.setPlaying({playing:!1})},this.timeUpdate=()=>{this.actions.timeUpdate({currentTime:this.element.currentTime})},this.onDurationChange=()=>{this.actions.loadedMetadata({duration:this.element.duration})},this.element=document.getElementById("temp_audio"),this.element.crossOrigin="anonymous",this.element.autoplay=!0,this.actions=s.bindActionCreators({setPlaying:i.setPlaying,setWaiting:i.setWaiting,timeUpdate:i.timeUpdate,setSrc:i.setSrc,loadedMetadata:i.loadedMetadata},e.dispatch.bind(e)),window.addEventListener("load",this.onLoad),this.element.addEventListener("timeupdate",this.timeUpdate),this.element.addEventListener("playing",this.onPlaying),this.element.addEventListener("waiting",this.onWaiting),this.element.addEventListener("play",this.onPlay),this.element.addEventListener("pause",this.onPause),this.element.addEventListener("loadedmetadata",this.onDurationChange)}}t.MusicControl=n,t.default=n},10:function(e,t,a){t.__esModule=!0;var s=e(3),i=__fuse.dt(s),n=e(22),r=__fuse.dt(n),o=e(23),l=__fuse.dt(o),c=e(6);t.default=()=>{const e=c.useRouteMatch();return i.default.createElement("div",null,i.default.createElement(r.default,{mixId:e.params.mixId}),i.default.createElement(c.Route,{exact:!0,path:"/:mixId",component:l.default}))}},19:function(e,t,a){t.__esModule=!0;var s=e(17),i=e(163),n=e(164),r=e(165);t.createReducer=e=>s.combineReducers({archive:i.archive,ui:n.ui,music:r.music,...e})},22:function(e,t,a){t.__esModule=!0;var s=e(11),i=e(168),n=e(3),r=e(5),o=e(17),l=e(169),c=__fuse.dt(l),d=e(170),u=__fuse.dt(d),m=e(171),f=__fuse.dt(m),p=e(172),h=__fuse.dt(p),_=e(173),g=__fuse.dt(_),y=e(174),E=e(175),x=__fuse.dt(E),S=e(176),T=__fuse.dt(S),v=e(177),M=e(178),w=__fuse.dt(M),b=e(179);const k=s.makeStyles(b.Stylesheet);t.View=e=>{const t=o.bindActionCreators(v.Controller,r.useDispatch()),a=r.useSelector(y.getMusicElement),l=k();return n.createElement(s.AppBar,{position:"static",className:l.appBar},n.createElement(s.Toolbar,null,n.createElement(s.Grid,{container:!0,className:l.gridContainer},n.createElement(s.Hidden,{only:["xs"]},n.createElement(s.Grid,{item:!0,onClick:async()=>{await t.stop(),a.src="",t.loadedMetadata({duration:0})}},n.createElement(T.default,{to:"/"},n.createElement(s.Icon,null,n.createElement(i.LibraryMusic,null))))),n.createElement(s.Hidden,{only:["xs"]},n.createElement(s.Grid,{item:!0},n.createElement(s.Typography,null,"MixQueue"))),n.createElement(s.Grid,{item:!0},n.createElement(w.default,{mixId:e.mixId})),n.createElement(s.Hidden,{only:["xs","sm"]},n.createElement(s.Grid,{item:!0,style:{marginLeft:"auto"}},n.createElement(s.Grid,{container:!0},n.createElement(s.Grid,{item:!0},n.createElement("a",{href:"https://archive.org/details/@xdavehome",target:"_blank"},n.createElement(x.default,{src:c.default,title:"Files hosted at the Internet Archive",alt:"archive.org"}))),n.createElement(s.Grid,{item:!0},n.createElement("a",{href:"https://www.mixcloud.com/xdavehome/",target:"_blank"},n.createElement(x.default,{src:f.default,title:"More on Mixcloud!",alt:"Mixcloud"}))),n.createElement(s.Grid,{item:!0},n.createElement("a",{href:"https://soundcloud.com/xdavehome",target:"_blank"},n.createElement(x.default,{src:g.default,title:"Check out my SoundCloud!",alt:"SoundCloud"}))),n.createElement(s.Grid,{item:!0},n.createElement("a",{href:"https://preactjs.com/",target:"_blank"},n.createElement(x.default,{src:h.default,title:"Powered by Preact",alt:"Preact"}))),n.createElement(s.Grid,{item:!0},n.createElement("a",{href:"https://github.com/xdave/mixqueue",target:"_blank"},n.createElement(x.default,{src:u.default,title:"Star on GitHub!",alt:"GitHub"})))))))))},t.default=t.View},23:function(e,t,a){t.__esModule=!0;var s=e(11),i=e(3),n=__fuse.dt(i),r=e(5),o=e(6),l=e(17),c=e(180),d=e(174),u=e(181),m=e(182),f=__fuse.dt(m),p=e(183),h=e(184),_=__fuse.dt(h);const g=s.makeStyles(p.styles);t.default=()=>{const e=o.useRouteMatch(),t=r.useSelector((t=>c.getMixById(t,e.params.mixId))),a=r.useSelector(d.getMusicElement),m=c.getAudioUrls(t),p=r.useSelector((e=>d.getPlayableUrl(e,a,m))),h=l.bindActionCreators(u.Controller,r.useDispatch());i.useEffect((()=>{h.fetchMetadata({id:e.params.mixId})}),[e.params.mixId]),i.useEffect((()=>{h.setSrc({src:p})}),[p]);const y=g();return n.default.createElement("div",null,n.default.createElement(s.Paper,{className:y.paper},n.default.createElement(f.default,{mixId:e.params.mixId})),n.default.createElement(_.default,{mixId:e.params.mixId}))}},163:function(e,t,a){t.__esModule=!0;var s=e(375),i=e(376);t.initial={searchResults:[],mixes:[],errors:[]},t.archive=s.reducerWithInitialState(t.initial).case(i.search.async.started,(e=>e)).case(i.search.async.done,((e,{result:t})=>({...e,searchResults:t.response.docs}))).case(i.search.async.failed,((e,{error:t})=>({...e,errors:[...e.errors,t]}))).case(i.fetchMetadata.async.started,(e=>e)).case(i.fetchMetadata.async.done,((e,{result:t})=>{const a=t.metadata.identifier,s=e.mixes.slice(),i=s.findIndex((e=>e.metadata.identifier===a));return-1===i?s.push(t):s[i]=t,{...e,mixes:s}})).case(i.fetchMetadata.async.failed,((e,{error:t})=>({...e,errors:[...e.errors,t]})))},164:function(e,t,a){t.__esModule=!0;var s=e(375),i=e(377);t.initial={mixId:"",mixListVisible:!1,selectingPos:!1,posSelectTime:0,posSelectX:0},t.ui=s.reducerWithInitialState(t.initial).case(i.mixListToggle,((e,{value:t})=>({...e,mixListVisible:t}))).case(i.setSelectingPos,((e,{selectingPos:t})=>({...e,selectingPos:t}))).case(i.setPosSelectionTime,((e,{posSelectTime:t})=>({...e,posSelectTime:t}))).case(i.setPosSelectionX,((e,{posSelectX:t})=>({...e,posSelectX:t}))).build()},165:function(e,t,a){t.__esModule=!0;var s=e(375),i=e(8);t.initial={control:()=>({}),currentTime:0,duration:0,playing:!1,waiting:!1,seeking:!1,src:""},t.music=s.reducerWithInitialState(t.initial).case(i.setControl,((e,{control:t})=>({...e,control:t}))).case(i.play.async.started,(e=>e)).case(i.play.async.done,(e=>e)).case(i.play.async.failed,(e=>e)).case(i.pause.async.started,(e=>e)).case(i.pause.async.done,(e=>e)).case(i.pause.async.failed,(e=>e)).case(i.stop.async.started,(e=>e)).case(i.stop.async.done,(e=>e)).case(i.stop.async.failed,(e=>e)).case(i.setSrc.async.started,(e=>e)).case(i.setSrc.async.done,((e,{params:t})=>({...e,src:t.src}))).case(i.setSrc.async.failed,(e=>e)).case(i.setTime.async.started,(e=>e)).case(i.setTime.async.done,(e=>e)).case(i.setTime.async.failed,(e=>e)).case(i.setSeeking,((e,{seeking:t})=>({...e,seeking:t}))).case(i.setPlaying,((e,{playing:t})=>({...e,playing:t}))).case(i.setWaiting,((e,{waiting:t})=>({...e,waiting:t}))).case(i.timeUpdate,((e,{currentTime:t})=>({...e,currentTime:e.seeking?e.currentTime:t}))).case(i.loadedMetadata,((e,{duration:t})=>({...e,duration:t})))},169:function(e,t,a){a.exports="/resources/078f200b.svg"},170:function(e,t,a){a.exports="/resources/05224fa84.svg"},171:function(e,t,a){a.exports="/resources/3e23b332.svg"},172:function(e,t,a){a.exports="/resources/02b5eed58.svg"},173:function(e,t,a){a.exports="/resources/094b42e1.svg"},174:function(e,t,a){t.__esModule=!0;var s=e(378);t.getPlayableUrl=(e,t,a)=>a.reduce(((e,a)=>["probably","maybe"].some((a=>t.canPlayType(s.getType(e))===a))?e:a),""),t.getMusicElement=e=>e.music.control().element},175:function(e,t,a){t.__esModule=!0;var s=e(3);t.Icon=e=>{const{width:t=20,height:a=20,...i}=e;return s.createElement("img",Object.assign({width:t,height:a},i))},t.default=t.Icon},176:function(e,t,a){t.__esModule=!0;var s=e(11),i=e(3),n=e(6);const r=s.makeStyles({link:{color:({color:e})=>e||"#fff",textDecoration:"none","& :visited":{"text-decoration":"none"}},active:{fontWeight:"bold"}});t.default=e=>{const t=r(e);return i.createElement(n.NavLink,{to:e.to,className:t.link,activeClassName:t.active},e.children)}},177:function(e,t,a){t.__esModule=!0;var s=e(8);t.Controller={stop:s.stop,loadedMetadata:s.loadedMetadata}},178:function(e,t,a){t.__esModule=!0;var s=e(11),i=e(379),n=__fuse.dt(i),r=e(3),o=__fuse.dt(r),l=e(5),c=e(17),d=e(180),u=e(176),m=__fuse.dt(u),f=e(380),p=__fuse.dt(f),h=e(381),_=e(382),g=e(383),y=__fuse.dt(g);const E=s.makeStyles(y.default);t.View=e=>{const[t,a]=r.useState(null),i=l.useSelector((e=>d.getMixes(e))),u=l.useSelector((t=>d.getMixById(t,e.mixId))),f=u?u.metadata.title:"Select a mix...",g=c.bindActionCreators(_.Controller,l.useDispatch()),y=E(e),x=h.useWidth(),S=()=>{a(null),g.mixListToggle({value:!1})};return r.useEffect((()=>{const e=`(${`uploader:${atob("ZGVmdC5wcm9kdWN0aW9uc0BnbWFpbC5jb20=")}`} AND mediatype:audio)`;g.search({q:e})}),[0===i.length]),o.default.createElement("div",null,o.default.createElement(s.Button,{variant:"outlined","aria-controls":"mix-menu","aria-haspopup":"true",onClick:e=>{a(e.currentTarget),g.mixListToggle({value:!0})}},o.default.createElement(s.Typography,{variant:"xs"===x?"caption":"body2",className:y.title},o.default.createElement("b",null,f))),o.default.createElement(s.Menu,{id:"mix-menu",anchorEl:t,keepMounted:!0,open:Boolean(t),onClose:S},o.default.createElement(p.default,{itemSelector:y.active,setHeight:()=>window.innerHeight/2+"px"},i.map((t=>o.default.createElement(m.default,{key:`mixlink-${t.identifier}`,to:`/${t.identifier}`,color:"#000"},o.default.createElement(s.MenuItem,{key:`mixlink-${t.identifier}`,onClick:S,className:n.default({[y.active]:e.mixId===t.identifier})},t.title)))))))},t.default=t.View},179:function(e,t,a){t.__esModule=!0,t.Stylesheet=()=>({appBar:{},gridContainer:{alignItems:"center",justifyContent:"space-between"}})},180:function(e,t,a){t.__esModule=!0;var s=e(384);const i=(e,t)=>e.archive.mixes.find((e=>e.metadata.identifier===t));t.getMixById=s.createSelector(i,(e=>e)),t.getPeaksFile=s.createSelector(i,(e=>e&&e.files.find((e=>/png$/.test(e.name))))),t.getPeaks=s.createSelector([i,t.getPeaksFile],((e,t)=>e&&t&&`https://${e.server}${e.dir}/${t.name}`)),t.getPeaksUrl=t.getPeaks,t.getTitle=s.createSelector(i,(e=>e&&e.metadata.title)),t.getTracks=s.createSelector(i,(e=>e?e[e.metadata.identifier].tracks:[])),t.getMixes=s.createSelector((e=>e.archive),(e=>e.searchResults.slice().map((e=>({mix:e,date:Date.parse(e.date)}))).sort(((e,t)=>e.date<t.date?1:e.date>t.date?-1:0)).map((e=>e.mix)))),t.getAudioUrls=e=>e?e.files.filter((e=>[/ogg$/i,/mp3$/i,/m4a$/i].some((t=>t.test(e.name))))).sort((e=>/m4a$/i.test(e.name)?-1:1)).sort((e=>/mp3$/i.test(e.name)?-1:1)).sort((e=>/ogg$/i.test(e.name)?-1:1)).map((t=>`http://archive.org/download/${e.metadata.identifier}/${t.name}`)):[],t.getAudioSources=s.createSelector(i,(e=>t.getAudioUrls(e))),t.getTrackByNumber=s.createSelector(((e,a,s)=>t.getTracks(e,a).find((e=>e.number===parseInt(s,10)))),(e=>e)),t.getCurrentTrack=s.createSelector([t.getTracks,e=>e.music],((e,{currentTime:t})=>e.reduce(((e,a)=>t>=e.time&&t<a.time?e:a),{time:0,title:"",number:0,timeDisplay:""})))},181:function(e,t,a){t.__esModule=!0;var s=e(376),i=e(8);t.Controller={fetchMetadata:s.fetchMetadata,setSrc:i.setSrc}},182:function(e,t,a){t.__esModule=!0;var s=e(11),i=e(379),n=__fuse.dt(i),r=e(3),o=__fuse.dt(r),l=e(5),c=e(17),d=e(180),u=e(385),m=e(386),f=__fuse.dt(m),p=e(387),h=e(388),_=e(389),g=__fuse.dt(_);const y=s.makeStyles(h.styles);t.default=e=>{const t=l.useSelector((e=>e.ui)),a=l.useSelector((e=>e.music.duration)),s=l.useSelector((e=>e.music.currentTime)),i=l.useSelector((t=>d.getTracks(t,e.mixId))),r=l.useSelector((t=>d.getPeaks(t,e.mixId))),m=c.bindActionCreators(p.Controller,l.useDispatch()),h=y();return o.default.createElement("div",{className:h.peaksContainer},o.default.createElement("div",{className:h.controlsContainer},o.default.createElement("div",{className:h.controls},o.default.createElement(f.default,{mixId:e.mixId}))),o.default.createElement("div",{style:{display:"flex",flexFlow:"row",height:"100%"}},o.default.createElement("div",{key:`peaks-display-${r}`,className:n.default(h.peaks,"peaks"),style:{backgroundImage:r?`url("${r}")`:"none"},onClick:u.setPosFromX(a,m.setTime),onMouseEnter:()=>m.setSelectingPos({selectingPos:!0}),onMouseLeave:()=>m.setSelectingPos({selectingPos:!1}),onMouseMove:e=>{const{left:t}=e.currentTarget.getBoundingClientRect();m.setPosSelectionX({posSelectX:e.clientX-t});const s=u.getTimeFromX(e,a);m.setPosSelectionTime({posSelectTime:s})}},o.default.createElement("div",{className:h.playbackPosition,style:{left:u.qXFromPos(".peaks",s,a)}}),o.default.createElement("div",{className:h.posSelector,style:{display:t.selectingPos?"block":"none",left:`${t.posSelectX}px`}},o.default.createElement("div",{className:h.posSelectTime},u.secondsToTime2(t.posSelectTime))),i.map(((e,t)=>o.default.createElement(g.default,{key:t,track:e}))),o.default.createElement("div",{className:h.currentTime},u.secondsToTime2(s)),o.default.createElement("div",{className:h.duration},u.secondsToTime2(a)))))}},183:function(e,t,a){t.__esModule=!0,t.styles=e=>({paper:{position:"relative",margin:`${e.spacing()}px`,padding:`${e.spacing()}px`},tracklist:{height:"175px",overflowY:"scroll"},track:{fontWeight:"bold"}})},184:function(e,t,a){t.__esModule=!0;var s=e(11),i=e(379),n=__fuse.dt(i),r=e(3),o=__fuse.dt(r),l=e(5),c=e(17),d=e(180),u=e(385),m=e(380),f=__fuse.dt(m),p=e(390),h=e(391),_=__fuse.dt(h);const g=s.makeStyles(_.default);t.default=e=>{const t=l.useSelector((t=>d.getCurrentTrack(t,e.mixId))),a=l.useSelector((t=>d.getTracks(t,e.mixId))),i=c.bindActionCreators(p.Controller,l.useDispatch()),r=g();return a.length>0&&o.default.createElement(s.Paper,{className:r.tracklist},o.default.createElement(f.default,{itemSelector:r.track,setHeight:()=>window.innerHeight-182+"px"},o.default.createElement(s.List,null,t&&a.map(((e,a)=>o.default.createElement(s.ListItem,{key:`track-${a}-${e.title}`,button:!0,className:n.default({[r.track]:!0,[r.activeTrack]:e.number===t.number}),onClick:()=>i.setTime({time:e.time})},o.default.createElement("span",null,"[",u.secondsToTime2(e.time),"]"),o.default.createElement("span",null,u.zeroPad(e.number),"."),o.default.createElement("span",null,e.title)))))))||o.default.createElement("div",null)}},376:function(e,t,a){t.__esModule=!0;var s=e(20),i=__fuse.dt(s),n=e(21),r=e(6033),o=__fuse.dt(r),l=e(6034),c=e(6035);const d={mode:"cors",cache:"force-cache"},u="https://archive.org",m=["creator","date","description","downloads","identifier","mediatype","subject","title"].join("&fl[]="),f=i.default("archive"),p=n.asyncFactory(f);t.search=p("SEARCH",(async e=>{const t=encodeURI(`${u}/${a=e.q,`advancedsearch.php?q=${a}&fl[]=${m}&rows=100&output=json`}`);var a;let s;try{if(s=await l.fetchT(t,{cache:"force-cache",timeout:5e3},o.default),s.status>=400)throw new Error(`${s.status} ${s.statusText}`)}catch(e){if(console.warn(e),console.warn("Using local mix manifest file..."),s=await fetch("./mixes/index.json",{cache:"force-cache"}),s.status>=400)throw new Error(`${s.status} ${s.statusText}`)}return await s.json()})),t.fetchMetadata=p("FETCH_METADATA",(async({id:e})=>{const t=encodeURI(`${u}/metadata/${e}?output=json`),a=await fetch(t,d);if(a.status>=400)throw new Error(`${a.status} ${a.statusText}`);const s=await a.json();if(!s[s.metadata.identifier]){const[e]=s.files.filter((e=>e.name.indexOf(".cue")>-1)),t=`https://api.codetabs.com/v1/proxy?quest=http://archive.org/download/${s.metadata.identifier}/${e.name}`,a=await fetch(t),i=await a.text();s[s.metadata.identifier]={id:s.metadata.identifier,title:s.metadata.title,tracks:c.parse(i).tracks.map((e=>({number:e.number,title:`${e.artist} - ${e.title} [${e.label}]`,time:e.time,timeDisplay:""})))}}if(!s.metadata)throw new Error(`The mix with id '${e}' was not found.`);return s}))},377:function(e,t,a){t.__esModule=!0;var s=e(20);const i=__fuse.dt(s).default("ui");t.mixListToggle=i("MIX_LIST_TOGGLE"),t.setSelectingPos=i("SET_SELECTING_POS"),t.setPosSelectionTime=i("SET_POS_SELECTION_TIME"),t.setPosSelectionX=i("SET_POS_SELECTION_X")},378:function(e,t,a){t.__esModule=!0,t.types=[{regex:/m4a$/,type:"audio/mp4"},{regex:/ogg$/,type:"audio/ogg"},{regex:/mp3$/,type:"audio/mpeg"},{regex:/wav$/,type:"audio/wav"},{regex:/png$/,type:"image/png"}],t.getType=e=>{const a=t.types.find((t=>t.regex.test(e)));return a?a.type:""}},380:function(e,t,a){t.__esModule=!0;var s=e(3),i=__fuse.dt(s),n=e(4);class r extends i.default.Component{constructor(){super(...arguments),this.doResize=()=>{if(this.props.setHeight){const e=n.findDOMNode(this);e&&(e.style.height=this.props.setHeight())}},this.resize=()=>{this.doResize(),this.forceUpdate()},this.scroll=()=>{const e=`.${this.props.itemSelector}`,t=n.findDOMNode(this);if(t){const a=t.querySelector(e);a&&a.scrollIntoView({behavior:"smooth"})}}}componentDidMount(){window.addEventListener("resize",this.resize),this.doResize(),this.scroll()}componentWillUnmount(){window.removeEventListener("resize",this.resize)}componentDidUpdate(){this.doResize(),this.scroll()}render(){const{style:e={},children:t,id:a,className:s}=this.props,n={overflowY:"scroll",height:this.props.setHeight&&this.props.setHeight(),...e};return i.default.createElement("div",{style:n,id:a,className:s},t)}}t.default=r},381:function(e,t,a){t.__esModule=!0;var s=e(11);t.useWidth=function(){const e=s.useTheme();return[...e.breakpoints.keys].reverse().reduce(((t,a)=>{const i=s.useMediaQuery(e.breakpoints.up(a));return!t&&i?a:t}))||"xs"}},382:function(e,t,a){t.__esModule=!0;var s=e(376),i=e(377);t.Controller={search:s.search,mixListToggle:i.mixListToggle}},383:function(e,t,a){t.__esModule=!0,t.default=()=>({title:{color:"#fff"},mixList:{},active:{}})},385:function(e,t,a){t.__esModule=!0,t.getXFromPos=(e,t,a)=>{if(e){const{width:s}=e.getBoundingClientRect();return t/a*(s-1)+"px"}return"0px"},t.qXFromPos=(e,a,s)=>{const i=document.querySelector(e);return t.getXFromPos(i,a,s)},t.getTimeFromX=(e,t)=>{const a=e.currentTarget,{left:s,width:i}=a.getBoundingClientRect();return(e.clientX-s)/i*t},t.setPosFromX=(e,a)=>s=>{a({time:t.getTimeFromX(s,e)})},t.secondsToTime=e=>{const t=Math.floor(e/3600),a=Math.floor((e-3600*t)/60),s=e-3600*t-60*a,i=s.toFixed(3);return`${t<10?`0${t}`:t}:${a<10?`0${a}`:a}:${s<10?`0${i}`:i}`},t.secondsToTime2=e=>t.secondsToTime(e).replace(/\.[0-9]*$/,""),t.zeroPad=e=>e<10?"0"+e:e},386:function(e,t,a){t.__esModule=!0;var s=e(11),i=e(168),n=e(3),r=e(5),o=e(17),l=e(180),c=e(6037);t.default=e=>{const t=r.useSelector((e=>e.music.playing)),a=r.useSelector((t=>l.getMixById(t,e.mixId))),d=o.bindActionCreators(c.Controller,r.useDispatch());return n.createElement("div",{className:e.className},n.createElement(s.IconButton,{onClick:t?d.pause:()=>{a&&d.play()}},t?n.createElement(i.Pause,null):n.createElement(i.PlayArrow,null)))}},387:function(e,t,a){t.__esModule=!0;var s=e(8),i=e(377);t.Controller={setTime:s.setTime,setSelectingPos:i.setSelectingPos,setPosSelectionX:i.setPosSelectionX,setPosSelectionTime:i.setPosSelectionTime}},388:function(e,t,a){t.__esModule=!0,t.styles=e=>({peaksContainer:{position:"relative",width:"100%",height:"80px",backgroundColor:"rgba(0,43,89,0.75)"},peaks:{backgroundRepeat:"no-repeat",backgroundSize:"100% 100%",width:"100%"},controlsContainer:{position:"absolute",height:"100%"},controls:{position:"absolute",top:"calc(50% - 10px)",height:"20px","& svg":{color:"#fff"},"& button":{height:"20px"}},playbackPosition:{position:"absolute",borderLeft:"1px dashed white",height:"100%"},time:{color:"rgba(255, 255, 255,0.6)",fontFamily:"monospace",fontSize:"9px"},currentTime:{color:"rgba(255, 255, 255,0.6)",fontFamily:"monospace",fontSize:"9px",position:"absolute",bottom:"0px"},duration:{color:"rgba(255, 255, 255,0.6)",fontFamily:"monospace",fontSize:"9px",position:"absolute",bottom:"0px",right:"0px"},posSelector:{position:"absolute",borderLeft:"1px dotted white",height:"100%"},posSelectTime:{color:"rgba(255, 255, 255,0.6)",fontFamily:"monospace",fontSize:"9px",position:"absolute",top:"calc(50% - 4.5px)"}})},389:function(e,t,a){t.__esModule=!0;var s=e(11),i=e(3),n=e(5),r=e(385),o=e(6038);const l=s.makeStyles(o.styles);t.default=s.withWidth()((({track:e})=>{const t=n.useSelector((e=>e.music.duration)),a=l();return i.createElement("div",{className:a.track,style:{left:r.qXFromPos(".peaks",e.time,t)}},i.createElement("span",{className:a.number},e.number))}))},390:function(e,t,a){t.__esModule=!0;var s=e(8);t.Controller={setTime:s.setTime}},391:function(e,t,a){t.__esModule=!0;var s=e(6039),i=__fuse.dt(s);t.default=()=>({paper:{margin:`${i.default.spacing()}px`,padding:`${i.default.spacing()}px`},tracklist:{},track:{display:"flex",justifyContent:"start","& span":{padding:"3px"}},activeTrack:{fontWeight:"bold"}})},6034:function(e,t,a){t.__esModule=!0,t.fetchT=(e,t,a=fetch)=>{const{timeout:s,...i}=t;return Promise.race([a(e,i),new Promise(((e,t)=>{setTimeout((()=>{t(new Error("request timeout"))}),s||5e3)}))])}},6035:function(e,t,a){t.__esModule=!0;const s=e(6099);var i;i||(i={}),t.Cue=i,t.getTotalSeconds=e=>{const t=3600*Math.floor(e.min/60%24),a=e.min%60*60,s=e.sec,i=e.frame/75*1e3/1e3;return parseFloat(`${t+a+s+i}`)},t.parseOldStyle=e=>{const a=/([^\-]+) - ([^\(]+) \((.+)\)/.exec(e.title),[,s,i,n]=[].slice.call(a||[]);return e.files.map((e=>({date:n,filename:e.name,artist:s,title:i,tracks:e.tracks.map((e=>{const a=/([^\-]+) - ([^\[]+) \[(.+)\]/.exec(e.title),[,s,i,n]=[].slice.call(a||[]);return{number:e.number,time:t.getTotalSeconds(e.indexes[0].time),artist:s,title:i,label:n}}))})))[0]},t.parse=e=>{const a=s.parseText(e);return a.performer?a.files.map((e=>({date:a.rems.DATE,filename:e.name,artist:a.performer,title:a.title,tracks:e.tracks.map((e=>({number:e.number,time:t.getTotalSeconds(e.indexes[0].time),artist:e.performer,title:e.title.replace(` [${e.rems.LABEL}]`,""),label:e.rems.LABEL})))})))[0]:t.parseOldStyle(a)}},6037:function(e,t,a){t.__esModule=!0;var s=e(8);t.Controller={play:s.play,pause:s.pause}},6038:function(e,t,a){t.__esModule=!0,t.styles=()=>({track:{position:"absolute",borderLeft:"1px dotted rgba(255,255,255,0.4)",height:"100%",color:"#fff"},number:{fontSize:"9px"}})},6039:function(e,t,a){t.__esModule=!0;var s=e(11);t.theme=s.createMuiTheme(),t.default=t.theme}});
//# sourceMappingURL=app.3d8899df.js.map