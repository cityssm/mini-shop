import { Router } from "express";

import { handler as handler_checkout } from "../handlers/checkout";
import { handler as handler_getProductDetails } from "../handlers/getProductDetails";


const router = Router();


router.get("/", handler_checkout);


router.post("/doGetProductDetails", handler_getProductDetails);


export = router;
