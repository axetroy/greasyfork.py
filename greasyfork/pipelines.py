# -*- coding: utf-8 -*-
# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
import scrapy
from scrapy.exceptions import DropItem
from scrapy.pipelines.files import FilesPipeline
import csv
import os
import urllib


class GreasyforkPipeline(FilesPipeline):

    # 自定义文件名
    def file_path(self, request, response=None, info=None):
        return request.meta.get('author', '') + "/" + request.meta.get('name', '') + ".user.js"

    def get_media_requests(self, item, info):

        download_url = item["download_url"]

        if download_url is not None:
            yield scrapy.Request(url=download_url, meta={'author': item['author'], 'name': item['name']})

    def item_completed(self, results, item, info):
        filepaths = [x['path'] for ok, x in results if ok]

        if not filepaths:
            raise DropItem("drop Item")

        with open(r'./dist/data.csv', 'a') as f:
            writer = csv.writer(f)
            writer.writerow([
                item["author"],
                item["name"],
                item["installed_today"],
                item["installed_total"],
                item["created_at"],
                item["updated_at"],
                filepaths[0]
            ])

        return item
