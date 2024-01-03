"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeocodingFactory = void 0;
const mapbox_geocoding_1 = require("./mapbox/mapbox-geocoding");
class GeocodingFactory {
    static instance() {
        return new mapbox_geocoding_1.MapboxGeocoding();
    }
}
exports.GeocodingFactory = GeocodingFactory;
exports.default = GeocodingFactory;
//# sourceMappingURL=geocoding.js.map