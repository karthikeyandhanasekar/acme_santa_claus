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
-- Table structure for table `secret_child_mapping`
--

DROP TABLE IF EXISTS `secret_child_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `secret_child_mapping` (
  `secret_child_mapping_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `secret_child_id` int NOT NULL,
  `mappedYear` int NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`secret_child_mapping_id`),
  KEY `fk_employee_id_idx` (`secret_child_mapping_id`),
  KEY `fk_employee_id` (`employee_id`),
  KEY `fk_secret_child_id` (`secret_child_id`),
  CONSTRAINT `fk_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employees_details` (`employees_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_secret_child_id` FOREIGN KEY (`secret_child_id`) REFERENCES `employees_details` (`employees_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `secret_child_mapping`
--

LOCK TABLES `secret_child_mapping` WRITE;
/*!40000 ALTER TABLE `secret_child_mapping` DISABLE KEYS */;
INSERT INTO `secret_child_mapping` VALUES (1,1,4,2023,'2024-11-22 12:16:32'),(2,2,8,2023,'2024-11-22 12:16:32'),(3,3,9,2023,'2024-11-22 12:16:32'),(4,4,13,2023,'2024-11-22 12:16:32'),(5,5,2,2023,'2024-11-22 12:16:32'),(6,6,15,2023,'2024-11-22 12:16:32'),(7,7,11,2023,'2024-11-22 12:16:32'),(8,8,12,2023,'2024-11-22 12:16:32'),(11,11,6,2023,'2024-11-22 12:16:32'),(12,12,3,2023,'2024-11-22 12:16:32'),(13,13,14,2023,'2024-11-22 12:16:32'),(14,14,7,2023,'2024-11-22 12:16:32'),(15,15,5,2023,'2024-11-22 12:16:32');
/*!40000 ALTER TABLE `secret_child_mapping` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `set_default_year` BEFORE INSERT ON `secret_child_mapping` FOR EACH ROW BEGIN
  IF NEW.mappedYear IS NULL THEN
    SET NEW.mappedYear = YEAR(CURDATE());
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-25 10:46:41
