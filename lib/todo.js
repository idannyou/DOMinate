

$l(() => {
  $l('.add-to-do').on('click', () => addToDo());
});

const addToDo = function(){
  let eleInput = document.createElement('li');
  let toDoEle = $l('ul').append((eleInput));
  let buttonEle = document.createElement('button');
  $l('ul').children().append(document.createElement('input'));
  $l('input').attr('type', 'text');

};
