import { logger } from './index';

const sequelizeLogRegex = /^Executing \(([^)]+)\): (.*[^;]);?$/;

function transformToLog(sql: string, runTime: number) {
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

  if (log.queryLength > 1000) {
    logger.warn(log.query, 'sqlSlowQuery');
  } else {
    logger.debug(log.query, 'sqlQuery');
  }
}
