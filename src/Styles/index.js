const styles = {
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
      h1: '2.3rem',
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
  contentMaxWidth: '1500px',
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
}

export const helpers = {
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

// const StyledPageContent = styled.div`
//   padding: ${space.xs};
//   max-width: ${styles.contentMaxWidth};

//   @media (min-width: ${breakpoints.m}) {
//     padding: ${space.m};
//   }
//   @media (min-width: ${breakpoints.xl}) {
//     padding: ${space.xl};
//   }
// `

export const themes = {
  dark: {
    text: '#9EABC2',
    secondaryText: '#636974',
    background: '#191919',
    sectionBackground: '#1D1D1D',
    fieldBackground: '#26282c',
    nav: '#141926',
    primary: '#75ADF7',
    secondary: '#1D2843',
    complement: '#354A68',
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
