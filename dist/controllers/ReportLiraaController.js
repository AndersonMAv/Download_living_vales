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
const address_1 = require("../data/address");
const geocoding_1 = require("../geocoding/geocoding");
const zod_1 = require("zod");
const database_1 = require("../database");
const DateUtilities_1 = __importDefault(require("../utilities/DateUtilities"));
const dateUtilities = new DateUtilities_1.default();
class ReportLiraaController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createReportLiraSchema = zod_1.z.object({
                visitas_boletim_liraa: zod_1.z.object({
                    id: zod_1.z.string(),
                    municipio: zod_1.z.string(),
                    uf: zod_1.z.string(),
                    bairro: zod_1.z.string(),
                    campoData: zod_1.z.string(),
                    supervisor: zod_1.z.string(),
                    labData: zod_1.z.string(),
                    responsavel: zod_1.z.string(),
                    nome: zod_1.z.string(),
                    numQuart: zod_1.z.number(),
                    logradouro: zod_1.z.string(),
                    complemento: zod_1.z.string(),
                    tipoImv: zod_1.z.string(),
                    depA1: zod_1.z.number(),
                    depA2: zod_1.z.number(),
                    depB: zod_1.z.number(),
                    depC: zod_1.z.number(),
                    depD1: zod_1.z.number(),
                    depD2: zod_1.z.number(),
                    depE: zod_1.z.number(),
                    amostras: zod_1.z.string(),
                    tubitos: zod_1.z.number(),
                    labEx: zod_1.z.number(),
                    labAeg: zod_1.z.number(),
                    labAlb: zod_1.z.number(),
                    aegDepA1: zod_1.z.number(),
                    aegDepA2: zod_1.z.number(),
                    aegDepB: zod_1.z.number(),
                    aegDepC: zod_1.z.number(),
                    aegDepD1: zod_1.z.number(),
                    aegDepD2: zod_1.z.number(),
                    aegDepE: zod_1.z.number(),
                    depAlb: zod_1.z.number(),
                    latitude: zod_1.z.string(),
                    longitude: zod_1.z.string(),
                    tempo: zod_1.z.string(),
                    temperatura: zod_1.z.string(),
                    umidade: zod_1.z.string(),
                    larvas: zod_1.z.number(),
                    pupas: zod_1.z.number(),
                    exuvias: zod_1.z.number(),
                    adultos: zod_1.z.number(),
                }).array()
            });
            try {
                const { visitas_boletim_liraa } = createReportLiraSchema.parse(req.body);
                const ids = [];
                const isDuplicateValue = visitas_boletim_liraa.every((liraReport) => {
                    if (ids.find(element => liraReport.id === element) === undefined) {
                        ids.push(liraReport.id);
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
                    const registeredIds = yield (0, database_1.knex)('report_lira').where((builder) => {
                        builder.whereIn('id', ids);
                    }).select('id');
                    if (registeredIds.length === 0) {
                        visitas_boletim_liraa.forEach((liraReport) => __awaiter(this, void 0, void 0, function* () {
                            const { id, municipio, uf, bairro, campoData, supervisor, labData, responsavel, nome, numQuart, logradouro, complemento, tipoImv, depA1, depA2, depB, depC, depD1, depD2, depE, amostras, tubitos, labEx, labAeg, labAlb, aegDepA1, aegDepA2, aegDepB, aegDepC, aegDepD1, aegDepD2, aegDepE, depAlb, longitude, latitude, tempo, temperatura, umidade, larvas, pupas, exuvias, adultos, } = liraReport;
                            const dateField = dateUtilities.formatStringDmY(campoData);
                            const labDate = dateUtilities.formatStringDmY(labData);
                            // Validate LatLng
                            let lat = Number(latitude);
                            let lng = Number(longitude);
                            if (!lat || !lng || lat == 0 || lng == 0) {
                                try {
                                    const address = new address_1.Address();
                                    address.streetName = logradouro;
                                    address.houseNumber = complemento.replace(/[^-.0-9]/g, '');
                                    address.block = bairro && bairro.split('-').length > 1 ? bairro.split('-')[1] : bairro;
                                    address.city = municipio;
                                    address.state = uf;
                                    const latLng = yield geocoding_1.GeocodingFactory.instance().geocode(address);
                                    lat = latLng.latitude;
                                    lng = latLng.longitude;
                                }
                                catch (error) {
                                    console.log(error);
                                }
                            }
                            // Persist LIRA report
                            yield (0, database_1.knex)('report_lira').insert({
                                id,
                                municipio,
                                uf,
                                bairro,
                                campoData: dateField,
                                supervisor,
                                labData: labDate,
                                responsavel,
                                nome,
                                numQuart,
                                logradouro,
                                complemento,
                                tipoImv,
                                depA1,
                                depA2,
                                depB,
                                depC,
                                depD1,
                                depD2,
                                depE,
                                amostras,
                                tubitos,
                                labEx,
                                labAeg,
                                labAlb,
                                aegDepA1,
                                aegDepA2,
                                aegDepB,
                                aegDepC,
                                aegDepD1,
                                aegDepD2,
                                aegDepE,
                                depAlb,
                                longitude: lng,
                                latitude: lat,
                                tempo,
                                temperatura,
                                umidade,
                                larvas,
                                pupas,
                                exuvias,
                                adultos,
                            });
                        }));
                    }
                    else {
                        return res.status(400).send({ message: 'Existe uma das Visistas Boletim Lira já registrada', uuidVisitaRegistrada: registeredIds });
                    }
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).send({ message: 'Internal Error' });
            }
            return res.status(200).send({ message: 'Boletim Lira registrado' });
        });
    }
    getAllImv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reports = yield (0, database_1.knex)('report_lira').select('tipoImv').distinct();
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
                const reports = yield (0, database_1.knex)('report_lira').select('municipio').distinct();
                res.status(200).json(reports);
            }
            catch (error) {
                console.log(error);
                return res.status(500).send({ message: 'Internal Error' });
            }
        });
    }
    getReports(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = req.query;
            const fromDate = params.fromDate ? String(params.fromDate) : '';
            const toDate = params.toDate ? String(params.toDate) : '';
            const typeImv = params.typeImv ? String(params.typeImv) : '';
            const country = params.country ? String(params.country) : '';
            const reports = yield (0, database_1.knex)('report_lira').select().where((builder) => {
                if (toDate && fromDate) {
                    builder.whereBetween('campoData', [fromDate, toDate]);
                }
                else if (fromDate) {
                    builder.where('campoData', '>=', fromDate);
                }
                else if (toDate) {
                    builder.where('campoData', '<=', toDate);
                }
                else {
                    builder.where('id', '<>', '');
                }
                if (typeImv) {
                    builder.whereLike('tipoImv', typeImv);
                }
                if (country) {
                    builder.whereLike('municipio', country);
                }
            }).orderBy('campoData');
            res.status(200).send(reports);
        });
    }
}
exports.default = ReportLiraaController;
//# sourceMappingURL=ReportLiraaController.js.map