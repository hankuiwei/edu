package com.hpedu.core.publicTest.dao;

import java.util.List;
import java.util.Map;

import com.hpedu.core.publicTest.pojo.TestPoint;

public interface TestPointMapper {
	
	/**
	 * 插入 知识点 
	 * */
	void insertTestPoint(Map<String,String> map)throws Exception;
	
	List<TestPoint> selectTestPoint(Map<String,String> map);

	TestPoint getOneTestPoint(String id);

	void updateTestPoint(TestPoint tp);

	void deleteOneTestPoint(String id);

	List<String> getAllGrade();

	List<Map<String, String>> getTestPointByGrade(String grade);
}
