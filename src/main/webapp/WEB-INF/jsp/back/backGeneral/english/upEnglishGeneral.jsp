<%@ page language="java" contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<base href="${pageContext.request.contextPath}/jsp">
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<meta name="renderer" content="webkit">
<title></title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/jsp/back/css/pintuer.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/jsp/back/css/admin.css">
<script src="${pageContext.request.contextPath}/jsp/back/js/jquery.js"></script>
<script src="${pageContext.request.contextPath}/jsp/back/js/pintuer.js"></script>
<script src="${pageContext.request.contextPath}/jsp/back/js/upload.js"></script>
<script  type="text/javascript" src="${pageContext.request.contextPath}/jsp/back/js/My97DatePicker/WdatePicker.js"></script>

<!-- 富文本编辑器 -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/jsp/css/kindeditor/default.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/jsp/css/kindeditor/prettify.css" />
<script charset="utf-8" src="${pageContext.request.contextPath}/jsp/js/kindeditor/kindeditor.js"></script>
<script charset="utf-8" src="${pageContext.request.contextPath}/jsp/js/kindeditor/zh_CN.js"></script>
<script charset="utf-8" src="${pageContext.request.contextPath}/jsp/js/kindeditor/prettify.js"></script>
<script>
var editor1;
		KindEditor.ready(function(K) {
			 editor1 = K.create('textarea[name="gintro"]', {
				cssPath : '${pageContext.request.contextPath}/jsp/css/kindeditor/prettify.css',
				pasteType:1,
				afterCreate : function() {
					var self = this;
					K.ctrl(document, 13, function() {
						self.sync();
					});
					K.ctrl(self.edit.doc, 13, function() {
						self.sync();
					});
				},
				items:[
				         'undo', 'redo', '|', 'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
					        'italic', 'underline', 'strikethrough', 'removeformat', 'hr', '|', '|', 'justifyleft', 'justifycenter', 'justifyright',
				        'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript','superscript', '|',
				        '/', 'cut', 'copy', 'paste', '|','plainpaste', 'wordpaste', 'selectall' ,'removeformat','fullscreen','print'
				]
			});
			prettyPrint();
		});
	</script>
