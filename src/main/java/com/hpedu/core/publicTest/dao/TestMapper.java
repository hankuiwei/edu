package com.hpedu.core.publicTest.dao;

import java.util.Map;

import com.hpedu.core.publicTest.pojo.Test;
import com.hpedu.util.mybatis.Page;

public interface TestMapper {
	/**
	 * 添加测试题
	 * @param test
	 */
	void insertTest(Test test);
	/**
	 * 查询 测试题- 分页
	 * @param map
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	Page<Test> getTest_Page(Map<String, String> map, int pageNo, int pageSize);
	
	/**
	 * 删除单个测试题
	 * @param id
	 */
	void deleteOntTest(String id);
	/**
	 * 根据id获得一条测试数据
	 * @param id
	 * @return
	 */
	Test getOneTest(String id);
}
