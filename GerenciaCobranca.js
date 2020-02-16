/**
 * Created by automatic batch Wesley.Souza on 2019-11-29 16:12:10
 */

angular
    .module('GerenciaCobrancaApp', ['snk'])
    .controller('GerenciaCobrancaController', [
        'ServiceProxy',
        function (
            ServiceProxy,
        ) {
            var self = this;
            self.codParc;
            self.vencIni;
            self.vencFinal;
            self.somentePrevVenc;

            self.HandleBtn = function () {
             

                //verificar se está vazio o json

                let options = { day: '2-digit', month: '2-digit', year: 'numeric' };

                self.vencIni = self.vencIni? self.vencIni.toLocaleDateString('pt-BR', options): ''
                self.vencFinal = self.vencFinal? self.vencFinal.toLocaleDateString('pt-BR', options): ''

                var parametros = {
                    param: {
                        codParc: self.codParc,
                        vencIni: self.vencIni,
                        vencFinal: self.vencFinal,
                        somentePrevVenc: self.somentePrevVenc
                    }
                
                }
                console.log(parametros)
                // window.alert("teste " + typeof(a.vencIni))
                var ArrayDosDados = ServiceProxy.callService("mgefin@GerenciaCobrancaSP.aplicarFiltro", parametros).then(function (res) {
                    var array = res.responseBody.parceiros.parceiro

                    self.dataset.clearDataSet();

                    if(array){
                        array = array.lenght? array : [array];
                        
                        array = array.map((valor)=>{
                            var obj = {
                                NOMEPARC: valor.nomeParc,
                                RAZAOSOCIAL: valor.razaoSocial,
                                CNPJCPF: valor.cnpjCpf,
                                TOTAL: valor.totalLiq,
                                CARTORIO: valor.totalDespCartorio,
                                DESDOBRAMENTO: valor.totalDesdob,
                                JUROSEMBU: valor.totalJuros,
                                MULTAEMBU: valor.totalMulta,
                                QTDTITULO: valor.qtdTitulos,
                                PROXCHAMADA: valor.dtProxCham,
                                PRIMEIROVCTO: valor.minDtVenc,
                                ULTIMOVCTO: valor.maxDtVenc
                            }
                            return obj;
                        })

                        
                        self.dataset.addRecordsAsObjects(array);
                    }
                        
                    console.log(self.dataset.getRecordsAsObjects());
                }).catch(function (err) {
                    console.log(err)
                })


                //console.log(ArrayDosDados)




            }

           

            self.onDataSetCreated = function (dataset) {
                self.dataset = dataset;
                dataset.init();                
            }

        }
    ]);