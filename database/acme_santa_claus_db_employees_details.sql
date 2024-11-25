-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: acme_santa_claus_db
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `employees_details`
--

DROP TABLE IF EXISTS `employees_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees_details` (
  `employees_id` int NOT NULL AUTO_INCREMENT,
  `employee_name` varchar(255) NOT NULL,
  `employee_mail` varchar(45) NOT NULL,
  `employees_phone` varchar(15) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `employee_password` varchar(255) NOT NULL,
  PRIMARY KEY (`employees_id`),
  UNIQUE KEY `employees_id_UNIQUE` (`employees_id`),
  UNIQUE KEY `employee_mail_UNIQUE` (`employee_mail`),
  UNIQUE KEY `employees_phone_UNIQUE` (`employees_phone`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees_details`
--

LOCK TABLES `employees_details` WRITE;
/*!40000 ALTER TABLE `employees_details` DISABLE KEYS */;
INSERT INTO `employees_details` VALUES (1,'Hamish Murray','hamish.murray@acme.com','8703416034','2024-11-22 11:12:35','$2b$10$na1j7LlgBAOHHnVLT7Irau.AFBwB6xdYhJGbMJ.GBcJ31L.XzC0ve'),(2,'Layla Graham','layla.graham@acme.com','1949407834','2024-11-22 11:12:35','$2b$10$na1j7LlgBAOHHnVLT7Irau.AFBwB6xdYhJGbMJ.GBcJ31L.XzC0ve'),(3,'Matthew King','matthew.king@acme.com','7584898702','2024-11-22 11:12:35','$2b$10$na1j7LlgBAOHHnVLT7Irau.AFBwB6xdYhJGbMJ.GBcJ31L.XzC0ve'),(4,'Benjamin Collins','benjamin.collins@acme.com','1437375643','2024-11-22 11:12:35','$2b$10$na1j7LlgBAOHHnVLT7Irau.AFBwB6xdYhJGbMJ.GBcJ31L.XzC0ve'),(5,'Isabella Scott','isabella.scott@acme.com','7889476678','2024-11-22 11:12:35','$2b$10$na1j7LlgBAOHHnVLT7Irau.AFBwB6xdYhJGbMJ.GBcJ31L.XzC0ve'),(6,'Charlie Ross','charlie.ross@acme.com','5113549008','2024-11-22 11:12:35','$2b$10$na1j7LlgBAOHHnVLT7Irau.AFBwB6xdYhJGbMJ.GBcJ31L.XzC0ve'),(7,'Hamish Murray','hamish.murray.sr@acme.com','4888623627','2024-11-22 11:12:35','$2b$10$na1j7LlgBAOHHnVLT7Irau.AFBwB6xdYhJGbMJ.GBcJ31L.XzC0ve'),(8,'Piper Stewart','piper.stewart@acme.com','9986123569','2024-11-22 11:12:35','$2b$10$na1j7LlgBAOHHnVLT7Irau.AFBwB6xdYhJGbMJ.GBcJ31L.XzC0ve'),(9,'Spencer Allen','spencer.allen@acme.com','9126193953','2024-11-22 11:12:35','$2b$10$na1j7LlgBAOHHnVLT7Irau.AFBwB6xdYhJGbMJ.GBcJ31L.XzC0ve'),(11,'Hamish Murray','hamish.murray.jr@acme.com','8570880461','2024-11-22 11:12:35','$2b$10$na1j7LlgBAOHHnVLT7Irau.AFBwB6xdYhJGbMJ.GBcJ31L.XzC0ve'),(12,'Charlie Ross','charlie.ross.jr@acme.com','2893782250','2024-11-22 11:12:35','$2b$10$na1j7LlgBAOHHnVLT7Irau.AFBwB6xdYhJGbMJ.GBcJ31L.XzC0ve'),(13,'Ethan Murray','ethan.murray@acme.com','7492851785','2024-11-22 11:12:35','$2b$10$na1j7LlgBAOHHnVLT7Irau.AFBwB6xdYhJGbMJ.GBcJ31L.XzC0ve'),(14,'Matthew King','matthew.king.jr@acme.com','3205081969','2024-11-22 11:12:35','$2b$10$na1j7LlgBAOHHnVLT7Irau.AFBwB6xdYhJGbMJ.GBcJ31L.XzC0ve'),(15,'Mark Lawrence','mark.lawrence@acme.com','2725355251','2024-11-22 11:12:35','$2b$10$na1j7LlgBAOHHnVLT7Irau.AFBwB6xdYhJGbMJ.GBcJ31L.XzC0ve');
/*!40000 ALTER TABLE `employees_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-25 10:46:41
