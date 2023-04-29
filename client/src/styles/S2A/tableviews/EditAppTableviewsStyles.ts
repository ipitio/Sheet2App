import { StyleContainer } from "../types/StyleContainer";

const EditAppTableviewsStyles: StyleContainer = {
  editAppTableviewsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif',
    backgroundColor: '#6CA6CD',
  },
  editAppTableviewsDisplay: {
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
  deleteTableviewButton: {
    position: 'absolute',
    bottom: '0', 
    right: '65%',
  },
  editTableviewColumnsButton: {
    position: 'absolute',
    bottom: '0',
    right: '50%',
  },
  editTableviewRolesButton: {
    position: 'absolute',
    bottom: '0',
    right: '35%',
  },
  editTableviewButton: {
    position: 'absolute',
    bottom: '0',
    right: '20%',
  },
};

export default EditAppTableviewsStyles;
