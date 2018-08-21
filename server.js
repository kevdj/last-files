let express = require('express'); 
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg  = require('pg');
let cors = require('cors');
const PORT = 3000;
var schedule = require('node-schedule');
const delay = require('delay');

const http = require('http');
//const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const accountSid = 'ACd2993e1fb8d8e337efd76bb2f40816ac';
const authToken = 'ea6a40e5c9a54f7faa4ce2faf34af47d';
const client = require('twilio')(accountSid, authToken);	

//const app = express();




// process.on('unhandledRejection', (reason, p) => {
//   console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
//   // application specific logging, throwing an error, or other logic here
// });

let pool = new pg.Pool({
	port:5432,
	password:'kevjeff1',
	database: 'postgres',
	max:10,
	host:'localhost',
	user:'postgres'
});


// var SerialPort = require('serialport')
// var Readline = SerialPort.parsers.Readline

// var serialPort = new SerialPort('/COM3', {
//   baudRate: 9600
// })

// var tdata ="";
// var trans_name;//= req.body.trans_name;
// var price ;//= //req.body.trans_price;
// var shopid ;// = //req.body.trans_shop;
// var shop_name;// =
// var parser = new Readline()
// serialPort.pipe(parser)

// parser.on('data', function (data) {
//   console.log('data received: ' + data)
//  // for(var i = 0; i < data.lengh; i++)
//   tdata = data.toString();

//   console.log('tdata received: ' + tdata)

//   var tdata1 = tdata.split(",");

//   trans_name = tdata1[0];//= req.body.trans_name;
// 		price = tdata1[1] ;//= //req.body.trans_price;
// 		shopid = tdata1[2];// = //req.body.trans_shop;
// 		shop_name = tdata1[3];// =
// 		console.log(trans_name, price, shopid, shop_name );

// 		newtransaction(trans_name, price, shopid, shop_name);

// 		var edata = "1";
// 		//sendResponse(edata);

 		
// })
		

	function sendResponse(data){
    // The message received as a String
    

    // Sending String character by character
    for(var i=0; i<data.length; i++){
       		serialPort.write(new Buffer(data[i], 'ascii'), function(err, results) {
            // console.log('Error: ' + err);
             console.log('Results ' + results);
        });
    }

}
//serialPort.write(Buffer([0x01]));

// var sdata = "1"

// serialPort.write("1", function(err) {
//   if (err) {
//     return console.log('Error on write: ', err.message);
//   }
//   console.log('message written');
// });

 		

// serialPort.on('open', function () {
//   console.log('Communication is on!')
// })




// pool.connect((err, db, done)=> {
// 	if (err){
// 		return console.log(err);
// 	}
// 	else{
// 		db.query('SELECT * from transactions',(err, table) => {
// 			done();
// 			if (err){
// 				return console.log(err);
// 			}else{
// 				console.log(table.rows);
// 			}
// 		})
		
// 	}
// });
let app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(morgan('dev'));


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//send text messages

// client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+353861803436',
//      to: '+353838032159'
//    })
//   .then(message => console.log(message.sid))
//   .done();

// receive text messages
app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

// return shops
app.get('/api/shop', function(req,res){

	pool.connect((err, db, done)=> {
	if (err){
		return res.status(400).send(err);
	}
	else{
		db.query('SELECT * from shops where categoryid = 5 ',(err, table) => {
			done();
			if (err){
				return console.log(err);
			}else{
				console.log('VALUES displayed');
				db.end();
				return res.status(201).send(table.rows);
			}
		})
		
	}
});

})

// return all the transactions
app.get('/api/transactions', function(req,res){

	pool.connect((err, db, done)=> {
	if (err){
		return res.status(400).send(err);
	}
	else{
		db.query('SELECT * from transactions ',(err, table) => {
			done();
			if (err){
				return console.log(err);
			}else{
				console.log('VALUES displayed');
				db.end();
				return res.status(201).send(table.rows);
			}
		})
		
	}
});

})

//return specific transactions
app.get('/api/transactionsC/:id', function(req,res){
	var id = req.params.id;
	console.log(id, "heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeere")
	let value = [id];
	pool.connect((err, db, done)=> {
	if (err){
		return res.status(400).send(err);
	}
	else{
db.query('SELECT * from transactions join shops\
 on transactions.shopid = shops.shopid join categories on shops.categoryid = categories.categoryid where categories.categoryid = $1', 
 [...value], (err, table) => {
			done();
			if (err){
				return console.log(err);
				db.end();
			}else{
				console.log('VALUES displayed');
				db.end();
				return res.status(201).send(table.rows);
			}
		})
		
	}
});

})

// return specific category

