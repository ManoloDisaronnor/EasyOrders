# EASYORDERS
Proyecto desarrollado por Manuel usando React y Node.js  

## INSTALACIÓN Y EJECUCIÓN
Para la instalación he creado una serie de scripts ubicadas en las carpetas:   


EasyOrders (Carpeta Raiz)  
│  
├── INSTALLERS/ # Scripts para instalar las dependencias del proyecto   
│    ├── InstalarDependenciasFrontend.bat  
│    │   
│    └── InstalarDependenciasBackend.bat  
│   
├── LAUNCHERS/ # Scripts para ejecutar ambas partes del proyecto   
│    ├── LauncherFrontend.bat  
│    │   
│    └── LacunherBackend.bat  
│  
└── README.md # Este archivo  
    
  
Es ***importante tener en cuenta*** que hay que dejar los scripts que ejecutemos de los lanzadores en ejecución para poder acceder a la aplicacion ***NO SE PUEDEN CERRAR***. 

### EJECUCIÓN POR CODIGO DE LOS SERVIDORES

Aun así si usas VisualStudioCode, puedes ejecutar los contenedores desde el terminal entrando en la carpeta con el comando correspondiente

```markdown
cd frontend_react # sustituir por backend_node si quieres iniciar el backend
```

Y despues ejecutar el comando de ejecución de npm

```markdown
npm run dev
```