import { useReactMediaRecorder } from "react-media-recorder";

const useMediaRecorder = ({ customStream }: { customStream: MediaStream }) => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: true,
      audio: false,
      customMediaStream: customStream,
    });

  return {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  };
};
