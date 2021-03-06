import {ApiResponse} from 'apisauce';
import {Api} from '.';

import {getGeneralApiProblem} from './api-problem';

class BenchmarkApi {
  async sendResult(device: any, results: any[]) {
    try {
      const response: ApiResponse<any> = await Api.apisauce.post('/react', {
        device: JSON.stringify(device),
        results: JSON.stringify(results),
      });
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }
      return {kind: 'ok', data: response};
    } catch (e) {
      console.log('error', e);
      return {kind: 'bad-data'};
    }
  }
}

export default new BenchmarkApi();
