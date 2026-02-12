import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useGameStore } from '../../store/gameStore';

export const Heart = ({ position, id }) => {
    const collectHeart = useGameStore(state => state.collectHeart);
    const collected = useGameStore(state => state.memories.find(m => m.id === id)?.collected); // Logic adjustment needed in store
    // Actually, let's just hide it if valid.
    // We'll manage collected state more simply: if the ID is not in a "collected" list.
    // For now, let's just make it disappear on click.

    const ref = useRef();

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group position={position} onClick={(e) => {
                e.stopPropagation();
                collectHeart(id);
            }}>
                <mesh ref={ref} rotation={[0, 0, Math.PI / 4]}>
                    {/* Heart Shape using primitive or just a red cube/plane for now */}
                    <boxGeometry args={[0.5, 0.5, 0.1]} />
                    <meshStandardMaterial color="red" emissive="red" emissiveIntensity={0.5} />
                </mesh>
            </group>
        </Float>
    );
};
