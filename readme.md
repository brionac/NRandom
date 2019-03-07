A random function with normal distribution .

How to use:

import NRandrom from 'nrandom';
let nr = new NRandom();

//Create a pool with poolId, miu and sigma.
//sigma[i] has a default value miu[i]/3
nr.newRandomPool(1000, 
  [6, 3, 2],
  [6/3, 3/3, 2/3]
)

nr.newRandomPool(1001, 
  [6, 3, 2]
);

//random result range in [0, sigma.length-1]
let ret1 = nr.NRandomRet(1000);
let ret2 = nr.NRandomRet(1001);

