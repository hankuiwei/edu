<%@ page language="java" contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
<base href="${pageContext.request.contextPath}/jsp">
<meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="renderer" content="webkit">
    <title>登录</title>  
    <link rel="stylesheet" href="${pageContext.request.contextPath}/jsp/back/css/pintuer.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/jsp/back/css/admin.css">
    <script src="${pageContext.request.contextPath}/jsp/back/js/jquery.js"></script>
    <script src="${pageContext.request.contextPath}/jsp/back/js/pintuer.js"></script>  
</head>
<body>
<div class="bg"></div>
<div class="container">
    <div class="line bouncein">
        <div class="xs6 xm4 xs3-move xm4-move">
            <div style="height:150px;"></div>
            <div class="media media-y margin-big-bottom">           
            </div>         
            <form action="back/backUserLogin" method="post" onsubmit="return sub()">
            <div class="panel loginbox">
                <div class="text-center margin-big padding-big-top"><h1>厚朴教育管理中心</h1></div>
                <div class="panel-body" style="padding:30px; padding-bottom:10px; padding-top:10px;">
                    <div class="form-group">
                        <div class="field field-icon-right">
                            <input type="text" class="input input-big" name="userName" id="userName" placeholder="登录账号" data-validate="required:请填写账号" />
                            <span class="icon icon-user margin-small"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="field field-icon-right">
                            <input type="password" class="input input-big" name="passWord" id="passWord" placeholder="登录密码"  />
                            <span class="icon icon-key margin-small"></span>
                        </div>
                    </div>
                    <div class="form-group">
						<input type="radio"  name="loginType" value="0" checked="checked">管理员
						<input type="radio"  name="loginType" value="1" >批改教师
					</div>
                </div>
                <div style="padding:30px;"><input type="submit" class="button button-block bg-main text-big input-big" id="subbtn" value="登录"></div>
                <div style="text-align:center;color:red;padding-bottom:30px;">${errorMsg}</div>
            </div>
            </form>  
            <script type="text/javascript">
            function sub(){
        		var flag=false;
        		 $("#subbtn").val("登录中...");
        		 $("#subbtn").attr("disabled","disabled");
        		 //$("#subbtn").css("background","gray");
        		 if($("#userName").val().length==0){
        			 sub3();
        		 }else{
        			 flag=true;
        		 }
        	   return flag;
        	}
        	function sub3(){
        		 $("#subbtn").val("登录");
        		 $("#subbtn").removeAttr("disabled");
        		 //$("#subbtn").css("background","#08bbe1");
        	}
            </script>        
        </div>
    </div>
</div>
</body>
</html>