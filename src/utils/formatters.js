const Formatters = {
    install(Vue) {
        Vue.prototype.$dateFormat = function (value) {
            return this.$moment(value).format('DD/MM/YYYY HH:mm:ss')
        }
        Vue.prototype.$currencyFormat = function (value) {
            return `R$ ${parseFloat(value.toString())
                .toFixed(2)
                .replace('.', ',')}`
        }
    }
};

export default Formatters;