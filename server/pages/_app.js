"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 587:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "@chakra-ui/react"
var react_ = __webpack_require__(930);
// EXTERNAL MODULE: ./src/theme/index.ts
var theme = __webpack_require__(850);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(664);
;// CONCATENATED MODULE: ./src/components/logo.tsx




const Logo = ()=>{
    return(/*#__PURE__*/ jsx_runtime_.jsx(react_.Box, {
        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
            href: "/",
            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Image, {
                    src: "https://media.made.com/mws-assets/images/MadeLogo.2.svg",
                    alt: "Logo",
                    "aria-label": "Logo"
                })
            })
        })
    }));
};
/* harmony default export */ const logo = (Logo);

;// CONCATENATED MODULE: external "react-icons/fi"
const fi_namespaceObject = require("react-icons/fi");
;// CONCATENATED MODULE: ./src/components/menu-toggle.tsx




const MenuToggle = ({ toggle , isOpen  })=>{
    return(/*#__PURE__*/ jsx_runtime_.jsx(react_.Box, {
        display: {
            sm: "block",
            md: "none"
        },
        onClick: toggle,
        children: isOpen ? /*#__PURE__*/ jsx_runtime_.jsx(fi_namespaceObject.FiX, {}) : /*#__PURE__*/ jsx_runtime_.jsx(fi_namespaceObject.FiMenu, {})
    }));
};

;// CONCATENATED MODULE: ./src/components/menu-item.tsx


const MenuItem = ({ children , to ="/" , target ="" , icon , ...props })=>{
    return(/*#__PURE__*/ jsx_runtime_.jsx(react_.Link, {
        href: to,
        target: target,
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.HStack, {
            w: "100%",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(react_.Text, {
                    ...props,
                    children: children
                }),
                icon
            ]
        })
    }));
};

;// CONCATENATED MODULE: ./src/components/menu-links.tsx




const MenuLinks = ({ isOpen  })=>{
    return(/*#__PURE__*/ jsx_runtime_.jsx(react_.Box, {
        display: {
            base: isOpen ? "block" : "none",
            md: "block"
        },
        flexBasis: {
            base: "100%",
            md: "auto"
        },
        ml: "auto",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Stack, {
            spacing: 8,
            align: "center",
            justify: [
                "center",
                "space-between",
                "flex-end",
                "flex-end"
            ],
            direction: [
                "column",
                "row",
                "row",
                "row"
            ],
            pt: [
                4,
                4,
                0,
                0
            ],
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(MenuItem, {
                    to: "/",
                    children: "Home"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(MenuItem, {
                    to: "https://www.made.com/careers",
                    target: "_blank",
                    icon: /*#__PURE__*/ jsx_runtime_.jsx(fi_namespaceObject.FiExternalLink, {}),
                    children: "Careers"
                })
            ]
        })
    }));
};

;// CONCATENATED MODULE: ./src/components/header.tsx






const HeaderContainer = ({ children  })=>{
    return(/*#__PURE__*/ jsx_runtime_.jsx(react_.Flex, {
        as: "header",
        align: "center",
        boxShadow: "base",
        justify: "space-between",
        wrap: "wrap",
        w: "100%",
        mb: 8,
        p: 8,
        children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Flex, {
            maxW: "8xl",
            w: "100%",
            margin: "auto",
            children: children
        })
    }));
};
const Header = ()=>{
    const { 0: isOpen , 1: setIsOpen  } = (0,external_react_.useState)(false);
    const toggle = ()=>setIsOpen(!isOpen)
    ;
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(HeaderContainer, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(logo, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(MenuToggle, {
                toggle: toggle,
                isOpen: isOpen
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(MenuLinks, {
                isOpen: isOpen
            })
        ]
    }));
};

;// CONCATENATED MODULE: ./src/components/footer.tsx


const Footer = ({ children  })=>{
    return(/*#__PURE__*/ jsx_runtime_.jsx(react_.Box, {
        as: "footer",
        role: "contentinfo",
        mx: "auto",
        bg: "#F8F8F8",
        bottom: 0,
        left: 0,
        width: "100%",
        position: "fixed",
        children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Flex, {
            maxW: "8xl",
            w: "100%",
            margin: "auto",
            children: children
        })
    }));
};
/* harmony default export */ const footer = (Footer);

;// CONCATENATED MODULE: ./src/pages/_app.tsx





function MyApp({ Component , pageProps  }) {
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.ChakraProvider, {
        theme: theme/* default */.ZP,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Header, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(footer, {})
        ]
    }));
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 930:
/***/ ((module) => {

module.exports = require("@chakra-ui/react");

/***/ }),

/***/ 562:
/***/ ((module) => {

module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 14:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 20:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 365:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-middleware-regex.js");

/***/ }),

/***/ 428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 52:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 422:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [730,664,850], () => (__webpack_exec__(587)));
module.exports = __webpack_exports__;

})();