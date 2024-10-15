export const bookFilterableFields = [
  'searchTerm',
  'title',
  'author',
  'genre',
  'price',
  'categoryId',
  'publicationDate',
];

export const bookSearchableFields = ['title', 'author', 'genre'];

export const bookRelationalFields = ['categoryId'];

export const bookRelationalFieldsMapper: {
  [key: string]: string;
} = {
  categoryId: 'category',
};
