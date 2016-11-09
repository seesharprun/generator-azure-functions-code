var generators = require('yeoman-generator');
var uuid = require('node-uuid');

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);
    },
    prompting: {
        logIntro: function () {            
            this.log('─────────────────────');
            this.log('Creating New Azure Functions project');    
            this.log('─────────────────────');
        }
    },
    configuring: {
        runSubgenerators: function () {
            this.composeWith("start-azure-functions:function", {
                options: {
                    name: null
                }
            });
        },
    },
    writing: {
         writeSolutionFiles: function() {
            this.fs.copyTpl(
                this.templatePath('.secrets'),
                this.destinationPath('.secrets'), 
                { }
            );  
            this.fs.copyTpl(
                this.templatePath('.gitignore'),
                this.destinationPath('.gitignore'), 
                { }
            );
            this.fs.copyTpl(
                this.templatePath('package.json'),
                this.destinationPath('package.json'), 
                { }
            );
            this.fs.copyTpl(
                this.templatePath('host.json'),
                this.destinationPath('host.json'), 
                {
                    "uniqueId": uuid.v4().replace(/-/g, "")
                }
            );
         },
         writeHostFiles: function() {
            this.fs.copyTpl(
                this.templatePath('.secrets'),
                this.destinationPath('.secrets'), 
                { }
            );  
            this.fs.copyTpl(
                this.templatePath('.gitignore'),
                this.destinationPath('.gitignore'), 
                { }
            );
         }
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