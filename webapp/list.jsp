<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<c:choose>
<c:when test="${empty sessionScope.userEmail}">
	<html class="beforelogin">
</c:when>
<c:when test="${!empty sessionScope.userEmail}">
	<html>
</c:when>
</c:choose>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="http://heej.net/2013fw/next-ui-lecture/stylesheet/reset.css" />
<link rel="stylesheet" type="text/css" href="/stylesheets/main.css" />

</head>

<body>
<div id="wrap">
<c:choose>
<c:when test="${empty sessionScope.userEmail}">
	<div class="overlay"></div>	
	<div class="identityContainer">
		<h1 id="alertmsg">먹스타그램에 로그인</h1>
		<div class="signinContainer">
			<form>
				<input type="text" name="email"  placeholder="email"/>
				<input type="password" name="password" placeholder="password"/>
				<input type="submit" value="로그인"/>
			</form>
		</div>
		<a href="#" id="toggleToSignup">저 계정 없는데요.</a>
	</div>
	<div class="signupContainer disabled">
		<h1 id="signupmsg">먹스타그램 계정을 만드세요</h1>
		<form>
			<input type="text" name="email" placeholder="email"/>
			<input type="password" name="password" placeholder="password"/>
			<input type="password"name="confirm_password"  placeholder="password 확인"/>
			<input type="submit" value="가입"/>
		</form>
		<a href="#" id="toggleToSignin">저 계정 있어요.</a>
	</div>
</c:when>
<c:when test="${!empty sessionScope.userEmail}">
<div id="header">	
    <div class="wrapper">
        <a href="#">
        	<div class="logo"></div>
        </a>
		<div class="profile"></div>
 		<div class="post">
	 		<a id="toggleWritePostForm">
 			+
 			</a>
 		</div>
 		
 		<div class="menuContainer hidden">
 			<h1>${sessionScope.userEmail}</h1>
 			<input type="button" class="signout" value="로그아웃" />
 		</div>
		<section class="writePost hidden">
		 	<div id="formArea">
				<form action="/board" method="post" enctype="multipart/form-data">
					<input type="text" name="title" size=40 placeholder="제목을 쓰세요..."> <br />
					<div class="textareaWrap">
							<textarea name="contents" rows="3" cols="60" placeholder="새로운 글 올리기..."></textarea>
					</div>
					<div class="ratingFormContainer">
						<fieldset class="rating">
						    <input type="radio" id="star5" name="rating" value="5" /><label for="star5" title="Rocks!">5 stars</label>
						    <input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="Pretty good">4 stars</label>
						    <input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="Meh">3 stars</label>
						    <input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="Kinda bad">2 stars</label>
						    <input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="Sucks big time">1 star</label>
						</fieldset>
					</div>
					<input type="file" name="filename" id="lunchPhoto">
					<div id="lunchPhotoContainer"></div>
					<br />
					<input type="submit" value="먹이메모 붙이기">
				</form>
			</div>
		 </section>		
    </div>
</div>

	 

	
</c:when>
</c:choose>
<c:choose>
<c:when test="${empty sessionScope.userEmail}">
	<div class="mainContainer blur">
</c:when>
<c:when test="${!empty sessionScope.userEmail}">
	<div class="mainContainer">
</c:when>
</c:choose>
	<c:forEach items="${boards}" var="board">    
		<section data-boardid="${board.id}">
	 		<article>
				<c:if test="${not empty board.fileName}">
				 <div class="imgWrapShade" style="background-image:url('/images/${board.fileName}');"></div>
				 <div class="imgWrap" style="background-image:url('/images/${board.fileName}');">
				 	<h1>${board.title}</h1>	
					<p> ${board.contents}</p>
				 	<div class="numberOfComments"></div>
					<menu class="itemSubMenu hidden">
						<a class="toggleComments" href="javascript:void(0)" >댓글 내리기</a>
						<a class="" href="/board/${board.id}/modify">수정</a>
						<a class="" href="/board/${board.id}/delete">삭제</a>
					</menu>
				 </div>
				</c:if>
				<c:if test="${empty board.fileName}">
				 <div class="imgWrapShade" 
				 		style="background-image:url('/images/nasty_fabric.png');
						background-repeat: repeat;
						background-size: auto;
				 "></div>
				 <div class="imgWrap" style="background-image:url('/images/nasty_fabric.png');
					 	background-repeat: repeat;
						background-size: auto;">
				 	<h1>${board.title}</h1>	
					<p> ${board.contents}</p>
				 	<div class="numberOfComments"></div>
					<menu class="itemSubMenu hidden">
						<a class="toggleComments" href="javascript:void(0)" >댓글 내리기</a>
						<a class="" href="/board/${board.id}/modify">수정</a>
						<a class="" href="/board/${board.id}/delete">삭제</a>
					</menu>
				 </div>

				</c:if>
			</article>
			<div class="commentWrap">
			<div class="commentList">
				<c:forEach items="${board.comments}" var="comment">
					<p>
						<span>${comment.contents}</span>
						<a href="javascript:void(0)" data-commentid="${comment.id}">삭제</a>
					</p>
				</c:forEach>
			</div>
			<div class="commentWrite">
				<form action="/board/${board.id}/comments" method="post">
					<input type="hidden" name="id" value="${board.id}" />
					<div class="textareaWrap">
						<input type="text" name="contents" rows="1" cols="60" placeholder="여기에 댓글을 쓰시면 되요..."></textarea>
					</div>
					<input type="submit" value="댓글쓰기"/>
				</form>
			</div>
			</div>
		</section>
		</c:forEach>
	</div>
 </div>
 <script src="/javascripts/main.js"></script> 
</body>
</html>