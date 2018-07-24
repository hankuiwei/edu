package com.hpedu.core.publicTest.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hpedu.core.publicTest.dao.TestPointMapper;
import com.hpedu.core.publicTest.pojo.TestPoint;
import com.hpedu.core.publicTest.service.TestPointService;
import com.hpedu.util.mybatis.MyBatisBase;
import com.hpedu.util.mybatis.Page;
@Service
public class TestPointServiceImpl extends MyBatisBase implements TestPointService{

	@Autowired
	private TestPointMapper tpMapper ;
	
	@Override
	public void insertTestPoint(Map<String, String> map) throws Exception {
		tpMapper.insertTestPoint(map);
	}

	
	@Override
	public  Page<TestPoint> getTestPoint(Map<String, String> map,int pageNo,int pageSize) throws Exception {
		Page<TestPoint> page = this.queryPage("com.hpedu.core.publicTest.dao.TestPointMapper.selectTestPoint",
				 "com.hpedu.core.publicTest.dao.TestPointMapper.TestPointCount", map,  pageNo, pageSize);
		return page;
	}


	@Override
	public TestPoint getOneTestPoint(String id) {
		return tpMapper.getOneTestPoint(id);
	}


	@Override
	public void updateTestPoint(TestPoint tp) {
		tpMapper.updateTestPoint(tp);
	}


	@Override
	public void deleteOneTestPoint(String id) {
		tpMapper.deleteOneTestPoint(id);
	}


	@Override
	public List<String> getAllGrade() {
		return tpMapper.getAllGrade();
	}


	@Override
	public List<Map<String, String>> getTestPointByGrade(String grade) {
		List<Map<String, String>> list = tpMapper.getTestPointByGrade(grade);
		return list;
	}

	
}
