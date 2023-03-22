import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Splash from './components/S2A/Splash'
import S2AHomeAccess from './components/S2A/HomeAccess'
import S2AHomeDevelop from './components/S2A/HomeDevelop'
import EditApp from './components/S2A/EditApp';
import EditAppDatasources from './components/S2A/EditAppDatasources'

import UserAppHome from './components/userapp/Home'
import TableView from './components/userapp/TableView';

import store from './store/StoreContext'
import { Provider } from 'react-redux'
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
          <Route path="*" element={<Splash />} />\
          <Route path="/S2A/home/develop" element={<S2AHomeDevelop/>}/>
          <Route path="/S2A/home/access" element={<S2AHomeAccess/>} />
          <Route path="/S2A/editapp/:appid" element={<EditApp />} />
          <Route path="/S2A/editapp/datasources/:appid" element={<EditAppDatasources />} />

          {/* User App Routes */}
          <Route path="/userapp/:appid/home" element={<UserAppHome />} />
          <Route path="/userapp/:appid/tableview/:tableviewid" element={<TableView />} />

          {/* TESTING. TODO: REMOVE */}
          <Route path="/test/table" element={<TableView/>} />
          <Route path="/test/detail" element={<DetailView/>} />
        </Routes>
      </Router>
      
      {/* Modals */}
      <AddRecordModal/>
      <EditRecordModal/>
      <DeleteRecordModal/>
     </Provider>
  );
}

export default App;
