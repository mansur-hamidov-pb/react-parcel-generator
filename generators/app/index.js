"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

const baseModules = [
	'react',
	'react-dom',
	'moment',
	'big.js',
	'node-sass',
];

const baseDevModules = [
	'typescript',
	'@types/react',
	'@types/react-dom',
	'parcel-bundler',
];

module.exports = class extends Generator {
	async prompting() {
		this.log(
            yosay(
                `Welcome to the cool ${chalk.red(
                    "generator-parcel-web-app"
                )} generator!`
            )
        );

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
		props.appName = props.appName.replace(/ /g, '-')
		this.props = props;
	}

	writing() {
		this.fs.copyTpl(
			this.templatePath("**/*"),
			this.destinationPath(this.props.appName),
			this.props
		);
	}

	install() {
		process.chdir(process.cwd() + '/' + this.props.appName);

		this.npmInstall(baseModules);
		this.npmInstall(baseDevModules, { "save-dev": true })
	}

	end() {
        this.spawnCommand("npm", ["start"]);
    }
}