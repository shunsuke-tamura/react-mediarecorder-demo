import { useRef, useEffect } from "react";
import {
  useReactMediaRecorder,
  ReactMediaRecorder,
} from "react-media-recorder";

const MyMediaRecorder = ({ customStream }: { customStream: MediaStream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: true,
      audio: false,
      customMediaStream: customStream,
    });

  useEffect(() => {
    if (customStream && videoRef.current) {
      videoRef.current.srcObject = customStream;
    }
  }, [customStream]);

  return (
    <div>
      <p>mine</p>
      <video ref={videoRef} autoPlay playsInline></video>
      <ReactMediaRecorder
        video
        customMediaStream={customStream}
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <>
            <p>{status}</p>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
            <video src={mediaBlobUrl} controls autoPlay loop />
          </>
        )}
      />
      {/* <div>
        <p>{status}</p>
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
        <video src={mediaBlobUrl} controls autoPlay loop />
      </div> */}
    </div>
  );
};

export default MyMediaRecorder;
