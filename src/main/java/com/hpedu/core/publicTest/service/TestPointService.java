package com.hpedu.core.publicTest.service;

import java.util.List;
import java.util.Map;

import com.hpedu.core.publicTest.pojo.TestPoint;
import com.hpedu.util.mybatis.Page;

/**
 * 测试知识点 业务层.
 * @author Administrator
 *
 */

public interface TestPointService {
	
	/**
	 * 添加 测试知识点
	 * @param map
	 * @return
	 * @throws Exception
	 */
	void insertTestPoint(Map<String,String> map) throws Exception;

	/**
	 * 展示测试知识点
	 * @param object
	 */
	Page<TestPoint> getTestPoint(Map<String, String> map,int pageNo,int pageSize)throws Exception ;

	/**
	 * 获取某一个
	 * @param id
	 * @return
	 */
	TestPoint getOneTestPoint(String id);

	/**
	 * 更新
	 * @param tp
	 */
	void updateTestPoint(TestPoint tp);

	void deleteOneTestPoint(String id);

	List<String> getAllGrade();

	/**
	 * 根绝年级 获取 对应的知识点
	 * @param grade
	 * @return
	 */
	List<Map<String,String>> getTestPointByGrade(String grade);
}
