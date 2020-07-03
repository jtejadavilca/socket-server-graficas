import {Router, Request, Response} from 'express';
import Server from '../classes/server';
import { GraficaData } from '../classes/grafica';

const routerGraficas = Router();

const graficas = new GraficaData();


routerGraficas.get('/graficas', (req: Request, resp: Response) => {
    resp.json(graficas.getDataGrafica());
});


routerGraficas.post('/graficas', (req: Request, resp: Response) => {

    const mes = req.body.mes;
    const nuevoValor = Number(req.body.nuevoValor);
    const server = Server.instance;


    graficas.actualizarValor(mes, nuevoValor);

    const dataGrafica = graficas.getDataGrafica();
    server.getIO().emit('grafica-actualizada', dataGrafica);

    resp.json( dataGrafica );
});

export default routerGraficas;