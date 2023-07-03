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

    let classData = {
      nombreClase: "User",
      ncl:"user",
      atributos:[
        {
          nombre:"name",
          tipo:"String"
        },{
          nombre:"age",
          tipo:"int"
        }
      ]
    }

    this.fs.copyTpl(
      this.templatePath('entities/clase.java'),
      this.destinationPath('entities/' + classData.nombreClase + '.java'),
      classData
    );
  }

  
};
