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
  textfieldLabel: {
    marginTop: '150px',
  },
  textfield: {
    marginTop: '20px',
    minWidth: '200px',
  },
};

export default EditAppRoleSheetStyles;
