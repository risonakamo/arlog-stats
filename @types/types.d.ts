// --- initial data types ---
// raw extracted info from a raw log entry
interface LogRowExtracted
{
    date:string
    fullName:string
}

// object item representing a log row.
interface LogRow extends LogRowExtracted
{
    luxDate:DateTime
    shortName:string
}

// --- shortname types ---
// log rows sorted by their short names
type LogRowsByShortName=Record<string,LogRow[]>

// map shortnames on the right side to the left side. all names
// on left side will be considered the right side.
type ShortNameMerge=Record<string,string[]>

// activating short name merge config to be more usable. left side is now
// an input shortname, right side is the shortname that in input shortname
// should be converted to. essentially a reversed version of ShortNameMerge
type ActivatedShortNameMerge=Record<string,string>

// --- stats types ---
// object item containing log row data for a single shortname and
// stats associated.
interface ShowStats
{
    count:number

    averageGap:Duration
    longestGap:Duration
    // timeSinceLast:Duration
    totalTime:Duration
}

// stats for all shows of a log. key is shortname, value is the stats for
// that short name.
type LogStats=Record<string,ShowStats>

// output version of ShowStats table
interface ShowStatsWritable
{
    name:string
    count:number

    // all times in days
    averageGap:number
    longestGap:number
    // timeSinceLast:number
    totalTime:number
}