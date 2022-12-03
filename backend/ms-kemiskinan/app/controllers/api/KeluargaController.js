import db from "../../models";
import paginate from '../../libraries/paginate';

export default class KeluargaController {

	static query(){
		return [
			{
				$lookup:{
					from: 'keluarga_penduduks',
					localField: '_id',
					foreignField: 'keluarga_id',
					pipeline: [
						{
							$lookup:{
								from: 'penduduks',
								localField: 'penduduk_id',
								foreignField: '_id',
								pipeline: [
									{
										$project: { 
											nik: '$nik',
											nama: '$nama',
											lahir: '$lahir',
											alamat: '$alamat',
											fisik: '$fisik',
											jk: '$jk',
										}
									}
								],
								as: 'data_penduduk'
							},
						}, 
						{ $unwind: "$data_penduduk" },
					],
					as: 'keluarga_penduduk',
				},
			},
		];
	}

	static async getData(req, res) {
		var condition = {};
		// let id = req.params.id;
		try{

			let query = KeluargaController.query();

			if(req.params.id){
				query.push({ $match: { _id: db.mongoose.Types.ObjectId(req.params.id) } });
				let data = await db.keluarga.aggregate(query);
				if(!data[0]) return res.send({statusCode: 200, message: 'data not found!'});
				return res.send({statusCode: 200, data: data[0]});
			}
			let result = await paginate.aggregate(req, 'keluarga', query);
			return res.send(result);
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: err.message || "Some error occurred while retrieving tutorials.",
			});
		}
	}

	static async getDataByKK(req, res){
		
		let query = KeluargaController.query();
		query.push({ $match: { no_kk: req.params.no_kk } });
		let data = await db.keluarga.aggregate(query);
		if(!data[0]) return res.send({statusCode: 200, message: 'data not found!'});
		return res.send({statusCode: 200, data: data[0]});
	}
	
	static async delete(req, res) {
		var id = (req.params.id);
		try{
			let data = await db.keluarga.aggregate([
				{ $match: { _id: db.mongoose.Types.ObjectId(id) } },
				{
					$lookup:{
						from: 'keluarga_penduduks',
						localField: '_id',
						foreignField: 'keluarga_id',
						as: 'keluarga_penduduk'
					},
				},
			]);
			
			if (!data) {
				return res.status(400).send({
					statusCode: 400,
					message: `Cannot delete data with id=${id}. Maybe data was not found!`,
				});
			} else {
				await db.keluarga.findByIdAndRemove(id);
				await data[0].keluarga_penduduk.forEach( async element =>  {
					await db.keluarga_penduduk.findByIdAndRemove(element._id);
				});
				return res.send({
					statusCode: 200,
					message: "data was deleted successfully!"
				});
			}
		}catch(err){
			return res.status(500).send({
				statusCode: 500,
				message: "Could not delete data with id=" + id,
			});
		}
	}

}