var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

/* POST and response. */
router.post('/', function (req, res, next) {
  let filename = path.join(__dirname, "..", "views", "thanks.html");
  console.log("Opening template: " + filename);
  let template = fs.readFileSync(filename, "utf8");
  var data = "";
  for (var key in req.body) {
    data += "<tr class='hasborder'><th class='hasborder'>" + key + "：</th><td class='hasborder'>";
    switch (typeof (req.body[key])) {
      case "string":
      case "number":
      case "boolean":
        data += "" + req.body[key] + "</td>";
        break;
      default:
        data += "" + JSON.stringify(req.body[key]) + "</td>";
        break;
    }
    data += "</tr>";
  }
  for (var key in req.files) {
    data += "<tr class='hasborder'><th class='hasborder'>" + key + 
      "：</th><td class='hasborder'>" + req.files[key].name +
      "<br />" + req.files[key].size + " bytes, mimetype='" + req.files[key].mimetype + 
      "', tempFilePath='" + req.files[key].tempFilePath + "'</td></tr>";
  }
  let ret = template.replace('<MyTableRowsHere>', data);
  // data = { "tableRows": JSON.stringify(req.body) + JSON.stringify(req.files) };
  res.send(ret);
});

module.exports = router;
