<%@ page language="java" import="java.io.*" contentType="text/html;charset=utf-8"  
    pageEncoding="utf-8"%>  
    <%@ page import="java.sql.*"%> 
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html lang="en">
<head>
 
<base href="${pageContext.request.contextPath}/jsp">
<meta charset="utf-8" />
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">  
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="renderer" content="webkit">
    <title>后台管理中心</title>  
    <link rel="stylesheet" href="${pageContext.request.contextPath}/jsp/back/css/pintuer.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/jsp/back/css/admin.css">
    <script src="${pageContext.request.contextPath}/jsp/back/js/jquery.js"></script>   
</head>
<body style="background-color:#f2f9fd;padding:0px;margin:0px;" >
<%  
String url="jdbc:mysql://localhost:3306/hpedu?useUnicode=true&characterEncoding=UTF8";  
String user="root";  
String pwd="houpe2016";
String sql = null;  
Class.forName("com.mysql.jdbc.Driver");  
Connection con=DriverManager.getConnection(url,user,pwd);  
sql = "select vnum from demo";  
ResultSet rs=con.prepareStatement(sql).executeQuery();  
rs.next();  
application.setAttribute("counter",String.valueOf(rs.getInt("vnum")));  
%>  
<%-- <body style="background-color:#f2f9fd;padding:0px;margin:0px;" onload="initWebsocket('${sessionScope.clientId}','${pageContext.request.serverName}')" > --%>
<div class="header bg-main">
  <div class="logo margin-big-left fadein-top">
    <h1><img src="${pageContext.request.contextPath}/jsp/back/images/y.jpg" class="radius-circle rotate-hover" height="50" alt="" />厚朴教育后台管理中心</h1>
  </div>
  <div class="head-l"><a class="button button-little bg-green" href="${pageContext.request.contextPath}/classindex.html" target="_blank"><span class="icon-home"></span> 前台首页</a> &nbsp;&nbsp;<a class="button button-little bg-red" href="back/backlogin.html"><span class="icon-power-off"></span> 退出登录</a>
  <!-- <a class="button button-little bg-green" href="javascript:makingYQCode()"><span class="icon-home"></span>生成邀请码</a> -->
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <span style="color: white;font-size: 20px;"><%=application.getAttribute("counter") %>人访问厚朴教育网站 </span>
   </div>
</div>
<div class="leftnav">
  <div class="leftnav-title" style="height:40px;"><strong><span class="icon-list"></span>菜单列表</strong></div>
  <h2><span class="icon-user"></span>基本设置</h2>
  <ul style="display:block">
  <%--   <li><a href="${pageContext.request.contextPath}/back/info.html" target="right"><span class="icon-caret-right"></span>网站信息</a></li> --%>
     <li><a href="${pageContext.request.contextPath}/back/teacher.html" target="right"><span class="icon-caret-right"></span>教师管理</a></li>   
    <li><a href="${pageContext.request.contextPath}/back/trophy.html" target="right"><span class="icon-caret-right"></span>学员展示</a></li>  
    <li><a href="${pageContext.request.contextPath}/back/orderCheck.html" target="right"><span class="icon-caret-right"></span>订单查看</a></li>     
    <li><a href="${pageContext.request.contextPath}/back/evalMgr.html" target="right"><span class="icon-caret-right"></span>评论管理</a></li>
    
    <li><a href="${pageContext.request.contextPath}/back/bannerMgr.html" target="right"><span class="icon-caret-right"></span>首页滚动图管理</a></li> 
    <c:if test="${backuser!=null&&backuser.isVip==3}">
    <li><a href="${pageContext.request.contextPath}/back/adminMgr.html" target="right"><span class="icon-caret-right"></span>管理员管理</a></li>  
    
    </c:if>  
     <li><a href="${pageContext.request.contextPath}/back/userLevel.html" target="right"><span class="icon-caret-right"></span>学习等级管理</a></li>   
  </ul>  
  <h2><span class="icon-pencil-square-o"></span>用户管理</h2>
  <ul>
    <li><a href="${pageContext.request.contextPath}/back/userMgr.html" target="right"><span class="icon-caret-right"></span>学生家长</a>
    <li><a href="${pageContext.request.contextPath}/back/userMgrComm.html" target="right"><span class="icon-caret-right"></span>普通用户</a></li>     
  </ul>  
   
  <h2><span class="icon-pencil-square-o"></span>常规课程</h2>
  <ul>
    <li><a href="back/backGeneral/chinese/generalChineseList.html" target="right"><span class="icon-caret-right"></span>语文</a>
    <li><a href="back/backGeneral/math/searchAllMathGeneralList.html" target="right"><span class="icon-caret-right"></span>数学</a></li>
    <li><a href="back/backGeneral/english/searchAllEnglishGeneral.html" target="right"><span class="icon-caret-right"></span>英语</a></li>        
    <li><a href="back/backGeneral/science/searchScienceGeneral" target="right"><span class="icon-caret-right"></span>科学</a></li>        
  </ul>  
  
  <h2><span class="icon-pencil-square-o"></span>竞赛课程</h2>
  <ul>
    <li><a href="back/backContest/america/backUSAclass.html" target="right"><span class="icon-caret-right"></span>美国大联盟杯</a></li>
    <li><a href="back/backContest/backSpring/backSpringClass.html" target="right"><span class="icon-caret-right"></span>迎春杯</a></li>
    <li><a href="back/backContest/hua/backHuaClass.html" target="right"><span class="icon-caret-right"></span>华杯</a></li>        
  </ul>  
  
  <h2><span class="icon-pencil-square-o"></span>课程小测验</h2>
  <ul>
    <li><a href="back/exam/chinese/chineseExam.html" target="right"><span class="icon-caret-right"></span>语文测验</a></li>
    <li><a href="back/exam/math/mathExam.html" target="right"><span class="icon-caret-right"></span>数学测验</a></li>
    <li><a href="back/exam/english/englishExam.html" target="right"><span class="icon-caret-right"></span>英语测验</a></li>        
  </ul>  
  
  <!-- 新添加的随机测试 -->
  <h2><span class="icon-pencil-square-o"></span>随机测验</h2>
  <ul>
    <li><a href="back/test/controlTest" target="right"><span class="icon-caret-right"></span>管理测验</a></li>
  </ul>  
  
</div>
<script type="text/javascript">
$(function(){
  $(".leftnav h2").click(function(){
	  $(this).next().slideToggle(200);	
	  $(this).toggleClass("on"); 
  })
  $(".leftnav ul li a").click(function(){
	    $("#a_leader_txt").text($(this).text());
  		$(".leftnav ul li a").removeClass("on");
		$(this).addClass("on");
  })
});
function makingYQCode(){
	alert("正在执行");
	$.post("${pageContext.request.contextPath}/user/makingYQCode",{},function(data){
		alert("ok");
	});
}
</script>
<ul class="bread">
  <li><a href="${pageContext.request.contextPath}/back/info.html" target="right" class="icon-home"> 首页</a></li>
  <li><a  id="a_leader_txt">网站信息</a></li>
  <li><b>当前语言：</b><span style="color:red;">中文</php></span></li>
</ul>
<div class="admin">
  <iframe scrolling="auto" rameborder="0" src="${pageContext.request.contextPath}/back/info.html" name="right"   width="100%" height="99.9%"></iframe>
</div>
<div style="text-align:center;">
</div>
<!-- websocket相关 -->
<%-- <script src="${pageContext.request.contextPath}/jsp/js/self/websocket.js"></script> --%>
</body>
</html>