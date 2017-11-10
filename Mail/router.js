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