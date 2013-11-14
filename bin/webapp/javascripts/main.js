/**
 * 
 */
function initPage () {
	console.log('init');
	countComments();
	registerEvents();
}

function countComments () {
	var commnetList = document.querySelectorAll('.commentList');
	for(var i =0 ; i < commnetList.length ; i++) {
		var currentNode = commnetList[i];
		var nPListCount = currentNode.querySelectorAll('p').length;
		currentNode.parentNode.parentNode.querySelector('article div.numberOfComments').innerText = nPListCount;
	}
	//document.querySelector('#commentNum span').innerText = nCommentsCount;
}

function registerEvents () {
	console.log('registering Events');
	var eleList = document.getElementsByClassName('toggleComments');
	for( var i = 0; i<eleList.length ; i++ ) {
		eleList[i].addEventListener('click',toggleComments,false);
	}
	
	var toggleWriteFormElem = document.getElementById('toggleWritePostForm');
	toggleWriteFormElem.addEventListener('click',toggleWriteForm,false);
	
	var formList = document.querySelectorAll('.commentWrite input[type=submit]');
	for (var j=0;j<formList.length;j++){
		formList[j].addEventListener('click',writeComments,false);
	}
}

function writeComments(e) {
	e.preventDefault(); // submit이 자동으로 동작하는것을 막는다.
	
	var eleForm = e.currentTarget.form; // form element
	var oFormData = new FormData(eleForm); // form 들을 자동으로 묶어준다.	
	
	var sID = eleForm[0].value;
	var url = "/board/"+ sID + "/comments.json"; // 서버에 보낼 주소.
	
	var request = new XMLHttpRequest();
	request.open("POST",url,true);
	request.send(oFormData);
}

function toggleComments(e) { // e에 다양한 이벤트가 발생한 정보가 담겨져 있다.
	var commentWrapperNode = e.target.parentNode.parentNode.parentNode.parentNode.querySelector('div.commentWrap');
 	console.log(commentWrapperNode.innerHTML);
//
 	var displayValue = getCssValue(commentWrapperNode,'display');
	
	if(displayValue === 'none') {
		console.log('expanding comments');
		setCssValue(commentWrapperNode,'display','block');
		commentWrapperNode.className = 'commentWrap show';
	} else if(displayValue === 'block') {
		console.log('closing comments');
		setCssValue(commentWrapperNode,'display','none');
		commentWrapperNode.className = 'commentWrap';
	}

}
function toggleWriteForm(e) { // e에 다양한 이벤트가 발생한 정보가 담겨져 있다.
 	var displayValue = getCssValue(document.getElementById('writePost'),'display');
	console.log(displayValue);
 	if(displayValue === 'none') {
		console.log("!");
 		setCssValue(document.getElementById('writePost'),'display','block');
 	} else if(displayValue === 'block') {
//		console.log(displayValue);
		setCssValue(document.getElementById('writePost'),'display','none');
	}
	console.log(displayValue);
}


function getCssValue(node,key){
 	var style = window.getComputedStyle(node),
    keyValue = style.getPropertyValue(key);
 	return keyValue;
}

function setCssValue(node,key,value){
	var currentStyleValue = node.getAttribute("style");
	node.setAttribute("style",currentStyleValue+key+":"+value+";");
	console.log(node)
}

window.onload = initPage;