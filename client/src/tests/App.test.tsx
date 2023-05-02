import React from 'react';
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { GoogleOAuthProvider } from '@react-oauth/google';

import * as AuthController from "../auth/AuthController";

import { store } from '../store/StoreContext'

import App from '../App';
import HomeNavBar from '../components/S2A/navbars/HomeNavBar';
import S2AHomeAccess from '../components/S2A/home/HomeAccess'
import S2AHomeDevelop from '../components/S2A/home/HomeDevelop'

import * as StoreController from '../store/StoreController';
import { viewDevApps } from '../store/StoreController';

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

/* const viewDevAppsSpy = jest.spyOn(StoreController, 'viewDevApps');
const mockDevApps = [
  {
    id: 1,
    name: "My First App",
    creatorEmail: "johndoe@example.com",
    roleMemUrl: "https://example.com/role/membership",
    isPublished: true
  },
  {
    id: 2,
    name: "My Second App",
    creatorEmail: "janedoe@example.com",
    roleMemUrl: "https://example.com/role/membership",
    isPublished: false
  },
  {
    id: 3,
    name: "Awesome App",
    creatorEmail: "johndoe@example.com",
    roleMemUrl: "https://example.com/role/membership",
    isPublished: true
  },
  {
    id: 4,
    name: "Cool App",
    creatorEmail: "janedoe@example.com",
    roleMemUrl: "https://example.com/role/membership",
    isPublished: false
  },
  {
    id: 5,
    name: "My Awesome App",
    creatorEmail: "johndoe@example.com",
    roleMemUrl: "https://example.com/role/membership",
    isPublished: true
  },
  {
    id: 6,
    name: "My Cool App",
    creatorEmail: "janedoe@example.com",
    roleMemUrl: "https://example.com/role/membership",
    isPublished: false
  },
  {
    id: 7,
    name: "Amazing App",
    creatorEmail: "johndoe@example.com",
    roleMemUrl: "https://example.com/role/membership",
    isPublished: true
  },
  {
    id: 8,
    name: "Incredible App",
    creatorEmail: "janedoe@example.com",
    roleMemUrl: "https://example.com/role/membership",
    isPublished: false
  },
  {
    id: 9,
    name: "Another App",
    creatorEmail: "johndoe@example.com",
    roleMemUrl: "https://example.com/role/membership",
    isPublished: true
  },
  {
    id: 10,
    name: "Yet Another App",
    creatorEmail: "janedoe@example.com",
    roleMemUrl: "https://example.com/role/membership",
    isPublished: false
  }
];

viewDevAppsSpy.mockImplementation(() => {
  return async () => {
    return {
      type: 'S2A/viewDevApps/fulfilled',
      payload: mockDevApps,
    };
  };
});

test('HomeDevelop renders and handles app interactions', () => {
  const history = createMemoryHistory({ initialEntries: ['/S2A/home/develop'] });

  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <S2AHomeDevelop />
      </Router>
    </Provider>
  );

  // Check if the viewDevApps function is called on component mount
  expect(viewDevAppsSpy).toHaveBeenCalledTimes(1);

  // Find app elements and interaction buttons
  const appElements = screen.getAllByText(/App/i);
  const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
  const editButtons = screen.getAllByRole('button', { name: /edit/i });

  // Check if the app elements, delete buttons, and edit buttons are rendered
  expect(appElements.length).toBeGreaterThan(0);
  expect(deleteButtons.length).toBeGreaterThan(0);
  expect(editButtons.length).toBeGreaterThan(0);

  // Click the first delete button and check if the delete modal opens
  fireEvent.click(deleteButtons[0]);
  const deleteModal = screen.getByRole('dialog', { name: /delete app modal/i });
  expect(deleteModal).toBeInTheDocument();

  // Click the first edit button and check if the navigation occurs
  fireEvent.click(editButtons[0]);
  expect(history.location.pathname).toEqual('/S2A/editapp/datasources/1');

  viewDevAppsSpy.mockRestore();
});
 */