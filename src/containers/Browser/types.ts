import { ShowCard } from "../../components/showCards/types";

export interface BrowserCard {
  genre: string,
  showCard: ShowCard
}

export interface BrowserState {
  cards: BrowserCard[],
  loading: boolean
}