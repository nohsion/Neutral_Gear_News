import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.dbnews


def crawler_daum_news(date):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
    }
    url = 'https://news.daum.net/ranking/popular'
    if url:
        url += '?regDate=' + date
    data = requests.get(url, headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')
    news_list = soup.select('.list_news2 > li')

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

        # soup2 = BeautifulSoup(requests.get(detail_url, headers=headers).text, 'html.parser')
        # imoticons = soup2.select_one('.emotion_list')
        # print(imoticons)

        doc = {
            'rank': rank,
            'info_news': info_news,
            'title': title,
            'detail_content': detail_content,
            'detail_url': detail_url,
            'img_url': img_url
        }
        db.headline.insert_one(doc)
        print(rank, info_news, title, detail_content, detail_url, img_url)


date = ''
crawler_daum_news(date)
