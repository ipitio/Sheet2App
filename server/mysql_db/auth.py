from configparser import ConfigParser

config = ConfigParser()
config.read('mysql_db/config.ini')

HOST = config.get('auth', 'host')
USER = config.get('auth', 'user')
PASSWORD = config.get('auth', 'password')
PORT = config.get('auth', 'port')
DATABASE = config.get('auth', 'database')

