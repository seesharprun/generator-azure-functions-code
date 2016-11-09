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
                        message : 'Provide a name for your function'
                    }]).then(function (answers) {
                        this.options.name = answers.name;
                    }.bind(this));
            }
        },
        logIntro: function () {            
            this.log('─────────────────────');
            this.log('Creating New Azure Functions app');  
            this.log('Folder: ./' + this.options.name + '/');     
            this.log('─────────────────────');
        }
    },
    writing: {
         writeFunctionFiles: function() {
            this.fs.copyTpl(
                this.templatePath('index.js'),
                this.destinationPath(this.options.name + '/index.js'), 
                { }
            );
            this.fs.copyTpl(
                this.templatePath('function.json'),
                this.destinationPath(this.options.name + '/function.json'), 
                { }
            );
         }
    }
});