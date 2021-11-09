export function sqlPager(query:string, limit:number = 0, offset:number = 0):string {
    let sql = query;
    if (limit > 0) {
        sql += " LIMIT " + limit;
    }
    if (offset > 0) {
        sql += " OFFSET " + offset;
    }
    return sql;
}