import {extname} from "path";
import _ from "lodash";
import {DateTime} from "luxon";

// parse array of log entries. removes all invalid rows.
export function parseLogEntries(entries:string[]):LogRow[]
{
    var parsedentries:LogRow[]=_.filter(_.map(entries,(x:string)=>{
        return parseLogEntry(x);
    })) as LogRow[];

    return parsedentries.sort(sortLogRows);
}

// attempt to parse log entry into LogRow data. null if failed.
function parseLogEntry(entry:string):LogRow|null
{
    var extractedInfo:LogRowExtracted|null=extractLogEntryInfo(entry);

    if (!extractedInfo)
    {
        return null;
    }

    return {
        ...extractedInfo,
        shortName:simplifyName(extractedInfo.fullName),
        luxDate:DateTime.fromJSDate(new Date(extractedInfo.date))
    };
}

// extract raw info from a log entry if possible, or return null
function extractLogEntryInfo(entry:string):LogRowExtracted|null
{
    // [1]: the date
    // [2]: the full name
    var matches:RegExpMatchArray|null=entry.match(/(\d+-\d+-\d+ \d+:\d+:\d+) (.*)/);

    if (!matches || matches.length!=3)
    {
        return null;
    }

    return {
        date:matches[1],
        fullName:matches[2]
    };
}

// attempt to reduce the name of a log entry's filename based on some specific rules.
function simplifyName(fullname:string):string
{
    var result=fullname.replace(/[\[\(].*?[\]\)]|\.mkv|\.mp4/g,"").replace(/[^\w]|\d/g,"").toLowerCase();

    if (!result.length)
    {
        result="<lengtherror>";
    }

    return result;
}

// sort compare function for LogRow
function sortLogRows(a:LogRow,b:LogRow):number
{
    return (a.luxDate as any)-(b.luxDate as any);
}