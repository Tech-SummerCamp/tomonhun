'use client';

import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Avatar } from '@/lib/shooting/avatar';
import { createTextTexture } from '@/lib/shooting/create-text-texture';
import { DeviceOrientationControls } from '@/lib/shooting/device-orientation-controls';
import { cn } from '@/lib/utils';
import * as TWEEN from '@tweenjs/tween.js';
import { useRouter } from 'next/navigation';
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { StockView } from './stock-view';
import { Video } from './video';

type Avatar3DObject = Avatar & {
  isDestroyed: boolean;
  object: Three.Object3D;
  floatTween: TWEEN.Tween;
  failing: boolean;
  failTween: TWEEN.Tween;
  texture: Three.Texture;
};

type AvatarStock = Avatar;

function floatAnimation(
  obj: Avatar3DObject,
  group: TWEEN.Group,
  sign?: number,
) {
  const tween = new TWEEN.Tween(obj.object.position)
    .to(
      { y: obj.object.position.y + Math.random() * 200 * (sign || 1) },
      Math.random() * 3000 + 2000,
    )
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((p) => {
      obj.object.position.y = p.y;
    })
    .onComplete(() => floatAnimation(obj, group, -(sign || 1)))
    .start();
  group.add(tween);
}

function failAnimation(obj: Avatar3DObject, group: TWEEN.Group) {
  const tween = new TWEEN.Tween(obj.object.position)
    .to({ y: obj.object.position.y - 1000 }, 1000)
    .easing(TWEEN.Easing.Back.In)
    .onUpdate((p) => {
      obj.object.position.y = p.y;
    })
    .onComplete(() => obj.object.removeFromParent())
    .start();
  group.add(tween);
}

function showMessage(avatar: Avatar3DObject) {
  const {
    texture: spriteTexture,
    width: texWidth,
    height: texHeight,
  } = createTextTexture({ fontSize: 64, text: avatar.message });
  const spriteMaterial = new Three.SpriteMaterial({
    map: spriteTexture,
    transparent: true,
  });
  const sprite = new Three.Sprite(spriteMaterial);
  const ratio = texWidth / texHeight;
  sprite.scale.set(100 * ratio, 100, 1);
  sprite.position.y += avatar.texture.image.height / 2 + 200;
  avatar.object.add(sprite);
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
  const failTweenGroupRef = useRef<TWEEN.Group>();
  const [orientationSupported, setOrientationSupported] = useState(false);
  const [stock, setStock] = useState<AvatarStock[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!avatars) return;
    objects.current = avatars.map(
      (i) => ({ ...i, isDestroyed: false }) as Avatar3DObject,
    );

    const w = window.innerWidth;
    const h = window.innerHeight;

    tweenGroupRef.current = new TWEEN.Group();
    failTweenGroupRef.current = new TWEEN.Group();

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
    camera.position.set(0, 0, 1);
    camera.position.set(0, 0, 1);
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
        avatar.texture = texture;

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
        mesh.quaternion.copy(quaternion);
        mesh.up.set(0, 1, 0);
        sceneRef.current.add(group);
        floatAnimation(avatar, tweenGroupRef.current);
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
      if (failTweenGroupRef.current) {
        // 落下の処理
        failTweenGroupRef.current.update();
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
    if (
      cameraRef.current &&
      raycasterRef.current &&
      sceneRef.current &&
      failTweenGroupRef.current &&
      tweenGroupRef.current
    ) {
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
      let count = 0;
      for (const obj of intersects) {
        if (obj.object.userData.avatar) {
          const avatar = obj.object.userData.avatar as Avatar3DObject;
          if (avatar.failing) continue;
          avatar.failing = true;
          showMessage(avatar);
          failAnimation(avatar, failTweenGroupRef.current);
          setStock((prev) => [...prev, avatar]);
          if (stock.length + count === 4) {
            setDialogOpen(true);
          }
          count++;
        }
      }
    }
  };

  const goToNext = () => {};

  return (
    <>
      <Video
        disable={!orientationSupported}
        className={cn(
          'fixed left-0 top-0',
          !orientationSupported ? 'hidden' : '',
        )}
      />
      <div
        ref={mountRef}
        onPointerDown={handlePointerDown}
        className='fixed left-0 top-0 bg-transparent'
      />
      <StockView avatars={stock} />
      <Button
        onClick={() => router.replace('/sorting')}
        className='bottom fixed bottom-28 left-4 z-10 h-28 w-28 text-wrap rounded-full bg-red-400 text-lg hover:bg-red-500 md:bottom-4'
      >
        討伐を終了する
      </Button>

      <Dialog open={dialogOpen} onOpenChange={() => goToNext()}>
        <DialogContent className='bg-white'>
          <DialogHeader>
            <DialogTitle>スタックがいっぱいになりました。</DialogTitle>
            <DialogDescription>選別に進みますか？</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              {/* TODO: なんとかして状態保存 */}
              <Button
                type='button'
                variant='secondary'
                onClick={() => router.replace('/sorting')}
              >
                はい
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
