import endpointService from "../services/endpoint.service";
import { Response, Request } from "express";

class   EndpointController    {
    async create(req: Request, rest: Response) {
        try {
            const {name, url, method, checkIntervalSec, timeoutMs, userId, isActive} = req.body;

            // 1. Validasi name, url, userId tidak kosong
            if (!name || !url) {
                return rest.status(400).json({
                    error: "Name and URL are required"
                });
            }
            
            // 2. Panggil service
            const endpoint = await endpointService.createEndpoint({
                name,
                url,
                method,
                checkIntervalSec,
                timeoutMs,
                userId,
                isActive,
            });
            
            return rest.status(201).json(endpoint);   
        } catch (error) {
            console.error('Error creating endpoint:', error);
            return rest.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getAllEndpoints(req: Request, rest: Response) {
        try {
            const endpoint = await endpointService.getAllEndpoints();
            return rest.status(200).json(endpoint);
        } catch (error) {
            console.error('Error getting endpoints:', error);
            return rest.status(500).json({ error: "Internal Server Error" });
        }
    }

    async geEndpointById(req: Request, rest: Response) {
        try {
            const id = req.params.id;
            if (!id || typeof id !== 'string') {
                return rest.status(400).json({ error: "Valid ID is required" });
            }

            const endpoint = await endpointService.getEndpointById(id);
            return rest.status(200).json(endpoint);
        } catch (error) {
            console.error('Error getting endpoint:', error);
            return rest.status(500).json({ error: "Internal Server Error" });
        }
    }

    async update(req: Request, rest: Response) {
        try {
            const id = req.params.id;
            const {name, url, method, checkIntervalSec, timeoutMs, isActive} = req.body;
            if (!id || typeof id !== 'string') {
                return rest.status(400).json({ error: "Valid ID is required" });
            }

            const endpoint = await endpointService.updateEndpoint(id,{
                name,
                url,
                method,
                checkIntervalSec,
                timeoutMs,
                isActive,
            });
            return rest.status(200).json(endpoint);
        } catch (error) {
            console.error('Error updating endpoint:', error);
            return rest.status(500).json({ error: "Internal Server Error" });
        }
    }

    async delete(req: Request, rest: Response) {
        try {
            const id = req.params.id;
            if (!id || typeof id !== 'string') {
                return rest.status(400).json({ error: "Valid ID is required" });
            }

            const endpoint = await endpointService.deleteEndpoint(id);
            return rest.status(200).json(endpoint);
        } catch (error) {
            console.error('Error deleting endpoint:', error);
            return rest.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default new EndpointController();