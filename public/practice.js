'use strict';
if (this.AppName === undefined) this.AppName = {};

(function(context) {

  var $itemInput = $('#item-input');
  var $list = $('#list');



  function addListItem() {
    var $templateHtml = $('#todo-template').html();
    var templateFunc = _.template($templateHtml);
    var html = templateFunc(
        {
          listItem = $itemInput.val();
      }
    );
    $list.append(html);

    var promise = $.ajax({
      url: '/api/todo',
      method: 'POST',
      data: {
        text: $itemInput.val(),
        isComplete: false;
      }
    });
    promise.done(function(result){
      console.log(result);
    });

    $itemInput.val(' ');
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
            listItem = data.list[i].text
        }
      );
      $list.append(html);

    }


    

  }

  function start() {

    $itemInput.on('keyup', keyUpHappened);

    var promise = $.ajax({
      url: '/api/todo'
    });
    promise.done(apiRetrieved);


  }

  context.start = start;

})(window.AppName);
