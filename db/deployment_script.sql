-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema walletwatch
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema walletwatch
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `walletwatch` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `walletwatch` ;

-- -----------------------------------------------------
-- Table `walletwatch`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `walletwatch`.`user` (
  `userid` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL DEFAULT NULL,
  `last_name` VARCHAR(45) NULL DEFAULT NULL,
  `phone` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `user_name` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(2000) NULL DEFAULT NULL,
  `reset_token` VARCHAR(2000) NULL DEFAULT NULL,
  `is_exists` INT NULL DEFAULT '1',
  PRIMARY KEY (`userid`))
ENGINE = InnoDB
AUTO_INCREMENT = 1000
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `walletwatch`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `walletwatch`.`category` (
  `category_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`category_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `walletwatch`.`reminder_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `walletwatch`.`reminder_type` (
  `reminder_type_id` INT NOT NULL,
  `type` VARCHAR(45) NULL,
  PRIMARY KEY (`reminder_type_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `walletwatch`.`transaction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `walletwatch`.`transaction` (
  `userid` INT NOT NULL,
  `transaction_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NULL,
  `description` VARCHAR(400) NULL,
  `category_id` INT NOT NULL,
  `reminder_type_id` INT NOT NULL,
  `enable_reminder` INT NULL,
  `payment_date` DATE NULL,
  `price` DECIMAL NULL,
  `invoice_url` VARCHAR(1000) NULL,
  INDEX `fk_transaction_user_idx` (`userid` ASC) VISIBLE,
  PRIMARY KEY (`transaction_id`, `userid`),
  INDEX `fk_transaction_category1_idx` (`category_id` ASC) VISIBLE,
  INDEX `fk_transaction_reminder_type1_idx` (`reminder_type_id` ASC) VISIBLE,
  CONSTRAINT `fk_transaction_user`
    FOREIGN KEY (`userid`)
    REFERENCES `walletwatch`.`user` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_transaction_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `walletwatch`.`category` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_transaction_reminder_type1`
    FOREIGN KEY (`reminder_type_id`)
    REFERENCES `walletwatch`.`reminder_type` (`reminder_type_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2000;


-- -----------------------------------------------------
-- Table `walletwatch`.`income`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `walletwatch`.`income` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `income_name` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `value` DECIMAL NULL,
  `userid` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Income_user1_idx` (`userid` ASC) VISIBLE,
  CONSTRAINT `fk_Income_user1`
    FOREIGN KEY (`userid`)
    REFERENCES `walletwatch`.`user` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1000;


-- -----------------------------------------------------
-- Table `walletwatch`.`budget`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `walletwatch`.`budget` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `is_percentage` INT NULL,
  `value` DECIMAL NULL,
  `userid` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(1000) NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Budget_user1_idx` (`userid` ASC) VISIBLE,
  INDEX `fk_budget_category1_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `fk_Budget_user1`
    FOREIGN KEY (`userid`)
    REFERENCES `walletwatch`.`user` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_budget_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `walletwatch`.`category` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1000;


-- -----------------------------------------------------
-- Table `walletwatch`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `walletwatch`.`images` (
  `imageid` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NULL,
  `url` VARCHAR(999) NULL,
  `userid` INT NOT NULL,
  `transaction_id` INT NOT NULL,
  PRIMARY KEY (`imageid`),
  INDEX `fk_Images_user1_idx` (`userid` ASC) VISIBLE,
  INDEX `fk_Images_transaction1_idx` (`transaction_id` ASC) VISIBLE,
  CONSTRAINT `fk_Images_user1`
    FOREIGN KEY (`userid`)
    REFERENCES `walletwatch`.`user` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Images_transaction1`
    FOREIGN KEY (`transaction_id`)
    REFERENCES `walletwatch`.`transaction` (`transaction_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3000;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
