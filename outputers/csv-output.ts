import _ from "lodash";
import csvStringify from "csv-stringify";
import fs from "fs";

// output given log stats into csv
export function logStatsCsvOut(stats:LogStats):void
{
    var outputstats:ShowStatsWritable[]=showStatsToWritable(stats);

    csvStringify(
        outputstats,
        {
            header:true
        },
        (err:Error|undefined,output:string)=>{
            fs.writeFile("out_TEST.csv",output,()=>{
                console.log("outputed");
            });
        }
    );
}

// convert log stats to array of show stats writable.
function showStatsToWritable(stats:LogStats):ShowStatsWritable[]
{
    return _.map(stats,(x:ShowStats,i:string):ShowStatsWritable=>{
        return {
            name:i,
            count:x.count,

            averageGap:x.averageGap.as("days"),
            longestGap:x.longestGap.as("days"),
            totalTime:x.totalTime.as("days")
        };
    });
}