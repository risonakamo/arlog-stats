import fs from "fs";
import _ from "lodash";
import chalk from "chalk";

import {parseLogEntries} from "./logentry-processors";

// path to log file to use
const _targetFile:string="testlog.log";

const _combineNames:ShortNameMerge={
    "tsuujoukougekigazentaikougekidenikaikougekinookaasanwasukidesuka":[
        "tsuujoukougekigazentaikougekidenikaikougekinookaasanwasukidesukaend"
    ],
    "hentatsu":[
        "hentatsutv"
    ]
};

function main():void
{
    var logfile:string[]=fs.readFileSync(_targetFile,"utf8").split("\n");

    var logEntries:LogRow[]=parseLogEntries(logfile);

    var groupedLogs:LogRowsByShortName=groupByShortName(logEntries,_combineNames);
}

// group entries by their shortname.
function groupByShortName(entries:LogRow[],combineNames:ShortNameMerge={}):LogRowsByShortName
{
    var activatedcombinednames:ActivatedShortNameMerge=activateShortnameMerge(combineNames);

    var res:LogRowsByShortName=_.groupBy(entries,(x:LogRow)=>{
        if (activatedcombinednames[x.shortName])
        {
            return activatedcombinednames[x.shortName];
        }

        return x.shortName;
    });

    console.log(chalk.yellow("unique shortnames:"));
    console.log(_.keys(res).sort());
    console.log();

    return res;
}

// convert shortname merge config into activated short name merge
function activateShortnameMerge(combineNames:ShortNameMerge):ActivatedShortNameMerge
{
    return _.reduce(combineNames,(r:ActivatedShortNameMerge,x:string[],i:string)=>{
        for (var y=0,l=x.length;y<l;y++)
        {
            if (r[x[y]])
            {
                console.log(`${chalk.red("shortname merge overlap:")} ${r[x[y]]} -> ${i}`);
            }

            r[x[y]]=i;
        }

        return r;
    },{});
}

main();