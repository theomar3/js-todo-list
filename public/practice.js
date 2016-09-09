'use strict';
if (this.AppName === undefined) this.AppName = {};

(function(context) {

  var $itemInputValue = $('#item-input').val();
  var $list = $('.list');

  var templateEntry(text, id, isComplete) {
    var className = '';
    if(isComplete == 'true') {
      className = 'item-done';
    }

    var templateHtml = $('#todo-template').html();
    var templateFunc = _.template(templateHtml);
    var html = templateFunc({
      text: $itemInputValue,
      id: id,
      className: className
    });
    $list.append(html);
  }


  function getAPIData() {


    var promise = $.ajax({
      url: 'api/todo',
      method: 'POST',
      data: {
        text: $itemInputValue,
        isComplete: false
      }
    });

    promise.done(apiResponse);

    function apiResponse(data) {
      templateEntry($itemInputValue, data.id, false);
    }
    $itemInputValue = '';
  }

  function keyUpHappened(evt) {
    if(evt.keyCode === 13) {
      getAPIData();
    }

  }

  function loadExistingData() {
    var promise = $.ajax({
      url: 'api/todo',
    });

    promise.done(gotAPIDataBack);

    function gotAPIDataBack(data) {
      data.list.forEach(function(response) {
        templateEntry(response.text, response.id, response.isComplete);
      });
    }
  }

  function deleteItem(evt) {
    evt.stopPropagation();
    var $target = $(evt.target);
    var id = $target.parent().data('id');

    var promise = $.ajax({
      url: 'api/todo/' + id,
      method: 'DELETE'
    });

    promise.done(function() {
      $target.parent().remove();
    });
  }

  function doneItem(evt) {
    var $target = $(evt.target);
    var id = $target.data('id');
    var text = $target.data('text');

    $.ajax({
      url: 'api/todo/' + id,
      method: 'PUT',
      data: {
        text: text,
        isComplete: true
      }
    });

    $target.addClass('item-done');
  }

  function start() {
    var $itemInput = $('#item-input');
    $itemInput.on('keyup', keyUpHappened);

    //when refreshed
    loadExistingData();

    $list.on('click','delete-button', deleteItem);
    $list.on('click', doneItem);
  }

  context.start = start;

})(window.AppName);
