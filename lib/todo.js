

$l(() => {
  $l('.add-to-do').on('click', () => addToDo());
});

const addToDo = function(){
  let eleLi = document.createElement('li');
  $l(eleLi).append(addInputButton());
  $l(eleLi).append(deleteButton());
  $l('ul').append(eleLi);
};

const addInputButton = function(){
  let eleInput = document.createElement('input');
  $l(eleInput).attr('type', 'text');
  return eleInput;
};

const deleteButton = function(){
  let buttonEle = document.createElement('button');
  buttonEle.classList.add('delete');
  buttonEle.innerHTML = 'Completed';
  $l(buttonEle).on('click', () => deleteToDo());
  return buttonEle;
};

const deleteToDo = function(){
  $l(event.target).parent().remove();
};
