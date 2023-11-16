"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const database_1 = require("../database");
const DateUtilities_1 = __importDefault(require("../utilities/DateUtilities"));
const dateUtilities = new DateUtilities_1.default();
class VisitController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createVisitSchema = zod_1.z.object({
                visitas_registro_diario: zod_1.z.object({
                    zona: zod_1.z.string(),
                    agente: zod_1.z.string(),
                    ciclo: zod_1.z.string(),
                    atividade: zod_1.z.string(),
                    pendencia: zod_1.z.string(),
                    tipoImv: zod_1.z.string(),
                    nomeBairro: zod_1.z.string(),
                    tipoVisita: zod_1.z.string(),
                    imvInsp: zod_1.z.string(),
                    nomeLogr: zod_1.z.string(),
                    imvTrat: zod_1.z.string(),
                    perifocTipo: zod_1.z.string(),
                    focLarv2Tipo: zod_1.z.string(),
                    tipo: zod_1.z.string(),
                    focLarv1Tipo: zod_1.z.string(),
                    focLarv2Qtd: zod_1.z.number(),
                    qtdTubitos: zod_1.z.number(),
                    focLarv2G: zod_1.z.number(),
                    depD1: zod_1.z.number(),
                    depD2: zod_1.z.number(),
                    depA2: zod_1.z.number(),
                    numAmInic: zod_1.z.number(),
                    numAmFim: zod_1.z.number(),
                    perifocQtd: zod_1.z.number(),
                    codMunicipio: zod_1.z.number(),
                    focLarv1Qtd: zod_1.z.number(),
                    focLarv1G: zod_1.z.number(),
                    ladoQuart: zod_1.z.number(),
                    depElim: zod_1.z.number(),
                    depA1: zod_1.z.number(),
                    seqImv: zod_1.z.number(),
                    numImv: zod_1.z.number(),
                    depE: zod_1.z.number(),
                    depC: zod_1.z.number(),
                    depB: zod_1.z.number(),
                    numQuart: zod_1.z.number(),
                    data: zod_1.z.string(),
                    longitude: zod_1.z.string(),
                    latitude: zod_1.z.string(),
                    id: zod_1.z.string(),
                    tempo: zod_1.z.string(),
                    temperatura: zod_1.z.string(),
                    umidade: zod_1.z.string(),
                }).array()
            });
            try {
                const { visitas_registro_diario } = createVisitSchema.parse(req.body);
                const ids = [];
                const isDuplicateValue = visitas_registro_diario.every((visit) => {
                    if (ids.find(element => visit.id === element) === undefined) {
                        ids.push(visit.id);
                        return true;
                    }
                    else {
                        return false;
                    }
                });
                if (!isDuplicateValue) {
                    return res.status(400).send({ message: 'Id duplicado' });
                }
                else {
                    const registeredIds = yield (0, database_1.knex)('visit').where((builder) => {
                        builder.whereIn('id', ids);
                    }).select('id');
                    if (registeredIds.length === 0) {
                        visitas_registro_diario.forEach((visit) => __awaiter(this, void 0, void 0, function* () {
                            const { zona, agente, ciclo, atividade, pendencia, tipoImv, nomeBairro, tipoVisita, imvInsp, nomeLogr, imvTrat, perifocTipo, focLarv2Tipo, tipo, focLarv1Tipo, focLarv2Qtd, qtdTubitos, focLarv2G, depD1, depD2, depA2, numAmInic, numAmFim, perifocQtd, codMunicipio, focLarv1Qtd, focLarv1G, ladoQuart, depElim, depA1, seqImv, numImv, depE, depC, depB, numQuart, data, longitude, latitude, id, tempo, temperatura, umidade, } = visit;
                            const date = dateUtilities.formatStringDmY(data);
                            const validateTempo = tempo === 'null' ? '' : tempo;
                            const validateTemperatura = temperatura === 'null' ? '' : temperatura;
                            const validateUmidade = umidade === 'null' ? '' : umidade;
                            yield (0, database_1.knex)('visit').insert({
                                zona,
                                agente,
                                ciclo,
                                atividade,
                                pendencia,
                                tipoImv,
                                nomeBairro,
                                tipoVisita,
                                imvInsp,
                                nomeLogr,
                                imvTrat,
                                perifocTipo,
                                focLarv2Tipo,
                                tipo,
                                focLarv1Tipo,
                                focLarv2Qtd,
                                qtdTubitos,
                                focLarv2G,
                                depD1,
                                depD2,
                                depA2,
                                numAmInic,
                                numAmFim,
                                perifocQtd,
                                codMunicipio,
                                focLarv1Qtd,
                                focLarv1G,
                                ladoQuart,
                                depElim,
                                depA1,
                                seqImv,
                                numImv,
                                depE,
                                depC,
                                depB,
                                numQuart,
                                data: date,
                                longitude: Number(longitude),
                                latitude: Number(latitude),
                                id,
                                tempo: validateTempo,
                                temperatura: validateTemperatura,
                                umidade: validateUmidade,
                            });
                        }));
                    }
                    else {
                        return res.status(400).send({ message: 'Registros já armazenados', uuidVisitaRegistrada: registeredIds });
                    }
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).send({ message: 'Interna Error' });
            }
            return res.status(200).send({ message: 'Visita Registrada' });
        });
    }
    getVisits(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = req.query;
            const fromDate = params.toDate ? String(params.fromDate) : '';
            const toDate = params.toDate ? String(params.toDate) : '';
            const typeImv = params.typeImv ? String(params.typeImv) : '';
            const country = params.country ? String(params.country) : '';
            const reports = yield (0, database_1.knex)('visit').select().where((builder) => {
                if (toDate && fromDate) {
                    builder.whereBetween('data', [fromDate, toDate]);
                }
                else if (fromDate) {
                    builder.where('data', '>=', fromDate);
                }
                else if (toDate) {
                    builder.where('data', '<=', toDate);
                }
                else {
                    builder.where('id', '<>', '');
                }
                if (typeImv) {
                    builder.whereLike('tipoImv', typeImv);
                }
                if (country) {
                    builder.where('codMunicipio', country);
                }
            }).orderBy('data');
            res.status(200).send(reports);
        });
    }
    getAllImv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reports = yield (0, database_1.knex)('visit').select('tipoImv').distinct();
                res.status(200).json(reports);
            }
            catch (error) {
                console.log(error);
                return res.status(500).send({ message: 'Internal Error' });
            }
        });
    }
    getAllMnc(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reports = yield (0, database_1.knex)('visit').select('codMunicipio').distinct();
                res.status(200).json(reports);
            }
            catch (error) {
                console.log(error);
                return res.status(500).send({ message: 'Internal Error' });
            }
        });
    }
}
exports.default = VisitController;
//# sourceMappingURL=VisitController.js.map