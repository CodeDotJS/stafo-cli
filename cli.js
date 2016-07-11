#!/usr/bin/env node
'use strict';

const stafo = require('stafo');
const chalk = require('chalk');
const ora = require('ora');
const logUpdate = require('log-update');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({pkg}).notify();

const spinner = ora();

const arg = process.argv[2];
const pre = `${chalk.bold.cyan('›')} `;

if (!arg || arg === '-h') {
	console.log(`
 ${chalk.cyan('Usage   :')} stafo <${chalk.bold('username/repository')}>

 ${chalk.cyan('Example :')} stafo CodeDotJS/kote   ${chalk.dim('[user]')}
 	   stafo facebook/reactjs ${chalk.dim('[organization]')}
	`);
}

if (arg) {
	logUpdate();
	spinner.start();
	spinner.text = chalk.dim(`Fetching stars and forks on ${chalk.bold(arg)}`);
	stafo.repo(arg).then(user => {
		const inf = [];
		const repoCount = (prefix, key) => {
			if (user[key]) {
				inf.push(`${prefix} : ${user[key]}`);
			}
		};
		logUpdate();
		repoCount(`${pre} Stars`, 'star');
		repoCount(`${pre} Forks`, 'fork');
		console.log(inf.join('\n'));
		console.log();
		spinner.stop();
	});
}
