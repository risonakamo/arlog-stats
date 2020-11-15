import fs from "fs";
import _ from "lodash";
import {Duration} from "luxon";

import {parseLogEntries} from "./processors/logentry-processors";
import {groupByShortName} from "./processors/short-name-processors";

import {maxGap} from "./stat-computers/max-gap";
import {averageGap} from "./stat-computers/average-gap";

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

    // --- TESTING ---
    var testshow:LogRow[]=groupedLogs["oshigabudoukanittekuretarashinu"];
    console.log("max",maxGap(testshow).as("days"));
    console.log("average",averageGap(testshow).as("days"));
    // --- END TESTING ---
}

main();