import { StyleContainer } from "../types/StyleContainer";

const HomeNavBarStyles: StyleContainer = {
  navBarWrapper: {
    paddingTop: '1vh',
    paddingBottom: '1vh',
    backgroundColor: '#6CA6CD',
  },
  navBarTitle: {
    flexGrow: 0.1,
  },
  createAppButton: {
    fontSize: '1rem',
    color: 'white',
    borderRadius: 2,
    borderColor: '#53809e',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    background: 'linear-gradient(to bottom, #5a8cad, #6CA6CD)',
  },
  searchAppTextfield: {
    height: '55px',
    flexGrow: 0.75,
    marginLeft: 'auto',
    background: 'white',
    borderRadius: '12px'
  },
  displayButton: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    borderColor: '#6CA6CD',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderRadius: '8px',
    background: '#5a8cad',
  },
  displayDevAppsButton: {
    marginLeft: '200px',
  },
  displayAccAppsButton: {
    marginLeft: '10px',
  },
  openProfileButton: {
    marginLeft: '10px',
  },
};

export default HomeNavBarStyles;
