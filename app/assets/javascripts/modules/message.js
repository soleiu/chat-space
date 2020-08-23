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
  $('.Form__contents').on('submit', function(e){
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
      console.log(data)
      let html = buildHTML(data);
      $('.Main-chat__messagebox').append(html);
      $('.Form__contents')[0].reset();
      $('.Form__submitBtn').removeAttr('disabled');
      $('.Main-chat__messagebox').animate({ scrollTop: $('.Main-chat__messagebox')[0].scrollHeight});
      return false
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
    .always(function(data){
      $('.Form__submit-btn').prop('disabled', false);  
    })
  })
  $(function(){
    let last_message_id = $('.Main-chat__messagebox:last').data("Main-chat__message-id") || 0;
  })
});