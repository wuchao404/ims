import uuidv4 from 'uuid/v4';

// 升恒uuid（v4版本）
export class UUID {
  v4(): string {
    return uuidv4();
  }
}