import TCPProxy from 'tcp-proxy.js';

export const postgresPort = 8181; // process.env.test__tcpProxy__postgresql || 15432;
export const postgres = new TCPProxy({ port: postgresPort });
