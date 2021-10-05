-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: banco
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `mensagens`
--

DROP TABLE IF EXISTS `mensagens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensagens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mensagem` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `salaId` int NOT NULL,
  `usuarioId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `salaId` (`salaId`),
  KEY `usuarioId` (`usuarioId`),
  CONSTRAINT `mensagens_ibfk_3` FOREIGN KEY (`salaId`) REFERENCES `salas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `mensagens_ibfk_4` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensagens`
--

LOCK TABLES `mensagens` WRITE;
/*!40000 ALTER TABLE `mensagens` DISABLE KEYS */;
INSERT INTO `mensagens` VALUES (1,'oi',4,2,'2021-10-05 05:11:01','2021-10-05 05:11:01'),(2,'oi!',4,4,'2021-10-05 05:38:57','2021-10-05 05:38:57'),(3,'oi',1,4,'2021-10-05 05:41:34','2021-10-05 05:41:34'),(4,'olá',1,2,'2021-10-05 05:41:38','2021-10-05 05:41:38'),(5,'oi!',1,4,'2021-10-05 05:43:04','2021-10-05 05:43:04'),(6,'olá',1,2,'2021-10-05 05:43:08','2021-10-05 05:43:08'),(7,'testando...',1,2,'2021-10-05 17:45:05','2021-10-05 17:45:05'),(8,'testando...',1,4,'2021-10-05 17:54:46','2021-10-05 17:54:46'),(9,'tem alguém aí?',1,4,'2021-10-05 17:56:51','2021-10-05 17:56:51'),(10,'oi',1,4,'2021-10-05 17:58:38','2021-10-05 17:58:38'),(11,'testando...',1,4,'2021-10-05 17:58:59','2021-10-05 17:58:59'),(12,'oi',1,4,'2021-10-05 17:59:49','2021-10-05 17:59:49'),(13,'testando...',1,2,'2021-10-05 18:08:42','2021-10-05 18:08:42'),(14,'olá',1,2,'2021-10-05 18:16:07','2021-10-05 18:16:07'),(15,'testando...',4,2,'2021-10-05 18:21:06','2021-10-05 18:21:06');
/*!40000 ALTER TABLE `mensagens` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-05 15:38:24
