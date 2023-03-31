import { StyleContainer } from "./StyleContainer";

const HomeNavBarStyles : StyleContainer = {
    navBarWrapper: {
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
      background: 'linear-gradient(to bottom, #5a8cad, #6CA6CD)',
    },
    displayDevAppsButton: {
      marginLeft: '200px',
      textTransform: 'capitalize',
      fontWeight: 'bold',
      borderColor: '#53809e',
      borderWidth: '0.5px',
      borderStyle: 'solid',
      background: 'linear-gradient(to bottom, #5a8cad, #6CA6CD)',
    },
    displayAccAppsButton: {
      marginLeft: '10px',
      textTransform: 'capitalize',
      fontWeight: 'bold',
      borderColor: '#53809e',
      borderWidth: '0.5px',
      borderStyle: 'solid',
      background: 'linear-gradient(to bottom, #5a8cad, #6CA6CD)',
    },    
    openProfileButton: {
      marginLeft: '10px',
    },
};

export default HomeNavBarStyles;