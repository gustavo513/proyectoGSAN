-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-07-2023 a las 19:42:51
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gsan`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `barrios`
--

CREATE TABLE `barrios` (
  `barrioId` int(11) NOT NULL,
  `descripcion` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `barrios`
--

INSERT INTO `barrios` (`barrioId`, `descripcion`) VALUES
(1, 'San Juan'),
(2, 'Ciudad Nueva'),
(3, 'Area 1'),
(4, 'Santa Ana');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades`
--

CREATE TABLE `ciudades` (
  `ciudadId` int(11) NOT NULL,
  `descripcion` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `ciudades`
--

INSERT INTO `ciudades` (`ciudadId`, `descripcion`) VALUES
(1, 'Ciudad del Este'),
(2, 'Pdte. Franco'),
(3, 'Minga Guazu'),
(4, 'Juan E. O\'Leary');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidades`
--

CREATE TABLE `especialidades` (
  `especialidadId` int(11) NOT NULL,
  `descripcion` varchar(35) NOT NULL,
  `estado` varchar(1) DEFAULT 'D'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `especialidades`
--

INSERT INTO `especialidades` (`especialidadId`, `descripcion`, `estado`) VALUES
(1, 'Neurologia', 'D'),
(2, 'Cirugia', 'I'),
(3, 'Pediatria', 'D'),
(4, 'Psicologia', 'D'),
(5, 'Traumatología', 'D'),
(6, 'Dermatología', 'D');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE `horarios` (
  `horarioId` int(11) NOT NULL,
  `dia` int(1) NOT NULL,
  `desde` time NOT NULL,
  `hasta` time NOT NULL,
  `estado` varchar(1) DEFAULT 'D'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `horarios`
--

INSERT INTO `horarios` (`horarioId`, `dia`, `desde`, `hasta`, `estado`) VALUES
(1, 3, '15:00:00', '23:00:00', 'D'),
(2, 2, '15:00:00', '23:00:00', 'D'),
(3, 2, '07:00:00', '15:00:00', 'D'),
(4, 6, '07:00:00', '15:00:00', 'I'),
(5, 4, '07:00:00', '15:00:00', 'D'),
(6, 5, '07:00:00', '15:00:00', 'D'),
(7, 7, '07:00:00', '15:00:00', 'D'),
(15, 4, '15:00:00', '23:00:00', 'D'),
(16, 3, '07:00:00', '15:00:00', 'D'),
(18, 0, '08:00:00', '15:00:00', 'D'),
(19, 0, '07:00:00', '15:00:00', 'D');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horariosmedicos`
--

CREATE TABLE `horariosmedicos` (
  `horarioMedicoId` int(11) NOT NULL,
  `medicoId` int(11) NOT NULL,
  `horarioId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `horariosmedicos`
--

INSERT INTO `horariosmedicos` (`horarioMedicoId`, `medicoId`, `horarioId`) VALUES
(1, 1, 1),
(2, 7, 1),
(6, 11, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos`
--

CREATE TABLE `medicos` (
  `medicoId` int(11) NOT NULL,
  `nombre` varchar(35) NOT NULL,
  `apellido` varchar(35) NOT NULL,
  `ci` varchar(10) NOT NULL,
  `fechaNac` date NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `intervConsulta` int(11) DEFAULT NULL,
  `estado` varchar(1) DEFAULT 'D',
  `especialidadId` int(11) NOT NULL,
  `usuarioId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `medicos`
--

INSERT INTO `medicos` (`medicoId`, `nombre`, `apellido`, `ci`, `fechaNac`, `telefono`, `direccion`, `intervConsulta`, `estado`, `especialidadId`, `usuarioId`) VALUES
(1, 'Jorge', 'Rojas', '4531532', '1989-08-26', '0983125820', 'Gral. Bernardino Caballero - Pdte. Franco', 15, 'D', 2, 1),
(7, 'Victor', 'Castro', '4343123', '1987-07-12', '0983152312', 'Av. Heroes del Chaco', 15, 'D', 2, 1),
(11, 'Gustavo', 'Ortigoza Andino', '5300653', '2001-10-14', '0983115720', 'Barrio San Juan km 8 Acararay - Ciudad del Este', 15, 'A', 1, 1),
(12, 'Gustavo', 'Andino', '5300654', '2001-10-14', '0983115720', 'Barrio San Juan km 8 Acararay - Ciudad del Este', 15, 'D', 2, 1),
(13, 'Juan', 'Rodriguez', '1234123', '1980-10-15', '0983522222', 'Barrio San Juan km 8 Acararay - Ciudad del Este', 15, 'D', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `pacienteId` int(11) NOT NULL,
  `nombre` varchar(35) NOT NULL,
  `apellido` varchar(35) NOT NULL,
  `ci` varchar(10) NOT NULL,
  `fechaNac` date NOT NULL,
  `sexo` varchar(1) NOT NULL,
  `sangre` varchar(3) DEFAULT NULL,
  `barrioId` int(11) DEFAULT NULL,
  `ciudadId` int(11) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `telefono` varchar(10) NOT NULL,
  `fechaReg` timestamp NULL DEFAULT current_timestamp(),
  `ultTurno` timestamp NULL DEFAULT NULL,
  `usuarioId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`pacienteId`, `nombre`, `apellido`, `ci`, `fechaNac`, `sexo`, `sangre`, `barrioId`, `ciudadId`, `direccion`, `telefono`, `fechaReg`, `ultTurno`, `usuarioId`) VALUES
(1, 'Juan', 'Perez', '5300653', '2001-10-14', 'M', 'RH', 1, 1, 'Calle Univesidad Nacional del Este - km 8 Acaray', '0983115720', '2023-05-07 04:00:00', '2023-07-20 17:38:55', 1),
(2, 'Maria', 'Ojeda', '5532532', '2003-06-07', 'F', 'A', 2, 1, 'Avenida Adrian Jara - Calle Boqueron', '0981532341', '2023-05-07 04:00:00', NULL, 1),
(6, 'Benjamin', 'Abraham', '5312432', '2023-01-01', 'M', 'A', 1, 1, 'Calle Av. Peru', '0983115252', '2023-05-11 04:00:00', '2023-06-28 21:09:34', 1),
(10, 'Gustavo', 'Ortigoza', '5304312', '2001-10-12', 'M', 'RH', 2, 1, 'Av. Proceres de Mayo', '534', '2023-06-07 17:31:34', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turnos`
--

CREATE TABLE `turnos` (
  `turnoId` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `estado` varchar(1) DEFAULT 'P',
  `total` int(11) NOT NULL,
  `fechaReg` timestamp NULL DEFAULT current_timestamp(),
  `pacienteId` int(11) NOT NULL,
  `medicoId` int(11) NOT NULL,
  `usuarioId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `turnos`
--

INSERT INTO `turnos` (`turnoId`, `fecha`, `hora`, `estado`, `total`, `fechaReg`, `pacienteId`, `medicoId`, `usuarioId`) VALUES
(4, '2023-05-11', '07:00:00', 'C', 60000, '2023-05-13 13:45:16', 1, 1, 1),
(5, '2023-06-30', '07:30:00', 'F', 60000, '2023-06-28 21:08:59', 6, 1, 1),
(6, '2023-07-21', '14:15:00', 'P', 60000, '2023-07-01 01:12:22', 1, 7, 1),
(7, '2023-07-04', '12:00:00', 'P', 60000, '2023-07-01 15:36:56', 1, 7, 1),
(11, '0000-00-00', '07:00:00', 'P', 60000, '2023-07-18 00:06:57', 1, 1, 1),
(12, '0000-00-00', '07:00:00', 'P', 60000, '2023-07-18 00:08:01', 1, 1, 1),
(13, '0000-00-00', '07:00:00', 'P', 60000, '2023-07-18 00:36:55', 1, 1, 1),
(14, '2023-07-18', '07:00:00', 'P', 60000, '2023-07-18 00:37:57', 1, 1, 1),
(16, '2023-10-14', '13:38:00', 'P', 66, '2023-07-20 17:38:55', 1, 11, 1);

--
-- Disparadores `turnos`
--
DELIMITER $$
CREATE TRIGGER `actualizar_ultTurno_pacientes` AFTER INSERT ON `turnos` FOR EACH ROW UPDATE pacientes SET ultTurno = current_timestamp() WHERE pacienteId = NEW.pacienteId
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usuarioId` int(11) NOT NULL,
  `usuario` varchar(30) DEFAULT NULL,
  `codigo` int(11) DEFAULT NULL,
  `permisos` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuarioId`, `usuario`, `codigo`, `permisos`) VALUES
(1, 'Admin', 256, 5),
(2, 'Recepcion', 404, 5);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `barrios`
--
ALTER TABLE `barrios`
  ADD PRIMARY KEY (`barrioId`);

--
-- Indices de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD PRIMARY KEY (`ciudadId`);

--
-- Indices de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  ADD PRIMARY KEY (`especialidadId`);

--
-- Indices de la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`horarioId`);

--
-- Indices de la tabla `horariosmedicos`
--
ALTER TABLE `horariosmedicos`
  ADD PRIMARY KEY (`horarioMedicoId`),
  ADD KEY `medicoId` (`medicoId`),
  ADD KEY `horarioId` (`horarioId`);

--
-- Indices de la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`medicoId`),
  ADD KEY `usuarioId` (`usuarioId`),
  ADD KEY `especialidadId` (`especialidadId`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`pacienteId`),
  ADD UNIQUE KEY `ci` (`ci`),
  ADD KEY `usuarioId` (`usuarioId`),
  ADD KEY `ciudadId` (`ciudadId`),
  ADD KEY `barrioId` (`barrioId`);

