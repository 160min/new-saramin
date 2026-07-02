-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema career_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema career_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `career_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `career_db` ;

-- -----------------------------------------------------
-- Table `career_db`.`job_posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `career_db`.`job_posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `company_name` VARCHAR(100) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `experience_code` TINYINT NULL DEFAULT NULL,
  `experience_min` INT NULL DEFAULT NULL,
  `experience_max` INT NULL DEFAULT NULL,
  `experience_name` VARCHAR(45) NULL DEFAULT NULL,
  `education_code` TINYINT NULL DEFAULT NULL,
  `education_name` VARCHAR(45) NULL DEFAULT NULL,
  `employment_type` VARCHAR(50) NULL DEFAULT NULL,
  `salary_type` ENUM('ANNUAL', 'HOURLY', 'PER_CASE', 'NEGOTIABLE') NULL DEFAULT NULL,
  `salary_name` VARCHAR(45) NULL DEFAULT NULL,
  `min_salary` INT NULL DEFAULT '0',
  `location` INT NULL DEFAULT NULL,
  `original_url` VARCHAR(767) NOT NULL,
  `job_position` ENUM('BACKEND', 'FRONTEND', 'DATA', 'INFRA') NULL DEFAULT NULL,
  `detail_position_name` VARCHAR(45) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `career_db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `career_db`.`user` (
  `user_no` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(45) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `pwd` VARCHAR(255) NOT NULL,
  `nickname` VARCHAR(100) NOT NULL,
  `role` ENUM('USER', 'ADMIN') NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  PRIMARY KEY (`user_no`),
  UNIQUE INDEX `user_id` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `career_db`.`bookmark`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `career_db`.`bookmark` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_no` INT NOT NULL,
  `job_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_no77_idx` (`user_no` ASC) VISIBLE,
  INDEX `job_idx` (`job_id` ASC) VISIBLE,
  CONSTRAINT `fk_bookmark_job`
    FOREIGN KEY (`job_id`)
    REFERENCES `career_db`.`job_posts` (`id`),
  CONSTRAINT `fk_bookmark_user_no`
    FOREIGN KEY (`user_no`)
    REFERENCES `career_db`.`user` (`user_no`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `career_db`.`cover_letters`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `career_db`.`cover_letters` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_no` INT NOT NULL,
  `job_id` INT NULL DEFAULT NULL,
  `title` VARCHAR(70) NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `user_no_idx` (`user_no` ASC) VISIBLE,
  INDEX `job_id_idx` (`job_id` ASC) VISIBLE,
  CONSTRAINT `fk_cover_letters_job`
    FOREIGN KEY (`job_id`)
    REFERENCES `career_db`.`job_posts` (`id`),
  CONSTRAINT `fk_cover_letters_user`
    FOREIGN KEY (`user_no`)
    REFERENCES `career_db`.`user` (`user_no`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `career_db`.`cover_letter_versions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `career_db`.`cover_letter_versions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cover_letter_id` INT NOT NULL,
  `version_number` INT NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `cover_letter_id_idx` (`cover_letter_id` ASC) VISIBLE,
  CONSTRAINT `fk_versions_cover_letter`
    FOREIGN KEY (`cover_letter_id`)
    REFERENCES `career_db`.`cover_letters` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `career_db`.`cover_letter_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `career_db`.`cover_letter_items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `version_id` INT NOT NULL,
  `question` VARCHAR(500) NOT NULL,
  `answer` TEXT NOT NULL,
  `item_order` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `version_id_idx` (`version_id` ASC) VISIBLE,
  CONSTRAINT `fk_cover_letter_items_version`
    FOREIGN KEY (`version_id`)
    REFERENCES `career_db`.`cover_letter_versions` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `career_db`.`user_subscriptions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `career_db`.`user_subscriptions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_no` INT NOT NULL,
  `target_position` ENUM('BACKEND', 'FRONTEND', 'DATA', 'INFRA') NULL DEFAULT NULL,
  `max_experience_years` TINYINT NULL DEFAULT NULL,
  `education_code` TINYINT NULL DEFAULT NULL,
  `target_skills` VARCHAR(500) NULL DEFAULT NULL,
  `min_salary` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_jobs_user_idx` (`user_no` ASC) VISIBLE,
  CONSTRAINT `fk_user_subscriptions_user`
    FOREIGN KEY (`user_no`)
    REFERENCES `career_db`.`user` (`user_no`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
