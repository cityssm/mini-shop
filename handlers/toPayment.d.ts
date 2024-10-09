import type { Request, Response } from 'express';
export default function handler(request: Request<unknown, unknown, {
    orderNumber: string;
    orderSecret: string;
}>, response: Response): Promise<void>;
