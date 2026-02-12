import React from 'react';
import { useFrame } from '@react-three/fiber';

export const RaccoonModel = () => {
    return (
        <group dispose={null} scale={0.6}>
            {/* Body */}
            <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.7, 0.6, 1.2]} />
                <meshStandardMaterial color="#6b7280" /> {/* Grey */}
            </mesh>

            {/* Head Group */}
            <group position={[0, 1, 0.5]}>
                {/* Main Head */}
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[0.6, 0.5, 0.5]} />
                    <meshStandardMaterial color="#6b7280" />
                </mesh>

                {/* Mask (Eyes) */}
                <mesh position={[0, 0.1, 0.26]}>
                    <boxGeometry args={[0.62, 0.15, 0.05]} />
                    <meshStandardMaterial color="#111827" /> {/* Black */}
                </mesh>

                {/* Snout */}
                <mesh position={[0, -0.1, 0.26]}>
                    <boxGeometry args={[0.2, 0.15, 0.15]} />
                    <meshStandardMaterial color="#000000" /> {/* Black tip of snout */}
                </mesh>
                <mesh position={[0, -0.1, 0.2]}>
                    <boxGeometry args={[0.3, 0.2, 0.1]} />
                    <meshStandardMaterial color="#ffffff" /> {/* White muzzle area */}
                </mesh>

                {/* Ears */}
                <mesh position={[-0.2, 0.35, 0]} rotation={[0, 0, 0.2]}>
                    <coneGeometry args={[0.1, 0.3, 4]} />
                    <meshStandardMaterial color="#6b7280" />
                </mesh>
                <mesh position={[0.2, 0.35, 0]} rotation={[0, 0, -0.2]}>
                    <coneGeometry args={[0.1, 0.3, 4]} />
                    <meshStandardMaterial color="#6b7280" />
                </mesh>
            </group>

            {/* Tail */}
            <group position={[0, 0.5, -0.6]}>
                <mesh rotation={[-0.5, 0, 0]} castShadow>
                    <cylinderGeometry args={[0.15, 0.1, 0.8, 8]} />
                    <meshStandardMaterial color="#4b5563" />
                </mesh>
                {/* Stripes logic could be complex textures, keeping simpler for now */}
            </group>

            {/* Legs */}
            <mesh position={[-0.25, 0.2, 0.4]}>
                <boxGeometry args={[0.15, 0.4, 0.15]} />
                <meshStandardMaterial color="#374151" />
            </mesh>
            <mesh position={[0.25, 0.2, 0.4]}>
                <boxGeometry args={[0.15, 0.4, 0.15]} />
                <meshStandardMaterial color="#374151" />
            </mesh>
            <mesh position={[-0.25, 0.2, -0.4]}>
                <boxGeometry args={[0.15, 0.4, 0.15]} />
                <meshStandardMaterial color="#374151" />
            </mesh>
            <mesh position={[0.25, 0.2, -0.4]}>
                <boxGeometry args={[0.15, 0.4, 0.15]} />
                <meshStandardMaterial color="#374151" />
            </mesh>
        </group>
    );
};
