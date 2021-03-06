$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html = 
      `<div class="messages" data-message-id=${message.id}>
        <div class="messages__box">
          <p class="messages__box__username">
            ${message.user_name}
          </p>
          <p class="messages__box__date">
            ${message.created_at}
          </p>
        </div>
      <div class="message">
        <p class="message__content">
          ${message.content}
        </p>
        <img class="message__image" src="${message.image}">
      </div>
    </div>`
    return html;
    } else {
      let html =
      `<div class="messages"  data-message-id=${message.id}>
        <div class="messages__box">
          <p class="messages__box__username">
            ${message.user_name}
          </p>
          <p class="messages__box__date">
            ${message.created_at}
          </p>
        </div>
        <div class="message">
          <p class="message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.messages:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-messages').append(insertHTML);
        $('.main-messages').animate({ scrollTop: $('.main-messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});