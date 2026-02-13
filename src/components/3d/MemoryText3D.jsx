import React from 'react';
import { Text, Float } from '@react-three/drei';
import { useGameStore } from '../../store/gameStore';

/** Shows memory title + message as 3D text in the scene (like "Click me!" on the pig). Click "Keep Exploring" to close. */
export function MemoryText3D() {
    const currentMemory = useGameStore((state) => state.currentMemory);
    const closeMemory = useGameStore((state) => state.closeMemory);

    if (!currentMemory) return null;

    return (
        <group position={[0, 3.5, -8]}>
            <Float speed={2} floatIntensity={0.3}>
                {/* Backdrop so text is readable */}
                <mesh position={[0, 0, -0.1]}>
                    <planeGeometry args={[6, 3.5, 1]} />
                    <meshStandardMaterial color="#ffffff" transparent opacity={0.92} />
                </mesh>
                <mesh position={[0, 0, -0.05]} onClick={(e) => { e.stopPropagation(); closeMemory(); }}>
                    <planeGeometry args={[5.8, 3.3, 1]} />
                    <meshBasicMaterial color="#fce7f3" transparent opacity={0.01} />
                </mesh>
                <Text
                    position={[0, 0.9, 0]}
                    fontSize={0.35}
                    color="#be185d"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={5.5}
                    textAlign="center"
                >
                    {currentMemory.title}
                </Text>
                <Text
                    position={[0, 0.2, 0]}
                    fontSize={0.2}
                    color="#374151"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={5.5}
                    textAlign="center"
                >
                    {currentMemory.text}
                </Text>
                <Text
                    position={[0, -0.85, 0]}
                    fontSize={0.22}
                    color="#db2777"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.015}
                    outlineColor="#9d174d"
                    onClick={(e) => { e.stopPropagation(); closeMemory(); }}
                    onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
                    onPointerOut={() => { document.body.style.cursor = 'default'; }}
                >
                    ❤ Keep Exploring ❤
                </Text>
            </Float>
        </group>
    );
}
