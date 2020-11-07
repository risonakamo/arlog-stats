import fs from "fs";

import {parseLogEntries} from "./logentry-processors";

const _targetFile:string="testlog.log";

function main():void
{
    var logfile:string[]=fs.readFileSync(_targetFile,"utf8").split("\n");

    console.log(parseLogEntries(logfile));
}

main();