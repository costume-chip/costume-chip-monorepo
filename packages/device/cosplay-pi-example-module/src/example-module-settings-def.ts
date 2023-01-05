import { DeviceRuntimeModuleSettingsDef } from 'costume-chip-device-runtime-module-settings';

import { ExampleModuleSettings } from './example-module-settings';

export const exampleModuleSettingsDef: DeviceRuntimeModuleSettingsDef<ExampleModuleSettings> = {
  name: `costume-chip-example-module`,
  defaultSettings: {
    message: `Hello, world!`,
  },
};