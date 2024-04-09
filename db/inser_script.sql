use walletwatch;

select * from user;


select * from transaction;

insert into category (category_id, name) values (1, 'Entertainment');
insert into category (category_id, name) values (2, 'Groceries');
insert into category (category_id, name) values (3, 'Medicine');
insert into category (category_id, name) values (4, 'Bills');
insert into category (category_id, name) values (5, 'Miscellaneous');

select * from reminder_type;

insert into reminder_type (reminder_type_id, type) values (1, ' ');
insert into reminder_type (reminder_type_id, type) values (2, 'Weekly');
insert into reminder_type (reminder_type_id, type) values (3, 'Monthly');
insert into reminder_type (reminder_type_id, type) values (4, 'Quarterly');
insert into reminder_type (reminder_type_id, type) values (5, 'Half-Yearly');
insert into reminder_type (reminder_type_id, type) values (6, 'Yearly');


select * from budget

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


select * from income
