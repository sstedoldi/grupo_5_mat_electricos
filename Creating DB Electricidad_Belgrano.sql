-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Electricidad_Belgrano
-- -----------------------------------------------------
-- 
-- 

-- -----------------------------------------------------
-- Schema Electricidad_Belgrano
--
-- Para que funcione, quito los INDEXs, CONSTRAINTs y ON DELETE NO ACTION para la generación de FK
-- 
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Electricidad_Belgrano` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `Electricidad_Belgrano` ;

-- -----------------------------------------------------
-- Table `Electricidad_Belgrano`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Electricidad_Belgrano`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Electricidad_Belgrano`.`brands`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Electricidad_Belgrano`.`brands` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Electricidad_Belgrano`.`subcategories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Electricidad_Belgrano`.`subcategories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`category_id`) REFERENCES `Electricidad_Belgrano`.`categories` (`id`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Electricidad_Belgrano`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Electricidad_Belgrano`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `description` TEXT NOT NULL,
  `vat` FLOAT NOT NULL DEFAULT 21.0,
  `nonvatPrice` FLOAT NOT NULL,
  `discount` INT NULL,
  `subcategory_id` INT NOT NULL,
  `brand_id` INT NOT NULL,
  `stock` INT NOT NULL DEFAULT 0,
  `stock_min` INT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`brand_id`) REFERENCES `Electricidad_Belgrano`.`brands` (`id`),
  FOREIGN KEY (`subcategory_id`) REFERENCES `Electricidad_Belgrano`.`subcategories` (`id`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Electricidad_Belgrano`.`conditions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Electricidad_Belgrano`.`conditions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `condition` TINYINT NOT NULL DEFAULT 0 COMMENT '0 if not acepted\n1 if acepted',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Electricidad_Belgrano`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Electricidad_Belgrano`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(75) NOT NULL,
  `email` VARCHAR(75) NOT NULL,
  `birthDate` DATE NOT NULL,
  `password` CHAR(32) NOT NULL,
  `address` TEXT NOT NULL,
  `image` TEXT NULL,
  `tax_id` VARCHAR(11) NULL,
  `condition_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`condition_id`) REFERENCES `Electricidad_Belgrano`.`conditions` (`id`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Electricidad_Belgrano`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Electricidad_Belgrano`.`orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `ammount` DECIMAL NOT NULL,
  `shipping` TINYINT NOT NULL DEFAULT 0 COMMENT '1 if the order has to be shipped\n0 if shipping is not necessary',
  `shipping_addres` TEXT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `order_status` TINYINT NOT NULL DEFAULT 0 COMMENT '0 just created and saved\n1 budget required and active\n2 budget inactive\n3 paid\n4 paid and delivered\n5 delivered but unpaid',
  `billing` TINYINT NOT NULL DEFAULT 0 COMMENT '0 if tax billing is not required\n1 if tax billing is required',
  `budget_time` TIMESTAMP NULL COMMENT 'timestamp tripped when user request budget',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `Electricidad_Belgrano`.`users` (`id`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Electricidad_Belgrano`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Electricidad_Belgrano`.`images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `url` TEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Electricidad_Belgrano`.`products_images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Electricidad_Belgrano`.`products_images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `products_id` INT NOT NULL,
  `images_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`products_id`) REFERENCES `Electricidad_Belgrano`.`products` (`id`),
  FOREIGN KEY (`images_id`) REFERENCES `Electricidad_Belgrano`.`images` (`id`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Electricidad_Belgrano`.`products_orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Electricidad_Belgrano`.`products_orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `products_id` INT NOT NULL,
  `orders_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`products_id`) REFERENCES `Electricidad_Belgrano`.`products` (`id`),
  FOREIGN KEY (`orders_id`) REFERENCES `Electricidad_Belgrano`.`orders` (`id`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Electricidad_Belgrano`.`suppliers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Electricidad_Belgrano`.`suppliers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(75) NOT NULL,
  `address` TEXT NULL,
  `tax id` VARCHAR(11) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Electricidad_Belgrano`.`products_suppliers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Electricidad_Belgrano`.`products_suppliers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `products_id` INT NOT NULL,
  `suppliers_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`products_id`) REFERENCES `Electricidad_Belgrano`.`products` (`id`),
  FOREIGN KEY (`suppliers_id`) REFERENCES `Electricidad_Belgrano`.`suppliers` (`id`)
)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
