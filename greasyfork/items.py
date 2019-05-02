# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class GreasyforkItem(scrapy.Item):
    author = scrapy.Field()  # 脚本作者
    name = scrapy.Field()  # 脚本名称
    installed_today = scrapy.Field()  # 今日安装量
    installed_total = scrapy.Field()  # 总安装量
    created_at = scrapy.Field()  # 创建于
    updated_at = scrapy.Field()  # 更新于
    download_url = scrapy.Field()  # 下载地址
