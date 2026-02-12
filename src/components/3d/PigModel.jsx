import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

export const PigModel = () => {
    const group = useRef();
    // Simple idle animation
    useFrame((state) => {
        if (group.current) {
            group.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.05; // Wiggle
            group.current.position.y = Math.sin(state.clock.elapsedTime * 4) * 0.02; // Bounce
        }
    });

    return (
        <group ref={group} scale={1.3}>
            {/* Body - Round Chonk */}
            <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
                <sphereGeometry args={[0.6, 32, 32]} />
                <meshStandardMaterial color="#fda4af" roughness={0.4} /> {/* Rose-300 */}
            </mesh>

            {/* Head */}
            <mesh position={[0, 0.6, 0.45]} castShadow receiveShadow>
                <sphereGeometry args={[0.45, 32, 32]} />
                <meshStandardMaterial color="#fda4af" roughness={0.4} />
            </mesh>

            {/* Snout - Big and Wiggly */}
            <mesh position={[0, 0.55, 0.85]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.14, 0.16, 0.15, 32]} />
                <meshStandardMaterial color="#f472b6" /> {/* Pink-400 */}
            </mesh>
            {/* Nostrils */}
            <mesh position={[-0.06, 0.55, 0.93]}>
                <sphereGeometry args={[0.025, 8, 8]} />
                <meshStandardMaterial color="#831843" />
            </mesh>
            <mesh position={[0.06, 0.55, 0.93]}>
                <sphereGeometry args={[0.025, 8, 8]} />
                <meshStandardMaterial color="#831843" />
            </mesh>

            {/* -- CUTE & FUNNY EYES (Cartoon Style) -- */}
            {/* Right Eye */}
            <mesh position={[0.2, 0.75, 0.75]}>
                <sphereGeometry args={[0.09, 16, 16]} />
                <meshStandardMaterial color="white" />
            </mesh>
            <mesh position={[0.2, 0.75, 0.83]}>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshStandardMaterial color="black" />
            </mesh>

            {/* Left Eye - Slightly different for 'funny' look? No, keeping symmetric but wide */}
            <mesh position={[-0.2, 0.75, 0.75]}>
                <sphereGeometry args={[0.09, 16, 16]} />
                <meshStandardMaterial color="white" />
            </mesh>
            <mesh position={[-0.2, 0.75, 0.83]}>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshStandardMaterial color="black" />
            </mesh>

            {/* Blush Cheeks */}
            <mesh position={[0.28, 0.55, 0.65]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial color="#fb7185" transparent opacity={0.6} />
            </mesh>
            <mesh position={[-0.28, 0.55, 0.65]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial color="#fb7185" transparent opacity={0.6} />
            </mesh>

            {/* THE MOLE - Beauty Mark */}
            <mesh position={[0.22, 0.45, 0.75]}>
                <sphereGeometry args={[0.015, 8, 8]} />
                <meshStandardMaterial color="#1f050b" />
            </mesh>

            {/* Ears - Floppy */}
            <mesh position={[-0.35, 0.9, 0.45]} rotation={[0, 0, 0.4]}>
                <coneGeometry args={[0.12, 0.3, 32]} />
                <meshStandardMaterial color="#fda4af" />
            </mesh>
            <mesh position={[0.35, 0.9, 0.45]} rotation={[0, 0, -0.4]}>
                <coneGeometry args={[0.12, 0.3, 32]} />
                <meshStandardMaterial color="#fda4af" />
            </mesh>

            {/* Legs */}
            <mesh position={[-0.25, 0.1, 0.25]}>
                <cylinderGeometry args={[0.09, 0.09, 0.35]} />
                <meshStandardMaterial color="#fda4af" />
            </mesh>
            <mesh position={[0.25, 0.1, 0.25]}>
                <cylinderGeometry args={[0.09, 0.09, 0.35]} />
                <meshStandardMaterial color="#fda4af" />
            </mesh>
            <mesh position={[-0.25, 0.1, -0.25]}>
                <cylinderGeometry args={[0.09, 0.09, 0.35]} />
                <meshStandardMaterial color="#fda4af" />
            </mesh>
            <mesh position={[0.25, 0.1, -0.25]}>
                <cylinderGeometry args={[0.09, 0.09, 0.35]} />
                <meshStandardMaterial color="#fda4af" />
            </mesh>

            {/* Tail - Curly */}
            <mesh position={[0, 0.5, -0.55]} rotation={[2, 0, 0]}>
                <torusGeometry args={[0.1, 0.03, 8, 20, 3]} />
                <meshStandardMaterial color="#fda4af" />
            </mesh>
        </group>
    );
};
