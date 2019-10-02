# 拉取新镜像
# 删除现有容器，运行
docker-compose pull info
docker-compose stop info
docker-compose rm info
docker-compose up -d info # -d 代表后台运行