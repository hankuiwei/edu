<%@ page language="java" import="java.io.*" contentType="text/html;charset=utf-8"  
    pageEncoding="utf-8"%> 
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
		<div class="logo">	
			<c:if test="${ empty user  }">		
				<a href="login.html">登录</a>
				<a href="classReg.html" class='right'>注册</a>		
			</c:if>	
			<c:if test="${not empty user  }">	
			    <div class="not-login-in">
				<c:if test="${! empty user }">
					<div class="user">
					   <div class="user-img">
							<c:if test="${ empty user.headImgUrl}">
									<img src="${pageContext.request.contextPath}/jsp/img/K.jpg" /> 
							</c:if>
							<c:if test="${ not empty user.headImgUrl}">
									<img src="${user.headImgUrl}" /> 
							</c:if>
						</div>
						
						<div class="user-name" style="padding-top:0px;">
						    &nbsp;
							<a href="javascript:showSetting()" >
									<c:if test="${not empty user.userName}">
									${user.userName}<span class="glyphicon glyphicon-chevron-down"></span>
									</c:if>
									<c:if test="${empty user.userName}">
									  暂时没有昵称<span class="glyphicon glyphicon-chevron-down"></span>
									</c:if>
							</a>		
						</div>
						<div class="user-setting">
							<ul>
								<li style="height:40px;line-height: 40px;font-size: 17px;padding:5px;">个人信息&nbsp;&nbsp;<a class="glyphicon glyphicon-pencil" href="${pageContext.request.contextPath}/userNews.html">编辑|查看</a></li>
								<li style="height:40px;line-height: 40px;font-size: 17px;padding:5px;">购买记录&nbsp;&nbsp;<a class="glyphicon glyphicon-eye-open" href="${pageContext.request.contextPath}/order/checkOrdersByUid.html">查看</a></li>
								<li class="exitUser" style="border: 2px solid;background: #5cb85c; color: #fff;height:40px;line-height:40px;text-align: center;">退出</li>
							</ul>
						</div>
					</div>
				</c:if>
				
			</div>
                    
			</c:if>
		</div>
<script>
function showSetting(){
	if($(".user-setting").is(":hidden")){
		 $(".user-setting").css("display","block");
	}else{
		 $(".user-setting").css("display","none");
	}
}
</script>		
		