package com.hpedu.core.back.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hpedu.core.teacher.pojo.Teacher;
import com.hpedu.core.teacher.service.TeacherService;
import com.hpedu.core.user.pojo.User;
import com.hpedu.core.user.service.UserService;
import com.hpedu.util.BaseUtil;
import com.hpedu.util.MD5;

@Controller
@RequestMapping("/")
public class BackUserController {
	@Resource
	UserService userService;
	@Resource
	TeacherService teacherService;
	private Logger log=BaseUtil.getLogger(BackUserController.class);
	/*@RequestMapping("/back/backlogin.html")
	public void toBackUserLogin(HttpServletRequest req,HttpSession session,Model model)throws Exception{
		
	}*/
	@RequestMapping("/back/backlogin.html")
	public void toBackUserLogin(HttpServletRequest req,HttpSession session,Model model)throws Exception{
		session.removeAttribute("backuser");
		String errorMsg=(String) session.getAttribute("errorMsg");
		if(errorMsg!=null){
			model.addAttribute("errorMsg", errorMsg);
			session.removeAttribute("errorMsg");
		}
		
	}
	/*@RequestMapping(value="back/backUserLogin",method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView backUserLogin(HttpServletRequest req,String userName,String passWord,HttpSession session)throws Exception{
		Map<String,String> maps = new HashMap<String,String>();
		maps.put("userName", userName);
		maps.put("passWord", new MD5(passWord).compute_upper());
		User user  = userService.backUserLogin(maps);
		if(null!=user){
			session.setAttribute("backuser", user);
			return new ModelAndView("redirect:/back/backindex.html");
		}
		return new ModelAndView("redirect:/back/backlogin.html");
	}*/
	@RequestMapping(value="back/backUserLogin",method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView backUserLogin(HttpServletRequest req,String userName,String passWord,int loginType,HttpSession session)throws Exception{
		try{
			String msg="";
			if(loginType==0){//管理员登录
				Map<String,String> maps = new HashMap<String,String>();
				maps.put("userName", userName);
				maps.put("passWord", new MD5(passWord).compute_upper());
				User user  = userService.backUserLogin(maps);
			
				if(null!=user){
					session.setAttribute("backuser", user);
					return new ModelAndView("redirect:/back/backindex.html");
				}else{
					msg="账号不存在";
				}
			}else if(loginType==1){//批改教师登录
				Teacher teacher=teacherService.findTeacherByName(userName);
				if(null!=teacher){
					session.setAttribute("tname", teacher.getTname());
					return new ModelAndView("redirect:/back/correctIndex.html");
				}else{
					msg="教师不存在";
				}
			}
			if(msg.length()>0){
				 session.setAttribute("errorMsg", msg);
			}
		}catch(Exception e){
			log.error("后台登录出错：",e);
			session.setAttribute("errorMsg", "网站出错了，请联系管理员！");
		}
		return new ModelAndView("redirect:/back/backlogin.html");
	}
}
