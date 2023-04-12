import { StyleContainer } from "../types/StyleContainer";

const EditAppDatasourcesStyles: StyleContainer = {
  editAppDatasourcesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif',
    backgroundColor: '#6CA6CD',
  },
  editAppDatasourcesDisplay: {
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
  },
  deleteDatasourceButton: {
    position: 'absolute',
    bottom: '0', 
    right: '60%',
  },
  editDatasourceColumnsButton: {
    position: 'absolute',
    bottom: '0',
    right: '43%',
  },
  editDatasourceButton: {
    position: 'absolute',
    bottom: '0',
    right: '25%',
  },
};

export default EditAppDatasourcesStyles;
