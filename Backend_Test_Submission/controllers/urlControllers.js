import { statsDatabase, urlDatabase } from '../server.js';
import { generateShortCode, getCurrentTimestamp, isValidUrl } from '../services/urlServices.js';


const shortenUrl = (req, res) => {
    try {
        const { url, validity, shortcode } = req.body;

        // Validate required field
        if (!url) {
            return res.status(400).json({
                error: 'URL is required'
            });
        }

        // Validate URL format
        if (!isValidUrl(url)) {
            return res.status(400).json({
                error: 'Invalid URL format'
            });
        }


        let finalShortcode = shortcode;
        if (!finalShortcode) {
            finalShortcode = generateShortCode();
            // Ensure uniqueness
            while (urlDatabase.has(finalShortcode)) {
                finalShortcode = generateShortCode();
            }
        } else {
            // Check if custom shortcode already exists in db
            if (urlDatabase.has(finalShortcode)) {
                return res.status(409).json({
                    error: 'Shortcode already exists'
                });
            }
        }

        // Set validity (default is  30 minutes if not provided by the user)
        const validityMinutes = validity || 30;
        const expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + validityMinutes);


        const urlData = {
            originalUrl: url,
            shortcode: finalShortcode,
            createdAt: getCurrentTimestamp(),
            expiryDate: expiryDate.toISOString(),
            clicks: 0
        };

        urlDatabase.set(finalShortcode, urlData);

        // Initialize the stats
        statsDatabase.set(finalShortcode, {
            totalClicks: 0,
            clickData: [],
            originalUrl: url,
            createdAt: urlData.createdAt,
            expiryDate: urlData.expiryDate
        });


        res.status(201).json({
            shortlink: `http://hostname:port/${finalShortcode}`,
            expiry: urlData.expiryDate
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,

        });
    }
}



export {shortenUrl};