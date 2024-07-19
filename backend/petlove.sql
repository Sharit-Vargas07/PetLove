-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-07-2024 a las 18:46:26
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
-- Base de datos: `petlove`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adopcion`
--

CREATE TABLE `adopcion` (
  `id_adopcion` int(11) NOT NULL,
  `fk_id_mascota` int(11) NOT NULL,
  `fk_id_usuario` int(11) NOT NULL,
  `organizacion` varchar(20) NOT NULL,
  `fecha` date NOT NULL,
  `estado` enum('adoptado','no adoptado') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre`) VALUES
(1, 'Perro'),
(2, 'Gato');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

CREATE TABLE `mascotas` (
  `Id_mascotas` int(11) NOT NULL,
  `nombre_mascotas` varchar(50) NOT NULL,
  `genero_mascotas` enum('Macho','Hembra') NOT NULL,
  `edad_mascota` varchar(20) NOT NULL,
  `tamaño_mascota` enum('Grande','Mediano','Pequeño') NOT NULL,
  `color_mascota` varchar(50) NOT NULL,
  `peso_mascota` varchar(20) NOT NULL,
  `Esterilizacion` enum('Si','No') NOT NULL,
  `Vacunas` text NOT NULL,
  `Desparacitacion` enum('Si','No') NOT NULL,
  `Fecha_ult_desparacitacion` date NOT NULL,
  `discapacidad` enum('Si','No') NOT NULL,
  `descripcion_discapacidad` varchar(50) NOT NULL,
  `Energia` enum('Alto','Medio','Bajo') NOT NULL,
  `compatibilidad_ninos` enum('Si','No') NOT NULL,
  `compatibilidad_otros_animales` enum('Si','No') NOT NULL,
  `imagen` varchar(50) NOT NULL,
  `estado` enum('adoptado','sin adoptar') NOT NULL,
  `fk_id_categoria` int(11) NOT NULL,
  `fk_id_raza` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mascotas`
--

INSERT INTO `mascotas` (`Id_mascotas`, `nombre_mascotas`, `genero_mascotas`, `edad_mascota`, `tamaño_mascota`, `color_mascota`, `peso_mascota`, `Esterilizacion`, `Vacunas`, `Desparacitacion`, `Fecha_ult_desparacitacion`, `discapacidad`, `descripcion_discapacidad`, `Energia`, `compatibilidad_ninos`, `compatibilidad_otros_animales`, `imagen`, `estado`, `fk_id_categoria`, `fk_id_raza`) VALUES
(2, 'Lulu', 'Hembra', '5 meses', 'Mediano', 'Negro con Blanco', '25kg', 'Si', 'Si', 'Si', '2024-05-23', 'Si', 'No tiene una pata', 'Medio', 'Si', 'Si', '', 'sin adoptar', 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `raza`
--

CREATE TABLE `raza` (
  `id_raza` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `raza`
--

INSERT INTO `raza` (`id_raza`, `nombre`) VALUES
(1, 'BullDog'),
(2, 'Chiguagua');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Id_usuarios` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `apellidos_usuario` varchar(50) NOT NULL,
  `correo_usuario` varchar(50) NOT NULL,
  `contraseña` varchar(20) NOT NULL,
  `photo` varchar(50) NOT NULL,
  `rol` enum('administrador','adoptante') NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `fk_id_mascota` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Id_usuarios`, `nombre_usuario`, `apellidos_usuario`, `correo_usuario`, `contraseña`, `photo`, `rol`, `telefono`, `fk_id_mascota`) VALUES
(1, 'Sharit', 'Vargas', 'sharit@gmail.com', '133545', '', 'administrador', '3204444432', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `adopcion`
--
ALTER TABLE `adopcion`
  ADD PRIMARY KEY (`id_adopcion`),
  ADD KEY `fk_id_mascota` (`fk_id_mascota`),
  ADD KEY `fk_id_usuario` (`fk_id_usuario`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD PRIMARY KEY (`Id_mascotas`),
  ADD KEY `fk_id_categoria` (`fk_id_categoria`),
  ADD KEY `fk_id_raza` (`fk_id_raza`);

--
-- Indices de la tabla `raza`
--
ALTER TABLE `raza`
  ADD PRIMARY KEY (`id_raza`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Id_usuarios`),
  ADD KEY `fk_id_mascota` (`fk_id_mascota`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `adopcion`
--
ALTER TABLE `adopcion`
  MODIFY `id_adopcion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `Id_mascotas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `raza`
--
ALTER TABLE `raza`
  MODIFY `id_raza` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `Id_usuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `adopcion`
--
ALTER TABLE `adopcion`
  ADD CONSTRAINT `adopcion_ibfk_1` FOREIGN KEY (`fk_id_mascota`) REFERENCES `mascotas` (`Id_mascotas`),
  ADD CONSTRAINT `adopcion_ibfk_2` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuarios` (`Id_usuarios`);

--
-- Filtros para la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD CONSTRAINT `mascotas_ibfk_2` FOREIGN KEY (`fk_id_raza`) REFERENCES `raza` (`id_raza`),
  ADD CONSTRAINT `mascotas_ibfk_3` FOREIGN KEY (`fk_id_categoria`) REFERENCES `categoria` (`id_categoria`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`fk_id_mascota`) REFERENCES `mascotas` (`Id_mascotas`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
