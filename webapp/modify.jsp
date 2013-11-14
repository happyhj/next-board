<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE htm>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" media="screen" type="text/css"
	href="/stylesheets/newWrite.css" />
<style>
/* System Name, CSS Version_Creater_Date */
/* Common */
body,p,h1,h2,h3,h4,h5,h6,ul,ol,li,dl,dt,dd,table,th,td,form,fieldset,legend,input,textare a,button,select
	{
	margin: 0;
	padding: 0
}

body,input,textarea,select,button,table {
	font-family: '돋움', Dotum, AppleGothic, sans- serif;
	font-size: 1em
}

img,fieldset {
	border: 0
}

ul,ol {
	list-style: none
}

em,address {
	font-style: normal
}

a {
	text-decoration: none
}

a:hover,a:active,a:focus {
	text-decoration: underline
}

/* write post */
#writePost>div#formArea {
	margin-top: 30px;
	border: 1px solid rgb(226, 219, 219);
	padding: 1%;
}

div.textareaWrap {
	width: 98%;
	margin: 20px 0px;
	border: 1px solid rgb(226, 219, 219);
	text-align: center;
}

div.textareaWrap>textarea {
	width: 96%;
	padding: 8px;
	resize: none;
	border: 0px;
	outline: 0;
	font-size: 0.8em;
}

#formArea input[type=text] {
	height: 30px;
}

a:hover {
	text-decoration: none;
}

#formArea input[type=submit],input[type=reset],a {
	margin-top: 20px;
	border: 0px;
	padding: 5px;
	background-color: gray;
	color: white;
	border-radius: 3px;
	font-size: 0.8em;
}

div#imgWrap {
	width: 300px;
	margin-right: auto;
	margin-left: auto;
	margin-top: 20px;
	font-size: 0.9em;
	color: rgb(94, 87, 87);
}

div#imgWrap>img {
	max-width: 100%;
	border-right: 1px solid rgb(226, 219, 219);
	border-bottom: 1px solid rgb(226, 219, 219);
}
</style>
</head>
<body>
	<div id="wrap">
		<header>
			<h1>Modify Post!</h1>
		</header>
		<div id="formArea">
			<form action="/board/${board.id}/modify" method="post"
				enctype="multipart/form-data">
				제목 <input type="text" name="title" size=40 value="${board.title}">
				<br />
				<c:if test="${not empty board.fileName}">
					<div id="imgWrap">
						<img src="/images/${board.fileName}" />
					</div>
				</c:if>
				<textarea name="contents" rows="10" cols="50">${board.contents}</textarea>
				<br /> <input type="file" name="filename"> <br /> <input
					type="submit" value="반영시킵니다"> <a href="/board">그냥돌아갑니다</a>
			</form>
		</div>
	</div>
</body>
</html>