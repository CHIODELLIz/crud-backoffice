module.exports = {
    model: {
        id: null,
        username: null,
        email: null,
        password: null,
        confirmPassword: null,
    },
    schema: {
        fields: [
            {
                type: 'input',
                inputType: 'text',
                label: 'Apelido',
                model: 'username',
                placeholder: 'Informe o apelido',
                required: true,
                validator: ['required'],
            },
            {
                type: 'input',
                inputType: 'email',
                label: 'E-mail',
                model: 'email',
                placeholder: 'Informe o e-mail',
                required: true,
                validator: ['required'],
            },
            {
                type: 'input',
                inputType: 'password',
                label: 'Senha',
                model: 'password',
                placeholder: 'Informe uma senha segura',
            },
            {
                type: 'input',
                inputType: 'password',
                label: 'Confirmar Senha',
                model: 'confirmPassword',
                placeholder: 'Repita a senha',
            },
        ],
    },
    viewDataTypes: [
        { key: 'username', label: 'Apelido' },
        { key: 'email', label: 'E-mail' },
        {
            key: 'created_at',
            label: 'Criado em',
            dateMask: true,
        },
    ],
    columns: [
        { key: 'username', label: 'Apelido', filter: true },
        { key: 'email', label: 'e-mail', filter: true },
        {
            key: 'created_at',
            label: 'Criado em',
            dateMask: true
        },
    ],
}