FROM python:3.11.9-slim
WORKDIR /app
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt
COPY . /app
# 暴露端口
EXPOSE 8000

# 运行 Gunicorn 服务器
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "app:app"]