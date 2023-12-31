import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

import {store, persistor} from './store/StoreContext'

import Splash from './components/S2A/splash/Splash'
import S2AHomeAccess from './components/S2A/home/HomeAccess'
import S2AHomeDevelop from './components/S2A/home/HomeDevelop'
import EditAppDatasources from './components/S2A/datasources/EditAppDatasources'
import EditAppDatasourceColumns from './components/S2A/datasources/EditAppDatasourceColumns';
import EditAppTableviews from './components/S2A/tableviews/EditAppTableviews';
import EditAppTableviewColumns from './components/S2A/tableviews/EditAppTableviewColumns';
import EditAppTableviewRoles from './components/S2A/tableviews/EditAppTableviewRoles';
import EditAppDetailviews from './components/S2A/detailviews/EditAppDetailviews';
import EditAppDetailviewColumns from './components/S2A/detailviews/EditAppDetailviewColumns';
import EditAppDetailviewRoles from './components/S2A/detailviews/EditAppDetailviewRoles';

import CreateAppModal from './components/S2A/modals/apps/CreateAppModal';
import DeleteAppModal from './components/S2A/modals/apps/DeleteAppModal';
import PublishAppModal from './components/S2A/modals/apps/PublishAppModal';
import UnpublishAppModal from './components/S2A/modals/apps/UnpublishAppModal';
import CreateDatasourceModal from './components/S2A/modals/datasources/CreateDatasourceModal';
import EditDatasourceModal from './components/S2A/modals/datasources/EditDatasourceModal';
import DeleteDatasourceModal from './components/S2A/modals/datasources/DeleteDatasourceModal';
import CreateTableviewModal from './components/S2A/modals/tableviews/CreateTableviewModal';
import EditTableviewModal from './components/S2A/modals/tableviews/EditTableviewModal';
import DeleteTableviewModal from './components/S2A/modals/tableviews/DeleteTableviewModal';
import CreateDetailviewModal from './components/S2A/modals/detailviews/CreateDetailviewModal';
import EditDetailviewModal from './components/S2A/modals/detailviews/EditDetailviewModal';
import DeleteDetailviewModal from './components/S2A/modals/detailviews/DeleteDetailviewModal';

import UserAppHome from './components/userapp/Home'
import Tableview from './components/userapp/Tableview';
import Detailview from './components/userapp/Detailview';

import AddRecordModal from './components/userapp/modals/AddRecordModal';
import DeleteRecordModal from './components/userapp/modals/DeleteRecordModal';
import EditAppRoleSheet from './components/S2A/rolesheet/EditAppRoleSheet';

import SuccessAlert from './alerts/SuccessAlert';
import ErrorAlert from './alerts/ErrorAlert';
import ServiceEmailAlert from './alerts/ServiceEmailAlert';


const App: React.FC = () => {
  return (
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            {/* S2A Routes */}
            <Route path="*" element={<Splash/>}/>
            <Route path="/S2A/home/develop" element={<S2AHomeDevelop/>}/>
            <Route path="/S2A/home/access" element={<S2AHomeAccess/>}/>
            <Route path="/S2A/editapp/datasources/:appid" element={<EditAppDatasources/>}/>
            <Route path="/S2A/editapp/datasources/datasourcecolumns/:appid" element={<EditAppDatasourceColumns/>}/>
            <Route path="/S2A/editapp/tableviews/:appid" element={<EditAppTableviews/>}/>
            <Route path="/S2A/editapp/tableviews/tableviewcolumns/:appid" element={<EditAppTableviewColumns/>}/>
            <Route path="/S2A/editapp/tableviews/tableviewroles/:appid" element={<EditAppTableviewRoles/>}/>
            <Route path="/S2A/editapp/detailviews/:appid" element={<EditAppDetailviews/>}/>
            <Route path="/S2A/editapp/detailviews/detailviewcolumns/:appid" element={<EditAppDetailviewColumns/>}/>
            <Route path="/S2A/editapp/detailviews/detailviewroles/:appid" element={<EditAppDetailviewRoles/>}/>
            <Route path="/S2A/editapp/rolesheet/:appid" element={<EditAppRoleSheet/>}/>


            {/* User App Routes */}
            <Route path="/userapp/:appid/home" element={<UserAppHome/>} />
            <Route path="/userapp/:appid/tableview/:tableviewid" element={<Tableview/>}/>
            <Route path="/userapp/:appid/detailview/:detailviewid" element={<Detailview/>}/>

            {/* TESTING. TODO: REMOVE */}
            <Route path="/test/table" element={<Tableview/>}/>
            <Route path="/test/detail" element={<Detailview/>}/>
          </Routes>
        </Router>
      
        {/* S2A Modals */}
        <CreateAppModal/>
        <DeleteAppModal/>
        <PublishAppModal/>
        <UnpublishAppModal/>
        <CreateDatasourceModal/>
        <EditDatasourceModal/>
        <DeleteDatasourceModal/>
        <CreateTableviewModal/>
        <EditTableviewModal/>
        <DeleteTableviewModal/>
        <CreateDetailviewModal/>
        <EditDetailviewModal/>
        <DeleteDetailviewModal/>

        {/* Success and Error alerts */}
        <SuccessAlert/>
        <ErrorAlert/>
        <ServiceEmailAlert/>

        {/* User App Modals */}
        <AddRecordModal/>
        <DeleteRecordModal/>

      </PersistGate>
     </Provider>
  );
}

export default App;
