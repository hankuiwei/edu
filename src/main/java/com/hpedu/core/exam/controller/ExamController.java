package com.hpedu.core.exam.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hpedu.core.exam.pojo.Exam;
import com.hpedu.core.exam.pojo.ExamImg;
import com.hpedu.core.exam.service.ExamService;
import com.hpedu.core.user.pojo.User;
import com.hpedu.core.video.pojo.ContestVideo;
import com.hpedu.core.video.pojo.GeneralVideo;
import com.hpedu.core.video.service.ContestVideoService;
import com.hpedu.core.video.service.GeneralVideoService;
import com.hpedu.util.BaseUtil;
import com.hpedu.util.StringUtil;
import com.hpedu.util.mybatis.Page;

@Controller
@RequestMapping("/")
public class ExamController {
	
	@Resource
	ExamService examService;
	@Resource
	GeneralVideoService generalVideoService;
	@Resource
	ContestVideoService contestVideoService;
	private Logger log=BaseUtil.getLogger(ExamController.class);

	@RequestMapping("/exam/examlist.html")
	public void findExamListByMap(HttpServletRequest req, HttpSession session,
			Model model, String etsubject, String etclass, String etclassify)
			throws Exception {
		User user = (User) session.getAttribute("user");
		Page<Exam>pages=null;
		int pageNo = 0;
		int pageSize = 20;
		if (req.getParameter("pageNo") != null
				&& StringUtil.isNumeric(req.getParameter("pageNo"))) {
			pageNo = Integer.parseInt(req.getParameter("pageNo"));
		}
		if (pageNo < 1) {pageNo = 1;}
		Map<String,String> map  = new HashMap<String,String>(); 
	
		/*map.put("etsubject", new String(etsubject.getBytes("iso8859-1"),"utf-8"));
		map.put("etclass", new String(etclass.getBytes("iso8859-1"),"utf-8"));
		map.put("etclassify", new String(etclassify.getBytes("iso8859-1"),"utf-8"));*/
		
		map.put("etsubject", etsubject);
		map.put("etclass", etclass);
		map.put("etclassify", etclassify);
		try{
		  pages = examService.findExamListByMap(map, pageNo, pageSize);
		}catch(Exception e){
			log.error("查询测验题出错了:",e);
			pages=new Page<Exam>();
			pages.setResult(new ArrayList<Exam>());
			
		}
		model.addAttribute("user", user);
		model.addAttribute("etsubject", map.get("etsubject"));
		model.addAttribute("etclass", map.get("etclass"));
		model.addAttribute("etclassify", map.get("etclassify"));
	
		model.addAttribute("pages", pages);
	}
	@RequestMapping("exam/exam.html")
	public void findExamByetid(HttpServletRequest req,HttpSession session,String etid,Model model)throws Exception{
		
			User user = (User)session.getAttribute("user");
			Exam exam=null;
			List<GeneralVideo>  glist=null;
			List<ContestVideo> clist=null;
			String gsubject="";
		    List<ExamImg> imglist=null;
			try{	  
			 exam = examService.findExamByEtid(etid);
				String etsubject=exam.getEtsubject();
				 gsubject=etsubject.replace("测验", "");
				
				String gclass="";
				String etclass=exam.getEtclass();
				gclass=etclass.replace("年级", "");
				
				if(gsubject.equals("英语")){
					exam.setEtclass("");
				}
					 
				Map<String,Object> map=new HashMap<String, Object>();
				map.put("gsubject", gsubject);
				map.put("gclass", gclass);
				map.put("pagesize", 8);
				try{
				  glist=generalVideoService.findVideoListByExam(map);
				}catch(Exception ee){
					glist=new ArrayList<GeneralVideo>();
					log.error("查询测验常规推荐视频出错:",ee);
				}
				if(!gsubject.equals("英语")){
					map.put("cclass", gclass);
				}
				try{
				  clist=contestVideoService.findVideoListByExam(map);
				}catch(Exception er){
					clist=new ArrayList<ContestVideo>();
					log.error("查询测验竞赛推荐视频出错:",er);
				}
				if(StringUtils.isNotEmpty(exam.getEtimg())&&exam.getEtimg().equals("1")){
					   try{
						imglist=examService.selectExamImgByExid(exam.getEtid());
						}catch(Exception er){
							imglist=new ArrayList<ExamImg>();
							log.error("查询测验试卷和答案图片list出错:",er);
						}
					   exam.setImgList(imglist);
				}
			}catch(Exception e){
				log.error("查询测验题【id:"+etid+"】出错：",e);
			}
			
			model.addAttribute("glist", glist);
			model.addAttribute("clist", clist);
			model.addAttribute("exam", exam);
			model.addAttribute("user", user);
			model.addAttribute("gsubject", gsubject);
	}
}
