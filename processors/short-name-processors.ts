/* functions dealing with shortnames. */

import chalk from "chalk";
import table from "text-table";
import _ from "lodash";

// group entries by their shortname.
// give the log rows to group, the combine names configuratoin, and a threshold which each group must meet in order
// to be counted. keeps groups if greater than or equal to the threshold.
export function groupByShortName(entries:LogRow[],combineNames:ShortNameMerge={},countThreshold=0):LogRowsByShortName
{
    var activatedcombinednames:ActivatedShortNameMerge=activateShortnameMerge(combineNames);

    var res:LogRowsByShortName=_.groupBy(entries,(x:LogRow)=>{
        if (activatedcombinednames[x.shortName])
        {
            return activatedcombinednames[x.shortName];
        }

        return x.shortName;
    });

    res=_.pickBy(res,(x:LogRow[])=>{
        return x.length>=countThreshold;
    });

    printShortNames(res);

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

// print out unique shortnames of grouped log rows and the count of their log rows.
function printShortNames(groupedLogs:LogRowsByShortName):void
{
    var tablerows:string[][]=_.map(groupedLogs,(x:LogRow[],i:string)=>{
        return [
            chalk.yellow(x.length.toString()), //count of items of this shortname
            i //shortname
        ];
    });

    tablerows=_.sortBy(tablerows,(x:string[])=>{
        return x[1];
    });

    console.log(chalk.yellow("unique shortnames:"));
    console.log(table(tablerows));
    console.log();
}