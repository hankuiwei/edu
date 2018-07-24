package com.hpedu.core.user.controller;

import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.hpedu.util.BaseUtil;
import com.hpedu.util.PrintHelper;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.taobao.api.request.AlibabaAliqinFcSmsNumSendRequest;
import com.taobao.api.response.AlibabaAliqinFcSmsNumSendResponse;

public class CommUtil {
	static Logger log=BaseUtil.getLogger(CommUtil.class);
	//发送短信
public static String sendSMS(String tel,HttpSession session,boolean isYzCode,int type){
	// 官网的URL
			String url = "http://gw.api.taobao.com/router/rest";
			// 成为开发者，创建应用后系统自动生成
			String appkey = "23633603";
			String secret = "1a52fb90dd0c8c1341835f828ddae713";
			String jsonstr="";
			String smsTemplateCode="";//短信模板id
			if(isYzCode){//发送验证码
				Random random = new Random();
				int x = random.nextInt(999999);
				session.setAttribute("ycodes", x);
				// 短信模板的内容
				StringBuilder jsons = new StringBuilder();
				jsons.append("{");
				jsons.append("\"code\":" + "\"" + x + "\",");
				jsons.append("\"product\":" + "\"" +"厚朴教育"+ "\"");
				jsons.append("}");
			   jsonstr = jsons.toString();
			   smsTemplateCode=type==1?"SMS_95725021":"SMS_53015044";
			}else{
				//发送审核通知
				StringBuilder jsons = new StringBuilder();
				jsons.append("{");
				jsons.append("\"tel\":" + "\"" + tel+ "\",");
				jsons.append("\"product\":" + "\"" +"厚朴教育"+ "\"");
				jsons.append("}");
			   jsonstr = jsons.toString();
			   smsTemplateCode=type==1?"SMS_95885020":"SMS_62455721";
			}
			TaobaoClient client = new DefaultTaobaoClient(url, appkey, secret);
			AlibabaAliqinFcSmsNumSendRequest req = new AlibabaAliqinFcSmsNumSendRequest();
			//req.setExtend("厚朴教育");
			req.setSmsType("normal");
			req.setSmsFreeSignName("厚朴教育");
			req.setSmsParamString(jsonstr);
			req.setRecNum(tel);
			req.setSmsTemplateCode(smsTemplateCode);
			String res="-1";
			try {
				AlibabaAliqinFcSmsNumSendResponse rsp = client.execute(req);
				System.out.println(rsp.getBody());
				res="1";
			}catch(Exception e){
				log.error("阿里云短信发送失败：", e);
			}
		return 	res;
}
}
