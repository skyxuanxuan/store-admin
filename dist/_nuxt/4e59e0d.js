(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{501:function(t,e,n){"use strict";n.r(e);var o={props:{items:{type:Array,required:!0}}},l=n(61),r=n(74),c=n.n(r),v=n(469),d=n(466),_=n(575),f=n(465),m=n(576),h=n(506),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[n("v-row",{staticClass:"white"},t._l(t.items,(function(e,o){return n("v-col",{key:o,attrs:{cols:"12",md:"3",sm:"6"}},[n("v-card",{attrs:{outlined:"",rounded:"md",color:"#EEEEEE"}},[n("v-card-title",{},[t._v("\n          "+t._s(e.title)+"\n        ")]),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v("\n          "+t._s(e.value)+"\n        ")],1)],1)],1)})),1)],1)}),[],!1,null,null,null);e.default=component.exports;c()(component,{VCard:v.a,VCardActions:d.a,VCardTitle:d.c,VCol:_.a,VContainer:f.a,VRow:m.a,VSpacer:h.a})},502:function(t,e,n){"use strict";n.r(e);var o={data:function(){return{scoller_fab:!1}},methods:{onScroll:function(t){if("undefined"!=typeof window){var e=window.pageYOffset||t.target.scrollTop||0;this.scoller_fab=e>20}},toTop:function(){this.$vuetify.goTo(0)}}},l=n(61),r=n(74),c=n.n(r),v=n(456),d=n(208),_=n(193),f=n(493),m=n.n(f),h=n(478),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-fab-transition",[n("v-btn",{directives:[{name:"show",rawName:"v-show",value:t.scoller_fab,expression:"scoller_fab"},{name:"scroll",rawName:"v-scroll",value:t.onScroll,expression:"onScroll"}],attrs:{fab:"",dark:"",fixed:"",bottom:"",right:"",color:"rgb(0, 0, 0, 0.5)"},on:{click:t.toTop}},[n("v-icon",[t._v("mdi-chevron-up")])],1)],1)}),[],!1,null,null,null);e.default=component.exports;c()(component,{VBtn:v.a,VFabTransition:d.c,VIcon:_.a}),m()(component,{Scroll:h.b})},507:function(t,e,n){var content=n(536);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(18).default)("17f9a9f2",content,!0,{sourceMap:!1})},535:function(t,e,n){"use strict";n(507)},536:function(t,e,n){var o=n(17)(!1);o.push([t.i,".background-color[data-v-2ea5e7dc]{background-color:#e8ecf5!important}.right-10[data-v-2ea5e7dc]{right:10px}.left-10[data-v-2ea5e7dc]{left:10px}.left-20[data-v-2ea5e7dc]{left:20px}.top-15[data-v-2ea5e7dc]{top:15px}.searchInput.v-text-field[data-v-2ea5e7dc]{max-width:250px;width:250px}",""]),t.exports=o},583:function(t,e,n){"use strict";n.r(e);var o=n(501),l=n(502),r={name:"IndexPage",title:"門市票券(整批發行)",components:{PageStatisticCard:o.default,ToTop:l.default},layout:"adminLayout",data:function(){return{loadingStatus:!0,CurrentPageSectionIndex:0,func_fab:!1,pageStatisticCardItems:[{title:"門市架上產品 (個)",value:0},{title:"本月銷售票券 (張)",value:0},{title:"本月銷售金額 (元)",value:33333},{title:"庫存空白票券 (張)",value:0}],sec1_table_header:[{text:"代碼",align:"start",value:"d1"},{text:"產品/規格",align:"start",value:"d2"},{text:"分類標籤",align:"start",value:"d3"},{text:"售價",align:"start",value:"d4",filterable:!1},{text:"售出",align:"center",value:"d5",filterable:!1},{text:"剩餘",align:"center",value:"d6",filterable:!1}],sec1_search:"",sec1_table_page:1,sec1_table_page_count:0,sec1_data_list:[]}},watch:{},created:function(){}},c=(n(535),n(61)),v=n(74),d=n.n(v),_=n(587),f=n(577),m=n(456),h=n(465),x=n(580),w=n(193),V=n(194),C=n(126),k=n(196),S=n(108),I=n(38),T=n(513),y=n(578),E=n(506),P=n(588),L=n(589),O=n(567),A=n(494),B=n(509),$=n(579),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-app-bar",{attrs:{color:"white",app:""}},[n("v-app-bar-nav-icon"),t._v(" "),n("v-toolbar-title",[t._v("門市票券(整批發行)")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-menu",{attrs:{bottom:"",left:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,l=e.attrs;return[n("v-btn",t._g(t._b({staticClass:"d-flex d-sm-none",attrs:{icon:""}},"v-btn",l,!1),o),[n("v-icon",[t._v("mdi-dots-vertical")])],1)]}}])},[t._v(" "),n("v-list",[n("v-list-item-group",[n("v-list-item",[n("v-list-item-icon",[n("v-icon",[t._v("mdi-send")])],1),t._v(" "),n("v-list-item-title",[t._v("發送票券")])],1),t._v(" "),n("v-list-item",[n("v-list-item-icon",[n("v-icon",[t._v("mdi-plus")])],1),t._v(" "),n("v-list-item-title",[t._v("建立產品")])],1),t._v(" "),n("v-list-item",[n("v-list-item-icon",[n("v-icon",[t._v("mdi-file-plus")])],1),t._v(" "),n("v-list-item-title",[t._v("申請空白票券")])],1)],1)],1)],1),t._v(" "),n("v-btn",{staticClass:"d-none d-sm-flex",attrs:{color:"#666666",width:"140",dark:""}},[t._v("\n      發送票券\n    ")])],1),t._v(" "),n("div",{staticClass:"pa-4"},[n("v-tabs-items",{class:{none:t.loadingStatus},model:{value:t.CurrentPageSectionIndex,callback:function(e){t.CurrentPageSectionIndex=e},expression:"CurrentPageSectionIndex"}},[n("v-tab-item",{staticClass:"background-color"},[n("PageStatisticCard",{attrs:{items:t.pageStatisticCardItems}}),t._v(" "),n("v-container",{staticClass:"white mt-8"},[n("v-toolbar",{attrs:{dense:"",flat:""}},[n("v-text-field",{staticClass:"searchInput top-15",attrs:{label:"Outlined",outlined:"",dense:""}}),t._v(" "),n("v-btn",{staticClass:"left-10",attrs:{outlined:"",width:"80"}},[t._v("\n              顯示\n            ")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{staticClass:"right-10 d-none d-sm-flex",attrs:{color:"#666666",width:"160",dark:""}},[t._v("\n              建立產品\n            ")]),t._v(" "),n("v-btn",{staticClass:"d-none d-sm-flex",attrs:{color:"#666666",width:"160",dark:""}},[t._v("\n              申請空白票券\n            ")])],1),t._v(" "),n("div",[n("v-data-table",{attrs:{"mobile-breakpoint":"770",headers:t.sec1_table_header,items:t.sec1_data_list,"items-per-page":10,search:t.sec1_search,"item-key":"d0","calculate-widths":"",page:t.sec1_table_page,"footer-props":{"disable-pagination":!0,"next-icon":"","prev-icon":""}},on:{"update:page":function(e){t.sec1_table_page=e},"page-count":function(e){t.sec1_table_page_count=e}},scopedSlots:t._u([{key:"item.actions",fn:function(e){return[n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,l=e.attrs;return[n("v-btn",t._g(t._b({staticClass:"no-backgroud-hover white",attrs:{elevation:"0",color:"white",fab:"","x-small":""}},"v-btn",l,!1),o),[n("v-icon",{attrs:{color:"primary"}},[t._v("\n                        mdi-pencil\n                      ")])],1)]}}],null,!0)},[t._v(" "),n("span",[t._v("修改")])]),t._v(" "),n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,l=e.attrs;return[n("v-btn",t._g(t._b({staticClass:"no-backgroud-hover white",attrs:{elevation:"0",color:"white",fab:"","x-small":""}},"v-btn",l,!1),o),[n("v-icon",{attrs:{color:"error"}},[t._v("\n                        mdi-delete\n                      ")])],1)]}}],null,!0)},[t._v(" "),n("span",[t._v("刪除")])])]}}])})],1),t._v(" "),n("div",{staticClass:"text-center pt-2"},[n("v-pagination",{attrs:{length:t.sec1_table_page_count,"total-visible":7},model:{value:t.sec1_table_page,callback:function(e){t.sec1_table_page=e},expression:"sec1_table_page"}})],1)],1)],1)],1)],1),t._v(" "),n("to-top")],1)}),[],!1,null,"2ea5e7dc",null);e.default=component.exports;d()(component,{PageStatisticCard:n(501).default,ToTop:n(502).default}),d()(component,{VAppBar:_.a,VAppBarNavIcon:f.a,VBtn:m.a,VContainer:h.a,VDataTable:x.a,VIcon:w.a,VList:V.a,VListItem:C.a,VListItemGroup:k.a,VListItemIcon:S.a,VListItemTitle:I.b,VMenu:T.a,VPagination:y.a,VSpacer:E.a,VTabItem:P.a,VTabsItems:L.a,VTextField:O.a,VToolbar:A.a,VToolbarTitle:B.a,VTooltip:$.a})}}]);