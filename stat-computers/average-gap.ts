import {Duration,DateTime} from "luxon";
import _ from "lodash";

import {maxGap} from "./max-gap";

// given the logs of ONE GROUP determine the average gap time.
export function averageGap(logs:LogRow[]):Duration
{
    var maxgap:Duration=maxGap(logs);

    var averageDays:number=maxgap.as("days")/logs.length;

    return Duration.fromObject({days:averageDays});
}