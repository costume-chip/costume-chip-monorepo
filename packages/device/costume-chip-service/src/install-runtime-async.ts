import { spawn } from "child_process";

import { RuntimeConfig } from "costume-chip-service-protocol";

import { getServiceArgs } from "./get-service-args";
import { createRuntimePackageDir } from "./create-runtime-package-dir";
import { writeRuntimePackageInfoFile } from "./write-runtime-package-info-file";
import { writeRuntimeMainScriptFile } from "./write-runtime-main-script-file";
import { updateRuntimeConfig } from "./update-runtime-config";

export const installRuntimeAsync = async ({
  runtimeConfig,
}: {
  runtimeConfig: RuntimeConfig,
}) => {

  const serviceArgs = getServiceArgs();

  createRuntimePackageDir();

  writeRuntimePackageInfoFile({
    runtimeConfig,
  });

  const yarnInstallRuntimePackageProcess = spawn(
    `yarn`,
    {
      shell: true,
      cwd: serviceArgs.runtimePackageDirPath,
      stdio: `inherit`,
    },
  );

  await new Promise<void>((resolvePromise, rejectPromise) => {

    yarnInstallRuntimePackageProcess.on(`exit`, (code) => {

      if (code === 0) {

        resolvePromise();

      } else {

        rejectPromise(new Error());
      }
    });
  });

  writeRuntimeMainScriptFile({
    runtimeConfig,
  });

  updateRuntimeConfig({
    runtimeConfig,
  });
};