import fetch from 'node-fetch';

import { DeviceCommandInfo } from 'costume-chip-device-service-protocol';

import { getHubBackendUrl } from './get-hub-backend-url';
import { DeviceSessionInfo } from './device-session-info';

export const fetchDeviceSessionNextPendingCommandInfoAsync = async ({
  deviceSessionInfo,
}: {
  deviceSessionInfo: DeviceSessionInfo;
}) => {

  const hubBackendUrl = getHubBackendUrl();

  const requestUrl = new URL(hubBackendUrl);
  requestUrl.pathname = `/fetch-device-session-next-pending-command-info`;
  requestUrl.searchParams.append(
    `deviceSessionId`,
    deviceSessionInfo.id,
  );
  requestUrl.searchParams.append(
    `deviceSessionAccessToken`,
    deviceSessionInfo.accessToken
  );

  const requestResponse = await fetch(requestUrl.href);

  const requestResponseBody = await requestResponse.json();

  if (requestResponse.status !== 200) {

    throw new Error(requestResponseBody);
  }

  const requestSuccessResponseBody = requestResponseBody as (
    | null
    | DeviceCommandInfo
  );

  if (requestSuccessResponseBody === null) {

    return undefined;
  }

  return requestSuccessResponseBody;
}