export default interface Pagination<T> {

    readonly items: T[];

    readonly page: number;
    readonly perPage: number;
    readonly totalItems: number;
    readonly totalPages: number;

}