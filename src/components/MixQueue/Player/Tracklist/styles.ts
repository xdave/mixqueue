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
      fontWeight: "bold",
    },
  } as const);
