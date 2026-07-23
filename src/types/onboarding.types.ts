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
