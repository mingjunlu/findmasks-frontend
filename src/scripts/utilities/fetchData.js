const fetchData = async () => {
    const currentHour = new Date().getHours();
    const isPeakTime = (currentHour >= 7) && (currentHour < 23);
    const url = isPeakTime ? process.env.ENDPOINT : process.env.GIST_URL;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    } catch (error) {
        return error;
    }
};

export default fetchData;
