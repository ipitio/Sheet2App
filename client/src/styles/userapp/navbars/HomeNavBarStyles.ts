import { StyleContainer } from "../types/StyleContainer";

const HomeNavBarStyles: StyleContainer = {
  openProfileButton: {
    marginRight: '10px'
  },
  searchAppTextfield: {
    height: '35%',
    width: '35%',
    background: 'white',
    borderRadius: '12px'
  },
  appName: {
    fontSize: '36px',
    fontWeight: 'bold'
  },
  navBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: '100%',
    maxWidth: '100%',
    alignItems: 'center'
  }
};

export default HomeNavBarStyles;
