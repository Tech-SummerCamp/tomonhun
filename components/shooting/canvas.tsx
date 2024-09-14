"use client"

import { useCallback, useEffect, useRef, useState } from 'react'

import * as Three from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import type { Avatar } from '../../lib/shooting/avatar';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DeviceOrientationControls } from '../../lib/shooting/DeviceOrientationControls';
import { Video } from './Camera';

type Avatar3DObject = Avatar & {
  isDestroyed: boolean,
  mesh: Three.Mesh
};

function floatAnimation(mesh: Three.Mesh, group: TWEEN.Group) {
  const tween = new TWEEN.Tween(mesh.position)
    .to({ y: mesh.position.y + Math.random() * 200 - 100 }, 2000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((p) => {
      mesh.position.y = p.y;
    })
    .onComplete(() => floatAnimation(mesh, group))
    .start();
  group.add(tween);
}

export function ThreeJSDemo({ avatars }: { avatars: Avatar[] }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Three.WebGLRenderer>();
  const sceneRef = useRef<Three.Scene>();
  const cameraRef = useRef<Three.PerspectiveCamera>();
  const raycasterRef = useRef<Three.Raycaster>();
  const pointerRef = useRef<Three.Vector2>();
  const objects = useRef<Avatar3DObject[]>()
  const controlsRef = useRef<DeviceOrientationControls | OrbitControls>()
  const tweenGroupRef = useRef<TWEEN.Group>()

  useEffect(() => {
    if (!avatars) return;
    objects.current = avatars.map(i => ({ ...i, isDestroyed: false }) as Avatar3DObject);

    const w = window.innerWidth;
    const h = window.innerHeight;

    tweenGroupRef.current = new TWEEN.Group();

    rendererRef.current = new Three.WebGLRenderer({
      alpha: true,
    });

    const elm = mountRef.current;

    elm?.appendChild(rendererRef.current.domElement);

    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    rendererRef.current.setSize(w, h);
    rendererRef.current.setClearColor(0x000000, 0);
    // rendererRef.current.setClearColor(0xffffff);

    sceneRef.current = new Three.Scene();

    raycasterRef.current = new Three.Raycaster();
    pointerRef.current = new Three.Vector2();


    const camera = new Three.PerspectiveCamera(45, w / h, 1, 10000);
    camera.position.set(0, 0, 1000);
    cameraRef.current = camera;
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      console.log('DeviceOrientation is supported');
      controlsRef.current = new DeviceOrientationControls(camera);
    } else {
      console.log('DeviceOrientation is not supported');
      controlsRef.current = new OrbitControls(camera, rendererRef.current.domElement);
    }
    controlsRef.current.update();

    for (const avatar of objects.current) {
      const loader = new Three.TextureLoader();

      loader.load(avatar.imageUrl, (texture) => {
        if (!sceneRef.current || !tweenGroupRef.current) return;
        texture.type = Three.FloatType;
        const geometry = new Three.PlaneGeometry(texture.image.width, texture.image.height);
        const material = new Three.MeshBasicMaterial({
          map: texture,
          transparent: true,
          color: 0xffffff,
        });
        // textureのサイズ取得
        const mesh = new Three.Mesh(geometry, material);
        mesh.position.set((Math.random() * 5000) - 2500, (Math.random() * 5000) - 2500, (Math.random() * 5000) - 2500);
        mesh.lookAt(camera.position);
        // 背面表示
        mesh.material.side = Three.DoubleSide;

        avatar.mesh = mesh;
        sceneRef.current.add(mesh);
        floatAnimation(avatar.mesh, tweenGroupRef.current);
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
      if (tweenGroupRef.current) {
        // ふわふわの処理
        tweenGroupRef.current.update();
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
      if (rendererRef.current) {
        elm?.removeChild(rendererRef.current.domElement);
      }
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
    <div>
      <Video className='fixed top-0 left-0' style={{ position: "fixed", left: 0, top: 0 }} />
      <div ref={mountRef} onPointerDown={handlePointerDown} className='bg-transparent fixed top-0 left-0'
        style={{ position: "fixed", left: 0, top: 0 }} />
    </div>
  );
}
