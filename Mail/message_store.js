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