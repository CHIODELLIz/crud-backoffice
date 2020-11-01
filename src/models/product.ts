module.exports = {
    model: { id: null, name: null, description: null, price: null, stores: [] },
    schema: {
        fields: [
            {
                type: 'input',
                inputType: 'text',
                label: 'Nome',
                model: 'name',
                placeholder: 'Informe o nome do produto',
                required: true,
                validator: ['required'],
            },
            {
                type: 'textArea',
                label: 'Descrição',
                placeholder: 'Informe a descrição do produto',
                model: 'description',
                required: true,
                validator: ['required'],
            },
            {
                type: 'money',
                label: 'Preço',
                model: 'price',
                placeholder: 'Informe preço do produto',
                required: true,
                validator: ['required'],
            },
            {
                type: 'vueMultiSelect',
                label: 'Lojas',
                model: 'stores',
                multiSelect: true,
                placeholder: 'Selecione as lojas que possuem este produto',
                selectOptions: {
                    multiple: true,
                    trackBy: 'id',
                    label: 'name',
                    searchable: true,
                    taggable: true,
                    closeOnSelect: true,
                    hideSelected: true,
                },
                values: [],
            },
        ],
    },
    columns: [
        { key: 'name', label: 'Nome', filter: true },
        { key: 'price', label: 'Preço', filter: true, currencyMask: true },
        { key: 'created_at', label: 'Criado em', filter: true, dateMask: true },
    ],
    viewDataTypes: [
        { key: 'name', label: 'Nome' },
        { key: 'description', label: 'Descrição' },
        { key: 'price', label: 'Preço', currencyMask: true },
        { key: 'created_at', label: 'Criado em', dateMask: true },
        { key: 'stores', label: 'Lojas', array: true, keys: [{ key: 'name', label: 'Nome' }, { key: 'description', label: 'Descrição' }] }
    ],
}