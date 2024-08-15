import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { WindowManager, createWindow, useWindowStore } from "@spatialjs/core";
import { Environment } from "@react-three/drei";
import { XR, createXRStore } from "@react-three/xr";
import { Room } from "./components/Room";
import * as THREE from "three";
import Clock from "./components/Clock";
import StopWatch from "./components/StopClock";
import Pomodoro from "./components/Pomondoro";

const store = createXRStore({
  emulate: true,
  frameRate: "high",
  foveation: 100,
});

const App: React.FC = ({}) => {
  console.log("App component rendered");

  useEffect(() => {
    createWindow(Clock, {
      id: "clock",
      title: "Clock",
      props: { disableSeconds: true },
      disableBackground: false,
      followCamera: true,
      disableTiling: true,
      position: new THREE.Vector3(
        0.7054231986607751,
        5.388817243461132,
        -6.841060185432433
      ),
    });

    createWindow(StopWatch, {
      id: "StopWatch",
      title: "Stop Watch",
      props: { disableSeconds: true },
      disableBackground: false,
      followCamera: true,
      disableTiling: true,
      position: new THREE.Vector3(
        -0.7054231986607751,
        3.288817243461132,
        -6.841060185432433
      ),
    });

    createWindow(Pomodoro, {
      id: "Pomondoro",
      title: "Pomondoro Timer",
      props: { disableSeconds: true },
      disableBackground: false,
      followCamera: true,
      disableTiling: true,
      position: new THREE.Vector3(
        1.9054231986607751,
        3.288817243461132,
        -6.841060185432433
      ),
    });
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        gl={{ localClippingEnabled: true }}
        camera={{
          position: [
            2.972971539398106, 2.9354946965225684, 1.33710176014615864,
          ],
          rotation: new THREE.Euler(
            -0.1098708913525798,
            0.8603464464780124,
            0.038877349543585876
          ),
        }}
      >
        <XR store={store}>
          <Suspense fallback={null}>
            <Environment key="environment" preset="sunset" background={true} />
          </Suspense>
          <Suspense fallback={null}>
            <WindowManager key="window-manager" />
          </Suspense>
          <Suspense fallback={null}>
            <Room key="room" />
          </Suspense>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />
        </XR>
      </Canvas>
      <div style={{ position: "absolute", top: 10, left: 10 }}>
        <button onClick={() => store.enterAR()}>Enter AR</button>
      </div>
    </div>
  );
};

export default React.memo(App);
