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
-- Table structure for table `propiedades`
--

DROP TABLE IF EXISTS `propiedades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `propiedades` (
  `idPropiedad` bigint NOT NULL AUTO_INCREMENT,
  `titulo` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_general_ci,
  `ubicacion` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `tamano_m2` decimal(10,2) DEFAULT NULL,
  `precio` decimal(15,2) NOT NULL,
  `estado` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `tipo` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `nitInmobiliaria` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `creado_en` datetime DEFAULT CURRENT_TIMESTAMP,
  `actualizado_en` datetime DEFAULT NULL,
  `test_col` int DEFAULT NULL,
  `latitud` decimal(10,8) DEFAULT NULL,
  `longitud` decimal(11,8) DEFAULT NULL,
  `habitaciones` int NOT NULL DEFAULT '1',
  `banos` int NOT NULL DEFAULT '1',
  `imagen_principal` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`idPropiedad`),
  KEY `fk_prop_inmobiliaria` (`nitInmobiliaria`),
  CONSTRAINT `fk_prop_inmobiliaria` FOREIGN KEY (`nitInmobiliaria`) REFERENCES `inmobiliarias` (`nitInmobiliaria`),
  CONSTRAINT `propiedades_chk_1` CHECK ((`estado` in (_utf8mb4'disponible',_utf8mb4'reservada',_utf8mb4'vendida',_utf8mb4'arrendada'))),
  CONSTRAINT `propiedades_chk_2` CHECK ((`tipo` in (_utf8mb4'casa',_utf8mb4'apartamento',_utf8mb4'lote',_utf8mb4'oficina',_utf8mb4'local',_utf8mb4'bodega',_utf8mb4'finca',_utf8mb4'otro')))
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propiedades`
--

LOCK TABLES `propiedades` WRITE;
/*!40000 ALTER TABLE `propiedades` DISABLE KEYS */;
INSERT INTO `propiedades` VALUES (11,'Apartamento Moderno en Chapinero','Hermoso apartamento de 3 habitaciones con acabados de lujo.','Chapinero, Bogotá',85.00,450000000.00,'disponible','apartamento','900123456-1','2026-02-10 09:45:42','2026-02-10 09:45:42',NULL,NULL,NULL,1,1,NULL),(12,'Casa Campestre en La Calera','Casa campestre con 4 habitaciones y zona BBQ.','La Calera, Cundinamarca',220.00,850000000.00,'disponible','casa','900123456-1','2026-02-10 09:45:42','2026-02-10 09:45:42',NULL,NULL,NULL,1,1,NULL),(13,'Oficina en Zona Rosa','Oficina moderna en el corazón de la Zona Rosa.','Zona Rosa, Bogotá',65.00,320000000.00,'disponible','oficina','900987654-2','2026-02-10 09:45:42','2026-02-10 09:45:42',NULL,NULL,NULL,1,1,NULL),(14,'Apartamento Familiar en Cedritos','Apartamento amplio ideal para familia.','Cedritos, Bogotá',95.00,380000000.00,'disponible','apartamento','900123456-1','2026-02-10 09:45:42','2026-02-10 09:45:42',NULL,NULL,NULL,1,1,NULL),(15,'Local Comercial en Suba','Local comercial en zona de alto tráfico.','Suba, Bogotá',120.00,280000000.00,'disponible','local','900987654-2','2026-02-10 09:45:42','2026-02-17 15:35:19',NULL,NULL,NULL,1,1,NULL);
/*!40000 ALTER TABLE `propiedades` ENABLE KEYS */;
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
