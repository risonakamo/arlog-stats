import fs from "fs";
import _ from "lodash";

import {parseLogEntries} from "./processors/logentry-processors";
import {groupByShortName} from "./processors/short-name-processors";
import {computeStats} from "./stat-compute/compute-stats";
import {logStatsCsvOut} from "./outputers/csv-output";

// --- CONFIG ---
// path to log file to use
const _targetFile:string="testlog2.log";

// shortnames to combine
const _combineNames:ShortNameMerge={
    "tsuujoukougekigazentaikougekidenikaikougekinookaasanwasukidesuka":[
        "tsuujoukougekigazentaikougekidenikaikougekinookaasanwasukidesukaend"
    ],
    "hentatsu":["hentatsutv"],
    "kandagawajetgirls":["kandagawajetgirlsend"],
    "maesetsu":["maesetsuopeningact"]
};

const _countThreshold=1;
// --- END CONFIG ---

function main():void
{
    var logfile:string[]=fs.readFileSync(_targetFile,"utf8").split("\n");

    var logEntries:LogRow[]=parseLogEntries(logfile);

    var groupedLogs:LogRowsByShortName=groupByShortName(logEntries,_combineNames,_countThreshold);

    var stats:LogStats=computeStats(groupedLogs);

    logStatsCsvOut(stats);
}

main();