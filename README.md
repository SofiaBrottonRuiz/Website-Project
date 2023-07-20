![logo UPM](https://raw.githubusercontent.com/laracabrera/AOS/master/tarea1/logo_upm.jpg)  TDW: REST API - 
Annals of Science
======================================

[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Minimum PHP Version](https://img.shields.io/badge/php-%5E8.2-blue.svg)](http://php.net/)
[![Build Status](https://scrutinizer-ci.com/g/FJavierGil/ACiencia/badges/build.png?b=master&s=f78545ddddef6aed3696ab7470c1d48421cee9d1)](https://scrutinizer-ci.com/g/FJavierGil/ACiencia/build-status/master)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/FJavierGil/ACiencia/badges/quality-score.png?b=master&s=ced26a14a5730e2f1b084a9b32db4472b672b60b)](https://scrutinizer-ci.com/g/FJavierGil/ACiencia/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/FJavierGil/ACiencia/badges/coverage.png?b=master&s=342159ea031ef8672005fb2ccb05b3f1a91f0af1)](https://scrutinizer-ci.com/g/FJavierGil/ACiencia/?branch=master)
> Implementation of a REST API for managing contributions to Science.


## :bookmark_tabs: Table of Contents
*[Introduction](#speech_balloon-introduction)
*[Main Objective](#dart-main-objetive)
*[Architecture](#building_construction-system-architecture)
*[Setup](#⚙-setup)
*[Files Structure](#🗄️projects-structure)
*[Launching the Application](#🚀launching-the-application)
*[Running Tests](#🛠️running-tests)
*[Software Used](#toolbox-software-used)
*[Sources](#black_nib-sources)


## :speech_balloon: Introduction

This project implements a [REST][rest] API interface developed using the [Slim][slim] framework. The application provides the usual operations for managing Products, Entities, and People.

To simplify data management, the [Doctrine][doctrine] ORM has been used. Doctrine 2 is an Object-Relational Mapper that provides transparent persistence for PHP objects. It uses the [Data Mapper][dataMapper] pattern to achieve complete decoupling between business logic and data persistence in database management systems.

For its configuration, this project relies on the [Dotenv][dotenv] component, which allows configuration through environment variables. In this way, any configuration that may vary between different environments (development, staging, production, etc.) can be set through environment variables, as recommended in the ["The twelve-factor app" methodology][12factor] ✅.

Furthermore, the API specification (OpenAPI 3.0) is partially included in this project. This specification was created using the [Swagger][swagger] editor. Additionally, the user interface (SwaggerUI) of this tool is also included, allowing for complete and elegant interactive testing. The provided specification defines operations for system users and Products, while operations related to the management of Entities and People are yet to be implemented.


## :dart: Main Objective

The purpose of this project is to integrate project-1 (frontend) and project-2 (backend) by using AJAX, thus creating a complete web application. To achieve this, the existing frontend, which used local storage, needs to be modified to use a relational database. This migration involves working with a REST API, using HTTP requests to different endpoints.

In this practice, the goal is to consolidate the knowledge acquired in developing a complete web system, utilizing client-side technologies like HTML, JavaScript, CSS, and AJAX, and integrating them with server-side technologies such as PHP, ORM, REST... The main objective is to enable the complete management of contributions to science, covering products, entities, and people.

In the `imagenes` folder, you can find a demo displaying the main features of the web page, as well as use cases and other diagrams to better understand the system's functionality.


## :building_construction: System's Architecture

* The system's architecture is based on a client-server architecture, where the client is the user interface developed in project-1, and the server is the backend based on the REST API developed in project-2.

* The interaction between the system components follows the flow of information between the client and the server. The client makes HTTP requests through the REST API to perform operations such as user, product, entity, and person management. The server processes these requests, accesses the database, and returns the corresponding responses to the client.

* The system has two subsystems: `writer` and `reader`. Each of them is described below:
    - `writer` subsystem: This subsystem is intended for `writer` users. `writer` users have access to a menu from which they can perform the operations specified in the use cases described in the practice. They also have an option for complete management (queries, modifications, and deletions) of all system data, including users, products, entities, and people saved by users. They can also allow registered users access to the system and assign them `reader` or `writer` permissions. Additionally, they can deactivate a user, which automatically deletes all associated data, or declare a user as `inactive`, temporarily preventing their access to the system.
    - `reader` subsystem: This subsystem is intended for `reader` users. Similar to the previous case, `reader` users can perform the operations specified in the corresponding use cases. They also have the ability to register in the system by providing a username and password. Once authorized by a `writer` user, `reader` users can access the system's functionalities. They also have an option to manage their personal account, where they can view and/or modify their personal data, such as their name, email address, date of birth, and system access password. It is worth noting that the user identifier entered during registration cannot be modified.

These subsystems overlap in the frontend, where `writer` and `reader` users interact with the user interface to access and utilize the functionalities of the contribution management system in science. 




## ⚙ Setup

The initial project setup is carried out following the following steps:
* Creation of the database: Firstly, we use XAMPP to create a new database. We create a new user named `T2023` with the password `T2023`. During the database creation proccess, we select the option `create database with the same name and grant all privileges`, which will result in the creation of an empty database named `t2023`.
* Configuration of the `.env` file: Inside the project folder, locate the `.env` file and make a copy of it, renaming it as `.env.local`. In this file, edit the database connection parameters to reflect the access credentials of the `T2023` user and the `t2023` database.
* Installation of dependencies: From the terminal, navigate to the project's root folder and execute the following commands:
    ```
    > composer install: This command will install all the necessary dependencies for the project, managed by Composer.
    ```
    ```
    > bin/doctrine orm:schema:update --dump-sql –force: This command will update the database schema using Doctrine ORM and display the necessary SQL queries to make the changes. By using the "--force" parameter, the changes will be applied automatically.
    ```
* Mapping validation and database synchronization: To verify that the mapping and synchronization with the database have been performed correctly, you can execute the following command
    ```
    > bin/doctrine orm:validate 
    ```
* Insertion of the administrator user: After completing the previous steps, an administrator user will have been inserted into the `users`` table of the database with the following credentials:
    Username: `userAdmin` and Password: `*adminUser*`.
* Database dumping: Next, a database dump will be performed to insert the initial products, entities, and people. An SQL file named Dump.sql is provided, located in the project's root directory.


## 🗄️Project's Structure

Here is a description of the most notable content and structure of the files:

* `bin` directory:
    - Executables (e.g., doctrine, phpunit, ...)
* `config` directory:
    - `config/cli-config.php`: configuration for the Doctrine command-line interface, application configuration, association between routes and controllers, etc.
* `src` directory:
    - `src/Entity` subdirectory: PHP entities (including ORM mapping attributes)
    - `src/Controller` subdirectory: PHP controllers (implementing API endpoints)
    - `src/scripts` subdirectory: example scripts
* `public` directory:
    - Root of the web server documents
    - `public/index.php`: front controller
    - `public/api-docs`: API specification (Swagger-UI)
    - `public/demoAjax`: basic example of accessing the API (login)
* `tests` directory:
    - Unit and functional tests for the API
* `vendor` directory:
    - Third-party components (Doctrine, Dotenv, Slim, etc.)


## 🚀Launching the Application

To launch the application using the built-in PHP interpreter's internal server, execute the following command:

```
> php -S 127.0.0.1:8000 -t public
```

Once these steps are completed, you can access the OpenAPI specification in SwaggerUI through the following URL: [http://127.0.0.1:8000/api-docs/index.html][lh]

You can also access the frontend of the application through: [http://127.0.0.1:8000/FrontEnd/Portada.html][lhh]


## 🛠️Running Tests

The application includes a comprehensive set of tools for running unit tests and integration tests using [PHPUnit][phpunit]. With this toolset, you can automatically verify the correct functionality of the entire API without the need for additional tools.

To configure the testing environment, you need to create a new empty database schema and make a copy of the `./phpunit.xml.dist` file, renaming it as `./phpunit.xml`. Then, edit the phpunit.xml file and assign the following parameters:

* Configuration (lines 17-19) for accessing the new database (`DATABASE_NAME`,` DATABASE_USER`, and `DATABASE_PASSWD`).
* Optionally (lines 23-25), you can modify the username and password of the users to be used for testing (no need to insert them; they are automatically created by the `setUpBeforeClass()` method in the `BaseTestCase` class).

To run the complete test suite, execute the following command:
```
> bin/phpunit [--testdox] [--coverage-text] [-v]
```

Additionally, to check the quality of the tests, the project includes mutation tests generated using the [Infection][infection] tool.
The process is simple: small changes (mutations) are made to the original code, and then the test suite is executed. If the tests fail, it means they have detected the code modification, and the mutant is eliminated. If the tests pass, the mutant survives, and the test's reliability is questioned.

To run the mutation tests, execute the following command:
```
> composer infection
```

Lastly, the project also includes two tools for static code analysis: [PHPStan][phpstan] and [PhpMetrics][phpmetrics]. PhpStan is a static code analysis tool, while PhpMetrics analyzes the code and generates reports with various project metrics.
These tools can be executed using the following commands:
```
> composer phpstan
> composer metrics
```
By running these commands, you can ensure the code quality and reliability of the tests in the project.



## 	:toolbox: Software used

Here is a brief description of the main tools used:

* [Composer][composer]: Composer is a dependency manager for PHP that simplifies the management of libraries and packages required for the project. It has been used to manage PHP dependencies and streamline the installation of external libraries.

* [XAMPP][xampp] (Windows 8.2.4): XAMPP is a software package that includes Apache, MySQL, PHP, and Perl, providing a local web server environment. It is used to create a local web server where the application can be run and tested securely.

* [Visual Studio Code][vsc] (1.78.2): Visual Studio Code is the chosen code editor. It has been used to develop both the frontend and backend of the application, offering a wide range of extensions and useful tools for programming in HTML, CSS, JavaScript, and PHP.

These tools have been instrumental in building and developing the application, providing an efficient development environment and aiding in dependency management, testing, and code editing.



## :black_nib: Sources

The project was developed based on the foundation provided by the course instructor.

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
