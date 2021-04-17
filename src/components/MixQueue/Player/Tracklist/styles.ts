import theme from "../../../../util/theme";

export default () =>
  ({
    paper: {
      margin: `${theme.spacing()}px`,
      padding: `${theme.spacing()}px`,
    },
    tracklist: {
      // margin: `${theme.spacing()}px`,
      // padding: `${theme.spacing()}px`,
    },
    track: {
      display: "flex",
      justifyContent: "start",
      "& span": {
        padding: "3px",
      },
    },
    activeTrack: {
      fontWeight: "bold",
    },
  } as const);
