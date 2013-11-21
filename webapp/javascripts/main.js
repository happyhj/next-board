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
	var postSubmitButtonElement = document.querySelector('.writePost input[type=submit]');
	if(postSubmitButtonElement)
		postSubmitButtonElement.addEventListener('click',writePost,false);

	// 회원가입 이벤트
	var signupSubmitButtonElement = document.querySelector('.signupContainer input[type=submit]');
	if(signupSubmitButtonElement)
		signupSubmitButtonElement.addEventListener('click',signup,false);

	// 로그인 이벤트
	var signinSubmitButtonElement = document.querySelector('.signinContainer input[type=submit]');
	if(signinSubmitButtonElement)
		signinSubmitButtonElement.addEventListener('click',signin,false);
	
	// 로그아웃 이벤트
	var signoutElement = document.querySelector('input[type=button].signout');
	if(signoutElement)
		signoutElement.addEventListener('click',signout,false);

	
	var signinToggle = document.querySelector('#toggleToSignin');
	var signupToggle = document.querySelector('#toggleToSignup');

	if(signinToggle){
		signinToggle.addEventListener('click',toggleSignUpPanels,false);
	}

	if(signupToggle){
		signupToggle.addEventListener('click',toggleSignUpPanels,false);
	}
	
	// 메뉴 토글 이벤트
	var profileElement = document.querySelector('.profile');
	if(profileElement)
		profileElement.addEventListener('click',menuToggle,false);

	// 글쓰기 토글 이벤트
	var writeToggleElement = document.querySelector('#toggleWritePostForm');
	if(writeToggleElement)
		writeToggleElement.addEventListener('click',writeToggle,false);	

	// 파일 변화 감지
	var uploadPhotoElement = document.querySelector('#lunchPhoto');
	if(uploadPhotoElement)
		uploadPhotoElement.addEventListener('change', handleFileSelect, false);

	// 포스팅 호버 이벤트
	var postingItemElements = document.querySelectorAll('.mainContainer>section');
	for( var l = 0; l<postingItemElements.length ; l++ ) {
		postingItemElements[l].addEventListener('mousedown',togglePostInfo,false);
//		postingItemElements[l].addEventListener('mouseout',togglePostInfo,false);

	}

}
function closePostInfos() {
	var postingItemElements = document.querySelectorAll('.mainContainer>section menu');
	for( var l = 0; l<postingItemElements.length ; l++ ) {
		postingItemElements.className = "itemSubMenu";
	}
}
function togglePostInfo(e) {
	//console.log("11");
	var itemSectionElem = e.currentTarget;
	var menuElem = itemSectionElem.querySelector("menu");
//	console.log(menuElem.className);
	if(menuElem.className==="itemSubMenu") {
		closePostInfos();
		menuElem.className = "itemSubMenu hidden";
	} else if (menuElem.className==="itemSubMenu hidden") {
		closePostInfos();
		menuElem.className = "itemSubMenu";
	}	
	
}

function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object
	var thumbnailDiv = document.querySelector('div#lunchPhotoContainer');
	
	// Loop through the FileList and render image files as thumbnails.
	for (var i = 0, f; f = files[i]; i++) {
		
		// Only process image files.
		if (!f.type.match('image.*')) {
			continue;
		}
		
		var reader = new FileReader();
		
		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			return function(e) {
				// Render thumbnail.
				var imgElem = document.createElement("img");
				imgElem.setAttribute("src",e.target.result);
				thumbnailDiv.insertBefore(imgElem, null);
			};
		})(f);
		
		// Read in the image file as a data URL.
		reader.readAsDataURL(f);
	}
}
function writeToggle(e) {
	var writeFormElem = document.querySelector('.writePost');
	writeFormElem.querySelector('form').reset();
	document.querySelector('#lunchPhotoContainer').innerHTML = '';
	var menuElem = document.querySelector('.menuContainer');
	if(writeFormElem.className==="writePost") {
		writeFormElem.className = "writePost hidden";
	} else if (writeFormElem.className==="writePost hidden") {
		writeFormElem.className = "writePost";
	}	
	menuElem.className= "menuContainer hidden";
}
function menuToggle(e) {
	var menuElem = document.querySelector('.menuContainer');
	
	var writeFormElem = document.querySelector('.writePost');
	if(menuElem.className==="menuContainer") {
		menuElem.className= "menuContainer hidden";
	} else {
		menuElem.className= "menuContainer";
	}	
	
	writeFormElem.className = "writePost hidden";
}

