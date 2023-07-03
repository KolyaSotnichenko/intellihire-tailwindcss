"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/transcribe";
exports.ids = ["pages/api/transcribe"];
exports.modules = {

/***/ "formidable":
/*!*****************************!*\
  !*** external "formidable" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("formidable");

/***/ }),

/***/ "openai":
/*!*************************!*\
  !*** external "openai" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("openai");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "(api)/./pages/api/transcribe.ts":
/*!*********************************!*\
  !*** ./pages/api/transcribe.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"config\": () => (/* binding */ config),\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var openai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! openai */ \"openai\");\n/* harmony import */ var openai__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(openai__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! formidable */ \"formidable\");\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(formidable__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst config = {\n    api: {\n        bodyParser: false\n    }\n};\nasync function handler(req, res) {\n    const configuration = new openai__WEBPACK_IMPORTED_MODULE_0__.Configuration({\n        apiKey: process.env.OPENAI_API_KEY\n    });\n    const openai = new openai__WEBPACK_IMPORTED_MODULE_0__.OpenAIApi(configuration);\n    // Here, we create a temporary file to store the audio file using Vercel's tmp directory\n    // As we compressed the file and are limiting recordings to 2.5 minutes, we won't run into trouble with storage capacity\n    const fData = await new Promise((resolve, reject)=>{\n        const form = new formidable__WEBPACK_IMPORTED_MODULE_1__.IncomingForm({\n            multiples: false,\n            uploadDir: \"/tmp\",\n            keepExtensions: true\n        });\n        form.parse(req, (err, fields, files)=>{\n            if (err) return reject(err);\n            resolve({\n                fields,\n                files\n            });\n        });\n    });\n    const videoFile = fData.files.file;\n    const videoFilePath = videoFile?.filepath;\n    console.log(videoFilePath);\n    try {\n        const resp = await openai.createTranscription(fs.createReadStream(videoFilePath), \"whisper-1\");\n        const transcript = resp?.data?.text;\n        // Content moderation check\n        const response = await openai.createModeration({\n            input: resp?.data?.text\n        });\n        if (response?.data?.results[0]?.flagged) {\n            res.status(200).json({\n                error: \"Inappropriate content detected. Please try again.\"\n            });\n            return;\n        }\n        res.status(200).json({\n            transcript\n        });\n        return resp.data;\n    } catch (error) {\n        console.error(\"server error\", error);\n        res.status(500).json({\n            error: \"Error\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvdHJhbnNjcmliZS50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBa0Q7QUFDUjtBQUMxQyxNQUFNRyxLQUFLQyxtQkFBT0EsQ0FBQyxjQUFJO0FBRWhCLE1BQU1DLFNBQVM7SUFDcEJDLEtBQUs7UUFDSEMsWUFBWTtJQUNkO0FBQ0YsRUFBRTtBQUVhLGVBQWVDLFFBQVFDLEdBQVEsRUFBRUMsR0FBUTtJQUN0RCxNQUFNQyxnQkFBZ0IsSUFBSVgsaURBQWFBLENBQUM7UUFDdENZLFFBQVFDLFFBQVFDLElBQUlDO0lBQ3RCO0lBQ0EsTUFBTUMsU0FBUyxJQUFJZiw2Q0FBU0EsQ0FBQ1U7SUFFN0Isd0ZBQXdGO0lBQ3hGLHdIQUF3SDtJQUN4SCxNQUFNTSxRQUFRLE1BQU0sSUFBSUMsUUFDdEIsQ0FBQ0MsU0FBU0M7UUFDUixNQUFNQyxPQUFPLElBQUluQixvREFBWUEsQ0FBQztZQUM1Qm9CLFdBQVc7WUFDWEMsV0FBVztZQUNYQyxnQkFBZ0I7UUFDbEI7UUFDQUgsS0FBS0ksTUFBTWhCLEtBQUssQ0FBQ2lCLEtBQUtDLFFBQVFDO1lBQzVCLElBQUlGLEtBQUssT0FBT04sT0FBT007WUFDdkJQLFFBQVE7Z0JBQUVRO2dCQUFRQztZQUFNO1FBQzFCO0lBQ0Y7SUFHRixNQUFNQyxZQUFZWixNQUFNVyxNQUFNRTtJQUM5QixNQUFNQyxnQkFBZ0JGLFdBQVdHO0lBQ2pDQyxRQUFRQyxJQUFJSDtJQUVaLElBQUk7UUFDRixNQUFNSSxPQUFPLE1BQU1uQixPQUFPb0Isb0JBQ3hCakMsR0FBR2tDLGlCQUFpQk4sZ0JBQ3BCO1FBS0YsTUFBTU8sYUFBYUgsTUFBTUksTUFBTUM7UUFFL0IsMkJBQTJCO1FBQzNCLE1BQU1DLFdBQVcsTUFBTXpCLE9BQU8wQixpQkFBaUI7WUFDN0NDLE9BQU9SLE1BQU1JLE1BQU1DO1FBQ3JCO1FBRUEsSUFBSUMsVUFBVUYsTUFBTUssT0FBTyxDQUFDLEVBQUUsRUFBRUMsU0FBUztZQUN2Q25DLElBQ0dvQyxPQUFPLEtBQ1BDLEtBQUs7Z0JBQUVDLE9BQU87WUFBb0Q7WUFDckU7UUFDRjtRQUVBdEMsSUFBSW9DLE9BQU8sS0FBS0MsS0FBSztZQUFFVDtRQUFXO1FBQ2xDLE9BQU9ILEtBQUtJO0lBQ2QsRUFBRSxPQUFPUyxPQUFPO1FBQ2RmLFFBQVFlLE1BQU0sZ0JBQWdCQTtRQUM5QnRDLElBQUlvQyxPQUFPLEtBQUtDLEtBQUs7WUFBRUMsT0FBTztRQUFRO0lBQ3hDO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9saWZ0b2ZmLy4vcGFnZXMvYXBpL3RyYW5zY3JpYmUudHM/NTJlMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25maWd1cmF0aW9uLCBPcGVuQUlBcGkgfSBmcm9tIFwib3BlbmFpXCI7XG5pbXBvcnQgeyBJbmNvbWluZ0Zvcm0gfSBmcm9tIFwiZm9ybWlkYWJsZVwiO1xuY29uc3QgZnMgPSByZXF1aXJlKFwiZnNcIik7XG5cbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIGFwaToge1xuICAgIGJvZHlQYXJzZXI6IGZhbHNlLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgY29uc3QgY29uZmlndXJhdGlvbiA9IG5ldyBDb25maWd1cmF0aW9uKHtcbiAgICBhcGlLZXk6IHByb2Nlc3MuZW52Lk9QRU5BSV9BUElfS0VZLFxuICB9KTtcbiAgY29uc3Qgb3BlbmFpID0gbmV3IE9wZW5BSUFwaShjb25maWd1cmF0aW9uKTtcblxuICAvLyBIZXJlLCB3ZSBjcmVhdGUgYSB0ZW1wb3JhcnkgZmlsZSB0byBzdG9yZSB0aGUgYXVkaW8gZmlsZSB1c2luZyBWZXJjZWwncyB0bXAgZGlyZWN0b3J5XG4gIC8vIEFzIHdlIGNvbXByZXNzZWQgdGhlIGZpbGUgYW5kIGFyZSBsaW1pdGluZyByZWNvcmRpbmdzIHRvIDIuNSBtaW51dGVzLCB3ZSB3b24ndCBydW4gaW50byB0cm91YmxlIHdpdGggc3RvcmFnZSBjYXBhY2l0eVxuICBjb25zdCBmRGF0YSA9IGF3YWl0IG5ldyBQcm9taXNlPHsgZmllbGRzOiBhbnk7IGZpbGVzOiBhbnkgfT4oXG4gICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgZm9ybSA9IG5ldyBJbmNvbWluZ0Zvcm0oe1xuICAgICAgICBtdWx0aXBsZXM6IGZhbHNlLFxuICAgICAgICB1cGxvYWREaXI6IFwiL3RtcFwiLFxuICAgICAgICBrZWVwRXh0ZW5zaW9uczogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgZm9ybS5wYXJzZShyZXEsIChlcnIsIGZpZWxkcywgZmlsZXMpID0+IHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICByZXNvbHZlKHsgZmllbGRzLCBmaWxlcyB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgKTtcblxuICBjb25zdCB2aWRlb0ZpbGUgPSBmRGF0YS5maWxlcy5maWxlO1xuICBjb25zdCB2aWRlb0ZpbGVQYXRoID0gdmlkZW9GaWxlPy5maWxlcGF0aDtcbiAgY29uc29sZS5sb2codmlkZW9GaWxlUGF0aCk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwID0gYXdhaXQgb3BlbmFpLmNyZWF0ZVRyYW5zY3JpcHRpb24oXG4gICAgICBmcy5jcmVhdGVSZWFkU3RyZWFtKHZpZGVvRmlsZVBhdGgpLFxuICAgICAgXCJ3aGlzcGVyLTFcIlxuICAgICAgLy8gVW5jb21tZW50IHRoZSBsaW5lIGJlbG93IGlmIHlvdSB3b3VsZCBhbHNvIGxpa2UgdG8gY2FwdHVyZSBmaWxsZXIgd29yZHM6XG4gICAgICAvLyBcIlBsZWFzZSBpbmNsdWRlIGFueSBmaWxsZXIgd29yZHMgc3VjaCBhcyAndW0nLCAndWgnLCAnZXInLCBvciBvdGhlciBkaXNmbHVlbmNpZXMgaW4gdGhlIHRyYW5zY3JpcHRpb24uIE1ha2Ugc3VyZSB0byBhbHNvIGNhcGl0YWxpemUgYW5kIHB1bmN0dWF0ZSBwcm9wZXJseS5cIlxuICAgICk7XG5cbiAgICBjb25zdCB0cmFuc2NyaXB0ID0gcmVzcD8uZGF0YT8udGV4dDtcblxuICAgIC8vIENvbnRlbnQgbW9kZXJhdGlvbiBjaGVja1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgb3BlbmFpLmNyZWF0ZU1vZGVyYXRpb24oe1xuICAgICAgaW5wdXQ6IHJlc3A/LmRhdGE/LnRleHQsXG4gICAgfSk7XG5cbiAgICBpZiAocmVzcG9uc2U/LmRhdGE/LnJlc3VsdHNbMF0/LmZsYWdnZWQpIHtcbiAgICAgIHJlc1xuICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgLmpzb24oeyBlcnJvcjogXCJJbmFwcHJvcHJpYXRlIGNvbnRlbnQgZGV0ZWN0ZWQuIFBsZWFzZSB0cnkgYWdhaW4uXCIgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyB0cmFuc2NyaXB0IH0pO1xuICAgIHJldHVybiByZXNwLmRhdGE7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcInNlcnZlciBlcnJvclwiLCBlcnJvcik7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogXCJFcnJvclwiIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiQ29uZmlndXJhdGlvbiIsIk9wZW5BSUFwaSIsIkluY29taW5nRm9ybSIsImZzIiwicmVxdWlyZSIsImNvbmZpZyIsImFwaSIsImJvZHlQYXJzZXIiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwiY29uZmlndXJhdGlvbiIsImFwaUtleSIsInByb2Nlc3MiLCJlbnYiLCJPUEVOQUlfQVBJX0tFWSIsIm9wZW5haSIsImZEYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmb3JtIiwibXVsdGlwbGVzIiwidXBsb2FkRGlyIiwia2VlcEV4dGVuc2lvbnMiLCJwYXJzZSIsImVyciIsImZpZWxkcyIsImZpbGVzIiwidmlkZW9GaWxlIiwiZmlsZSIsInZpZGVvRmlsZVBhdGgiLCJmaWxlcGF0aCIsImNvbnNvbGUiLCJsb2ciLCJyZXNwIiwiY3JlYXRlVHJhbnNjcmlwdGlvbiIsImNyZWF0ZVJlYWRTdHJlYW0iLCJ0cmFuc2NyaXB0IiwiZGF0YSIsInRleHQiLCJyZXNwb25zZSIsImNyZWF0ZU1vZGVyYXRpb24iLCJpbnB1dCIsInJlc3VsdHMiLCJmbGFnZ2VkIiwic3RhdHVzIiwianNvbiIsImVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/transcribe.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/transcribe.ts"));
module.exports = __webpack_exports__;

})();