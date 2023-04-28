import { StyleContainer } from "../types/StyleContainer";

const EditAppRoleSheetStyles: StyleContainer = {
  editAppRoleSheetWrapper: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif',
    backgroundColor: 'white',
  },
  editAppRoleSheetDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1',
    overflow: 'auto',
    paddingTop: '100px',
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
  textfieldLabel: {
    marginTop: '150px',
  },
  textfield: {
    marginTop: '20px',
    minWidth: '200px',
  },
};

export default EditAppRoleSheetStyles;
