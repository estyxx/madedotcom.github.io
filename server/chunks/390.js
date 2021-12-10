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
const fs = __webpack_require__(147);
const path = __webpack_require__(17);
const matter = __webpack_require__(76);
// current 'posts' directory
const postsDirectory = path.join(process.cwd(), "posts");
const fileExtension = ".md";
const getAllFilesInDirectory = ()=>{
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName)=>{
        return path.parse(fileName);
    });
};
const getFiles = ()=>{
    const allFiles = getAllFilesInDirectory();
    return allFiles.filter((file)=>file.ext == fileExtension
    );
};
const getAllPostsPath = ()=>{
    const files = getFiles();
    return files.map((file)=>{
        return {
            params: {
                slug: file.name
            }
        };
    });
};
const getPostsMetaData = ()=>{
    const files = getFiles();
    const postsMetaData = files.map(getPostMetaData);
    return postsMetaData.sort((post)=>post.date
    ).reverse();
};
const getPostMetaData = (file)=>{
    const fullPath = path.join(postsDirectory, file.base);
    // get MDX metadata and content
    const fileContents = fs.readFileSync(fullPath, "utf8");
    // get metadata, content
    const { data  } = matter(fileContents);
    const match = /([0-9]{4})-([0-9]{2})-([0-9]{2})/.exec(file.name);
    return {
        slug: file.name,
        date: match && match[0],
        ...data
    };
};
const getPostData = (slug)=>{
    const fullPath = path.join(postsDirectory, slug + fileExtension);
    const meta = getPostMetaData({
        base: slug + fileExtension,
        name: slug
    });
    // get MDX metadata and content
    const page = fs.readFileSync(fullPath, "utf8");
    return {
        slug: slug,
        page,
        ...meta
    };
};


/***/ })

};
;