-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 11, 2023 at 02:41 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gsan`
--

-- --------------------------------------------------------

--
-- Table structure for table `barrios`
--

CREATE TABLE `barrios` (
  `barrioId` int(11) NOT NULL,
  `descripcion` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `barrios`
--

INSERT INTO `barrios` (`barrioId`, `descripcion`) VALUES
(1, 'San Juan'),
(2, 'Ciudad Nueva');

-- --------------------------------------------------------

--
-- Table structure for table `ciudades`
--

CREATE TABLE `ciudades` (
  `ciudadId` int(11) NOT NULL,
  `descripcion` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ciudades`
--

INSERT INTO `ciudades` (`ciudadId`, `descripcion`) VALUES
(1, 'Ciudad del Este'),
(2, 'Minga Guazu');

-- --------------------------------------------------------

--
-- Table structure for table `especialidades`
--

CREATE TABLE `especialidades` (
  `especialidadid` int(11) NOT NULL,
  `descripcion` varchar(35) NOT NULL,
  `estado` varchar(1) DEFAULT 'D'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `especialidades`
--

INSERT INTO `especialidades` (`especialidadid`, `descripcion`, `estado`) VALUES
(1, 'Neurologia', 'D');

-- --------------------------------------------------------

--
-- Table structure for table `horarios`
--

CREATE TABLE `horarios` (
  `horarioid` int(11) NOT NULL,
  `dia` int(1) NOT NULL,
  `desde` time NOT NULL,
  `hasta` time NOT NULL,
  `estado` varchar(1) DEFAULT 'D'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `horarios`
--

INSERT INTO `horarios` (`horarioid`, `dia`, `desde`, `hasta`, `estado`) VALUES
(1, 2, '07:00:00', '15:00:00', 'D');

-- --------------------------------------------------------

--
-- Table structure for table `pacientes`
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
  `fechaReg` date DEFAULT current_timestamp(),
  `ultTurno` date DEFAULT NULL,
  `usuarioId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `pacientes`
--

INSERT INTO `pacientes` (`pacienteId`, `nombre`, `apellido`, `ci`, `fechaNac`, `sexo`, `sangre`, `barrioId`, `ciudadId`, `direccion`, `telefono`, `fechaReg`, `ultTurno`, `usuarioId`) VALUES
(1, 'Juan', 'Perez', '5300653', '2001-10-14', 'M', 'RH', 1, 1, 'Calle Univesidad Nacional del Este - km 8 Acaray', '0983115720', '2023-05-07', NULL, 1),
(2, 'Maria', 'Ojeda', '5532532', '2003-06-07', 'F', 'A', 2, 1, 'Avenida Adrian Jara - Calle Boqueron', '0981532341', '2023-05-07', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `usuarioId` int(11) NOT NULL,
  `usuario` varchar(30) DEFAULT NULL,
  `codigo` int(11) DEFAULT NULL,
  `permisos` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`usuarioId`, `usuario`, `codigo`, `permisos`) VALUES
(1, 'Admin', 256, 5),
(2, 'Marcos', 344, 2),
(3, 'Marcos', 234, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barrios`
--
ALTER TABLE `barrios`
  ADD PRIMARY KEY (`barrioId`);

--
-- Indexes for table `ciudades`
--
ALTER TABLE `ciudades`
  ADD PRIMARY KEY (`ciudadId`);

--
-- Indexes for table `especialidades`
--
ALTER TABLE `especialidades`
  ADD PRIMARY KEY (`especialidadid`);

--
-- Indexes for table `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`horarioid`);

--
-- Indexes for table `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`pacienteId`),
  ADD UNIQUE KEY `ci` (`ci`),
  ADD KEY `usuarioId` (`usuarioId`),
  ADD KEY `ciudadId` (`ciudadId`),
  ADD KEY `barrioId` (`barrioId`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuarioId`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barrios`
--
ALTER TABLE `barrios`
  MODIFY `barrioId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ciudades`
--
ALTER TABLE `ciudades`
  MODIFY `ciudadId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `especialidades`
--
ALTER TABLE `especialidades`
  MODIFY `especialidadid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `horarios`
--
ALTER TABLE `horarios`
  MODIFY `horarioid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `pacienteId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuarioId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`usuarioId`),
  ADD CONSTRAINT `pacientes_ibfk_2` FOREIGN KEY (`barrioId`) REFERENCES `barrios` (`barrioId`),
  ADD CONSTRAINT `pacientes_ibfk_3` FOREIGN KEY (`ciudadId`) REFERENCES `ciudades` (`ciudadId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
