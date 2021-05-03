import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UniqueIdService {
  private numberOfGeneratedIds = 0;
  private validId = /^[A-Za-z]+[\w\-\:\.]*$/;

  public generatedUniqueIdWithPrefix(prefix: string): string {
    if (!prefix || !this.validId.test(prefix)) {
      throw Error('Prefix can not be empty');
    }
    const uniqueId = `${prefix}-${this._generatedUniqueId()}`;
    this.numberOfGeneratedIds++;
    return uniqueId;
  }

  public getNumberOfGenerateUniqueIDs(): number {
    return this.numberOfGeneratedIds;
  }

  private _generatedUniqueId(): string {
    return uuidv4();
  }
}
