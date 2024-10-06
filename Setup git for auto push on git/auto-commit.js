const { exec } = require('child_process');
const chokidar = require('chokidar');

const watcher = chokidar.watch('.', {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
});

watcher.on('all', (event, path) => {
  exec('git add . && git commit -m "Auto-commit: changes made"', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error committing changes: ${stderr}`);
      return;
    }
    console.log(stdout);
  });
});
