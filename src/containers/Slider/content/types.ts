export interface Show {
  id?: string
  name?: string
  type?: string
  language?: string
  genre?: {
    name?: string
  }[]
  status?: string
  runtime?: number
  rating?: number
  premiered?: string
  officialSite?: string
  schedule?: {
    days?: string[]
    time?: string
  }
  tvMaze?: string
  imdb?: string
  image?: string
  summary?: string
  lastUpdate?: string
}

export interface ShowState {
  show?: {
    [key: string]: Show;
  }
}