const axios = require('axios');

class UberApiExplorer {
    constructor() {
        this.baseURL = 'https://developer.uber.com/docs/guest-rides/introduction';
        this.findings = [];
    }

    async testConnection() {
        console.log("Testing Connection to Uber API...");
        try {
            const response = await axios.get(`${this.baseURL}/products`);
            this.recordFinding('Success', 'Basic connections works', response.data);
        } catch (error) {
            this.recordFinding('Failure', 'Needs authentication', error.response?.data);
        }
    }

    recordFinding(type, description, data) {
        const finding = {
            timestamp: new Date().toISOString(),
            type,
            description,
            data: JSON.stringify(data, null, 2)
        };

        this.findings.push(finding);
        console.log(`\n[${type}] ${description}`);
        if (data) console.log(data);
    }
}

const explorer = new UberApiExplorer();
explorer.testConnection();