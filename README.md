# 源动新官网Node层

### 快速开始

```bash
$ yarn install
$ yarn dev
$ open http://localhost:7001/
```

## controller
这里是请求对应的函数的类。
```
  // 这里是get('/user')的处理函数
  public async getUser() {
    const { ctx } = this;
    
    // 这里就是随你怎么来。可以数据库查，或者别的。
    const user = { ... };
    // 返回的值
    ctx.body = user;
  }

  // 下面类似，不再解释了啊
  public async addUser() {
    const { ctx } = this;

    // 模拟前端传递过来的数据（方便测试）
    const user = new UserModel();
    user.userName = 'add user';
    user.userNo = 99;

    const res = await ctx.model.User.create(user);
    ctx.body = res;
  }

  public async deleteUser() {
    const { ctx } = this;

    const user = new UserModel();
    user.userNo = 99;

    const res = await UserModel.findOneAndRemove({ userNo: user.userNo });

    ctx.body = res;
  }
```
## service层
这里没有啥讲的，就是一些业务性的东西放这里，让被controller或者其他service调用。
```
  /**
  * sayHi to you
  * @param name - your name
  */
  public async sayHi(name: string) {
    return `hi, ${name}`;
  }
```
## Model
1. 首先我们创建一个Schema
```
/**
  * 定义一个User的Schema
*/
const UserSchema: Schema = new Schema({
  userNo: {
    type: Number,
    index: true,
  },

  userName: String,
},
  {
    timestamps: true,
  },
);
```
2. 索引
```
// userNo 为索引
UserSchema.index({ userNo: 1, });
```
3. 实例方法和静态方法
```
// UserSchema的实例方法
UserSchema.methods.userInstanceTestMethods = function () {

  const user: IUser = new UserModel();
  user.userName = '我是实例化方法测试';
  user.userNo = 9527;

  return user;
};

// UserSchema的实例方法
UserSchema.statics.userStaticTestMethods = function () {

  const user: IUser = new UserModel();
  user.userName = '我是静态方法测试';
  user.userNo = 9528;

  return user;
};
```
4. 创建User接口字段
```
/**
  * 用户字段接口
*/
export interface IUser {

  userNo: number;

  userName: string;
}
```
5. 实例方法和静态方法接口的定义，注意：这里的接口要和Schema中定义的函数的名称和返回值一致。
```
export interface IUserDocument extends IUser, Document {
  /**
  * 实例方法接口（名称需要和Schema的方法名一样）
  */
 userInstanceTestMethods: () => IUser;
}
/**
  * 静态方法接口
*/
export interface IUserModel extends Model<IUserDocument> {

  /**
   * 静态方法
   */
  userStaticTestMethods: () => IUser;
}
```
6. 导出model即可。
```
export const UserModel = model<IUserDocument, IUserModel>('User', UserSchema);
```
7. 为了怕有需求使用到ctx.model.User，我们需要将UserSchema挂载到ctx中
```
// egg-mongoose注入
export default (app: Application) => {

  const mongoose = app.mongoose;
  // 这里为了挂载到ctx中，让正常ctx.model.User也能使用
  mongoose.model<IUserDocument, IUserModel>('User', UserSchema);
};
```
## 使用Model
使用mode能使用IUser字段接口，实例方法，静态方法。
```
  // 这里的user是: IUser的类型。然后就能尽情的点点点啦！
  const user = await UserModel.findOne();
  // 等价于
  const users = await this.ctx.model.User.find();
  // 实例方法
  const newUser = new UserModel();
  newUser.userInstanceTestMethods();
  // 静态方法
  UserModel.userStaticTestMethods();
```
## 单元测试

```
 test/app/controller/home.test.ts
    √ should GET / (49ms)
    √ addUser (39ms)
    √ getUser
    √ getUsers
    √ updateUser
    √ deleteUser
    √ testStaticMethods
    √ testInstanceFunction

  test/app/service/Test.test.js
    √ sayHi
    √ testUserInstanceServiceMethods
    √ testUserInstanceServiceMethods

  11 passing (4s)
```

## 定时任务

定时任务和我们一般定时任务差不多。定时任务一般分两种：
+ 一种是 **间隔若干时间执行** 某个任务 
+ 另一种是 **某个时间点执行** 某个任务

1. 间隔若干时间执行（每隔60s将会执行一次）
```
  static get schedule() {
    return {
      interval: '60s', // 60s 间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  async subscribe() {
    const ctx = this.ctx;

    console.log('每60s执行一次增加User的定时任务！！' + new Date())

    const test = await ctx.service.user.addUserByScheduleTest();

    console.log(test)
  }
```
2. 某个时间点执行（每个月的15号:00:00 分执行）
```
  static get schedule() {
    return {
      cron: '0 0 0 15 * *', // 每个月的15号:00:00 分执行
      type: 'worker', // 只指定一个随机进程执行job 防止出现数据冲突
      disable: false, // 是否开启
      cronOptions: {
        tz: 'Asia/Shanghai',
      },
    };
  }

  async subscribe () {
    const ctx = this.ctx;

    console.log('每个月的15号:00:00 分执行！！' + new Date())
  }
```
时间的配置请看：[egg的官方文档]([https://eggjs.org/zh-cn/basics/schedule.html](https://eggjs.org/zh-cn/basics/schedule.html)
)