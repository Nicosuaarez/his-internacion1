# Proyeco HIS - Internacion

Este proyecto es parte del trabajo practico integrador de  **Programacion Web II**.
Consiste en un sistema hospitalario para la admision e internacion de pacientes, realizado con Node.js, Express, MySQL y Pug.

## Funcionalidades principales
- Registro de pacientes desde formularios
- Listado de pacientes con opcion de internar
- Internacion de pacientes con control de camas y fechas
- Vista de pacientes internados
- Estilos personalizados con CSS
- Validaciones para evitar duplicados:
    -EL mismo paciente no puede internarse dos veces el mismo dia
    -La misma cama no puede usarse mas de una vez por dia

## Tecnologias utilizadas
-**Node.js** 
-**Express.js** 
-**MySQL** 
-**Pug** 
-**CSS** 
-**Git y GitHub** 

## Instalacion

1. Clonar este repositorio:
    En la terminal:
                    git  clone https://github.com/Nicosuaarez/his-internacion1
                    cd his-internacion1
2. Instalar las dependencias del proyecto:
    En la terminal:
                    npm install
3. Crear una base de datos MySQL con el nombre his_internacion y ejecutar el backup SQL incluido
    El archivo backup se encuenttra en /sql/backup.sql
4. Iniciar el servidor:
    En la terminal:
                    node src/app.js
5. Acceder en el navegador:
    http://localhost:3000/pacientes

## ¿Como probar el sistema?

1. Entrar a /pacientes/nuevo
2. Registrar un paciente
3. Ver el paciente en el listado
4. Usar el boton "Internar" para asignar una cama
5. Comprobar que la internacion se registro /internaciones
6. Probar validaciones:
    Internar dos veces el mismo paciente el mismo dia -> No se permite
    Usar la misma cama dos veces -> No se permite

## Enlaces requeridos para la entrega

    Repositorio GitHub: https://github.com/Nicosuaarez/his-internacion1
    Video de presentacion:
    App Online: https://his-internacion.onrender.com/


## Alumno

Nombre: Nicolas Agustin Suarez
