exports.ids = [4];
exports.modules = {

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Scroll; });
function inserted(el, binding, vnode) {
  const {
    self = false
  } = binding.modifiers || {};
  const value = binding.value;
  const options = typeof value === 'object' && value.options || {
    passive: true
  };
  const handler = typeof value === 'function' || 'handleEvent' in value ? value : value.handler;
  const target = self ? el : binding.arg ? document.querySelector(binding.arg) : window;
  if (!target) return;
  target.addEventListener('scroll', handler, options);
  el._onScroll = Object(el._onScroll);
  el._onScroll[vnode.context._uid] = {
    handler,
    options,
    // Don't reference self
    target: self ? undefined : target
  };
}

function unbind(el, binding, vnode) {
  var _el$_onScroll;

  if (!((_el$_onScroll = el._onScroll) != null && _el$_onScroll[vnode.context._uid])) return;
  const {
    handler,
    options,
    target = el
  } = el._onScroll[vnode.context._uid];
  target.removeEventListener('scroll', handler, options);
  delete el._onScroll[vnode.context._uid];
}

const Scroll = {
  inserted,
  unbind
};
/* harmony default export */ __webpack_exports__["b"] = (Scroll);

/***/ }),

/***/ 197:
/***/ (function(module, exports) {

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function installDirectives (component, directives) {
  var options = typeof component.exports === 'function'
    ? component.exports.extendOptions
    : component.options

  if (typeof component.exports === 'function') {
    options.directives = component.exports.options.directives
  }

  options.directives = options.directives || {}

  for (var i in directives) {
    options.directives[i] = options.directives[i] || directives[i]
  }
}


/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/ToTop.vue?vue&type=template&id=7b298006&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-fab-transition',[_c('v-btn',{directives:[{name:"show",rawName:"v-show",value:(_vm.scoller_fab),expression:"scoller_fab"},{name:"scroll",rawName:"v-scroll",value:(_vm.onScroll),expression:"onScroll"}],attrs:{"fab":"","dark":"","fixed":"","bottom":"","right":"","color":"rgb(0, 0, 0, 0.5)"},on:{"click":_vm.toTop}},[_c('v-icon',[_vm._v("mdi-chevron-up")])],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/ToTop.vue?vue&type=template&id=7b298006&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/ToTop.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var ToTopvue_type_script_lang_js_ = ({
  data() {
    return {
      scoller_fab: false
    };
  },

  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') {
        return;
      }

      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.scoller_fab = top > 20;
    },

    toTop() {
      this.$vuetify.goTo(0);
    }

  }
});
// CONCATENATED MODULE: ./components/ToTop.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ToTopvue_type_script_lang_js_ = (ToTopvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(12);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(14);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js + 2 modules
var VBtn = __webpack_require__(162);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/transitions/index.js + 2 modules
var transitions = __webpack_require__(53);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/VIcon.js
var VIcon = __webpack_require__(44);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installDirectives.js
var installDirectives = __webpack_require__(197);
var installDirectives_default = /*#__PURE__*/__webpack_require__.n(installDirectives);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/directives/scroll/index.js
var directives_scroll = __webpack_require__(186);

// CONCATENATED MODULE: ./components/ToTop.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_ToTopvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "e2fb8fe2"
  
)

/* harmony default export */ var ToTop = __webpack_exports__["default"] = (component.exports);

/* vuetify-loader */




installComponents_default()(component, {VBtn: VBtn["a" /* default */],VFabTransition: transitions["c" /* VFabTransition */],VIcon: VIcon["a" /* default */]})


/* vuetify-loader */


installDirectives_default()(component, {Scroll: directives_scroll["b" /* default */]})


/***/ })

};;
//# sourceMappingURL=to-top.js.map