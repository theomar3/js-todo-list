'use strict';
if (this.AppName === undefined) this.AppName = {};

(function(context) {

  var $inputValue = $('#item-input').val();
  var $list = $('.list');


  function templateEntry(text, taskId, isComplete) {
    var className = '';
    if(isComplete == 'true') {
      className = 'item-done';
    }

    var $templateHtml = $('#todo-template').html();
    var templateFunc = _.template($templateHtml);
    var html = templateFunc(
      {
        text: text,
        taskId: taskId,
        className: className

      }
    );
    $list.append(html);
    $inputValue = '';
  }

  function postAPIDataAndList() {

    var promise = $.ajax({
      url: '/api/todo',
      method: 'POST',
      data: {
        text: $inputValue,
        isComplete: false
      }
    });
    promise.done(apiResponse);

    function apiResponse(data) {
      console.log(data);
      templateEntry($inputValue, data.taskId, false);
    }

  }

  function getAPIData() {
    var promise = $.ajax({
      url: '/api/todo',
    });
    promise.done(gotAPIData);

    function gotAPIData(data) {
      console.log(data);
      data.list.forEach(entries);
    }

    function entries(entry) {
      console.log(entry);
      templateEntry(entry.text, entry.taskId, entry.isComplete);
    }
  }

  function deleteItem(evt) {
    var $target = $(evt.target);
    var id = $target.parent().data('id');

    $.ajax({
      url: '/api/todo' + id,
      method: 'DELETE'
    });

    $target.parent().remove();
  }

  function doneItem(evt) {
    var $target = $(evt.target);
    var id = $target.data('id');
    var text = $target.data('text');

    $.ajax({
      url: '/api/todo' + id,
      method: 'PUT',
      data: {
        text: text,
        taskId: id,
        isComplete: true
      }
    });

    $target.parent().addClass('item-done');
  }


  function keyUpHappened(evt) {
    if(evt.keyCode === 13) {
      postAPIDataAndList();
    }
  }

  function start() {

    var $input = $('#item-input');
    $input.on('keyup', keyUpHappened);

    //when page is refreshed
    getAPIData();

    $list.on('click', 'delete-button', deleteItem);
    $list.on('click', doneItem);

  }

  context.start = start;

})(window.AppName);