function toggleSignUpPanels() {
	var signupElem = document.querySelector('.signupContainer');
	var signinElem = document.querySelector('.identityContainer');
	
	if(signupElem.className==="signupContainer") {
		signupElem.className= "signupContainer disabled";
		signinElem.className = "identityContainer";
	} else {
		signupElem.className= "signupContainer";
		signinElem.className = "identityContainer disabled";	
	}	
	document.getElementById("alertmsg").innerHTML = "먹스타그램에 로그인"
	document.getElementById("signupmsg").innerHTML = "먹스타그램 계정을 만드세요";
	signupElem.querySelector("form").reset();
	signinElem.querySelector("form").reset();
}
function signout(e) {
	var url = "/signout"; // 서버에 보낼 주소.
	
	var request = new XMLHttpRequest();
	request.open("GET",url,true);
	request.send();
	
	request.onreadystatechange = function() {
		if(request.readyState == 4 && request.status == 200) {
			console.log("응답이 왔어요~");
			alert(request.responseText);
			initPage();
			document.location.reload(true);
        }
	};	
}
function signin(e) {
	e.preventDefault(); // submit이 자동으로 동작하는것을 막는다.
	var eleForm = e.target.form; // form element
	var oFormData = new FormData(eleForm); // form 들을 자동으로 묶어준다.	
	console.log(eleForm);
	var url = "/signin"; // 서버에 보낼 주소.

	if(!checkEmail(eleForm.elements['email'].value)){
		document.getElementById("alertmsg").innerHTML = "이메일 형식을 제대로";
		return;
	}
	if(eleForm.elements['password'].value.length < 1){
		document.getElementById("alertmsg").innerHTML = "암호를 비워둘 수 없습니다.";
		return;
	}	
	
	var request = new XMLHttpRequest();
	request.open("POST",url,true);
	request.send(oFormData);
	
	request.onreadystatechange = function() {
		if(request.readyState == 4 && request.status == 200) {
			console.log("응답이 왔어요~");
			if(request.responseText.length > 1){
				alert("반갑습니다^^*\n"+request.responseText);
			} else {
				alert("존재하는 암호와 비번조합이 아닙니다 ㅠㅠ");	
			}
			eleForm.reset();
			initPage();
			document.location.reload(true);
        }
	};
}
function signup(e) {
	e.preventDefault(); // submit이 자동으로 동작하는것을 막는다.
	var eleForm = e.target.form; // form element
	var oFormData = new FormData(eleForm); // form 들을 자동으로 묶어준다.	

	var url = "/signup"; // 서버에 보낼 주소.
	
	if(!checkEmail(eleForm.elements['email'].value)){
		document.getElementById("signupmsg").innerHTML = "이메일 형식을 제대로";
		return;
	}
	if(eleForm.elements['password'].value.length <1){
		document.getElementById("signupmsg").innerHTML = "암호를 비워둘 수 없습니다.";
		return;
	}

	if(eleForm.elements['password'].value.length != eleForm.elements['confirm_password'].value.length){
		document.getElementById("signupmsg").innerHTML = "두 암호가 일치하지 않아요.";
		return;
	}	
	var request = new XMLHttpRequest();
	request.open("POST",url,true);
	request.send(oFormData);
	
	request.onreadystatechange = function() {
		if(request.readyState == 4 && request.status == 200) {
			console.log("응답이 왔어요~");
			//alert("먹스타그램에 오신것을 환영합니다 ^o^~\n"+request.responseText);
			//toggleSignUpPanels();
			//eleForm.reset();
			//initPage();
			document.location.reload(true);
        }
	};
}
// 정규식 : 이메일
function checkEmail(str)
{
 var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
 if(!reg_email.test(str))
 {
  return false;
 }
 return true;
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
			document.location.reload(true);
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