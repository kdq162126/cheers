import { ValueTransformer } from 'typeorm';

export class JsonColumnTransformer implements ValueTransformer {
  to(data: any): any {
    if (data !== undefined && data !== null) {
      return JSON.stringify(data);
    }
    return data;
  }

  from(data: any): any {
    if (typeof data === 'string') {
      try {
        return JSON.parse(data);
      } catch (error) {
        // JSON parsing failed, return the original value
        return data;
      }
    }
    return data;
  }
}
