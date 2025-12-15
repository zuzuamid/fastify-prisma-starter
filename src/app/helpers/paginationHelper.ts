type IOptions = {
    page?: number,
    limit?: number,
    sortOrder?: string,
    sortBy?: string
}

type IOptionsResult = {
    page: number,
    limit: number,
    skip: number,
    sortBy: string,
    sortOrder: string
}

const calculatePagination = (options: IOptions): IOptionsResult => {

    const page: number = Number(options.page) || 1;
    const limit: number = Number(options.limit) || 10;
    const skip: number = (Number(page) - 1) * limit;

    const sortBy: string = options.sortBy || 'createdAt';
    const sortOrder: string = options.sortOrder || 'desc';

    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    }
}


export const paginationHelper = {
    calculatePagination
}

// Commit 20

// Commit 24

// Commit 121

// Commit 133

// Commit 142
