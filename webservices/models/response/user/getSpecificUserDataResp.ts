interface Data {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

interface Support {
    url: string,
    text: string
}

export interface GetSpecificUserDataResp {
    data: Data,
    support: Support
}
