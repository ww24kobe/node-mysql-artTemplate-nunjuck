/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50635
 Source Host           : localhost
 Source Database       : test

 Target Server Type    : MySQL
 Target Server Version : 50635
 File Encoding         : utf-8

 Date: 09/10/2018 10:45:09 AM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL DEFAULT '',
  `content` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `article`
-- ----------------------------
BEGIN;
INSERT INTO `article` VALUES ('2', '22', '2222'), ('3', '33', '3333'), ('4', '44', '4444'), ('5', '55', '55555'), ('6', '66', '66666'), ('7', '77', '77777'), ('8', '88', '8888'), ('9', 'hhhh', ' hhhhhhhhhhh'), ('10', 'fang', 'fagnfnagfnagaga');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
