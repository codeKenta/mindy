export default {
  colors: {
    initialColorMode: "dark",
    text: "#9EABC2",
    secondaryText: "#636974",
    background: "#191919",
    sectionBackground: "#1D1D1D",
    fieldBackground: "#1A1C1F",
    nav: "#141926",
    primary: "#75ADF7",
    secondary: "#1D2843",
    complement: "#354A68",
    modes: {
      light: {
        text: "black",
        secondaryText: "#636974",
        background: "white",
      },
    },
  },
  fonts: {
    body: "Nunito, sans-serif",
    heading: "inherit",
    monospace: "Menlo, monospace",
  },

  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },

  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],

  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    h1: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 5,
    },
    h2: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 4,
    },
    h3: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 3,
    },
    h4: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 2,
    },
    h5: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 1,
    },
    h6: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 0,
    },
    p: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
    },
    a: {
      color: "primary",
    },
    img: {
      maxWidth: "100%",
      display: "block",
    },
  },
}
