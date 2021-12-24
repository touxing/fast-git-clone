[TOC]

# 说明
一款更快的 git clone GitHub 源码 cli 工具

## 安装

```sh
npm i -g fast-git-clone
```
or
```sh
yarn add -global fast-git-clone
```

## 使用

`fast-git-clone` 的使用和 正常的 `git clone` 子命令一样正常使用
```
fast-git-clone clone <github repository> [-b <branchName>] [-o <originName>]
```
简写
```
fgc clone <github repository>
```
目前支持 `git clone` 的 `-b` `-o` 参数
