import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const AuroraShader = {
    uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#000000") }, // Deepest Black
        uColor2: { value: new THREE.Color("#FFD700") }, // Bright Gold
        uColor3: { value: new THREE.Color("#D4AF37") }, // Metallic Gold (Matches Hero)
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;

    // Simplex Noise (simplified)
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      // Create wave-like movement (moderate speed)
      float noise1 = snoise(vUv * 2.0 + vec2(0.0, uTime * 0.15)); // Slightly faster
      float noise2 = snoise(vUv * 2.5 - vec2(uTime * 0.2, 0.0));
      
      // Mix colors based on noise
      vec3 color = mix(uColor1, uColor2, noise1);
      color = mix(color, uColor3, noise2);
      
      // Stronger glow
      float glow = sin(vUv.y * 3.14159) * 1.5; // Increased glow factor
      
      gl_FragColor = vec4(color * glow, 1.0);
    }
  `,
};

function AuroraPlane() {
    const mesh = useRef();

    useFrame((state) => {
        if (mesh.current) {
            // Check theme
            const isDark = document.documentElement.classList.contains("dark");

            // Update Base Color (uColor1)
            // Dark Mode: Black (#000000)
            // Light Mode: White (#ffffff)
            const targetColor1 = new THREE.Color(isDark ? "#000000" : "#ffffff");

            // Smoothly interpolate current color to target color
            mesh.current.material.uniforms.uColor1.value.lerp(targetColor1, 0.05);

            // Moderate speed - not too fast, not too slow
            mesh.current.material.uniforms.uTime.value = state.clock.getElapsedTime() * 0.7;
        }
    });

    return (
        <mesh ref={mesh} position={[0, 0, 0]} scale={[10, 10, 1]}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial args={[AuroraShader]} transparent={true} />
        </mesh>
    );
}

const AuroraHero = () => {
    return (
        <div className="absolute inset-0 w-full h-full bg-transparent">
            <Canvas camera={{ position: [0, 0, 2] }}>
                <AuroraPlane />
            </Canvas>
        </div>
    );
};

export default AuroraHero;
