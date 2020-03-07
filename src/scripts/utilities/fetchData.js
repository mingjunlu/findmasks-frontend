const fetchData = async (path = '') => {
    const currentHour = new Date().getHours();
    const isPeakTime = (currentHour >= 7) && (currentHour < 23);
    const url = isPeakTime ? `${process.env.ENDPOINT}${path}` : process.env.GIST_URL;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();

        if (!isPeakTime && path) {
            const segments = path.split('/');
            const placeId = segments[segments.length - 1];

            const target = data.features.find((feature) => (feature.properties.id === placeId));
            if (!target) { throw new Error(); }

            // Add a short delay
            await new Promise((resolve) => {
                const shortDelay = 400;
                setTimeout(resolve, shortDelay);
            });
            return target;
        }

        return data;
    } catch (error) {
        return error;
    }
};

export default fetchData;
