"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DateUtilities {
    /**
     * Date deve ser no formato dd/mm/yyyy
     * @param date string
     * @returns Date
     */
    formatStringDmY(date) {
        const arr = date.split("-");
        return new Date(Number.parseInt(arr[2]), Number.parseInt(arr[1]) - 1, Number(arr[0]));
    }
}
exports.default = DateUtilities;
//# sourceMappingURL=DateUtilities.js.map