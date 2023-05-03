import React from 'react';
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { GoogleOAuthProvider } from '@react-oauth/google';

import * as AuthController from "../auth/AuthController";
import * as StoreController from '../store/StoreController';

import { store } from '../store/StoreContext'

import App from '../App';
import S2AHomeAccess from '../components/S2A/home/HomeAccess'
import S2AHomeDevelop from '../components/S2A/home/HomeDevelop'
import EditAppDatasources from '../components/S2A/datasources/EditAppDatasources'
import EditAppDatasourceColumns from '../components/S2A/datasources/EditAppDatasourceColumns';
import EditAppTableviews from '../components/S2A/tableviews/EditAppTableviews';
import EditAppTableviewColumns from '../components/S2A/tableviews/EditAppTableviewColumns';
import EditAppTableviewRoles from '../components/S2A/tableviews/EditAppTableviewRoles';
import EditAppDetailviews from '../components/S2A/detailviews/EditAppDetailviews';
import EditAppDetailviewColumns from '../components/S2A/detailviews/EditAppDetailviewColumns';
import EditAppDetailviewRoles from '../components/S2A/detailviews/EditAppDetailviewRoles';

import CreateAppModal from '../components/S2A/modals/apps/CreateAppModal';
import DeleteAppModal from '../components/S2A/modals/apps/DeleteAppModal';
import PublishAppModal from '../components/S2A/modals/apps/PublishAppModal';

import UserAppHome from '../components/userapp/Home'
import Tableview from '../components/userapp/Tableview';
import Detailview from '../components/userapp/Detailview';

import AddRecordModal from '../components/userapp/modals/AddRecordModal';
import DeleteRecordModal from '../components/userapp/modals/DeleteRecordModal';
import EditAppRoleSheet from '../components/S2A/rolesheet/EditAppRoleSheet';

import HomeNavBar from '../components/S2A/navbars/HomeNavBar';
import EditAppNavBar from '../components/S2A/navbars/EditAppNavBar';
import EditAppInnerNavBar from '../components/S2A/navbars/EditAppInnerNavBar';

import DatasourceNavBar from '../components/userapp/DatasourceNavBar';

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

test('Splash', () => {
  render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID || ''}>
      <App />
    </GoogleOAuthProvider>
  );
  
  // Check if elements exist
  const title = screen.getByText(/Sheet2App/i);
  const poweredBy = screen.getByText(/Powered by Google Cloud/i);
  const description = screen.getByText(/Straightforward. Powerful. No-Code./i);
  const createYourOwnApps = screen.getByText(/Create Your Own Apps/i);
  const shareAndAccessApps = screen.getByText(/Share and Access Apps/i);
  const liveDataSynchronization = screen.getByText(/Live Data Synchronization/i);

  // Expect elements to be in the document
  expect(title).toBeInTheDocument();
  expect(poweredBy).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(createYourOwnApps).toBeInTheDocument();
  expect(shareAndAccessApps).toBeInTheDocument();
  expect(liveDataSynchronization).toBeInTheDocument();
});

test('HomeNavBar', () => {
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

test('EditAppNavBar', () => {
  const history = createMemoryHistory({ initialEntries: ['/S2A/editapp/datasources/1'] });
  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <EditAppNavBar />
      </Router>
    </Provider>
  );

  const datasourcesButton = screen.getByText(/Data Sources/i);
  const tableviewsButton = screen.getByText(/Table Views/i);
  const detailviewsButton = screen.getByText(/Detail Views/i);
  const rolesButton = screen.getByText(/Role Spreadsheet/i);
  const homeButton = screen.getByText(/Home/i);

  expect(datasourcesButton).toBeInTheDocument();
  expect(tableviewsButton).toBeInTheDocument();
  expect(detailviewsButton).toBeInTheDocument();
  expect(rolesButton).toBeInTheDocument();
  expect(homeButton).toBeInTheDocument();

  fireEvent.click(tableviewsButton);
  expect(history.location.pathname).toEqual('/'); // no currApp

  fireEvent.click(detailviewsButton);
  expect(history.location.pathname).toEqual('/');

  fireEvent.click(rolesButton);
  expect(history.location.pathname).toEqual('/');

  fireEvent.click(homeButton);
  expect(history.location.pathname).toEqual('/S2A/home/develop');

  // Test App Name TextField
  const appNameTextField = screen.getByLabelText(/App Name/i);
  expect(appNameTextField).toBeInTheDocument();
});

test('EditAppInnerNavBar', () => {
  const history = createMemoryHistory({ initialEntries: ['/S2A/editapp/datasources/1/columns'] });
  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <EditAppInnerNavBar />
      </Router>
    </Provider>
  );

  const editColumnsTitle = screen.getByText(/S2A Edit Columns/i);
  const exitButton = screen.getByTitle(/Exit/i);

  expect(editColumnsTitle).toBeInTheDocument();
  expect(exitButton).toBeInTheDocument();

  fireEvent.click(exitButton);
  expect(history.location.pathname).toEqual('/');
});

