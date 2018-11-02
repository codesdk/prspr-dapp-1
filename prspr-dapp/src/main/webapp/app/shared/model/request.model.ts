export interface IRequest {
    id?: number;
    title?: string;
    description?: string;
}

export class Request implements IRequest {
    constructor(public id?: number, public title?: string, public description?: string) {}
}
