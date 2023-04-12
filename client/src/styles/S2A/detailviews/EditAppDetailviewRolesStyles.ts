import { StyleContainer } from "../types/StyleContainer";

const EditAppDetailviewRolesStyles: StyleContainer = {
  editAppDetailviewRolesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif',
    backgroundColor: '#6CA6CD',
  },
  editAppDetailviewRolesDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1',
    overflow: 'auto',
    paddingTop: '100px',
    backgroundColor: 'white',
  },
  saveButton: {
    fontSize: '1.5rem',
    color: 'white',
    borderRadius: 2,
    borderColor: '#53809e',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    background: 'linear-gradient(to bottom, #5a8cad, #6CA6CD)',
  },
  saveIcon: {
    marginLeft: '15px',
  },
  grid: {
    overflow: 'auto',
    padding: '2px',
    marginTop: '30px',
  },
  gridItemContainer: {
    height: '80px',
    border: '2px solid #87CEEB',
    textAlign: 'center',
    position: 'relative',
  },
  deleteTableviewButton: {
    bottom: '0',
    right: '35%',
  },
  editTableviewButton: {
    position: 'absolute',
    bottom: '0',
    right: '20%',
  },
};

export default EditAppDetailviewRolesStyles;
