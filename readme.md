```
A random function with normal distribution .

How to use:
npm install normaldisrandom --save

In javascript:

import NRandrom from 'normaldisrandom';
//OR
//var NRandom = require('normaldisrandom').default
let nr = new NRandom();

/*
Create a pool with poolId, μ and σ.
if i appears with a probability p[i], μ[i] = 1/p[i]
σ[i] has a default value with μ[i]/3

This code create a pool with p[i] = [1/6, 1/3, 1/2]
*/

nr.newRandomPool(1000, 
  [6, 3, 2],
  [6/3, 3/3, 2/3]
)
nr.newRandomPool('Pool001',
  [6, 3, 2]
);

//random [poolId] result range in [0, σ.length-1]
//returns 0, 1 or 2 with P = [1/6, 1/3, 1/2], μ = [6,3,2]， σ = [2, 1, 2/3]

let ret1 = nr.NRandomRet(1000);  
let ret2 = nr.NRandomRet('Pool001'); 
```
