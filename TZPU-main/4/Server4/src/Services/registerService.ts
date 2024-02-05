import * as http from 'http';

class RegisterService {
    private readonly discoveryServiceUrl: string;
    private readonly httpClient: http.ClientRequest;

    constructor(httpClient: http.ClientRequest, discoveryServiceUrl: string) {
        this.httpClient = httpClient;
        this.discoveryServiceUrl = discoveryServiceUrl;
    }

    async registerWithDiscoveryServiceAsync(): Promise<void> {
        const serviceAddress = 'http://localhost:8080';
        const serviceName = 'your-service-name';
        const payload = JSON.stringify({ ServiceName: serviceName, ServiceAddress: serviceAddress });

        const options: http.RequestOptions = {
            hostname: 'your-discovery-service-url',
            port: 80,
            path: '/register',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': payload.length.toString(),
            },
        };

        return new Promise<void>((resolve, reject) => {
            const req = http.request(options, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    if (res.statusCode === 200) {
                        console.log(`Successfully registered ${serviceName} at ${serviceAddress}`);
                        resolve();
                    } else {
                        console.log(`Failed to register ${serviceName}. Status code: ${res.statusCode}`);
                        reject(`Failed to register ${serviceName}. Status code: ${res.statusCode}`);
                    }
                });
            });

            req.on('error', (error) => {
                console.error(`An error occurred during registration: ${error.message}`);
                reject(`An error occurred during registration: ${error.message}`);
            });

            req.write(payload);
            req.end();
        });
    }
}

export default RegisterService;
