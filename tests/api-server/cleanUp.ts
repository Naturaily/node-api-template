const globalAny: any = global;
const { apiServerProcess } = globalAny;

module.exports = () => {
  if (apiServerProcess) {
    apiServerProcess.kill('SIGINT');
  }
};
