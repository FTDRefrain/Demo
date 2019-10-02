# 原始镜像
FROM nginx
# 文件拷贝
COPY ./index.html /usr/share/nginx/html/index.html
# 复制nginx配置文件，pea3是自己的包名字
COPY ./vhost.nginx.conf /etc/nginx/conf.d/pea3nut-info.conf
# 暴露端口
EXPOSE 80