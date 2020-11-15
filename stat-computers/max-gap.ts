import {Duration} from "luxon";
import _ from "lodash";

// return duration of a log rows array. log rows array is assumed to be sorted
// and not empty.
export function maxGap(logs:LogRow[]):Duration
{
    return _.last(logs)!.luxDate.diff(logs[0].luxDate);
}