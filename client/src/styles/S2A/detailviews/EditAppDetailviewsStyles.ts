import { StyleContainer } from "../types/StyleContainer";

const EditAppDetailviewsStyles: StyleContainer = {
  editAppDetailviewsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif',
    backgroundColor: '#6CA6CD',
  },
  editAppDetailviewsDisplay: {
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
    height: '80px',
    border: '2px solid #87CEEB',
    textAlign: 'center',
    position: 'relative',
    borderRadius: '8px'
  },
  deleteDetailviewButton: {
    position: 'absolute',
    bottom: '0', 
    right: '65%',
  },
  editDetailviewColumnsButton: {
    position: 'absolute',
    bottom: '0',
    right: '50%',
  },
  editDetailviewRolesButton: {
    position: 'absolute',
    bottom: '0',
    right: '35%',
  },
  editDetailviewButton: {
    position: 'absolute',
    bottom: '0',
    right: '20%',
  },
};

export default EditAppDetailviewsStyles;