test('EditAppRoleSheet', () => {
  const history = createMemoryHistory({ initialEntries: ['/S2A/editapp/rolesheet/1'] });
  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <EditAppRoleSheet />
      </Router>
    </Provider>
  );

  const saveButton = screen.getByTitle(/Save/i);
  const textFieldLabel = screen.getByText(/Role Membership Spreadsheet URL:/i);
  const textField = screen.getByPlaceholderText(/Role Membership Spreadsheet URL/i);

  expect(saveButton).toBeInTheDocument();
  expect(textFieldLabel).toBeInTheDocument();
  expect(textField).toBeInTheDocument();

  // Test changing the text field value and clicking the save button
  fireEvent.change(textField, { target: { value: 'https://example.com/sheet' } });
  fireEvent.click(saveButton);
});

test('renders HomeDevelop, opens the CreateAppModal, and interacts with buttons', () => {
  const history = createMemoryHistory({ initialEntries: ['/S2A/home/develop'] });

  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <S2AHomeDevelop />
      </Router>
    </Provider>
  );

  // Check if HomeDevelop is rendered
  expect(screen.getByText('S2A Home')).toBeInTheDocument();

  // Open the CreateAppModal
  const createAppButton = screen.getByText('Create New App');
  fireEvent.click(createAppButton);

  // Check if the CreateAppModal is rendered
  expect(screen.getByLabelText('App Name')).toBeInTheDocument();

  // Type a new app name into the text field
  const appNameInput = screen.getByLabelText('App Name');
  fireEvent.change(appNameInput, { target: { value: 'New App' } });

  // Click the Create button
  const createButton = screen.getByText('Create');
  fireEvent.click(createButton);

  // Check if the app name input has the correct value
  expect(appNameInput).toHaveValue('New App');
});

describe('HomeAccess', () => {
  beforeEach(() => {
    const history = createMemoryHistory({ initialEntries: ['/S2A/home/access'] });

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <S2AHomeAccess />
        </Router>
      </Provider>
    );
  });

  it('navigates to app home when launch button is clicked', async () => {
    // Mock the dispatch function
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    // Wait for the component to finish loading
    await screen.findByText('App 1'); // Assuming 'App 1' is the name of an app in the accApps

    // Click the Launch button for the first app
    const launchButton = screen.getAllByTitle('Access')[0];
    fireEvent.click(launchButton);

    // Check if the dispatch function was called
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});

describe('EditAppDetailviewColumns', () => {
  beforeEach(() => {
    const history = createMemoryHistory({ initialEntries: ['/S2A/editapp/detailviews/1/columns'] });

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <EditAppDetailviewColumns />
        </Router>
      </Provider>
    );
  });

  it('renders the component', () => {
    expect(screen.getByText('Edit Columns for')).toBeInTheDocument();
  });

  it('toggles display between columns and filters', () => {
    const swapDisplayButton = screen.getByTitle('Swap');
    fireEvent.click(swapDisplayButton);
    expect(screen.getByText('Edit Filters')).toBeInTheDocument();

    fireEvent.click(swapDisplayButton);
    expect(screen.getByText('Edit Columns')).toBeInTheDocument();
  });
});

