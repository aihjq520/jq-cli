"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBranch = exports.getK8SInfo = exports.changeCiConfigInfo = exports.changePackageInfo = void 0;
const common_1 = require("./common");
const inquirer_1 = __importDefault(require("inquirer"));
const fs = __importStar(require("fs"));
function changePackageInfo(projectName) {
    const packageJSON = (0, common_1.readJsonFile)("./package.json");
    packageJSON.name = packageJSON.description = projectName;
    (0, common_1.writeJsonFile)("./package.json", packageJSON);
}
exports.changePackageInfo = changePackageInfo;
function changeCiConfigInfo(name, info) {
    let content = String(fs.readFileSync("./.gitlab-ci.yml"));
    const { port, namespace } = info;
    content = content
        .replace(/_projectName/g, name)
        .replace(/_namespace/g, namespace)
        .replace(/_portDev/g, port)
        .replace(/_portTest/g, (Number(port) + 1).toString());
    fs.writeFileSync("./.gitlab-ci.yml", content);
}
exports.changeCiConfigInfo = changeCiConfigInfo;
function getK8SInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        const namespace = yield inquirer_1.default.prompt([
            {
                type: "input",
                name: "namespace",
                message: "K8S namespace",
            },
        ]);
        const port = yield inquirer_1.default.prompt([
            {
                type: "input",
                name: "port",
                message: "K8S dev port(test port add one)",
            },
        ]);
        return { namespace: namespace.namespace, port: port.port };
    });
}
exports.getK8SInfo = getK8SInfo;
function getBranch() {
    return __awaiter(this, void 0, void 0, function* () {
        let TemplateType;
        (function (TemplateType) {
            TemplateType["H5"] = "h5";
            TemplateType["Main"] = "admin";
        })(TemplateType || (TemplateType = {}));
        const map = {
            [TemplateType.H5]: 'main',
            [TemplateType.Main]: 'admin-template'
        };
        const info = yield inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'branch',
                message: 'Which template do you want to create?',
                choices: [
                    TemplateType.H5,
                    // 'web',
                    TemplateType.Main
                ],
            },
        ]);
        return map[info.branch];
    });
}
exports.getBranch = getBranch;
