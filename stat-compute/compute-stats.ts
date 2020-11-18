import _ from "lodash";

import {maxGap,averageGap,longestGap} from "./gap-calc";

// convert logrowsbyshortname into log stats. converts each log rows for each show
// into show stats for that show.
export function computeStats(allLogs:LogRowsByShortName):LogStats
{
    return _.mapValues(allLogs,(x:LogRow[])=>{
        return computeStatsSingle(x);
    });
}

// given logs for a single show, hopefully in order, compute show stats object for the show.
function computeStatsSingle(logs:LogRow[]):ShowStats
{
    return {
        count:logs.length,
        averageGap:averageGap(logs),
        longestGap:longestGap(logs),
        totalTime:maxGap(logs)
    };
}