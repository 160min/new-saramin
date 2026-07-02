-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: career_db
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookmark`
--

DROP TABLE IF EXISTS `bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_no` int NOT NULL,
  `job_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_no77_idx` (`user_no`),
  KEY `job_idx` (`job_id`),
  CONSTRAINT `fk_bookmark_job` FOREIGN KEY (`job_id`) REFERENCES `job_posts` (`id`),
  CONSTRAINT `fk_bookmark_user_no` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cover_letter_items`
--

DROP TABLE IF EXISTS `cover_letter_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cover_letter_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `version_id` int NOT NULL,
  `question` varchar(500) NOT NULL,
  `answer` text NOT NULL,
  `item_order` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `version_id_idx` (`version_id`),
  CONSTRAINT `fk_cover_letter_items_version` FOREIGN KEY (`version_id`) REFERENCES `cover_letter_versions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cover_letter_versions`
--

DROP TABLE IF EXISTS `cover_letter_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cover_letter_versions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cover_letter_id` int NOT NULL,
  `version_number` int NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cover_letter_id_idx` (`cover_letter_id`),
  CONSTRAINT `fk_versions_cover_letter` FOREIGN KEY (`cover_letter_id`) REFERENCES `cover_letters` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cover_letters`
--

DROP TABLE IF EXISTS `cover_letters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cover_letters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_no` int NOT NULL,
  `job_id` int DEFAULT NULL,
  `title` varchar(70) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_no_idx` (`user_no`),
  KEY `job_id_idx` (`job_id`),
  CONSTRAINT `fk_cover_letters_job` FOREIGN KEY (`job_id`) REFERENCES `job_posts` (`id`),
  CONSTRAINT `fk_cover_letters_user` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `job_posts`
--

DROP TABLE IF EXISTS `job_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `experience_code` tinyint DEFAULT NULL,
  `experience_min` int DEFAULT NULL,
  `experience_max` int DEFAULT NULL,
  `experience_name` varchar(45) DEFAULT NULL,
  `education_code` tinyint DEFAULT NULL,
  `education_name` varchar(45) DEFAULT NULL,
  `employment_type` varchar(50) DEFAULT NULL,
  `salary_type` enum('ANNUAL','HOURLY','PER_CASE','NEGOTIABLE') DEFAULT NULL,
  `salary_name` varchar(45) DEFAULT NULL,
  `min_salary` int DEFAULT '0',
  `location` int DEFAULT NULL,
  `original_url` varchar(767) NOT NULL,
  `job_position` enum('BACKEND','FRONTEND','DATA','INFRA') DEFAULT NULL,
  `detail_position_name` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_no` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(45) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `nickname` varchar(100) NOT NULL,
  `role` enum('USER','ADMIN') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(20) NOT NULL DEFAULT 'ACTIVE',
  PRIMARY KEY (`user_no`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_subscriptions`
--

DROP TABLE IF EXISTS `user_subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_subscriptions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_no` int NOT NULL,
  `target_position` enum('BACKEND','FRONTEND','DATA','INFRA') DEFAULT NULL,
  `max_experience_years` tinyint DEFAULT NULL,
  `education_code` tinyint DEFAULT NULL,
  `target_skills` varchar(500) DEFAULT NULL,
  `min_salary` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_jobs_user_idx` (`user_no`),
  CONSTRAINT `fk_user_subscriptions_user` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-01 17:09:25
