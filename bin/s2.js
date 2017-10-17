#!/Users/jlaster/.nvm/versions/node/v8.5.0/bin/node

const inquirer = require("inquirer");

const { getConfig, updateConfig } = require("../src/config");
const cmds = require("../index");

const tasks = {
  "Create release": cmds.createRelease,
  "Update release": cmds.updateRelease,
  "View current bug": cmds.viewBug,
  "View current try run": cmds.viewTry,
  "Remove GH Branches": cmds.pruneGHBranches,
  "Remove MC Branches": cmds.pruneMCBranches,
  "Publish Patch": cmds.publishPatch
};

const taskCmd = {
  "-c": cmds.createRelease,
  "-u": cmds.updateRelease,
  "-p": cmds.publishPatch,
  "-b": cmds.viewBug,
  "-t": cmds.viewTry
};

function start() {
  if (process.argv.length > 2) {
    const task = process.argv[2];
    const params = process.argv.slice(3);
    return taskCmd[task](config, params);
  }

  inquirer
    .prompt([
      {
        type: "list",
        name: "task",
        message: "Ship 2 MC",
        choices: Object.keys(tasks)
      }
    ])
    .then(answers => tasks[answers.task](config));
}

let config = getConfig();
start();
