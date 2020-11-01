const SwalUtils = {
    install(Vue, options) {
        Vue.prototype.$error = function (err) {
            this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: err,
            })
        }
        Vue.prototype.$success = function (value) {
            return this.$swal.fire({
                position: 'center',
                icon: 'success',
                html: `<b>${value}</b> salvo com sucesso!`,
                showConfirmButton: false,
                timer: 1500,
            })
        }
        Vue.prototype.$delete = function (value) {
            return this.$swal.fire({
                position: 'center',
                icon: 'success',
                html: `<b>${value}</b> deletado com sucesso!`,
                showConfirmButton: false,
                timer: 1500,
            })
        }
    }
};

export default SwalUtils;