</head>
<body>
<div class="panel admin-panel">
  <div class="panel-head" id="add"><strong><span class="icon-pencil-square-o"></span>修改英语常规课程</strong></div>
  <div class="body-content">
    <form method="post" class="form-x" onsubmit="return sub()" enctype="multipart/form-data" action="${pageContext.request.contextPath}/back/updateEnglishGeneral" >  
      <div class="form-group">
        <input type="hidden" value="${generalVideo.gid}" name="gid">
         <input type="hidden" value="英语" name="gsbuject">
        <div class="label">
          <label>课程名称：</label>
        </div>
        <div class="field">
          <input type="text" class="input w50" value="${generalVideo.gname}" name="gname"  />
          <div class="tips"></div>
        </div>
      </div>
       <div class="form-group">
        <div class="label">
          <label>视频：</label>
        </div>
       <div class="firminfo-video">
            <div class="firminfo-video-input">
                <video class="video-jhhh" height="215" controls="controls" src="${generalVideo.gvideoUrl}"></video>
                 <span class="video-file" style="color: red; width: 20px;" >点我上传视频</span>
                <input type="file" class="videoUp"  style="display: none"  name="file1">
            </div>
        </div>
      </div>    
       <div class="form-group">
        <div class="label">
          <label>封面：</label>
        </div>
        <div class="field">
        <c:if test="${ not empty generalVideo.gvimg}">
           <img id="preview" alt="" name="pic"   src="${generalVideo.gvimg}" style="width: 150px;height: 120px;" >
        </c:if>
          <input type="file"  id="f"  name="file1" onchange="change('封面图片','f','preview')" >
        </div>
      </div> 
      <%-- <div class="form-group">
        <div class="label">
          <label>PDF：</label>
        </div>
        <div class="field">
          <span>${generalVideo.gvpdf}</span>
          <input type="file"  id="file_pdf"  name="file1" onchange="change('','file_pdf','',1)" >
        </div>
      </div>     --%>
       <div class="form-group">
        <div class="label">
          <label>PDF：</label>
        </div>
       <div class="field" id="pdf_tab">
          <input type="button" class="button bg-main " value="添加讲义" onclick="addPdf('pdf_tab')" >
           <c:if test="${generalVideo.pdflist!=null}">
           <c:forEach items="${generalVideo.pdflist}" var="vc" varStatus="ss">
          <table style="margin:5px;" id="pdf_tab${ss.index}">
		      <tr><td style="width:300px;"><span>${vc.pdfUrl}</span><%-- <input type="file" id="file_pdf${ss.index}"  name="file1" onchange="change('','file_pdf${ss.index}','',1)" > --%></td>
		      <td><input type="button" class="button bg-main " onclick="delPDF(${ss.index},'${vc.pdfid}')"  value="删除"></td></tr>
		  </table> 
		   </c:forEach>
		   </c:if>
        </div>
      </div> 
        <div class="form-group">
          <div class="label">
            <label>所属分类：</label>
          </div>
          <div class="field">
            <select name="gclass" class="w50" style="height:36px;line-height:34px;" >
              <option value="">--请选择分类--</option>
              <option value="新概念"<c:if test="${generalVideo.gclass=='新概念' }">selected="selected"</c:if>>新概念</option>
              <option value="流利英语"<c:if test="${generalVideo.gclass=='流利英语' }">selected="selected"</c:if>>流利英语</option>
              <option value="语法"<c:if test="${generalVideo.gclass=='语法' }">selected="selected"</c:if>>语法</option>
              <option value="其他"<c:if test="${generalVideo.gclass=='其他' }">selected="selected"</c:if>>其他</option>
            </select>
            <div class="tips"></div>
          </div>
        </div>
         <div class="form-group">
          <div class="label">
            <label>所属类别：</label>
          </div>
          <div class="field">
            <select name="gclassify" class="w50" style="height:36px;line-height:34px;" >
              <option value="">--请选择类别--</option>
              <option value="第一册"<c:if test="${generalVideo.gclassify=='第一册' }">selected="selected"</c:if>>第一册</option>
              <option value="第二册"<c:if test="${generalVideo.gclassify=='第二册' }">selected="selected"</c:if>>第二册</option>
              <option value="KET考试"<c:if test="${generalVideo.gclassify=='KET考试' }">selected="selected"</c:if>>KET考试</option>
              <option value="PET考试"<c:if test="${generalVideo.gclassify=='PET考试' }">selected="selected"</c:if>>PET考试</option>
              <option value="流利英语"<c:if test="${generalVideo.gclassify=='流利英语' }">selected="selected"</c:if>>流利英语</option>
              <option value="语法专项"<c:if test="${generalVideo.gclassify=='语法专项' }">selected="selected"</c:if>>语法专项</option>
            </select>
            <div class="tips"></div>
          </div>
        </div>
          <div class="form-group">
          <div class="label">
            <label>主讲教师：</label>
          </div>
          <div class="field">
            <select name="teacherName" class="w50" style="height:36px;line-height:34px;">
              <option value="">--请选择主讲教师--</option>
              <c:forEach items="${tclist}" var="t">
              <option value="${t.tname}" <c:if test="${generalVideo.teacherName==t.tname}">selected="selected"</c:if>>${t.tname}</option>
             </c:forEach>
            </select>
            <div class="tips"></div>
          </div>
        </div>
          <div class="form-group">
          <div class="label">
            <label>是否为VIP视频：</label>
          </div>
          <div class="field">
            <select name="gisVip" class="w50" style="height:36px;line-height:34px;">
              <option value="1">--请选择是否为VIP视频--</option>
              <option value="0"<c:if test="${generalVideo.gisVip=='0' }">selected="selected"</c:if>>是</option>
              <option value="1"<c:if test="${generalVideo.gisVip=='1' }">selected="selected"</c:if>>否</option>
            </select>
            <div class="tips"></div>
          </div>
        </div>
          <div class="form-group">
        <div class="label">
          <label>专柜价格：</label>
        </div>
        <div class="field">
          <input type="text" class="input w50" value="${generalVideo.gmoney}" name="gmoney" placeholder="如果免费则不需要填写该项" />
          <div class="tips"></div>
        </div>
      </div>
      <div class="form-group">
        <div class="label">
          <label>秒杀价格：</label>
        </div>
        <div class="field">
          <input type="text" class="input w50" value="${generalVideo.killMoney}" name="killMoney" placeholder="如果免费则不需要填写该项" />
          <div class="tips"></div>
        </div>
      </div>
      <div class="form-group">
        <div class="label">
          <label>秒杀活动名称：</label>
        </div>
        <div class="field">
          <input type="text" class="input w50" value="${generalVideo.killName}" name="killName" placeholder="如：双十一特惠活动" />
          <div class="tips"></div>
        </div>
      </div>
      <div class="form-group">
        <div class="label">
          <label>秒杀时间起：</label>
        </div>
        <div class="field">
          <input class="Wdate input w50" style="height:40px;width:240px;"  value="${generalVideo.killStartTime}" name="killStartTime" placeholder="例如：2017-05-08 11:50:20" onclick="WdatePicker()" type="text" >
         <%--  <input type="text" class="input w50" value="${generalVideo.killStartTime}" name="killStartTime" placeholder="例如：2017-05-08 11:50:20" /> --%>
          <div class="tips"></div>
        </div>
      </div>
      <div class="form-group">
        <div class="label">
          <label>秒杀时间止：</label>
        </div>
        <div class="field">
          <input class="Wdate input w50" style="height:40px;width:240px;" value="${generalVideo.killEndTime}" name="killEndTime" placeholder="例如：2017-05-08 11:50:20" onclick="WdatePicker()" type="text" >
         <%--  <input type="text" class="input w50" value="${generalVideo.killEndTime}" name="killEndTime" placeholder="例如：2017-05-08 11:50:20" /> --%>
          <div class="tips"></div>
        </div>
      </div>
       <div class="form-group">
          <div class="label">
            <label>是否执行秒杀：</label>
          </div>
          <div class="field">
            <select name="isKill" class="w50" style="height:36px;line-height:34px;">
              <option value="">--请选择是否执行秒杀活动--</option>
              <option value="1" <c:if test="${generalVideo.isKill=='1' }">selected="selected"</c:if>>是</option>
              <option value="0" <c:if test="${generalVideo.isKill!='1' }">selected="selected"</c:if>>否</option>
            </select>
            <div class="tips"></div>
          </div>
        </div>
      <div class="form-group">
        <div class="label">
          <label>描述：</label>
        </div>
        <div class="field">
          <textarea class="input" name="gintro" cols="100" rows="15" style="width:800px;height:300px;visibility:hidden;">${generalVideo.gintro}</textarea>
          <div class="tips"></div>
        </div>
      </div>
      <div class="clear"></div>
      <div class="form-group">
        <div class="label">
          <label></label>
        </div>
        <div class="field">
          <button class="button bg-main icon-check-square-o" id="subbtn" type="submit"> 提交</button>
        </div>
      </div>
      <div class="field" id="del_div_pdf">
           
        </div>
    </form>
  </div>
