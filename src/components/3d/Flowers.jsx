import React, { useMemo } from 'react';
import { Float } from '@react-three/drei';
import { useGameStore } from '../../store/gameStore';

const FLOWER_COLORS = [
    '#ec4899', // pink
    '#f43f5e', // rose
    '#f472b6', // pink-400
    '#e879f9', // fuchsia
    '#a855f7', // purple
    '#c084fc', // violet
    '#fbbf24', // amber
    '#f59e0b', // orange
    '#f97316', // orange-500
    '#22c55e', // green
    '#14b8a6', // teal
    '#ffffff', // white
    '#fecdd3', // pink-200
    '#fbcfe8', // pink-300
];

function SingleFlower({ position, color, scale = 1 }) {
    const petalCount = 6;
    const petals = useMemo(() => {
        const group = [];
        for (let i = 0; i < petalCount; i++) {
            const angle = (i / petalCount) * Math.PI * 2;
            group.push({ angle, x: Math.cos(angle) * 0.2, z: Math.sin(angle) * 0.2 });
        }
        return group;
    }, []);

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
            <group position={position} scale={scale}>
                {/* Stem */}
                <mesh position={[0, 0.25, 0]} castShadow>
                    <cylinderGeometry args={[0.02, 0.03, 0.5, 8]} />
                    <meshStandardMaterial color="#22c55e" />
                </mesh>
                {/* Leaves on stem */}
                <mesh position={[0.08, 0.15, 0]} rotation={[0, 0, -0.4]} castShadow>
                    <sphereGeometry args={[0.08, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#16a34a" />
                </mesh>
                <mesh position={[-0.06, 0.35, 0]} rotation={[0, 0, 0.3]} castShadow>
                    <sphereGeometry args={[0.06, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#16a34a" />
                </mesh>
                {/* Petals - simple rounded shapes in a circle */}
                {petals.map(({ angle, x, z }, i) => (
                    <mesh
                        key={i}
                        position={[x, 0.5, z]}
                        rotation={[0, -angle, 0]}
                        castShadow
                    >
                        <sphereGeometry args={[0.12, 12, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
                        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.15} />
                    </mesh>
                ))}
                {/* Center */}
                <mesh position={[0, 0.52, 0]} castShadow>
                    <sphereGeometry args={[0.06, 12, 12]} />
                    <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.3} />
                </mesh>
            </group>
        </Float>
    );
}

export function Flowers() {
    const gameState = useGameStore((state) => state.gameState);
    const flowerPositions = useMemo(() => {
        const positions = [];
        const rand = (min, max) => min + Math.random() * (max - min);
        const pickColor = () => FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)];
        // Ring around the center (near pig and player)
        for (let i = 0; i < 24; i++) {
            const angle = (i / 24) * Math.PI * 2 + rand(0, 0.3);
            const r = rand(4, 9);
            positions.push({
                position: [Math.cos(angle) * r, 0.25 + rand(0, 0.1), Math.sin(angle) * r],
                color: pickColor(),
                scale: rand(0.8, 1.4),
            });
        }
        // Outer ring
        for (let i = 0; i < 30; i++) {
            const angle = (i / 30) * Math.PI * 2 + rand(0, 0.5);
            const r = rand(10, 16);
            positions.push({
                position: [Math.cos(angle) * r, 0.25 + rand(0, 0.1), Math.sin(angle) * r],
                color: pickColor(),
                scale: rand(0.6, 1.2),
            });
        }
        return positions;
    }, []);

    if (gameState !== 'finished' && gameState !== 'dialogue') return null;

    return (
        <group>
            {flowerPositions.map(({ position, color, scale }, i) => (
                <SingleFlower key={i} position={position} color={color} scale={scale} />
            ))}
        </group>
    );
}
