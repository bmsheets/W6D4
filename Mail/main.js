const Router = require('./router');
const Inbox = require('./inbox');
const Sent = require('./sent');


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

