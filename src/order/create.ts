
import { isExistFolder } from '../utils/common';
import * as shell from 'shelljs'
import { changeCiConfigInfo, changePackageInfo, getBranch, getK8SInfo} from '../utils/create';
import fse from 'fs'
import ora from 'ora';
import chalk =  require('chalk')
import { execSync } from 'child_process';
import path = require('path');

const create = async(name :string)=>{
    isExistFolder(name)
    const k8sInfo = await getK8SInfo()
    const branch  = await getBranch()
    shell.exec(`mkdir ${name}`)
    shell.cd(name);
    downloadTemplate(branch)
    moveFile()
    changePackageInfo(name)
    changeCiConfigInfo(name,k8sInfo);
    // initProject()
}

const downloadTemplate =async (branch: string)=>{
    // log.info("开始下载模板");
    //git模块的地址
    const dlSpinner = ora(chalk.cyan('Downloading template...'))
    try{
        dlSpinner.start()
        execSync(`git clone -b ${branch} git@newgitlab.com:pro-frontend/base-template.git`, {cwd: process.cwd(), // path to where you want to save the file
    });
    } catch (err){
        dlSpinner.text = chalk.red(`Download template failed. ${err}`)
        // 终止等待动画并显示 X 标志
        dlSpinner.fail()
        process.exit()
    }
    // 下载成功时提示
    dlSpinner.text = 'Download template successful.'
    // 终止等待动画并显示 ✔ 标志
    dlSpinner.succeed()
}


const moveFile =async ()=>{
    const rootPath = path.resolve(process.cwd(),'base-template')
    shell.rm('-rf',path.resolve(rootPath, '.git'));
    const files = fse.readdirSync(rootPath)
    for (let index = 0; index < files.length; index++) {
        const p = files[index];
        const targetFile = path.resolve(rootPath,p)
        if(isDirectory(targetFile)){
            shell.cp('-rf', targetFile + '/', './')
        }else{
            shell.cp('-f', targetFile,'./')
        }
    }
    shell.rm('-rf',rootPath);
  }

function isDirectory(fileName: string) {
    const stat = fse.lstatSync(fileName);
    return stat.isDirectory()
}

export default create