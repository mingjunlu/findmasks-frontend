const fetchData = async () => {
    try {
        const response = await fetch(process.env.ENDPOINT, { headers: { Accept: 'application/json' } });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    } catch (error) {
        return error;
    }
};

export default fetchData;
