import { StyleContainer } from "../types/StyleContainer";

const HomeStyles: StyleContainer = {
  homeWrapper: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif',
    backgroundColor: '#6CA6CD',
  },
  homeDisplay: {
    flex: '1',
    overflow: 'auto',
    paddingTop: '100px',
    backgroundColor: 'white',
  },
  grid: {
    overflow: 'auto',
    padding: '2px',
  },
  gridItemContainer: {
    height: '20vh',
    border: '2px solid #87CEEB',
    textAlign: 'center',
    position: 'relative',
    borderRadius: '8px',
    fontSize: '36px',
    textOverflow: 'ellipsis',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  deleteAppButton: {
    position: 'absolute',
    bottom: '0',
    right: '60%',
  },
  editAppButton: {
    position: 'absolute',
    bottom: '0',
    right: '45%',
  },
  publishAppButton: {
    position: 'absolute',
    bottom: '0',
    right: '30%',
  },
  accessAppButton: {
    position: 'absolute',
    top: '0',
    right: '0',
  },
};

export default HomeStyles;
