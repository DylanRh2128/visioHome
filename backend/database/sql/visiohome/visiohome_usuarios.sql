-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: visiohome
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `docUsuario` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `nombre` varchar(120) COLLATE utf8mb4_general_ci NOT NULL,
  `correo` varchar(180) COLLATE utf8mb4_general_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `telefono` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `direccion` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `idRol` tinyint NOT NULL,
  `genero` enum('Hombre','Mujer','Otro') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Otro',
  `login_count` int NOT NULL DEFAULT '0',
  `creado_en` datetime DEFAULT CURRENT_TIMESTAMP,
  `actualizado_en` datetime DEFAULT NULL,
  `intentosFallidos` int NOT NULL DEFAULT '0',
  `bloqueadoHasta` datetime DEFAULT NULL,
  PRIMARY KEY (`docUsuario`),
  UNIQUE KEY `correo` (`correo`),
  KEY `fk_usuarios_roles` (`idRol`),
  CONSTRAINT `fk_usuarios_roles` FOREIGN KEY (`idRol`) REFERENCES `roles` (`idRol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('1001111111','Juan Perez','juan.perez@example.com',NULL,'39493049',NULL,'$2y$12$La4ad3WNMRBWzcXGRzQk6ODxW0lE1Jtq2qVsqxHz8/tJ5s7658eo6',3,'Hombre',15,'2026-02-10 09:42:13','2026-02-24 12:26:28',0,NULL),('1003333333','Carlos López','carlos.lopez@example.com',NULL,'3015551234','Carrera 15 #80-10','$2y$10$NKTfPixVnLefzXaBXtvJ/.bp5k/DWX3QY7BsUbNSePhRCA/rwCrFa',2,'Hombre',8,'2026-02-10 09:42:13','2026-02-12 14:54:08',0,NULL),('1033183111','Dylan Henao','dylanrios@gmail.com','avatars/W2BsU3SvM24xmltdxI8E8uhpyVZsDQqPh25unQe6.jpg','3009076473','carrera 31#75c-44','$2y$12$4zisipHXFCTeZWIPvIA3zuP9/PmQFpV4ATu6PKp.cbuvs/ZB8.Vgi',2,'Otro',0,'2026-02-13 15:14:01','2026-02-18 14:49:18',0,NULL),('1033183120','Dylan Rios','dylanrios211@gmail.com','avatars/EC5D5SV6iz9ta4L776fhivVDQUQLpnubXQr51QmS.jpg','3135057694','Carrera 31 #75c-44','$2y$10$N9yjvq82BP6rX8h.7b2Quea6z8OS1a1TSHyfIx0LY9M3lGrjvafma',1,'Mujer',120,'2026-02-10 09:42:13','2026-02-18 14:25:46',0,NULL),('103948930','Edward Lopera','lopera@visiohome.com',NULL,'304845729','carrera 34#98-13','$2y$12$JqLEFj3nwv/vymJk0jiFDO7/Bci4HNZwCnhTOO7D.vtkNZhyHybXe',3,'Otro',0,'2026-02-24 12:25:17','2026-02-24 12:25:17',0,NULL),('1934749','Johan Orozco','johan@visiohome.com',NULL,'3009076573','carrera 34#75-34','$2y$12$OExggLbmAtQ5LU.rA.1Fcea/CD0zMJJmyeCvfsDiW1Mtgy9TEoYUm',3,'Otro',0,'2026-02-23 17:48:02','2026-02-23 17:48:02',0,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-24  7:38:40
