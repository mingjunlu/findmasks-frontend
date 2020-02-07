const fetchData = async () => {
    try {
        const response = await fetch('/pharmacies');
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err.message);
        return err;
    }
};

export default fetchData;
