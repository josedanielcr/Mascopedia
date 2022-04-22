const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const colors = require('colors');
const { dbConnection } = require('../database/config');

/**
 * Server
 * @since 27.02.2022
 **/
class Server {

    /**
     * Initialization of server requirements
     * @since 27.02.2022
     **/
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);

        /**
         * Routes
         **/
        this.routes = {
                users: '/api/users',
                auth: '/api/auth',
                dogs: '/api/dogs',
                cats: '/api/cats',
                posts: '/api/posts'
            }
            /**
             * Database connection, middlewares and routes
             **/
        this.connectToDB();
        this.middlewares();
        this.route();

    }

    /**
     * Database connection
     * @since 27.02.2022
     **/
    async connectToDB() {
        await dbConnection();
    }

    /**
     * Server middlewares
     * @since 27.02.2022
     **/
    middlewares() {

        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

    }

    /**
     * Routes
     * @since 27.02.2022
     **/
    route() {
        this.app.use(this.routes.users, require('../routes/users.routes'));
        this.app.use(this.routes.auth, require('../routes/auth.routes'));
        this.app.use(this.routes.dogs, require('../routes/dogs.routes'));
        this.app.use(this.routes.cats, require('../routes/cats.routes'));
        this.app.use(this.routes.posts, require('../routes/post.routes'));
    }

    /**
     * Server initialization
     * @since 27.02.2022
     **/
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server running at port: ${this.port}`.blue);
        });
    }

}

module.exports = Server;