test("EditAppTableviewRoles", async () => {
/*   const viewAppRolesMock = jest.spyOn(StoreController, "viewAppRoles");
  const viewTableviewRolesMock = jest.spyOn(StoreController, "viewTableviewRoles");
  const editTableviewRolesMock = jest.spyOn(StoreController, "editTableviewRoles"); */

  const history = createMemoryHistory({ initialEntries: ["/S2A/editapp/tableviews/1/roles"] });
  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <EditAppTableviewRoles />
      </Router>
    </Provider>
  );

  // Check if the component renders and displays the correct text
  expect(screen.getByText(/edit roles for/i)).toBeInTheDocument();
  expect(screen.getByText("Save Changes")).toBeInTheDocument();

/*   // Test role checkbox change
  const roleCheckboxes = screen.getAllByRole("checkbox");
  const firstCheckbox = roleCheckboxes[0];

  fireEvent.click(firstCheckbox);
  await waitFor(() => {
    expect(firstCheckbox).toBeChecked();
  });

  fireEvent.click(firstCheckbox);
  await waitFor(() => {
    expect(firstCheckbox).not.toBeChecked();
  });

  // Test save button click
  const saveButton = screen.getByRole("button", { name: /save changes/i });
  fireEvent.click(saveButton);

  await waitFor(() => {
    expect(viewAppRolesMock).toHaveBeenCalledTimes(1);
    expect(viewTableviewRolesMock).toHaveBeenCalledTimes(1);
    expect(editTableviewRolesMock).toHaveBeenCalledTimes(1);
  });

  // Clean up mocks
  viewAppRolesMock.mockRestore();
  viewTableviewRolesMock.mockRestore();
  editTableviewRolesMock.mockRestore(); */
});

test('EditAppDatasourceColumns', () => {
  const history = createMemoryHistory({ initialEntries: ['/S2A/editapp/datasources/1/columns'] });
  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <EditAppDatasourceColumns />
      </Router>
    </Provider>
  );

  // Check if the component renders and displays the correct text
  expect(screen.getByText(/edit columns for/i)).toBeInTheDocument();
  expect(screen.getByText("Save Changes")).toBeInTheDocument();
});

test('EditAppDatasources', () => {
  const history = createMemoryHistory({ initialEntries: ['/S2A/editapp/datasources/1'] });
  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <EditAppDatasources />
      </Router>
    </Provider>
  );

  // Check if the component renders and displays the correct button titles
  expect(screen.getByTitle(/edit datasource columns/i)).toBeInTheDocument();
  expect(screen.getByTitle(/edit datasource/i)).toBeInTheDocument();
  expect(screen.getByTitle(/delete/i)).toBeInTheDocument();
});

test('renders EditAppTableviews', () => {
  const history = createMemoryHistory({ initialEntries: ['/S2A/editapp/tableviews/1'] });

  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <EditAppTableviews />
      </Router>
    </Provider>
  );

  // Check if EditAppTableviews is rendered
  expect(screen.getByText('Table Views')).toBeInTheDocument();
});

test('EditAppDetailviews', () => {
  const history = createMemoryHistory({ initialEntries: ['/S2A/editapp/detailviews/1'] });

  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <EditAppDetailviews />
      </Router>
    </Provider>
  );

  // Check if EditAppDetailviews is rendered
  expect(screen.getByText('Detail Views')).toBeInTheDocument();
});

/* test('EditAppDetailviewRoles', () => {
  const history = createMemoryHistory({ initialEntries: ['/S2A/editapp/detailviews/detailviewroles/1'] });

  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <EditAppDetailviewRoles />
      </Router>
    </Provider>
  );

  // Check if EditAppDetailviewRoles is rendered
  expect(screen.getByText('Edit Role Access for')).toBeInTheDocument();

  // Mock roles data
  const roles = [
    { name: 'Role 1' },
    { name: 'Role 2' },
  ];

  // Render roles in the component
  roles.forEach((role) => {
    const itemView = screen.getByText(role.name);
    expect(itemView).toBeInTheDocument();

    // Find and click the Allow Access checkbox
    const allowAccessCheckbox = screen.getByLabelText('Allow Access');
    fireEvent.click(allowAccessCheckbox);
  });

  // Find and click the Save Changes button
  const saveButton = screen.getByTitle('Save');
  fireEvent.click(saveButton);
}); */

/* test('UserAppHome', () => {
  const history = createMemoryHistory({ initialEntries: ['/userapp/1/home'] });

  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <UserAppHome />
      </Router>
    </Provider>
  );

  // Check if UserAppHome is rendered
  expect(screen.getByText('Welcome')).toBeInTheDocument();
  expect(screen.getByText('Built and Powered by S2A')).toBeInTheDocument();
}); */

