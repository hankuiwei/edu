package com.hpedu.core.user.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.http.client.utils.DateUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;
import com.hpedu.core.order.pojo.Order;
import com.hpedu.core.user.pojo.User;
import com.hpedu.core.user.pojo.UserLearn;
import com.hpedu.core.user.pojo.UserLevel;
import com.hpedu.core.user.service.UserService;
import com.hpedu.util.BaseUtil;
import com.hpedu.util.DateUtil;
import com.hpedu.util.MD5;
import com.hpedu.util.PrintHelper;
import com.hpedu.util.StringUtil;
import com.hpedu.util.UUIDUtil;
import com.hpedu.util.mybatis.Page;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.taobao.api.request.AlibabaAliqinFcSmsNumSendRequest;
import com.taobao.api.response.AlibabaAliqinFcSmsNumSendResponse;

@Controller
@RequestMapping("/")
public class UserController {
	@Value("#{configProperties['uploadAbsolutePath']}")
	private String uploadAbsolutePath ;
	
	@Resource
	UserService userService;
	private Logger log=BaseUtil.getLogger(UserController.class);
	/**
	 * reg注册页面
	 * */
	@RequestMapping("/classReg.html")
	public void toreg(HttpServletRequest req,HttpSession session,Model model)throws Exception{
		String regError=(String) session.getAttribute("regError");
		if(regError!=null){
			model.addAttribute("regError", regError);
			session.removeAttribute("regError");
		}
		
	}
	/**
	 * 打开在线客服
	 * */
	@RequestMapping("/openKF.html")
	public void openKF(HttpServletRequest req,HttpSession session,Model model)throws Exception{
		
	}
	/**
	 * 修改学生学习时间
	 * */
	@RequestMapping("/user/changeStuLeanTime")
	public void changeStuLeanTime(HttpServletRequest req,HttpSession session,String vid,String vclassify,String time)throws Exception{
		User u=(User) session.getAttribute("user");
		if(u!=null){
			//System.out.println(vid+"=="+vclassify+"=="+time+"=="+u.getUid());
			time=time==null?"0":time;
			Long realTime=Long.parseLong(time.substring(0,time.indexOf(".")));
			try{
				userService.updateLearnTotalTime(u.getUid(), realTime);
				u.setLearnTime(u.getLearnTime()+realTime);
				session.setAttribute("user", u);
			}catch(Exception e){
				log.error("修改学生【uid:"+u.getUid()+"】总学习时间失败：",e);
			}
			//修改当天的学习记录
			try{
			String ulid=userService.selectIsExitUserLearn(u.getUid(), vid, vclassify);
			UserLearn ul=new UserLearn();
			if(ulid==null){//新增学习记录
				ul.setLearnTime(realTime);
				ul.setUlid(UUIDUtil.getUUID());
				ul.setUserid(u.getUid());
				ul.setVctype(Integer.parseInt(vclassify));
				ul.setVid(vid);
				userService.insertLearnTimeByDay(ul);
			}else{//修改学习记录
				ul.setLearnTime(realTime);
				ul.setUlid(ulid);
				userService.updateLearnTimeByDay(ul);
			}
			}catch(Exception e){
				log.error("修改学生【uid:"+u.getUid()+"】当天学习时间失败：",e);
			}
		}
	}

