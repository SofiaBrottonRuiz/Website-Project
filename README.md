![logo UPM](https://raw.githubusercontent.com/laracabrera/AOS/master/tarea1/logo_upm.jpg)  TDW: REST API - Anales de la Ciencia
======================================

[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Minimum PHP Version](https://img.shields.io/badge/php-%5E8.2-blue.svg)](http://php.net/)
[![Build Status](https://scrutinizer-ci.com/g/FJavierGil/ACiencia/badges/build.png?b=master&s=f78545ddddef6aed3696ab7470c1d48421cee9d1)](https://scrutinizer-ci.com/g/FJavierGil/ACiencia/build-status/master)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/FJavierGil/ACiencia/badges/quality-score.png?b=master&s=ced26a14a5730e2f1b084a9b32db4472b672b60b)](https://scrutinizer-ci.com/g/FJavierGil/ACiencia/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/FJavierGil/ACiencia/badges/coverage.png?b=master&s=342159ea031ef8672005fb2ccb05b3f1a91f0af1)](https://scrutinizer-ci.com/g/FJavierGil/ACiencia/?branch=master)
> Implementación de una API REST para la gestión de aportaciones a la Ciencia


## :bookmark_tabs: Índice
*[Introducción](#speech_balloon-introducción)
*[Objetivo de la práctica](#dart-objetivo-de-la-práctica)
*[Arquitectura](#building_construction-arquitectura-del-sistema)
*[Instalación del proyecto](#⚙instalación-del-proyecto️)
*[Estructura del proyecto](#🗄️estructura-del-proyecto)
*[Puesta en marcha de la aplicación](#🚀puesta-en-marcha-de-la-aplicación)
*[Ejecución de pruebas](#🛠️ejecución-de-pruebas)
*[Software utilizado](#toolboxsoftware-utilizado)
*[Fuentes](#black_nib-fuentes)


## :speech_balloon: Introducción

Este proyecto implementa una interfaz de programación [REST][rest] desarrollada sobre
el framework [Slim][slim]. La aplicación proporciona las operaciones
habituales para la gestión de Productos, Entidades y Personas.

Para hacer más sencilla la gestión de los datos se ha utilizado
el ORM [Doctrine][doctrine]. Doctrine 2 es un Object-Relational Mapper que proporciona
persistencia transparente para objetos PHP. Utiliza el patrón [Data Mapper][dataMapper]
con el objetivo de obtener un desacoplamiento completo entre la lógica de negocio y la
persistencia de los datos en los sistemas de gestión de bases de datos.

Para su configuración, este proyecto se apoya en el componente [Dotenv][dotenv], que
permite realizar la configuración a través de variables de entorno. De esta manera,
cualquier configuración que pueda variar entre diferentes entornos (desarrollo, pre-producción, producción, ...) puede ser establecida
a través de variables de entorno, tal como se aconseja en la metodología [“The twelve-factor app”][12factor] ✅.

Por otra parte, se incluye parcialmente la especificación de la API (OpenAPI 3.0). Esta
especificación se ha elaborado empleando el editor [Swagger][swagger]. Adicionalmente 
también se incluye la interfaz de usuario (SwaggerUI) de esta fenomenal herramienta que permite
realizar pruebas interactivas de manera completa y elegante. La especificación entregada
define las operaciones sobre usuarios del sistema y sobre `Productos`, por lo que quedan por implementar las 
operaciones relativas a la gestión de `Entidades` y `Personas`.


## :dart: Objetivo de la práctica

La finalidad de este proyecto es integrar las prácticas 1 (frontend) y 2 (backend) mediante 
el uso de AJAX, creando así una aplicación web completa. Para lograrlo, se requerirá modificar 
el frontend existente, que utilizaba almacenamiento local, para que utilice una base de datos 
relacional. Esta migración implica trabajar con una API REST, utilizando peticiones HTTP hacia 
los distintos endpoints. 

En esta práctica, se busca consolidar los conocimientos adquiridos sobre el desarrollo de un 
sistema web completo, haciendo uso de tecnologías del lado del cliente como HTML, 
JavaScript, CSS y AJAX, e integrándolas con las tecnologías del lado del servidor, como PHP, 
ORM, REST... El objetivo principal es permitir la gestión completa de las aportaciones a la 
ciencia, abarcando productos, entidades y personas.

En la carpeta `imagenes` se pueden encontrar una demo mostrando las caracteristicas principales de la página web, además de casos de uso y otros diagramas para entender mejor el funcionamiento del sistema.


## :building_construction: Arquitectura del sistema

* La arquitectura del sistema se basa en una arquitectura cliente-servidor, donde el cliente es 
la interfaz de usuario desarrollada en la práctica 1, y el servidor es el backend basado en la 
API REST desarrollada en la práctica 2.

* La interacción entre los componentes del sistema sigue el flujo de información entre el 
cliente y el servidor. El cliente realiza peticiones HTTP a través de la API REST para realizar 
operaciones como la gestión de usuarios, productos, entidades y personas. El servidor 
procesa estas peticiones, accede a la base de datos y devuelve las respuestas 
correspondientes al cliente.

* El sistema cuenta con dos subsistemas: `writer` y `reader`. A continuación, se describe 
cada uno de ellos:
    - Subsistema `writer`: Este subsistema está destinado a los usuarios de tipo 
    `writer`. Los usuarios `writer` tienen acceso a un menú desde el cual pueden 
    realizar las operaciones especificadas en los casos de uso descritos en la práctica. Además, disponen de una opción para la gestión completa (consultas, modificaciones y bajas) de todos los datos del sistema, incluyendo usuarios, productos, entidades y personas guardadas por los usuarios. También tienen la 
    capacidad de permitir el acceso al sistema a los usuarios registrados y asignarles 
    permisos de `reader` o `writer`. Adicionalmente, pueden dar de baja a un 
    usuario, lo que implica la eliminación automática de todos sus datos asociados, declarar a un usuario como `inactivo`, lo que impide su acceso al sistema temporalmente.
    - Subsistema `reader`: Este subsistema está destinado a los usuarios de tipo 
    `reader`. Al igual que en el caso anterior, los usuarios `reader` pueden realizar las operaciones especificadas en los casos de uso correspondientes. Además, tienen la posibilidad de registrarse en el sistema proporcionando un nombre de usuario y una contraseña. Una vez autorizados por un usuario  `writer`, los usuarios `reader` pueden acceder a las funcionalidades del sistema. También cuentan con una opción para gestionar su cuenta personal, donde pueden ver y/o modificar sus datos personales, como su nombre, dirección de correo electrónico, fecha de nacimiento y contraseña de acceso al sistema. Cabe destacar que el identificador de usuario que se introduce al registrarse no puede ser modificado.

Estos subsistemas se superponen en el frontend, donde los usuarios `writer` y `reader` 
interactúan con la interfaz de usuario para acceder y utilizar las funcionalidades del sistema 
de gestión de aportaciones a la ciencia.



## ⚙Instalación del proyecto️

La configuración inicial del proyecto se lleva a cabo siguiendo los siguientes pasos:
* Creación de la base de datos: En primer lugar, utilizamos XAMPP para crear una nueva base de datos. Creamos un nuevo usuario llamado `T2023` con la contraseña `T2023`. Durante la creación de la base de datos, seleccionamos la opción `create database with same name and grant all privileges`, lo que resultará en la creación de una base de datos vacía llamada `t2023`.
* Configuración del archivo `.env`: Dentro de la carpeta del proyecto, ubicamos el archivo `.env` y creamos una copia del mismo renombrándola como `.env.local`. En este archivo, editamos los parámetros de conexión a la base de datos para reflejar los datos de acceso del usuario `T2023` y la base de datos `t2023`.
* Instalación de dependencias: Desde la terminal, en la carpeta raíz del proyecto, ejecutamos los siguientes comandos:
    ```
    > composer install: Este comando instalará todas las dependencias necesarias para el proyecto, gestionadas por Composer.
    ```
    ```
    > bin/doctrine orm:schema:update --dump-sql –force: Este comando actualizará el esquema de la base de datos utilizando Doctrine ORM y mostrará las consultas SQL necesarias para realizar los cambios. Al utilizar el parámetro "--force", se aplicarán los cambios automáticamente.
    ```
* Validación del mapeo y sincronización de la base de datos: Para verificar que el mapeo y la sincronización con la base de datos se han realizado correctamente, podemos ejecutar el siguiente comando: 
    ```
    > bin/doctrine orm:validate (Este comando verificará que todas las entidades estén mapeadas correctamente y coincidan con la estructura de la base de datos)
    ```
* Inserción de usuario administrador: Después de completar los pasos anteriores, se habrá insertado en la tabla `users`, de la base de datos un usuario administrador con las siguientes credenciales: 
    Usuario: `userAdmin` y Contraseña: `*adminUser*`.
* Dumpeo de la base de datos: A continuación, se realizará un dumpeo de la base de datos para insertar los productos, entidades y personas iniciales. Se proporciona un archivo SQL llamado `Dump.sql`, que se encuentra en el directorio raíz del proyecto.


## 🗄️Estructura del proyecto

A continuación se describe el contenido y estructura más destacado del proyecto:

* Directorio `bin`:
    - Ejecutables (*doctrine*, *phpunit*, ...)
* Directorio `config`:
    - `config/cli-config.php`: configuración de la consola de comandos de Doctrine, configuración de la aplicación, asociación entre rutas y controladores, etc.
* Directorio `src`:
    - Subdirectorio `src/Entity`: entidades PHP (incluyen atributos de mapeo del ORM)
    - Subdirectorio `src/Controller`: controladores PHP (implementan los _endpoints_ de la API)
    - Subdirectorio `src/scripts`: scripts de ejemplo
* Directorio `public`:
    - Raíz de documentos del servidor web
    - `public/index.php`: controlador frontal
    - `public/api-docs`: especificación de la API (Swagger-UI)
    - `public/demoAjax`: ejemplo básico acceso a la API (login)
* Directorio `tests`:
    - Pruebas unitarias y funcionales de la API
* Directorio `vendor`:
    - Componentes desarrollados por terceros (Doctrine, Dotenv, Slim, etc.)

## 🚀Puesta en marcha de la aplicación

Para acceder a la aplicación utilizando el servidor interno del intérprete de PHP se ejecutará el comando:

```
> php -S 127.0.0.1:8000 -t public
```

Una vez completados estos pasos, podemos acceder a la especificación OpenAPI en SwaggerUI a través de la siguiente URL: [http://127.0.0.1:8000/api-docs/index.html][lh]
También podemos acceder al frontend de la aplicación a través de: [http://127.0.0.1:8000/FrontEnd/Portada.html][lhh]


## 🛠️Ejecución de pruebas

La aplicación incorpora un conjunto completo de herramientas para la ejecución de pruebas 
unitarias y de integración con [PHPUnit][phpunit]. Empleando este conjunto de herramientas
es posible comprobar de manera automática el correcto funcionamiento de la API completa
sin la necesidad de herramientas adicionales.

Para configurar el entorno de pruebas se debe crear un nuevo esquema de bases de datos vacío,
y una copia del fichero `./phpunit.xml.dist` y renombrarla como `./phpunit.xml`.
Después se debe editar este último fichero para asignar los siguientes parámetros:
                                                                            
* Configuración (líneas 17-19) del acceso a la nueva base de datos (`DATABASE_NAME`, `DATABASE_USER`
y `DATABASE_PASSWD`)
* Si se desea (líneas 23-25), se pueden modificar el nombre y contraseña de los usuarios que se van
a emplear para realizar las pruebas (no es necesario insertarlos, lo hace automáticamente
el método `setUpBeforeClass()` de la clase `BaseTestCase`)

Para lanzar la suite de pruebas completa se debe ejecutar:
```
> bin/phpunit [--testdox] [--coverage-text] [-v]
```

Adicionalmente, para comprobar la calidad de las pruebas, el proyecto incluye test de mutaciones
generados con la herramienta [Infection][infection].
El funcionamiento es simple: se generan pequeños cambios en el código original (_mutantes_), y a continuación
se ejecuta la batería de pruebas. Si las pruebas fallan, indica que han sido capaces de detectar la modificación
del código, y el mutante es eliminado. Si pasa las pruebas, el mutante sobrevive y la fiabilidad de la prueba
queda cuestionada.

Para lanzar los test de mutaciones se ejecutará:
```
> composer infection
```

Por último, también se han añadido dos herramientas para el análisis estático de código,
[PHPStan][phpstan] y [PhpMetrics][phpmetrics]. PhpStan es una herramienta de análisis estático de código, mientras que
PhpMetrics analiza el código y permite generar informes con diferentes métricas del proyecto.
Estas herramientas pueden ejecutarse a través de los comandos:
```
> composer phpstan
> composer metrics
```

## 	:toolbox:Software utilizado

A continuación, se describen brevemente las principales herramientas utilizadas:

* [Composer][composer]: Composer es un administrador de dependencias para PHP que facilita la 
gestión de las bibliotecas y paquetes necesarios para el proyecto. Se ha utilizado para 
gestionar las dependencias de PHP y simplificar la instalación de librerías externas.

* [XAMPP][xampp](Windows 8.2.4): XAMPP es un paquete de software que incluye Apache, MySQL, PHP y Perl, 
proporcionando un entorno de servidor web local. Se utiliza para crear un servidor web local en el que se puede ejecutar y probar la aplicación de forma segura.

* [Visual Studio Code][vsc](1.78.2): Visual Studio Code es el editor de código que he decidido usar. Se ha utilizado para desarrollar tanto el frontend como el backend de la aplicación, ofreciendo una amplia gama de extensiones y herramientas útiles para la programación en HTML, CSS, JavaScript y PHP.


## :black_nib: Fuentes

El proyecto fue realizado sobre la base proporcionada por el profesor de la asignatura.

[dataMapper]: http://martinfowler.com/eaaCatalog/dataMapper.html
[doctrine]: http://docs.doctrine-project.org/projects/doctrine-orm/en/latest/
[dotenv]: https://packagist.org/packages/vlucas/phpdotenv
[infection]: https://infection.github.io/guide/
[jwt]: https://jwt.io/
[lh]: http://127.0.0.1:8000/api-docs/index.html
[lhh]: http://127.0.0.1:8000/FrontEnd/Portada.html
[monolog]: https://github.com/Seldaek/monolog
[openapi]: https://www.openapis.org/
[phpunit]: http://phpunit.de/manual/current/en/index.html
[rest]: http://www.restapitutorial.com/
[slim]: https://www.slimframework.com/ 
[swagger]: http://swagger.io/
[yaml]: https://yaml.org/
[12factor]: https://www.12factor.net/es/
[phpmetrics]: https://phpmetrics.org/
[phpstan]: https://phpstan.org/
[composer]: https://getcomposer.org/
[vsc]: https://code.visualstudio.com/
[xampp]: https://www.apachefriends.org/