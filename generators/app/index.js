"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
    async prompting () {
        const prompts = [
            {
                type: "input",
                name: "appName",
                message: "Please, enter your app name:"
            }, {
                type: "input",
                name: "appDescription",
                message: "Please, enter your app description"
            }
        ];

        const props = await this.prompt(prompts);
        this.props = props;
    }

    writing() {
        const pkgJson = {
            "name": this.props.appName,
            "description": this.props.appDescription,
            "version": "1.0.0",
            "license": "MIT",
            "scripts": {
                "start": "parcel public/index.html --open",
                "build": "rm -R -f dist .cache && parcel build public/index.html --no-source-maps"
            }
        }

        this.fs.copyTpl(
            this.templatePath("**/*"),
            this.destinationPath(this.props.appName),
            this.props
        );

        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    }

    install () {
        this.npmInstall(
            [
                'react',
                'react-dom'
            ],
            { cwd: this.props.appName }
        );
        this.npmInstall(
            [
                'typescript',
                '@types/react',
                '@types/react-dom'
            ], 
            { cwd: this.props.appName, "save-dev": true }
        )
    }
}