--
-- Indices de la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD PRIMARY KEY (`turnoId`),
  ADD KEY `pacienteid` (`pacienteId`),
  ADD KEY `usuarioId` (`usuarioId`),
  ADD KEY `medicoId` (`medicoId`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuarioId`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `barrios`
--
ALTER TABLE `barrios`
  MODIFY `barrioId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  MODIFY `ciudadId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  MODIFY `especialidadId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `horarioId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `horariosmedicos`
--
ALTER TABLE `horariosmedicos`
  MODIFY `horarioMedicoId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `medicos`
--
ALTER TABLE `medicos`
  MODIFY `medicoId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `pacienteId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `turnos`
--
ALTER TABLE `turnos`
  MODIFY `turnoId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuarioId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `horariosmedicos`
--
ALTER TABLE `horariosmedicos`
  ADD CONSTRAINT `horariosmedicos_ibfk_1` FOREIGN KEY (`medicoId`) REFERENCES `medicos` (`medicoId`),
  ADD CONSTRAINT `horariosmedicos_ibfk_2` FOREIGN KEY (`horarioId`) REFERENCES `horarios` (`horarioId`);

--
-- Filtros para la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD CONSTRAINT `medicos_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`usuarioId`),
  ADD CONSTRAINT `medicos_ibfk_2` FOREIGN KEY (`especialidadId`) REFERENCES `especialidades` (`especialidadId`);

--
-- Filtros para la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`usuarioId`),
  ADD CONSTRAINT `pacientes_ibfk_2` FOREIGN KEY (`barrioId`) REFERENCES `barrios` (`barrioId`),
  ADD CONSTRAINT `pacientes_ibfk_3` FOREIGN KEY (`ciudadId`) REFERENCES `ciudades` (`ciudadId`);

--
-- Filtros para la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD CONSTRAINT `turnos_ibfk_1` FOREIGN KEY (`pacienteId`) REFERENCES `pacientes` (`pacienteId`),
  ADD CONSTRAINT `turnos_ibfk_2` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`usuarioId`),
  ADD CONSTRAINT `turnos_ibfk_3` FOREIGN KEY (`medicoId`) REFERENCES `medicos` (`medicoId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
