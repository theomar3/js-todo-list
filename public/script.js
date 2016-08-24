'use strict';
if (this.ToDo === undefined) this.ToDo = {};

(function(context) {

  var $input = $('#item-input');
  var $list = $('.list');


  function addListItem() {
    // var inputVal = $input.val();


    $.ajax({
      url: '/api/todo',
      method: 'POST',
      data: {
        text: $input.val(),
        isComplete: false
      }
    })
    .done(function (result){
      console.log(result);
      var templateHtml = $('#todo-template').html();
      var templateFunc = _.template(templateHtml);

      var html = templateFunc(
        {
          listItem: $input.val(),
          taskId: result.id
        }
      );
      $list.append(html);
      $input.val(' ');

    });

  }

  function keyUpHappened(evt) {

    if(evt.keyCode === 13) {
      addListItem();
    }
  }

  function apiRetrieved(data) {
    console.log(data);


    for(var i = 0; i < data.list.length; i++) {
      var $templateHtml = $('#todo-template').html();
      var templateFunc = _.template($templateHtml);

      var html = templateFunc(
        {
          listItem: data.list[i].text,
          taskId : data.list[i].id
        }
      );

      $list.append(html);

    }
  }

  function deleteGuest(evt) {
    var $target = $(evt.target);
    var id = $target.data('id');

    $.ajax({
      url: '/api/todo/' + id,
      method: 'DELETE'
    });

  }

  function start() {


    $input.on('keyup', keyUpHappened);

    var promise = $.ajax({
      url: '/api/todo'
    });
    promise.done(apiRetrieved);

    var $list = $('.list');
    $list.on('click', deleteGuest);

  }

  context.start = start;

})(window.ToDo);
