import { DeviceRuntimeConfig } from "costume-chip-service-protocol";

export const generateDeviceRuntimeMainScript = ({
  deviceRuntimeConfig,
}: {
  deviceRuntimeConfig: DeviceRuntimeConfig,
}) => {

  let deviceRuntimeMainScript = `setInterval(() => console.log('Hi'), 1000);\n`;

  for (const deviceRuntimeModuleName in deviceRuntimeConfig.modules) {

    deviceRuntimeMainScript += `require('${deviceRuntimeModuleName}');\n`;
  }

  return deviceRuntimeMainScript;
};
