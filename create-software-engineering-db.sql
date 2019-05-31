DROP TABLE IF EXISTS `devices`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `devices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `manufacturer` varchar(255) NOT NULL,
  `deviceOnOff` int(11) NOT NULL,
  `currentEnergyUsage` int(11) NOT NULL,
  `averageEnergyUsage` int(11) NOT NULL,
  
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB;

INSERT INTO `devices` VALUES (1, 'Microwave', 'Toshiba',0,0,150), (2, 'Oven', 'Samsung',0,0,150), (3, 'Refrigerator', 'Samsung',1, 10,150), (4, 'Thermostat', 'Nest',1, 15,150), (5, 'A/C', 'Samsung',1, 210,150), (6, 'Dishwasher', 'Bosch',1, 120,150);

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,

  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB;

INSERT INTO `users` VALUES (1, 'Tester', 'test@test.com', 'test');
