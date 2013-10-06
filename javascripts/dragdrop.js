

var cols = document.querySelectorAll('.imgcontainer .box');

//class declaration
var DragDrop = function(){dragSrcEl = null};


//adding function definition to class
 DragDrop.prototype.handleDragStart=function(e) {

  dragSrcEl = this;
  //console.log("dragstart"+dragSrcEl.innerHTML);
  //console.log("dragstart");
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

DragDrop.prototype.handleDragOver=function(e) {
  if (e.preventDefault) {
    e.preventDefault(); // prevents default behaviour
  }

  e.dataTransfer.dropEffect = 'move';

  return false;
}

DragDrop.prototype.handleDragEnter=function(e) {
  //add class over to current item
  console.log("class added");
  this.classList.add('over');
}

DragDrop.prototype.handleDragLeave=function(e) {
  this.classList.remove('over');
}

DragDrop.prototype.handleDrop=function(e) {
  // this/e.target is current target element.

    if (e.stopPropagation) {
	e.preventDefault();
      e.stopPropagation(); // Stops some browsers from redirecting.
    }

    // Don't do anything if dropping the same column we're dragging.
    if (dragSrcEl != this) {
     
      dragSrcEl.innerHTML = "";

      //selecting the first empty box form left
      var parentElement=this.parentNode;
      console.log(parentElement.innerHTML);
    var childs= parentElement.getElementsByClassName('box');
	
	//adding image to the first empty child
	for(i=0;i<childs.length;i++){
		if(!childs[i].innerHTML){
    		childs[i].innerHTML =  e.dataTransfer.getData('text/html');
		break;
    	}
	}

    }

    return false;
}

DragDrop.prototype.handleDragEnd=function(e) {
  // this/e.target is the source node.
	e.preventDefault();
  [].forEach.call(cols, function (col) {
    col.classList.remove('over');
  });
}




//instantiating the class
var d = new DragDrop();

[].forEach.call(cols, function(col) {
  //console.log("called for each col");
  col.addEventListener('dragstart', d.handleDragStart, false);
  col.addEventListener('dragenter', d.handleDragEnter, false);
  col.addEventListener('dragover', d.handleDragOver, false);
  col.addEventListener('dragleave', d.handleDragLeave, false);
  col.addEventListener('drop', d.handleDrop, false);
   col.addEventListener('dragend', d.handleDragEnd, false);
});
