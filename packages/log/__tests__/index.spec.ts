/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sort-keys */
import { create, get, isExist, remove, LogCache } from '../src';

describe('@geeeger/log module', () => {
  describe('针对Log模块实例化', () => {
    /**
     * 对某一单元/方法测试进行描述
     */
    test('测试创建及删除log实例', () => {
      const log = create('测试id', {
        print: true,
        send: false,
        transfer: false,
      });

      // 我们期望测试结果如何
      // expect 期望 log toBeTruthy(是真值（也就是存在的）);
      // 所谓真值，就是js真值
      // 现在我们可以结合lerna跑一下测试命令
      // 这里会用到npx命令，npx命令是node 6以后出的一个cli工具
      // 该命令可以执行不是安装在全局下的npm包命令
      // npx lerna run test --scope=@geeeger/log
      // lerna是我们这个项目使用的多模块管理工具
      // lerna run command --scope
      // 意思是执行xxx包的xxx命令
      // 这里就类似于进到log包，执行了npm run test
      expect(log).toBeTruthy();

      // 可以看到，我们执行命令后，输出了如下内容

      // =============================== Coverage summary ===============================
      // Statements   : 41.07% ( 23/56 )
      // Branches     : 27.27% ( 3/11 )
      // Functions    : 44.44% ( 8/18 )
      // Lines        : 41.07% ( 23/56 )
      // ================================================================================
      // 测试框架还有一个好处在于，会生成测试覆盖报告
      // 该报告量化了你对代码做了怎样的测试，
      // 此处有四个维度，分别是
      // Statements 声明-既代码里var const class一类的声明
      // Branches 条件分支-既代码里if else switch等条件覆盖的程度
      // Functions 方法覆盖-既代码里测试到的方法的覆盖程度
      // Lines 代码行-既代码里测试覆盖的代码行数
      // 这里可以清晰的看到，我们上一个代码的执行，覆盖到了23个声明，3个if分支，8个方法，
      // 23行代码
      // 总覆盖率大约是40%，这不是一个比较理想的覆盖数量
      // 理想的覆盖水平因产出质量而定，一般来说都定在80%以上

      // 这里对删除log实例进行测试
      // log实例的删除实质上是从logCache中移除,
      // 而我们的remove方法其实是logRemove的别名，
      // 其在删除时会返回当前id的log实例，
      // 则我们期望

      // 刚刚意外了，类型推断为undefined了，
      const log1 = remove('测试id') as LogCache;

      // 我们期望当前删除掉的log就是我们创建的那一个
      // emmmm....
      // 这里有些区别，这里那啥,我们返回的log是个LogCache类型，带个id的
      expect(log1.log).toBe(log);

      // 既然已经执行remove了，则再找就找不到这个缓存了
      // 我们期望再执行get获取不到相应实例
      expect(get('测试id')).toBeFalsy();
      // 经过上面的测试，我们发现测试报错了，预期与结果不符
      // Received:
      // {"id": "测试id", "log": {
      //      "_debug_cache": [],
      //      "_error_cache": [],
      //      "_info_cache": [],
      //      "_warn_cache": [],
      //      "config": {
      //          "id": "测试id",
      //          "print": true,
      //          "send": false,
      //          "transfer": false
      //      }
      // }}
      // 我们期望id = '测试id'的log实例已被删除，但发现没有被删除，
      // 则可以回代码看看发生什么问题了

      // 刚刚我们回代码处修改了bug，再次运行测试看看会发生什么
      // =============================== Coverage summary ===============================
      // Statements   : 56.45% ( 35/62 )
      // Branches     : 27.27% ( 3/11 )
      // Functions    : 55.56% ( 10/18 )
      // Lines        : 56.45% ( 35/62 )
      // ================================================================================
      // 测试跑过去了，可喜可贺
      // 想要可视化的看测试到底怎么回事，可以直接看包底下的coverage文件，那里生成了报告

      // 好，我们可以对其他方法进行测试了
    });

    // 我们测试一下check方法，check方法实际上没有覆盖到，他返回的是个boolean

    test('测试check方法', () => {
      create('测试id2', {
        print: true,
        send: false,
        transfer: false,
      });

      // 期望其直接返回true
      // 可以，我们收到不符合预期的结果了，可以回去看代码发生了什么
      // ok，看实现我们知道，如果存在返回了false，这个设计是斗鱼带来的，并且斗鱼认为该方法
      // 是一个私有方法，不应该符合这样的逻辑
      // 但是按照惯性思维，check是存在返回true才对，所以这里我们要改名字了
      expect(isExist('测试id2')).toBe(true);
      // 期望未实例化log不存在
      expect(isExist('测试id3')).toBe(false);

      // 好，今天的讲课完了
    });
  });

  describe('测试log方法', () => {
    // 单元测试前，我们可以决定加载一些什么玩意或者，做一些什么事
    let result: any = {};
    let testlog: any = {};

    beforeEach(() => {
      result = {
        info: [1, 2, 3],
        debug: [2, 3, 4],
        error: [3, 4, 5],
        warn: [5, 6, 7],
      };
      testlog = create('测试log方法', {
        send: false,
        transfer: false,
        print: true,
      });
    });

    test('测试info方法', () => {
      testlog.info(1, 2, 3);
      // 我们期望调用info能正常输出，并缓存数据 1， 2， 3
      expect(testlog.list().info[0]).toEqual(result.info);
    });

    test('测试warn方法', () => {
      testlog.warn(5, 6, 7);
      // 我们期望调用warn能正常输出，并缓存数据 5,6,7
      expect(testlog.list().warn[0]).toEqual(result.warn);
    });

    test('测试error方法', () => {
      testlog.error(3, 4, 5);
      expect(testlog.list().error[0]).toEqual(result.error);
    });

    test('测试debug方法', () => {
      testlog.debug(2, 3, 4);
      expect(testlog.list().debug[0]).toEqual(result.debug);
    });

    // 测试结果符合期望
    //     console.info src/log.ts:1802
    //     [ 1, 2, 3 ]

    //   console.warn src/log.ts:1792
    //     [ 5, 6, 7 ]

    //   console.error src/log.ts:1782
    //     [ 3, 4, 5 ]

    //   console.debug src/log.ts:1812
    //     [ 2, 3, 4 ]

    // =============================== Coverage summary ===============================
    // Statements   : 88.71% ( 55/62 )
    // Branches     : 90.91% ( 10/11 )
    // Functions    : 94.44% ( 17/18 )
    // Lines        : 88.71% ( 55/62 )
    // ================================================================================
  });
});
