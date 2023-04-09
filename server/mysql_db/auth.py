# from configparser:
from configparser import ConfigParser

config = ConfigParser()
import os

HOST = os.environ.get("host", "localhost")
USER = os.environ.get("user", "root")
PASSWORD = os.environ.get("password", "default-password")
PORT = os.environ.get("port", "3306")
DATABASE = os.environ.get("database", "Sheet2App")