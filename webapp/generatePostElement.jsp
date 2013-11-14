<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

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
				<a href="/board/${board.id}/comments/${comment.id}/delete">삭제</a>
			</p>
		</c:forEach>
	</div>
	<div class="commentWrite">
		<form action="/board/${board.id}/comments" method="post">
			<input type="hidden" name="id" value="${board.id}" />
			<div class="textareaWrap">
				 <input type="text" name="contents" rows="1" cols="60" placeholder="여기에 댓글을 쓰시면 되요...">			</div>
			<input type="submit" value="댓글쓰기"/>
		</form>
	</div>
	</div>
</section>