/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

window.$l = function(selector) {
  if(selector instanceof HTMLElement)
  {
    return new DOMNodeCollection([selector]);
  }
  else if(selector instanceof Function)
  {
    document.addEventListener("DOMContentLoaded", selector);
  }
  else
  {
    return new DOMNodeCollection(Array.from(document.querySelectorAll(selector)));
  }
}

window.$l.extend = function(...objs) {
  return Object.assign(objs[0],...objs.slice(1));
}

window.$l.ajax = function(options)
{
  const xhr = new XMLHttpRequest();
  const method = options.type || "GET";
  const url = options.url || "";
  const success = options.success || function (){};
  const error = options.error || function (){};
  let contentType = options.contentType || "x-www-form-urlencoded";
  if (contentType.toLowerCase() === "html")
  {
    contentType = "x-www-form-urlencoded";
  }
  
  xhr.onreadystatechange = function() {
    if(this.readyState === 4){
      if(this.status === 200)
      {
        success(JSON.parse(this.response));
      }else{
        error();
      }
    }
  }
  xhr.open(method, url);
  xhr.setRequestHeader("Content-type", `application/${contentType}`);
  xhr.send(JSON.stringify(options.data));
}
// const objA = {a: 'a', b: 'a', c: 'a'};
// const objB = {b: 'b', c: 'b'};
// const objC = {c: 'c'};
// $l.extend(objA, objB, objC); //=> {a: 'a', b: 'b', c: 'c'}
// console.log(objA); //=> {a: 'a', b: 'b', c: 'c'}

$l.ajax({
    type: 'GET',
    url: "http://soundcloud.com/oembed?url=http%3A//soundcloud.com/forss/flickermood&format=json",
    success(data) {
      console.log("We have your weather!")
      console.log(data);
    },
    error() {
      console.error("An error occurred.");
    },
 });





/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(elements) {
    this.elements = elements;
  }
  
  html (string){
    if (typeof string === 'undefined') {
      this.elements.forEach((el) =>{
        el.innerHTML = string;
      });
    }else{
      return this.elements[0].innerHTML;
    }
  }
  
  empty() {
    this.elements.forEach((el) =>{
      el.innerHTML = "";
    });
  }
  
  append(element){
    if(element instanceof HTMLElement)
    {
      this.elements.forEach((el) => {
        el.innerHTML += element.outerHTML;
      });
    }      
    if (typeof element === 'string')
    {
      console.log("here");
      this.elements.forEach((el) => {
        el.innerHTML += element;
      });
    }  
    if(element instanceof DOMNodeCollection){
      console.log("domnode");
      this.elements.forEach((el) => {
        element.elements.forEach((el2) => {
          el.innerHTML += el2.outerHTML;
        })
      })
    }
  }
  
  attr(key, val) {
    if (val) {
      this.elements.forEach((el) => {
        el.setAttribute(key, val);
      });
      return this.elements;
    } else {
      return this.elements[0].attributes[key]["value"];
    }
  }
  
  addClass(className) {
    this.elements.forEach((el) =>{
      if(el.className === "") {
        el.className = className;
      } else {
        el.className += ' ' + className;
      }
    });
  }
  
  removeClass(className) {
    this.elements.forEach((el) =>{
      let classNames = el.className.split(" ");
      console.log(classNames);
      el.className = classNames.filter(el => el !== className).join(" ");
    });
  }
  
  children() {
    let children = [];
    this.elements.forEach((el) => {
      children = children.concat(Array.from(el.children));
      console.log(el.children);
    });
    return new DOMNodeCollection(children);
  }
  
  parent() {
    let parents = [];
    this.elements.forEach((el) => {
      if (!parents.includes(el.parentElement)) {
        parents.push(el.parentElement);
      }
    });
    return new DOMNodeCollection(parents);
  }
  
  find(selector) {
    let result = [];
    this.elements.forEach((el) => {
      result = result.concat(Array.from(el.querySelectorAll(selector)));
    });
    return result;
  }
  
  remove() {
    this.elements.forEach((el) => {
      el.remove();
    });
    this.elements = [];
  }
  
  on(type, callback) {
    this.elements.forEach((el) => {
      if(el.listeners)
      {
        el.listeners.push(callback);
      }else {
        el.listeners = [callback];
      }
      el.addEventListener(type, callback);
    });
  }
  
  off(type, callback) {
    this.elements.forEach((el) => {
      if (callback) {
        el.removeEventListener(type, callback);
      } else {
        el.listeners.forEach((listener) =>{
          el.removeEventListener(type, listener);
        })
      }
    });
  }

  
}

module.exports = DOMNodeCollection;

/***/ })
/******/ ]);