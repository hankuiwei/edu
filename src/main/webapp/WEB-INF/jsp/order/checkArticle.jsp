<%@ page language="java" contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<base href="${pageContext.request.contextPath}/jsp">
<title>文章详情</title>
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/jsp/css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/jsp/css/index.css?v=1" />
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/jsp/css/user.css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/jsp/css/iconfont.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/jsp/css/commen.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/jsp/css/reset.css">
</head>
<body>
	<div class="header">
<!-- logo图 和搜素-->
		<%@include file="../videoSearch.jsp"%>	
			<!--菜单-->
			<div class="sunmenu">
			<ul>
				<li><a href="classindex.html">首页</a></li>
				<li><a class="routine-menu">常规课</a></li>
				<li><a class="competition-menu">竞赛课</a></li>
				<li><a class="quiz-menu">小测验</a></li>
			</ul>
			               <%@include file="../menuPublic.jsp"%>
		</div>
	<!-- 登录 -->
         <%@include file="../ckUserInfo.jsp"%>
</div>
	<!--内容-->
	<div class="content">
		<div style="background:#fff;padding-bottom:2%;padding:2% 5% 2% 5%;width:80%;margin:0 auto">
			<table style="margin:0;padding:0;width:100%">
			  <tr><th style="text-align:center;font-size:20px;padding:10px;">${banner.title}</th></tr>
			   <tr><td style="padding:5px;"><div style="word-break:break-all;width:600px;float:right;color:#B1B0AC;">&nbsp;&nbsp;<c:if test="${not empty banner.content}">────&nbsp;${banner.content}</c:if></div></td></tr>
			  <c:forEach items="${alist}" var="at">
			  <tr><td><img style="width:95%" alt="" src="${at.atUrl}"> </td></tr>
			  </c:forEach>
			  <tr><td  style="padding:10px;word-break:break-all;width:100%;">${banner.article}</td></tr>
			</table>
		</div>
	</div>
	<div class="foot">
		<div class="foot-content">
			<div class="foot-content-menu">
				<ul>
					<li><a href="" style="cursor: pointer">网站首页</a></li>
					<li><a href="" style="cursor: pointer">企业合作</a></li>
					<li><a href="" style="cursor: pointer">人才招聘</a></li>
					<li><a href="" style="cursor: pointer">联系我们</a></li>
					<li><a href="" style="cursor: pointer">常见问题</a></li>
				</ul>
			</div>
			<p>Copyright © 2016 imooc.com All Rights Reserved | 京ICP备
				13046642号-2</p>
		</div>
	</div>
</body>
<script
	src="${pageContext.request.contextPath}/jsp/js/jquery.1.10.1.min.js"
	type="text/javascript" charset="utf-8"></script>
<script src="${pageContext.request.contextPath}/jsp/js/bootstrap.min.js"
	type="text/javascript" charset="utf-8"></script>
<script src="${pageContext.request.contextPath}/jsp/js/public.js"
	type="text/javascript" charset="utf-8"></script>


<script type="text/javascript">
setChangeTimeStatus(false);
</script>
<script src="${pageContext.request.contextPath}/jsp/js/menuFun.js" type="text/javascript" charset="utf-8"></script>
	<form action="" id="subFrom" method="post">
	     <!-- 常规视频菜单 -->
	     <input type="hidden" name="gsbuject" id="gsbuject">
	     <input type="hidden" name="gclass" id="gclass">
	     <input type="hidden" name="gclassify" id="gclassify">
	      <!-- 常规单个 -->
	     <input type="hidden" name="className" id="className">
	     <input type="hidden" name="classNo" id="classNo">
	      <!-- 竞赛视频菜单 -->
	     <input type="hidden" name="competitionName" id="competitionName">
	     <input type="hidden" name="cclassify" id="cclassify">
	     <input type="hidden" name="cclass" id="cclass">
	     <!-- 小测验菜单 -->
	     <input type="hidden" name="etsubject" id="etsubject">
	     <input type="hidden" name="etclassify" id="etclassify">
	     <input type="hidden" name="etclass" id="etclass">
	     <!-- 分页参数 -->
	     <input type="hidden" name="pageNo" id="pageNo">
	</form>
</html>
