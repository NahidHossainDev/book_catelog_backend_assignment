export const orderFilterableFields = ['searchTerm', 'bookId', 'userId'];

export const orderSearchableFields = ['bookId', 'userId'];

export const orderRelationalFields = ['bookId', 'userId'];

export const orderRelationalFieldsMapper: {
  [key: string]: string;
} = {
  bookId: 'book',
  userId: 'user',
};
