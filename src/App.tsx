import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useReactMediaRecorder } from "react-media-recorder";
import MyMediaRecorder from "./components/MyMediaRecorder";

function App() {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [cameraList, setCameraList] = useState<MediaDeviceInfo[]>([]);
  const [selectedCmaeraId, setSelectedCameraId] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: true,
      audio: false,
      customMediaStream: mediaStream,
    });

  useEffect(() => {
    if (mediaStream && videoRef.current) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  useEffect(() => {
    const getCameraList = async () => {
      await navigator.mediaDevices.getUserMedia({ video: true });
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === "videoinput");
      setCameraList(cameras);
      setMediaStream(
        await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: cameras[0].deviceId,
          },
        })
      );
    };
    getCameraList();
  }, []);

  return (
    <>
      <select
        value={selectedCmaeraId}
        onChange={async (e) => {
          setSelectedCameraId(e.target.value);
          setMediaStream(null);
          setTimeout(async () => {
            setMediaStream(
              await navigator.mediaDevices.getUserMedia({
                video: {
                  deviceId: e.target.value,
                },
              })
            );
          }, 1000);
        }}
      >
        {cameraList.map((camera) => (
          <option key={camera.deviceId} value={camera.deviceId}>
            {camera.label}
          </option>
        ))}
      </select>
      <br />
      <video ref={videoRef} autoPlay playsInline />
      <div>
        <p>{status}</p>
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
        <video src={mediaBlobUrl} controls autoPlay loop />
      </div>
      {mediaStream && <MyMediaRecorder customStream={mediaStream} />}
    </>
  );
}

export default App;
