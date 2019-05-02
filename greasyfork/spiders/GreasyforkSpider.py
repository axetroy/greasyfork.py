from scrapy import Request, Spider, Field
import json
import csv
import urllib
import os.path
import re
from greasyfork.items import GreasyforkItem

# 请求头
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36"

HEADERS = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-HK;q=0.7',
    "User-Agent": USER_AGENT
}

domain = "https://greasyfork.org"


class GreasyforkSpider(Spider):
    name = 'greasyfork'
    start_urls = [domain + '/zh-CN/users']

    DEFAULT_REQUEST_HEADERS = HEADERS

    def start_requests(self):
        fields = [
            '作者',
            '脚本名称',
            '今日安装',
            '总安装量',
            '创建日期',
            '最近更新',
            "文件地址"
        ]

        # if not exists
        if not os.path.exists('./dist/data.csv'):
            with open(r'./dist/data.csv', 'a') as f:
                writer = csv.writer(f)
                writer.writerow(fields)

        for url in self.start_urls:
            yield Request(url=url, headers=HEADERS)

    # 解析用户下的脚本列表
    def parseUserScript(self, response):
        scriptsLink = response.selector.xpath(
            '//ol[@class="script-list"]/li//h2/a/@href'
        ).extract()

        # 解析脚本
        for index, link in enumerate(scriptsLink):
            yield response.follow(domain + link, self.parseScript, headers=HEADERS)

    def parseScript(self, response):
        stat = response.selector.xpath(
            '//dl[@id="script-stats"]'
        )
        name = response.selector.xpath(
            '//section[@id="script-info"]//h2/text()').extract_first()
        author = stat.xpath(
            'dd[@class="script-show-author"]//a/text()').extract_first()
        installed_today = stat.xpath(
            'dd[@class="script-show-daily-installs"]/span/text()').extract_first()
        installed_total = stat.xpath(
            'dd[@class="script-show-total-installs"]/span/text()').extract_first()
        created_at = stat.xpath(
            'dd[@class="script-show-created-date"]//time/@datetime').extract_first()
        updated_at = stat.xpath(
            'dd[@class="script-show-updated-date"]//time/@datetime').extract_first()

        # 有可能抓取到的是库，而不是脚本，库是没有下载地址的
        download_url = response.selector.xpath(
            '//a[@class="install-link"]/@href').extract_first()

        item = GreasyforkItem()

        item.setdefault("author", author)
        item.setdefault("name", name)
        item.setdefault("installed_today", installed_today)
        item.setdefault("installed_total", installed_total)
        item.setdefault("created_at", created_at)
        item.setdefault("updated_at", updated_at)
        item.setdefault("download_url", domain +
                        download_url if download_url is not None else None)

        yield item

    # 解析用户列表
    def parse(self, response):

        users = response.selector.xpath('//ol[@class="user-list"]/li')

        for index, user in enumerate(users):
            username = user.xpath('a/text()').extract_first()
            userLink = user.xpath('a/@href').extract_first()
            scriptsNum = re.findall(
                r"\d+", user.xpath('text()').extract_first()
            )[0]

            # 如果用户有脚本的话，继续抓取
            if int(scriptsNum) > 0:
                yield response.follow(domain + userLink, self.parseUserScript, headers=HEADERS)

        next_page_path = response.selector.xpath(
            '//a[@class="next_page"]/@href').extract_first()

        if next_page_path is not None:
            next_page_url = domain + next_page_path
            yield response.follow(next_page_url, self.parse, headers=HEADERS)
