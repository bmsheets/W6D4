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