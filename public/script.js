'use strict';
if (this.ToDo === undefined) this.ToDo = {};

(function(context) {

  var $input = $('#item-input');
  var $list = $('.list');


  function addListItem() {


    var $templateHtml = $('#todo-template').html();
    var templateFunc = _.template($templateHtml);

    var html = templateFunc(
      {
        listItem: $input.val()
      }
    );

    $list.append(html);


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
    });

    $input.val(' ');

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
          listItem: data.list[i].text
        }
      );

      $list.append(html);

    }
  }

  function start() {


    $input.on('keyup', keyUpHappened);

    var promise = $.ajax({
      url: '/api/todo'
    });
    promise.done(apiRetrieved);

  }

  context.start = start;

})(window.ToDo);
