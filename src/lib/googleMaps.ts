import { Loader, importLibrary } from '@googlemaps/js-api-loader';

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const initGoogleMaps = () => {
    if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
        console.error('🗺️ Google Maps API Key missing');
        return false;
    }
    return true;
};

export const getGoogleMapsLibrary = async (name: any) => {
    return importLibrary(name);
};
