import { PackageJSON, readJsonFile, writeJsonFile } from "./common";
import inquirer from "inquirer";
import * as fs from "fs";

interface ChangeCiType {
  namespace: string;
  port: string;
}

export function changePackageInfo(projectName: string): void {
  const packageJSON: PackageJSON = readJsonFile<PackageJSON>("./package.json");
  packageJSON.name = packageJSON.description = projectName;
  writeJsonFile<PackageJSON>("./package.json", packageJSON);
}

export function changeCiConfigInfo(name: string, info: ChangeCiType): void {
  let content = String(fs.readFileSync("./.gitlab-ci.yml"));
  const { port, namespace } = info;
  content = content
    .replace(/_projectName/g, name)
    .replace(/_namespace/g, namespace)
    .replace(/_portDev/g, port)
    .replace(/_portTest/g, (Number(port) + 1).toString());
  fs.writeFileSync("./.gitlab-ci.yml", content);
}

export function changeDeployInfo(name: string, info: ChangeCiType): void {
  let content = String(fs.readFileSync("./config/deploy.yaml"));
  const { namespace } = info;
  content = content
    .replace(/_projectName/g, name)
    .replace(/_namespace/g, namespace)
  fs.writeFileSync("./config/deploy.yaml", content);
}

export async function getK8SInfo() {
  const namespace = await inquirer.prompt<{ namespace: string }>([
    {
      type: "input",
      name: "namespace",
      message: "K8S namespace",
    },
  ]);

  const port = await inquirer.prompt<{ port: string }>([
    {
      type: "input",
      name: "port",
      message: "K8S dev port(test port add one)",
    },
  ]);

  return { namespace: namespace.namespace, port: port.port };
}

export async function getBranch() {
  enum TemplateType { H5 = 'h5', Main = 'admin' }
  const map = {
    [TemplateType.H5]: 'main',
    [TemplateType.Main]: 'admin-template'
  }
  const info = await inquirer.prompt<{ branch: TemplateType }>([
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
}
