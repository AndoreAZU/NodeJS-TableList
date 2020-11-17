const oracledb = require('oracledb')
oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient_19_8'});
oracledb.createPool({
            user: '',
            password: '',
            connectString: '',
            poolAlias: 'dbconnect'
        });
module.exports.connection =  async function checkConnection(sql, req, res){
    var result;
    try{
        
        console.log('Connected to Oracle');
    }catch (err){
        console.log(err);
    }finally{
        try{
            var map;
            const pool = oracledb.getPool('dbconnect');
            const connection = await pool.getConnection();
            result = await connection.execute('select * from list_server');
            await connection.close();
            console.log('Close Connection Success');
            data = extractData(result);
            console.log(JSON.stringify(data));
            res.end(JSON.stringify(data));
        }catch(err){
            console.log(err);
        }
    }
}

function extractData(result){
    var size = result.rows.length;
    var row_size = result.rows[0].length;
    var arr = new Array();
    for(var i=0;i<size;i++){
        var map = new Map();
        for (var y=0;y<row_size;y++){
            map[result.metaData[y].name] = result.rows[i][y];
        }
        arr.push(map);
    }
    return arr;
}