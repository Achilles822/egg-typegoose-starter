// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportToken from '../../../app/service/token';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    token: AutoInstanceType<typeof ExportToken>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
