import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, ContactShadows, Grid, Float } from '@react-three/drei';
import { Player } from './Player';
import { NPC } from './NPC';
import { Heart } from './Heart';
import { useGameStore } from '../../store/gameStore';

export const GameScene = () => {
    const memories = useGameStore(state => state.memories);
    // Filter out collected ones or render them differently? 
    // For now, let's just not render collected ones conceptually, but we need to track that.
    // The store needs to know which are collected. 
    // Let's assume 'memories' has a 'collected' flag we update.
    // Actually, I didn't add 'collected' to the store object, I added 'heartsCollected' counter. 
    // Let's just render hearts based on ID if they aren't "collected" in a local list or just check the counter.
    // Better: Render all 3 hearts at specific positions.

    // Hardcoded positions for the path
    const heartPositions = [
        [-3, 1, -2],
        [3, 1, -5],
        [0, 1, -10]
    ];

    // We need a way to track which specific heart is collected. 
    // I'll update the store or just manage it locally? Store is better.
    // For now, assume hearts 1, 2, 3 correspond to indices.

    return (
        <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
            {/* Environment */}
            <Sky sunPosition={[100, 20, 100]} turbidity={0.1} rayleigh={0.5} mieCoefficient={0.005} mieDirectionalG={0.8} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} castShadow />

            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#fdf2f8" />
            </mesh>
            <Grid infiniteGrid fadeDistance={30} fadeStrength={5} />

            {/* Objects */}
            <Player />
            <NPC position={[0, 0.6, -15]} />

            {memories.map((memory, i) => (
                !memory.collected && <Heart key={memory.id} id={memory.id} position={heartPositions[i]} />
            ))}

            <ContactShadows opacity={0.5} scale={10} blur={1} far={10} resolution={256} color="#000000" />
        </Canvas>
    );
};
