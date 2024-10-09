import type { Request, Response } from 'express';
export default function handler(request: Request<unknown, unknown, {
    productSKUs: string;
}>, response: Response): void;
