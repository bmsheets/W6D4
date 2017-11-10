const MessageStore = require('./message_store');

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