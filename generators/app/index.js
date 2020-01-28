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
        this.fs.copyTpl(
            this.templatePath("**/*"),
            this.destinationPath(this.props.appName),
            this.props
        );
    }

    install () {
        process.chdir(process.cwd() + '/' + this.props.appName);

        this.npmInstall(
            [
                'react',
                'react-dom'
            ]
        );
        this.npmInstall(
            [
                'typescript',
                '@types/react',
                '@types/react-dom'
            ]
        )
    }
}