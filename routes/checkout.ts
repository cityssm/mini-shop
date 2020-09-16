import { Router } from "express";

import { handler as handler_checkout } from "../handlers/checkout";


const router = Router();


router.get("/", handler_checkout);


export = router;
