﻿<%@ page language="java" import="java.io.*" contentType="text/html;charset=utf-8"  
    pageEncoding="utf-8"%>  
    <%@ page import="java.sql.*"%> 
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
 <meta http-equiv="Content-Type" content="text/html;charset=utf-8">  
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="renderer" content="webkit">
<base href="${pageContext.request.contextPath}/jsp">
	<title>首页</title>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/jsp/css/iconfont.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/jsp/css/commen.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/jsp/css/reset.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/jsp/css/index.css?v=1">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/jsp/css/swiper.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/jsp/css/bootstrap.min.css"/>
	<!--[if lt IE 10]>
 <script type="text/javascript" > var isIE8=true;</script>
 <!--[else]>
<script type="text/javascript" > var isIE8=false;</script>
<![endif]-->
<!--[if !IE]><!--> 
 <script src="${pageContext.request.contextPath}/jsp/back/js/jquery.js"></script> 
 <script type="text/javascript" > var isIE8=false;</script>
<!--<![endif]-->
<script type="text/javascript">
$(function(){
	if(isIE8){
		alert("您当前使用的ie浏览器版本较低，为免影响您的使用，\n请升级到ie10以上版本或使用其他浏览器访问网站！");
	}
});
</script>
</head>
<body>
<%  
String url="jdbc:mysql://localhost:3306/hpedu?useUnicode=true&characterEncoding=UTF8";  
String user="root";  
String pwd="root";
String sql = null;  
Class.forName("com.mysql.jdbc.Driver");  
Connection con=DriverManager.getConnection(url,user,pwd);  
sql = "update demo set vnum=vnum+1";  
con.createStatement().execute(sql);  
sql = "select vnum from demo";  
ResultSet rs=con.prepareStatement(sql).executeQuery();  
rs.next();  
application.setAttribute("counter",String.valueOf(rs.getInt("vnum")));  
%>  

	<div class="header">
		<!-- logo图 和搜素-->
		<%@include file="videoSearch.jsp"%>
		<!-- 菜单 -->
		
		<div class="sunmenu">
			<ul>
				<li><a href="classindex.html" class="bg " >首页</a></li>
				<li><a class="routine-menu">常规课</a></li>
				<li><a class="competition-menu">竞赛课</a></li>
				<li><a class="quiz-menu">小测试</a></li>
			</ul>
		<!-- 常规子菜单,竞赛子菜单,小测试子菜单 -->
        <%@include file="menuPublic.jsp"%>
		</div>
		
		<!-- 登录 -->
        <%@include file="ckUserInfo.jsp"%>
	</div>
	<div class='cont'>
		<!-- banner轮播 -->
		<div class="swiper-container banner">
			<ul class="swiper-wrapper olist ">
			 <c:forEach items="${blist}" var="b" >
				<li class="swiper-slide" >
					<a href="${pageContext.request.contextPath}/banner/checkArticle?bid=${b.bid }">
					    <img src="${b.imgUrl}" alt="">
					</a>
				</li>
			</c:forEach>	
			</ul>
		</div>

		<div class="section">
			<!-- 名师推荐 -->
			<div class="menu">
					<div class="teacher">
						<h4>TEACHER RECOMMENDED</h4>
						<h5>名师推荐</h5>
					</div>
					<!-- 轮播项目 -->
					<div class="inner">
						<div class="item ">
							<div class="swiper-container active">
								<div class="swiper-wrapper">
								<c:forEach items="${tlist}" var="tl"  varStatus="ss"  end="6" >
									<div class="swiper-slide" style="width:100%">
										<div class="item-box">
											<div class="man" style="width:130%;">
												<img style="height:80%;" src="${tl.backImg}" alt="">
											</div>
											<div class="min">
												<div style="padding:0 30% 0 10%">
													<h4>${tl.tnamePinyin}</h4>
													<h5>${tl.tname}</h5>
													<h6 style="padding-top:5px"><span style="font-size:17px;font-weight:bold;"></span></h6>
													<div style="width:145%;padding-top:15px;word-break:break-all;">${tl.tintro}</div>
												</div>	
											</div>
										</div>
									</div> 
								</c:forEach>	
								</div>
								<div class="iconfont icon-icon prev swiper-button-prev"></div>
		    					<div class="iconfont icon-icon1 next swiper-button-next"></div>
							</div>	
							<ul class="pic">
							<c:forEach items="${tlist}" var="tl"  varStatus="ss"  end="6" >
								<li><img src="${tl.timgUrl}" alt="" ></li>
							</c:forEach>
							</ul> 
						</div>				
					</div>
						<div class="more">
						<i class="iconfont icon-mulu f18"></i>
						<a href="javascript:showAllTeacher()">查看更多</a>
					</div>
			</div>
			<!-- 学员展示 -->
			<div class="student">
					<div class="pupil">
						<h4>STUDENTS  SHOW</h4>
						<h5>学员展示</h5>
					</div>
					<ul class="trainee">
					 <c:forEach items="${trolist}" var="tl" end="3" >
						<li id="${tl.pid}" class="cur_pointer">
							<img src="${tl.pimgUrl}" alt="">
							<div class="class-pic">
								<h4>${tl.pnamePinyin }</h4>
								<p>${tl.pname}</p>
								<div class="look">
									<i class="iconfont icon-mulu f18"></i>
									<a href="javascript:showStu('${tl.pid}')">了解更多</a>
								</div>
							</div>
						</li>
					</c:forEach>	
					</ul>	
					<div class="more">
						<i class="iconfont icon-mulu f18"></i>
						<a href="javascript:showAllStu()" >查看更多</a>
					</div>
			<script type="text/javascript">
			  //根据id显示学员信息
			  function showStu(id){
				  window.location.href="order/checkStu.html?id="+id;
			  }
			  //显示更多学员信息
			  function showAllStu(){
				  window.location.href="order/stuList.html";
			  }
			  //显示更多教师
			  function showAllTeacher(){
				  window.location.href="teacher/teacherList.html";
			  }
			  //显示更多视频
			  function showAllVideo(type){
				  window.location.href="${pageContext.request.contextPath}/order/showAllVideo.html?type="+type;
			  }
			</script>
			</div>
			<!-- 常规课程 -->
			<div class="content">
					<div class="course">
						<h4>LATEST  COURSE</h4>
						<h5>最<span>新常规课</span>程</h5>
					</div>
					
					<div class="lesson">
						<div class="men">
							<div class="small">
							  <c:forEach items="${genlist}" var="g">
							   <div class="box thisv cur_pointer">
								 	<div class="math"><h4>${g.gclass}${g.gsbuject}${not empty g.gclassify2?g.gclassify2:g.gclassify}</h4></div>
								 	<div class='education'>厚朴教育</div>
								 	<div class="net">
								 		<h4>${not empty g.gclassify2?g.gclassify2:(g.gclass=='新概念'?g.gname:g.gclassify)}</h4>
									 	<h5>主讲教师：${g.teacherName}</h5>
									 		<c:if test="${g.gmoney=='0'||g.gmoney==null}">
												<p>免费</p>
											</c:if>
											<c:if test="${g.gmoney!='0'&&g.gmoney!=null}">
											    <p>RMB:<b>${g.gmoney}</b></p>
											</c:if>
										<div class='stud'>${g.gplayNo}人学习</div>
								 	</div>
								 	 <input class="no" type="hidden" value="${g.gid}">
						             <input id="isMore_${g.gid}" type="hidden" value="${g.isMore==null?0:g.isMore}">
								
							 	</div>
							  </c:forEach>	
							</div>
						</div>
						
						<div class="more">
							<i class="iconfont icon-mulu f18"></i>
							<a href="javascript:showAllVideo(0)">查看更多</a>
						</div>
					</div>	 
			</div>
			<!-- 竞赛课程 -->
			<div class="content">
					<div class="course">
						<h4>LATEST  COURSE</h4>
						<h5>最<span>新竞赛课</span>程</h5>
					</div>
					
					<div class="lesson">
						<div class="men">
							<div class="small">
							 <c:forEach items="${conlist}" var="c">
								<div class="box thisc cur_pointer">
								 	<div class="math"><h4>${c.cclass}${c.competitionName}${c.cclassify}</h4></div>
								 	<div class='education'>厚朴教育</div>
								 	<div class="net">
								 		<h4>${c.cclassify}</h4>
									 	<h5>主讲教师：${c.teacherName}</h5>
									 	   <c:if test="${c.cmoney=='0'||c.cmoney==null}">
												<p>免费</p>
											</c:if>
											<c:if test="${c.cmoney!='0'&&c.cmoney!=null}">
											    <p>RMB:<b>${c.cmoney}</b></p>
											</c:if>
										<div class='stud'>${c.cplayNo}人学习</div>
								 	</div>
								 	<input class="cno" type="hidden" value="${c.cid}">
							 	</div>
                              </c:forEach>
							</div>
						</div>
						
						<div class="more check">
							<i class="iconfont icon-mulu f18"></i>
							<a href="javascript:showAllVideo(1)">查看更多</a>
						</div>
					</div>	 
			</div>
		</div>
	</div>	
		<!-- footer -->
		<div class="foot">
			<div class="foot-content">
				<div class="foot-content-menu">
					<ul>
						<li><a href="" style=cursor:pointer>网站首页</a></li>
						<li><a href="" style=cursor:pointer>企业合作</a></li>
						<li><a href="" style=cursor:pointer>人才招聘</a></li>
						<li><a href="" style=cursor:pointer>联系我们</a></li>
						<li><a href="" style=cursor:pointer>常见问题</a></li>
					</ul>
				</div>
				<p>Copyright © 2016 imooc.com All Rights Reserved | 京ICP备 13046642号-2</p>
			</div>
		</div>
		<!--右侧回到顶部以及二维码-->
		<div class="right-side">
			<ul>
				<li>
					<img src="${pageContext.request.contextPath}/jsp/img/erweima.jpg"/>
					<div class="erweima"><img src="${pageContext.request.contextPath}/jsp/img/erweima.jpg"/></div>
				</li>
				<%-- <li style="background:#46BE8A;">
					<img src="${pageContext.request.contextPath}/jsp/img/kf.png" onclick="openKF()"/>
				</li> --%>
				<li id="gotoTop">
					<a>
						<span class="glyphicon glyphicon-circle-arrow-up"></span>
					</a>
				</li>
			</ul>
		</div>
		<script type="text/javascript">
		var isopen=false;
		 function openKF(){
			 if(isopen){
				 window.close();
				 isopen=false;
			 }else{
				 isopen=true;
			 }
			 var iHeight=600;
			 var iWidth=550;
			 var iTop = (window.screen.availHeight-30-iHeight)/2;       //获得窗口的垂直位置;
			 var iLeft = (window.screen.availWidth-10-iWidth)/2;           //获得窗口的水平位置;
		     window.open('${pageContext.request.contextPath}/openKF.html','',
					 'width='+iWidth+',height='+iHeight+',innerHeight='+iHeight+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',resizeable=no,location=no,status=no');
			 
		 }
		 setChangeTimeStatus(false);
		</script>
</body>
<script  type="text/javascript" src="${pageContext.request.contextPath}/jsp/js/jquery.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/jsp/js/swiper.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/jsp/js/class.js?v=2"></script>
<script src="${pageContext.request.contextPath}/jsp/js/public.js" type="text/javascript" charset="utf-8"></script>
<script src="${pageContext.request.contextPath}/jsp/js/menuFun.js" type="text/javascript" charset="utf-8"></script>
<script src="${pageContext.request.contextPath}/jsp/js/bootstrap.min.js"></script>
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
