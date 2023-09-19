import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';


// idle, loading, succeeded, failed
const initialState = {
  data: [],
  status: 'idle',
  error: null
}

export const fetchLifeFormData = createAsyncThunk('data/fetchLifeFormData', async () => {
  const response = await fetch("http://localhost:9000/lfAPI")
    .then(res => res.json())
    .then(res => calculateFields(res) )
    .catch(error => {
        console.log('error:', error);
    });
  return response
})

const lookupValue = (data,life_form,type,wk) => {

  let r = data?.filter(ele => { return ele.life_form === life_form && ele.type === type });
  if(r.length===1){
    let rr = r[0];
    return rr[wk];
  }else{
    return null;
  }
}

const calculateFields = (data) => {
  // calculate week by week. wk1: death (only). wk2: population, death. wk3: population, death

  let births = {...data?.filter(ele => { return ele.type === 'birth'})};


  // get the week keys
  let wks = [];
  let r1 = births[0];
  Object.keys(r1).forEach(key => {
    if(key.indexOf('w')===0){
      wks.push(key);
    }
  });


  // now go week by week calculation population and deaths for each life form.
  for(let wx = 0; wx<wks.length; wx++){

    let wk = wks[wx]; // week column string

    let wxL = wks[wx-1];// Last week
    // Population last week
    let spiderPopL = wx>0 ? lookupValue(data,'Wolf Spider','population',wxL) : 0;
    let cricketPopL = wx>0 ? lookupValue(data,'Cricket','population',wxL) : 0;
    let aphidPopL = wx>0 ?lookupValue(data,'Aphid','population',wxL) : 0;
    let milkPopL = wx>0 ? lookupValue(data,'Milkweed','population',wxL): 0;

    // Births this week
    let spiderBirth = lookupValue(data,'Wolf Spider','birth',wk);
    let cricketBirth = lookupValue(data,'Cricket','birth',wk);
    let aphidBirth = lookupValue(data,'Aphid','birth',wk);
    let milkBirth = lookupValue(data,'Milkweed','birth',wk);

    // Deaths last week
    let spiderDthL = wx>0 ? lookupValue(data,'Wolf Spider','death',wxL) : 0;
    let cricketDthL = wx>0 ? lookupValue(data,'Cricket','death',wxL) : 0;
    let aphidDthL = wx>0 ? lookupValue(data,'Aphid','death',wxL) : 0;
    let milkDthL = wx>0 ? lookupValue(data,'Milkweed','death',wxL) : 0;

    // Calculate population this week
    data.filter( r => {return r.type === 'population'}).forEach(r => {
      if(r.life_form === 'Wolf Spider'){
        r[wk] = Math.max(0, spiderPopL + spiderBirth - spiderDthL);
      }else if(r.life_form === 'Cricket'){
        r[wk] = Math.max(0, cricketPopL + cricketBirth - cricketDthL);
      }else if(r.life_form === 'Aphid'){
        r[wk] = Math.max(0, aphidPopL + aphidBirth - aphidDthL);
      }else if(r.life_form === 'Milkweed'){
        r[wk] = Math.max(0, milkPopL + milkBirth - milkDthL);
      }
    });

    // Population this week
    let spiderPop = lookupValue(data,'Wolf Spider','population',wk);
    let cricketPop = lookupValue(data,'Cricket','population',wk);
    let aphidPop = lookupValue(data,'Aphid','population',wk);
    let milkPop = lookupValue(data,'Milkweed','population',wk);

    // Calculate deaths this week
    data.filter( r => {return r.type === 'death'}).forEach(r => {

        if(r.life_form === 'Wolf Spider'){
          // death by starvation
          r[wk] = Math.min( spiderPop, Math.max( 0, spiderPop - Math.max(0,Math.floor(cricketPop)) ) );
        }else if(r.life_form === 'Cricket'){
          // death by spider + death by starvation
          r[wk] = Math.min(cricketPop,  Math.floor(spiderPop) + Math.max(0,cricketPop - Math.floor(aphidPop)) );
        }else if(r.life_form === 'Aphid'){
          // death by cricket + death by starvation
          r[wk] = Math.min(aphidPop, Math.floor(cricketPop) + Math.max( 0,aphidPop - Math.floor(milkPop)) );
        }else if(r.life_form === 'Milkweed'){
          // death by aphid
          r[wk] = Math.min(milkPop, Math.floor(aphidPop) );
        }

        //console.log('rrr',r);
    });

  }


  console.log('data',data);

  return data;

}

const lifeFormSlice = createSlice({
  name: 'lifeForms',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    setData(state, action) {
      let calcData = calculateFields(action.payload);
      return {...state, data: calcData}
    },

  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
    .addCase(fetchLifeFormData.pending, (state, action) => {
        state.status = 'loading';
      })
    .addCase(fetchLifeFormData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;

    })
    .addCase(fetchLifeFormData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
    })
  },
})
export const {setData} = lifeFormSlice.actions;
export default lifeFormSlice.reducer;
