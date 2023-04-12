import { StyleContainer } from "./StyleContainer";

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
  modalButton: {
    marginLeft: '50px',
    textTransform: 'capitalize',
    borderColor: '#3d6078',
    backgroundColor: '#669cc1',
    color: '#2e495c',
  },
};

export default ModalStyles;
