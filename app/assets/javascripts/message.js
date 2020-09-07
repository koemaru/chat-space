$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html = 
      `<div class="messages">
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
      `<div class="messages">
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

  $('.new-message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main-messages').append(html);
      $('.main-messages').animate({ scrollTop: $('.main-messages')[0].scrollHeight});
      $('.submit-btn').prop("disabled", false);
      $('.new-message')[0].reset();
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  });
});