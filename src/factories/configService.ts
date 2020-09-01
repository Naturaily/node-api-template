import nconf from 'nconf';
import nconfYaml from 'nconf-yaml';
import path from 'path';
import ConfigService from '../services/ConfigService';

const config = nconf.env({ separator: '__' }).file({
  file: path.join(__dirname, '..', '..', 'configs', `${process.env.NODE_ENV}.yaml`),
  format: nconfYaml,
});

export default new ConfigService(config.get());
