import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import {AdminRoute, VendorRoute} from "./routes";
import {MONGODB_URI} from "./config";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/admin", AdminRoute);
app.use("/vendor", VendorRoute);

mongoose.connect(MONGODB_URI)
    .then((result) => {
        console.log('Mongodb connected');
    })
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });

app.listen(8000, () => {
    console.clear();
    console.log("Server runs on port 8000");
});

