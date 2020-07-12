export const UTILS = { 
    FORMAT_AMOUNT: function(amount) {
        if (!amount) amount = 0;
        return Number(amount).toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    },
    COMPARE_TWO_ARRAY_OBJECT: function(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        let twoListAreSame = true;
        for (let i = 0; i < arr1.length; i++) {
            if (!twoListAreSame) break;
            let item1 = arr1[i];
            let item2 = arr2[i];
            for(let propertyName in item1) {
                if(item1[propertyName] !== item2[propertyName]) {
                    twoListAreSame = false;
                    break;
                }
            }
        }
        return twoListAreSame;
    }
}
