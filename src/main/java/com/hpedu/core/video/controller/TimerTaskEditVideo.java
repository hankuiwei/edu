package com.hpedu.core.video.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.hpedu.core.video.service.GeneralVideoService;
import com.hpedu.util.BaseUtil;

@Component//将这个对象加入Spring容器中
public class TimerTaskEditVideo{
	@Resource
	GeneralVideoService generalVideoService;
	Logger log=BaseUtil.getLogger(TimerTaskEditVideo.class);
    @Scheduled(cron = "0 0 0/1 * * ?")//每小时执行一次视频更新
    public void startTimer() {
    	 Date date=new Date();
    	 String[] dateArr=new SimpleDateFormat("yyyy-MM-dd#EEEE-HH").format(date).split("#");
    	 try{
    	   generalVideoService.updateVideoEditDate(dateArr[0]+"-"+ dateArr[1].split("-")[1], dateArr[1]);
    	 }catch(Exception e){
    		 log.error("定时更新视频异常：", e);
    	 }
    }
}  

