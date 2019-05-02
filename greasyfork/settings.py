# -*- coding: utf-8 -*-

# Scrapy settings for greasyfork project
#
# For simplicity, this file contains only settings considered important or
# commonly used. You can find more settings consulting the documentation:
#
#     http://doc.scrapy.org/en/latest/topics/settings.html
#     http://scrapy.readthedocs.org/en/latest/topics/downloader-middleware.html
#     http://scrapy.readthedocs.org/en/latest/topics/spider-middleware.html

BOT_NAME = 'greasyfork'

SPIDER_MODULES = ['greasyfork.spiders']
NEWSPIDER_MODULE = 'greasyfork.spiders'

ITEM_PIPELINES = {
    'greasyfork.pipelines.GreasyforkPipeline': 1
}



# 7 天内不重复下载文件
FILES_EXPIRES = 7

FILES_STORE = './dist/scripts'

DOWNLOAD_DELAY = 0.25
