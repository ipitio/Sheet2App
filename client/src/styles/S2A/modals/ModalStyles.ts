import { StyleContainer } from "../types/StyleContainer";

const ModalStyles: StyleContainer = {
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
  modalTextfield: {
    marginLeft: '30px',
  },
  modalCheckbox: {
    marginLeft: '30px',
  },
  modalDropdown: {
    marginLeft: '20px',
    minWidth: '200px',
  },
  modalButton: {
    marginLeft: '50px',
    textTransform: 'capitalize',
    borderColor: '#3d6078',
    backgroundColor: '#669cc1',
    color: '#2e495c',
  },
  modalButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '20px',
  },
};

export default ModalStyles;
