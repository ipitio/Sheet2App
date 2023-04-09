import { KeyboardEventHandler, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { viewDatasources, createDatasource, setCurrentDatasource, editDatasource, StoreState } from '../../store/StoreContext';
import { Column, Datasource, ModalType } from '../../store/StoreTypes';

import styles from "../../styles/S2A/EditAppDatasourcesStyles";
import EditAppNavBar from "./EditAppNavBar";
import { Button, Grid, IconButton, TextField, Modal, FormControlLabel, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';


function EditAppDatasources() {
    return (
        <div></div>
    );
}

export default EditAppDatasources;