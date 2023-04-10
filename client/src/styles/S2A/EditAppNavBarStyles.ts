import { StyleContainer } from "./StyleContainer";

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
    fontSize: '1rem',
    color: 'white',
    borderRadius: 2,
    borderColor: '#53809e',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    background: 'linear-gradient(to bottom, #5a8cad, #6CA6CD)',
  },
  editAppTextfield: {
    marginLeft: '5vw',
    flexGrow: 0.8,
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
    marginLeft: '5vw',
  },
  displayTableviewsButton: {
    marginLeft: '1vw',
  },
  displayDetailviewsButton: {
    marginLeft: '1vw',
  },
  displayRolesButton: {
    marginLeft: '1vw',
  },
  displayReturnButton: {
    marginLeft: '1vw',
  },
};

export default EditAppNavBarStyles;
