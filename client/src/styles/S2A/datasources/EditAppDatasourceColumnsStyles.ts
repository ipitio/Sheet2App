import { StyleContainer } from "../types/StyleContainer";

const EditAppDatasourceColumnsStyles: StyleContainer = {
  editAppDatasourceColumnsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif',
    backgroundColor: '#6CA6CD',
  },
  editAppDatasourceColumnsDisplay: {
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
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '200px',
    height: '310px',
    marginBottom: '25px',
    border: '2px solid #87CEEB',
    textAlign: 'center',
    position: 'relative',
    borderRadius: '8px'
  },
  columnElement: {
    marginTop: '15px',
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '10px',
  },
  columnCheckbox: {
    maxHeight: '10px',
    marginLeft: '25px',
  },
};

export default EditAppDatasourceColumnsStyles;
