import React from 'react';
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { GoogleOAuthProvider } from '@react-oauth/google';

import * as AuthController from "../auth/AuthController";

import { store } from '../store/StoreContext'

import App from '../App';
import HomeNavBar from '../components/S2A/navbars/HomeNavBar';

import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

test('renders splash page', () => {
  render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID || ''}>
      <App />
    </GoogleOAuthProvider>
  );
  const linkElement = screen.getByText(/Straightforward. Powerful. No-Code./i);
  expect(linkElement).toBeInTheDocument();
});

test('renders working navbar', () => {
  const history = createMemoryHistory({ initialEntries: ['/S2A/home/develop'] });
  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <HomeNavBar />
      </Router>
    </Provider>
  );

  const devAppsButton = screen.getByText(/Apps in Development/i);
  const accAppsButton = screen.getByText(/Accessible Apps/i);
  const createAppButton = screen.getByRole("button", { name: /Create New App/i });

  expect(devAppsButton).toBeInTheDocument();
  expect(accAppsButton).toBeInTheDocument();
  expect(createAppButton).toBeInTheDocument();

  fireEvent.click(accAppsButton);
  expect(screen.getByText(/S2A Home/i)).toBeInTheDocument();
  expect(history.location.pathname).toEqual("/S2A/home/access");

  fireEvent.click(devAppsButton);
  expect(screen.getByText(/S2A Home/i)).toBeInTheDocument();
  expect(history.location.pathname).toEqual("/S2A/home/develop");

  const openProfileButton = screen.getByRole("button", { name: /open profile menu/i });

  // Mock the getLoggedOut function
  const getLoggedOutMock = jest.spyOn(AuthController, "getLoggedOut");
  getLoggedOutMock.mockImplementation(() => {});

  fireEvent.click(openProfileButton);
  const logoutButton = screen.getByText(/Logout/i);
  fireEvent.click(logoutButton);

  expect(getLoggedOutMock).toHaveBeenCalledTimes(1);

  // Clean up the mock after the test
  getLoggedOutMock.mockRestore();
});
