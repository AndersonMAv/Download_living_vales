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
exports.MapboxGeocoding = void 0;
const axios_1 = __importDefault(require("axios"));
const lat_lng_1 = require("data/lat-lng");
class MapboxGeocoding {
    geocode(address) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const api = axios_1.default.create({ baseURL: 'https://api.mapbox.com' });
            let params = {
                'access_token': 'pk.eyJ1IjoiaW50ZXJhY3Qtc29sdXRpb25zIiwiYSI6ImNscXA4ZWxvMzN3Nmwycm11c2ZzN2Fjc3AifQ.x7svWNVtIQ1UATfZAZk5VQ',
                'country': 'BR'
            };
            const place = `${address.houseNumber} ${address.streetName} ${address.block} ${address.city}.json`;
            const response = yield api.get(`/geocoding/v5/mapbox.places/${place}`, { params });
            const coordinates = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.features[0]) === null || _b === void 0 ? void 0 : _b.center;
            return new lat_lng_1.LatLng(coordinates[1], coordinates[0]);
        });
    }
}
exports.MapboxGeocoding = MapboxGeocoding;
//# sourceMappingURL=mapbox-geocoding.js.map