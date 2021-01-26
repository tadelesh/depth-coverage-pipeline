// class CodeGenApp {
//     const express = require('express');
//     const app = this.express();
//     app.get('/', function (req, res) {
//         res.send('hello world')
//     });
//     app.listen(3000);
// }
var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.send("hello world");
});
app.listen(3000);
app.get('/PullRequest', function (req, res) {
    res.send("<html><a href=\"https://github.com/Azure/depth-coverage-pipeline/pull/21\">pull request</a><html>");
});
