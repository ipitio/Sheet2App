import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './auth/AuthContext';

import Splash from './components/S2A/Splash'
import S2AHome from './components/S2A/Home'
import CreateApp from './components/S2A/CreateApp'
import EditApp from './components/S2A/EditApp';

import UserAppHome from './components/userapp/Home'
import TableView from './components/userapp/TableView';

import store from './store/StoreContext'
import { Provider } from 'react-redux'

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <Provider store={store}>
        <Router>
          <Routes>
            {/* S2A Routes */}
            <Route path="*" element={<Splash />} />
            <Route path="/S2A/home" element={<S2AHome />} />
            <Route path="/S2A/createapp" element={<CreateApp />} />
            <Route path="/S2A/editapp/:appid" element={<EditApp />} />

            {/* User App Routes */}
            <Route path="/userapp/:appid/home" element={<UserAppHome />} />
            <Route path="/userapp/:appid/tableview/:tableviewid" element={<TableView />} />

          </Routes>
        </Router>
      </Provider>
    </AuthContextProvider>
  );
}

export default App;
