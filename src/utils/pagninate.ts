import {
  IPaginationMeta,
  IPaginationOptions,
  Pagination,
  PaginationTypeEnum,
  createPaginationObject,
  paginate,
} from 'nestjs-typeorm-paginate';
import {
  FindManyOptions,
  FindOptionsWhere,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

export async function customPaginate<T, CustomMetaType = IPaginationMeta>(
  repositoryOrQueryBuilder: Repository<T> | SelectQueryBuilder<T>,
  options: IPaginationOptions<CustomMetaType>,
  searchOptions?: FindOptionsWhere<T> | FindManyOptions<T>,
): Promise<Pagination<T, CustomMetaType>> {
  options.countQueries = false;
  options.paginationType = PaginationTypeEnum.TAKE_AND_SKIP;

  const promises: [Promise<Pagination<T, CustomMetaType>>, Promise<number>] =
    repositoryOrQueryBuilder instanceof Repository
      ? paginateRepository(repositoryOrQueryBuilder, options, searchOptions)
      : paginateQueryBuilder(repositoryOrQueryBuilder, options);

  const [result, total] = await Promise.all(promises);
  return createPaginationObject({
    items: result.items,
    currentPage: Number(options.page),
    limit: Number(options.limit),
    totalItems: total,
  });
}

function paginateRepository<T, CustomMetaType = IPaginationMeta>(
  repository: Repository<T>,
  options: IPaginationOptions<CustomMetaType>,
  searchOptions?: FindOptionsWhere<T> | FindManyOptions<T>,
): [Promise<Pagination<T, CustomMetaType>>, Promise<number>] {
  return [
    paginate(repository, options, searchOptions),
    repository.count(Object.assign({}, searchOptions)),
  ];
}

function paginateQueryBuilder<T, CustomMetaType = IPaginationMeta>(
  queryBuilder: SelectQueryBuilder<T>,
  options: IPaginationOptions<CustomMetaType>,
): [Promise<Pagination<T, CustomMetaType>>, Promise<number>] {
  return [paginate(queryBuilder, options), queryBuilder.getCount()];
}
