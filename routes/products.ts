import { Router } from "express";

import { handler as handler_products } from "../handlers/products";
import { handler as handler_productView } from "../handlers/product-view";


const router = Router();


router.get("/", handler_products);


router.get("/:productSKU", handler_productView);


export = router;
