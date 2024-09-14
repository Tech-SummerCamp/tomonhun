"use client"

import { type CSSProperties, useEffect, useRef } from "react";

export function Video({ className, style }: { className?: string, style?: CSSProperties }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video === null) return;
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

    const adjustVideo = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      const videoAspect: number = videoWidth / videoHeight;
      const windowAspect: number = windowWidth / windowHeight;

      if (windowAspect < videoAspect) {
        const newWidth: number = videoAspect * windowHeight;
        video.style.width = `${newWidth}px`;
        video.style.marginLeft = `${-(newWidth - windowWidth) / 2}px`;
        video.style.height = `${windowHeight}px`;
        video.style.marginTop = "0px";
      } else {
        const newHeight: number = 1 / (videoAspect / windowWidth);
        video.style.height = `${newHeight}px`;
        video.style.marginTop = `${-(newHeight - windowHeight) / 2}px`;
        video.style.width = `${windowWidth}px`;
        video.style.marginLeft = "0px";
      }
    };

    const initVideo = () => {
      video.addEventListener("loadedmetadata", adjustVideo);

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
  }, [])

  return (
    <video ref={videoRef} className={className} playsInline style={style} />
  )
}