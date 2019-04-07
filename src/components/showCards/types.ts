export interface ShowCard {
  id: number,
  name: string,
  image: string,
  rating: number,
  seasons: number
};

export interface ShowCardState {
    content: ShowCard[],
    empty?: boolean,
    first?: boolean,
    last?: boolean,
    number?: number,
    numberOfElements?: number,
    size?: number,
    totalElements?: number,
    totalPages?: number,
    loading: boolean
  };