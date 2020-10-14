const globalAny: any = global;
const { apiServerProcess } = globalAny;

module.exports = async () => {
  if (apiServerProcess) {
    apiServerProcess.kill('SIGINT');
  }
};
