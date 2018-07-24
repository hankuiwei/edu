package com.hpedu.core.publicTest.dao;

import java.util.List;

import com.hpedu.core.publicTest.pojo.TestOption;

public interface TestOptionMapper {
	

	void insertTestOption(List<TestOption> optionList);

	void deleteOptionByTestId(String id);
}
