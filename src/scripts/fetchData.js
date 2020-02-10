import papa from 'papaparse';
import transformHeader from './transformHeader';
import toHalfWidth from './toHalfWidth';
import coords from '../assets/coords.json';

const fetchData = async () => {
    let rawPharmacies;
    try {
        rawPharmacies = await new Promise((resolve, reject) => {
            papa.parse('/pharmacies?format=csv', {
                header: true,
                transformHeader,
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
