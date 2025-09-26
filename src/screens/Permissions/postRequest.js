const postRequest = (pm_list) => {
    console.log(pm_list);
    const body = {
        idPermission: null,
        status: "A",
        permissions: [
            {
                id: "17c61c25-f0a4-4f9f-90b2-6baef2f2a049",
                visualizar: pm_list[0].visualize,
                editar: pm_list[0].register,
            },
            {
                id: "4395a10d-b8b8-4163-94d6-181c108089f5",
                visualizar: pm_list[1].visualize,
                editar: pm_list[1].register,
            },
            {
                id: "0556db85-b01b-4da3-868b-50547923387a",
                visualizar: pm_list[2].visualize,
                editar: pm_list[2].register,
            },
            {
                id: "8ca71a98-872d-4253-9823-1e5b050850e7",
                visualizar: pm_list[3].visualize,
                editar: pm_list[3].register,
            },
            {
                id: "10fc5769-2d68-448a-ba18-1d614e31e41f",
                visualizar: pm_list[4].visualize,
                editar: pm_list[4].register,
            },
            {
                id: "16e35be8-0219-4823-b5a8-b75c502ab0dc",
                visualizar: pm_list[5].visualize,
                editar: pm_list[5].register,
            },
            {
                id: "cf244634-4bc3-45e1-92c5-3feee7eb6945",
                visualizar: pm_list[6].visualize,
                editar: pm_list[6].register,
            },
        ],
    };

    return body;
};

export default postRequest;
