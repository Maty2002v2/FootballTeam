export type UserApiResponse = {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
};

type SupportApiResponse = {
    url: string,
    text: string
};

export type ListUsersApiResponse = { 
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: UserApiResponse[],
    support: SupportApiResponse
};

export type SingleUserApiResponse = {
    data: UserApiResponse[],
    support: SupportApiResponse
};

export type User = UserApiResponse;

export type UsersData = ListUsersApiResponse;

export type Pagination = {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    startPage: number;
    endPage: number;
    startIndex: number;
    endIndex: number;
    pages: number[];
    currentPackageIndex: number
  };
  
  export type PaginationConfig = {
      totalItems: number,
      currentPage?: number,
      pageSize?: number,
      maxPages?: number
  };
  