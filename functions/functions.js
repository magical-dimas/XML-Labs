export function convertToIntervals(set){
    let iter = set.values()
    let unit = iter.next()
    let prev = unit.value
    if(unit.value == null) return "Список пуст"
    let unchanged = true
    let intervals = prev.toString()
    unit = iter.next()
    while(!unit.done){
        if(unit.value-prev!=1){
            if(unchanged){
                intervals+=", "+unit.value
            }
            else{
                intervals+="-"+prev+", "+unit.value
            }
            unchanged = true
        }
        else{
            unchanged = false
        }
        prev = unit.value
        unit = iter.next()
    }
    if(!unchanged){
        intervals+="-"+prev
    }
    return intervals
}

export function findAnagrams(words){
    let anagrams = {}
    words.forEach((word)=>{
        const sorted = word.toLowerCase().split("").sort().join("")
        if(!anagrams[sorted]) {
            anagrams[sorted] = []
        }
        word = word.charAt(0).toUpperCase()+word.slice(1).toLowerCase()
        if(!anagrams[sorted].includes(word)){
            anagrams[sorted].push(word)
        }
    })
    return Object.values(anagrams).filter(group => group.length >= 2).map(group => "["+group.sort().join(', ')+"]").sort()
}

export function getSumAndMultOfArray(arr){
    let s = 0;
    let m = 1;
    for(let i = 0; i<arr.length; i++){
        s+=arr[i];
        m*=arr[i];
    }
    if(s==0 && m==1) m = 0
    return {
        sum: s,
        mult: m
    };
}

export function sumOfSquares(arr){
    let res = 0;
    for(let i = 0; i<arr.length; i++){
        res+=arr[i]*arr[i]
    }
    return res
}