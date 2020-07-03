import { Usuario } from './usuario';

export class UsuarioLista {
    private lista: Usuario[];

    constructor() {
        this.lista = [];
    }

    /**
     * Agregar un usuario
     * @param usuario Instancia de la clase Usuario
     */
    public agregar( usuario: Usuario ): Usuario {
        this.lista.push ( usuario );

        console.log( this.lista );

        return usuario;
    }

    public actualizarNombre (id: string, nombre: string) {
        let usuario = this.getUsuario( id );
        if(usuario) {
            usuario.nombre = nombre;
        }

        console.log(this.lista);
    }

    public getLista() {
        return this.lista.filter( u => u.nombre !== 'sin-nombre' );
    }

    public getUsuario(id: string): Usuario | undefined {
        return this.lista.find(u => u.id === id);
    }

    public getUsuariosEnSala( sala: string ): Usuario[] {
        return this.lista.filter(u => u.sala === 'sala');
    }

    public borrarUsuario (id: string): Usuario | undefined {
        const tempUsuario = this.getUsuario( id );
        if(tempUsuario)
            this.lista = this.lista.filter( u => u.id !== tempUsuario.id );

        return tempUsuario;
    }
}