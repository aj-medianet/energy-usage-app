DROP TABLE IF EXISTS `devices`;


CREATE TABLE `devices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `manufacturer` varchar(255) NOT NULL,
  `deviceOnOff` int(11) NOT NULL,
  `currentEnergyUsage` int(11) NOT NULL,
  
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB;

INSERT INTO `devices` VALUES (1, 'Microwave', 'Toshiba',0,0), (2, 'Oven', 'Samsung',0,0), (3, 'Refrigerator', 'Samsung',0, 10), (4, 'Thermostat', 'Nest',1, 15);