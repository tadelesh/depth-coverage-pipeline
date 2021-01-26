"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var rest_1 = require("@octokit/rest");
var globby_1 = require("globby");
var path_1 = require("path");
var fs_extra_1 = require("fs-extra");
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var octo, ORGANIZATION, REPO, repos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                octo = new rest_1["default"]({
                    auth: process.env.PERSONAL_ACESSS_TOKEN
                });
                ORGANIZATION = 'azure';
                REPO = "depth-coverage-pipeline";
                return [4 /*yield*/, octo.repos.listForOrg({
                        org: ORGANIZATION
                    })];
            case 1:
                repos = _a.sent();
                if (!!repos.data.map(function (repo) { return repo.name; }).includes(REPO)) return [3 /*break*/, 3];
                return [4 /*yield*/, createRepo(octo, ORGANIZATION, REPO)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: 
            /**
             * my-local-folder has files on its root, and subdirectories with files
             */
            return [4 /*yield*/, uploadToRepo(octo, "./generated", ORGANIZATION, REPO)];
            case 4:
                /**
                 * my-local-folder has files on its root, and subdirectories with files
                 */
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
main();
var createRepo = function (octo, org, name) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, octo.repos.createInOrg({ org: org, name: name, auto_init: true })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var uploadToRepo = function (octo, coursePath, org, repo, branch) {
    if (branch === void 0) { branch = "master"; }
    return __awaiter(void 0, void 0, void 0, function () {
        var currentCommit, filesPaths, filesBlobs, pathsForBlobs, newTree, commitMessage, newCommit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getCurrentCommit(octo, org, repo, branch)];
                case 1:
                    currentCommit = _a.sent();
                    return [4 /*yield*/, globby_1["default"](coursePath)];
                case 2:
                    filesPaths = _a.sent();
                    return [4 /*yield*/, Promise.all(filesPaths.map(createBlobForFile(octo, org, repo)))];
                case 3:
                    filesBlobs = _a.sent();
                    pathsForBlobs = filesPaths.map(function (fullPath) { return path_1["default"].relative(coursePath, fullPath); });
                    return [4 /*yield*/, createNewTree(octo, org, repo, filesBlobs, pathsForBlobs, currentCommit.treeSha)];
                case 4:
                    newTree = _a.sent();
                    commitMessage = "My commit message";
                    return [4 /*yield*/, createNewCommit(octo, org, repo, commitMessage, newTree.sha, currentCommit.commitSha)];
                case 5:
                    newCommit = _a.sent();
                    return [4 /*yield*/, setBranchToCommit(octo, org, repo, branch, newCommit.sha)];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};
var getCurrentCommit = function (octo, org, repo, branch) {
    if (branch === void 0) { branch = 'main'; }
    return __awaiter(void 0, void 0, void 0, function () {
        var refData, commitSha, commitData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, octo.git.getRef({
                        owner: org,
                        repo: repo,
                        ref: "heads/" + branch
                    })];
                case 1:
                    refData = (_a.sent()).data;
                    commitSha = refData.object.sha;
                    return [4 /*yield*/, octo.git.getCommit({
                            owner: org,
                            repo: repo,
                            commit_sha: commitSha
                        })];
                case 2:
                    commitData = (_a.sent()).data;
                    return [2 /*return*/, {
                            commitSha: commitSha,
                            treeSha: commitData.tree.sha
                        }];
            }
        });
    });
};
// Notice that readFile's utf8 is typed differently from Github's utf-8
var getFileAsUTF8 = function (filePath) { return fs_extra_1.readFile(filePath, 'utf8'); };
var createBlobForFile = function (octo, org, repo) { return function (filePath) { return __awaiter(void 0, void 0, void 0, function () {
    var content, blobData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getFileAsUTF8(filePath)];
            case 1:
                content = _a.sent();
                return [4 /*yield*/, octo.git.createBlob({
                        owner: org,
                        repo: repo,
                        content: content,
                        encoding: 'utf-8'
                    })];
            case 2:
                blobData = _a.sent();
                return [2 /*return*/, blobData.data];
        }
    });
}); }; };
var createNewTree = function (octo, owner, repo, blobs, paths, parentTreeSha) { return __awaiter(void 0, void 0, void 0, function () {
    var tree, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tree = blobs.map(function (_a, index) {
                    var sha = _a.sha;
                    return ({
                        path: paths[index],
                        mode: "100644",
                        type: "blob",
                        sha: sha
                    });
                });
                return [4 /*yield*/, octo.git.createTree({
                        owner: owner,
                        repo: repo,
                        tree: tree,
                        base_tree: parentTreeSha
                    })];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
        }
    });
}); };
var createNewCommit = function (octo, org, repo, message, currentTreeSha, currentCommitSha) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, octo.git.createCommit({
                    owner: org,
                    repo: repo,
                    message: message,
                    tree: currentTreeSha,
                    parents: [currentCommitSha]
                })];
            case 1: return [2 /*return*/, (_a.sent()).data];
        }
    });
}); };
var setBranchToCommit = function (octo, org, repo, branch, commitSha) {
    if (branch === void 0) { branch = "main"; }
    return octo.git.updateRef({
        owner: org,
        repo: repo,
        ref: "heads/" + branch,
        sha: commitSha
    });
};
