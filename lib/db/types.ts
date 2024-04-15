export interface APIReponsePagination {
  cursor: number;
  nextCursor: number;
  totalPages: number;
  totalItems: number;
}

export interface APIReponseLinks {
  prev: string | null;
  next: string | null;
  first: string;
  last: string;
}

export interface APIReponseMeta {
  pagination: APIReponsePagination;
  links: APIReponseLinks;
}

export interface APIReponse<T> {
  data: T[] | T;
  meta: APIReponseMeta;
}
