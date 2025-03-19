import { useState, useEffect, useCallback } from 'react';
// Removed unnecessary import for BluetoothRemoteGATTCharacteristic

// Standard GATT characteristics for heart rate and temperature
const HEART_RATE_SERVICE = 0x180D;
const HEART_RATE_CHARACTERISTIC = 0x2A37;
const HEALTH_THERMOMETER_SERVICE = 0x1809;
const TEMPERATURE_CHARACTERISTIC = 0x2A1C;

interface SmartWatchData {
  heartRate: number | null;
  temperature: number | null;
}

export const useSmartwatch = () => {
  const [device, setDevice] = useState<BluetoothDevice | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState<SmartWatchData>({
    heartRate: null,
    temperature: null
  });

  const handleHeartRateNotification = (event: Event) => {
    const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
    if (!value) return;

    // Heart Rate Measurement is formatted according to GATT specification
    const flags = value.getUint8(0);
    const rate16Bits = flags & 0x1;
    let heartRate: number;
    if (rate16Bits) {
      heartRate = value.getUint16(1, true);
    } else {
      heartRate = value.getUint8(1);
    }

    setData(prev => ({ ...prev, heartRate }));
  };

  const handleTemperatureNotification = (event: Event) => {
    const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
    if (!value) return;

    // Temperature Measurement is in Celsius
    const tempCelsius = value.getFloat32(1, true);
    const tempFahrenheit = (tempCelsius * 9/5) + 32;
    
    setData(prev => ({ ...prev, temperature: tempFahrenheit }));
  };

  const connectToDevice = useCallback(async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [
          { services: [HEART_RATE_SERVICE] },
          { services: [HEALTH_THERMOMETER_SERVICE] }
        ]
      });

      device.addEventListener('gattserverdisconnected', () => {
        setIsConnected(false);
      });

      const server = await device.gatt?.connect();
      if (!server) throw new Error('No GATT server');

      // Connect to Heart Rate Service
      const heartRateService = await server.getPrimaryService(HEART_RATE_SERVICE);
      const heartRateCharacteristic = await heartRateService.getCharacteristic(HEART_RATE_CHARACTERISTIC);
      await heartRateCharacteristic.startNotifications();
      heartRateCharacteristic.addEventListener('characteristicvaluechanged', handleHeartRateNotification);

      // Connect to Temperature Service
      const temperatureService = await server.getPrimaryService(HEALTH_THERMOMETER_SERVICE);
      const temperatureCharacteristic = await temperatureService.getCharacteristic(TEMPERATURE_CHARACTERISTIC);
      await temperatureCharacteristic.startNotifications();
      temperatureCharacteristic.addEventListener('characteristicvaluechanged', handleTemperatureNotification);

      setDevice(device);
      setIsConnected(true);
    } catch (error) {
      console.error('Error connecting to device:', error);
      setIsConnected(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    if (device?.gatt?.connected) {
      device.gatt.disconnect();
    }
    setIsConnected(false);
    setDevice(null);
  }, [device]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected,
    data,
    connect: connectToDevice,
    disconnect
  };
};