export const UTILS = { 
    FORMAT_AMOUNT: function(amount) {
        if (!amount) amount = 0;
        return Number(amount).toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    },
}
