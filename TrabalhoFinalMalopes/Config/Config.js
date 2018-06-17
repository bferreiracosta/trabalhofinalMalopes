var env = process.env.NODE_ENV || 'development';

console.log('Enviorement => ', env);

if(env === 'development' || env === 'test') {
    var config = require('./Config.json');
    var envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
    
}