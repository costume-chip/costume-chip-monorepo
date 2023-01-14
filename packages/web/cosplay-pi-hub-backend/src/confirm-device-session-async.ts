import { DeviceSessionStatus } from "@prisma/client";
import {
  ConfirmDeviceSessionAsync,
  DeviceSessionAccessTokenIsNotValid,
  DeviceSessionDoesNotExist,
  DeviceSessionIsAlreadyConfirmed,
  DeviceSessionIsAlreadyRejected,
} from "cosplay-pi-device-hub-backend-protocol";

import { $exportHubBackendAsyncFunc } from "./$export-hub-backend-async-func";
import { prismaClient } from "./prisma-client";

$exportHubBackendAsyncFunc<ConfirmDeviceSessionAsync>(
  `confirm-device-session`,
  async ({
    deviceSessionId,
    deviceSessionAccessToken,
  }) => {

    const deviceSessionLastDbInfo = await prismaClient.deviceSession.findFirst({
      where: {
        id: deviceSessionId,
      },
    });

    if (
      deviceSessionLastDbInfo === null
    ) {

      throw new DeviceSessionDoesNotExist();
    }

    if (
      deviceSessionLastDbInfo.accessToken !== deviceSessionAccessToken
    ) {

      throw new DeviceSessionAccessTokenIsNotValid();
    }

    if (
      deviceSessionLastDbInfo.status === DeviceSessionStatus.Confirmed
    ) {

      throw new DeviceSessionIsAlreadyConfirmed();
    }

    if (
      deviceSessionLastDbInfo.status === DeviceSessionStatus.Rejected
    ) {

      throw new DeviceSessionIsAlreadyRejected();
    }

    const deviceId = deviceSessionLastDbInfo.deviceId;

    await prismaClient.$transaction([
      prismaClient.deviceSession.update({
        where: {
          id: deviceSessionId,
        },
        data: {
          status: DeviceSessionStatus.Confirmed,
          lastActivityDateTime: new Date(),
        },
      }),
      prismaClient.device.update({
        where: {
          id: deviceId,
        },
        data: {
          activeSessionId: deviceSessionId,
        },
      }),
    ]);
  },
);