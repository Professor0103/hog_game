import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../../store/gameStore';

export const Heart = ({ position, id }) => {
    const collectHeart = useGameStore(state => state.collectHeart);
    const ref = useRef();

    // Create Heart Shape
    const heartShape = useMemo(() => {
        const shape = new THREE.Shape();
        const x = 0, y = 0;
        shape.moveTo(x + 0.25, y + 0.25);
        shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.20, y, x, y);
        shape.bezierCurveTo(x - 0.30, y, x - 0.30, y + 0.35, x - 0.30, y + 0.35);
        shape.bezierCurveTo(x - 0.30, y + 0.55, x - 0.10, y + 0.77, x + 0.25, y + 0.95);
        shape.bezierCurveTo(x + 0.60, y + 0.77, x + 0.80, y + 0.55, x + 0.80, y + 0.35);
        shape.bezierCurveTo(x + 0.80, y + 0.35, x + 0.80, y, x + 0.50, y);
        shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
        return shape;
    }, []);

    const extrudeSettings = {
        depth: 0.2,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 2,
        bevelSize: 0.05,
        bevelThickness: 0.05,
    };

    useFrame(({ scene }) => {
        const player = scene.getObjectByName('player-group');
        if (player && ref.current) {
            // Simple distance check to the parent group position
            const dist = player.position.distanceTo(ref.current.parent.position);
            if (dist < 1.2) {
                collectHeart(id);
            }
        }
    });

    return (
        <Float speed={3} rotationIntensity={1} floatIntensity={1}>
            <group position={position}>
                <mesh ref={ref} rotation={[Math.PI, 0, 0]} scale={0.5} position={[-0.12, 0.5, 0]}>
                    <extrudeGeometry args={[heartShape, extrudeSettings]} />
                    <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} roughness={0.2} />
                </mesh>
            </group>
        </Float>
    );
};
