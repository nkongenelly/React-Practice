import routes from "./routes/auth/auth.mjs";
import cors from "cors";
import * as helmet from "helmet";
import express from 'express';
import bodyParser from "body-parser";
import passport from "passport";
import path from "path";
import dotenv from "dotenv";
import  cookieParser from 'cookie-parser';
dotenv.config();
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// create express app
const app = express();

// app.use(helmet({
//     contentSecurityPolicy: {
//         directives: {
//             defaultSrc:["*"],
//             scriptSrc: ["'self'", "http://*", "'unsafe-inline'", "blob:"],                
//             styleSrc:["'self'",'http://*', "'unsafe-inline'"],
//             fontSrc:["'self'",'http://*', "'unsafe-inline'","'unsafe-eval'"],
//             imgSrc: ["'self'", "data:", 'http://*'],
//             workerSrc: ["'self'", "http://*", "'unsafe-inline'", "blob:"]
//         }
//     }
// }));
const options = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: (origin, callback)=>{
        console.log("Origin is ", origin);
        if(origin === undefined || origin === null) {
            // no origin value so assuming same origin calls
            callback(null, true);
        }else {
            let matches = new RegExp(`^(http?://.+\.(127.0.0.1)(?::\d{1,5})?)$`).exec(origin);
            console.log("main domain matches", matches);
            if(matches && matches.length){
                console.log("Matches main domain");
                callback(null, true);
            } else {
                console.log("checking allowed domains");
                let allowedDomains = process.env.CUSTOM_DOMAINS;
                console.log("allowedDomains", allowedDomains);
                matches = new RegExp(allowedDomains.replace(',', '|')).exec(origin);
                console.log("allowed domain check", matches);
                if(matches && matches.length){
                    console.log("Matches allowed domain");
                    callback(null, true);
                }else {
                    callback(new Error('Not allowed by CORS'));
                }
            }
        }
    },
    preflightContinue: false,
  };
app.use(cors(options));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded());
//app.use(express.multipart());
app.use(passport.initialize());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Set all routes from routes folder
app.use("/", routes);

 //custom Middleware for logging the each request going to the API
 app.use((req,res,next) => {
    if (req.body) console.log(req.body);
    if (req.params) console.log(req.params);
    if(req.query) console.log(req.query);
    console.log(`Received a ${req.method} request from ${req.ip} for ${req.url}`);
next();
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(process.env.PORT)