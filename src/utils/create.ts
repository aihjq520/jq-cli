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
