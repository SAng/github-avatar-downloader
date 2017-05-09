var request = require('request');
var fs = require('fs');
var repoOwner = process.argv[2];
var repoName = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = 'boomerandzapper';
var GITHUB_TOKEN = 'fb2211804cddbe1adfa17b53f17c8260b01fe140';


function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('end', function() {
         console.log('Download complete.');
       })
       .pipe(fs.createWriteStream(filePath));
}


function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };
  request(options, function(err, response, body) {
    if (err) { throw err; }
    cb(err, (JSON.parse(body)));
  });
}

getRepoContributors(repoOwner, repoName, function(err, result) {
  if (!repoOwner && !repoName) {
    console.log('Please specify Repo Owner and Repo Name');
    return;
  }
  !err ? errmsg = "none" : errmsg = err;
  console.log("Errors:", errmsg);
  result.forEach(function (result) {
    downloadImageByURL(result.avatar_url, 'avatars/' + result.login + '.jpg');
  });
});



