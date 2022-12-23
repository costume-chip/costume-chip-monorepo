import { CommandInfo } from "./command-info";
import { CommandType } from "./command-type";

export interface UpdateRuntimeModuleSettingsCommandInfo extends CommandInfo {
  type: CommandType.UpdateRuntimeModuleSettings;
  moduleName: string;
  moduleSettings: unknown;
};