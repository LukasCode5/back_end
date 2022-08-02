-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 02, 2022 at 10:20 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `type8_baigiamasis_exam_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id` int(10) UNSIGNED NOT NULL,
  `question_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `content` text NOT NULL,
  `votes` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `reg_timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `reg_timestamp`) VALUES
(1, 'jonas@gmail.com', '$2a$10$pcc3X7s68XuNEKaESJ/pv.dNjs4fGiuA/Ur4vSz6wYeB.pjns9SOG', '2022-07-28 06:02:35'),
(3, 'monas@gmail.com', '$2a$10$fXH/SmpHhIxeAUVzK2Av.ux/WS0Wwc8KgAywPFqSw2cJhJfiIjBrK', '2022-07-28 06:02:55'),
(5, 'rokas@gmail.com', '$2a$10$vNblZgKoKZTcYJqXoUBBSe7neX8JoP8TDLCk15ruuhy8YcNwXV.Ri', '2022-07-28 08:35:47'),
(8, 'lonas@gmail.com', '$2a$10$TgihdfGAED82n9V3x32ZTerErOJ0FwnNIGBdg2.LUOZChoaMps7lq', '2022-07-28 08:38:52'),
(13, 'auris@gmail.com', '$2a$10$odjL4FKFn8W2NttXQlDciuJp.TMc.3EN8RIikHUQNq6okXgRR2lmu', '2022-07-28 08:40:24'),
(25, 'mantas@gmail.com', '$2a$10$4UReWhZDgyK3Bsl9SZ8.u.EnwNKG93jgiwRd.pYxThsBkgZOoyAB2', '2022-07-28 08:43:28'),
(27, 'juozas@gmail.com', '$2a$10$noM50OPhe0TqKm2mBC5GSu7QTu5AL3RRknonBI62SMua8RpM2ML2e', '2022-07-30 15:47:53'),
(30, 'kazys@gmail.com', '$2a$10$J2sKztLtLaZlcb0aWQqVMOexf76CVDzKPADic3BmPWzoMXGwZvuWO', '2022-07-31 11:25:53'),
(32, 'josok@gmail.com', '$2a$10$doBMslM1e5e61I93SSwVyO0qldJ3ZzwlcwnbpBS0e0AHJbp4CT1YC', '2022-07-31 12:56:25'),
(40, 'jos@gmail.com', '$2a$10$rh175mbwC2HrS.B6qPtODeBpooDiPg.5E/SYZ69GvjpR5ClcjpG3u', '2022-07-31 13:08:17'),
(42, 'lukas@gmail.com', '$2a$10$DB.VS5MF.ocdhZ.knw5PLug8IYZw0pXhpjZs/FPSqjEyIq9sU6vlu', '2022-08-01 12:21:37'),
(43, 'justas@gmail.com', '$2a$10$D42C6G2O0B/2vPWjXG9spuiWnouDvAcKuEsf2dA0HjkEO.rD4aFz6', '2022-08-02 16:28:58'),
(44, 'some@gmail.com', '$2a$10$m64Kpvl3kIy4RlY9H.cT/eWiG/6R.gE08rTyhKUXJhMn2979X6e/a', '2022-08-02 16:42:49'),
(45, 'marius@gmail.com', '$2a$10$K6mAKs/JZcxXO/PHiEgdB.S9yQsc0uOf8jEdx9nhEEy69mM/2L1pi', '2022-08-02 19:35:20');

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `id` int(11) NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `answer_id` int(10) UNSIGNED NOT NULL,
  `value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `votes`
--

INSERT INTO `votes` (`id`, `user_id`, `answer_id`, `value`) VALUES
(28, 45, 31, -1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `votes`
--
ALTER TABLE `votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
