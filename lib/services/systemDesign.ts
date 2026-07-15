// ==========================================
// 1. SINGLETON PATTERN: Global Audit Ledger
// ==========================================
export class AuditService {
  private static instance: AuditService;
  private logs: Array<{ timestamp: Date; event: string; details: any }> = [];

  private constructor() {}

  public static getInstance(): AuditService {
    if (!AuditService.instance) {
      AuditService.instance = new AuditService();
    }
    return AuditService.instance;
  }

  public logEvent(event: string, details: any = {}): void {
    const entry = { timestamp: new Date(), event, details };
    this.logs.push(entry);
    console.log(`[AUDIT LEDGER] ${entry.timestamp.toISOString()} - ${event}`, details);
  }

  public getLogs(): typeof this.logs {
    return [...this.logs];
  }
}

// ==========================================
// 2. STRATEGY PATTERN: Payment Settlement
// ==========================================
export interface PaymentStrategy {
  processPayment(amount: number, details: any): { success: boolean; transactionId: string; fee: number };
}

export class CODPaymentStrategy implements PaymentStrategy {
  processPayment(amount: number, details: any) {
    // COD fee is standard 15 SAR for logistics in Saudi Arabia
    return { success: true, transactionId: `cod-${Date.now()}`, fee: 15 };
  }
}

export class TabbyPaymentStrategy implements PaymentStrategy {
  processPayment(amount: number, details: any) {
    // Tabby takes a 1.5% merchant split
    return { success: true, transactionId: `tabby-${Date.now()}`, fee: amount * 0.015 };
  }
}

export class TamaraPaymentStrategy implements PaymentStrategy {
  processPayment(amount: number, details: any) {
    // Tamara takes a 2.0% merchant split
    return { success: true, transactionId: `tamara-${Date.now()}`, fee: amount * 0.02 };
  }
}

export class CardPaymentStrategy implements PaymentStrategy {
  processPayment(amount: number, details: any) {
    // Credit cards have standard gateway fee
    return { success: true, transactionId: `cc-${Date.now()}`, fee: 2.5 + amount * 0.01 };
  }
}

// ==========================================
// 3. FACTORY METHOD PATTERN: Payment Factory
// ==========================================
export class PaymentProcessorFactory {
  public static getPaymentMethod(type: 'cod' | 'tabby' | 'tamara' | 'card'): PaymentStrategy {
    switch (type) {
      case 'cod':
        return new CODPaymentStrategy();
      case 'tabby':
        return new TabbyPaymentStrategy();
      case 'tamara':
        return new TamaraPaymentStrategy();
      case 'card':
        return new CardPaymentStrategy();
      default:
        throw new Error(`Unsupported payment processor: ${type}`);
    }
  }
}

// ==========================================
// 4. OBSERVER PATTERN: Platform Events
// ==========================================
export interface StoreObserver {
  onEvent(event: string, data: any): void;
}

export class StoreEventPublisher {
  private observers: Set<StoreObserver> = new Set();

  public subscribe(observer: StoreObserver): void {
    this.observers.add(observer);
  }

  public unsubscribe(observer: StoreObserver): void {
    this.observers.delete(observer);
  }

  public publish(event: string, data: any): void {
    this.observers.forEach(obs => {
      try {
        obs.onEvent(event, data);
      } catch (err) {
        console.error(`Error notifying observer for event ${event}:`, err);
      }
    });
  }
}

// Concrete Observer Example
export class AbandonedCartMonitor implements StoreObserver {
  onEvent(event: string, data: any) {
    if (event === 'cart_abandoned') {
      console.log(`[ABANDONED CART ENGINE] Logging cart recovery trigger for session:`, data.sessionId);
    }
  }
}

// ==========================================
// 5. DECORATOR PATTERN: Product Wrapper
// ==========================================
export class ProductDecorator {
  protected product: any;

  constructor(product: any) {
    this.product = product;
  }

  public getRawProduct(): any {
    return this.product;
  }

  public getPrice(): number {
    return this.product.price;
  }

  public getFulfillmentInfo(): string {
    return this.product.fulfillmentType || 'FBM';
  }
}

// Concrete Decorators
export class VATTaxDecorator extends ProductDecorator {
  public getPrice(): number {
    // Add 15% VAT standard for Saudi Arabia
    return Math.round(super.getPrice() * 1.15);
  }
}

export class FBAShippingDecorator extends ProductDecorator {
  public getPrice(): number {
    // Add 25 SAR handling fee for FBA storage fulfillment
    const base = super.getPrice();
    return super.getFulfillmentInfo() === 'FBA' ? base + 25 : base;
  }
}
