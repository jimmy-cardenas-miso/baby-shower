// API helper functions using Supabase

import { getSupabaseClient } from './supabase';

// Gifts API
export interface Gift {
  id: string; // uuid
  name: string;
  description: string | null;
  category: string;
  price_range: string;
  icon: string;
  status: string | null; // 'available' | 'reserved' | etc
  reserved_by: string | null;
  group_members: string[] | null;
  created_at: string | null;
  image_url: string | null;
  product_url: string | null;
  reservations: string[]; // text[]
}

export async function fetchGifts(): Promise<Gift[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('gifts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching gifts:', error);
    throw new Error('Failed to fetch gifts');
  }

  // Ensure reservations is always an array
  return (data || []).map(gift => ({
    ...gift,
    reservations: gift.reservations || [],
  }));
}

export async function reserveGift(giftId: string, userName: string): Promise<Gift> {
  const supabase = getSupabaseClient();
  // First, get the current gift to check its reservations
  const { data: currentGift, error: fetchError } = await supabase
    .from('gifts')
    .select('*')
    .eq('id', giftId)
    .single();

  if (fetchError || !currentGift) {
    throw new Error('Gift not found');
  }

  // Update reservations array
  const currentReservations = currentGift.reservations || [];
  const updatedReservations = [...currentReservations, userName];

  // Update the gift
  const { data, error } = await supabase
    .from('gifts')
    .update({
      reservations: updatedReservations,
      reserved_by: userName, // Keep for backward compatibility
      status: 'reserved',
    })
    .eq('id', giftId)
    .select()
    .single();

  if (error) {
    console.error('Error reserving gift:', error);
    throw new Error('Failed to reserve gift');
  }

  return {
    ...data,
    reservations: data.reservations || [],
  };
}

export async function removeReservation(giftId: string, userName: string): Promise<Gift> {
  const supabase = getSupabaseClient();
  // First, get the current gift to check its reservations
  const { data: currentGift, error: fetchError } = await supabase
    .from('gifts')
    .select('*')
    .eq('id', giftId)
    .single();

  if (fetchError || !currentGift) {
    throw new Error('Gift not found');
  }

  // Remove the user from reservations array
  const currentReservations = currentGift.reservations || [];
  const updatedReservations = currentReservations.filter(name => name !== userName);

  // Update the gift
  const { data, error } = await supabase
    .from('gifts')
    .update({
      reservations: updatedReservations,
      reserved_by: updatedReservations.length > 0 ? updatedReservations[0] : null, // Keep for backward compatibility
      status: updatedReservations.length > 0 ? 'reserved' : 'available',
    })
    .eq('id', giftId)
    .select()
    .single();

  if (error) {
    console.error('Error removing reservation:', error);
    throw new Error('Failed to remove reservation');
  }

  return {
    ...data,
    reservations: data.reservations || [],
  };
}

// Guests API
export interface Guest {
  id: number; // bigint
  name: string | null;
  confirmed: boolean | null;
  confirmed_at: string | null;
  created_at: string;
  category: string | null;
}

export async function fetchGuests(): Promise<Guest[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching guests:', error);
    throw new Error('Failed to fetch guests');
  }

  return data || [];
}

export async function updateGuestConfirmation(
  guestId: number,
  confirmed: boolean | null
): Promise<Guest> {
  const updateData: Partial<Guest> = {
    confirmed,
  };

  // Set confirmed_at if confirming, clear if null
  if (confirmed === true) {
    updateData.confirmed_at = new Date().toISOString();
  } else if (confirmed === null) {
    updateData.confirmed_at = null;
  }

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', guestId)
    .select()
    .single();

  if (error) {
    console.error('Error updating guest:', error);
    throw new Error('Failed to update guest');
  }

  return data;
}

// Messages API
export interface Message {
  id: string; // uuid
  author_name: string;
  content: string;
  likes: number;
  created_at: string;
}

export async function fetchMessages(): Promise<Message[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching messages:', error);
    throw new Error('Failed to fetch messages');
  }

  return data || [];
}

export async function createMessage(
  authorName: string,
  content: string
): Promise<Message> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('messages')
    .insert({
      author_name: authorName,
      content: content,
      likes: 0,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating message:', error);
    throw new Error('Failed to create message');
  }

  return data;
}

export async function likeMessage(messageId: string): Promise<Message> {
  const supabase = getSupabaseClient();
  // First, get the current message to increment likes
  const { data: currentMessage, error: fetchError } = await supabase
    .from('messages')
    .select('*')
    .eq('id', messageId)
    .single();

  if (fetchError || !currentMessage) {
    throw new Error('Message not found');
  }

  // Update likes
  const { data, error } = await supabase
    .from('messages')
    .update({
      likes: (currentMessage.likes || 0) + 1,
    })
    .eq('id', messageId)
    .select()
    .single();

  if (error) {
    console.error('Error liking message:', error);
    throw new Error('Failed to like message');
  }

  return data;
}
