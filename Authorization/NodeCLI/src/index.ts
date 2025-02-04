/**
 * The sample explains the authorization, and fetching of iModel and iTwin details using the iTwin.js platform.
 * It prompts the user for input, signs in to the iTwin.js platform, fetches the required details, and then signs out.
 */

import { NodeCliAuthorizationClient } from "@itwin/node-cli-authorization";
import axios from "axios";
import * as dotenv from "dotenv";
import * as readline from "readline";

// Load environment variables from .env file
dotenv.config();

const clientId = process.env.CLIENT_ID || ""

const authClient = new NodeCliAuthorizationClient({clientId, scope: "itwin-platform"});
let accessToken: string = "";

/**
 * Main function to handle the sign-in process, prompt user for details, and sign out.
 */
(async() => {

    console.log("Starting to Sign In");

    await authClient.signIn();  // Sign in to iTwin.js

    accessToken = await authClient.getAccessToken();
    
    await promptUserForDetails();

    await authClient.signOut(); // Sign out of iTwin.js
})();

/**
 * Prompts the user to choose an option and enter a GUID, then fetches the corresponding details.
 */
export async function promptUserForDetails() {
    const reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    /**
     * Fetches details based on the selected option and GUID.
     * @param {number} option - The selected option (1 for iModel, 2 for iTwin).
     * @param {string} guid - The GUID for which details are to be fetched.
     */
    const getDetails = async (option: number, guid: string) => {
        switch (option) {
            case 1:
                console.log(`Extracting iModel details for GUID: ${guid}`);
                await fetchDetails(`https://api.bentley.com/imodels/${guid}`);
                break;
            case 2:
                console.log(`Extracting iTwin details for GUID: ${guid}`);
                await fetchDetails(`https://api.bentley.com/imodels/?iTwinId=${guid}`);
                break;
            default:
                console.log("Invalid option");
        }
    };

    reader.question('Menu:\n1. Extract iModel Details based on Guid\n2. Extract iTwin Details based on Guid\n3. Quit\nChoose an option:\n', (option) => {
        if (parseInt(option) === 3) {
            console.log("Quitting");
            reader.close();
            return;
        }
        reader.question('Enter the GUID: ', async (guid) => {
            await getDetails(parseInt(option), guid);
            reader.close();
        });
    });
}

/**
 * Fetches details from the given URL and logs the response.
 * @param {string} url - The URL to fetch details from.
 */
export async function fetchDetails(url: string) {
    try {
        const response = await axios.get(url, {
            headers: {
                Accept: "application/vnd.bentley.itwin-platform.v2+json",
                Authorization: `${accessToken}`
            }
        });
        console.log("API Response: ", response.data);
    } catch (error) {
        console.error("Error fetching details: ", error);
    }
}

