package com.hpedu.core.user.dao;

import java.util.List;
import java.util.Map;

import com.hpedu.core.order.pojo.Order;
import com.hpedu.core.user.pojo.ErrorExam;
import com.hpedu.core.user.pojo.RightMenu;
import com.hpedu.core.user.pojo.UnitTest;
import com.hpedu.core.user.pojo.UnitTest_Choose;
import com.hpedu.core.user.pojo.User;
import com.hpedu.core.user.pojo.UserLearn;
import com.hpedu.core.user.pojo.UserLevel;
import com.hpedu.core.user.pojo.UserScore;
import com.hpedu.core.video.pojo.ContestVideo;

public interface UserMapper {

	/**
	 * 根据手机号密码查询
	 * */
	User findUserByPhone(String userPhone,String passWord)throws Exception;

	/**
	 * 后台登陆
	 * 
	 * */
	User backUserLogin(Map<String,String>maps)throws Exception;
	/**
	 * 注册用户
	 * */
	void addUser(User user)throws Exception;
	/**
	 * 修改用户信息
	 * */
	void updateUserNews(User user)throws Exception;
	/**
	 * 删除用户信息
	 * */
	int deleteUserById(String uid);
	/**
	 * 检查手机号是否已存在
	 * */
	int getIsExitsByPhone(String phoneNo);
	/**
	 * 检查账号是否已存在
	 * */
	int getIsExitsByName(String userName);
	/**
	 * 根据uid查询
	 * */
	User findUserByUid(String uid)throws Exception;
	
	/**
	 * 条件查询 用户(学生家长) 分页
	 * @param map集合
	 * */
	List<User> searchUserList(Map<String,String> map)throws Exception;
	int searchUserListCount(Map<String,String> map)throws Exception;
	/**
	 * 查询所有学习等级
	 * */
	List<UserLevel> selectAllLevel();
	/**
	 * 查询所有学习等级
	 * */
	UserLevel selectLevelById(String ulid);
	/**
	 * 新增学习等级
	 * */
	void insertLevel(UserLevel ul);
	/**
	 * 修改学习等级
	 * */
	void updateLevel(UserLevel ul);
	/**
	 * 删除学习等级
	 * */
	int deleteLevel(String ulid);
	/**
	 * 修改学生总的学习时间
	 * */
	void updateLearnTotalTime(String uid,Long addtime);
	/**
	 * 新增学生当天的学习记录
	 * */
	void insertLearnTimeByDay(UserLearn learn);
	/**
	 * 检查当天是否已经添加该视频的学习记录
	 * */
	String selectIsExitUserLearn(String uid,String vid,String vclassify);
	/**
	 * 修改学生当天的视频学习时间
	 * */
	void updateLearnTimeByDay(UserLearn learn);
	
	/**
	 * 查询学生学习中的课程总数
	 * */
	int getLearnVideoTotalCount(String userId);
	/**
	 * 查询学生学习中的课程（分页）
	 * 
	 * */
	
	List<Map>  findlearnListByPage(String userId,int skip,int limit) throws Exception;
	/**
	 * 根据日期查询查询用户学习时间表
	 * dateStr:yyyy-MM
	 * */
	List<Map> getLearnTimeByUserId(String userId,String dateStr);
	/**
	 * 查询用户的学习年份
	 * dateStr:yyyy-MM
	 * */
	List<String> getYearByUserId(String userId);
	
	/**
	 * 查询章节测试题
	 * */
	List<Map> selectVidoeTestAll(Map<String,Object> map);
	/**
	 * 章节测试题选项批量新增
	 * */
	void insertUnitTest_Choose(List<UnitTest_Choose> list);
	
	/**
	 * 章节测试题选项批量修改
	 * */
	void updateUnitTest_Choose(List<UnitTest_Choose> list);
	
	/**
	 * 章节测试题选项批量删除
	 * */
	void delUnitTest_Choose(String[] list);
	
	/**
	 * 学生测验分数新增
	 * */
	void insertUserScore(UserScore us);
	/**
	 * 学生测验分数修改
	 * */
	void updateUserScore(UserScore us);
	
	/**
	 * 学生测验错误题批量新增
	 * */
	void insertErrorExam(List<ErrorExam> list);
	
	/**
	 * 章节测试题新增
	 * */
	void insertUnitTest(UnitTest u);

	/**
	 * 章节测试题修改
	 * */
	void updateUnitTest(UnitTest u);
	/**
	 * 章节测试题删除
	 * */
	void delUnitTest(String id);
	
	/**
	 * 查询单个章节测试题和选项
	 * */
	List<Map> selectVidoeTestByUtid(String utid);
	/**
	 * 查询单个章节测试题总题数和总分数
	 * */
    List<Map> getTotalUnitTests(String vid,int utype);
    
    /**
	 * 学生简答题得分批量修改
	 * */
	void updateErrorExam(List<ErrorExam> list);
	
	/**
	 * 条件查询试题
	 * @param map集合
	 * */
	List<Map> searchUnitTestList(Map<String,Object> map)throws Exception;
	int searchUnitTestCount(Map<String,Object> map)throws Exception;
	
	 /**
	 * 学生简答题得分详情
	 * */
	List<Map> getJDTScoresDetail(String usid);
	//查询所有vip权限菜单
	List<RightMenu> selectRightMenu(String checkVal);
	void updatePwdByPhone(String phnone,String pwd);//修改密码
	void updateYQCodeByUserId(String uid,String yqcode,String yqCodeUrl);//修改用户邀请码
	User getUserByYQCode(String yqcode);//判断邀请码是否重复
}
