deleteOlderFileIfExist = function (dirname) {
    var fs = require('fs');
    var path = require("path");
    fs.readdir(dirname, function (err, files) {
        files.forEach(function (file, index) {
            fs.stat(path.join(dirname, file), function (err, stat) {
                var endTime, now;
                if (err) {
                    return console.error(err);
                }
                now = new Date().getTime();
                endTime = new Date(stat.ctime).getTime() + 3600000;             
                if (now > endTime) {
                    fs.unlink(path.join(dirname, file), function (err) {
                        if (err) {
                            return console.error(err);
                        }
                        console.log(dirname + ' successfully deleted');
                    });
                   
                }
            });
        });
    });
}

