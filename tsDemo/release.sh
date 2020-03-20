# 自动化部署脚本


#!/user/bin/env sh
set -e # 设置失败则退出
echo "Enter release version: "
read VERSION # 指定存入变量
# -p表示提前提示，-n 1指仅要一个字符 -r不要反斜线
read -p "Releasing $VERSION - are you sure (y/n)" -n 1 -r
echo # (optional) move to a new line
# 判断逻辑 if和fi一起
# 没指定变量的read放到 $REPLY里面
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION"
  
  # commit
  git add -A # 所有代码放缓存区
  git commit -m "[build] $ VERSION" # 提交commit
  npm version $VERSION --message "[release] $VERSION" #修改version
  git push origin master

  # publish
  npm publish
fi  