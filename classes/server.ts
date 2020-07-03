import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as routes from '../routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

import * as socket from '../sockets/socket';

export default class Server {

    private static _instance: Server;

    private port: number;
    private app: express.Application;
    private io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.port = SERVER_PORT;
        this.app = express();

        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );

        this.escucharSockets();
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }

    public getIO() {
        return this.io;
    }

    private escucharSockets() {
        console.log('Escuchando sockets...');

        this.io.on('connection', client => {
            console.log('Cliente conectado : ', client.id);

            // Conectar cliente
            socket.conectarCliente(client, this.io);

            // Configurar usuario
            socket.configUsuario(client, this.io);

            // Escuchar mensajes
            socket.mensaje(client, this.io);

            // Escuchar desconexión
            socket.desconectar(client, this.io);
    
            // Escuchar obtención de usuarios
            socket.obtenerUsuarios(client, this.io);
        });
    }

    /**
     * Method that start server
     * @param callback Execute when server starts
     */
    public start(callback: Function){
        // this.app.listen(this.port, () => callback(this.port));
        this.httpServer.listen(this.port, () => callback(this.port));
        this.configCors();
        this.configRoutes();
    }

    /**
     * Configuration of CORS
     */
    private configCors() {
        this.app.use(cors( { origin: true, credentials: true } ));
    }

    /**
     * Configuration of routes
     */
    private configRoutes() {
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());
        this.app.use(routes.default);
    }
}