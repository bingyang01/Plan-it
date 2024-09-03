import logging
import os
import colorlog


log_dir = 'logs'
if not os.path.exists('logs'):
    try:
        os.makedirs(log_dir)
    except OSError as e:
        print(f"Error creating directory {log_dir}: {e}")


logger = logging.getLogger()


logger.setLevel(logging.INFO)


formatter = colorlog.ColoredFormatter(
    "%(log_color)s%(asctime)s - %(levelname)s - %(message)s",
    datefmt='%Y-%m-%d %H:%M:%S',
    log_colors={
        'DEBUG': 'reset',
        'INFO': 'bold_green',
        'WARNING': 'bold_yellow',
        'ERROR': 'bold_red',
        'CRITICAL': 'bold_purple',
    }
)


console_handler = logging.StreamHandler()
console_handler.setFormatter(formatter)


file_handler = logging.FileHandler("logs/api_calls.log")
file_handler.setFormatter(logging.Formatter(
    "%(asctime)s - %(levelname)s - %(message)s",
    datefmt='%Y-%m-%d %H:%M:%S'
))


logger.addHandler(console_handler)
logger.addHandler(file_handler)
