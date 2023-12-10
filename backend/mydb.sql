-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `evaluacion`
--

use ikgwxj5gogo3q7x6;

DROP TABLE IF EXISTS `evaluacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluacion` (
  `idevaluacion` int NOT NULL AUTO_INCREMENT,
  `IDusuario` int NOT NULL,
  `fechaHora` datetime DEFAULT NULL,
  `puntuacion` int NOT NULL,
  PRIMARY KEY (`idevaluacion`),
  KEY `IDusuario_idx` (`IDusuario`),
  CONSTRAINT `IDusuario` FOREIGN KEY (`IDusuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluacion`
--

LOCK TABLES `evaluacion` WRITE;
/*!40000 ALTER TABLE `evaluacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `evaluacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `niveles`
--

DROP TABLE IF EXISTS `niveles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `niveles` (
  `idnivel` int NOT NULL AUTO_INCREMENT,
  `descripcionNivel` varchar(45) NOT NULL,
  PRIMARY KEY (`idnivel`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `niveles`
--

LOCK TABLES `niveles` WRITE;
/*!40000 ALTER TABLE `niveles` DISABLE KEYS */;
INSERT INTO `niveles` VALUES (1,'Básico'),(2,'Intermedio'),(3,'Avanzado');
/*!40000 ALTER TABLE `niveles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opciones`
--

DROP TABLE IF EXISTS `opciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opciones` (
  `idopciones` int NOT NULL AUTO_INCREMENT,
  `IDpregunta` int NOT NULL,
  `descripcion` text NOT NULL,
  `correcta` tinyint(1) NOT NULL,
  PRIMARY KEY (`idopciones`),
  KEY `IDpregunta_idx` (`IDpregunta`),
  CONSTRAINT `FK_Opciones_Pregunta` FOREIGN KEY (`IDpregunta`) REFERENCES `pregunta` (`idpregunta`) ON DELETE CASCADE,
  CONSTRAINT `IDpregunta` FOREIGN KEY (`IDpregunta`) REFERENCES `pregunta` (`idpregunta`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opciones`
--

LOCK TABLES `opciones` WRITE;
/*!40000 ALTER TABLE `opciones` DISABLE KEYS */;
INSERT INTO `opciones` VALUES (5,2,'Oxígeno',0),(6,2,'Nitrógeno',0),(7,2,'Dióxido de carbono',1),(8,2,'Hidrógeno',0),(9,3,'Evaporación',0),(10,3,'Condensación',0),(11,3,'Precipitación',1),(12,3,'Colección',0),(13,4,'Planetas',0),(14,4,'Estrellas',1),(15,4,'Satélites',0),(16,4,'Asteroides',0),(17,5,'Mark Twain',0),(18,5,'Charles Dickens',0),(19,5,'Jane Austen',1),(20,5,'Leo Tolstoy',0),(21,6,'Máquinas de vapor',0),(22,6,'Impresión 3D',0),(23,6,'Inteligencia Artificial',1),(24,6,'Telegrafía',0),(53,20,'Enfrentar criaturas desconocidas',0),(54,20,'Falta de agua',1),(55,20,'Una tormenta de polvo',0),(56,20,'Problemas técnicos en la nave',0),(57,21,'Marte',1),(58,21,'Júpiter',0),(59,21,'Tierra',0),(60,22,'Usando tecnología avanzada',1),(61,22,'Esperando ayuda de la Tierra',0),(62,22,'Abandonando la misión',0);
/*!40000 ALTER TABLE `opciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pregunta`
--

DROP TABLE IF EXISTS `pregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pregunta` (
  `idpregunta` int NOT NULL AUTO_INCREMENT,
  `IDtexto` int NOT NULL,
  `enunciado` text,
  PRIMARY KEY (`idpregunta`),
  KEY `IDtexto_idx` (`IDtexto`),
  CONSTRAINT `FK_Pregunta_Texto` FOREIGN KEY (`IDtexto`) REFERENCES `texto` (`idTexto`) ON DELETE CASCADE,
  CONSTRAINT `IDtexto` FOREIGN KEY (`IDtexto`) REFERENCES `texto` (`idTexto`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pregunta`
--

LOCK TABLES `pregunta` WRITE;
/*!40000 ALTER TABLE `pregunta` DISABLE KEYS */;
INSERT INTO `pregunta` VALUES (2,2,'¿Cuál es el gas que las plantas absorben durante la fotosíntesis?'),(3,3,'¿Qué fase del ciclo del agua involucra la caída de agua desde la atmósfera a la Tierra?'),(4,4,'¿Cómo se llaman las enormes esferas de plasma que emiten luz y calor?'),(5,5,'¿Qué autor del siglo XIX escribió \"Orgullo y Prejuicio\"?'),(6,6,'¿Cuál es una de las aplicaciones más importantes de la tecnología de la información en la actualidad?'),(20,18,'¿Cuál es el principal desafío que enfrentan los exploradores en la historia?'),(21,18,'¿En qué planeta se desarrolla \'El Misterio del Planeta Rojo\'?'),(22,18,'¿Cómo resuelven los exploradores el principal desafío?');
/*!40000 ALTER TABLE `pregunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respuestauser`
--

DROP TABLE IF EXISTS `respuestauser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `respuestauser` (
  `idrespuestaUser` int NOT NULL AUTO_INCREMENT,
  `ID_pregunta` int NOT NULL,
  `ID_usuario` int DEFAULT NULL,
  `IDopcion` int NOT NULL,
  `fechaHora` datetime DEFAULT NULL,
  PRIMARY KEY (`idrespuestaUser`),
  KEY `IDpregunta_idx` (`ID_pregunta`),
  KEY `IDusuario_idx` (`ID_usuario`),
  KEY `IDopcion_idx` (`IDopcion`),
  CONSTRAINT `ID_pregunta` FOREIGN KEY (`ID_pregunta`) REFERENCES `pregunta` (`idpregunta`),
  CONSTRAINT `ID_usuario` FOREIGN KEY (`ID_usuario`) REFERENCES `usuario` (`idusuario`),
  CONSTRAINT `IDopcion` FOREIGN KEY (`IDopcion`) REFERENCES `opciones` (`idopciones`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respuestauser`
--

LOCK TABLES `respuestauser` WRITE;
/*!40000 ALTER TABLE `respuestauser` DISABLE KEYS */;
/*!40000 ALTER TABLE `respuestauser` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `respuestaUser_AFTER_INSERT` AFTER INSERT ON `respuestauser` FOR EACH ROW BEGIN
    DECLARE correcta TINYINT;
    
    -- Obtener si la respuesta es correcta
    SELECT correcta INTO correcta FROM opciones WHERE idopciones = NEW.IDopcion;
    
    -- Si la respuesta es correcta, aumentar la puntuación
    IF correcta = 1 THEN
        UPDATE evaluacion
        SET puntuacion = puntuacion + 1
        WHERE IDusuario = NEW.ID_usuario
        AND idevaluacion = (SELECT MAX(idevaluacion) FROM evaluacion WHERE IDusuario = NEW.ID_usuario);
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `texto`
--

DROP TABLE IF EXISTS `texto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `texto` (
  `idTexto` int NOT NULL AUTO_INCREMENT,
  `IDnivel` int NOT NULL,
  `titulo` varchar(45) NOT NULL,
  `contenido` text NOT NULL,
  `autor` varchar(45) DEFAULT NULL,
  `fechaPublicacion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idTexto`),
  KEY `IDnivel_idx` (`IDnivel`),
  CONSTRAINT `IDnivel` FOREIGN KEY (`IDnivel`) REFERENCES `niveles` (`idnivel`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `texto`
--

LOCK TABLES `texto` WRITE;
/*!40000 ALTER TABLE `texto` DISABLE KEYS */;
INSERT INTO `texto` VALUES (2,1,'El ciclo del agua','El ciclo del agua describe el continuo movimiento del agua en la Tierra, pasando por sus distintas fases: evaporación, condensación y precipitación. Este ciclo es vital para mantener la vida en nuestro planeta, ya que regula el clima y permite la existencia de ecosistemas acuáticos y terrestres...','Carlos Hidrólogo','2023-02-01'),(3,2,'Las estrellas','Las estrellas son enormes esferas de plasma que emiten luz y calor gracias a las reacciones nucleares que ocurren en sus núcleos. La energía liberada por estas reacciones viaja a través del universo e ilumina nuestros cielos nocturnos...','María Astrofísica','2023-03-01'),(4,2,'La historia de la Tierra','La Tierra tiene una historia geológica fascinante que se extiende por miles de millones de años. Durante este tiempo, ha sufrido innumerables cambios, desde la formación de continentes hasta eventos de extinción masiva, cada uno dejando una marca indeleble en el registro fósil...','Pedro Geólogo','2023-04-01'),(5,3,'La literatura del siglo XIX','El siglo XIX fue un período de gran cambio y diversidad en la literatura, con autores como Jane Austen, Charles Dickens y Fyodor Dostoevsky, cuyas obras abordaron las complejidades de la condición humana y la sociedad de su tiempo...','Laura Literata','2023-05-01'),(6,3,'Avances en la tecnología de la información','La tecnología de la información ha avanzado a pasos agigantados en las últimas décadas. Desde la invención de la primera computadora hasta la era de internet y la inteligencia artificial, estos avances han transformado la forma en que vivimos, trabajamos y nos comunicamos...','Juan Ingeniero','2023-06-01'),(18,2,'El Misterio del Planeta Rojo','En \'El Misterio del Planeta Rojo\', los exploradores se encuentran con desafíos inesperados en su viaje a Marte. La historia describe su viaje, los desafíos que enfrentan y cómo los superan.','','');
/*!40000 ALTER TABLE `texto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idusuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `contraseña` varchar(128) DEFAULT NULL,
  `fechaRegistro` datetime DEFAULT NULL,
  `tipoUsuario` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'mydb'
--

ALTER TABLE pregunta
ADD CONSTRAINT FK_Pregunta_Texto
FOREIGN KEY (IDtexto) REFERENCES Texto(idTexto)
ON DELETE CASCADE;
/*borrar las preguntas asociadas a un texto que ha sido borrado*/

ALTER TABLE opciones
ADD CONSTRAINT FK_Opciones_Pregunta
FOREIGN KEY (IDpregunta) REFERENCES pregunta(idpregunta)
ON DELETE CASCADE;
/*borrar las opciones asociadas a una pregunta que ha sido borrada*/

--
-- Dumping routines for database 'mydb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-09  4:12:18
