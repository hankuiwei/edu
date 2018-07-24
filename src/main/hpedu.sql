/*
Navicat MySQL Data Transfer

Source Server         : kylife
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : hpedu

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2017-04-21 21:02:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner` (
  `bid` varchar(200) NOT NULL COMMENT '主键',
  `title` varchar(60) DEFAULT NULL COMMENT '标题',
  `content` varchar(120) DEFAULT NULL COMMENT '图片说明',
  `imgUrl` varchar(200) DEFAULT NULL COMMENT '图片路径',
  `sort` varchar(30) DEFAULT NULL COMMENT '顺序-时间戳',
  PRIMARY KEY (`bid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES ('24afaf0698a743efb808f1f1f0195fd6', '9999', '99999', '/fmImg/584aa5c8be644a549c938e8dd30909a1.jpg', '1492655859262');
INSERT INTO `banner` VALUES ('3955ea2659fc4d48bbc306b7d81f9626', '55577777', '水电费水电费水电费9999999', '/fmImg/064626fcff9e49599e2ac9ea598d6d56.jpg', '1492655831593');
INSERT INTO `banner` VALUES ('796bbe1c89d1471798fb7c7ccc9e929a', '7777', '778889', '/fmImg/ba820d11bac046a889c79ab70030817a.jpg', '1492655847550');
INSERT INTO `banner` VALUES ('9cb513d18f0845e28f38711dbe531d6f', '86666', '阿斯顿发生的典范', '/fmImg/a3be761ae53643df8ea09b37ac9febac.jpg', '1492654823210');

-- ----------------------------
-- Table structure for contestvideo
-- ----------------------------
DROP TABLE IF EXISTS `contestvideo`;
CREATE TABLE `contestvideo` (
  `cid` varchar(200) NOT NULL COMMENT '主键',
  `cname` varchar(200) NOT NULL COMMENT '视频名称',
  `cisVip` varchar(200) NOT NULL COMMENT '是否是Vip视频',
  `cmoney` int(200) DEFAULT NULL COMMENT '钱',
  `cplayNo` int(200) NOT NULL DEFAULT '0' COMMENT '播放次数',
  `competitionName` varchar(200) NOT NULL COMMENT '竞赛名称',
  `cclass` varchar(200) NOT NULL COMMENT '班级',
  `cclassify` varchar(200) NOT NULL COMMENT '班级下分类',
  `cintro` varchar(2000) NOT NULL COMMENT '简介',
  `cvideoUrl` varchar(2000) NOT NULL COMMENT '路径',
  `ccreatTime` date NOT NULL COMMENT '创建时间',
  `cvimg` varchar(2000) DEFAULT NULL,
  `cvpdf` varchar(2000) DEFAULT NULL,
  `isMore` int(11) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of contestvideo
-- ----------------------------
INSERT INTO `contestvideo` VALUES ('3e547b627c73470b98e6659292bffd3f', '888', '0', '1', '20', '迎春杯', '三年级', '专题课', '77', '/cvideo/c50ea94d5d5d459cad175f9cbef6b5c2.mp4', '2017-04-19', '/fmImg/c50ea94d5d5d459cad175f9cbef6b5c2.jpg', '/pdf/mybatis.pdf', null);

-- ----------------------------
-- Table structure for evaluation
-- ----------------------------
DROP TABLE IF EXISTS `evaluation`;
CREATE TABLE `evaluation` (
  `eid` varchar(200) NOT NULL,
  `uname` varchar(200) NOT NULL,
  `evaluation` varchar(2000) NOT NULL COMMENT '评价内容',
  `ecreatTime` date NOT NULL,
  `vid` varchar(200) NOT NULL COMMENT '视频ID',
  `vclassify` varchar(200) NOT NULL COMMENT '视频所属分类 常规 竞赛',
  `eisShow` varchar(20) NOT NULL COMMENT '是否显示 0 不显示 1显示',
  PRIMARY KEY (`eid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of evaluation
-- ----------------------------

-- ----------------------------
-- Table structure for exam
-- ----------------------------
DROP TABLE IF EXISTS `exam`;
CREATE TABLE `exam` (
  `etid` varchar(200) NOT NULL COMMENT '主键',
  `etname` varchar(200) NOT NULL COMMENT '测试名称',
  `etsubject` varchar(200) NOT NULL COMMENT '学科',
  `etclass` varchar(200) NOT NULL COMMENT '年级',
  `etclassify` varchar(200) NOT NULL COMMENT '年级下分类（例：真题）',
  `etimg` varchar(2000) NOT NULL COMMENT '测验图片路径',
  `etcreatTime` date NOT NULL COMMENT '创建时间',
  `etestNo` varchar(2000) NOT NULL COMMENT '测验人数',
  `answer` varchar(2000) NOT NULL COMMENT '答案',
  PRIMARY KEY (`etid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of exam
-- ----------------------------
INSERT INTO `exam` VALUES ('6f32907e40754b6a821edc9c581f16dd', '9999', '语文测验', '四年级', '上学期', '/examImg/bd4910bc5a77412c95accccf32097b6a.jpg', '2017-04-20', '10', '9999同方股份更大幅度');
INSERT INTO `exam` VALUES ('82a8cd1ff994448382954fc575296ced', '888', '数学测验', '三年级', '上学期', '/examImg/099e2681570b4d83835d9496f60d401e.jpg', '2017-04-20', '10', '888');
INSERT INTO `exam` VALUES ('c1bf42f86eec4f9ca5b1fa6c38175972', '8888', '英语测验', '六年级', '下学期', '/examImg/2bd6918363b84d609bafcd158fd1dd88.jpg', '2017-04-20', '10', '88883333');
INSERT INTO `exam` VALUES ('e0a8abef029842789a74f82482622ef5', '77777', '语文测验', '三年级', '下学期', '/examImg/0782593f335744c09bd2d93a15b0a891.jpg', '2017-04-20', '10', '77777777');
INSERT INTO `exam` VALUES ('e479788170324dea9e8115705c7cd38f', '8888', '英语测验', '三年级', '上学期', '/examImg/d00711c502274b55b82d86c2fa0da361.jpg', '2017-04-20', '10', '预约');

-- ----------------------------
-- Table structure for generalvideo
-- ----------------------------
DROP TABLE IF EXISTS `generalvideo`;
CREATE TABLE `generalvideo` (
  `gid` varchar(200) NOT NULL COMMENT '主键',
  `gname` varchar(200) NOT NULL COMMENT '视频名称',
  `gisVip` varchar(20) NOT NULL COMMENT '是否VIP 0 是 1否',
  `gmoney` int(200) DEFAULT NULL COMMENT '钱',
  `gplayNo` int(200) NOT NULL DEFAULT '0' COMMENT '播放次数',
  `gsbuject` varchar(200) NOT NULL COMMENT '学科 语数外',
  `gclass` varchar(200) NOT NULL COMMENT '年级',
  `gclassify` varchar(200) NOT NULL COMMENT '年级下的分类（例：五年级:阅读）',
  `gintro` varchar(2000) DEFAULT NULL COMMENT '视频简介',
  `gvideoUrl` varchar(2000) NOT NULL COMMENT '路径',
  `gcreatTime` date NOT NULL COMMENT '创建时间',
  `gvimg` varchar(2000) DEFAULT NULL,
  `gvpdf` varchar(2000) DEFAULT NULL,
  `isMore` int(11) DEFAULT NULL,
  `gclassify2` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`gid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of generalvideo
-- ----------------------------
INSERT INTO `generalvideo` VALUES ('3d94f47bf8ed4c76a2880bc942cbc9be', '四年级暑假2', '0', '1', '10', '数学', '四年级', '同步班', '111', '', '2017-04-21', '/fmImg/1485babfa6e344a5b666309a1bf2f877.jpg', '/pdf/mybatis.pdf', '1', '暑假班');
INSERT INTO `generalvideo` VALUES ('8ac37531c9884840a450384fcb559e5d', '是否丧尸', '0', '11', '10', '数学', '三年级', '同步班', '12', '', '2017-04-21', '/fmImg/dd25b5e0b80c43099201ef6568216f77.jpg', '/pdf/mybatis.pdf', '1', '春季班');
INSERT INTO `generalvideo` VALUES ('a1c90053a29a42d4bbb67551805ff29e', '寒假班四年级', '0', '11', '10', '数学', '四年级', '同步班', '33', '', '2017-04-21', '/fmImg/60c6363619fa442580afccb61e728b3b.jpg', '/pdf/mybatis.pdf', '1', '寒假班');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `oid` varchar(200) NOT NULL COMMENT '主键',
  `omoney` varchar(200) NOT NULL COMMENT '支付金额',
  `ocreatTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `opayTime` datetime DEFAULT NULL COMMENT '支付时间',
  `oisPay` varchar(20) NOT NULL COMMENT '是否支付',
  `orderNo` varchar(200) NOT NULL COMMENT '订单编号',
  `uid` varchar(200) NOT NULL COMMENT '购买者',
  `vid` varchar(200) NOT NULL COMMENT '购买的视频',
  `vclassify` varchar(200) NOT NULL COMMENT '视频所属分类 0常规 1竞赛',
  `payStyle` varchar(200) NOT NULL COMMENT '支付方式 微信 支付宝',
  PRIMARY KEY (`oid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('06e008ddda84427c973e77c051f84f44', '1', '2017-04-21 09:05:17', null, '0', '1704210000000000', '54f137ce5efe4df98fe70a3033225505', '7e16819d0bc74be48bbaf3006e6651dc', '0', '微信');
INSERT INTO `orders` VALUES ('333', '1', '2017-04-21 09:08:10', '2017-04-21 09:06:39', '0', '12113', '54f137ce5efe4df98fe70a3033225505', '7e16819d0bc74be48bbaf3006e6651dc', '0', '微信');
INSERT INTO `orders` VALUES ('49df063be7db4b09a9b7bfd581f31e7f', '1', '2017-04-10 13:43:37', '2017-04-10 13:43:37', '1', '1704100000000000', '16aa1d0d91424f2dbd8ba5a85aa4ee84', '82252be50fe94756b7bc4d50885b88e3', '0', '微信');
INSERT INTO `orders` VALUES ('5875169cc7084cbbb89ae20468011ae8', '1', '2017-04-19 11:56:17', null, '0', '1704190000000002', 'd8c3a37e15564d93bb8a2720cde8019e', '82252be50fe94756b7bc4d50885b88e3', '0', '微信');
INSERT INTO `orders` VALUES ('81d329176c354033b0dd4b1fc83d4741', '1', '2017-04-19 11:49:29', null, '0', '1704190000000000', 'd8c3a37e15564d93bb8a2720cde8019e', 'f8673d20e11549d290ef3a21836edb8f', '0', '微信');
INSERT INTO `orders` VALUES ('9609218662d14553bc26981e89366ca8', '1', '2017-04-19 11:53:54', null, '0', '1704190000000001', 'd8c3a37e15564d93bb8a2720cde8019e', '3e547b627c73470b98e6659292bffd3f', '1', '微信');
INSERT INTO `orders` VALUES ('ac1aaceb369c4fb590cf96bdee0f5055', '1', '2017-04-21 19:38:14', null, '1', '1704210000000001', '54f137ce5efe4df98fe70a3033225505', '3d94f47bf8ed4c76a2880bc942cbc9be', '0', '微信');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `tid` varchar(200) NOT NULL COMMENT '主键',
  `tname` varchar(200) NOT NULL COMMENT '教师名称',
  `tintro` varchar(2000) NOT NULL COMMENT '教师称谓',
  `timgUrl` varchar(200) DEFAULT NULL COMMENT '头像路径',
  `title` varchar(200) NOT NULL COMMENT '简介',
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of teacher
-- ----------------------------

-- ----------------------------
-- Table structure for trophy
-- ----------------------------
DROP TABLE IF EXISTS `trophy`;
CREATE TABLE `trophy` (
  `pid` varchar(200) NOT NULL COMMENT '主键',
  `pname` varchar(200) DEFAULT NULL COMMENT '奖杯名称',
  `pintro` varchar(2000) DEFAULT NULL COMMENT '简介',
  `pimgUrl` varchar(200) NOT NULL COMMENT '图片路径',
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of trophy
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` varchar(200) NOT NULL COMMENT '主键',
  `userName` varchar(200) DEFAULT NULL COMMENT '用户名',
  `passWord` varchar(200) DEFAULT NULL COMMENT '密码',
  `phoneNo` varchar(200) DEFAULT NULL COMMENT '手机号',
  `isVip` varchar(20) DEFAULT NULL COMMENT '是否是VIP 0 不是 1 是',
  `email` varchar(200) DEFAULT NULL COMMENT '邮箱',
  `headImgUrl` varchar(200) DEFAULT NULL COMMENT '头像',
  `regTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '注册时间',
  `lastLoginTime` datetime DEFAULT NULL COMMENT '最后登录时间',
  `type` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `freeType` varchar(20) DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('54f137ce5efe4df98fe70a3033225505', 'laijia', '4297F44B13955235245B2497399D7A93', '18310109753', '0', '333@11.com', '/userHeadImg/ac13933cdf784049b23ede4171f690cc.jpg', '2017-04-21 19:29:33', null, '1', '1', '一年', '2018-04-18 00:00:00');
INSERT INTO `user` VALUES ('99585668850f48f29ae84cb7b090976f', '2222', '4297F44B13955235245B2497399D7A93', '18310109754', '1', '22@33.com', '/userHeadImg/c7332ee2c4084ad79c49df1fa0f59f01.jpg', '2017-04-19 17:28:58', null, '1', '0', '一年', '2018-04-19 00:00:00');
INSERT INTO `user` VALUES ('aacb1c6927cf882206e35b3df67eb923', 'hpeduadmin', 'B7B5B377259DAA18D71BE11DC3E4C75E', '101010101', '3', 'hp123@163.com', '/admin/1.jpg', '2017-04-17 17:39:22', '2017-01-19 16:06:34', null, null, null, null);
INSERT INTO `user` VALUES ('d8c3a37e15564d93bb8a2720cde8019e', '2226666', '4297F44B13955235245B2497399D7A93', '18310109752', '1', '222@aa.com', '/userHeadImg/601462dab73649688ee0a87fa1c4427e.jpg', '2017-04-19 16:29:51', null, '1', '1', '半年', '2017-10-18 00:00:00');

-- ----------------------------
-- Table structure for video_child
-- ----------------------------
DROP TABLE IF EXISTS `video_child`;
CREATE TABLE `video_child` (
  `vcid` varchar(200) NOT NULL COMMENT '主键',
  `pid` varchar(200) NOT NULL COMMENT '父关联视频id',
  `vcname` varchar(200) NOT NULL COMMENT '视频名称',
  `vcideoUrl` varchar(2000) NOT NULL COMMENT '路径',
  `vclassify` varchar(200) NOT NULL COMMENT '视频子分类（如:春季班/暑假班/秋季班/寒假班）',
  `vctype` int(11) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  PRIMARY KEY (`vcid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of video_child
-- ----------------------------
INSERT INTO `video_child` VALUES ('594cda5e59d4452aa5c1eb1d071f024d', 'a1c90053a29a42d4bbb67551805ff29e', '第一集', '/video/594cda5e59d4452aa5c1eb1d071f024d.mp4', '寒假班', '0', '2017-04-21 19:41:11');
INSERT INTO `video_child` VALUES ('6e9fa2aaf4304efeb55aab0e4b583a8f', 'a1c90053a29a42d4bbb67551805ff29e', '第二集', '/video/6e9fa2aaf4304efeb55aab0e4b583a8f.mp4', '寒假班', '0', '2017-04-21 19:41:11');
INSERT INTO `video_child` VALUES ('6f449128f2a34c27915b7fd9a83b0c18', '3d94f47bf8ed4c76a2880bc942cbc9be', '第三集', '/video/6f449128f2a34c27915b7fd9a83b0c18.mp4', '暑假班', '0', '2017-04-21 19:21:04');
INSERT INTO `video_child` VALUES ('a867a0bc6bd044c58f30cab6f7d67192', '3d94f47bf8ed4c76a2880bc942cbc9be', '第一集', '/video/a867a0bc6bd044c58f30cab6f7d67192.mp4', '暑假班', '0', '2017-04-21 19:21:00');
INSERT INTO `video_child` VALUES ('e956cb7c878b485dbf17ee194ab79373', '3d94f47bf8ed4c76a2880bc942cbc9be', '第四集', '/video/e956cb7c878b485dbf17ee194ab79373.mp4', '暑假班', '0', '2017-04-21 19:21:22');


-- ----------------------------
-- Table structure for video_pdf
-- ----------------------------
DROP TABLE IF EXISTS `video_pdf`;
CREATE TABLE `video_pdf` (
  `pdfid` varchar(200) NOT NULL COMMENT '主键',
  `vid` varchar(200)  COMMENT '关联视频id',
  `pdfUrl` varchar(2000)  COMMENT 'pdf路径',
  `vctype` int(11) COMMENT '视频类型：0：常规；1：竞赛',
  `sort` bigint COMMENT '上传顺序',
  PRIMARY KEY (`pdfid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- ----------------------------
-- Table structure for exam_img
-- ----------------------------
DROP TABLE IF EXISTS `exam_img`;
CREATE TABLE `exam_img` (
  `id` varchar(200) NOT NULL COMMENT '主键',
  `exid` varchar(200)  COMMENT '关联测验题id',
  `examUrl` varchar(2000)  COMMENT '测验题路径',
  `answerUrl` varchar(2000)  COMMENT '答案路径',
  `type` int(11) COMMENT '类型：0：题；1：答案',
  `sort` bigint COMMENT '上传顺序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for stu_img
-- ----------------------------
DROP TABLE IF EXISTS `stu_img`;
CREATE TABLE `stu_img` (
  `stid` varchar(200) NOT NULL COMMENT '主键',
  `tpid` varchar(200)  COMMENT '关联学生id',
  `stUrl` varchar(2000)  COMMENT '学生图片路径',
  `sort` bigint COMMENT '上传顺序',
  PRIMARY KEY (`stid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for userLevel
-- ----------------------------
DROP TABLE IF EXISTS `userLevel`;
CREATE TABLE `userLevel` (
  `ulid` varchar(200) NOT NULL COMMENT '主键',
  `level` int(11)  COMMENT '等级',
  `des` varchar(200)  COMMENT '等级描述',
  `minNum` bigint COMMENT '上限',
  `maxNum` bigint COMMENT '下限',
  PRIMARY KEY (`ulid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for userLearn
-- ----------------------------
DROP TABLE IF EXISTS `userLearn`;
CREATE TABLE `userLearn` (
  `ulid` varchar(200) NOT NULL COMMENT '主键',
  `userid` varchar(200)  COMMENT '用户id',
  `vid` varchar(200)  COMMENT '视频id',
  `vctype` int(11)  COMMENT '视频类型:0:常规；1：竞赛',
  `learnTime` bigint COMMENT '学习时长',
  `learnDate` date COMMENT '学习日期',
  PRIMARY KEY (`ulid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for article_img
-- ----------------------------
DROP TABLE IF EXISTS `article_img`;
CREATE TABLE `article_img` (
  `atid` varchar(200) NOT NULL COMMENT '主键',
  `bid` varchar(200)  COMMENT '关联轮播图id',
  `atUrl` varchar(2000)  COMMENT '学生图片路径',
  `createTime` datetime COMMENT '上传时间',
  PRIMARY KEY (`atid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




-- ----------------------------
-- Table structure for unitTest
-- ----------------------------
DROP TABLE IF EXISTS `unitTest`;
CREATE TABLE `unitTest` (
  `utid` varchar(200) NOT NULL COMMENT '主键',
  `vid` varchar(200)  COMMENT '关联视频id',
  `utype` tinyint(1)  COMMENT '视频类型：0：单个常规；1：单个竞赛；2：多集常规；3：多集竞赛',
  `ucreateTime` datetime COMMENT '创建时间',
  `score` int(11) COMMENT '每题分数',
  `ucontent` text COMMENT '题目内容',
  `answer` varchar(200) COMMENT '题目答案',
  `utimg` varchar(200) COMMENT '题目图片',
  `ponit` text COMMENT '考点',
  `detail` text COMMENT '详解',
  PRIMARY KEY (`utid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for unitTest_Choose
-- ----------------------------
DROP TABLE IF EXISTS `unitTest_Choose`;
CREATE TABLE `unitTest_Choose` (
  `csid` varchar(200) NOT NULL COMMENT '主键',
  `utid` varchar(200)  COMMENT '关联单元测试题id',
  `tcontent` text COMMENT '选择题内容',
  `sort` bigint COMMENT '顺序',
  `tanswer` varchar(200) COMMENT '选项的值',
  PRIMARY KEY (`csid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for userScore
-- ----------------------------
DROP TABLE IF EXISTS `userScore`;
CREATE TABLE `userScore` (
  `usid` varchar(200) NOT NULL COMMENT '主键',
  `uid` varchar(200)  COMMENT '关联用户id',
  `vid` varchar(200)  COMMENT '关联视频id',
  `utype` tinyint(1)  COMMENT '视频类型：0：单个常规；1：单个竞赛；2：多集常规；3：多集竞赛；4：小测验',
  `ucreateTime` datetime COMMENT '创建时间',
  `score` int(11) COMMENT '测验分数',
  `rightNum` int(11) COMMENT '正确个数',
  `errorNum` int(11) COMMENT '错误个数',
  `totalScores` varchar(200)  COMMENT '题目总分',
  `totalNums` varchar(200)  COMMENT '题目总数',
  `JDTscore` int(11) COMMENT '简答题得分',
  `gotScore` int(11) COMMENT '总得分',
  `isHasJDT` int(11) COMMENT '是否含有简答题（0：没有，1：只有简答题；2：简答题和选择题）',
  PRIMARY KEY (`usid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for errorExam
-- ----------------------------
DROP TABLE IF EXISTS `errorExam`;
CREATE TABLE `errorExam` (
  `eeid` varchar(200) NOT NULL COMMENT '主键',
  `usid` varchar(200)  COMMENT '关联分数记录id[userScore]',
  `utid` varchar(200)  COMMENT '测试题id[unitTest]',
  `sort` bigint COMMENT '顺序',
  `stuAnswer` text COMMENT '学生答案',
  `stuGotScore` int(11) COMMENT '学生单个题目得分',
  PRIMARY KEY (`eeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for `rightmenu`
-- ----------------------------
DROP TABLE IF EXISTS `rightmenu`;
CREATE TABLE `rightmenu` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `pId` bigint(20) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `open` tinyint(1) DEFAULT NULL,
  `nocheck` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- --提取字符串中的数字和-、~
CREATE FUNCTION GetNum (Varstring varchar(50))
RETURNS varchar(30)
BEGIN
DECLARE v_length INT DEFAULT 0;
DECLARE v_Tmp varchar(50) default '';
set v_length=CHAR_LENGTH(Varstring);
WHILE v_length > 0 DO
IF (ASCII(mid(Varstring,v_length,1))>47 and ASCII(mid(Varstring,v_length,1))<58 )or ASCII(mid(Varstring,v_length,1))=45 or ASCII(mid(Varstring,v_length,1))=126 THEN
set v_Tmp=concat(v_Tmp,mid(Varstring,v_length,1));
END IF;
SET v_length = v_length - 1;
END WHILE;
RETURN REVERSE(v_Tmp);
END;