</div>
<script type="text/javascript">
$(function(){
	var error="${error}";
	if(error.length>0){
		alert(error);
	}
	//上传视频
	$('.video-file').click(function() {
		$('.firminfo-video-input').find("input").click();
		$('.firminfo-video-input').find("input").on("change",function(){
			var objUrl = getObjectURL(this.files[0]) ;  //获取图片的路径，该路径不是图片在本地的路径
		       if (objUrl) {
		    	   $('.firminfo-video-input').find("video").attr("src", objUrl) ;      //将图片路径存入src中，显示出图片
		         if ($('.firminfo-video-input').find("video").attr("src") !== "") {
			     	$('.firminfo-video-input').find("video").show();
			     }else{
			     	$(".video-file").show();
			     }
		       }
		});
	});
	//建立一個可存取到該filerl
	function getObjectURL(file) {
	  var url = null ;
	  if (window.URL.createObjectURL!="") { // basic
	    url = window.URL.createObjectURL(file) ;
	  } else if (window.URL!="") { // mozilla(firefox)
	    url = window.URL.createObjectURL(file) ;
	  } else if (window.webkitURL!="") { // webkit or chrome
	    url = window.webkitURL.createObjectURL(file) ;
	  }
	  return url ;
	};
});
//pdf文件
var pdf_index="${generalVideo.pdflist!=null?generalVideo.pdflist.size():0}";
function addPdf(id){
	  var html='<table style="margin:5px;" id="pdf_tab'+pdf_index+'">'+
	      '<tr><td style="width:300px;"><input type="file" id="file_pdf'+pdf_index+'"  name="file1" onchange="change(\'\',\'file_pdf'+pdf_index+'\',\'\',1)" ></td>'+
	      '<td><input type="button" class="button bg-main " onclick="delPDF('+pdf_index+')" value="删除" ></td></tr></table>';
    $("#"+id).append(html);  
     ++pdf_index;
}
function delPDF(ii,id){
	if(id){
		$("#del_div_pdf").append("<input type='hidden' name='delpdfid' value='"+id+"'>");
	}
	  $("#pdf_tab"+ii).remove();
}
function sub(){
	
	 $("#subbtn").html("提交中...");
	 $("#subbtn").attr("disabled","disabled");
	 $("#subbtn").css("background","gray");
	 
	 return true;
}

</script>
</body></html>