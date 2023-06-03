'use strict';

var fs = require('fs');
var path = require('path');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var languages = [
    {
        extensions: ['.html', '.htm'],
        pattern: ['<!--', '-->']
    },
    {
        extensions: ['.md', '.markdown'],
        pattern: ['<!--', '-->'],
        wrap: true
    },
    {
        extensions: ['.js', '.ts'],
        pattern: ['/*', '*/']
    },
    {
        extensions: ['.yml', '.yaml'],
        pattern: ['#', '#']
    },
];
var commentPatterns = new Map(languages.flatMap(function (language) { return language.extensions.map(function (extension) { return [extension, language]; }); }));

/* eslint-disable jsdoc/require-param */
var TemplateFile = /** @class */ (function () {
    function TemplateFile(path$1, options) {
        if (options === void 0) { options = {}; }
        var _a;
        this.path = path$1;
        this.options = options;
        this.isCreated = false;
        var pattern = options.commentPattern || commentPatterns.get(path.extname(this.path));
        if (!pattern) {
            throw new Error("Unknown template extension '".concat(path.extname(this.path), "' - Please provide a comment pattern"));
        }
        this.commentBounds = pattern.pattern;
        this.newlinesBetweenMarkers = pattern.wrap || false;
        // Insert default options
        this.options.create = (_a = this.options.create) !== null && _a !== void 0 ? _a : true;
    }
    TemplateFile.prototype.getContent = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _d, error_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!(((_a = this.content) !== null && _a !== void 0 ? _a : null) === null)) return [3 /*break*/, 4];
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 3, , 4]);
                        _d = this;
                        return [4 /*yield*/, fs.promises.readFile(this.path, 'utf8')];
                    case 2:
                        _d.content = _e.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _e.sent();
                        if (this.options.create && error_1.code === 'ENOENT') {
                            this.isCreated = true;
                            (_c = (_b = this.options).onCreate) === null || _c === void 0 ? void 0 : _c.call(_b, this);
                            return [2 /*return*/, (this.content = '')];
                        }
                        throw error_1;
                    case 4: return [2 /*return*/, this.content];
                }
            });
        });
    };
    TemplateFile.prototype.comment = function (content) {
        var template = this.commentBounds;
        return [template[0], content, template[1]].join(' ');
    };
    TemplateFile.prototype.findSection = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var content, markers, pattern, match;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getContent()];
                    case 1:
                        content = _a.sent();
                        markers = [this.comment("BEGIN ".concat(name)), this.comment("END ".concat(name))];
                        pattern = new RegExp("(".concat(markers[0], ")([\\s\\S]*)(").concat(markers[1], ")"));
                        match = content.match(pattern);
                        if (!match) {
                            throw new Error("Template section '".concat(name, "' not found in file '").concat(this.path, "'.\n  (Searched for ").concat(markers.join('...'), ")"));
                        }
                        return [2 /*return*/, match];
                }
            });
        });
    };
    TemplateFile.prototype.getSection = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var match;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findSection(name)];
                    case 1:
                        match = _a.sent();
                        return [2 /*return*/, match[2].trim()];
                }
            });
        });
    };
    TemplateFile.prototype.updateSection = function (name, replacement, notice) {
        return __awaiter(this, void 0, void 0, function () {
            var markers, pattern, between, sectionContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getContent()];
                    case 1:
                        _a.sent();
                        markers = [this.comment("BEGIN ".concat(name)), this.comment("END ".concat(name))];
                        pattern = new RegExp("(".concat(markers[0], ")([\\s\\S]*)(").concat(markers[1], ")"));
                        if (!pattern.test(this.content)) {
                            if (this.isCreated) {
                                this.content += "".concat(markers.join('...'), "\n");
                            }
                            else {
                                throw new Error("Template section '".concat(name, "' not found in file '").concat(this.path, "'.\n  (Searched for ").concat(markers.join('...'), ")"));
                            }
                        }
                        between = this.newlinesBetweenMarkers ? [''] : [];
                        sectionContent = __spreadArray(__spreadArray(__spreadArray(__spreadArray([
                            markers[0],
                            this.comment(notice || this.notice || TemplateFile.defaultNotice)
                        ], between, true), [
                            replacement
                        ], false), between, true), [
                            markers[1],
                        ], false).join('\n');
                        return [2 /*return*/, (this.content = this.content.replace(pattern, sectionContent))];
                }
            });
        });
    };
    TemplateFile.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = fs.promises).writeFile;
                        _c = [this.path];
                        return [4 /*yield*/, this.getContent()];
                    case 1: return [2 /*return*/, _b.apply(_a, _c.concat([_d.sent()]))];
                }
            });
        });
    };
    // Convenience API
    /** Reads and returns a section in the given file. */
    TemplateFile.getSection = function (path, name) {
        return new TemplateFile(path).getSection(name);
    };
    /** Replaces a section in the given file and saves it. */
    TemplateFile.updateSection = function (path, name, replacement) {
        return __awaiter(this, void 0, void 0, function () {
            var file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        file = new this(path);
                        return [4 /*yield*/, file.updateSection(name, replacement)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, file.save()];
                }
            });
        });
    };
    TemplateFile.defaultNotice = 'This section is generated, do not edit it!';
    return TemplateFile;
}());

module.exports = TemplateFile;
