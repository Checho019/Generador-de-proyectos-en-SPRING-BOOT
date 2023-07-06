'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the brilliant ${chalk.red('generator-proyecto')} generator!`
      )
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

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
      baseDeDatos: "mariadb",
      usuario: "root",
      pass: "1234",
      puerto: 3306,
      host: "localhost"
    }

    let classData = {
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

    let relacion = {
      clase1: "",
      clase2: "",
      tipo: ""
    }

    let modeloDeDatos = {
      clases: [
        classData
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

    let root = "proyecto/src/main/java/com/example/demo/"

    // Generacion de clases, repositorios y controladores
    
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

    

  }

  
};
