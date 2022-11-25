const MS_AUTH = 'http://127.0.0.1:3001/';
const MS_ORGANISASI = 'http://127.0.0.1:3002/';
const MS_KEMISKINAN = 'http://127.0.0.1:3003/';

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
		path: '/kemiskinan',
		auth: true,
		author: false,
		proxy: {
			target: MS_KEMISKINAN+'api/',
			changeOrigin: true,
			pathRewrite: {
				[`^/kemiskinan`]: '',
			},
		}
	},
]

module.exports = ROUTES