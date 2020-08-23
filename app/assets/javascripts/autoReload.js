$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html = 
      `<div class="Main-chat__messagebox__info" data-message-id=${message.id}>
          <div class="Main-chat__messagebox__info__username">
            ${message.user_name}
          </div>
          <div class="Main-chat__messagebox__info__date">
            ${message.created_at}
          </div>
        </div>
          <p class="Main-chat__messagebox__info__content">
            ${message.content}
          </p>
          <img class="Message__image" src="${message.image}">
        </div>`
      return html;
    } else {
      let html =
      `<div class="Main-chat__messagebox__info" data-message-id=${message.id}>
          <div class="Main-chat__messagebox__info__username">
            ${message.user_name}
          </div>
          <div class="Main-chat__messagebox__info__date">
            ${message.created_at}
          </div>
        </div>
          <p class="Main-chat__messagebox__info__content">
            ${message.content}
          </p>
        </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.Main-chat__messagebox__info:last').data("message-id") || 0;
    console.log(last_message_id)
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      
      if (messages !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.Main-chat__messagebox').append(insertHTML);
        $('.Main-chat__messagebox').animate({ scrollTop: $('.Main-chat__messagebox')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});