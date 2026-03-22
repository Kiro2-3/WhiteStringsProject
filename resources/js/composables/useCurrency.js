import { ref, computed } from 'vue'

const STORAGE_KEY = 'app_currency'

const CURRENCY_SYMBOLS = {
  AED: 'د.إ',
  AUD: 'A$',
  BDT: '৳',
  BRL: 'R$',
  CAD: 'C$',
  CHF: 'Fr',
  CNY: '¥',
  COP: '$',
  DKK: 'kr',
  EGP: 'E£',
  EUR: '€',
  GBP: '£',
  HKD: 'HK$',
  IDR: 'Rp',
  ILS: '₪',
  INR: '₹',
  JPY: '¥',
  KRW: '₩',
  KWD: 'KD',
  MXN: '$',
  MYR: 'RM',
  NGN: '₦',
  NOK: 'kr',
  NZD: 'NZ$',
  PHP: '₱',
  PKR: '₨',
  PLN: 'zł',
  QAR: 'QR',
  RUB: '₽',
  SAR: 'SR',
  SEK: 'kr',
  SGD: 'S$',
  THB: '฿',
  TRY: '₺',
  TWD: 'NT$',
  UAH: '₴',
  USD: '$',
  VND: '₫',
  ZAR: 'R',
}

// Shared reactive state so all components see the same currency
const selectedCurrency = ref(localStorage.getItem(STORAGE_KEY) || 'PHP')

export function useCurrency() {
  const currencySymbol = computed(() => CURRENCY_SYMBOLS[selectedCurrency.value] || '₱')

  function setCurrency(code) {
    selectedCurrency.value = code
    localStorage.setItem(STORAGE_KEY, code)
  }

  function formatMoney(amount) {
    const formatted = new Intl.NumberFormat('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(amount || 0))
    return `${currencySymbol.value}${formatted}`
  }

  return {
    selectedCurrency,
    currencySymbol,
    setCurrency,
    formatMoney,
    CURRENCY_SYMBOLS,
  }
}