	@RequestMapping(value="/reg/user",method=RequestMethod.POST)
	public ModelAndView req(HttpServletRequest req,HttpServletResponse response,HttpSession session,String ycode,User user)throws Exception{
			String code  = String.valueOf(session.getAttribute("ycodes"));
			ModelAndView mode=new ModelAndView();
			String res="";
			if(ycode!=null
					&&code!=null
					&&ycode.equals(code)
					){
				user.setUid(UUIDUtil.getUUID());
				user.setPassWord(new MD5(user.getPassWord()).compute_upper());
				//若使用码不为空，更新邀请人的vip时间
				User invateUser=null;//邀请人
				if(StringUtils.isNotBlank(user.getUsedCode())){
					invateUser=userService.getUserByYQCode(user.getUsedCode());
				}
				int type=user.getType();
				int status=0;//未审核
				if(type==0||invateUser!=null){//普通用户
					status=1;
				}
				user.setStatus(status);
				user.setRegTime(new Date());
				if(invateUser!=null){//使用邀请码注册
					user.setIsVip("1");
					user.setFreeType("1月");
					user.setEndTime(DateUtil.addMonth(new Date(), 1));//被邀请人延长1个月
				}else{
					user.setIsVip("0");
				}
				user.setLearnTime(0l);
				//生成自己的邀请码
				String[] codes=userService.getNewYQCode(8, req,uploadAbsolutePath);
				user.setYqCode(codes[0]);
				user.setYqCodeUrl(codes[1]);
				try{
					userService.addUser(user);
				}catch(Exception e){
					res="注册失败："+e.getMessage();
				}
				//被邀请人延长半个月
				upadteInvator(invateUser);
			}else{
				res="手机验证码不正确";
			}
		   
			if(res.length()==0){
				session.setAttribute("user", user);
				mode.setViewName("redirect:/userNews.html");
			}else{
				session.setAttribute("regError", res);
				mode.setViewName("redirect:/classReg.html");
			}
			
			return mode;
	}
	//被邀请人延长半个月
	private void upadteInvator(User invateUser) throws Exception{
		if(invateUser!=null){
			String endTimeStr=invateUser.getEndTime();
			Date endTime=null;
			if(endTimeStr==null){
				endTime=new Date();
			}else{
				endTime=DateUtil.string2Date(endTimeStr, "yyyy-MM-dd");
			}
			invateUser.setEndTime(DateUtil.addDate(endTime, 15));//到期时间延长半个月
			invateUser.setStatus(1);
			invateUser.setIsVip("1");
			userService.updateUserNews(invateUser);
		}
	}
	/**
	 * 手机验证码校验
	 * */
	@RequestMapping("/user/yzCode")
	public void yzCode(HttpServletRequest req,HttpServletResponse response,HttpSession session,int type,String code,String phone)throws Exception{
		String ycode  = String.valueOf(session.getAttribute("ycodes"));
		String res="ok";
		if(ycode!=null&&code!=null&&ycode.equals(code)){
			if(type==0){
				//验证手机号是否唯一
				int count=userService.getIsExitsByPhone(phone);
				if(count>0){
					res="手机号【"+phone+"】已存在，不可重复注册！";
				}
			}
		}else{
			res="手机验证码不正确！";
		}
		PrintHelper.sendJsonString(response, res);
	}
	/**
	 * 手机验证码校验
	 * */
	@RequestMapping("/user/ckPhoneIsExsits")
	public void ckPhoneIsExsits(HttpServletRequest req,HttpServletResponse response,HttpSession session,String phone)throws Exception{
		String res="ok";
		try{
			int count=userService.getIsExitsByPhone(phone);
			if(count>0){
				res="exsits";
			}
		}catch(Exception e){
			e.printStackTrace();
			res=e.getMessage();
		}
		PrintHelper.sendJsonString(response, res);
	}
	@RequestMapping(value="/reg/backPass",method=RequestMethod.POST)
	public ModelAndView backPass(HttpServletRequest req,HttpServletResponse response,HttpSession session,String ycode,User user)throws Exception{
			String code  = String.valueOf(session.getAttribute("ycodes"));
			ModelAndView mode=new ModelAndView();
			String res="";
			if(ycode!=null&&code!=null&&ycode.equals(code)){
				//验证手机号是否存在
				int count=userService.getIsExitsByPhone(user.getPhoneNo());
				if(count>0){
					String newPwd=new MD5(user.getPassWord()).compute_upper();
					try{
						userService.updatePwdByPhone(user.getPhoneNo(), newPwd);
					}catch(Exception e){
						res="找回密码失败："+e.getMessage();
					}
				}else{
					res="手机号不存在，请先注册";
				}
			}else{
				res="手机验证码不正确";
			}
			if(res.length()==0){
				mode.setViewName("redirect:/login.html");
			}else{
				session.setAttribute("regError", res);
				mode.setViewName("redirect:/backPass.html");
			}
			return mode;
	}
	/**
	 * 短信验证码
	 * */
	@RequestMapping(value="/reg/ycode",method=RequestMethod.POST)
	public void sendMessage(HttpServletRequest reqt,HttpServletResponse response,String tel,HttpSession session,Integer type)
			throws Exception {
		 String res=CommUtil.sendSMS( tel, session,true,type);//type:0:注册验证码：1：普通验证码如密码找回
		 PrintHelper.sendJsonString(response, res);
	}
	/**
	 * 登陆页面
	 * */
	@RequestMapping("/login.html")
	public void toLogin(HttpServletRequest req,HttpSession session,Model model)throws Exception{
	    String loginError=(String) session.getAttribute("loginError");
		if(loginError!=null){
			model.addAttribute("loginError", loginError);
			session.removeAttribute("loginError");
		}
	}
	@RequestMapping(value="/user/login",method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView login(HttpServletRequest req,HttpSession session,User user)throws Exception{
		String jspname="redirect:/login.html";
		ModelAndView mode=new ModelAndView();
		 try{
		    String oldPwd=user.getPassWord();
			user.setPassWord(new MD5(oldPwd).compute_upper());
			User users = userService.findUserByPhone(user.getPhoneNo(), user.getPassWord());
		
			if(users!=null){
				/*Integer type=users.getType();//登录人身份类型：0：普通用户；1：学生家长
				Integer status=users.getStatus();//状态：1：已审核；0：未审核
			    if(type==1&&status==0){//未通过审核的学生家长
			    	loginMap.put(users.getUid(), users);
			    	users.setPassWord(oldPwd);
					session.setAttribute("uid", users.getUid());
			    	session.setAttribute("loginError", "您的账号是学生家长，请等网站待管理员的审核短信通知");
			    }else{
			    	session.setAttribute("user", users);
			    	jspname="redirect:/classindex.html";
			    }*/
				session.setAttribute("user", users);
		    	jspname="redirect:/classindex.html";
			}else{
				session.setAttribute("loginError", "登录账号不存在");
			}
		 }catch(Exception e){
			 session.setAttribute("loginError", "登录出错，请联系网站管理员！");
			 log.info("前端用户登录出错:",e);
		 }	
			mode.setViewName(jspname);
			
		return mode;
	}
	/**
	 * 修改密码
	 * */
	@RequestMapping("/backPass")
	public void backPass(HttpServletRequest req)throws Exception{
		
	}
	@RequestMapping("/userNews.html")
	public void findUserNews(HttpServletRequest req,HttpSession session, Model model)throws Exception{
		User user=(User)session.getAttribute("user");
		if(user!=null){
			model.addAttribute("user", userService.findUserByUid(user.getUid()));	
		}
		//学生等级
		Integer leval=0;
		int learnCount=0;
		try{
			List<UserLevel> levelList=userService.selectAllLevel();
			if(user!=null){
				Long learnTime=user.getLearnTime();//单位是秒
				learnTime=learnTime==null?0l:learnTime;
				for(UserLevel u:levelList){
					Long minNum=u.getMinNum();//单位是小时
					Long maxNum=u.getMaxNum();//单位是小时
					if((learnTime>=minNum*3600&&maxNum==null)||(learnTime>=minNum*3600&&maxNum!=null&&learnTime<maxNum*3600)){
						leval=u.getLevel();
						break;
					}
				}
				//学习中的课程总计
				learnCount=userService.getLearnVideoTotalCount(user.getUid());
			}
		
		}catch(Exception e){
			log.error("查询学生等级异常：",e);
		}
		
		model.addAttribute("leval", leval);
		model.addAttribute("learnCount", learnCount);
		
		//学习总年份
		String uid=user==null?"-1":user.getUid();
		List<String> yearList=userService.getYearByUserId(uid);
		
		 Calendar now = Calendar.getInstance(); 
		int year=now.get(Calendar.YEAR);
		int month=now.get(Calendar.MONTH) + 1;
        if(yearList.size()==0){
        	yearList.add(String.valueOf(year));
		}
		model.addAttribute("yearList", yearList);
		model.addAttribute("year", year);
		model.addAttribute("month", month);
	}
	//学习时间表查询
	@RequestMapping("/getUserlearnList")
	@ResponseBody
	public List<Map> getUserlearnList(HttpServletRequest req,HttpSession session,int year,int month)throws Exception{
		String monthStr=month<10?"0"+month:""+month;
		User user = (User)session.getAttribute("user");
		String userId=user==null?"-1":user.getUid();
		
		List<Map>  learnList=userService.getLearnTimeByUserId(userId, year+"-"+monthStr);//学习时长
		
		//System.out.println(year+"-"+monthStr+"--"+learnList.size());
		return learnList;
	}
	
	//学习中的课程分页查询
		@RequestMapping("/learnVideoPage.html")
		public void learnVideoPage(HttpServletRequest req,HttpSession session,Model model)throws Exception{
			int pageNo = 0;
			int pageSize = 8;
			if (req.getParameter("pageNo") != null
					&& StringUtil.isNumeric(req.getParameter("pageNo"))) {
				pageNo = Integer.parseInt(req.getParameter("pageNo"));
			}
			if (pageNo < 1) {
				pageNo = 1;
			}
			
			List<Map> list=null;
			int totalCount=0;
			String userId="";
			User user = (User)session.getAttribute("user");
			if(user!=null){
				userId=user.getUid();
			}

			try{
			 list=userService.findlearnListByPage(userId, pageNo, pageSize);
			 totalCount=userService.getLearnVideoTotalCount(userId);
			}catch(Exception e){
				log.info("分页查看用户学习中课程出错:",e);
				list=new ArrayList<Map>();
			}
			//System.out.println("size:=========================="+list.size());
			Page pages=new Page();
			pages.setResult(list);
			pages.setPageNo(pageNo);
			pages.setPageSize(pageSize);
			pages.setTotalCount(totalCount);
			model.addAttribute("pages", pages);	
	}
		//学生历史分数分页查询
	@RequestMapping("/historyScoresPage.html")
	public void historyScoresPage(HttpServletRequest req,HttpSession session,Model model)throws Exception{
		
		int pageNo = 0;
		int pageSize = 15;
		if (req.getParameter("pageNo") != null
				&& StringUtil.isNumeric(req.getParameter("pageNo"))) {
			pageNo = Integer.parseInt(req.getParameter("pageNo"));
		}
		if (pageNo < 1) {
			pageNo = 1;
		}
		
		String userId="";
		User user = (User)session.getAttribute("user");
		if(user!=null){
			userId=user.getUid();
		}
       Map<String,Object> map=new HashMap<String, Object>();
       map.put("userId", userId);
       try{
	   model.addAttribute("pages", userService.searchUnitTestList(map, pageNo, pageSize));	
       }catch(Exception e){
    	   log.error("学生【userid:"+userId+"】历史分数分页查询失败：",e);
       }
}
	/**
	 * 查看简答题详情
	 * */
@RequestMapping("/checUnitTestJDTDetail.html")
public void checUnitTestJDTDetail(HttpServletRequest req,HttpSession session,Model model,String usid,String gname)throws Exception{
	    List<Map> jdt_list=null;
		try{
			jdt_list=userService.getJDTScoresDetail(usid);
		}catch(Exception e){
			log.info("查看简答题详情出错:",e);
		}
		model.addAttribute("jdt_list", jdt_list);
		model.addAttribute("gname", gname);
}	

	/**
	 * 修改用户信息
	 * */
	@RequestMapping(value="/user/updateUserNews",method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView updateUserNews(HttpServletRequest req,HttpSession session,@RequestParam(value="timgUrl1",required=false)MultipartFile file,User user)throws Exception{
		User users = (User)session.getAttribute("user");
		   if(users==null){
			   String uid=user.getUid();
			   if(uid!=null&&uid.length()>0){
				   users=userService.findUserByUid(uid);
			   }
		   }
		
		if(users!=null){
			   if( file.getSize()>0){
				String realPath = uploadAbsolutePath;
				String path = req.getContextPath().substring(1);
//				realPath = realPath.replace(path, "userHeadImg");
				realPath = uploadAbsolutePath+"/"+ "userHeadImg";
				String fileName = UUIDUtil.getUUID();
				 String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
				 FileUtils.copyInputStreamToFile(file.getInputStream(),new File(realPath, fileName+"."+suffix));	
				 users.setHeadImgUrl("/userHeadImg/"+fileName+"."+suffix);
				}
			users.setEmail(user.getEmail());
			users.setUserName(user.getUserName());
			try{
			      userService.updateUserNews(users);
			      session.setAttribute("user", users);
				  return new ModelAndView("redirect:/classindex.html");
			 }catch(Exception e){
				log.error("修改前端用户信息【id:"+users.getUid()+"】失败：",e);
			 }
		}
		return new ModelAndView("redirect:/login.html");
	}
	
	
	/**
	 * 用户退出
	 * */
	@RequestMapping("/user/exitUser")
	public ModelAndView userExit(HttpServletRequest req,HttpSession session)throws Exception{
		session.removeAttribute("user");
		return new ModelAndView("redirect:/classindex.html");
	}
	/**
	 * 批量生成邀请码
	 * */
	@RequestMapping("/user/makingYQCode")
	public void makingYQCode(HttpServletRequest req,HttpServletResponse response,HttpSession session)throws Exception{
		List<User> list=userService.searchUserList(null);
		for(int i=0;i<list.size();i++){
			String[] codes=userService.getNewYQCode(8,req,uploadAbsolutePath);
			userService.updateYQCodeByUserId(list.get(i).getUid(), codes[0], codes[1]);
		}
		response.getWriter().print("ok");
	}
	/**
	 * 邀请码是否存在
	 * */
	@RequestMapping("/user/ckYQCodeExsits")
	public void ckYQCodeExsits(HttpServletRequest req,HttpServletResponse response,HttpSession session,String yqCode)throws Exception{
		try{
			User user=userService.getUserByYQCode(yqCode);
			if(user!=null){
				response.getWriter().print("ok");
			}else{
				response.getWriter().print("notExsits");
			}
		}catch(Exception e){
			e.printStackTrace();
			response.getWriter().print("error");
		}
	}
}
