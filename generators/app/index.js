'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {

  writing() {

    //console.log(this.options.data)
    //console.log(this.options.data.replace(/'/g,"\""))
    //const data = JSON.parse(this.options.data.replace(/'/g,"\""))
    
    //console.log(data)

    let appInfo = {
      nombre: "Ejemplo uwu",
      descripcion: "Un ejemplo generado con yeoman",
      licencia: "Apache 2.0",
      version: "1.0.0"
    }

    let database = {
      nombre: "prueba",
      baseDeDatos: "postgresql",
      usuario: "postgres",
      pass: "postgres2022",
      puerto: 5432,
      host: "localhost"
    }

    let classData1 = {
      nombreClase: "Casa",
      ncl:"casa",
      atributos:[
        {
          nombre:"direccion",
          tipo:"String"
        },{
          nombre:"antiguedad",
          tipo:"int"
        }
      ]
    }

    let classData2 = {
      nombreClase: "Persona",
      ncl:"persona",
      atributos:[
        {
          nombre:"nombre",
          tipo:"String"
        },{
          nombre:"edad",
          tipo:"int"
        }
      ]
    }

    let classData3 = {
      nombreClase: "Mascota",
      ncl:"mascota",
      atributos:[
        {
          nombre:"nombre",
          tipo:"String"
        },{
          nombre:"edad",
          tipo:"int"
        }
      ]
    }

    let relacion = {
      clase1: "",
      clase2: "",
      tipo: ""
    }

    let modeloDeDatos = {
      clases: [
        classData1,
        classData2,
        classData3
      ],
      relaciones: [
        relacion
      ]
    }

    let aplicacion = {
      appInfo,
      database,
      modeloDeDatos
    }

    let {clases} = modeloDeDatos
    let root = "proyecto/src/main/java/com/example/demo/"

    // Generacion de clases, repositorios y controladores
    clases.forEach(classData => {
      this.fs.copyTpl(
        this.templatePath(root + 'entities/clase.java'),
        this.destinationPath(root + 'entities/' + classData.nombreClase + '.java'),
        classData
      );

      this.fs.copyTpl(
        this.templatePath(root + 'controllers/Controller.java'),
        this.destinationPath(root + 'controllers/' + classData.nombreClase + 'Controller.java'),
        classData
      );

      this.fs.copyTpl(
        this.templatePath(root + 'repositories/Repository.java'),
        this.destinationPath(root + 'repositories/' + classData.nombreClase + 'Repository.java'),
        classData
      );
    });
      
    // Generacion de archivo de documentacion
    this.fs.copyTpl(
      this.templatePath(root + "config/SwaggerConfig.java"),
      this.destinationPath(root + "config/SwaggerConfig.java"),
      appInfo
    );  

    // Generacion de archivo de dependencias
    this.fs.copyTpl(
      this.templatePath("proyecto/pom.xml"),
      this.destinationPath("proyecto/pom.xml"),
      database
    )

    // Generacion de archivo de condiguracion de bbdd
    this.fs.copyTpl(
      this.templatePath("proyecto/src/main/resources/application.properties"),
      this.destinationPath("proyecto/src/main/resources/application.properties"),
      database
    )
    
    // Copia de archivos que no requieren cambios
    this.fs.copyTpl(
      this.templatePath("proyecto/.mvn/wrapper/maven-wrapper.jar"),
      this.destinationPath("proyecto/.mvn/wrapper/maven-wrapper.jar"),
      null
    )

    this.fs.copyTpl(
      this.templatePath(root + "DemoApplication.java"),
      this.destinationPath(root + "DemoApplication.java"),
      null
    )

    this.fs.copyTpl(
      this.templatePath("proyecto/.mvn/wrapper/maven-wrapper.properties"),
      this.destinationPath("proyecto/.mvn/wrapper/maven-wrapper.properties"),
      null
    )
    
    this.fs.copyTpl(
      this.templatePath("proyecto/demo.iml"),
      this.destinationPath("proyecto/demo.iml"),
      null
    )

    this.fs.copyTpl(
      this.templatePath("proyecto/mvnw"),
      this.destinationPath("proyecto/mvnw"),
      null
    )

    this.fs.copyTpl(
      this.templatePath("proyecto/mvnw.cmd"),
      this.destinationPath("proyecto/mvnw.cmd"),
      null
    )

  }

  
};
