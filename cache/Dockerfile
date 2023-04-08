FROM redis
WORKDIR /usr/local/etc/redis/redis.conf
ADD redis.conf ./redis.conf
EXPOSE 6379
CMD [ "redis-server", "./redis.conf" ]
