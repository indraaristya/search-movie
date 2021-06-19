CREATE TABLE `apiLog` (
  `id` varchar(100) NOT NULL,
  `method` varchar(100) NOT NULL,
  `endpoint` varchar(100) NOT NULL,
  `params` varchar(100) DEFAULT NULL,
  `hitAt` datetime NOT NULL,
  `statusCode` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;