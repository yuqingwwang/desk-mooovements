export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cities: {
        Row: {
          country: string | null
          id: number
          name: string | null
        }
        Insert: {
          country?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          country?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          food_rating: number | null
          food_reviews: string | null
          id: number
          place_id: number | null
          vibe_rating: number | null
          vibe_reviews: string | null
        }
        Insert: {
          food_rating?: number | null
          food_reviews?: string | null
          id?: number
          place_id?: number | null
          vibe_rating?: number | null
          vibe_reviews?: string | null
        }
        Update: {
          food_rating?: number | null
          food_reviews?: string | null
          id?: number
          place_id?: number | null
          vibe_rating?: number | null
          vibe_reviews?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "work_spaces"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string
          id: number
          username: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          username?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          username?: string | null
        }
        Relationships: []
      }
      work_spaces: {
        Row: {
          address: string | null
          city: number | null
          created_at: string | null
          created_by: number | null
          has_locker: boolean | null
          has_meeting_room: boolean | null
          has_phone_booth: boolean | null
          has_shower: boolean | null
          has_socket: boolean | null
          has_wifi: boolean | null
          id: number
          image: string | null
          name: string | null
          opens_till_late: boolean | null
          pet_friendly: boolean | null
        }
        Insert: {
          address?: string | null
          city?: number | null
          created_at?: string | null
          created_by?: number | null
          has_locker?: boolean | null
          has_meeting_room?: boolean | null
          has_phone_booth?: boolean | null
          has_shower?: boolean | null
          has_socket?: boolean | null
          has_wifi?: boolean | null
          id: number
          image?: string | null
          name?: string | null
          opens_till_late?: boolean | null
          pet_friendly?: boolean | null
        }
        Update: {
          address?: string | null
          city?: number | null
          created_at?: string | null
          created_by?: number | null
          has_locker?: boolean | null
          has_meeting_room?: boolean | null
          has_phone_booth?: boolean | null
          has_shower?: boolean | null
          has_socket?: boolean | null
          has_wifi?: boolean | null
          id?: number
          image?: string | null
          name?: string | null
          opens_till_late?: boolean | null
          pet_friendly?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "work_spaces_city_fkey"
            columns: ["city"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
