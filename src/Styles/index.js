const styles = {
  contentMaxWidth: '1500px',
  breakpoints: {
    xs: '500px',
    s: '600px',
    m: '768px',
    l: '900px',
    xl: '1300px',
    xxl: '1500px',
  },
  font: {
    fontFamily: {
      body: 'Nunito, sans-serif',
      heading: 'inherit',
    },
    fontWeights: {
      body: 400,
      heading: 700,
      bold: 700,
    },
    lineHeights: {
      body: 1.6,
      heading: 1.125,
    },
    fontSize: {
      root: '18px',
      xs: '12px',
      s: '14px',
      m: '16px',
      h1: '3rem',
      h2: '1.6rem',
      h3: '1.4rem',
      h4: '1.2rem',
      h5: '1.1rem',
      h6: '1.0rem',
    },
  },
  space: {
    xs: '5px',
    s: '10px',
    m: '15px',
    l: '20px',
    xl: '25px',
    xxl: '50px',
  },
  radius: {
    xs: '2px',
    s: '5px',
    m: '7px',
    l: '10px',
    xl: '13px',
    xxl: '15px',
  },
  gridLines: {
    column: {
      mainStart: 'main-start',
      mainEnd: 'main-end',
      contentStart: 'content-start',
      contentEnd: 'content-end',
    },
    row: {
      mainStart: 'main-start',
      mainEnd: 'main-end',
      contentStart: 'content-start',
      contentEnd: 'content-end',
    },
  },
  transitions: {
    general: 'all 500ms ease-out',
  },
}

export const helpers = {
  contentWrapperPaddingX: `
  padding-left: ${styles.space.m};
  padding-right: ${styles.space.m};

  @media (min-width: ${styles.breakpoints.s}) {
    padding-left: ${styles.space.xl};
    padding-right: ${styles.space.xl};
  }

  @media (min-width: ${styles.breakpoints.m}) {
    padding-left: ${styles.space.xxl};
    padding-right: ${styles.space.xxl};
  }
  `,
  placeContentInLayout: `
  grid-column: ${styles.gridLines.column.contentStart} / ${styles.gridLines.column.contentEnd};
    place-self: center;
  `,
  useGlobalLayout: `
      grid-template-columns: [main-start] minmax(${styles.space.s}, 1fr) [content-start] minmax(auto, 1500px) [content-end] minmax(${styles.space.s}, 1fr) [main-end];
      
      @media (min-width: ${styles.breakpoints.s}) {
        grid-template-columns: [main-start] minmax(${styles.space.m}, 1fr) [content-start] minmax(auto, 1500px) [content-end] minmax(${styles.space.m}, 1fr) [main-end];
      }
    `,
}

export const themes = {
  // dark: {
  //   text: 'rgb(252, 224, 187)',
  //   secondaryText: 'rgb(237, 107, 127)',
  //   background: '#191919',
  //   sectionBackground: '#111212',
  //   fieldBackground: '#26282c',
  //   extraBackground: 'rgb(30,31,65)',

  //   nav: 'rgb(30,31,65)',
  //   primary: 'rgb(237, 107, 127)',
  //   secondary: 'rgb(176, 80, 108)',
  //   complement: '#354A68',
  //   disabled: '#414142',
  // },
  dark: {
    text: '#9EABC2',
    secondaryText: '#636974',
    background: '#191919',
    sectionBackground: '#111212',
    fieldBackground: '#26282c',
    nav: 'rgb(30,31,65)',
    primary: '#75ADF7',
    secondary: '#1D2843',
    complement: '#354A68',
    disabled: '#414142',
    success: '#14D069',
    error: '#DC1289',
  },
  light: {
    text: '#9EABC2',
    secondaryText: '#636974',
    background: '#191919',
    sectionBackground: '#1D1D1D',
    fieldBackground: '#1A1C1F',
    nav: '#141926',
    primary: '#75ADF7',
    secondary: '#1D2843',
    complement: '#354A68',
  },
}

export default styles
