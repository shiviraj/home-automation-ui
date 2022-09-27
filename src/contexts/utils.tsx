export interface DeviceInterface {
  _id: string,
  location: string,
  name: string,
  number: number,
  mode: "OUTPUT" | "INPUT",
  type: "DIGITAL" | "ANALOG",
  control: "ENABLED" | "DISABLED",
  value: number
}

export enum State {
  OFF, ON
}

const getDeviceValue = (device: Record<string, any>, key: string): string => device[key]

const getAllUniqueDevices = (devices: Array<DeviceInterface>) => {
  return devices.reduce((allUniqueDevices, device) => {
    if (allUniqueDevices.every((uniqueDevice) => uniqueDevice._id !== device._id)) {
      allUniqueDevices.push(device)
    }
    return allUniqueDevices
  }, [] as Array<DeviceInterface>);
};

const deepSortDevices = (devices: Record<string, Array<DeviceInterface>>) => {
  const keys = Object.keys(devices).sort()
  return keys.reduce((sortedDevices, key) => {
    sortedDevices[key] = devices[key].sort((d1, d2) => {
      if (d1.mode < d2.mode || d1.name > d2.name || (d1.name === d2.name && d1.number > d2.number)) {
        return 1
      }
      return -1
    })
    return sortedDevices
  }, {} as Record<string, Array<DeviceInterface>>)
};

export const sortDevices = (devices: Array<DeviceInterface>, key: string) => {
  const allDevices = getAllUniqueDevices(devices)

  const sortedDevices = allDevices.reduce((allDevices, device) => {
    const keyName = getDeviceValue(device, key)!

    if (!allDevices.hasOwnProperty(keyName)) {
      allDevices[keyName] = [];
    }
    allDevices[keyName].push(device);
    return allDevices
  }, {} as Record<string, Array<DeviceInterface>>)

  return deepSortDevices(sortedDevices)
};

export const formatMessage = (data: any | null) => {
  try {
    return JSON.parse(data)
  } catch (error) {
    return null
  }
}
