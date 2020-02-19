const fetchData = async () => {
    try {
        const response = await fetch(process.env.ENDPOINT, { headers: { Accept: 'application/geo+json' } });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        return {
            data,
            updatedAt: response.headers.get('Last-Modified'),
        };
    } catch (error) {
        return error;
    }
};

export default fetchData;
