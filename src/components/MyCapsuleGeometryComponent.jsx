import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";

function CapsuleElement({
  radiusProp,
  lengthProp,
  capSegmentsProp,
  radialSegmentsProp,
}) {
  const mesh = useRef(null);

  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <>
      <group ref={mesh}>
        {/* Solid capsule */}
        <mesh>
          <capsuleGeometry
            attach="geometry"
            args={[radiusProp, lengthProp, capSegmentsProp, radialSegmentsProp]}
          />
          <meshStandardMaterial attach="material" color="pink" />
        </mesh>

        {/* Wireframe over the capsule */}
        <mesh>
          <capsuleGeometry
            attach="geometry"
            args={[radiusProp, lengthProp, capSegmentsProp, radialSegmentsProp]}
          />
          <meshBasicMaterial attach="material" color="white" wireframe={true} />
        </mesh>
      </group>
    </>
  );
}

function MyCapsuleGeometryComponent() {
  //body variables and wireframe variables
  const [inputRadius, setInputRadius] = useState(1);
  const [inputLength, setInputLength] = useState(1);
  const [inputCapSegments, setInputCapSegments] = useState(4);
  const [inputRadialSegments, setInputRadialSegments] = useState(8);

  const handleRadiusChange = (e) => {
    setInputRadius(e.target.value);
  };
  const handleLengthChange = (e) => {
    setInputLength(e.target.value);
  };
  const handleCapSegmentChange = (e) => {
    setInputCapSegments(e.target.value);
  };

  const handleRadialSegmentChange = (e) => {
    setInputRadialSegments(e.target.value);
  };

  return (
    <>
      <Canvas camera={{ position: [-5, 2, 9], fov: 40 }}>
        <ambientLight intensity={0.3} />
        <CapsuleElement
          radiusProp={inputRadius}
          lengthProp={inputLength}
          capSegmentsProp={inputCapSegments}
          radialSegmentsProp={inputRadialSegments}
        />
        <OrbitControls />
      </Canvas>

      {/* controls capsule start */}
      <div className="capsule-controls">
        <p>Radius</p>
        <input
          type="number"
          value={inputRadius}
          onChange={handleRadiusChange}
        />
        <p>Length</p>
        <input
          type="number"
          value={inputLength}
          onChange={handleLengthChange}
        />
        <p>capSegments</p>
        <input
          type="number"
          value={inputCapSegments}
          onChange={handleCapSegmentChange}
        />
        <p>radialSegments</p>
        <input
          type="number"
          value={inputRadialSegments}
          onChange={handleRadialSegmentChange}
        />
      </div>
      {/* controls capsule end */}
    </>
  );
}

export default MyCapsuleGeometryComponent;
