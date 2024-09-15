'use client';
import * as THREE from 'three';
// https://qiita.com/mtoutside/items/b1e6adb8ca60c14a8ee4#canavas%E3%81%AB%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88%E3%82%92%E6%8F%8F%E7%94%BB%E3%81%97%E3%81%A6%E3%83%86%E3%82%AF%E3%82%B9%E3%83%81%E3%83%A3%E3%82%92%E4%BD%9C%E3%82%8B

/**
 * 2D Canvasからテクスチャを作成する
 * @param {Object} options
 * @param {stirng} options.text 描画したい文字列
 * @param {number} options.fontSize フォントサイズ
 * @return {Object} テクスチャを返す。
 * @memberof Canvas
 */
export function createTextTexture(options: { fontSize: number; text: string }) {
  const paddingX = 24; // 文字の周りの余白
  const paddingY = 12; // 文字の周りの余白
  // Canvas要素を作成
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  // measureTextするためいったん設定
  const fontFamily = 'M PLUS Rounded 1c';
  // const fontFamily = 'sans-serif';
  ctx.font = `bold ${options.fontSize * window.devicePixelRatio}px '${fontFamily}'`;
  const textWidth = ctx.measureText(options.text); // 文字の横幅を取得

  // dprに対応したサイズを計算
  const width = textWidth.width + paddingX * 2;
  const height = options.fontSize * window.devicePixelRatio + paddingY * 2; // 文字に合わせて高さを調整。ここの高さは任意で
  // 幅を指定
  canvas.width = width;
  canvas.height = height;

  // 背景描画、RoundedRectを描画
  ctx.fillStyle = '#D9D9D9';
  // ctx.fillRect(0, 0, width, height);
  const cornerRadius = Math.min(width, height) / 4;
  ctx.beginPath();
  ctx.moveTo(cornerRadius, 0);
  ctx.lineTo(width - cornerRadius, 0);
  ctx.quadraticCurveTo(width, 0, width, cornerRadius);
  ctx.lineTo(width, height - cornerRadius);
  ctx.quadraticCurveTo(width, height, width - cornerRadius, height);
  ctx.lineTo(cornerRadius, height);
  ctx.quadraticCurveTo(0, height, 0, height - cornerRadius);
  ctx.lineTo(0, cornerRadius);
  ctx.quadraticCurveTo(0, 0, cornerRadius, 0);
  ctx.fill();

  // 中央にテキストを描画
  ctx.font = `bold ${options.fontSize * window.devicePixelRatio}px '${fontFamily}'`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  // ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
  ctx.fillText(options.text, paddingX, paddingY); // 文字が途切れないように調整。数値はよしなに

  // ↓canvasの文字を確認したいとき。テキストを描画したcanvasをbodyに追加しているだけです。
  // document.body.appendChild(canvas);
  // canvas.style.backgroundColor = '#933';
  // canvas.style.position = 'relative';

  // テクスチャを作成
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = false;
  // ↓ここら辺の設定をしておかないとthree.jsでエラーが出る時がある
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.format = THREE.RGBAFormat;

  return { texture, width, height };
}
