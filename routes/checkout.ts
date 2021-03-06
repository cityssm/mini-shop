import { Router } from "express";

import { handler as handler_checkout } from "../handlers/checkout";
import { handler as handler_getProductDetails } from "../handlers/getProductDetails";
import { handler as handler_createOrder } from "../handlers/createOrder";
import { handler as handler_toPayment } from "../handlers/toPayment";
import { handler as handler_fromPayment } from "../handlers/fromPayment";


const router = Router();


router.get("/", handler_checkout);


router.post("/doGetProductDetails", handler_getProductDetails);


router.post("/doCreateOrder", handler_createOrder);


router.post("/toPayment", handler_toPayment);


router.all("/fromPayment", handler_fromPayment);


export = router;
