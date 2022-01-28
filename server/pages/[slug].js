"use strict";
(() => {
var exports = {};
exports.id = 219;
exports.ids = [219];
exports.modules = {

/***/ 921:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _slug_),
  "getStaticPaths": () => (/* binding */ getStaticPaths),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

// EXTERNAL MODULE: ./src/lib/api.ts
var api = __webpack_require__(903);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: external "next-mdx-remote"
const external_next_mdx_remote_namespaceObject = require("next-mdx-remote");
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: external "@chakra-ui/react"
var react_ = __webpack_require__(930);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
;// CONCATENATED MODULE: ./src/components/mdx/inline-code.tsx



const InlineCode = ({ ...props })=>/*#__PURE__*/ jsx_runtime_.jsx(react_.chakra.code, {
        apply: "mdx.code",
        color: (0,react_.useColorModeValue)("purple.500", "purple.300"),
        bg: "#011627",
        rounded: "3px",
        paddingLeft: "2",
        paddingRight: "2",
        ...props
    })
;

;// CONCATENATED MODULE: ./src/components/mdx/codeblock/index.tsx



const CodeBlock = ({ children , className  })=>{
    const language = className?.replace(/language-/, "");
    if (!language) {
        return(/*#__PURE__*/ jsx_runtime_.jsx(InlineCode, {
            children: children
        }));
    }
    return(/*#__PURE__*/ jsx_runtime_.jsx(react_.Box, {
        position: "relative",
        zIndex: "0",
        children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Box, {
            p: 5,
            overflow: "hidden",
            bg: "orange.50",
            borderRadius: 10,
            mb: 10,
            fontSize: "sm",
            boxShadow: "lg",
            children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Box, {
                children: children
            })
        })
    }));
};
/* harmony default export */ const codeblock = (CodeBlock);

;// CONCATENATED MODULE: ./src/components/mdx/index.tsx



const PostLink = ({ children , href  })=>{
    return(/*#__PURE__*/ jsx_runtime_.jsx(react_.Link, {
        color: "made.blue",
        href: href,
        target: "_blank",
        children: children
    }));
};
const CodeInline = ({ children  })=>{
    return(/*#__PURE__*/ jsx_runtime_.jsx("code", {
        children: children
    }));
};
const Paragraph = ({ children  })=>/*#__PURE__*/ jsx_runtime_.jsx(react_.Text, {
        mb: 4,
        children: children
    })
;
const heading = (level)=>{
    const wrapper = ({ children  })=>{
        const sizes = {
            1: "4xl",
            2: "3xl",
            3: "lg",
            4: "md",
            5: "sm",
            6: "xs"
        };
        return(/*#__PURE__*/ jsx_runtime_.jsx(react_.Heading, {
            as: `h${level}`,
            size: sizes[level],
            children: children
        }));
    };
    return wrapper;
};
const BlockQuote = ({ children  })=>{
    return(/*#__PURE__*/ jsx_runtime_.jsx(react_.Box, {
        as: "blockquote",
        borderLeft: "2px",
        borderLeftColor: "made.blue",
        pt: 3,
        px: 3,
        mb: 4,
        overflow: "auto",
        opacity: "80%",
        children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Text, {
            as: "i",
            children: children
        })
    }));
};
const theme = {
    blockquote: BlockQuote,
    h1: heading(1),
    h2: heading(2),
    h3: heading(3),
    h4: heading(4),
    h5: heading(5),
    h6: heading(6),
    a: PostLink,
    p: Paragraph,
    inlineCode: CodeInline,
    code: codeblock
};
/* harmony default export */ const mdx = (theme);

;// CONCATENATED MODULE: ./src/components/post.tsx





const PostPage = ({ title , author , date , source , ...props })=>{
    const publishDate = new Date(date);
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((head_default()), {
                children: /*#__PURE__*/ jsx_runtime_.jsx("title", {
                    children: title
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Container, {
                maxW: "4xl",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(react_.Heading, {
                        as: "h1",
                        size: "3xl",
                        mb: 6,
                        children: title
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Text, {
                        mb: 2,
                        fontWeight: "bold",
                        children: [
                            "by ",
                            author
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(react_.Text, {
                        mb: 4,
                        color: "made.50",
                        children: publishDate.toDateString()
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(external_next_mdx_remote_namespaceObject.MDXRemote, {
                        ...source,
                        components: mdx
                    })
                ]
            })
        ]
    }));
};
/* harmony default export */ const post = (PostPage);

// EXTERNAL MODULE: external "gray-matter"
var external_gray_matter_ = __webpack_require__(76);
var external_gray_matter_default = /*#__PURE__*/__webpack_require__.n(external_gray_matter_);
;// CONCATENATED MODULE: external "next-mdx-remote/serialize"
const serialize_namespaceObject = require("next-mdx-remote/serialize");
;// CONCATENATED MODULE: external "remark-mdx-code-meta"
const external_remark_mdx_code_meta_namespaceObject = require("remark-mdx-code-meta");
;// CONCATENATED MODULE: ./src/lib/mdx.ts



const serializePage = async ({ page  })=>{
    const { data , content  } = external_gray_matter_default()(page);
    const source = await (0,serialize_namespaceObject.serialize)(content, {
        mdxOptions: {
            remarkPlugins: [
                __webpack_require__(423),
                external_remark_mdx_code_meta_namespaceObject.remarkMdxCodeMeta
            ]
        }
    });
    return {
        source,
        data
    };
};

;// CONCATENATED MODULE: ./src/pages/[slug].tsx



const getStaticProps = async (context)=>{
    const { slug  } = context.params;
    const doc = (0,api/* getPostData */.AU)(slug);
    const { source , data  } = await serializePage({
        page: doc.page
    });
    return {
        props: {
            source: source,
            date: doc.date,
            ...data
        }
    };
};
const getStaticPaths = async ()=>{
    const paths = (0,api/* getAllPostsPath */.hC)();
    return {
        paths,
        fallback: false
    };
};
/* harmony default export */ const _slug_ = (post);


/***/ }),

/***/ 930:
/***/ ((module) => {

module.exports = require("@chakra-ui/react");

/***/ }),

/***/ 76:
/***/ ((module) => {

module.exports = require("gray-matter");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 423:
/***/ ((module) => {

module.exports = require("remark-prism");

/***/ }),

/***/ 147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 17:
/***/ ((module) => {

module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [903], () => (__webpack_exec__(921)));
module.exports = __webpack_exports__;

})();