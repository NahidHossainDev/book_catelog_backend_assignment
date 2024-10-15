type ISingleOrder = {
  bookId: string;
  quantity: number;
};
export type IOrderPayload = {
  orderedBooks: ISingleOrder[];
};
