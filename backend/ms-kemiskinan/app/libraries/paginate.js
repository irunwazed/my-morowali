const db = require('../models');

module.exports = {
  find: async (req, table, condition) => {
		var result = {}
		try{
			let start = req.query.start?req.query.start:0;
			let length = req.query.length?req.query.length:10;
			let search = req.query.search?req.query.search:{ value: '', regex: false };
			let data = [];
			let jumData = 0;
			let draw = req.query.draw;
			let limit = 1000;
	
			data = await db[table].find(condition)
				.sort({ updatedAt: 'desc' })
				.skip(start)
				.limit(length);
			let tmp = await db[table].find({}).limit(limit);
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
				message: err
			}
		}
    
		return result;
  },
	aggregate: async (req, table, condition = []) => {
		var result = {}
		try{
			let start = req.query.start?req.query.start:0;
			let length = req.query.length?req.query.length:10;
			let search = req.query.search?req.query.search:{ value: '', regex: false };
			let data = [];
			let jumData = 0;
			let draw = req.query.draw;
			let limit = 1000;
	
			// condition.push({ "$sort": { updatedAt: 'desc' }, });
			// condition.push({ "$skip": start, });
			// condition.push({ "$limit": length, });
	
			data = await db[table].aggregate(condition)
				.sort({ updatedAt: 'desc' })
				.skip(start)
				.limit(length);
			let tmp = await db[table].find({}).limit(limit);
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
				message: err
			}
		}
		
		return result;
	}
}