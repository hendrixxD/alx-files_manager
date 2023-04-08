import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  /**
     * Creates a new instance of RedisClient
     */
  constructor() {
    this.client = createClient();
    // this.client = client.connect();

    this._get = promisify(this.client.get).bind(this.client);
    this._set = promisify(this.client.set).bind(this.client);
    this._del = promisify(this.client.del).bind(this.client);

    this.client.on('error', (err) => {
      console.log(`${err}`);
    });
  }

  /**
    * checks if client has connected to database and returns
    * a boolean
    * @returns {boolean} true if client as connected to database
    * false
    */
  isAlive() {
    return this.client.connected;
  }

  /** asynchronous function `get` that takes a
     * string `key` as argument and returns
     * the Redis value stored for this key
     *
     * @param {String} key - The key to retrieve
     * @return {String} the value stored for this key
    */
  async get(key) {
    return this._get(key);
  }

  /**
     * an asynchronous function `set` that takes a string `key`
     * a `value` and a `duration` in second as arguments to store
     * it in Redis (with an expiration set by the duration argument)4
     *
     * @param {String} key - key to set
     * @param {String} value - value to set
     * @param {Duration} duration - time in seconds to set
    */
  async set(key, value, duration) {
    await this.set(key, value, 'EX', duration);
  }

  /** an asynchronous function `del` that takes
     * a string `key` as argument and
     * remove the value in Redis for this key
     *
     * @params {String} key - key to delete from detabase
     *
     */
  async del(key) {
    await this._del(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
