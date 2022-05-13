import {useEffect, useState} from 'react';

export const measureMicroTime = (fun: () => void) => {
  const start = new Date().getTime();
  fun();
  const end = new Date().getTime();
  return end - start;
};
export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};
export const lzwEncode = (str: string) => {
  let dict = {};
  const data = (str + '').split('');
  const out = [];
  let currChar;
  let phrase = data[0];
  let code = 256;
  for (let i = 1; i < data.length; i++) {
    currChar = data[i];
    if (dict[phrase + currChar] != null) {
      phrase += currChar;
    } else {
      out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
      dict[phrase + currChar] = code;
      code++;
      phrase = currChar;
    }
  }
  out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
  for (let i = 0; i < out.length; i++) {
    out[i] = String.fromCharCode(out[i]);
  }
  return out.join('');
};

type FrameData = {
  fps: number;
  lastStamp: number;
  framesCount: number;
  average: number;
  totalCount: number;
};

export type FPS = {average: FrameData['average']; fps: FrameData['fps']};

export function useFPSMetric(): FPS {
  const [frameState, setFrameState] = useState<FrameData>({
    fps: 0,
    lastStamp: Date.now(),
    framesCount: 0,
    average: 0,
    totalCount: 0,
  });

  useEffect(() => {
    // NOTE: timeout is here
    // because requestAnimationFrame is deferred
    // and to prevent setStates when unmounted
    let timeout: NodeJS.Timeout | null = null;

    requestAnimationFrame((): void => {
      timeout = setTimeout((): void => {
        const currentStamp = Date.now();
        const shouldSetState = currentStamp - frameState.lastStamp > 1000;

        const newFramesCount = frameState.framesCount + 1;
        // updates fps at most once per second
        if (shouldSetState) {
          const newValue = frameState.framesCount;
          const totalCount = frameState.totalCount + 1;
          // I use math.min here because values over 60 aren't really important
          // I calculate the mean fps incrementatally here instead of storing all the values
          const newMean = Math.min(
            frameState.average + (newValue - frameState.average) / totalCount,
            60,
          );
          setFrameState({
            fps: frameState.framesCount,
            lastStamp: currentStamp,
            framesCount: 0,
            average: newMean,
            totalCount,
          });
        } else {
          setFrameState({
            ...frameState,
            framesCount: newFramesCount,
          });
        }
      }, 0);
    });
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [frameState]);

  return {average: frameState.average, fps: frameState.fps};
}
