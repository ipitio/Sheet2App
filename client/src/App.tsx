import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'

import store from './store/StoreContext'

import Splash from './components/S2A/splash/Splash'
import S2AHomeAccess from './components/S2A/home/HomeAccess'
import S2AHomeDevelop from './components/S2A/home/HomeDevelop'
import EditAppDatasources from './components/S2A/datasources/EditAppDatasources'
import EditAppDatasourceColumns from './components/S2A/datasources/EditAppDatasourceColumns';
import EditAppTableviews from './components/S2A/tableviews/EditAppTableviews';
import EditAppTableviewColumns from './components/S2A/tableviews/EditAppTableviewColumns';
import EditAppTableviewRoles from './components/S2A/tableviews/EditAppTableviewRoles';

import CreateAppModal from './components/S2A/modals/apps/CreateAppModal';
import DeleteAppModal from './components/S2A/modals/apps/DeleteAppModal';
import CreateDatasourceModal from './components/S2A/modals/datasources/CreateDatasourceModal';
import EditDatasourceModal from './components/S2A/modals/datasources/EditDatasourceModal';
import DeleteDatasourceModal from './components/S2A/modals/datasources/DeleteDatasourceModal';
import CreateTableviewModal from './components/S2A/modals/tableviews/CreateTableviewModal';
import EditTableviewModal from './components/S2A/modals/tableviews/EditTableviewModal';
import DeleteTableviewModal from './components/S2A/modals/tableviews/DeleteTableviewModal';

import UserAppHome from './components/userapp/Home'
import TableView from './components/userapp/TableView';
import DetailView from './components/userapp/DetailView';

import AddRecordModal from './components/userapp/modals/AddRecordModal';
import EditRecordModal from './components/userapp/modals/EditRecordModal';
import DeleteRecordModal from './components/userapp/modals/DeleteRecordModal';


const App: React.FC = () => {
  return (
     <Provider store={store}>
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

          {/* User App Routes */}
          <Route path="/userapp/:appid/home" element={<UserAppHome/>} />
          <Route path="/userapp/:appid/tableview/:tableviewid" element={<TableView/>}/>

          {/* TESTING. TODO: REMOVE */}
          <Route path="/test/table" element={<TableView/>}/>
          <Route path="/test/detail" element={<DetailView/>}/>
        </Routes>
      </Router>
      
      {/* S2A Modals */}
      <CreateAppModal/>
      <DeleteAppModal/>
      <CreateDatasourceModal/>
      <EditDatasourceModal/>
      <DeleteDatasourceModal/>
      <CreateTableviewModal/>
      <EditTableviewModal/>
      <DeleteTableviewModal/>

      {/* User App Modals */}
      <AddRecordModal/>
      <EditRecordModal/>
      <DeleteRecordModal/>
      
     </Provider>
  );
}

export default App;
