import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Library";

const router = express();

// Connect to MongoDB

mongoose.set('strictQuery', false); // Deprecation warning
mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Connected to MongoDB!');
    })
    .catch(error => {
        Logging.error('Unable to connect to MongoDB');
        Logging.error(error);
    })