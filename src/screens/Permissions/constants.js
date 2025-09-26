export const data = (profile) => {
    return [
        {
            title: "Nome",
            type: "text",
            value: profile.nome,
            placeholder: "Nome",
        },
        {
            title: "Profissão",
            type: "text",
            value: profile.profissao,
            placeholder: "Profissão",
        },
        {
            title: "Conselho de Classe",
            type: "text",
            value: profile.conselho,
            placeholder: "Conselho de Classe",
        },
        {
            title: "Número do Registro",
            type: "text",
            value: profile.numeroConselho,
            placeholder: "Número do Registro",
        },
        {
            title: "País",
            type: "text",
            value: profile.pais,
            placeholder: "País",
        },
        {
            title: "UF do Conselho",
            type: "text",
            value: profile.uf,
            placeholder: "UF do Conselho",
        },
        {
            title: "Instituição",
            type: "text",
            value: profile.contratante,
            placeholder: "Instituição",
        },
        {
            title: "E-mail",
            type: "text",
            value: profile.email,
            placeholder: "E-mail",
        },
    ];
};

export const permissions = [
    {
        id: "17c61c25-f0a4-4f9f-90b2-6baef2f2a049",
        nome: "Mente",
        tipoPermissao: 1,
        visualizar: true,
        editar: false,
        vinculo: "40c6eaad-8815-4cbc-9caf-78f081f03674",
    },
    {
        id: "4395a10d-b8b8-4163-94d6-181c108089f5",
        nome: "Estilo de vida",
        tipoPermissao: 1,
        visualizar: true,
        editar: false,
        vinculo: "7ed63315-ff7b-4658-b488-7655487e2845",
    },
    {
        id: "0556db85-b01b-4da3-868b-50547923387a",
        nome: "Corpo",
        tipoPermissao: 1,
        visualizar: true,
        editar: false,
        vinculo: "20118275-8791-469e-b9f5-3210f990dd01",
    },
    {
        id: "8ca71a98-872d-4253-9823-1e5b050850e7",
        nome: "Bordo",
        tipoPermissao: 2,
        visualizar: false,
        editar: false,
        vinculo: "60481315-1019-4fa0-ab10-6d6d4fcdc2d9",
    },
    {
        id: "10fc5769-2d68-448a-ba18-1d614e31e41f",
        nome: "Emocional",
        tipoPermissao: 2,
        visualizar: false,
        editar: false,
        vinculo: "a8772285-cc12-47c0-b947-eeac0a790b7a",
    },
    {
        id: "16e35be8-0219-4823-b5a8-b75c502ab0dc",
        nome: "Movimento",
        tipoPermissao: 2,
        visualizar: false,
        editar: false,
        vinculo: "ee8cf8bb-36ff-4838-883b-75179867d095",
    },
    {
        id: "cf244634-4bc3-45e1-92c5-3feee7eb6945",
        nome: "Sintomas",
        tipoPermissao: 2,
        visualizar: false,
        editar: false,
        vinculo: "a0a1d9b5-2268-4aed-9040-44fb3d88975e",
    },
];
