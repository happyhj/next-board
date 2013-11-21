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
	
	// 댓글을 보내는 ajax 이벤트
	var formList = document.querySelectorAll('.commentWrite input[type=submit]');
	for (var j=0;j<formList.length;j++){
		formList[j].addEventListener('click',writeComments,false);
	}
	// 댓글을 지우는 ajax 이벤트
	var deleteCommentElements = document.querySelectorAll('.commentList a');
	for( var k = 0; k<deleteCommentElements.length ; k++ ) {
		deleteCommentElements[k].addEventListener('click',deleteComment,false);
	}
	
	// 새글을 보내는 ajax 이벤트
	var postSubmitButtonElement = document.querySelector('#writePost input[type=submit]');
	postSubmitButtonElement.addEventListener('click',writePost,false);

	// 회원가입 이벤트

	var signupSubmitButtonElement = document.querySelector('.signupContainer input[type=submit]');
	signupSubmitButtonElement.addEventListener('click',signup,false);
}
function signup(e) {
	e.preventDefault(); // submit이 자동으로 동작하는것을 막는다.
	var eleForm = e.target.form; // form element
	console.log(eleForm);
	var oFormData = new FormData(eleForm); // form 들을 자동으로 묶어준다.	

	var url = "/signup"; // 서버에 보낼 주소.
	
	var request = new XMLHttpRequest();
	request.open("POST",url,true);
	request.send(oFormData);
	
	request.onreadystatechange = function() {
		if(request.readyState == 4 && request.status == 200) {
			console.log("응답이 왔어요~");
			alert(request.responseText);

			
			eleForm.reset();
			initPage();
        }
	};
}

function writeComments(e) {
	e.preventDefault(); // submit이 자동으로 동작하는것을 막는다.
	
	var eleForm = e.currentTarget.form; // form element
	var oFormData = new FormData(eleForm); // form 들을 자동으로 묶어준다.	
	if (eleForm.contents.length < 1) {
		return false;
	}
	var sID = eleForm[0].value;
	var url = "/board/"+ sID + "/comments.json"; // 서버에 보낼 주소.
	
	var request = new XMLHttpRequest();
	request.open("POST",url,true);
	request.send(oFormData);
	request.onreadystatechange = function() {
		if(request.readyState == 4 && request.status == 200) {
			console.log("응답이 왔어요~");
			var obj = JSON.parse(request.responseText);
			var eleCommentList = eleForm.parentNode.previousElementSibling;
			eleCommentList.insertAdjacentHTML("beforeend",
					"<p><span>"+ obj.contents + "</span>" +
					"<a href=\"javascript:void(0)\" data-commentid=\""+obj.id+"\">삭제</a>" +
					"</p>");
			eleForm.reset();
			initPage();
        }
	};
}

function writePost(e) {
	e.preventDefault(); // submit이 자동으로 동작하는것을 막는다.
	
	var eleForm = e.currentTarget.form; // form element
	var oFormData = new FormData(eleForm); // form 들을 자동으로 묶어준다.	
	
	var url = "/board.html"; // 서버에 보낼 주소.
	
	var request = new XMLHttpRequest();
	
	request.open("POST",url,true);
	
	request.send(oFormData);
	
	request.onreadystatechange = function() {
		if(request.readyState == 4 && request.status == 200) {
			console.log("응답이 왔어요~");
//			var obj = JSON.parse(request.responseText);
			var obj = request.responseText;
			
			var elemMainContainer = document.querySelector(".mainContainer");
			elemMainContainer.insertAdjacentHTML("afterbegin",obj);

			// reset 버튼 누르고 닫히게 함
			eleForm.reset();
			document.querySelector("#toggleWritePostForm").click();
			initPage();
        }
	};
	
}

function deleteComment(e) {	
	var commentId = e.currentTarget.getAttribute("data-commentid");
	var boardId = e.currentTarget.parentNode.parentNode.parentNode.parentNode.getAttribute("data-boardid");

	var url = "/comment/delete"; // 서버에 보낼 주소.

	var data = new FormData();
	data.append('commentid', commentId);
	
	var request = new XMLHttpRequest();
	request.open("POST",url,true);
	request.send(data);
	request.onreadystatechange = function() {
		if(request.readyState == 4 && request.status == 200) {
			console.log("응답이 왔어요~");
			var commentsArr = JSON.parse(request.responseText);
			var result = "";
			commentsArr.forEach(function(value){
				result += "<p><span>"+ value.contents + "</span>" +
				"<a href=\"javascript:void(0)\" data-commentid=\""+value.id+"\">삭제</a>" +
				"</p>";				
			});
			document.querySelector("section[data-boardid=\""+boardId+"\"] .commentList").innerHTML = result;

			initPage();
        }
	};
}
function toggleComments(e) { // e에 다양한 이벤트가 발생한 정보가 담겨져 있다.
	var commentWrapperNode = e.target.parentNode.parentNode.parentNode.parentNode.querySelector('div.commentWrap');
 	var displayValue = getCssValue(commentWrapperNode,'display');
	
	if(displayValue === 'none') {
		commentWrapperNode.style.display = "block";
	} else if(displayValue === 'block') {
		commentWrapperNode.style.display = "none";
	}

}
function toggleWriteForm(e) { // e에 다양한 이벤트가 발생한 정보가 담겨져 있다.
	var writeFormWrapperNode = document.getElementById('writePost');
 	var displayValue = getCssValue(writeFormWrapperNode,'display');
 	if(displayValue === 'none') {
 		writeFormWrapperNode.style.display="block";
 	} else if(displayValue === 'block') {
 		writeFormWrapperNode.style.display="none";
 	}
}


function getCssValue(node,key){
 	var style = window.getComputedStyle(node),
    keyValue = style.getPropertyValue(key);
 	return keyValue;
}

window.onload = initPage;