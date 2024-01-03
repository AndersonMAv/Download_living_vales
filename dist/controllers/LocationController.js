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
Object.defineProperty(exports, "__esModule", { value: true });
const deposit_types_1 = require("../data/deposit-types");
const database_1 = require("../database");
class LocationController {
    getLocations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = req.query;
            const fromDate = params.fromDate ? String(params.fromDate) : '';
            const toDate = params.toDate ? String(params.toDate) : '';
            const liraaPositions = yield (0, database_1.knex)('report_lira')
                .select('latitude', 'longitude', 'id', 'campoData', 'tipoImv', 'tempo', 'temperatura', 'umidade', 'labAeg', 'depA1', 'depA2', 'depB', 'depC', 'depD1', 'depD2', 'depE', 'tempo', 'temperatura', 'umidade', 'larvas', 'pupas', 'exuvias', 'adultos')
                .where('labAeg', '>', 0)
                .andWhere('latitude', '!=', 0)
                .andWhere('longitude', '!=', 0)
                .andWhere((builder) => {
                if (toDate && fromDate) {
                    builder.whereBetween('campoData', [fromDate, toDate]).orderBy('campoData');
                }
                else if (fromDate) {
                    builder.where('campoData', '>=', fromDate).orderBy('campoData');
                }
                else if (toDate) {
                    builder.where('campoData', '<=', toDate).orderBy('campoData');
                }
                else {
                    builder.where('id', '<>', '').orderBy('campoData');
                }
                // if (typeImv) {
                //     builder.whereLike('tipoImv', typeImv);
                // }
                // if (country) {
                //     builder.whereLike('municipio', country);
                // }
            });
            liraaPositions.forEach((element) => {
                let depositsLiraa = [];
                if (element.depA1 && element.depA1 > 0) {
                    depositsLiraa.push(deposit_types_1.DepositTypes.depA1);
                }
                delete element.depA1;
                if (element.depA2 && element.depA2 > 0) {
                    depositsLiraa.push(deposit_types_1.DepositTypes.depA2);
                }
                delete element.depA2;
                if (element.depB && element.depB > 0) {
                    depositsLiraa.push(deposit_types_1.DepositTypes.depB);
                }
                delete element.depB;
                if (element.depC && element.depC > 0) {
                    depositsLiraa.push(deposit_types_1.DepositTypes.depC);
                }
                delete element.depC;
                if (element.depD1 && element.depD1 > 0) {
                    depositsLiraa.push(deposit_types_1.DepositTypes.depD1);
                }
                delete element.depD1;
                if (element.depD2 && element.depD2 > 0) {
                    depositsLiraa.push(deposit_types_1.DepositTypes.depD2);
                }
                delete element.depD2;
                if (element.depE && element.depE > 0) {
                    depositsLiraa.push(deposit_types_1.DepositTypes.depE);
                }
                delete element.depE;
                element.deposits = depositsLiraa;
            });
            return res.status(200).send(liraaPositions);
        });
    }
}
exports.default = LocationController;
//# sourceMappingURL=LocationController.js.map