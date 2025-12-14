export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type SubscriptionCategory = 'Entertainment' | 'Utility' | 'Food' | 'Health' | 'Music' | 'Gaming' | 'News' | 'Other'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          name: string
          cost: number
          billing_cycle: 'Monthly' | 'Quarterly' | 'Yearly' | 'Once'
          start_date: string
          category: SubscriptionCategory
          icon_key: string
          color: string
          payment_method: string | null
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          cost: number
          billing_cycle: 'Monthly' | 'Quarterly' | 'Yearly' | 'Once'
          start_date: string
          category: SubscriptionCategory
          icon_key?: string
          color?: string
          payment_method?: string | null
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          cost?: number
          billing_cycle?: 'Monthly' | 'Quarterly' | 'Yearly' | 'Once'
          start_date?: string
          category?: SubscriptionCategory
          icon_key?: string
          color?: string
          payment_method?: string | null
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Subscription = Database['public']['Tables']['subscriptions']['Row']
export type SubscriptionInsert = Database['public']['Tables']['subscriptions']['Insert']
export type SubscriptionUpdate = Database['public']['Tables']['subscriptions']['Update']
