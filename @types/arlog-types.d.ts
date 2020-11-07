// raw extracted info from a raw log entry
interface LogRowExtracted
{
    date:string
    fullName:string
}

// object item representing a log row.
interface LogRow extends LogRowExtracted
{
    luxDate:import("luxon").DateTime
    shortName:string
}

// log rows sorted by their short names
type LogRowsByShortName=Record<string,LogRow[]>