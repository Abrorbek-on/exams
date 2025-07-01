export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    SUPERADMIN = 'SUPERADMIN',
}

export enum subscriptionStatus {
    ACTIVE = 'active',
    EXPIRED = 'expired',
    CANCELED = 'canceled',
    PENDING_PAYMENT = 'pending_payment',
}

export enum PaymentMethod {
    CARD = 'card',
    PAYPAL = 'paypal',
    BANK_TRANSFER = 'bank_transfer',
    CRYPTO = 'crypto',
}
  
export enum PaymentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    FAILED = 'failed',
    REFUNDED = 'refunded',
}
  
export enum SubscriptionType {
    FREE = 'free',
    PREMIUM = 'premium',
}

export enum VideoQuality {
    '240p' = '240p',
    '360p' = '360p',
    '480p' = '480p',
    '720p' = '720p',
    '1080p' = '1080p',
    '4K'= '4K',
}