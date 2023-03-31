import { StyleContainer } from "./StyleContainer";

const HomeStyles: StyleContainer = {
  homeWrapper: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif',
    backgroundColor: '#6CA6CD',
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'sans-serif',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContainer: {
    padding: '30px',
    borderRadius: '10px',
    backgroundColor: '#6CA6CD',
  },
  modalButton: {
    marginLeft: '50px',
    textTransform: 'capitalize',
    borderColor: '#3d6078',
    backgroundColor: '#669cc1',
    color: '#2e495c',
  },
  homeDisplay: {
    flex: '1',
    overflow: 'auto',
    paddingTop: '75px',
    backgroundColor: 'white',
  },
  grid: {
    overflow: 'auto',
    padding: '2px',
  },
  gridItemContainer: {
    height: '60px',
    border: '2px solid #87CEEB',
    textAlign: 'center',
    position: 'relative',
  },
  deleteAppButton: {
    position: 'absolute',
    top: '0',
    left: '0',
  },
  editAppButton: {
    position: 'absolute',
    top: '0',
    right: '0',
  },
  accessAppButton: {
    position: 'absolute',
    top: '0',
    right: '0',
  },

};

export default HomeStyles;
