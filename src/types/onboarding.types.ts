export interface PersonalProfileData {
  fullName: string;
  age: string;
  email: string;
  profileImageUrl?: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl?: string;
}

export interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

/**
 * Safe-to-persist summary of a saved card — no full PAN, no CVV.
 * CVV is never stored anywhere past the initial entry, even here.
 */
export interface SavedPaymentMethod {
  brand: string;
  last4: string;
  cardholderName: string;
  expiryDate: string;
}
