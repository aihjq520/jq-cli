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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const create_1 = __importDefault(require("./order/create"));
commander_1.program.version(`${require('../package.json').version}`, '-v --version')
    .usage('<command> [options]');
commander_1.program.command('create <app-name>')
    .description('Create new project from => jq-cli create yourProjectName')
    .action((name) => __awaiter(void 0, void 0, void 0, function* () {
    // 创建命令具体做的事情都在这里，name 是你指定的 <app-name>
    yield (0, create_1.default)(name);
}));
commander_1.program.parse(process.argv);
