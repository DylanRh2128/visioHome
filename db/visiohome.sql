-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-10-2025 a las 16:28:05
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `visiohome`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agentes`
--

CREATE TABLE `agentes` (
  `docAgente` varchar(20) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `correo` varchar(180) NOT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `nitInmobiliaria` varchar(20) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `idCita` bigint(20) NOT NULL,
  `idPropiedad` bigint(20) NOT NULL,
  `docUsuario` varchar(20) NOT NULL,
  `docAgente` varchar(20) DEFAULT NULL,
  `fecha` datetime NOT NULL,
  `estado` varchar(20) NOT NULL CHECK (`estado` in ('pendiente','confirmada','realizada','cancelada','no_asistio')),
  `canal` varchar(20) NOT NULL CHECK (`canal` in ('presencial','virtual')),
  `notas` text DEFAULT NULL,
  `creado_en` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios_propiedad`
--

CREATE TABLE `comentarios_propiedad` (
  `idComentario` bigint(20) NOT NULL,
  `idPropiedad` bigint(20) NOT NULL,
  `docUsuario` varchar(20) NOT NULL,
  `comentario` text NOT NULL,
  `puntuacion` tinyint(4) NOT NULL CHECK (`puntuacion` between 1 and 5),
  `fecha` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inmobiliarias`
--

CREATE TABLE `inmobiliarias` (
  `nitInmobiliaria` varchar(20) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `correo` varchar(180) NOT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `objetivo` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `idPago` bigint(20) NOT NULL,
  `docUsuario` varchar(20) NOT NULL,
  `idPropiedad` bigint(20) NOT NULL,
  `idCita` bigint(20) DEFAULT NULL,
  `monto` decimal(15,2) NOT NULL,
  `metodoPago` varchar(20) NOT NULL CHECK (`metodoPago` in ('tarjeta','transferencia','efectivo','paypal','otro')),
  `estado` varchar(20) NOT NULL CHECK (`estado` in ('pendiente','aprobado','rechazado','reembolsado')),
  `referencia` varchar(80) DEFAULT NULL,
  `fecha` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propiedades`
--

CREATE TABLE `propiedades` (
  `idPropiedad` bigint(20) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `ubicacion` varchar(255) NOT NULL,
  `tamano_m2` decimal(10,2) DEFAULT NULL,
  `precio` decimal(15,2) NOT NULL,
  `estado` varchar(20) NOT NULL CHECK (`estado` in ('disponible','reservada','vendida','arrendada')),
  `tipo` varchar(20) NOT NULL CHECK (`tipo` in ('casa','apartamento','lote','oficina','local','bodega','finca','otro')),
  `nitInmobiliaria` varchar(20) NOT NULL,
  `creado_en` datetime DEFAULT current_timestamp(),
  `actualizado_en` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propiedad_imagenes`
--

CREATE TABLE `propiedad_imagenes` (
  `idImagen` bigint(20) NOT NULL,
  `idPropiedad` bigint(20) NOT NULL,
  `urlImagen` varchar(500) NOT NULL,
  `orden` int(11) DEFAULT 1,
  `creado_en` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `idRol` tinyint(4) NOT NULL,
  `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`idRol`, `nombre`) VALUES
(1, 'admin'),
(3, 'agente'),
(2, 'cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `docUsuario` varchar(20) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `correo` varchar(180) NOT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `contrasena` varchar(255) NOT NULL,
  `idRol` tinyint(4) NOT NULL,
  `creado_en` datetime DEFAULT current_timestamp(),
  `actualizado_en` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `agentes`
--
ALTER TABLE `agentes`
  ADD PRIMARY KEY (`docAgente`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `fk_agente_inmobiliaria` (`nitInmobiliaria`);

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`idCita`),
  ADD KEY `fk_cita_propiedad` (`idPropiedad`),
  ADD KEY `fk_cita_usuario` (`docUsuario`),
  ADD KEY `fk_cita_agente` (`docAgente`);

--
-- Indices de la tabla `comentarios_propiedad`
--
ALTER TABLE `comentarios_propiedad`
  ADD PRIMARY KEY (`idComentario`),
  ADD KEY `fk_coment_propiedad` (`idPropiedad`),
  ADD KEY `fk_coment_usuario` (`docUsuario`);

--
-- Indices de la tabla `inmobiliarias`
--
ALTER TABLE `inmobiliarias`
  ADD PRIMARY KEY (`nitInmobiliaria`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`idPago`),
  ADD UNIQUE KEY `referencia` (`referencia`),
  ADD KEY `fk_pago_usuario` (`docUsuario`),
  ADD KEY `fk_pago_propiedad` (`idPropiedad`),
  ADD KEY `fk_pago_cita` (`idCita`);

--
-- Indices de la tabla `propiedades`
--
ALTER TABLE `propiedades`
  ADD PRIMARY KEY (`idPropiedad`),
  ADD KEY `fk_prop_inmobiliaria` (`nitInmobiliaria`);

--
-- Indices de la tabla `propiedad_imagenes`
--
ALTER TABLE `propiedad_imagenes`
  ADD PRIMARY KEY (`idImagen`),
  ADD KEY `fk_img_propiedad` (`idPropiedad`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idRol`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`docUsuario`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `fk_usuarios_roles` (`idRol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `idCita` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comentarios_propiedad`
--
ALTER TABLE `comentarios_propiedad`
  MODIFY `idComentario` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `idPago` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `propiedades`
--
ALTER TABLE `propiedades`
  MODIFY `idPropiedad` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `propiedad_imagenes`
--
ALTER TABLE `propiedad_imagenes`
  MODIFY `idImagen` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `idRol` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `agentes`
--
ALTER TABLE `agentes`
  ADD CONSTRAINT `fk_agente_inmobiliaria` FOREIGN KEY (`nitInmobiliaria`) REFERENCES `inmobiliarias` (`nitInmobiliaria`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `fk_cita_agente` FOREIGN KEY (`docAgente`) REFERENCES `agentes` (`docAgente`),
  ADD CONSTRAINT `fk_cita_propiedad` FOREIGN KEY (`idPropiedad`) REFERENCES `propiedades` (`idPropiedad`),
  ADD CONSTRAINT `fk_cita_usuario` FOREIGN KEY (`docUsuario`) REFERENCES `usuarios` (`docUsuario`);

--
-- Filtros para la tabla `comentarios_propiedad`
--
ALTER TABLE `comentarios_propiedad`
  ADD CONSTRAINT `fk_coment_propiedad` FOREIGN KEY (`idPropiedad`) REFERENCES `propiedades` (`idPropiedad`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_coment_usuario` FOREIGN KEY (`docUsuario`) REFERENCES `usuarios` (`docUsuario`);

--
-- Filtros para la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `fk_pago_cita` FOREIGN KEY (`idCita`) REFERENCES `citas` (`idCita`),
  ADD CONSTRAINT `fk_pago_propiedad` FOREIGN KEY (`idPropiedad`) REFERENCES `propiedades` (`idPropiedad`),
  ADD CONSTRAINT `fk_pago_usuario` FOREIGN KEY (`docUsuario`) REFERENCES `usuarios` (`docUsuario`);

--
-- Filtros para la tabla `propiedades`
--
ALTER TABLE `propiedades`
  ADD CONSTRAINT `fk_prop_inmobiliaria` FOREIGN KEY (`nitInmobiliaria`) REFERENCES `inmobiliarias` (`nitInmobiliaria`);

--
-- Filtros para la tabla `propiedad_imagenes`
--
ALTER TABLE `propiedad_imagenes`
  ADD CONSTRAINT `fk_img_propiedad` FOREIGN KEY (`idPropiedad`) REFERENCES `propiedades` (`idPropiedad`) ON DELETE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_usuarios_roles` FOREIGN KEY (`idRol`) REFERENCES `roles` (`idRol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
