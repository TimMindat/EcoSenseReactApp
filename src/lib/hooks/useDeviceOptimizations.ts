import { useState, useEffect } from 'react';

interface DeviceCapabilities {
  hardwareAcceleration: boolean;
  touchScreen: boolean;
  screenSize: {
    width: number;
    height: number;
    pixelRatio: number;
  };
  connection: {
    type: string | null;
    downlink: number | null;
    rtt: number | null;
    saveData: boolean;
  };
}

export function useDeviceOptimizations() {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    hardwareAcceleration: false,
    touchScreen: false,
    screenSize: {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: window.devicePixelRatio
    },
    connection: {
      type: null,
      downlink: null,
      rtt: null,
      saveData: false
    }
  });

  useEffect(() => {
    const checkCapabilities = () => {
      // Check hardware acceleration
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl');
      const hasHardwareAcceleration = !!(gl && gl.getExtension('WEBGL_lose_context'));

      // Check touch capabilities
      const hasTouchScreen = 'ontouchstart' in window || 
        navigator.maxTouchPoints > 0;

      // Get network information
      const connection = (navigator as any).connection;
      const networkInfo = connection ? {
        type: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      } : {
        type: null,
        downlink: null,
        rtt: null,
        saveData: false
      };

      setCapabilities({
        hardwareAcceleration: hasHardwareAcceleration,
        touchScreen: hasTouchScreen,
        screenSize: {
          width: window.innerWidth,
          height: window.innerHeight,
          pixelRatio: window.devicePixelRatio
        },
        connection: networkInfo
      });
    };

    checkCapabilities();

    // Listen for network changes
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', checkCapabilities);
    }

    // Listen for resize events
    window.addEventListener('resize', checkCapabilities);

    return () => {
      if (connection) {
        connection.removeEventListener('change', checkCapabilities);
      }
      window.removeEventListener('resize', checkCapabilities);
    };
  }, []);

  return capabilities;
}