import { Composition } from "remotion";
import { AskulAIDevelopmentVideo, SCENE_DURATION, SCENES } from "./video";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AskulAIDevelopment"
        component={AskulAIDevelopmentVideo}
        durationInFrames={SCENE_DURATION * SCENES.length}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
