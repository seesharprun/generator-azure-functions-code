var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);        
        this.option('name');
    },
    prompting: {
        gatherInput: function() {
            if (!this.options.name) {
                return this.prompt([{
                        type    : 'input',
                        name    : 'name',
                        message : 'Your project name'
                    }]).then(function (answers) {
                        this.options.name = answers.name;
                    }.bind(this));
            }
        },
        logIntro: function () {            
            this.log('─────────────────────');
            this.log('Creating New Azure Functions Project');  
            this.log('Folder: [' + this.options.name + ']');     
            this.log('─────────────────────');
        }
    },
    configuring : {
        configuration: function () {

        }
    },
    writing: {
    },
    install: {
        installNPMDependencies: function () {
            this.installDependencies({
                npm: true,
                bower: false
            });
        }
    }
});