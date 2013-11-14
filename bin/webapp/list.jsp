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
 	<nav>
	 	<!--  ul>
		 	<li><a href="/board">list</a></li>
		 	<li><a href="/board/form">write</a></li>
	 	</ul -->
	 </nav>
	 <a id="toggleWritePostForm">+</a>
	 <section id="writePost">
	 	<div id="formArea">
			<form action="/board" method="post" enctype="multipart/form-data">
				 제목  <input type="text" name="title" size=40> <br />
				<div class="textareaWrap">
						<textarea name="contents" rows="3" cols="60" placeholder="새로운 글 올리기..."></textarea>
				</div>
				<input type="file" name="filename"> <br />
				<input type="submit" value="post">
				<input id="closeWritePostForm" type="reset" value="reset">
			</form>
		</div>
	 </section>
    
	<c:forEach items="${boards}" var="board">
		<section>
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
			</article>
			<div class="commentWrap">
			<div class="commentList">
				<c:forEach items="${board.comments}" var="comment">
					<p>
						<span>${comment.contents}</span>
						<a href="/board/${board.id}/comments/${comment.id}/delete">삭제</a>
					</p>
				</c:forEach>
			</div>
			<div class="commentWrite">
				<form action="/board/${board.id}/comments" method="post">
					<input type="hidden" name="id" value="${board.id}" />
					<div class="textareaWrap">
						<textarea name="contents" rows="1" cols="60" placeholder="여기에 댓글을 쓰시면 되요..."></textarea>
					</div>
					<input type="submit" value="댓글쓰기"/>
				</form>
			</div>
			</div>
		</section>
	</c:forEach>
 </div>
 <script src="/javascripts/main.js"></script> 
</body>
</html>