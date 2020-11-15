import fs from "fs";
import _ from "lodash";

import {parseLogEntries} from "./logentry-processors";
import {groupByShortName} from "./short-name-processors";

// --- CONFIG ---
// path to log file to use
const _targetFile:string="testlog.log";

// shortnames to combine
const _combineNames:ShortNameMerge={
    "tsuujoukougekigazentaikougekidenikaikougekinookaasanwasukidesuka":[
        "tsuujoukougekigazentaikougekidenikaikougekinookaasanwasukidesukaend",
        "tsuujoukougekigazentaikougekidenikaikougekinookaasanwasukidesukaova"
    ],
    "hentatsu":["hentatsutv"],
    "kandagawajetgirls":["kandagawajetgirlsend"],
    "nullpeta":["nullpetaova"],
    "maesetsu":["maesetsuopeningact"],
    "fragtime":["framearmsmovie"]
};

const _countThreshold=1;
// --- END CONFIG ---

function main():void
{
    var logfile:string[]=fs.readFileSync(_targetFile,"utf8").split("\n");

    var logEntries:LogRow[]=parseLogEntries(logfile);

    var groupedLogs:LogRowsByShortName=groupByShortName(logEntries,_combineNames,_countThreshold);

    console.log(groupedLogs["lapisrelights"]);
}

main();