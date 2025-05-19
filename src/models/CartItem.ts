export default interface CartItem {
    sku: number | string;
    displayItemName?: string;
    displayCurrencyValue: number;
    displayCurrencySaleValue: number;
    displayCurrencyValueType: string;
    displayCurrencyValueSymbol: string;
    productImageBinData: string;
    quantityNumber: number;
}