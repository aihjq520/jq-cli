"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeJsonFile = exports.readJsonFile = exports.getPath = exports.isExistFolder = void 0;
const chalk_1 = __importDefault(require("chalk"));
const console_1 = require("console");
const fs_1 = require("fs");
const path_1 = require("path");
const isExistFolder = (name) => {
    // 文件路径
    const file = (0, exports.getPath)(name);
    // 验证文件是否已经存在，存在则推出进程
    if ((0, fs_1.existsSync)(file)) {
        (0, console_1.log)(chalk_1.default.red(`${file} 已经存在!`));
        process.exit(1);
        return true;
    }
    return false;
};
exports.isExistFolder = isExistFolder;
const getPath = (name) => {
    return (0, path_1.resolve)(process.cwd(), name);
};
exports.getPath = getPath;
/**
 * 读取指定路径下 json 文件
 * @param filename json 文件的路径
 */
function readJsonFile(filename) {
    return JSON.parse((0, fs_1.readFileSync)(filename, { encoding: 'utf-8' }));
}
exports.readJsonFile = readJsonFile;
/**
 * 覆写指定路径下的 json 文件
 * @param filename json 文件的路径
 * @param content  json 内容
 */
function writeJsonFile(filename, content) {
    (0, fs_1.writeFileSync)(filename, JSON.stringify(content, null, 2));
}
exports.writeJsonFile = writeJsonFile;
// const exec = (c: ())=>{
//   return new Promise((resolve, reject)=>{
//     try{
//     } catch (e){
//       reject(e)
//     }
//   })
// }
