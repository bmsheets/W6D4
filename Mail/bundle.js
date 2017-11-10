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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

let messages = {
  sent: [
    {to: "friend@mail.com", subject: "Check this out", body: "It's so cool"},
    {to: "person@mail.com", subject: "zzz", body: "so booring"}
  ],
  inbox: [
    {from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out", body:"Stay at home mom discovers cure for leg cramps. Doctors hate her"}, {from: "person@mail.com", subject: "Questionnaire", body: "Take this free quiz win $1000 dollars"}
  ]
}

class Message{
  constructor(to, subject, body)
  {
    this.to = to;
    this.subject = subject;
    this.body = body;
  }  
}
  
let MessageStore = {
  messageDraft: new Message("","",""),
  getInboxMessages: function() {
    return messages.inbox;
  },
  getSentMessages: function() {
    return messages.sent;
  },
  updateDraftField: function(field, value){
    messageDraft.field = value;
  }
}

module.exports = MessageStore;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Router = __webpack_require__(2);
const Inbox = __webpack_require__(3);
const Sent = __webpack_require__(4);


const routes = {
  inbox: Inbox,
  sent: Sent
};

document.addEventListener('DOMContentLoaded', (event) => {
  const $sidebarItems = document.querySelectorAll('.sidebar-nav li');
  $sidebarItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      console.log(event);
      window.location.hash = event.currentTarget.innerText.toLowerCase();
    });
  });
  const content = document.querySelector('.content');
  const router = new Router(content, routes);
  router.start();
});



/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Router {
  constructor(node, routes) {
    this.node = node;
    this.routes = routes;
  }
  
  start() {
    this.render();
    window.addEventListener('hashchange', (event) => {
      this.render();
    });
  }
  
  render() {
    this.node.innerHTML = "";
    const currentRoute = this.activeRoute();
    const newNode = document.createElement('p');
    if (currentRoute) {
      newNode.innerHTML = currentRoute.render().outerHTML;
    } else {
      newNode.innerHTML = "";
    }
    this.node.appendChild(newNode);
  }
  
  activeRoute() {
    return this.routes[window.location.hash.slice(1)];
  }
}

module.exports = Router;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const MessageStore = __webpack_require__(0);

const Inbox = {
  render: function() {
    const vape = document.createElement('ul');
    MessageStore.getInboxMessages().forEach((dubstep) => {
      vape.innerHTML += "<li class='message'><span class='from'>" + dubstep.from + '</span><span class="subject">' + dubstep.subject + '</span> <span class="body">' + dubstep.body + "</span></li>";
    })
    vape.className = "messages";
    return vape;
  }
};

module.exports = Inbox;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const MessageStore = __webpack_require__(0);

const Inbox = {
  render: function() {
    const vape = document.createElement('ul');
    MessageStore.getSentMessages().forEach((dubstep) => {
      vape.innerHTML += "<li class='message'><span class='from'>" + dubstep.from + '</span><span class="subject">' + dubstep.subject + '</span> <span class="body">' + dubstep.body + "</span></li>";
    })
    vape.className = "messages";
    return vape;
  }
};

module.exports = Sent;

/***/ })
/******/ ]);