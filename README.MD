# [https://github.com/ManoloDisaronnor/EasyOrders](EASYORDERS)
Proyecto desarrollado por Manuel usando React y Node.js  

## INSTALACIÓN Y EJECUCIÓN
### PASOS PREVIOS A LA INSTALACIÓN
Es ***importante tener en cuenta*** que antes de ejecutar los "LAUNCHERS" hay que importar la base de datos en nuestro sistema de base de datos, en mi caso, phpMyAdmin, he dejado en la ruta /backend_node/sql una seria de carpetas para importar  
  
Primero hay que ejecutar el script de la carpeta "CREAR ESQUEMA Y TABLAS" para crear el esquema en base de datos  
  
Después hay que ejecutar ***EN ORDEN SEGÚN INDICAN LOS NÚMEROS*** los scripts de la carpeta "INSERCION DATOS"  
  
Una vez realizados estos pasos previos a la instalación, estaremos listos para instalar y ejecutar el programa
### INSTALACIÓN Y EJECUCIÓN
Para la instalación he creado una serie de scripts ubicadas en las carpetas:   


```
./EasyOrders (Carpeta Raíz)  
│  
├── INSTALLERS/  # Scripts para instalar las dependencias del proyecto   
│   ├── InstalarDependenciasFrontend.bat  
│   └── InstalarDependenciasBackend.bat  
│  
├── LAUNCHERS/  # Scripts para ejecutar ambas partes del proyecto   
│   ├── LauncherFrontend.bat  
│   └── LauncherBackend.bat  
│  
└── README.md  # Este archivo  
```

  
Es ***importante tener en cuenta*** que hay que dejar los scripts que ejecutemos de los lanzadores en ejecución para poder acceder a la aplicacion ***NO SE PUEDEN CERRAR***.  
  
Cuando tengamos los servicios corriendo, simplemente accedemos al servidor mediante la ruta: [http://localhost:5173](http://localhost:5173)

### EJECUCIÓN POR CODIGO DE LOS SERVIDORES

Aun así, puedes ejecutar los contenedores desde el terminal entrando en la carpeta con el comando correspondiente

```markdown
cd frontend_react # sustituir por backend_node si quieres iniciar el backend
```

Y despues ejecutar el comando de ejecución de npm

```markdown
npm run dev
```

## OTROS DATOS DE INTERES
### CONEXIÓN A LA BASE DE DATOS
Los parametros para conectarse a la base de datos son los siguientes:  
  
port: 3000,  
db.host: "localhost",  
db.user: "root",  
db.password: "test",  
db.name: "EasyOrders",  
db.port: 3306,