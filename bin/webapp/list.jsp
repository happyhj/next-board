<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="http://heej.net/2013fw/next-ui-lecture/stylesheet/reset.css" />
<link rel="stylesheet" type="text/css" href="/stylesheets/main.css" />

</head>

<body>
<div id="wrap">	
	<div class="identityContainer">
		<div class="signinContainer">
			<form>
				<input type="text" placeholder="email"/>
				<input type="password" placeholder="password"/>
				<input type="submit" value="로그인"/>
			</form>
		</div>
		<div class="loginBtn">
			<input type="button" value="로그인" />
		</div>
		<div class="logoutBtn">
			<input type="button" value="로그아웃" />
		</div>
	</div>
	<div class="signupContainer">
		<form>
			<input type="text" name="email" placeholder="email"/>
			<input type="password" name="password" placeholder="password"/>
			<input type="password"name="confirm_password"  placeholder="password 확인"/>
			<input type="submit" value="가입"/>
		</form>
	</div>
	 <a id="toggleWritePostForm">+</a>
	 <section id="writePost">
	 	<div id="formArea">
			<form action="/board" method="post" enctype="multipart/form-data">
				<input type="text" name="title" size=40 placeholder="제목을 쓰세요..."> <br />
				<div class="textareaWrap">
						<textarea name="contents" rows="3" cols="60" placeholder="새로운 글 올리기..."></textarea>
				</div>
				<input type="file" name="filename"> <br />
				<input type="submit" value="post">
				<input id="closeWritePostForm" type="reset" value="reset">
			</form>
		</div>
	 </section>
	<div class="mainContainer">
	<c:forEach items="${boards}" var="board">    
		<section data-boardid="${board.id}">
	 		<article>
				<c:if test="${not empty board.fileName}">
				 <div class="imgWrapShade" style="background-image:url('/images/${board.fileName}');"></div>
				 <div class="imgWrap" style="background-image:url('/images/${board.fileName}');">
				 	<h1>${board.title}</h1>	
					<p> ${board.contents}</p>
				 	<div class="numberOfComments"></div>
					<menu>
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
					<menu>
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