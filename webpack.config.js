module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
    },
    watch: true,
    devServer: {
        contentBase: './src',
        compress: true,
        port: 7070,
    }
}