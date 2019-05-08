module.exports = {
	runtimeCompiler: true,
	baseUrl: undefined,
	outputDir: undefined,
	assetsDir: undefined,
	productionSourceMap: undefined,
	parallel: undefined,
	css: {
		loaderOptions: {
			stylus: {
				use: [require('nib')()],
				import: [
					'~nib/lib/nib/index.styl'
				]
			}
		}
	}
}