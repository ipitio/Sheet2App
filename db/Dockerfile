FROM mysql
WORKDIR /etc/mysql
ADD my.cnf ./my.cnf
EXPOSE 3306
ENV MYSQL_DATABASE=Sheet2App
ENV MYSQL_ROOT_PASSWORD=default-password
CMD [ "mysqld" , "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci" , "--default-authentication-plugin=mysql_native_password" ]
