'use strict';
if (this.ToDo === undefined) this.ToDo = {};

(function(context) {

  var $input = $('#item-input');
  var $list = $('.list');
  var done;

  function templateEntry(text, taskId, isComplete) {
    var className = '';
    if (isComplete == 'true') {
      className = 'item-done';
    }

    var templateHtml = $('#todo-template').html();
    var templateFunc = _.template(templateHtml);
    var html = templateFunc(
      {
        text: text,
        taskId: taskId,
        className: className
      }
    );
    $list.append(html);
    $input.val('');
  }

  function addListItem() {

    var promise = $.ajax({
      url: '/api/todo',
      method: 'POST',
      data: {
        text: $input.val(),
        isComplete: false
      }
    });
    promise.done(function(data){
      templateEntry($input.val(), data.id, false);
    });


  }

  function keyUpHappened(evt) {

    if(evt.keyCode === 13) {
      addListItem();
    }
  }

  function apiRetrieved() {
    var promise = $.ajax({
      url: '/api/todo'
    });
    promise.done(function(data) {
      console.log(data);

      data.list.forEach(function(entry) {
        console.log(entry);
        templateEntry(entry.text, entry.id, entry.isComplete );
      });
    });
  }

  function deleteItem(evt) {
    var $target = $(evt.target);
    var id = $target.parent().data('id');

    $.ajax({
      url: '/api/todo/' + id,
      method: 'DELETE'
    });

    $target.parent().remove();

  }

  function doneItem(evt) {
    var $target = $(evt.target);
    var id = $target.data('id');
    var text = $target.data('text');



    $.ajax({
      url: '/api/todo/' + id,
      method: 'PUT',
      data: {
        text: text,
        id: id,
        isComplete: true

      }
    });

    $target.parent().addClass('item-done');
  }



  function start() {


    $input.on('keyup', keyUpHappened);

    apiRetrieved();


    $list.on('click',".delete-button", deleteItem);

    $list.on('click', doneItem);

  }

  context.start = start;

})(window.ToDo);
