var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = 'boomerandzapper';
var GITHUB_TOKEN = 'fb2211804cddbe1adfa17b53f17c8260b01fe140';

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

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  result.forEach(function (result) {
    console.log(result.avatar_url);
  });
});

function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .pipe(fs.createWriteStream(filePath));
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");