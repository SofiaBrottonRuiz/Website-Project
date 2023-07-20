
INSERT INTO `entity` (`id`, `name`, `birthdate`, `deathdate`, `image_url`, `wiki_url`) VALUES
(1, 'IBM', '1924-01-01 00:00:00', NULL, 'https://upload.wikimedia.org/wikipedia/commons/f/fc/IBM_logo_in.jpg', 'https://es.wikipedia.org/wiki/IBM'),
(2, 'CERN', '1952-01-01 00:00:00', NULL, 'https://upload.wikimedia.org/wikipedia/en/a/ae/CERN_logo.svg', 'https://es.wikipedia.org/wiki/Organizaci%C3%B3n_Europea_para_la_Investigaci%C3%B3n_Nuclear'),
(3, 'W3C', '1994-01-01 00:00:00', NULL, 'https://www.paymentscardsandmobile.com/wp-content/uploads/2015/01/W3C.jpg', 'https://es.wikipedia.org/wiki/World_Wide_Web_Consortium');

INSERT INTO `person` (`id`, `name`, `birthdate`, `deathdate`, `image_url`, `wiki_url`) VALUES
(1, 'Vannervar Bus', '1890-03-1 00:00:00', '1974-06-30 00:00:00', 'http://4.bp.blogspot.com/-LnlyNlOhEz4/U4W70olA60I/AAAAAAAAANA/pSCczDRS4-c/s1600/vannevarbush.jpg', 'https://es.wikipedia.org/wiki/Vannevar_Bush'),
(2, 'Tim Berners Lee', '1955-06-08 00:00:00', NULL, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sir_Tim_Berners-Lee_%28cropped%29.jpg/220px-Sir_Tim_Berners-Lee_%28cropped%29.jpg', 'https://es.wikipedia.org/wiki/SGML');

INSERT INTO `product` (`id`, `name`, `birthdate`, `deathdate`, `image_url`, `wiki_url`) VALUES
(1, 'SGML', '1986-01-01 00:00:00', NULL, 'https://s3.amazonaws.com/s3.timetoast.com/public/uploads/photo/7122993/image/b6c98ea121bc14d8d0518eac7a5201e4', 'https://es.wikipedia.org/wiki/SGML'),
(2, 'XML', '1999-01-01 00:00:00', NULL, 'https://images-ext-2.discordapp.net/external/XR_oa0hoHQRsBq1W45TzGGjCqGEXPcKbZ2RSN-INge4/https/png.pngtree.com/png-vector/20190330/ourlarge/pngtree-xml-file-document-icon-png-image_893042.jpg', 'https://es.wikipedia.org/wiki/Extensible_Markup_Language'),
(3, 'HTML', '1980-01-01 00:00:00', NULL, 'https://images-ext-1.discordapp.net/external/Ccv48vdujMB92PC8N3DmYDViWIAvV0pdiM08ZINxHaQ/https/fernandosarachaga.com/wp-content/uploads/programming-language-html.jpeg', 'https://es.wikipedia.org/wiki/HTML'),
(4, 'HTTP', '1989-01-01 00:00:00', NULL, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/HTTP_logo_-_2014.svg/290px-HTTP_logo_-_2014.svg.png', 'https://es.wikipedia.org/wiki/Protocolo_de_transferencia_de_hipertexto'),
(5, 'CSS', '1996-01-01 00:00:00', NULL, 'https://picodotdev.github.io/blog-bitix/assets/images/structured-data/css-750.png', 'https://es.wikipedia.org/wiki/CSS'),
(6, 'JavaScript', '1995-01-01 00:00:00', NULL, 'https://pngset.com/images/logo-javascript-pattern-copyright-framework-free-javascript-logo-label-text-symbol-trademark-transparent-png-1498648.png', 'https://es.wikipedia.org/wiki/JavaScript');

INSERT INTO `user` (`id`, `username`, `email`, `password`, `role`, `birthDate`, `isActive`) VALUES
(2, 'Admin', 'Admin@example.com', 'Admin', 1, NULL, 1);
