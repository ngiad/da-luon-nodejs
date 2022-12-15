import cluster from "cluster";
import os from "os";
import { start } from "./src/app.js";


if(cluster.isWorker){
    start();
}else{
    for(let i = 0; i < os.cpus().length - 1;i++){
        cluster.fork()
    }
    // os.cpus().forEach(() => cluster.fork())
}

