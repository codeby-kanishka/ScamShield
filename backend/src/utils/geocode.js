const axios = require("axios");

const geocodeLocation = async (city, state) => {
    try {
        const query = `${city}, ${state}, India`;

        const response = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
                params: {
                    q: query,
                    format: "json",
                    limit: 1
                },
                headers: {
                    "User-Agent": "ScamShield/1.0"
                }
            }
        );

        if (!response.data || response.data.length === 0) {
            return null;
        }

        return {
            latitude: Number(response.data[0].lat),
            longitude: Number(response.data[0].lon)
        };

    } catch (error) {
        console.error("Geocoding failed:", error.message);
        return null;
    }
};

module.exports = {
    geocodeLocation
};