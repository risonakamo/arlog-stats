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