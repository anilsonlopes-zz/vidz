(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{1384:function(t,e,r){"use strict";r.r(e);r(43),r(26),r(84);var n=r(8),c=(r(168),r(86),r(90)),o=r(1373),l=r.n(o),h=function(data){var t={id:c.random.uuid(),published:(new Date).getTime(),slug:l()(data.Title,{lower:!0}),search:{},stats:{"watch-later":0,watched:0,liked:0,views:1}};return Object.keys(data).map(function(e){var r=e.toLowerCase();switch(r){case"title":var n=data[e].toLowerCase().split("");t.title=data[e],t.search.title={},n.forEach(function(e){t.search.title[e]=!0});break;case"awards":var c=data[e].split(",");t.awards=data[e],t.search.awards={},c.forEach(function(e){t.search.awards[l()(e,{lower:!0})]=!0});break;case"director":var o=data[e].split(",");t.director=data[e],t.search.directors={},o.forEach(function(e){t.search.directors[l()(e,{lower:!0})]=!0});break;case"genre":var h=data[e].split(",");t.genres=data[e],t.search.genres={},h.forEach(function(e){t.search.genres[l()(e,{lower:!0})]=!0});break;case"language":var f=data[e].split(",");t.language=data[e],t.search.languages={},f.forEach(function(e){t.search.languages[l()(e,{lower:!0})]=!0});break;case"actors":var d=data[e].split(",");t.actors=data[e],t.search.actors={},d.forEach(function(e){t.search.actors[l()(e,{lower:!0})]=!0});break;case"released":t.search.released=new Date(data[e]).getTime(),t.released=data[e];break;case"runtime":t.search.runtime=parseInt(data[e].split("min")[0].trim()),t.runtime=data[e];break;case"writer":var v=data[e].split(",");t.writer=data[e],t.search.writers={},v.forEach(function(e){t.search.writers[l()(e,{lower:!0})]=!0});break;case"country":var m=data[e].split(",");t.country=data[e],t.search.countries={},m.forEach(function(e){t.search.countries[l()(e,{lower:!0})]=!0});break;case"metascore":t.metascore=data[e],t.search.metascore=parseInt(data[e]);break;case"year":t.year=data[e],t.search.year=parseInt(data[e]);break;default:t[r]=data[e]}}),delete t.response,t},f={layout:"admin",data:function(){return{imdbID:"",data:null,posts:[],properties:[],fetchStatus:"fetch",saveStatus:"save"}},mounted:function(){this.fetchPosts()},methods:{fetch:function(){var t=this;this.fetchStatus="++verifing",this.verify().then(function(){t.fetchStatus="++fetching",t.$axios.$get("//www.omdbapi.com/?i=".concat(t.imdbID)).then(function(data){if("False"===data.Response)return t.fetchStatus="++imdb fail",t.timeoutChangeProperty("fetchStatus","fetch",3e3),!1;t.fetchStatus="++fetched",t.data=h(data),t.properties=Object.keys(t.data).map(function(t){return t}),t.timeoutChangeProperty("fetchStatus","fetch")})}).catch(function(e){t.fetchStatus="++".concat(e),t.timeoutChangeProperty("fetchStatus","fetch")})},save:function(){var t=this;if(!this.data)return!1;this.saveStatus="++saving",n.b.collection("posts").add(this.data).then(function(e){t.saveStatus="++saved",t.timeoutChangeProperty("saveStatus","save",2e3,function(){t.data=null,t.imdbID=""}),t.fetchPosts()})},verify:function(){var t=this;return new Promise(function(e,r){n.b.collection("posts").where("imdbid","==",t.imdbID).get().then(function(t){t.empty?e():r(new Error("duplicated (".concat(t.length,")")))})})},timeoutChangeProperty:function(t,e,r){var n=this,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;window.setTimeout(function(){n[t]=e,c&&c()},r||2e3)},fetchPosts:function(){var t=this;n.b.collection("posts").orderBy("published","desc").get().then(function(e){t.posts=Object(n.d)(e)})}}},d=r(11),component=Object(d.a)(f,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"flex w-full min-h-screen"},[r("div",{staticClass:"w-1/2 max-w-full"},[r("div",{staticClass:"p-5 flex items-center"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.imdbID,expression:"imdbID"}],attrs:{type:"text"},domProps:{value:t.imdbID},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.fetch(e)},input:function(e){e.target.composing||(t.imdbID=e.target.value)}}}),t._v(" "),r("button",{staticClass:"py-2 px-4 mx-2 bg-grey-light",class:{"bg-orange-light pointer-events-none":0==t.fetchStatus.indexOf("++")},attrs:{type:"button"},on:{click:t.fetch}},[t._v("\n        "+t._s(t.fetchStatus)+"\n      ")]),t._v(" "),r("button",{staticClass:"py-2 px-4 mr-2 bg-grey-light",class:{"bg-orange-light pointer-events-none":0==t.saveStatus.indexOf("++")},attrs:{type:"button"},on:{click:t.save}},[t._v("\n        "+t._s(t.saveStatus)+"\n      ")])]),t._v(" "),t.data&&t.properties?r("ul",t._l(t.properties,function(e,n){return r("li",{key:n,class:{"mt-2":n>0}},[r("span",{staticClass:"uppercase block text-xs text-black font-medium"},[t._v("\n          "+t._s(e)+"\n        ")]),t._v(" "),t.data[e]?r("span",{staticClass:"block text-sm text-grey-dark"},[t._v("\n          "+t._s(t._f("truncate")(t.data[e],150))+"\n        ")]):t._e()])}),0):t._e()]),t._v(" "),r("div",{staticClass:"w-1/2 max-w-full bg-red"},[r("h3",{staticClass:"pl-5 py-2"},[t._v("\n      Últimos\n    ")]),t._v(" "),r("ul",t._l(t.posts,function(e,n){return r("li",{key:n},[t._v("\n        "+t._s(e.title)+"\n      ")])}),0)])])},[],!1,null,null,null);e.default=component.exports}}]);