'use strict';
if (this.ToDo === undefined) this.ToDo = {};

(function(context) {

  var $input;

  function addListItem() {

    var $templateHtml = $('#todo-template');
    var templateFunc = _.template($templateHtml);
    var $list = $('.list');

    var html = templateFunc(
      {
        listItem: $input.val();
      }
    );

    $list.append(html);
  }

  function keyUpHappened(evt) {
    if(evt.keyCode === 13) {
      addListItem();
    }
  }

  function start() {



    $input = $('#item-input');

    $input.on('keyup' keyUpHappened);

  }

  context.start = start;

})(window.ToDo);
