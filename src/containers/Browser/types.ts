import { ShowCard } from "../../components/showCards/types";

export interface BrowserCard {
  genre: string,
  cards: ShowCard[]
}

export interface BrowserState {
  cards: BrowserCard[],
  loading: boolean
}