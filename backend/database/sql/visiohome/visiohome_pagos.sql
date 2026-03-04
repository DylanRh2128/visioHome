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
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagos` (
  `idPago` bigint NOT NULL AUTO_INCREMENT,
  `docUsuario` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `idPropiedad` bigint NOT NULL,
  `idCita` bigint DEFAULT NULL,
  `monto` decimal(15,2) NOT NULL,
  `metodoPago` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `estado` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `referencia` varchar(80) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idPago`),
  UNIQUE KEY `referencia` (`referencia`),
  KEY `fk_pago_usuario` (`docUsuario`),
  KEY `fk_pago_propiedad` (`idPropiedad`),
  KEY `fk_pago_cita` (`idCita`),
  CONSTRAINT `fk_pago_cita` FOREIGN KEY (`idCita`) REFERENCES `citas` (`idCita`),
  CONSTRAINT `fk_pago_propiedad` FOREIGN KEY (`idPropiedad`) REFERENCES `propiedades` (`idPropiedad`),
  CONSTRAINT `fk_pago_usuario` FOREIGN KEY (`docUsuario`) REFERENCES `usuarios` (`docUsuario`),
  CONSTRAINT `pagos_chk_1` CHECK ((`metodoPago` in (_utf8mb4'tarjeta',_utf8mb4'transferencia',_utf8mb4'efectivo',_utf8mb4'paypal',_utf8mb4'otro'))),
  CONSTRAINT `pagos_chk_2` CHECK ((`estado` in (_utf8mb4'pendiente',_utf8mb4'aprobado',_utf8mb4'rechazado',_utf8mb4'reembolsado')))
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
INSERT INTO `pagos` VALUES (7,'1033183120',11,NULL,1500000.00,'transferencia','aprobado','FAC-001-2025','2026-01-26 09:45:42'),(8,'1001111111',12,NULL,2300000.00,'tarjeta','pendiente','FAC-002-2025','2026-02-05 09:45:42'),(9,'1033183120',13,NULL,890000.00,'efectivo','rechazado','FAC-003-2025','2026-02-08 09:45:42');
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-24  7:38:42
