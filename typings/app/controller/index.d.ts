// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBasic from '../../../app/controller/basic';
import ExportHome from '../../../app/controller/home';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    basic: ExportBasic;
    home: ExportHome;
    user: ExportUser;
  }
}
