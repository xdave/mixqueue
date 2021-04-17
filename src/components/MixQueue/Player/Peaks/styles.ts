import { Theme } from "@material-ui/core";

// export type StyleProps = {
//     peaks: string;
// }

export const styles = (_theme: Theme) =>
  ({
    peaksContainer: {
      position: "relative",
      width: "100%",
      height: "80px",
      backgroundColor: "rgba(0,43,89,0.75)",
    },
    peaks: {
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 100%",
      width: "100%",
    },
    controlsContainer: {
      position: "absolute",
      height: "100%",
    },
    controls: {
      position: "absolute",
      top: "calc(50% - 10px)",
      height: "20px",
      "& svg": {
        color: "#fff",
      },
      "& button": {
        height: "20px",
      },
    },
    playbackPosition: {
      position: "absolute",
      borderLeft: "1px dashed white",
      height: "100%",
    },
    time: {
      color: "rgba(255, 255, 255,0.6)",
      fontFamily: "monospace",
      fontSize: "9px",
    },
    currentTime: {
      color: "rgba(255, 255, 255,0.6)",
      fontFamily: "monospace",
      fontSize: "9px",
      position: "absolute",
      bottom: "0px",
    },
    duration: {
      color: "rgba(255, 255, 255,0.6)",
      fontFamily: "monospace",
      fontSize: "9px",
      position: "absolute",
      bottom: "0px",
      right: "0px",
    },
    posSelector: {
      position: "absolute",
      borderLeft: "1px dotted white",
      height: "100%",
    },
    posSelectTime: {
      color: "rgba(255, 255, 255,0.6)",
      fontFamily: "monospace",
      fontSize: "9px",
      position: "absolute",
      top: "calc(50% - 4.5px)",
    },
  } as const);
