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
const common_1 = require("../utils/common");
const shell = __importStar(require("shelljs"));
const create_1 = require("../utils/create");
const fs_1 = __importDefault(require("fs"));
const ora_1 = __importDefault(require("ora"));
const chalk = require("chalk");
const child_process_1 = require("child_process");
const path = require("path");
const create = (name) => __awaiter(void 0, void 0, void 0, function* () {
    (0, common_1.isExistFolder)(name);
    const k8sInfo = yield (0, create_1.getK8SInfo)();
    shell.exec(`mkdir ${name}`);
    shell.cd(name);
    downloadTemplate();
    moveFile();
    (0, create_1.changePackageInfo)(name);
    (0, create_1.changeCiConfigInfo)(name, k8sInfo);
    // initProject()
});
const downloadTemplate = () => __awaiter(void 0, void 0, void 0, function* () {
    // log.info("开始下载模板");
    //git模块的地址
    const dlSpinner = (0, ora_1.default)(chalk.cyan('Downloading template...'));
    try {
        dlSpinner.start();
        (0, child_process_1.execSync)("git clone git@newgitlab.com:pro-frontend/base-template.git", { cwd: process.cwd(), // path to where you want to save the file
        });
    }
    catch (err) {
        dlSpinner.text = chalk.red(`Download template failed. ${err}`);
        // 终止等待动画并显示 X 标志
        dlSpinner.fail();
        process.exit();
    }
    // 下载成功时提示
    dlSpinner.text = 'Download template successful.';
    // 终止等待动画并显示 ✔ 标志
    dlSpinner.succeed();
});
const moveFile = () => __awaiter(void 0, void 0, void 0, function* () {
    const rootPath = path.resolve(process.cwd(), 'base-template');
    shell.rm('-rf', path.resolve(rootPath, '.git'));
    const files = fs_1.default.readdirSync(rootPath);
    for (let index = 0; index < files.length; index++) {
        const p = files[index];
        const targetFile = path.resolve(rootPath, p);
        if (isDirectory(targetFile)) {
            shell.cp('-rf', targetFile + '/', './');
        }
        else {
            shell.cp('-f', targetFile, './');
        }
    }
    shell.rm('-rf', rootPath);
});
function isDirectory(fileName) {
    const stat = fs_1.default.lstatSync(fileName);
    return stat.isDirectory();
}
exports.default = create;
