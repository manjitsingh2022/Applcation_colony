export const handleLongString = (name, limit) =>
    name && (name.length > limit ? `${name.substring(0, limit)}...` : name);

export const convertToInternationalCurrencySystem = (labelValue) => {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
        ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
        : // Six Zeroes for Millions
        Math.abs(Number(labelValue)) >= 1.0e6
            ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
            : // Three Zeroes for Thousands
            Math.abs(Number(labelValue)) >= 1.0e5
                ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
                : Math.abs(Number(labelValue)) >= 1.0e3
                    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
                    : Math.abs(Number(labelValue));
};

export const formatCurrency = (number) => {
    const options = {
        // style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
        minimumIntegerDigits: 1,
        minimumSignificantDigits: 1,
        maximumSignificantDigits: 21,
        notation: "standard",
        currencyDisplay: "symbol",
        currencySign: "standard",
        numberingSystem: "latn",
        signDisplay: "auto",
        localeMatcher: "best fit",
        groupingSeparator: ",",
    };
    return Number(number).toLocaleString("en-US", options);
};
