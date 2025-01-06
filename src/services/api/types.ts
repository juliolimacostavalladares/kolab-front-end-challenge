
export interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
}

export interface Address {
  geo: Geo
}

export interface Geo {
  lat: string
  lng: string
}

export interface Post {
  userId: number
  id: number
  image?: string
  body: string
}

export interface Comments {
  userId?: number
  postId: number
  id: number
  email: string
  body: string
}
