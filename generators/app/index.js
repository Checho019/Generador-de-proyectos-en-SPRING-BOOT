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
      nombre: "any",
      descripcion: "",
      licencia: "",
      version: "",
      group: ""
    }

    let database = {
      nombre: "prueba",
      baseDeDatos: "postgresSQL",
      usuario: "root",
      pass: "1234",
      puerto: 1234,
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

    this.fs.copyTpl(
      this.templatePath('entities/clase.java'),
      this.destinationPath('entities/' + classData.nombreClase + '.java'),
      classData
    );

    this.fs.copyTpl(
      this.templatePath('controllers/Controller.java'),
      this.destinationPath('controllers/' + classData.nombreClase + 'Controller.java'),
      classData
    );

    this.fs.copyTpl(
      this.templatePath('repositories/Repository.java'),
      this.destinationPath('repositories/' + classData.nombreClase + 'Repository.java'),
      classData
    );
  }

  
};
