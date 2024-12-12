import * as Redis from 'ioredis'

const redis = Redis()

function publishNotification(channel , message){
    redis.publish(channel , JSON.stringify(message))
}