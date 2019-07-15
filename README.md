# 包

### 启动方式

#### step 1

进入项目 npm install

#### step 2

按照 packages/is 的包的书写方式进行书写

#### step 3

补单元测试, 执行 npx lerna run test --scope=package包名

例如 npx lerna run test --scope=@qietvfe/is

#### step 4

执行 npm run lint 查看是否有需要更改的error

#### step 5

提交git

### 命令解释

---
npm run changelog

生成changelog

"changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0 && git add CHANGELOG.md",

---

npm run test

对所有包进行测试

npx lerna run test --scope=@qietvfe/is

对单个包进行测试

"test": "lerna run test --parallel",

---

npm run build

对所有包进行构建

npx lerna run build --scope=@qietvfe/is

对@qietvfe/is 进行构建

"build": "lerna run build",

---

npm run clean

清除所有包的node_modules文件夹并清除lib文件夹

npx lerna run clean

清除所有包的lib文件夹

npx lerna run clean --scope=@qietvfe/is

清除is包的lib文件夹

"clean": "lerna clean && lerna run clean",

---

npm run typecheck

对所有包进行类型检测（基于tsc，不输出模式）

npx run typecheck --scope=@qietvfe/is

对qietvfe/is包进行类型检测

"typecheck": "lerna run typecheck",

---

npm run lint

对所有代码进行代码检查

"lint": "eslint . --ext .js,.ts",

---

npm run lint-fix

对所有代码进行格式修复

"lint-fix": "eslint . --ext .js,.ts --fix",

---

npm run check-format

对所有代码进行格式化（不要使用，原因 prettier的space around function规则与eslint 相关设置规则冲突，见https://github.com/prettier/prettier/issues/3847）

"check-format": "prettier --write \"./**/*.{ts,js,json,md}\""

