import { StyleContainer } from "../types/StyleContainer";

const EditAppNavBarStyles: StyleContainer = {
  navBarWrapper: {
    paddingTop: '1vh',
    paddingBottom: '1vh',
    backgroundColor: '#6CA6CD',
  },
  navBarTitle: {
    flexGrow: 0.1,
  },
  createButton: {
    marginLeft: '30px',
    fontSize: '1rem',
    color: 'white',
    borderRadius: 2,
    borderColor: '#53809e',
    borderWidth: '2px',
    borderStyle: 'solid',
    background: 'linear-gradient(to bottom, #5a8cad, #6CA6CD)',
  },
  editAppTextfield: {
    marginLeft: '100px',
    minWidth: '400px',
    background: 'white',
    borderRadius: '12px'
  },
  buttonContainer: {
    position: 'absolute',
    right: 20,
  },
  displayButton: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    borderColor: '#6CA6CD',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderRadius: '8px',
    background: '#5a8cad',
  },
  displayDatasourcesButton: {
    marginLeft: '250px',
  },
  displayTableviewsButton: {
    marginLeft: '10px',
  },
  displayDetailviewsButton: {
    marginLeft: '10px',
  },
  displayRolesButton: {
    marginLeft: '10px',
  },
  displayReturnButton: {
    marginLeft: '10px',
  },
};

export default EditAppNavBarStyles;
