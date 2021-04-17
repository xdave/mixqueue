import { Theme } from "@material-ui/core";

export const styles = (theme: Theme) =>
  ({
    paper: {
      position: "relative",
      margin: `${theme.spacing()}px`,
      padding: `${theme.spacing()}px`,
    },
    tracklist: {
      height: "175px",
      overflowY: "scroll",
    },
    track: {
      fontWeight: "bold",
    },
  } as const);
