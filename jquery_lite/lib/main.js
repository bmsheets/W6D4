const DOMNodeCollection = require("./dom_node_collection");

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



