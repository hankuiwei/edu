<%@ page language="java" contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<base href="${pageContext.request.contextPath}/jsp">
	<title>视频列表</title>
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/jsp/css/bootstrap.min.css"/>
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/jsp/css/video.css"/>
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/jsp/css/index.css?v=3"/>
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/jsp/css/style.css"/>
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
<div class='cont'>
		<div class="section">
			<div class="content" style="height:auto;">
				<div class="course">
						<h4>GENERAL  COURSE</h4>
						<h5>常<span>规课程</span>视频</h5>
					</div>
				<div class="classification-content"   >
				<c:forEach items="${glist}" var="g">
					<div class="classification-content-every thisv" >
						<input class="no" type="hidden" value="${g.gid}">
						<input id="isMore_${g.gid}" type="hidden" value="${g.isMore==null?0:g.isMore}">
						<a>
						 <c:if test="${g.gvimg==null||g.gvimg.length()==0 }">
							<img src="${pageContext.request.contextPath}/jsp/img/class3.jpg"/>
						</c:if>	
						 <c:if test="${g.gvimg!=null&&g.gvimg.length()>0 }">
							     <img src="${g.gvimg}"/>
						</c:if>
							<div class="classification-content-text">
								<h6>${not empty g.gclassify2?g.gclassify2:(g.gclass=='新概念'?g.gname:g.gclassify)}</h6>
								<%-- <p class="name">${g.gname}</p> --%>
								<p class="name" style="display:none;">${g.gname}</p>
								<p class="name1" >主讲教师:${g.teacherName}</p>
							</div>
							<c:if test="${g.gmoney=='0'||g.gmoney==null}">
								<div class="study" >免费
								<span style="width:80px;">${g.gplayNo}人学习</span>
							</div>
							</c:if>
							<c:if test="${g.gmoney!='0'&&g.gmoney!=null}">
							<div class="study" >￥${g.gmoney}
								<span style="width:80px;">${g.gplayNo}人学习</span>
							</div>
							</c:if>
						</a>
					</div>	
					</c:forEach>	
				</div>
			</div>
			<div class="content" style="height:auto;">
				<div class="course">
						<h4>CONTEST  COURSE</h4>
						<h5>竞<span>赛课程</span>视频</h5>
					</div>
				<div class="classification-content">
		<c:forEach items="${clist}" var="c">
					<div class="classification-content-every thisc">
					<input class="cno" type="hidden" value="${c.cid}">
						<a>
						 <c:if test="${c.cvimg==null||c.cvimg.length()==0 }">
							<img src="${pageContext.request.contextPath}/jsp/img/class1.jpg"/>
						</c:if>	
						 <c:if test="${c.cvimg!=null&&c.cvimg.length()>0 }">
							     <img src="${c.cvimg}"/>
						</c:if>
							
							<div class="classification-content-text">
								<h6>${c.cclassify}</h6>
								<p class="cname" style="display:none;">${c.cname}</p>
								<p class="cname1" >主讲教师:${c.teacherName}</p>
							</div>
							<c:if test="${c.cmoney=='0'||c.cmoney==null}">
							<div class="study">免费
								<span style="width:80px;">${c.cplayNo}人学习</span>
							</div>
							</c:if>
							<c:if test="${c.cmoney!='0'&&c.cmoney!=null}">
							<div class="study">￥${c.cmoney}
								<span style="width:80px;">${c.cplayNo}人学习</span>
							</div>
							</c:if>
						</a>
					</div>
					</c:forEach>
				</div>
			</div>
		</div>
</div>		
		<div class="foot">
			<div class="foot-content">
				<div class="foot-content-menu">
					<ul>
						<li><a href="">网站首页</a></li>
						<li><a href="">企业合作</a></li>
						<li><a href="">人才招聘</a></li>
						<li><a href="">联系我们</a></li>
						<li><a href="">常见问题</a></li>
					</ul>
				</div>
				<p>Copyright © 2016 imooc.com All Rights Reserved | 京ICP备 13046642号-2</p>
			</div>
		</div>
		<script src="${pageContext.request.contextPath}/jsp/js/jquery.1.10.1.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${pageContext.request.contextPath}/jsp/js/public.js" type="text/javascript" charset="utf-8"></script>
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
	</body>
</html>
