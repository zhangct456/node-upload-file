const express = require('express');

const router = express.Router();

const app = express();

const formidable = require('formidable');

const fs = require('fs');

router.get('/', (req, res) => {
	//测试连通性
	res.send("node server");
})

router.post('/upload', (req, res) => {
	var form = new formidable.IncomingForm();
    // 设置文件保存路径，相对路径
    form.uploadDir = "./uploads";
    
	form.parse(req, function(err, fields, files) {
		if(err){
			res.send({
				"status" : "200",
	        	"message" : "上传失败"
			});
			return;
		}
        var fileName = files.file.name;		//上传文件名
        var fileNameArr = fileName.split('.');
        if(fileNameArr != 1){
        	//files.file.path：文件保存后的路径，无后缀名
        	//补上文件后缀
        	var newfile = files.file.path + '.' + fileNameArr[fileNameArr.length - 1];
        	fs.rename(files.file.path, newfile, function(err){
	        	if(err){
	        		res.send({
	        			"status" : "200",
	        			"message" : "上传失败"
	        		});
	        	}else{
	        		res.send({
						"status" : "200",
						"message" : "上传成功"
					});
	        	}
	        })
        }else{
        	res.send({
				"status" : "200",
				"message" : "上传成功"
			});
        }
    });
});
app.use(router);

app.listen(8099);

console.log("http start at port 8099");