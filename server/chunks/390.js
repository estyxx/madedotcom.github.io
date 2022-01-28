"use strict";
exports.id = 390;
exports.ids = [390];
exports.modules = {

/***/ 390:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hC": () => (/* binding */ getAllPostsPath),
/* harmony export */   "Qk": () => (/* binding */ getPostsMetaData),
/* harmony export */   "AU": () => (/* binding */ getPostData)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gray_matter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(76);
/* harmony import */ var gray_matter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(gray_matter__WEBPACK_IMPORTED_MODULE_2__);



// current 'posts' directory
const postsDirectory = path__WEBPACK_IMPORTED_MODULE_0___default().join(process.cwd(), "posts");
const FILE_EXTENSION = ".md";
const DATE_REGEX = /([0-9]{4})-([0-9]{2})-([0-9]{2})/;
const getPostFiles = ()=>{
    const fileNames = fs__WEBPACK_IMPORTED_MODULE_1___default().readdirSync(postsDirectory);
    return fileNames.map((fileName)=>{
        const match = DATE_REGEX.exec(fileName);
        const date = match ? match[0] : "";
        const filePath = {
            ...path__WEBPACK_IMPORTED_MODULE_0___default().parse(fileName),
            date: date
        };
        return filePath;
    }).filter((file)=>file.date && file.ext == FILE_EXTENSION
    );
};
const getAllPostsPath = ()=>{
    const files = getPostFiles();
    return files.map((file)=>{
        return {
            params: {
                slug: file.name
            }
        };
    });
};
const getPostsMetaData = ()=>{
    const files = getPostFiles();
    const postsMetaData = files.map(getPostMetaData);
    return postsMetaData.sort((a, b)=>+new Date(a.date) - +new Date(b.date)
    ).reverse();
};
const getPostMetaData = ({ base , name  })=>{
    const fullPath = path__WEBPACK_IMPORTED_MODULE_0___default().join(postsDirectory, base);
    // get MDX metadata and content
    const fileContents = fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(fullPath, "utf8");
    // get metadata, content
    const { data  } = gray_matter__WEBPACK_IMPORTED_MODULE_2___default()(fileContents);
    const match = DATE_REGEX.exec(name);
    return {
        slug: name,
        date: match ? match[0] : "",
        ...data
    };
};
const getPostData = (slug)=>{
    const fullPath = path__WEBPACK_IMPORTED_MODULE_0___default().join(postsDirectory, slug + FILE_EXTENSION);
    const meta = getPostMetaData({
        base: slug + FILE_EXTENSION,
        name: slug
    });
    // get MDX metadata and content
    const page = fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(fullPath, "utf8");
    return {
        page,
        ...meta
    };
};


/***/ })

};
;