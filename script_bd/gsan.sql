-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-05-2023 a las 03:38:19
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.1.17

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `barrios`
--

INSERT INTO `barrios` (`barrioId`, `descripcion`) VALUES
(1, 'San Juan'),
(2, 'Ciudad Nueva'),
(3, 'Area 1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades`
--

CREATE TABLE `ciudades` (
  `ciudadId` int(11) NOT NULL,
  `descripcion` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `ciudades`
--

INSERT INTO `ciudades` (`ciudadId`, `descripcion`) VALUES
(1, 'Ciudad del Este'),
(2, 'Pdte. Franco');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidades`
--

CREATE TABLE `especialidades` (
  `especialidadId` int(11) NOT NULL,
  `descripcion` varchar(35) NOT NULL,
  `estado` varchar(1) DEFAULT 'D'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especialidades`
--

INSERT INTO `especialidades` (`especialidadId`, `descripcion`, `estado`) VALUES
(1, 'Neurologia', 'D'),
(2, 'Cirugia', 'D');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `horarios`
--

INSERT INTO `horarios` (`horarioId`, `dia`, `desde`, `hasta`, `estado`) VALUES
(1, 2, '07:00:00', '15:00:00', 'D'),
(2, 2, '15:00:00', '23:00:00', 'D');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horariosmedicos`
--

CREATE TABLE `horariosmedicos` (
  `horarioMedicoId` int(11) NOT NULL,
  `medicoId` int(11) NOT NULL,
  `horarioId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `horariosmedicos`
--

INSERT INTO `horariosmedicos` (`horarioMedicoId`, `medicoId`, `horarioId`) VALUES
(1, 1, 1),
(2, 7, 1);

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
  `usuarioId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `medicos`
--

INSERT INTO `medicos` (`medicoId`, `nombre`, `apellido`, `ci`, `fechaNac`, `telefono`, `direccion`, `intervConsulta`, `estado`, `especialidadId`, `usuarioId`) VALUES
(1, 'Jorge', 'Rojas', '4531532', '1989-08-26', '0983125820', 'Gral. Bernardino Caballero - Pdte. Franco', 15, 'D', 1, 1),
(7, 'Victor', 'Castro', '4343123', '1987-07-12', '0983152312', 'Av. Heroes del Chaco', 15, 'O', 2, 1);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`pacienteId`, `nombre`, `apellido`, `ci`, `fechaNac`, `sexo`, `sangre`, `barrioId`, `ciudadId`, `direccion`, `telefono`, `fechaReg`, `ultTurno`, `usuarioId`) VALUES
(1, 'Juan', 'Perez', '5300653', '2001-10-14', 'M', 'RH', 1, 1, 'Calle Univesidad Nacional del Este - km 8 Acaray', '0983115720', '2023-05-07 04:00:00', NULL, 1),
(2, 'Maria', 'Ojeda', '5532532', '2003-06-07', 'F', 'A', 2, 1, 'Avenida Adrian Jara - Calle Boqueron', '0981532341', '2023-05-07 04:00:00', NULL, 1),
(6, 'Benjamin', 'Abraham', '5312432', '2023-01-01', 'M', 'A', 1, 1, 'Calle Av. Peru', '0983115252', '2023-05-11 04:00:00', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turnos`
--

CREATE TABLE `turnos` (
  `turnoId` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` int(11) NOT NULL,
  `estado` varchar(1) DEFAULT 'P',
  `total` int(11) NOT NULL,
  `fechaReg` timestamp NULL DEFAULT current_timestamp(),
  `pacienteId` int(11) NOT NULL,
  `medicoId` int(11) NOT NULL,
  `usuarioId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `turnos`
--

INSERT INTO `turnos` (`turnoId`, `fecha`, `hora`, `estado`, `total`, `fechaReg`, `pacienteId`, `medicoId`, `usuarioId`) VALUES
(4, '2023-05-11', 4, 'P', 60000, '2023-05-13 13:45:16', 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usuarioId` int(11) NOT NULL,
  `usuario` varchar(30) DEFAULT NULL,
  `codigo` int(11) DEFAULT NULL,
  `permisos` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
  MODIFY `barrioId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  MODIFY `ciudadId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  MODIFY `especialidadId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `horarioId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `horariosmedicos`
--
ALTER TABLE `horariosmedicos`
  MODIFY `horarioMedicoId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `medicos`
--
ALTER TABLE `medicos`
  MODIFY `medicoId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `pacienteId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `turnos`
--
ALTER TABLE `turnos`
  MODIFY `turnoId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  ADD CONSTRAINT `horariosmedicos_ibfk_2` FOREIGN KEY (`horarioId`) REFERENCES `horarios` (`horarioid`);

--
-- Filtros para la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD CONSTRAINT `medicos_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`usuarioId`),
  ADD CONSTRAINT `medicos_ibfk_2` FOREIGN KEY (`especialidadId`) REFERENCES `especialidades` (`especialidadid`);

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
