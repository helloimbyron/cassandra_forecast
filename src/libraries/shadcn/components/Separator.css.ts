import { globalStyle, style } from "@vanilla-extract/css";

export const separatorRoot = style({
  "@layer": {
    components: {
      flexShrink: "0",
      background: "var(--border)",
    },
  },
});

globalStyle(`${separatorRoot}[data-orientation="horizontal"]`, {
  "@layer": {
    components: {
      width: "100%",
      height: "var(--line-thin)",
    },
  },
});

globalStyle(`${separatorRoot}[data-orientation="vertical"]`, {
  "@layer": {
    components: {
      width: "var(--line-thin)",
      alignSelf: "stretch",
    },
  },
});
