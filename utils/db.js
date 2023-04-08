import { MongoClient } from 'redis';
import { promisify } from 'util';

class DBClient {
    constructor() {
        this._host = process.env.DB_HOST || 'localhost';
        this._port = process.env.DB_PORT || 27017;
        this._db = process.env.DB_DATABASE || 'files_manager';

        this.client = new MongoClient(
            `mongodb://${this._host}:${this._port}/${this._db}`,
            { useUnifiedTopology: true },
        );
        // start connection
        this.client.connect();
    }

    /**
        * checks if the database client is connected
        *
        * @returns {boolean} true if the client is connected else false
        */
    isAlive() {
        return this.client.isConnected();
    }

    /**
        * returns the number of users present in the db
        * @returns {number} the number of users present
        */
    async nbUsers() {
        const collection = this.client.db().collection('users');
        return collection.countDocuments();
    }

    /**
        * returns the number of files present in the db
        * @returns {number} the number of users present
        */
    async nbFiles() {
        const collection = this.client.db().collection('files');
        return collection.countDocuments();
    }
}

const dbClient = new DBClient();
module.exports = DBClient;
