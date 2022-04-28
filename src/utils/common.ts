import chalk from "chalk";
import { log } from "console";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

export interface PackageJSON {
    name: string;
    version: string;
    description: string;
    scripts: {
      [key: string]: string;
    };
  }
  
  export interface JSON {
    [key: string]: unknown;
  }


export const isExistFolder = (name: string)=>{
    // 文件路径
    const file = getPath(name);
    // 验证文件是否已经存在，存在则推出进程
    if (existsSync(file)) {
        log(chalk.red(`${file} 已经存在!`));
        process.exit(1);
        return true
    }   
    return false
}

export const getPath = (name: string)=>{
    return resolve(process.cwd(), name)
}

/**
 * 读取指定路径下 json 文件
 * @param filename json 文件的路径
 */
 export function readJsonFile<T>(filename: string): T {
  return JSON.parse(readFileSync(filename, { encoding: 'utf-8'}));
}

/**
 * 覆写指定路径下的 json 文件
 * @param filename json 文件的路径
 * @param content  json 内容
 */
export function writeJsonFile<T>(filename: string, content: T): void {
  writeFileSync(filename, JSON.stringify(content, null, 2));
}

// const exec = (c: ())=>{
//   return new Promise((resolve, reject)=>{
//     try{

//     } catch (e){
//       reject(e)
//     }
//   })
// }