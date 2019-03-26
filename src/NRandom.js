class NRandom {

  NPool = {}

  constructor(...args){
  }

  BoxMuller(miu, sigma){
    let u1 = Math.random();
    let u2 = Math.random();
    let z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);

    return z0 * sigma + miu;
  }

  newRandomPool(pId, mius, sigmas = []){

    if (this.NPool[pId]){
      console.log(`[Warning] N random pool Id already exists at ${pId}, it will be rewrite`);
    }

    this.NPool[pId] = {
      Miu:[],
      Sigma:[],
      NRandomRet:[],
      NRandomIdx:[]
    }

    let tRet = [];
    let tIdx = [];

    for(let i=0;i<mius.length;i++){
      
      this.NPool[pId].Miu.push(mius[i]);
      this.NPool[pId].Sigma.push(sigmas[i]?sigmas[i]:(mius[i]/3));
      tRet.push(this.BoxMuller(this.NPool[pId].Miu[i], this.NPool[pId].Sigma[i]));
      tIdx.push(i);
    }

    //Set NPull.RandomRet as a [HEAP]
    for(let i=0;i<tRet.length;i++){
      this.NPool[pId].NRandomRet[i] = tRet[i];
      this.NPool[pId].NRandomIdx[i] = tIdx[i];

      let j = i;
      while(j>0){
        let upper = Math.floor((j-1)/2);
        if (this.NPool[pId].NRandomRet[j] < this.NPool[pId].NRandomRet[upper]){
          //swap
          let t;
          t = this.NPool[pId].NRandomRet[j];
          this.NPool[pId].NRandomRet[j] = this.NPool[pId].NRandomRet[upper];
          this.NPool[pId].NRandomRet[upper] = t;

          t = this.NPool[pId].NRandomIdx[j];
          this.NPool[pId].NRandomIdx[j] = this.NPool[pId].NRandomIdx[upper];
          this.NPool[pId].NRandomIdx[upper] = t;

          j = upper;
        }else{
          break;
        }
      }
    }
  }

  NRandomRet(pId){

    if (!this.NPool[pId]){
      console.log(`[Warning] N Random pool ${pId} is null. Random result will be 0`);
      return 0;
    }
    
    let poolInfo = this.NPool[pId];
    let ret = poolInfo.NRandomIdx[0];
    
    //Attention this +=
    poolInfo.NRandomRet[0] += this.BoxMuller(
      poolInfo.Miu[ret], poolInfo.Sigma[ret]
    );

    //heap doing
    let j = 0;
    //May while(1) also right.
    while (j<poolInfo.NRandomRet.length){
      let c1 = j*2+1;
      let c2 = j*2+2;
      let swapIdx = -1;

      let c = c1;
      //Which child should be swap
      if ((c2 < poolInfo.NRandomRet.length) && (poolInfo.NRandomRet[c2] <= poolInfo.NRandomRet[c1])){
        c = c2;
      }

      if ((c < poolInfo.NRandomRet.length) && (poolInfo.NRandomRet[j] > poolInfo.NRandomRet[c])){
        swapIdx = c;
      }
      else{
        break;
      }

      let t;
      t = poolInfo.NRandomRet[j];
      poolInfo.NRandomRet[j] = poolInfo.NRandomRet[swapIdx];
      poolInfo.NRandomRet[swapIdx] = t;

      t = poolInfo.NRandomIdx[j];
      poolInfo.NRandomIdx[j] = poolInfo.NRandomIdx[swapIdx];
      poolInfo.NRandomIdx[swapIdx] = t;

      j = swapIdx;
    }

    //console.log(poolInfo.NRandomRet.map(v=>Math.floor(v)).join(','));
    //console.log(poolInfo.NRandomIdx.map(v=>Math.floor(v)).join(','));
    return ret;
  }
}

export default NRandom;
