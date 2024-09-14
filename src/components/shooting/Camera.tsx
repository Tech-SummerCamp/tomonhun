"use client"

import { type CSSProperties, useEffect, useRef } from "react";

export function Video({ className, style, disable }: { className?: string, style?: CSSProperties, disable?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video === null || disable) return;
    let videoInput: MediaDeviceInfo[] | null = null;
    let videoStream: MediaStream | null = null;

    const setVideo = (): MediaStreamConstraints => {
      return {
        audio: false,
        video: {
          deviceId: videoInput?.map((device) => device.deviceId),
          facingMode: "environment",
          width: { min: 1280, max: 1920 },
          height: { min: 720, max: 1080 },
        },
      };
    };

    const getVideo = () => {
      if (videoStream) {
        for (const track of videoStream.getTracks()) {
          track.stop();
        }
      }
      navigator.mediaDevices
        .getUserMedia(setVideo())
        .then((stream) => {
          video.srcObject = stream;
          video.play();
          videoStream = stream;
        })
        .catch((error) => {
          console.log(error);
          alert(
            "カメラの使用が拒否されています。\nページを再読み込みして使用を許可するか、ブラウザの設定をご確認ください。"
          );
        });
    };

    const initVideo = () => {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          videoInput = devices.filter((device) => device.kind === "videoinput");
          getVideo();
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        });
    };

    window.onload = () => {
      initVideo();
    };
    initVideo();
  }, [disable])

  return (
    <video ref={videoRef} className={className} playsInline style={style} />
  )
}