import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, ContactShadows, Grid, Float, Stars } from '@react-three/drei';
import { Player } from './Player';
import { NPC } from './NPC';
import { Heart } from './Heart';
import { Tree } from './Nature'; // New
import { useGameStore } from '../../store/gameStore';

export const GameScene = () => {
    const memories = useGameStore(state => state.memories);

    // Positions for hearts - Raised to y=2.2 requiring JUMP
    const heartPositions = [
        [-3, 2.2, -2],
        [3, 2.2, -5],
        [0, 2.2, -8],
        [-4, 2.2, -12], // New
        [4, 2.2, -10]   // New
    ];

    // Random trees
    const treePositions = [
        [-5, 0, -5], [5, 0, -2], [-2, 0, -12], [4, 0, -8], [-6, 0, 0], [6, 0, 5],
        [-8, 0, -8], [8, 0, -10],
    ];

    return (
        <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
            {/* Natural Environment */}
            <Sky sunPosition={[100, 10, 100]} turbidity={0.3} rayleigh={0.5} mieCoefficient={0.005} mieDirectionalG={0.8} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1} castShadow />
            <fog attach="fog" args={['#dbfceb', 5, 30]} /> {/* Misty atmosphere */}

            {/* Grass Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#86efac" /> {/* Light Green */}
            </mesh>
            {/* <Grid infiniteGrid fadeDistance={30} fadeStrength={5} /> */} {/* Removing grid for natural look */}

            {/* Objects */}
            <Player />
            <NPC position={[0, 0.6, -15]} />

            {treePositions.map((pos, i) => (
                <Tree key={i} position={pos} />
            ))}

            {memories.map((memory, i) => (
                !memory.collected && <Heart key={memory.id} id={memory.id} position={heartPositions[i]} />
            ))}

            <ContactShadows opacity={0.4} scale={20} blur={2} far={10} resolution={256} color="#000000" />
        </Canvas>
    );
};
