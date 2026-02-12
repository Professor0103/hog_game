import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useGameStore } from '../../store/gameStore';

export const Heart = ({ position, id }) => {
    const collectHeart = useGameStore(state => state.collectHeart);
    const ref = useRef();

    useFrame(({ scene }) => {
        const player = scene.getObjectByName('player-group');
        if (player && ref.current) {
            const dist = player.position.distanceTo(ref.current.parent.position); // Note: group is parent
            // Logic: Must be close (dist < 1.5) AND Player must be high enough (Jumping)
            // or just close in 3D distance?
            // If heart is at y=2.2 and player at y=0.5, dy = 1.7.
            // If player jumps, y approaches 2.0.
            // So simple 3D distance check < 1.0 works perfectly.
            if (dist < 1.2) {
                collectHeart(id);
            }
        }
    });

    return (
        <Float speed={3} rotationIntensity={1} floatIntensity={1}>
            <group position={position}>
                <mesh ref={ref} rotation={[0, 0, Math.PI / 4]}>
                    {/* Heart Shape */}
                    <boxGeometry args={[0.5, 0.5, 0.1]} />
                    <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.8} />
                </mesh>
            </group>
        </Float>
    );
};