/* type MockedState = {
  app: { id: number };
  records: string[][];
  columns: { name: string; type: string }[];
  currentRecordIndex: number;
  filterColumns: string[] | null;
  userFilterColumns: string[] | null;
};

// Mock the necessary state and action creators
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (): MockedState => ({
    app: { id: 1 },
    records: [
      ['Record 1', 'Value 1'],
      ['Record 2', 'Value 2'],
    ],
    columns: [
      { name: 'Column 1', type: 'Text' },
      { name: 'Column 2', type: 'Text' },
    ],
    currentRecordIndex: 0,
    filterColumns: null,
    userFilterColumns: null,
  }),
  useDispatch: () => jest.fn(),
})); */

/* test('renders Tableview component with table, column headers, and add record button', () => {
  const history = createMemoryHistory({ initialEntries: ['/userapp/1/tableviews/1'] });

  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <Tableview />
      </Router>
    </Provider>
  );

  // Check if the column headers are displayed
  expect(screen.getByText('Column 1')).toBeInTheDocument();
  expect(screen.getByText('Column 2')).toBeInTheDocument();

  // Check if the records are displayed
  expect(screen.getByText('Record 1')).toBeInTheDocument();
  expect(screen.getByText('Record 2')).toBeInTheDocument();

  // Check if the "Add Record" button is displayed
  expect(screen.getByText('Add Record')).toBeInTheDocument();
}); */

/* test('renders Detailview buttons', () => {
  const history = createMemoryHistory({ initialEntries: ['/userapp/1/detailviews/1'] });

  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <Detailview />
      </Router>
    </Provider>
  );

  // Check if the "Edit Record" button is displayed
  expect(screen.getByText('Edit Record')).toBeInTheDocument();

  // Check if the "Return to Table View" button is displayed
  expect(screen.getByText('Return to Table View')).toBeInTheDocument();
}); */

describe('DatasourceNavBar', () => {
  it('renders the DatasourceNavBar component without crashing', () => {
    const history = createMemoryHistory({ initialEntries: ['/userapp/1/detailviews/1'] });
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <DatasourceNavBar />
        </Router>
      </Provider>
    );

    // Check if the elements are rendered correctly
    expect(screen.getByLabelText(/Search Views/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Return to S2A/i })).toBeInTheDocument();
    expect(screen.getByLabelText('menu')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Account Circle/i })).toBeInTheDocument();
  });
});

describe('AddRecordModal', () => {
  it('renders the AddRecordModal component without crashing', () => {
    const history = createMemoryHistory({ initialEntries: ['/userapp/1/tableviews/1'] });
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <AddRecordModal />
        </Router>
      </Provider>
    );

    // Check if the modal container is rendered correctly
    expect(screen.getByTestId('add-record-modal')).toBeInTheDocument();
  });
});

describe('DeleteRecordModal', () => {
  it('renders the DeleteRecordModal component without crashing', () => {
    const history = createMemoryHistory({ initialEntries: ['/userapp/1/tableviews/1'] });
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <DeleteRecordModal />
        </Router>
      </Provider>
    );

    // Check if the modal container is rendered correctly
    expect(screen.getByTestId('delete-record-modal')).toBeInTheDocument();
  });
});

describe('CreateAppModal', () => {
  it('renders the CreateAppModal component without crashing', () => {
    render(
      <Provider store={store}>
        <CreateAppModal testOpen={true} />
      </Provider>
    );

    // Check if the "App Name" TextField is rendered correctly
    expect(screen.getByLabelText(/App Name/i)).toBeInTheDocument();

    // Check if the "Create" and "Cancel" buttons are rendered correctly
    expect(screen.getByRole('button', { name: /Create/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });
});

describe('DeleteAppModal', () => {
  it('renders the DeleteAppModal component without crashing', () => {
    render(
      <Provider store={store}>
        <DeleteAppModal testOpen={true} />
      </Provider>
    );

    // Check if the "Confirm" and "Cancel" buttons are rendered correctly
    expect(screen.getByRole('button', { name: /Confirm/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });
});

describe('PublishAppModal', () => {
  it('renders the PublishAppModal component without crashing', () => {
    render(
      <Provider store={store}>
        <PublishAppModal testOpen={true} />
      </Provider>
    );

    // Check if the "Publish" and "Cancel" buttons are rendered correctly
    expect(screen.getByRole('button', { name: /Publish/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });
});