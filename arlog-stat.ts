import fs from "fs";
import _ from "lodash";

import {parseLogEntries} from "./logentry-processors";

const _targetFile:string="testlog.log";

function main():void
{
    var logfile:string[]=fs.readFileSync(_targetFile,"utf8").split("\n");

    var logEntries:LogRow[]=parseLogEntries(logfile);

    var groupedLogs:LogRowsByShortName=groupByShortName(logEntries);
}

// TODO: extend this to use shortname merging later.
// group entries by their shortname.
function groupByShortName(entries:LogRow[]):LogRowsByShortName
{
    var res:LogRowsByShortName=_.groupBy(entries,(x:LogRow)=>{
        return x.shortName;
    });

    console.log("unique shortnames:");
    console.log(_.keys(res).sort());

    return res;
}

main();