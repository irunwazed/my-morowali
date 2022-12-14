const db = require('../models');

module.exports = {
  find: async (req, table, condition) => {
		var result = {}
		try{
			req.query = req.query?req.query:{};
			let start = req.query.start?parseInt(req.query.start):0;
			let length = req.query.length?parseInt(req.query.length):10;
			let search = req.query.search?req.query.search:{ value: '', regex: false };
			let data = [];
			let jumData = 0;
			let draw = req.query.draw?req.query.draw:0;
			let limit = 5000;
	
			data = await db[table].find(condition)
				.sort({ updatedAt: 'desc' })
				.skip(start)
				.limit(length);
			let tmp = await db[table].find(condition).limit(limit);
			// let tmp = await db[table].find(condition);
			jumData = tmp.length;
	
			result = {
				statusCode: 200,
				draw: draw,
				recordsTotal: jumData,
				recordsFiltered: jumData,
				data: data,
				start: start,
				length: length,
				search: search,
			};
		}catch(err){
			result = {
				statusCode: 500,
				data: [],
				message: err
			}
		}
    
		return result;
  },
	aggregate: async (req, table, condition = []) => {
		var result = {}
		try{
			req.query = req.query?req.query:{};
			let start = req.query.start?parseInt(req.query.start):0;
			let length = req.query.length?parseInt(req.query.length):10;
			let search = req.query.search?req.query.search:{ value: '', regex: false };
			let data = [];
			let jumData = 0;
			let draw = req.query.draw;
			let limit = 5000;

			console.log('data');
	
			data = await db[table].aggregate(condition)
				.sort({ updatedAt: 'desc' })
				.skip(start)
				.limit(length);

			let tmp = await db[table].aggregate(condition).limit(limit);
			// let tmp = await db[table].aggregate(condition);
			jumData = tmp.length;
	
			result = {
				statusCode: 200,
				draw: draw,
				recordsTotal: jumData,
				recordsFiltered: jumData,
				data: data,
				start: start,
				length: length,
				search: search,
			};
		}catch(err){
			result = {
				statusCode: 500,
				data: [],
				message: err
			}
			console.log(result);
		}
		
		return result;
	}
}