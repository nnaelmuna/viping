import { prisma } from "../db";

interface CreateEndpointInput {
    name               : string,
    url                : string,
    userId             : string,
    method             : string,
    checkIntervalSec   : number,
    timeoutMs          : number,
    isActive           : boolean 
}

interface UpdateEndpointInput {
    name               : string;
    url                : string;
    method             : string;
    checkIntervalSec   : number;
    timeoutMs          : number;
    isActive           : boolean;
}


class EndpointService {

    // Method 1: Create Endpoint
    async createEndpoint(data: CreateEndpointInput) {
        const endpoint = await prisma.endpoint.create({
            data: {
                name: data.name,
                url: data.url,
                method: data.method ?? 'GET',
                checkIntervalSec: data.checkIntervalSec ?? 60,
                timeoutMs: data.timeoutMs ?? 5000,
                userId: data.userId,
            }
        });

        return endpoint;
    }   

    // Method 2: Get All Endpoint
    async getAllEndpoints() {
        return await prisma.endpoint.findMany({
            orderBy: {
                createdAt: 'desc'
            },
        });
    }

    // Method 3: Get Single Endpoint by ID
    async getEndpointById(id: string) {
        return await prisma.endpoint.findUnique({
            where: {id},
        });
    }

    // Method 4: Update Endpoint
    async updateEndpoint(id: string, data: 
    UpdateEndpointInput) {
        return  await prisma.endpoint.update({
            where: {id},
            data
        });
    }

    // Method 5: Delete Endpoint
    async deleteEndpoint(id: string) {
        return await prisma.endpoint.delete({
            where: {id},
        })
    }
}

export default new EndpointService();