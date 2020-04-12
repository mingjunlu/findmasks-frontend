const fetchData = async (url, options) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const { status, statusText } = response;
            throw new Error(`${status} ${statusText}`);
        }
        return response.json();
    } catch (error) {
        return error;
    }
};

export default fetchData;
