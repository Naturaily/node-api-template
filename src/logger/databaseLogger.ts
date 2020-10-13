import { logger } from './index';

function transformToLog(sql: string, runTime: number) {
  const sequelizeLogRegex = /^Executed \(([^)]+)\): (.*[^;]);?$/;
  const match = sequelizeLogRegex.exec(sql);

  if (!match) {
    return null;
  }

  const [, sqlClientUid, query] = match;

  return {
    sqlClientUid,
    query,
    queryLength: sql?.length,
    queryRuntime: runTime,
  };
}

export default function databaseLogger(sql: string, runTime: number) {
  const log = transformToLog(sql, runTime);

  if (!log) {
    return logger.warn({ sequelizeLog: log }, 'unrecognizedSequelizeLog');
  }

  if (log.queryRuntime > 1000) {
    this.log.warn(log, 'sqlSlowQuery');
  } else {
    this.log.debug(log, 'sqlQuery');
  }
}
