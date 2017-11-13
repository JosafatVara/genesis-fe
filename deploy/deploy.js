const git = require('simple-git')('./deploy/');

git.listRemote(['--get-url'], (err, data) => {
    if (!err) {
        console.log('Remote url for repository at ' + __dirname + ':');
        console.log(data);
    }
});
