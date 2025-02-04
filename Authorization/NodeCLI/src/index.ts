import { NodeCliAuthorizationClient } from "@itwin/node-cli-authorization";
import axios from "axios";
import * as dotenv from "dotenv";
import * as readline from "readline";

// Load environment variables from .env file
dotenv.config();

const clientId = process.env.CLIENT_ID || ""

const authClient = new NodeCliAuthorizationClient({clientId, scope: "itwin-platform"});
let accessToken: string = "";

 (async() => {

    console.log("Starting to Sign In");

    await authClient.signIn();  // Sign in to iTwin.js

    accessToken = await authClient.getAccessToken();
    
    await promptUserForDetails();

    await authClient.signOut(); // Sign out of iTwin.js
})();


async function promptUserForDetails() {
    const reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

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


async function fetchDetails(url: string) {
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

