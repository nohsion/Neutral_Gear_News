import requests
import time
from bs4 import BeautifulSoup
from pymongo import MongoClient
from selenium import webdriver

client = MongoClient('localhost', 27017)
db = client.dbnews


def crawler_daum_news(date):
    db_list = client.list_database_names()
    if 'dbnews' in db_list:
        print('db 최신 뉴스로 새로고침')
        client.drop_database('dbnews')

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
    }
    url = 'https://news.daum.net/ranking/popular'
    if url:
        url += '?regDate=' + date
    data = requests.get(url, headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')
    date = soup.select_one('.box_calendar > .screen_out').text
    news_list = soup.select('.list_news2 > li')

    options = webdriver.ChromeOptions()
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko")
    driver = webdriver.Chrome(options=options)

    for news in news_list:
        rank = news.select_one('.rank_num.rank_popular > .wrap_num > .num_rank >.screen_out').text
        detail_url = news.select_one('.cont_thumb > .tit_thumb > a')['href']
        if news.select_one('a > img') is None:
            img_url = ''
        else:
            img_url = news.select_one('a > img')['src']
        title = news.select_one('.cont_thumb > .tit_thumb > a').text
        info_news = news.select_one('.cont_thumb > .tit_thumb > .info_news').text
        detail_content = news.select_one('.cont_thumb > .desc_thumb > .link_txt').text.strip()

        driver.get(detail_url)
        time.sleep(0.5)  # 네트환경 환경에 따라...
        soup2 = BeautifulSoup(driver.page_source, 'html.parser')
        emoticon_list = soup2.select_one('.list-wrapper')
        selects = emoticon_list.select('.count')

        count_list = []
        for i in range(len(selects)):
            count_list.append(int(selects[i].text))

        doc = {
            'rank': rank,
            'info_news': info_news,
            'title': title,
            'detail_content': detail_content,
            'date': date,
            'detail_url': detail_url,
            'img_url': img_url,
            'nr_RECOMMEND': count_list[0],
            'nr_LIKE': count_list[1],
            'nr_IMPRESS': count_list[2],
            'nr_ANGRY': count_list[3],
            'nr_SAD': count_list[4],
        }
        db.headline.insert_one(doc)
        print(rank, info_news, title, detail_content, detail_url, img_url, count_list)


date = ''
crawler_daum_news(date)
