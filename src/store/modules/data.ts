import { getDataDicListByCode } from '@/api/system/dataDic';
import { IDataDicInfo } from '@/api/system/model/dataDicModel';
import { defineStore } from 'pinia';

export interface DataState {
  codeMap: { [k: string]: IDataDicInfo[] | undefined };
}

export const useDataDicStore = defineStore({
  id: 'app-data',
  state: (): DataState => {
    return {
      codeMap: {},
    };
  },
  getters: {
    getCodeMap(state) {
      return state.codeMap;
    },
  },
  actions: {
    async getByCode(code: string) {
      const data = this.codeMap[code];
      if (data) {
        return data;
      }

      try {
        return await getDataDicListByCode(code);
      } catch (e) {
        console.log('err', e);
        return [];
      }
    },
  },
});
