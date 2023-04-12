import { StyleContainer } from "../types/StyleContainer";

const SplashStyles: StyleContainer = {
  splashWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '5% 70% 25%',
    height: '100vh',
    fontFamily: 'sans-serif',
  },
  title: {
    gridColumn: 1,
    gridRow: 1,
    marginLeft: '5rem',
    textAlign: 'left',
    fontSize: '2.5rem',
  },
  poweredBy: {
    gridColumn: 3,
    gridRow: 1,
    marginLeft: '10rem',
    textAlign: 'center',
    fontSize: '1.1rem',
    fontWeight: 'lighter',
  },
  icon: {
    marginLeft: '0.5rem',
    marginRight: '0.5rem',  
    verticalAlign: 'middle',
    height: '2rem',
  },
  gcloud: {
    content: `url(${require("../images/googlecloud.png")})`,
  },
  gsheets: {
    content: `url(${require("../images/googlesheets.png")})`,
  },
  centerWrapper: {
    gridColumn: '1 / span 3',
    gridRow: 2,
    justifySelf: 'center',
    alignSelf: 'center',
    height: '55vh',
    width: '100vw',
    backgroundColor: '#87CEEB',
  },
  description: {
    display: 'flex',
    marginTop: '1rem',
    justifyContent: 'center',
    fontSize: '2rem',
  },
  loginButton: {
    height: '65%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    display: 'flex',
    color: '#ff5252',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textbox: {
    gridRow: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #87CEEB',
    borderRadius: '10px',
    margin: '2rem',
    padding: '2rem',
  },
  textbox1: {
    gridColumn: '1',
  },
  textbox2: {
    gridColumn: '2',
  },
  textbox3: {
    gridColumn: '3',
  },
};

export default SplashStyles;
