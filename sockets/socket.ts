import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { Usuario } from '../classes/usuario';
import { UsuarioLista } from "../classes/usuarios-lista";

export const usuariosConectados = new UsuarioLista();

export const conectarCliente = ( client: Socket, io: socketIO.Server ) => {
    const usuario = new Usuario( client.id );
    usuariosConectados.agregar( usuario );
}


export const configUsuario = ( client: Socket, io: socketIO.Server ) => {
    client.on('configurar-usuario', (payload, callback) => {

        if( payload.nombre === 'sin-nombre' ) {
            usuariosConectados.borrarUsuario(client.id);
        } else {
            usuariosConectados.actualizarNombre(client.id, payload.nombre);
            callback(payload);
        }
        io.emit('usuarios-activos', usuariosConectados.getLista());
    });
}

export const desconectar = ( client: Socket, io: socketIO.Server ) => {
    client.on('disconnect', () => {
        const usuarioBorrado = usuariosConectados.borrarUsuario(client.id);
        io.emit('usuarios-activos', usuariosConectados.getLista());
    });
}

export const mensaje = ( client: Socket, io: socketIO.Server ) => {
    client.on('mensaje', (mensaje) => {
        io.emit('mensaje-nuevo', mensaje);
    });
}


export const obtenerUsuarios = ( client: Socket, io: socketIO.Server ) => {
    client.on( 'obtener-usuarios', () => {
        io.to(client.id).emit('usuarios-activos', usuariosConectados.getLista());
    });
}