app.get('/api/categoriesC/:id', function(req,res){
	var id = req.params.id;
	console.log(id)
	let value = [id];
	pool.connect((err, db, done)=> {
	if (err){
		return res.status(400).send(err);
	}
	else{
		db.query('SELECT * from categories where categories.categoryid = $1', [...value], (err, table) => {
			done();
			if (err){
				return console.log(err);
				db.end();
			}else{
				console.log('VALUES displayed');
				db.end();
				return res.status(201).send(table.rows);
			}
		})
		
	}
});

})

// return limit on category

app.get('/api/limits/:id', function(req,res){
	var id = req.params.id;
	console.log(id)
	let value = [id];
	pool.connect((err, db, done)=> {
	if (err){
		return res.status(400).send(err);
	}
	else{
		db.query('SELECT * from limits where limits.categoryid = $1', [...value], (err, table) => {
			done();
			if (err){
				return console.log(err);
				db.end();
			}else{
				console.log('VALUES displayed');
				db.end();
				return res.status(201).send(table.rows);
			}
		})
		
	}
});

})
//  entering limit
app.post('/api/new-limit/:id', function(req,res){
	var id = req.params.id;
	var amount = req.body.amount;
	var duration = req.body.duration;
	var alert= req.body.alert;
	console.log(id)
	let values = [id];
	let values2 = [duration,id,amount, alert]
	pool.connect((err, db, done)=> {
	if (err){
		return res.status(400).send(err);
	}
	else{
		db.query('INSERT INTO limits(limit_days, categoryid, limit_amt, alert)VALUES ($1, $2, $3, $4);', [...values2], (err, table) => {
			done();
			if (err){
				return console.log(err);
				db.end();
			}else{
				console.log('VALUES inserted');
				db.end();
				return res.status(201).send(table.rows);
			}
		})
		
	}
});

})

// return all the categories
app.get('/api/categories', function(req,res){

	pool.connect((err, db, done)=> {
	if (err){
		return res.status(400).send(err);
	}
	else{
		db.query('SELECT * from categories',(err, table) => {
			done();
			if (err){
				return console.log(err);
			}else{
				console.log('VALUES displayed');
				db.end();
				return res.status(201).send(table.rows);
			}
		})
		
	}
});

})

//delete category

app.delete('/api/delete/:id', function(req, res){

	var id = req.params.id;
	let values = [id];

	pool.connect((err, db, done)=> {
	if (err){
		return res.status(400).send(err);
	}
	else{
		db.query('DELETE from categories where categories.categoryid = $1', [...values], (err, table) => {
			done();
			if (err){
				return console.log(err);
				db.end();
			}else{
				console.log('VALUES deleted');
				db.end();
				return res.status(201).send(table.rows);
			}
		})
		
	}
});


})


/* the following is used to set our daily, weekly, monthly , annual limits  ( to be reviewed )*/

var daily = schedule.scheduleJob('59 59 23 * * *', function(){
	pool.connect((err, db, done)=> {
	if (err){
		console.log('available_funds not reset');
		//return res.status(400).send(err);
	}
	else{
  	db.query('update categories set available_funds = limits.limit_amt from limits where limits.categoryid = categories.categoryid and limit_days = 1',(err, table) => {
			done();
			if (err){
				return console.log(err);
			}else{
				console.log('available_funds reset');
				db.end();
				//return res.status(201).send(table.rows);
			}
		})
  }
});

});

var weekly = schedule.scheduleJob('59 59 23 * * 7', function(){
	pool.connect((err, db, done)=> {
	if (err){
		console.log('available_funds not reset');
		//return res.status(400).send(err);
	}
	else{
  	db.query('update categories set available_funds = limits.limit_amt from limits where limits.categoryid = categories.categoryid and limit_days = 7',(err, table) => {
			done();
			if (err){
				return console.log(err);
			}else{
				console.log('available_funds reset');
				db.end();
				//return res.status(201).send(table.rows);
			}
		})
  }
});

});

var monthly = schedule.scheduleJob('59 59 23 31 * *', function(){
	pool.connect((err, db, done)=> {
	if (err){
		console.log('available_funds not reset');
		//return res.status(400).send(err);
	}
	else{
  	db.query('update categories set available_funds = limits.limit_amt from limits where limits.categoryid = categories.categoryid and limit_days = 31',(err, table) => {
			done();
			if (err){
				return console.log(err);
			}else{
				console.log('available_funds reset');
				db.end();
				//return res.status(201).send(table.rows);
			}
		})
  }
});

});

var yearly = schedule.scheduleJob('59 59 23 31 12 *', function(){
	pool.connect((err, db, done)=> {
	if (err){
		console.log('available_funds not reset');
		//return res.status(400).send(err);
	}
	else{
  	db.query('update categories set available_funds = limits.limit_amt from limits where limits.categoryid = categories.categoryid and limit_days = 366',(err, table) => {
			done();
			if (err){
				return console.log(err);
			}else{
				console.log('available_funds reset');
				db.end();
				//return res.status(201).send(table.rows);
			}
		})
  }
});

});

/* the above is used to set our daily, weekly, monthly , annual limits */


