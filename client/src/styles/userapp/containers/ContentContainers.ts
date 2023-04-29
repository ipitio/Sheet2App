import { StyleContainer } from "../types/StyleContainer";

const ContentContainer: StyleContainer = {
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
  },
  // The default content container. Adds the padding to the top of the screen so as to
  // not be overlapping with the nav bar
  contentContainer: {
    marginTop: '100px'
  },
  grid: {
    overflow: 'auto',
    padding: '2px',
  },
  gridItemContainer: {
    height: '20vh',
    textAlign: 'center',
    position: 'relative',
    borderRadius: '8px',
    fontSize: '36px',
    textOverflow: 'ellipsis',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection:'column',
    backgroundColor: '#1976d2',
    color: 'white'
  },
  accessAppButton: {
    position: 'absolute',
    top: '0',
    right: '0',
    color: 'white'
  },
};

export default ContentContainer;
