var express = require('express');
var router = express.Router();

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
module.exports = router;
