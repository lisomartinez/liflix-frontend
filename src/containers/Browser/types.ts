import { ShowCard } from "../../components/showCards/types";

export interface BrowserCard {
  shows: ShowsByGenreMap,
  pages: Page,
  totalPages: TotalPages
}

export interface ShowsByGenreMap {
  [key: string] : ShowCard[],

}

export interface BrowserCardEntry{
  genre: string,
  cards: ShowCard[]
}

export interface Page {
  [key: string]: number
}

export interface TotalPages {
  [key: string]: number
}

export interface Loading {
  [key: string]: boolean
}

export interface BrowserState {
  cards: BrowserCard,
  loading: Loading
}