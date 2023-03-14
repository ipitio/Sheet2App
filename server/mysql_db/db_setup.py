import mysql.connector
from configparser import ConfigParser


def connect_to_database():
    """
    This function reads the config file to parse the authetication information needed
    to connect to the database.

    Returns:
        MySQLConnection: An instance of the database connection
    """
    config = ConfigParser()
    config.read('../../config.ini')
    
    db = mysql.connector.connect(
        host=config.get('auth', 'host'),
        user=config.get('auth', 'user'),
        passwd=config.get('auth', 'password'),
        database=config.get('auth', 'database')
    )
    return db


def init_database():
    """
    This function makes a connection to the MySQL account and initializes a database
    named "Sheet2App". This function should only be called if the "Sheet2App" database
    does not exist.
    """
    config = ConfigParser()
    config.read('../../config.ini')
    
    db = mysql.connector.connect(
        host=config.get('auth', 'host'),
        user=config.get('auth', 'user'),
        passwd=config.get('auth', 'password')
    )
    cursor = db.cursor()
    cursor.execute("CREATE DATABASE Sheet2App")
    
    
def create_tables():
    """
    This function executes the proper SQL queries to create all neccessary tables.
    If recreation of a table is need, uncomment the necessary query and run this db_setup.py
    file as main.
    
    For the tables created refer to this document: https://docs.google.com/document/d/1uv-nUrxzD6n6sLsOc9ToreRj1P3yMjQMvRhTR3lhDhg/edit?usp=sharing
    """
    db = connect_to_database()
    cursor = db.cursor()
    
    create_creator = ("CREATE TABLE Creator ("
                      "id INT PRIMARY KEY AUTO_INCREMENT, "
                      "email TEXT)")
    # cursor.execute(create_creator)
    
    create_application = ("CREATE TABLE Application ("
                          "id INT PRIMARY KEY AUTO_INCREMENT, "
                          "creatorID INT, "
                          "FOREIGN KEY (creatorID) REFERENCES Creator(id), "
                          "name TEXT, "
                          "roleMemURL TEXT, "
                          "isPublished BOOL)")
    # cursor.execute(create_application)
    
    create_spreadsheet = ("CREATE TABLE Spreadsheet ("
                          "id INT PRIMARY KEY AUTO_INCREMENT,"
                          "url TEXT)")
    # cursor.execute(create_spreadsheet)
    
    create_datasource = ("CREATE TABLE Datasource ("
                         "id INT PRIMARY KEY AUTO_INCREMENT,"
                         "spreadsheetID INT,"
                         "FOREIGN KEY (spreadsheetID) REFERENCES Spreadsheet(id),"
                         "spreadsheetIndex INT)")
    # cursor.execute(create_datasource)
    
    create_datasource_column = ("CREATE TABLE DatasourceColumn ("
                                "id INT PRIMARY KEY AUTO_INCREMENT,"
                                "datasourceID INT,"
                                "FOREIGN KEY (datasourceID) REFERENCES Datasource(id),"
                                "name TEXT,"
                                "initialValue TEXT,"
                                "isLinkText BOOL,"
                                "isTableRef BOOL,"
                                "valueType TEXT)")
    # cursor.execute(create_datasource_column)
    
    create_appdata = ("CREATE TABLE AppData ("
                      "appID INT,"
                      "FOREIGN KEY (appID) REFERENCES Application(id),"
                      "datasourceID INT,"
                      "FOREIGN KEY (datasourceID) REFERENCES Datasource(id))")
    # cursor.execute(create_appdata)
    
    create_view = ("CREATE TABLE View ("
                   "id INT PRIMARY KEY AUTO_INCREMENT,"
                   "appID INT,"
                   "FOREIGN KEY (appID) REFERENCES Application(id))")
    # cursor.execute(create_view)
    
    create_view_perm = ("CREATE TABLE ViewPerm ("
                        "viewID INT,"
                        "FOREIGN KEY (viewID) REFERENCES View(id),"
                        "role TEXT,"
                        "allowedToView BOOL,"
                        "allowedToAdd BOOL,"
                        "allowedToEdit BOOL,"
                        "allowedToDelete BOOL)")
    # cursor.execute(create_view_perm)
    
    create_view_data = ("CREATE TABLE ViewData ("
                        "viewID INT,"
                        "FOREIGN KEY (viewID) REFERENCES View(id),"
                        "datasourceColumnID INT,"
                        "FOREIGN KEY (datasourceColumnID) REFERENCES DatasourceColumn(id))")
    # cursor.execute(create_view_data)

    
if __name__ == "__main__":
    create_tables()
