package com.hpedu.core.index.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hpedu.core.order.pojo.Banner;
import com.hpedu.core.order.service.OrderService;
import com.hpedu.core.teacher.pojo.Teacher;
import com.hpedu.core.teacher.service.TeacherService;
import com.hpedu.core.trophy.pojo.Trophy;
import com.hpedu.core.trophy.service.TrophyService;
import com.hpedu.core.user.pojo.User;
import com.hpedu.core.video.pojo.ContestVideo;
import com.hpedu.core.video.pojo.GeneralVideo;
import com.hpedu.core.video.service.ContestVideoService;
import com.hpedu.core.video.service.GeneralVideoService;
import com.hpedu.util.BaseUtil;

@Controller
@RequestMapping("/")
public class IndexController {
	@Resource
	TeacherService teacherService;
	@Resource
	TrophyService trophyService;
	@Resource
	ContestVideoService contestVideoService;
	@Resource 
	GeneralVideoService generalVideoService;
	@Resource 
	OrderService  orderService;
	private Logger log=BaseUtil.getLogger(IndexController.class);
@RequestMapping("/classindex.html")
public void toIndex(HttpServletRequest req,Model model,HttpSession session)throws Exception{
	
	
	
	User user = (User) session.getAttribute("user");
	if(user!=null){model.addAttribute("user", user);}
	List<Trophy> trolist=null;
	List<ContestVideo> conlist=null;
	List<GeneralVideo> genlist=null;
	 List<Banner> blist=null;
	 StringBuffer error=new StringBuffer();
	 List<Teacher> tlist=null;
	try{
		Map<String,Object> param=new HashMap<String, Object>();
		param.put("isShow", 1);
	    tlist = teacherService.findAllTeacher(param);//教师
    }catch(Exception e){
    	error.append("教师失败："+e.getMessage()+";");
    	tlist=new ArrayList<Teacher>();
	}
	Map<String,Object> map=new HashMap<String,Object>();
	map.put("limit",7);
	try{
	 trolist = trophyService.findAllTrophy(map);//学员展示
    }catch(Exception e){
    	error.append("学生失败："+e.getMessage()+";");
    	trolist=new ArrayList<Trophy>();
	}
	try{
	 conlist = contestVideoService.findContestVideoIndex();//竞赛
	}catch(Exception e){
		error.append("竞赛视频失败："+e.getMessage()+";");
		conlist=new ArrayList<ContestVideo>();
    }
	try{
	 genlist = generalVideoService.findGeneralVideo();//常规课
	   }catch(Exception e){
			error.append("常规视频失败："+e.getMessage()+";");
			genlist=new ArrayList<GeneralVideo>();
	}
	 try{
	   blist=orderService.selectAllWebBanner();//轮播图片
	 }catch(Exception e){
			error.append("轮播图失败："+e.getMessage()+";");	
			blist=new ArrayList<Banner>();	
	}
	 if(error.length()>0){
		 log.error("首页查询"+error.toString());
	 }
	model.addAttribute("tlist", tlist);
	model.addAttribute("trolist", trolist);
	model.addAttribute("conlist", conlist);
	model.addAttribute("genlist", genlist); 
	model.addAttribute("blist", blist); 
	}

}
