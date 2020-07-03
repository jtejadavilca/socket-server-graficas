export class GraficaData {
    private meses = ['enero', 'febrero', 'marzo', 'abril'];
    private valores: number[] = [1, 2, 3, 4];

    constructor() {}

    getDataGrafica() {
        return [
            {data: this.valores, label: 'Ventas'}
        ];
    }

    actualizarValor( mes: string, nuevoValor: number ) {
        mes = mes.trim().toLowerCase();
        
        for( let i in this.meses ) {
            if( this.meses[i] === mes ) {
                this.valores[i] += nuevoValor;
            }
        }
        
        return this.getDataGrafica();
    }
}