var express = require('express');
var router = express.Router();
var oracledb = require('oracledb');
var config = {
    user: 'scott',　　//用户名
    password: '123456',　　//密码
    connectString: '127.0.0.1:1521/orcl'   //IP:数据库IP地址，PORT:数据库端口，SCHEMA:数据库名称
};

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(111);
    console.log(`worker ${process.pid} is servering`);
    res.send('respond with a resource');
});

router.get('/getList', function(req, res, next) {
    // res.send('respond with a resource');

    let age = '34324';
    var student = {age,name:32423};
    console.log(`wea ${student.name}`);
    let a = x => x + 1;
    let b = a(3);

    var i = 0;
    var start = +new Date(),
        duration;

    var person = {
        name: 'wayne',
        age: 21,
        school: 'xjtu'
    }

    while (i++ < 10000) {
        var str = `Hello, I am ${person.name}, and I am ${person.age} years old, I come from ${person.school}`;
    }
    var str = `Hello, I am ${person.name}, and I am ${person.age} years old,
    I come from ${person.school}`;
    console.log(str);

    duration = +new Date() - start;
    console.log(duration)

    res.json({name:1111,age,b});
});

router.get('/getUsers',(req, res) => {
    let a = 123;
    oracledb.getConnection(config, (err, connection) => {
        if (err) {
            console.log(err);
            console.error(err.message);
            res.json(err.message);
            return;
        }
        //查询某表十条数据测试，注意替换你的表名
        // let a = connection.execute("SELECT * FROM MS_USER", (err, result) => {
        //     doRelease(connection);
        //     if (err) {
        //         console.error(err.message);
        //         res.json(err);
        //         return;
        //     }
        //     //打印返回的表结构
        //     console.log(result.metaData);
        //     //打印返回的行数据
        //     console.log(result.rows);
        //     res.json(result);
        // });
        let a = connection.execute("SELECT * FROM MS_USER");
        a.then((result) => {
            console.log('success');
            console.log(result);
            res.json(result);
        },(err) => {
            console.log('error');
            console.error(err);
            res.json(err);
        })
    });
})

router.get('/add',(req, res) => {
    let user = req.query;
    console.log(user);
    oracledb.getConnection(config, (err, connection) => {
        if (err) {
            console.log(err);
            console.error(err.message);
            res.json(err.message);
            return;
        }
        connection.execute("INSERT INTO MS_USER(USER_NAME,USER_PWD) VALUES(:user_name,:user_pwd)", user, { autoCommit: true }, (err, result) => {
            doRelease(connection);
            if (err) {
                console.error(err.message);
                res.json(err);
                return;
            }
            console.log(result);
            //打印返回的表结构
            console.log(result.metaData);
            //打印返回的行数据
            console.log(result.rows);
            res.json(result);
        });
    });
})

router.get('/update',(req, res) => {
    let user = req.query;
    console.log(user);
    oracledb.getConnection(config, (err, connection) => {
        if (err) {
            console.log(err);
            console.error(err.message);
            res.json(err.message);
            return;
        }
        connection.execute("UPDATE MS_USER SET USER_NAME=:user_name,USER_PWD=:user_pwd where user_id=:user_id", user, { autoCommit: true }, (err, result) => {
            doRelease(connection);
            if (err) {
                console.error(err.message);
                res.json(err);
                return;
            }
            console.log(result);
            //打印返回的表结构
            console.log(result.metaData);
            //打印返回的行数据
            console.log(result.rows);
            res.json(result);
        });
    });
})

router.get('/delete/:user_id',(req, res) => {
    let user = req.params;
    console.log(user);
    oracledb.getConnection(config, (err, connection) => {
        if (err) {
            console.log(err);
            console.error(err.message);
            res.json(err.message);
            return;
        }
        connection.execute("DELETE FROM MS_USER where user_id=:user_id", user, { autoCommit: true }, (err, result) => {
            doRelease(connection);
            if (err) {
                console.error(err.message);
                res.json(err);
                return;
            }
            console.log(result);
            //打印返回的表结构
            console.log(result.metaData);
            //打印返回的行数据
            console.log(result.rows);
            res.json(result);
        });
    });
})

//事务
router.get('/transaction',(req, res) => {
    let user = req.query;
    console.log(user);
    // var sleep = function (time) {
    //     return new Promise(function (resolve, reject) {
    //         setTimeout(function () {
    //             resolve();
    //         }, time);
    //     })
    // };
    // async function () {
    //     // 在这里使用起来就像同步代码那样直观
    //     console.log('start');
    //     await sleep(3000);
    //     console.log('end');
    // }
    oracledb.getConnection(config, (err, connection) => {
        if (err) {
            console.log(err);
            console.error(err.message);
            res.json(err.message);
            return;
        }
        let a = connection.execute("INSERT INTO MS_USER(USER_NAME,USER_PWD) VALUES(:user_name,:user_pwd)", user);
        let b,c;
        a.then((result) => {
            console.log('insert success');
            console.log(result);
            b = connection.execute("select user_id_seq.currval from dual");
            b.then((result) => {
                console.log('getid success');
                console.log(result);
                c = connection.execute("update ms_user set user_name=:user_name where user_id=:user_id",{user_name:'xxxx',user_id:11});
                c.then((result) => {
                    console.log('update success');
                    console.log(result);
                    connection.commit();
                    doRelease(connection);
                    res.json(result);
                },(err) => {
                    console.log('getid error');
                    connection.rollback();
                    doRelease(connection);
                    res.json(err);
                })
            },(err) => {
                console.log('getid error');
                connection.rollback();
                doRelease(connection);
                res.json(err);
            })
        },(err) => {
            console.log('insert error');
            connection.rollback();
            doRelease(connection);
            res.json(err);
        })
    });
})

/**
 * 释放数据库连接
 * @param connection
 */
function doRelease(connection)
{
    connection.close(
        function(err) {
            if (err) {
                console.error(err.message);
            }
        });
}
module.exports = router;
