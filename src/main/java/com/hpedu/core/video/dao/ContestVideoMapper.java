package com.hpedu.core.video.dao;

import java.util.List;
import java.util.Map;

import com.hpedu.core.video.pojo.ContestVideo;
import com.hpedu.core.video.pojo.GeneralVideo;
import com.hpedu.core.video.pojo.VideoPdf;

/**
 * 竞赛dao
 * */
public interface ContestVideoMapper {
	/**
	 * 首页查询推荐竞赛视频
	 * */
	List<ContestVideo> findContestVideoIndex()throws Exception;
	/**
	 * 根据竞赛视频ID 点击播放
	 * @param cId (竞赛视频ID)
	 * */
	ContestVideo findContestVideoById(String cId)throws Exception;
	/**
	 * 查询该竞赛相关视频
	 * @param competitionName 竞赛名称（例：美国大联盟杯）
	 * @param cclass 年级（例：三四年级）
	 * @param cclassify 年级下分类（例：真题讲解）
	 * */
	List<ContestVideo> findContestVideoByVideo(String competitionName,String cclass,String cclassify,String vid)throws Exception;
	/**
	 * 条件查询 竞赛 分页
	 * @param map集合
	 * */
	List<ContestVideo> searchContestVideoList(Map<String,String> map)throws Exception;
	int searchContestVideoListCount(Map<String,String> map)throws Exception;
	
	/**
	 * 新增大联盟杯课程
	 * */
	void addUSAClass(ContestVideo contestVideo)throws Exception;
	/**
	 * 修改竞赛视频信息
	 * */
	void updateUSAClass(ContestVideo contestVideo)throws Exception;
	/**
	 * 删除竞赛视频
	 * */
	void deleteUSACLass(String cid)throws Exception;
	/**
	 * 竞赛视频模糊查询
	 * */
	List<ContestVideo> searchContestVideoListByCname(String cname)throws Exception;
	 /**
		 * 根据年级查前8条竞赛视频-测验推荐
		 * */
    List<ContestVideo> findVideoListByExam(Map<String,Object> map)throws Exception;
    
    List<VideoPdf> selectPdfByVid(String vid,String type);
    
    int updateIsKill(String vid,String status);//修改秒杀执行状态
    
    /**
	 * 修改竞赛播放次数
	 * */
	void updatePlayCount(String vid);
}
