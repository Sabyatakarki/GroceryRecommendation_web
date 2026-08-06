import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

export const CLIENT_URL: string = process.env.CLIENT_URL || 'http://localhost:3000';
//load env variables

export const PORT:number =
 process.env.PORT ? parseInt(process.env.PORT) : 5001;
 //ensure that the port is a number ,and fallback if not found
 //avoid exception if env is missing

 export const MONGO_URI:string =
 process.env.MONGO_URI || "mongodb://localhost:27017/grocery_recommendation";


 export const JWT_SECRET:string =
 process.env.JWT_SECRET || "grocerysecret";
 //fallback to local mongodb if env is mmissing

 //applications level CONSTANTS

 // Python venv interpreter used to run the ML recommendation script
 export const PYTHON_PATH: string =
 process.env.PYTHON_PATH ||
 path.resolve(
   __dirname,
   "../../..",
   ".venv",
   process.platform === "win32" ? "Scripts/python.exe" : "bin/python3"
 );

 export const ML_RECOMMEND_SCRIPT: string = path.resolve(
   __dirname,
   "../../ml/recommend.py"
 );