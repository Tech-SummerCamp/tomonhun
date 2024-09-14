"use client"

import { useCallback, useEffect, useRef, useState } from 'react'

import * as Three from 'three';
import type { Avatar } from '../../lib/shooting/avatar';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

type Avatar3DObject = Avatar & {
  isDestroyed: boolean,
  mesh: Three.Mesh
};

export function ThreeJSDemo({ avatars }: { avatars: Avatar[] }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Three.WebGLRenderer>();
  const sceneRef = useRef<Three.Scene>();
  const cameraRef = useRef<Three.PerspectiveCamera>();
  const raycasterRef = useRef<Three.Raycaster>();
  const pointerRef = useRef<Three.Vector2>();
  const objects = useRef<Avatar3DObject[]>()
  const controlsRef = useRef<OrbitControls>()

  useEffect(() => {
    if (!avatars) return;
    objects.current = avatars.map(i => ({ ...i, isDestroyed: false }) as Avatar3DObject);

    const w = window.innerWidth;
    const h = window.innerHeight;

    rendererRef.current = new Three.WebGLRenderer();

    const elm = mountRef.current;

    elm?.appendChild(rendererRef.current.domElement);

    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    rendererRef.current.setSize(w, h);
    rendererRef.current.setClearColor(0xffffff);

    sceneRef.current = new Three.Scene();

    raycasterRef.current = new Three.Raycaster();
    pointerRef.current = new Three.Vector2();


    const camera = new Three.PerspectiveCamera(45, w / h, 1, 10000);
    camera.position.set(0, 0, +1000);
    cameraRef.current = camera;
    controlsRef.current = new OrbitControls(camera, rendererRef.current.domElement);
    controlsRef.current.update();

    for (const avatar of objects.current) {
      const loader = new Three.TextureLoader();

      loader.load(avatar.imageUrl, (texture) => {
        if (!sceneRef.current) return;
        texture.type = Three.FloatType;
        const geometry = new Three.PlaneGeometry(texture.image.width, texture.image.height);
        const material = new Three.MeshBasicMaterial({
          map: texture,
          transparent: true,
          color: 0xffffff,
        });
        // textureのサイズ取得
        const mesh = new Three.Mesh(geometry, material);
        mesh.quaternion.copy(camera.quaternion);
        // 背面表示
        mesh.material.side = Three.DoubleSide;

        avatar.mesh = mesh;
        sceneRef.current.add(mesh);
      });
    }

    const handleResize = () => {
      if (rendererRef.current && cameraRef.current) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        rendererRef.current.setSize(w, h);
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
      }
    };

    window.addEventListener("resize", handleResize);

    const tick = () => {
      if (objects.current) {
        // camera.rotation.x += 0.01;
        // mesh.rotation.y += 0.01;
        // for (const avatar of objects.current) {
        //   if (avatar.mesh) {
        //     avatar.mesh.quaternion.copy(camera.quaternion);
        //   }
        // }
      }
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener("resize", handleResize);
      elm?.removeChild(rendererRef.current!.domElement);
    };
  }, [avatars]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (cameraRef.current && raycasterRef.current && sceneRef.current) {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = - (event.clientY / window.innerHeight) * 2 + 1;

      raycasterRef.current.setFromCamera(new Three.Vector2(x, y), cameraRef.current);

      // calculate objects intersecting the picking ray
      const intersects = raycasterRef.current.intersectObjects(sceneRef.current.children);
      for (const obj of intersects) {
        obj.object.removeFromParent();
      }
    }
  };

  return (
    <div ref={mountRef} onPointerDown={handlePointerDown} className='bg-transparent' />
  );
}
