package com.hpedu.core.publicTest.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hpedu.core.publicTest.dao.TestMapper;
import com.hpedu.core.publicTest.dao.TestOptionMapper;
import com.hpedu.core.publicTest.pojo.Test;
import com.hpedu.core.publicTest.pojo.TestOption;
import com.hpedu.core.publicTest.service.TestService;
import com.hpedu.util.UUIDUtil;
import com.hpedu.util.mybatis.MyBatisBase;
import com.hpedu.util.mybatis.Page;
@Service
public class TestServiceImpl extends MyBatisBase implements TestService{

	@Autowired
	private TestMapper testMapper ;
	@Autowired
	private TestOptionMapper testOptionMapper ;

	@Override
	public void insertTest(Test test, String[] option, String[] optionContent) throws Exception {
		List<TestOption> optionList = new ArrayList<TestOption>();
		testMapper.insertTest(test);// 新增测验题
		
		if (test.getTestType() == 0) {
			if (optionContent != null) {
				for (int i = 0; i < option.length; i++) {
					String option_content = optionContent[i];
					String option_ = option[i];
					TestOption testOption = new TestOption();
					testOption.setId(UUIDUtil.getUUID());
					testOption.setTestId(test.getId());
					testOption.setOptionContent(option_content);
					testOption.setOption(option_);
					
					optionList.add(testOption);
				}
				// 新增测验题选项
				testOptionMapper.insertTestOption(optionList);
			}
		}
		
	}

	@Override
	public Page<Test> getTest_Page(Map<String, String> map, int pageNo, int pageSize) {
		return this.queryPage("com.hpedu.core.publicTest.dao.TestMapper.getTest_Page",
				 "com.hpedu.core.publicTest.dao.TestMapper.getTest_Page_count", map,  pageNo, pageSize);
	}

	@Override
	public void deleteOneTest(String id,Integer testType) {
		//删除测试题 表数据
		testMapper.deleteOntTest(id);
		//如果是选择题, 删除相应的选项.
		if(testType==0){// 0是选择
			testOptionMapper.deleteOptionByTestId(id);
		}
	}

	@Override
	public Test getOneTest(String id) {
		return testMapper.getOneTest(id);
	}

	@Override
	public void updateTest(Test test) {
		/**
		 * 更新测试题,
		 * 1.知识点
		 * 2.测试题实体更新,
		 * 3.选项更新? --> 1.禁止选择变简答 2.单选变多选, 3.选项内容变换?
		 * 
		 * 另一种思路, 直接删除原有的, 从新添加一个?
		 */
		
	}
	
	
	
}
