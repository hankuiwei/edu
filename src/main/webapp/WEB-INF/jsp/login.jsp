<%@ page language="java" contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
<base href="${pageContext.request.contextPath}/jsp">
<meta charset="UTF-8">
		<title>登录页面</title>
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/jsp/css/login.css">
		<script type="text/javascript" src="${pageContext.request.contextPath}/jsp/js/jquery.1.10.1.min.js"></script>
	    <style type="text/css">
		span,input[type=submit],input[type=button],button{ cursor: pointer;}
		</style>
	</head>
	<body>
	<div class="login">
		<div class="login-content">
			<div class="login-title">
				<h4>登录</h4>
			</div>
			<form action="${pageContext.request.contextPath}/user/login" method="post" onsubmit="return checkLogin2()">
				<div class="login-content-content">
					<div class="login-content-every">
						<input type="text" name="phoneNo" id="phoneNo" placeholder="手机号" required="required" value="${user.phoneNo}">
					</div>
					<div class="login-content-every">
						<input type="password" name="passWord"  id="passWord"  placeholder="密码" required="required" value="${user.passWord}">
					</div>
					<div class="login-content-every-1">
						<a href="classReg.html" style="float: left;">没有账号，注册账号</a>
						<a href="backPass.html">忘记密码</a>
					</div>
					<div class="login-content-every">
						<input type="submit" name="" value="登录" id="subbtn">
					</div>
				</div>
			</form>
		</div>
	</div>
	<script type="text/javascript">
	 $(function(){
		 var loginError="${loginError}";
			if(loginError.length>0&&loginError!="null"){
				alert(loginError);
			}
	 });
	 function checkLogin2(){
		 var flag=false;
		 var phoneNo=$("#phoneNo").val();
		 var passWord=$("#passWord").val();
		 if(phoneNo.length==0){
			 alert("手机号不能为空");
		 }else if(passWord.length==0){
			 alert("密码不能为空");
		 }else{
			 $("#subbtn").val("登录中...");
			 $("#subbtn").attr("disabled","disabled");
			 $("#subbtn").css("background","gray");
			 flag=true;
		 }
		 return flag;
	 }
	</script>
	</body>
</html>