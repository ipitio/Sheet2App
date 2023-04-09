import os

HOST = os.getenv("MYSQL_HOST", "localhost")
USER = os.getenv("MYSQL_USER", "root")
PASSWORD = os.getenv("MYSQL_PASSWORD", "password")
PORT = os.getenv("MYSQL_PORT", "3306")
DATABASE = os.getenv("MYSQL_DATABASE", "Sheet2App")