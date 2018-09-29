var configValues = require('./config');

module.exports = {
    
    getDbConnectionString: function() {
        return  'mongodb://127.0.0.1:27017/geo'; // 'YOUR_MONGO_URL' bookdb is tablename;
    }
    
}