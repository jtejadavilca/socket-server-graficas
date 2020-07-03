import {Router, Request, Response} from 'express';
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/socket';

const routerUsuarios = Router();

routerUsuarios.get('/usuarios', (req: Request, resp: Response) => {
    const server = Server.instance;
    server.getIO().clients( (err: any, clientes: string[]) => {
        if ( err ) {
            return resp.json({
                ok: false,
                err
            });

        }

        resp.json({
            ok: true,
            clientes
        })
    });
});

routerUsuarios.get('/usuarios/detalle', (req: Request, resp: Response) => {
    resp.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });
});

export default routerUsuarios;