'use client';

import { useEffect, useRef, useState } from 'react';

import { createTextTexture } from '@/lib/shooting/createTextTexture';
import * as TWEEN from '@tweenjs/tween.js';
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { Avatar } from '../../lib/shooting/avatar';
import { DeviceOrientationControls } from '../../lib/shooting/DeviceOrientationControls';
import { Video } from './Camera';
import { StockView } from './StockView';

type Avatar3DObject = Avatar & {
  isDestroyed: boolean;
  object: Three.Object3D;
};

type AvatarStock = Avatar;

function floatAnimation(
  obj: Three.Object3D,
  group: TWEEN.Group,
  sign?: number,
) {
  const tween = new TWEEN.Tween(obj.position)
    .to(
      { y: obj.position.y + Math.random() * 200 * (sign || 1) },
      Math.random() * 3000 + 2000,
    )
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((p) => {
      obj.position.y = p.y;
    })
    .onComplete(() => floatAnimation(obj, group, -(sign || 1)))
    .start();
  group.add(tween);
}

export function ShootingView({ avatars }: { avatars: Avatar[] }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Three.WebGLRenderer>();
  const sceneRef = useRef<Three.Scene>();
  const cameraRef = useRef<Three.PerspectiveCamera>();
  const raycasterRef = useRef<Three.Raycaster>();
  const pointerRef = useRef<Three.Vector2>();
  const objects = useRef<Avatar3DObject[]>();
  const controlsRef = useRef<DeviceOrientationControls | OrbitControls>();
  const tweenGroupRef = useRef<TWEEN.Group>();
  const [orientationSupported, setOrientationSupported] = useState(false);
  const [stock, setStock] = useState<AvatarStock[]>([]);

  useEffect(() => {
    if (!avatars) return;
    objects.current = avatars.map(
      (i) => ({ ...i, isDestroyed: false }) as Avatar3DObject,
    );

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

    sceneRef.current = new Three.Scene();

    raycasterRef.current = new Three.Raycaster();
    pointerRef.current = new Three.Vector2();

    const camera = new Three.PerspectiveCamera(45, w / h, 1, 10000);
    camera.position.set(1, 1, 1);
    cameraRef.current = camera;
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      console.log('DeviceOrientation is supported');
      setOrientationSupported(true);
      controlsRef.current = new DeviceOrientationControls(camera);
      rendererRef.current.setClearColor(0x000000, 0);
    } else {
      console.log('DeviceOrientation is not supported');
      controlsRef.current = new OrbitControls(
        camera,
        rendererRef.current.domElement,
      );
      rendererRef.current.setClearColor(0xffffff);
    }
    controlsRef.current.update();

    for (const avatar of objects.current) {
      const loader = new Three.TextureLoader();

      loader.load(avatar.imageUrl, (texture) => {
        if (!sceneRef.current || !tweenGroupRef.current) return;
        texture.type = Three.FloatType;
        const geometry = new Three.PlaneGeometry(
          texture.image.width,
          texture.image.height,
        );
        const material = new Three.MeshBasicMaterial({
          map: texture,
          transparent: true,
          color: 0xffffff,
        });
        // textureのサイズ取得
        const mesh = new Three.Mesh(geometry, material);
        // 背面表示
        mesh.material.side = Three.DoubleSide;

        const {
          texture: spriteTexture,
          width: texWidth,
          height: texHeight,
        } = createTextTexture({ fontSize: 64, text: avatar.name });
        const spriteMaterial = new Three.SpriteMaterial({
          map: spriteTexture,
          transparent: true,
        });
        const sprite = new Three.Sprite(spriteMaterial);
        const ratio = texWidth / texHeight;
        sprite.scale.set(100 * ratio, 100, 1);
        sprite.position.y += texture.image.height / 2 + 50;

        const group = new Three.Group();
        group.add(mesh);
        group.add(sprite);

        // どれにRaycastが当たるかわからんので
        group.userData.avatar = avatar;
        mesh.userData.avatar = avatar;
        avatar.object = group;

        // 方向、位置を指定
        group.position.set(
          Math.random() * 5000 - 2500,
          Math.random() * 5000 - 2500,
          Math.random() * 5000 - 2500,
        );
        const direction = new Three.Vector3()
          .subVectors(group.position, camera.position)
          .normalize();
        const initialDirection = new Three.Vector3(0, 0, 1);
        const quaternion = new Three.Quaternion().setFromUnitVectors(
          initialDirection,
          direction,
        );
        group.quaternion.copy(quaternion);
        group.up.set(0, 1, 0);
        sceneRef.current.add(group);
        floatAnimation(avatar.object, tweenGroupRef.current);
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

    window.addEventListener('resize', handleResize);

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
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current) {
        elm?.removeChild(rendererRef.current.domElement);
      }
    };
  }, [avatars]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (cameraRef.current && raycasterRef.current && sceneRef.current) {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycasterRef.current.setFromCamera(
        new Three.Vector2(x, y),
        cameraRef.current,
      );

      // calculate objects intersecting the picking ray
      const intersects = raycasterRef.current.intersectObjects(
        sceneRef.current.children,
      );
      for (const obj of intersects) {
        if (obj.object.userData.avatar) {
          const avatar = obj.object.userData.avatar as Avatar3DObject;
          avatar.object.removeFromParent();
          setStock((prev) => [...prev, avatar]);
        }
      }
    }
  };

  return (
    <div>
      <Video
        disable={!orientationSupported}
        className={!orientationSupported ? 'hidden' : ''}
        style={{ position: 'fixed', left: 0, top: 0 }}
      />
      <div
        ref={mountRef}
        onPointerDown={handlePointerDown}
        className='bg-transparent fixed top-0 left-0'
        style={{ position: 'fixed', left: 0, top: 0 }}
      />
      <StockView avatars={stock} />
    </div>
  );
}
