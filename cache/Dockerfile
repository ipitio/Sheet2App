FROM redis
WORKDIR /usr/local/etc/redis/
ADD redis.conf ./redis.conf
EXPOSE 6379
CMD [ "redis-server", "./redis.conf" ]
