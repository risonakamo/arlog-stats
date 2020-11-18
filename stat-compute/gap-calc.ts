import {Duration,DateTime} from "luxon";
import _ from "lodash";

// return duration of a log rows array. log rows array is assumed to be sorted
// and not empty.
export function maxGap(logs:LogRow[]):Duration
{
    return _.last(logs)!.luxDate.diff(logs[0].luxDate);
}

// given the logs of ONE GROUP determine the average gap time.
export function averageGap(logs:LogRow[]):Duration
{
    var maxgap:Duration=maxGap(logs);

    var averageDays:number=maxgap.as("days")/logs.length;

    return Duration.fromObject({days:averageDays});
}

// determine longest gap between entries of given log rows
export function longestGap(logs:LogRow[]):Duration
{
    var prevDate:DateTime=logs[0].luxDate;
    var gaps:Duration[]=_.map(logs,(x:LogRow)=>{
        var result:Duration=x.luxDate.diff(prevDate);
        prevDate=x.luxDate;
        return result;
    });

    // for (var x=0;x<gaps.length;x++)
    // {
    //     console.log("gap",gaps[x].as("days"));
    // }

    return _.maxBy(gaps,(x:Duration)=>{
        return x.as("days");
    })!;
}