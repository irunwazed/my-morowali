const MS_AUTH = `http://${process.env.APP_HOST}:3001/`;
const MS_ORGANISASI = `http://${process.env.APP_HOST}:3002/`;
const MS_KEMISKINAN = `http://${process.env.APP_HOST}:3003/`;

const ROUTES = [
	{
		path: '/auth',
		auth: false,
		author: false,
		proxy: {
			target: MS_AUTH+'api',
			changeOrigin: true,
			pathRewrite: {
				[`^/auth`]: '',
			}
		}
	},
	{
		path: '/organisasi',
		auth: true,
		author: false,
		proxy: {
			target: MS_ORGANISASI+'api/',
			changeOrigin: true,
			pathRewrite: {
				[`^/organisasi`]: '',
			},
		}
	},
	{
		path: '/kemiskinan-public/storages',
		auth: false,
		author: false,
		proxy: {
			target: MS_KEMISKINAN+'storages/public/',
			changeOrigin: true,
			pathRewrite: {
				[`^/kemiskinan-public/storages`]: '',
			},
		}
	},
	{
		path: '/kemiskinan-user',
		auth: true,
		author: false,
		proxy: {
			target: MS_KEMISKINAN+'api/',
			changeOrigin: true,
			pathRewrite: {
				[`^/kemiskinan-user`]: '',
			},
		}
	},
	{
		path: '/kemiskinan',
		auth: true,
		author: false,
		proxy: {
			target: MS_KEMISKINAN+'admin/api/',
			changeOrigin: true,
			pathRewrite: {
				[`^/kemiskinan`]: '',
			},
		}
	},
]

module.exports = ROUTES