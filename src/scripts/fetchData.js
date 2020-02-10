import papa from 'papaparse';
import toHalfWidth from './toHalfWidth';
import coords from '../assets/coords.json';

const fetchData = async () => {
    let rawPharmacies;
    try {
        rawPharmacies = await new Promise((resolve, reject) => {
            papa.parse('/pharmacies?format=csv', {
                header: true,
                transformHeader(header) {
                    switch (header) {
                        case '醫事機構代碼':
                            return 'id';
                        case '醫事機構名稱':
                            return 'name';
                        case '醫事機構地址':
                            return 'address';
                        case '醫事機構電話':
                            return 'phone';
                        case '成人口罩總剩餘數':
                            return 'masksLeft';
                        case '兒童口罩剩餘數':
                            return 'childMasksLeft';
                        case '來源資料時間':
                            return 'updatedAt';
                        default:
                            return header;
                    }
                },
                dynamicTyping: true,
                complete(results) {
                    resolve(results);
                },
                error(err) {
                    reject(err);
                },
                download: true,
                skipEmptyLines: true,
            });
        });
    } catch (error) {
        return error;
    }

    if (!rawPharmacies) {
        return new Error();
    }

    return rawPharmacies.data
        .filter((pharmacy) => {
            if (!coords[pharmacy.id]) { return false; }
            const isValid = (Object.keys(pharmacy).length >= 7);
            if (!isValid) { return false; }
            return true;
        })
        .map((pharmacy) => ({
            id: pharmacy.id.toString(),
            name: pharmacy.name,
            phone: pharmacy.phone,
            address: toHalfWidth(pharmacy.address),
            coordinates: {
                longitude: coords[pharmacy.id].lon,
                latitude: coords[pharmacy.id].lat,
            },
            masksLeft: pharmacy.masksLeft,
            childMasksLeft: pharmacy.childMasksLeft,
        }));
};

export default fetchData;
