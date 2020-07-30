'use strict';

var fs = require('fs');
var path = require('path');

/*! *****************************************************************************
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
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
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
];
var commentPatterns = new Map(languages.flatMap(function (language) { return language.extensions.map(function (extension) { return [extension, language]; }); }));

/* eslint-disable jsdoc/require-param */
var TemplateFile = /** @class */ (function () {
    function TemplateFile(path$1, options) {
        if (options === void 0) { options = {}; }
        this.path = path$1;
        var pattern = options.commentPattern || commentPatterns.get(path.extname(this.path));
        this.commentBounds = pattern.pattern;
        this.newlinesBetweenMarkers = pattern.wrap || false;
    }
    TemplateFile.prototype.getContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.content) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, fs.promises.readFile(this.path, 'utf8')];
                    case 1:
                        _a.content = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.content];
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
                        markers = [this.comment("BEGIN " + name), this.comment("END " + name)];
                        pattern = new RegExp("(" + markers[0] + ")([\\s\\S]*)(" + markers[1] + ")");
                        match = content.match(pattern);
                        if (!match) {
                            throw new Error("Template section '" + name + "' not found in file '" + this.path + "'.\n  (Searched for " + markers.join('...') + ")");
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
    TemplateFile.prototype.updateSection = function (name, replacement) {
        return __awaiter(this, void 0, void 0, function () {
            var content, markers, pattern, between, sectionContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getContent()];
                    case 1:
                        content = _a.sent();
                        markers = [this.comment("BEGIN " + name), this.comment("END " + name)];
                        pattern = new RegExp("(" + markers[0] + ")([\\s\\S]*)(" + markers[1] + ")");
                        if (!pattern.test(content)) {
                            throw new Error("Template section '" + name + "' not found in file '" + this.path + "'.\n  (Searched for " + markers.join('...') + ")");
                        }
                        between = this.newlinesBetweenMarkers ? [''] : [];
                        sectionContent = __spreadArrays([
                            markers[0],
                            this.comment('This section is generated, do not edit it!')
                        ], between, [
                            replacement
                        ], between, [
                            markers[1],
                        ]).join('\n');
                        this.content = content.replace(pattern, sectionContent);
                        return [2 /*return*/, content];
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
    return TemplateFile;
}());

module.exports = TemplateFile;