app.post('/api/category', function(req, res){
	console.log(req.body);
	var category_name = req.body.category_name;
	var available_funds = 5;
	let shopsid2 = req.body.shopsid;
	let values = [category_name, available_funds];

pool.connect((err, db, done)=> {
	if (err){
		return res.status(400).send(err);
		
	}
	else{	
		db.query('insert into categories(category_name, available_funds) values($1, $2)',[...values],(err, table) => {
			done();
				if (err){
				
					return console.log(err);
					}
						else{
							var i;
					
					
						for(i = 0; i < shopsid2.length ; i++){
				
							let values3 = [category_name,shopsid2[i]];

							console.log('here are the values' + values3);
							
			db.query('update shops set categoryid = categories.categoryid from categories where categories.category_name = $1 and shopid =$2 ',
				[...values3],(err, table) => {
							done();
							if (err){
								return console.log(err);
									}else{
										console.log('VALUES inserted');
										db.end();
										return res.status(201).send(table.rows);
											}
								})

								delay(1000);

								delay(1000)
    								.then(() => {
       										console.log('VALUES INSERTED');
    								});
								
							
						}
					}
					
							
			})
			
			}
});



});
 

// api request for transaction
app.post('/api/new-transaction', function(req, res){
	console.log(req.body);
	var trans_name = req.body.trans_name;
	var price = req.body.trans_price;
	var shopid = req.body.trans_shop;
	var shop_name = req.body.shop_name;
	var categoryid = 5;
	let values = [trans_name, price, shopid];
	let values2 = [shopid, shop_name, categoryid];

pool.connect((err, db, done)=> {
	if (err){
		return res.status(400).send(err);
		
	}
	else{	
		db.query('insert into transactions(trans_name, price, shopid) values($1, $2, $3)',[...values],(err, table) => {
			done();
			if (err){
				if(err.code === '23503'){
					db.query('insert into shops(shopid, shop_name, categoryid) values($1, $2, $3)',[...values2],(err, table) => {
						done();
						if (err){
				
							return console.log(err);
							}
							else{

								console.log('VALUES INSERTED');
								db.query('insert into transactions(trans_name, price, shopid) values($1, $2, $3)',[...values],(err, table) => {
									done();
									if (err){
									client.messages
  									.create({
    										 body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    										 from: '+353861803436',
    										 to: '+353838032159'
 											  })
 									 .then(message => console.log(message.sid))
 									 .done();
									return console.log(err);
									}else{
										console.log('VALUES INSERTED');
										db.end();
										res.status(201).send({message:'transactions Inserted'});
										//res.status(201).send({message:'Shop Inserted'});
									}
								})
							}
						})
					

					return console.log('err');

				}
				return console.log(err);
			}else{
				console.log('VALUES INSERTED');	
				db.end();
				res.status(201).send({message:'transactions Inserted'});
			}
		})
		
	}
});

});


// transaction from arduino


function newtransaction(trans, tprice, shop, sname){
	//console.log(req.body);
	var trans_name = trans; //= req.body.trans_name;
	var price = tprice ;//= //req.body.trans_price;
	var shopid = shop;// = //req.body.trans_shop;
	var shop_name = sname;// = //req.body.shop_name;
	var categoryid = 5;
	let values = [trans_name, price, shopid];
	let values2 = [shopid, shop_name, categoryid];
	var repp = "1";
	var decc = "0";

pool.connect((err, db, done)=> {
	if (err){
		console.log(err);
		//return res.status(400).send(err);
		
	}
	else{	
		db.query('insert into transactions(trans_name, price, shopid, date) values($1, $2, $3, current_timestamp)',[...values],(err, table) => {
			done();
			if (err){
				if(err.code === '23503'){
					db.query('insert into shops(shopid, shop_name, categoryid, date) values($1, $2, $3)',[...values2],(err, table) => {
						done();
						if (err){
								sendResponse(decc);
							return console.log(err.code);
							}
							else{
								sendResponse(repp);
								console.log('VALUES INSERTEDDDD'+ repp);
								db.query('insert into transactions(trans_name, price, shopid) values($1, $2, $3, current_timestamp)',[...values],(err, table) => {
									done();
									if (err){
									sendResponse(decc);
									return console.log(err.code);
									}else{
										sendResponse(repp);
										console.log('VALUES INSERTED22222');
										db.end();
										console.log('transactions Inserted');
										//res.status(201).send({message:'transactions Inserted'});
										//res.status(201).send({message:'Shop Inserted'});
									}
								})
							}
						})
					
					sendResponse(decc);
					return console.log('err');

				}
				sendResponse(decc);
				return console.log(err.code);
			}else{
				sendResponse(repp);
				console.log('VALUES INSERTED3333');	
				db.end();
				console.log('transactions Inserted');
				//res.status(201).send({message:'transactions Inserted'});
			}
		})
		
	}
});

}


app.listen(PORT,() => console.log('listening on port' + PORT));